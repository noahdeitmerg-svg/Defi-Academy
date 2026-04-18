#!/usr/bin/env node
/**
 * render-batch.js
 *
 * Rendert mehrere Lektionen in einem Durchlauf.
 *
 * Pipeline:
 *   1. Ein einziger Remotion-Bundle-Build fuer alle Lektionen (schnell).
 *   2. Sequentielle ODER parallele Verarbeitung der Lektionen.
 *   3. Ausfuehrliche Zusammenfassung mit Fehlerbericht am Ende.
 *
 * Input-Konvention:
 *   - generator-dir/  enthaelt moduleXX-lessonYY/ mit {video_config,visual_plan}.json
 *   - lessons-dir/    (optional) enthaelt moduleXX-lessonYY.md fuer Slide-Plan-Rebuild
 *   - assets-dir/     (optional) enthaelt moduleXX-lessonYY/{voice.mp3, visuals/*}
 *   - output-dir/     enthaelt zwei Unterordner videos/ und posters/
 *
 * Usage:
 *   node src/render-batch.js \
 *     --generator ../lesson-asset-generator/output \
 *     --lessons   ../lesson-asset-generator/examples \
 *     --assets    ./assets-input \
 *     --output    ./output \
 *     --parallel  2
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { bundle } = require('@remotion/bundler');

const { renderLesson } = require('./render-lesson');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    args[key] = val;
  }
  return args;
}

function listLessons(generatorDir) {
  if (!fs.existsSync(generatorDir)) return [];
  const entries = fs.readdirSync(generatorDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && /^module\d{2}-lesson\d{2}$/.test(e.name))
    .map((e) => e.name)
    .sort();
}

function findMarkdownFor(lessonId, lessonsDir) {
  if (!lessonsDir) return null;
  const candidates = [
    path.join(lessonsDir, `${lessonId}.md`),
    path.join(lessonsDir, lessonId, 'lesson.md'),
    path.join(lessonsDir, `${lessonId}/${lessonId}.md`),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  // fallback: search recursively (shallow)
  const walk = (dir, depth = 0) => {
    if (depth > 2 || !fs.existsSync(dir)) return null;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isFile() && e.name === `${lessonId}.md`) return p;
      if (e.isDirectory()) {
        const found = walk(p, depth + 1);
        if (found) return found;
      }
    }
    return null;
  };
  return walk(lessonsDir);
}

function computeNextLesson(allLessons, currentIndex) {
  const current = allLessons[currentIndex];
  const next = allLessons[currentIndex + 1];

  if (!next) {
    return { isLastLessonOverall: true };
  }
  const curMatch = current.match(/^module(\d{2})-lesson(\d{2})$/);
  const nextMatch = next.match(/^module(\d{2})-lesson(\d{2})$/);
  if (!curMatch || !nextMatch) return null;

  const isLastInModule = curMatch[1] !== nextMatch[1];

  return {
    module: parseInt(nextMatch[1], 10),
    lesson: parseInt(nextMatch[2], 10),
    title: null, // unknown without reading next lesson's markdown; filled by caller if needed
    isLastLessonInModule: isLastInModule,
    isLastLessonOverall: false,
  };
}

async function runWithPool(items, concurrency, worker) {
  const results = [];
  let index = 0;
  const active = new Set();

  const runNext = async () => {
    if (index >= items.length) return;
    const i = index++;
    const item = items[i];
    const p = (async () => {
      try {
        const r = await worker(item, i);
        results[i] = { status: 'ok', item, result: r };
      } catch (err) {
        results[i] = { status: 'error', item, error: err.message, stack: err.stack };
      }
    })();
    active.add(p);
    p.finally(() => active.delete(p));
    await p;
    return runNext();
  };

  const starters = [];
  for (let k = 0; k < Math.min(concurrency, items.length); k++) {
    starters.push(runNext());
  }
  await Promise.all(starters);
  return results;
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    console.log(`
Batch-render all DeFi Academy lesson videos.

Usage:
  node src/render-batch.js \\
    --generator <path>   Lesson Asset Generator output dir
    --lessons   <path>   (optional) Dir with moduleXX-lessonYY.md files
    --assets    <path>   (optional) Dir with voice.mp3 + visuals per lesson
    --output    <path>   Output dir (will create videos/ and posters/)
    --parallel  <n>      Number of lessons to render in parallel (default 2)
    --only      <ids>    Comma-separated lesson IDs (optional)
    --concurrency <n>    Frame-render concurrency per lesson (default 4)
    --log-level <level>  info|warn|error|verbose (default: info)
    --bundle-cache <path>  Reuse/write Remotion bundle at path (shared across chunks)
`);
    process.exit(0);
  }

  const rendererRoot = path.resolve(__dirname, '..');
  const generatorDir = path.resolve(args.generator || '../lesson-asset-generator/output');
  const lessonsDir = args.lessons ? path.resolve(args.lessons) : null;
  const assetsDir = args.assets ? path.resolve(args.assets) : null;
  const outputDir = path.resolve(args.output || './output');
  const parallel = parseInt(args.parallel || '2', 10);
  const concurrencyPerLesson = parseInt(args.concurrency || '4', 10);
  const logLevel = args['log-level'] || 'warn';

  console.log('═'.repeat(60));
  console.log('DeFi Academy Video Renderer — Batch');
  console.log('═'.repeat(60));
  console.log('Generator:   ', generatorDir);
  console.log('Lessons MD:  ', lessonsDir || '(none)');
  console.log('Assets:      ', assetsDir || '(none)');
  console.log('Output:      ', outputDir);
  console.log('Parallel:    ', parallel, ' lesson(s) at a time');
  console.log('Concurrency: ', concurrencyPerLesson, ' frames per lesson');
  console.log('');

  // 1) Discover lessons
  let lessons = listLessons(generatorDir);
  if (args.only) {
    const allowed = new Set(args.only.split(',').map((s) => s.trim()));
    lessons = lessons.filter((l) => allowed.has(l));
  }
  if (lessons.length === 0) {
    console.error('No lessons found. Nothing to render.');
    process.exit(1);
  }
  console.log(`Discovered ${lessons.length} lesson(s):`);
  lessons.forEach((l) => console.log(`  - ${l}`));
  console.log('');

  // 2) Build Remotion bundle ONCE — optional ueber --bundle-cache mehrfach
  //    (in Chunks) wiederverwendbar.
  const bundleCacheArg = args['bundle-cache'] || process.env.REMOTION_BUNDLE_CACHE;
  let bundleLocation;
  if (bundleCacheArg && fs.existsSync(bundleCacheArg) && fs.existsSync(path.join(bundleCacheArg, 'index.html'))) {
    bundleLocation = path.resolve(bundleCacheArg);
    console.log(`Reusing Remotion bundle from cache: ${bundleLocation}`);
    console.log('');
  } else {
    console.log('Building Remotion bundle (one-time)…');
    const t0 = Date.now();
    bundleLocation = await bundle({
      entryPoint: path.join(rendererRoot, 'remotion', 'index.jsx'),
      publicDir: path.join(rendererRoot, 'public'),
      webpackOverride: (config) => config,
    });
    console.log(`  ok  (${((Date.now() - t0) / 1000).toFixed(1)}s)  ${bundleLocation}`);
    // Wenn --bundle-cache angegeben, dorthin spiegeln, damit nachfolgende
    // Chunks den Build ueberspringen koennen.
    if (bundleCacheArg) {
      try {
        fs.mkdirSync(path.dirname(bundleCacheArg), { recursive: true });
        if (!fs.existsSync(bundleCacheArg)) {
          fs.cpSync(bundleLocation, bundleCacheArg, { recursive: true });
          console.log(`  → cached at ${bundleCacheArg}`);
        }
      } catch (err) {
        console.warn(`  warn: bundle-cache copy failed (${err.message})`);
      }
    }
    console.log('');
  }

  // 3) Render lessons
  const videosDir = path.join(outputDir, 'videos');
  const postersDir = path.join(outputDir, 'posters');
  fs.mkdirSync(videosDir, { recursive: true });
  fs.mkdirSync(postersDir, { recursive: true });

  const results = await runWithPool(lessons, parallel, async (lessonId, idx) => {
    const mdPath = findMarkdownFor(lessonId, lessonsDir);
    const nextLesson = computeNextLesson(lessons, idx);

    const outputVideo = path.join(videosDir, `${lessonId}.mp4`);
    const outputPoster = path.join(postersDir, `${lessonId}.jpg`);

    const started = Date.now();
    console.log(`▶ [${idx + 1}/${lessons.length}] ${lessonId} — starting`);

    const r = await renderLesson({
      lessonId,
      generatorOutputDir: generatorDir,
      assetsInputDir: assetsDir,
      lessonMarkdownPath: mdPath,
      outputVideo,
      outputPoster,
      nextLesson,
      concurrency: concurrencyPerLesson,
      logLevel,
      bundleCachePath: bundleLocation,
      onProgress: () => {}, // silence per-lesson progress during batch
    });

    const secs = ((Date.now() - started) / 1000).toFixed(1);
    console.log(
      `✔ [${idx + 1}/${lessons.length}] ${lessonId}  ` +
        `(${secs}s render, ${r.durationSeconds}s video, ` +
        `audio=${r.audioProvided ? 'yes' : 'NO'}, ` +
        `visuals=${r.visualsResolved}/${r.visualsTotal})`
    );

    return r;
  });

  // 4) Report
  const ok = results.filter((r) => r.status === 'ok');
  const failed = results.filter((r) => r.status === 'error');

  console.log('');
  console.log('═'.repeat(60));
  console.log(`Summary: ${ok.length} ok, ${failed.length} failed`);
  console.log('═'.repeat(60));

  if (failed.length > 0) {
    console.log('');
    console.log('Failed lessons:');
    for (const f of failed) {
      console.log(`  ✘ ${f.item}`);
      console.log(`     ${f.error}`);
    }
  }

  // Write batch report
  const report = {
    ran_at: new Date().toISOString(),
    total: lessons.length,
    ok: ok.length,
    failed: failed.length,
    results: results.map((r) => ({
      lesson_id: r.item,
      status: r.status,
      ...(r.status === 'ok'
        ? {
            video: r.result.outputVideo,
            poster: r.result.outputPoster,
            duration_seconds: r.result.durationSeconds,
            audio_provided: r.result.audioProvided,
            visuals_resolved: r.result.visualsResolved,
            visuals_total: r.result.visualsTotal,
          }
        : { error: r.error }),
    })),
  };

  const reportPath = path.join(outputDir, 'render-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\nReport written: ${reportPath}`);

  process.exit(failed.length > 0 ? 1 : 0);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('\n❌ Batch failed:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  });
}
