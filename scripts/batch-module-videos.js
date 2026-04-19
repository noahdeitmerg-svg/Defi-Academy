#!/usr/bin/env node
/**
 * Ein ganzes Modul durch pipeline-test (TTS + Slides + MP4) und nach public/ bringen.
 *
 * Voraussetzungen:
 *   - Repo-Root: ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID (z. B. via .env)
 *   - ffprobe/ffmpeg (PATH oder wie in pipeline-test konfiguriert)
 *
 * Usage (im Repo-Root Defi-Academy):
 *   node scripts/batch-module-videos.js --module 2
 *   node scripts/batch-module-videos.js --input Module/modul-02-wallets-und-sicherheit-FINAL.md
 *   node scripts/batch-module-videos.js --module 1 --live
 *
 * Flags:
 *   --module <n>     Modulnummer; sucht Module/modul-NN-*-FINAL.md
 *   --input <path>   Explizites Markdown (schließt --module ein)
 *   --output <name>  Unterordner unter pipeline-test/ (default: batch-module-output)
 *   --live           publish-videos, lesson-audio-durations.json, git commit + push
 *   --no-publish     Nur Pipeline, kein publish-videos / keine Dauer-JSON-Updates
 *   --help
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
require(path.join(ROOT, 'scripts', 'lib', 'env.js')).loadProjectEnv({ cwd: ROOT });

const { parseModule } = require(path.join(ROOT, 'lesson-asset-generator', 'src', 'module-parser.js'));
const { ffprobeDurationSeconds } = require(path.join(ROOT, 'pipeline-test', 'src', 'lib', 'ffprobe.js'));

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') {
      out.help = true;
      continue;
    }
    if (a === '--live') {
      out.live = true;
      continue;
    }
    if (a === '--no-publish') {
      out.noPublish = true;
      continue;
    }
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}

function printHelp() {
  console.log(`
Modul-Videos: pipeline-test für alle Lektionen → videos/ → publish-videos → optional git push

  node scripts/batch-module-videos.js --module 2
  node scripts/batch-module-videos.js --input Module/modul-02-wallets-und-sicherheit-FINAL.md
  node scripts/batch-module-videos.js --module 1 --live

Umgebung: ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID (siehe .env im Repo-Root).
`);
}

function findFinalModuleMd(moduleNumber) {
  const modDir = path.join(ROOT, 'Module');
  if (!fs.existsSync(modDir)) {
    throw new Error(`Ordner fehlt: ${modDir}`);
  }
  const padded = String(moduleNumber).padStart(2, '0');
  const re = new RegExp(`^modul-${padded}-`, 'i');
  const hits = fs
    .readdirSync(modDir)
    .filter((f) => re.test(f) && /\.md$/i.test(f) && /FINAL\.md$/i.test(f));
  if (hits.length === 0) {
    throw new Error(`Keine *FINAL.md für Modul ${moduleNumber} unter ${modDir}`);
  }
  if (hits.length > 1) {
    throw new Error(`Mehrere FINAL-Dateien für Modul ${moduleNumber}: ${hits.join(', ')}`);
  }
  return path.join(modDir, hits[0]);
}

function resolveInput(args) {
  if (args.input) {
    const abs = path.isAbsolute(args.input) ? args.input : path.join(ROOT, args.input);
    if (!fs.existsSync(abs)) throw new Error(`--input nicht gefunden: ${abs}`);
    return abs;
  }
  const n = parseInt(String(args.module || ''), 10);
  if (!Number.isFinite(n) || n < 1) {
    throw new Error('Bitte --module <n> oder --input <pfad-zur-FINAL.md> angeben.');
  }
  return findFinalModuleMd(n);
}

function runPipeline({ inputMd, lessonId, outputDir }) {
  const pipelineDir = path.join(ROOT, 'pipeline-test');
  const r = spawnSync(
    process.execPath,
    ['src/run-full-pipeline.js', '--input', inputMd, '--lesson', lessonId, '--output', outputDir],
    { cwd: pipelineDir, stdio: 'inherit', env: process.env }
  );
  if (r.status !== 0) {
    throw new Error(`Pipeline fehlgeschlagen für ${lessonId} (exit ${r.status})`);
  }
}

function runPublishVideos(onlyCsv) {
  const r = spawnSync(
    process.execPath,
    ['scripts/publish-videos.js', '--force', '--only', onlyCsv],
    { cwd: ROOT, stdio: 'inherit', env: process.env }
  );
  if (r.status !== 0) {
    throw new Error(`publish-videos fehlgeschlagen (exit ${r.status})`);
  }
}

function gitBranch() {
  const r = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  if (r.status !== 0) return null;
  return (r.stdout || '').trim();
}

function gitLiveCommit(moduleNum, lessonIds) {
  const branch = gitBranch();
  if (!branch) throw new Error('Kein Git-Branch ermittelbar (--live abgebrochen).');

  const add = spawnSync(
    'git',
    ['add', 'config/lesson-audio-durations.json', 'public/videos', 'public/posters'],
    { cwd: ROOT, stdio: 'inherit' }
  );
  if (add.status !== 0) throw new Error('git add fehlgeschlagen');

  const st = spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: ROOT });
  if (st.status === 0) {
    console.log('Keine Git-Änderungen nach publish (identische Binärdateien?) — kein commit/push.');
    return;
  }

  const msg = `chore(videos): Modul ${moduleNum} neu gerendert (${lessonIds.length} Lektionen)`;
  const commit = spawnSync('git', ['commit', '-m', msg], { cwd: ROOT, stdio: 'inherit' });
  if (commit.status !== 0) throw new Error(`git commit fehlgeschlagen (exit ${commit.status})`);

  const push = spawnSync('git', ['push', 'origin', branch], { cwd: ROOT, stdio: 'inherit' });
  if (push.status !== 0) {
    throw new Error(`git push fehlgeschlagen (exit ${push.status})`);
  }
  console.log(`\n✔ Gepusht nach origin/${branch} — GitHub Pages-Build startet bei push auf main (bzw. euer Merge-Flow).`);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const inputMd = resolveInput(args);
  const outName = args.output || 'batch-module-output';
  /** Relativ zu pipeline-test/ (cwd der Pipeline). */
  const outRootPipelineRelative = outName;
  const outAbs = path.join(ROOT, 'pipeline-test', outName);

  const md = fs.readFileSync(inputMd, 'utf8');
  const parsed = parseModule(md);
  const moduleNum = parsed.module;
  const lessonIds = parsed.lessons.map((l) => l.meta.lesson_id);

  console.log('═'.repeat(64));
  console.log(`Modul ${moduleNum} · ${lessonIds.length} Lektionen`);
  console.log(`Markdown: ${inputMd}`);
  console.log(`Output:   ${outAbs}`);
  console.log('═'.repeat(64));

  fs.mkdirSync(path.join(ROOT, 'videos'), { recursive: true });

  for (const id of lessonIds) {
    console.log(`\n── Pipeline: ${id} ──`);
    runPipeline({ inputMd, lessonId: id, outputDir: outRootPipelineRelative });

    const finalMp4 = path.join(outAbs, id, 'final_test_video.mp4');
    if (!fs.existsSync(finalMp4)) {
      throw new Error(`Erwartete Datei fehlt: ${finalMp4}`);
    }
    const dest = path.join(ROOT, 'videos', `${id}.mp4`);
    fs.copyFileSync(finalMp4, dest);
    console.log(`  Kopiert → ${path.relative(ROOT, dest)}`);
  }

  if (args.noPublish) {
    console.log('\n(--no-publish) Überspringe publish-videos und Dauer-JSON.');
    return;
  }

  const onlyCsv = lessonIds.join(',');
  console.log('\n── publish-videos ──');
  runPublishVideos(onlyCsv);

  const durationsPath = path.join(ROOT, 'config', 'lesson-audio-durations.json');
  let map = {};
  if (fs.existsSync(durationsPath)) {
    try {
      map = JSON.parse(fs.readFileSync(durationsPath, 'utf8'));
    } catch (_) {
      map = {};
    }
  }

  for (const lesson of parsed.lessons) {
    const m = lesson.meta.module;
    const les = lesson.meta.lesson;
    const key = `module${m}/${m}-${les}`;
    const voiceMp3 = path.join(outAbs, lesson.meta.lesson_id, 'voice.mp3');
    const sec = ffprobeDurationSeconds(voiceMp3);
    map[key] = Math.round(sec);
    console.log(`  Dauer ${key}: ${map[key]} s (voice.mp3)`);
  }

  fs.writeFileSync(durationsPath, `${JSON.stringify(map, null, 2)}\n`, 'utf8');
  console.log(`\n✔ Aktualisiert: ${path.relative(ROOT, durationsPath)}`);

  if (args.live) {
    console.log('\n── git commit + push (--live) ──');
    gitLiveCommit(moduleNum, lessonIds);
  } else {
    console.log('\nTipp: Mit --live automatisch committen und pushen (Branch wie main oder cursor/publish-live).');
  }

  console.log('\n✔ batch-module-videos abgeschlossen.');
}

try {
  main();
} catch (err) {
  console.error('\n✖', err.message || err);
  process.exit(1);
}
