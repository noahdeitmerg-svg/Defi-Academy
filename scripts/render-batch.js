#!/usr/bin/env node
/**
 * scripts/render-batch.js
 *
 * Top-Level-Batch-Renderer mit Chunk-Isolation fuer 100+ Lektionen.
 *
 * Prinzip
 * -------
 * Crash-Sicherheit schlaegt Durchsatz. Der Orchestrator partitioniert die
 * Lektionsliste in Chunks (default 10) und spawnt pro Chunk einen
 * isolierten Kind-Prozess, der den bestehenden In-Process-Renderer
 * `video-renderer/.../src/render-batch.js` ausfuehrt. Wenn ein Chunk
 * crasht (OOM, Remotion-Bug, System-Throttle), bleibt der Parent am Leben
 * und macht mit dem naechsten Chunk weiter.
 *
 * Pipeline
 *   1. Preflight je Lektion: voice.mp3, visual_plan.json, video_config.json
 *      - fehlt etwas -> skip + Warnung -> logs/render-errors.log
 *   2. Idempotenz: Lektionen mit bestehendem Output werden uebersprungen
 *      (ausser --force).
 *   3. Chunk-Bildung (default 10 Lektionen/Chunk).
 *   4. Pro Chunk: Child-Prozess mit --parallel N (default 2) Intra-Chunk-
 *      Lessons parallel. Zwischen Chunks sequentiell.
 *   5. Ergebnis in videos/ + posters/ umziehen, Fehler protokollieren,
 *      Abschluss-Report in logs/render-batch-report.json.
 *
 * CLI
 *   node scripts/render-batch.js --parallel 2
 *   node scripts/render-batch.js --limit 5 --parallel 1
 *   node scripts/render-batch.js --only module04-lesson02,module06-lesson03
 *   node scripts/render-batch.js --chunk-size 5 --force
 *
 * Flags
 *   --generator-output <path>  default: ./generator-output
 *   --assets-input <path>      default: ./assets-input
 *   --lessons-dir <path>       default: ./lessons (fuer MD-Lookup, optional)
 *   --videos-out <path>        default: ./videos
 *   --posters-out <path>       default: ./posters
 *   --parallel <n>             default: 2 (Lektionen-Parallelitaet im Child)
 *   --chunk-size <n>           default: 10 (Lektionen je Child-Prozess)
 *   --limit <n>                nur die ersten N Lektionen rendern
 *   --only <csv>               explizite Lesson-ID-Liste
 *   --force                    bestehende Outputs neu rendern
 *   --help                     Hilfe
 *
 * Logs
 *   logs/render-batch.log           — vollstaendige stdout/stderr-Spur
 *   logs/render-errors.log          — nur Warnungen + Fehler (append, mit
 *                                      Zeitstempel, ueberstandene Laeufe)
 *   logs/render-batch-report.json   — strukturierter Abschluss-Report
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const LOG_DIR = path.join(ROOT, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'render-batch.log');
const ERROR_LOG = path.join(LOG_DIR, 'render-errors.log');
const REPORT_FILE = path.join(LOG_DIR, 'render-batch-report.json');
const TMP_DIR = path.join(ROOT, '.render-batch-tmp');

// --- Tool-Pfade (tolerant gegen doppelte Ordnerstruktur) --------------------

function firstExisting(candidates, label) {
  for (const rel of candidates) {
    const abs = path.join(ROOT, rel);
    if (fs.existsSync(abs)) return abs;
  }
  throw new Error(`Tool nicht gefunden (${label}): ${candidates.join(' | ')}`);
}

const RENDERER_BATCH = firstExisting(
  [
    'video-renderer/video-renderer/src/render-batch.js',
    'video-renderer/src/render-batch.js',
  ],
  'video-renderer/render-batch'
);

// --- CLI --------------------------------------------------------------------

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

function printUsage() {
  console.log(String.raw`
DeFi Academy — Batch Renderer (Top-Level, Chunk-Isolated)

Usage:
  node scripts/render-batch.js [flags]

Flags:
  --generator-output <path>  default: ./generator-output
  --assets-input <path>      default: ./assets-input
  --lessons-dir <path>       default: ./lessons
  --videos-out <path>        default: ./videos
  --posters-out <path>       default: ./posters
  --parallel <n>             default: 2 (Lektionen parallel im Child)
  --chunk-size <n>           default: 10 (Lektionen je Child-Prozess)
  --limit <n>                nur erste N Lektionen
  --only <csv>               explizite Lesson-IDs
  --force                    auch bestehende MP4 neu rendern
  --skip-validate            validate-lessons.js NICHT als Preflight laufen lassen
  --help                     Hilfe
`);
}

// --- Logger -----------------------------------------------------------------

class RunLogger {
  constructor(logPath, errorPath) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
    this.stream = fs.createWriteStream(logPath, { flags: 'w' });
    // render-errors.log wird APPEND-artig gefuehrt, damit wiederholte Laeufe
    // einen historischen Fehlerverlauf behalten.
    this.errStream = fs.createWriteStream(errorPath, { flags: 'a' });
  }
  _ts() {
    return new Date().toISOString();
  }
  _write(level, msg, lessonId) {
    const tag = lessonId ? `[${lessonId}]` : '';
    const line = `${this._ts()} ${level} ${tag} ${msg}`.trimEnd();
    this.stream.write(line + '\n');
    if (level === 'ERROR' || level === 'WARN ') {
      this.errStream.write(line + '\n');
    }
    const colored =
      level === 'ERROR'
        ? `\x1b[31m${line}\x1b[0m`
        : level === 'WARN '
        ? `\x1b[33m${line}\x1b[0m`
        : line;
    // eslint-disable-next-line no-console
    console.log(colored);
  }
  info(msg, lessonId) {
    this._write('INFO ', msg, lessonId);
  }
  warn(msg, lessonId) {
    this._write('WARN ', msg, lessonId);
  }
  error(msg, lessonId) {
    this._write('ERROR', msg, lessonId);
  }
  plain(msg) {
    // Reiner User-Fortschritt ohne Tag, aber mit Log-Persistenz.
    this.stream.write(msg + '\n');
    // eslint-disable-next-line no-console
    console.log(msg);
  }
  async close() {
    await Promise.all([
      new Promise((r) => this.stream.end(r)),
      new Promise((r) => this.errStream.end(r)),
    ]);
  }
}

// --- Child-Process-Runner ---------------------------------------------------

function runRendererChunk({ log, chunkIds, ctx, chunkIndex, chunkTotal }) {
  return new Promise((resolve) => {
    const args = [
      RENDERER_BATCH,
      '--generator',
      ctx.generatorOutputDir,
      '--lessons',
      ctx.lessonsDir,
      '--assets',
      ctx.assetsInputDir,
      '--output',
      TMP_DIR,
      '--parallel',
      String(ctx.parallel),
      '--only',
      chunkIds.join(','),
      '--bundle-cache',
      ctx.bundleCacheDir,
    ];

    log.info(
      `Chunk ${chunkIndex + 1}/${chunkTotal} spawnt Renderer (${chunkIds.length} Lektion(en), parallel=${ctx.parallel})`
    );

    const child = spawn(process.execPath, args, {
      cwd: ROOT,
      env: process.env,
      shell: false,
    });

    const progressStartRe = /[▶>]\s*\[\d+\/\d+\]\s+(module\d{2}-lesson\d{2})/;
    const progressDoneRe = /[✔v]\s*\[\d+\/\d+\]\s+(module\d{2}-lesson\d{2})/;

    let completedInChunk = 0;

    const processLine = (line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      log.info(`  [chunk ${chunkIndex + 1}] ${trimmed}`);
      const startMatch = progressStartRe.exec(trimmed);
      if (startMatch) {
        log.plain(`Rendering ${startMatch[1]}`);
      }
      const doneMatch = progressDoneRe.exec(trimmed);
      if (doneMatch) {
        completedInChunk++;
        ctx.completed++;
        log.plain(`Completed ${ctx.completed} / ${ctx.total}`);
      }
    };

    child.stdout.on('data', (buf) =>
      buf.toString().split(/\r?\n/).forEach(processLine)
    );
    child.stderr.on('data', (buf) =>
      buf
        .toString()
        .split(/\r?\n/)
        .forEach((line) => {
          const t = line.trim();
          if (!t) return;
          log.warn(`  [chunk ${chunkIndex + 1}] ${t}`);
        })
    );

    child.on('error', (err) => {
      log.error(`Chunk ${chunkIndex + 1} spawn-Fehler: ${err.message}`);
      resolve({ code: -1, completedInChunk, error: err.message });
    });
    child.on('close', (code) => {
      resolve({ code: code ?? 0, completedInChunk });
    });
  });
}

// --- Preflight --------------------------------------------------------------

function preflightLesson(ctx, lessonId) {
  const gen = path.join(ctx.generatorOutputDir, lessonId);
  const assets = path.join(ctx.assetsInputDir, lessonId);
  const required = [
    { file: path.join(gen, 'video_config.json'), label: 'video_config.json' },
    { file: path.join(gen, 'visual_plan.json'), label: 'visual_plan.json' },
    { file: path.join(assets, 'voice.mp3'), label: 'voice.mp3' },
  ];
  const missing = required.filter((r) => !fs.existsSync(r.file)).map((r) => r.label);
  // voice.mp3 muss zudem groesser als ein Bisschen sein, sonst Stub
  const voicePath = path.join(assets, 'voice.mp3');
  if (
    !missing.includes('voice.mp3') &&
    fs.statSync(voicePath).size <= 1024
  ) {
    missing.push('voice.mp3 (zu klein — Stub?)');
  }
  return { missing };
}

// --- Chunks -----------------------------------------------------------------

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
  return out;
}

// --- Output-Einsammeln ------------------------------------------------------

function collectChunkOutputs(ctx, chunkIds, log) {
  const tmpVideos = path.join(TMP_DIR, 'videos');
  const tmpPosters = path.join(TMP_DIR, 'posters');
  const rendered = [];
  const missing = [];

  for (const id of chunkIds) {
    const srcMp4 = path.join(tmpVideos, `${id}.mp4`);
    const srcJpg = path.join(tmpPosters, `${id}.jpg`);
    const dstMp4 = path.join(ctx.videosOut, `${id}.mp4`);
    const dstJpg = path.join(ctx.postersOut, `${id}.jpg`);

    if (fs.existsSync(srcMp4)) {
      fs.mkdirSync(path.dirname(dstMp4), { recursive: true });
      fs.renameSync(srcMp4, dstMp4);
      if (fs.existsSync(srcJpg)) {
        fs.mkdirSync(path.dirname(dstJpg), { recursive: true });
        fs.renameSync(srcJpg, dstJpg);
      }
      rendered.push({
        id,
        video: path.relative(ROOT, dstMp4),
        poster: fs.existsSync(dstJpg) ? path.relative(ROOT, dstJpg) : null,
      });
    } else {
      missing.push(id);
      log.error(`Render-Output fehlt nach Chunk: ${id}.mp4`, id);
    }
  }

  return { rendered, missing };
}

// --- Main -------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printUsage();
    process.exit(0);
  }

  const ctx = {
    generatorOutputDir: path.resolve(ROOT, args['generator-output'] || 'generator-output'),
    assetsInputDir: path.resolve(ROOT, args['assets-input'] || 'assets-input'),
    lessonsDir: path.resolve(ROOT, args['lessons-dir'] || 'lessons'),
    videosOut: path.resolve(ROOT, args['videos-out'] || 'videos'),
    postersOut: path.resolve(ROOT, args['posters-out'] || 'posters'),
    parallel: parseInt(args.parallel || '2', 10),
    chunkSize: parseInt(args['chunk-size'] || '10', 10),
    limit: args.limit ? parseInt(args.limit, 10) : null,
    only: typeof args.only === 'string' ? args.only : null,
    force: Boolean(args.force),
    completed: 0,
    total: 0,
    // Gemeinsamer Remotion-Bundle-Cache fuer alle Chunks dieses Laufs,
    // damit der Webpack-Build nicht pro Chunk neu laeuft.
    bundleCacheDir: path.join(TMP_DIR, 'remotion-bundle-cache'),
  };

  fs.mkdirSync(ctx.videosOut, { recursive: true });
  fs.mkdirSync(ctx.postersOut, { recursive: true });
  fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(ctx.bundleCacheDir), { recursive: true });

  const log = new RunLogger(LOG_FILE, ERROR_LOG);
  ctx.log = log;

  // --- Validator-Hard-Gate --------------------------------------------------
  // Bricht hart ab, wenn die Sources nicht durch validate-lessons.js
  // gehen. Mit --skip-validate abschaltbar.
  if (!args['skip-validate']) {
    const validateScript = path.join(__dirname, 'validate-lessons.js');
    if (fs.existsSync(validateScript) && fs.existsSync(ctx.lessonsDir)) {
      log.info('Preflight: validate-lessons.js');
      const res = require('child_process').spawnSync(
        process.execPath,
        [validateScript, '--lessons-dir', ctx.lessonsDir, '--skip-generated'],
        { stdio: 'inherit' },
      );
      if (res.status !== 0) {
        log.error(`validate-lessons fehlgeschlagen (exit=${res.status}). Rendering abgebrochen.`);
        log.error('Ueberspringen mit --skip-validate, falls bewusst gewuenscht.');
        await log.close();
        process.exit(res.status || 1);
      }
    } else {
      log.warn(`Validator uebersprungen (fehlt: ${path.relative(ROOT, validateScript)} oder ${path.relative(ROOT, ctx.lessonsDir)}).`);
    }
  }

  log.info('DeFi Academy — render-batch (Top-Level Orchestrator)');
  log.info(`Generator-Out:  ${ctx.generatorOutputDir}`);
  log.info(`Assets-Input:   ${ctx.assetsInputDir}`);
  log.info(`Videos-Out:     ${ctx.videosOut}`);
  log.info(`Posters-Out:    ${ctx.postersOut}`);
  log.info(`Parallel:       ${ctx.parallel}`);
  log.info(`Chunk-Size:     ${ctx.chunkSize}`);
  log.info(`Limit:          ${ctx.limit ?? '—'}`);
  log.info(`Only:           ${ctx.only ?? '—'}`);
  log.info(`Force:          ${ctx.force}`);
  log.info(`Log-Datei:      ${LOG_FILE}`);
  log.info(`Fehler-Log:     ${ERROR_LOG}`);

  // --- Discover -------------------------------------------------------------
  if (!fs.existsSync(ctx.generatorOutputDir)) {
    log.error(`Generator-Output fehlt: ${ctx.generatorOutputDir}`);
    await log.close();
    process.exit(1);
  }
  let allLessons = fs
    .readdirSync(ctx.generatorOutputDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^module\d{2}-lesson\d{2}$/.test(e.name))
    .map((e) => e.name)
    .sort();

  if (ctx.only) {
    const filter = new Set(ctx.only.split(',').map((s) => s.trim()));
    allLessons = allLessons.filter((l) => filter.has(l));
  }
  if (ctx.limit !== null && ctx.limit > 0) {
    allLessons = allLessons.slice(0, ctx.limit);
  }

  if (allLessons.length === 0) {
    log.error('Keine Lektionen zum Rendern gefunden.');
    await log.close();
    process.exit(1);
  }

  // --- Preflight + Idempotenz ----------------------------------------------
  const preflightReport = {};
  const eligible = [];
  const skippedMissing = [];
  const skippedExisting = [];

  for (const id of allLessons) {
    const dstMp4 = path.join(ctx.videosOut, `${id}.mp4`);
    if (fs.existsSync(dstMp4) && !ctx.force) {
      skippedExisting.push(id);
      preflightReport[id] = { status: 'skipped-existing', output: path.relative(ROOT, dstMp4) };
      continue;
    }
    const pf = preflightLesson(ctx, id);
    if (pf.missing.length > 0) {
      skippedMissing.push({ id, missing: pf.missing });
      preflightReport[id] = { status: 'skipped-missing', missing: pf.missing };
      log.warn(`Preflight-Skip: ${pf.missing.join(', ')}`, id);
      continue;
    }
    eligible.push(id);
    preflightReport[id] = { status: 'eligible' };
  }

  log.info(
    `Gesamt: ${allLessons.length}, renderbar: ${eligible.length}, ` +
      `skip-existing: ${skippedExisting.length}, skip-missing: ${skippedMissing.length}`
  );

  if (eligible.length === 0) {
    log.warn('Nichts zu rendern — alle Lektionen entweder fertig oder ohne Pflicht-Assets.');
    await writeReport(ctx, {
      allLessons,
      eligible,
      skippedExisting,
      skippedMissing,
      renderedChunks: [],
      success: [],
      failed: [],
    });
    await log.close();
    process.exit(0);
  }

  ctx.total = eligible.length;

  // --- Chunks + Render ------------------------------------------------------
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  const chunks = chunk(eligible, ctx.chunkSize);
  log.info(`Plan: ${chunks.length} Chunk(s) à max. ${ctx.chunkSize} Lektion(en)`);

  const success = [];
  const failed = [];
  const renderedChunks = [];

  for (let ci = 0; ci < chunks.length; ci++) {
    const chunkIds = chunks[ci];
    log.info(`── Chunk ${ci + 1}/${chunks.length}: ${chunkIds.join(', ')} ──`);

    const result = await runRendererChunk({
      log,
      chunkIds,
      ctx,
      chunkIndex: ci,
      chunkTotal: chunks.length,
    });

    const { rendered, missing } = collectChunkOutputs(ctx, chunkIds, log);
    success.push(...rendered);

    if (result.code !== 0) {
      log.error(
        `Chunk ${ci + 1}/${chunks.length} endete mit Exit ${result.code}. ` +
          `${rendered.length}/${chunkIds.length} Lektionen dieses Chunks sind fertig.`
      );
      for (const id of missing) {
        failed.push({
          id,
          reason: `Chunk-Crash (Exit ${result.code})`,
          chunkIndex: ci,
        });
        log.error(`Skip, weiter mit naechster Lektion.`, id);
      }
    } else {
      for (const id of missing) {
        failed.push({
          id,
          reason: 'Kein MP4 trotz Chunk-Erfolg',
          chunkIndex: ci,
        });
      }
    }

    renderedChunks.push({
      index: ci,
      lessons: chunkIds,
      code: result.code,
      rendered: rendered.length,
      missing: missing.length,
    });
  }

  fs.rmSync(TMP_DIR, { recursive: true, force: true });

  // --- Abschluss ------------------------------------------------------------
  log.info('');
  log.info('━'.repeat(60));
  log.info(
    `Fertig: ${success.length}/${eligible.length} gerendert, ` +
      `${failed.length} Fehler, ${skippedExisting.length} bereits da, ` +
      `${skippedMissing.length} Preflight-Skip`
  );
  log.info('━'.repeat(60));

  if (failed.length > 0) {
    log.info('Fehlerliste:');
    for (const f of failed) log.error(`  ${f.id} — ${f.reason}`, f.id);
  }

  await writeReport(ctx, {
    allLessons,
    eligible,
    skippedExisting,
    skippedMissing,
    renderedChunks,
    success,
    failed,
  });

  await log.close();
  // Exit 0, auch wenn einzelne Lektionen fehlgeschlagen sind — der Batch
  // ist per Design fehler-tolerant (siehe logs/render-errors.log).
  // Exit 1 nur, wenn NICHTS gerendert werden konnte.
  process.exit(success.length === 0 ? 1 : 0);
}

async function writeReport(ctx, data) {
  const report = {
    ran_at: new Date().toISOString(),
    total: data.allLessons.length,
    eligible: data.eligible.length,
    success: data.success.length,
    failed: data.failed.length,
    skipped_existing: data.skippedExisting.length,
    skipped_missing: data.skippedMissing.length,
    videos_dir: path.relative(ROOT, ctx.videosOut),
    posters_dir: path.relative(ROOT, ctx.postersOut),
    lessons: data.allLessons,
    chunks: data.renderedChunks,
    rendered: data.success,
    errors: data.failed,
    preflight_missing: data.skippedMissing,
  };
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), 'utf8');
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('\nUnerwarteter Fehler:', err.stack || err.message);
  process.exit(1);
});
