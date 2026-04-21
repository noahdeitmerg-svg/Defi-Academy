#!/usr/bin/env node
/**
 * pilot-render.js
 *
 * Rendert einen kleinen, repraesentativen Satz Pilot-Lektionen, bevor die
 * komplette Batch-Produktion losgeht. Liefert damit eine schnelle
 * Sanity-Kontrolle fuer Slides, Voice, Visuals, Timing und Animation.
 *
 * Pipeline:
 *
 *   1. Pre-Render-Validator (Hard-Gate)
 *   2. Lesson Asset Generator NUR fuer die ausgewaehlten Lektionen
 *      (per --input <file> pro Lektion, keine Batch-Ueberproduktion)
 *   3. Asset-Praesenz pruefen (slides_prompt, voice_script, visual_plan,
 *      video_config) — fehlend -> Warnung, nicht fatal
 *   4. voice.mp3 pruefen — fehlend -> diese Lektion aus der Render-Menge
 *      nehmen (Override mit --allow-missing-voice)
 *   5. render-batch.js mit --only und --parallel 1 nach .pilot-render-tmp/
 *   6. Finale Artefakte nach videos/pilot/ und posters/pilot/ verschieben
 *
 * Usage:
 *   npm run pilot-render
 *   node scripts/pilot-render.js --lessons module01-lesson01,module04-lesson02
 *   node scripts/pilot-render.js --allow-missing-voice --skip-validate
 *
 * Flags:
 *   --lessons <csv>            Override der Pilot-IDs (default: 5 vorgegebene)
 *   --lessons-dir <path>       default: ./lessons
 *   --generator-output <path>  default: ./generated-assets
 *   --assets-input <path>      default: ./assets-input
 *   --parallel <n>             default: 1
 *   --allow-missing-voice      rendert auch ohne voice.mp3 (Renderer nutzt
 *                              dann stille Tonspur) — default: skip
 *   --skip-validate            Schritt 1 aus
 *   --skip-generate            Schritt 2 aus
 *   --skip-voice               Schritt 2b (ElevenLabs) aus
 *   --help                     Hilfe
 *
 * Logs: logs/pilot-render.log
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const LOG_DIR = path.join(ROOT, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'pilot-render.log');

// .env automatisch laden (ElevenLabs u.a.).
require('./lib/env').loadProjectEnv({ cwd: ROOT });
const TMP_DIR = path.join(ROOT, '.pilot-render-tmp');
const PILOT_VIDEOS = path.join(ROOT, 'videos', 'pilot');
const PILOT_POSTERS = path.join(ROOT, 'posters', 'pilot');

const DEFAULT_PILOT_LESSONS = [
  'module01-lesson01',
  'module02-lesson01',
  'module04-lesson02',
  'module06-lesson03',
  'module09-lesson01',
];

// --- Tool-Pfade (tolerant gegen doppelte Ordnerstruktur) --------------------

function firstExisting(candidates, label) {
  for (const rel of candidates) {
    const abs = path.join(ROOT, rel);
    if (fs.existsSync(abs)) return abs;
  }
  throw new Error(`Tool nicht gefunden (${label}): ${candidates.join(' | ')}`);
}

const GENERATOR_CLI = firstExisting(
  [
    'lesson-asset-generator/lesson-asset-generator/src/cli.js',
    'lesson-asset-generator/src/cli.js',
  ],
  'lesson-asset-generator'
);

const RENDERER_BATCH = firstExisting(
  [
    'video-renderer/video-renderer/src/render-batch.js',
    'video-renderer/src/render-batch.js',
  ],
  'video-renderer'
);

const STYLE_ENGINE_DIR = firstExisting(
  ['video-style-engine/video-style-engine', 'video-style-engine'],
  'video-style-engine'
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
  const usage = String.raw`
DeFi Academy — Pilot Renderer

Usage:
  npm run pilot-render
  node scripts/pilot-render.js --lessons module01-lesson01,module04-lesson02

Flags:
  --lessons <csv>            Komma-Liste (default: ${DEFAULT_PILOT_LESSONS.join(',')})
  --lessons-dir <path>       default: ./lessons
  --generator-output <path>  default: ./generated-assets
  --assets-input <path>      default: ./assets-input
  --parallel <n>             default: 1
  --allow-missing-voice      auch ohne voice.mp3 rendern (default: skip)
  --skip-validate            Schritt 1 aus
  --skip-generate            Schritt 2 aus
  --skip-voice               Schritt 2b (ElevenLabs) aus
  --help                     Hilfe

Logs: logs/pilot-render.log
`;
  console.log(usage);
}

// --- Logger (identisches Format zu render-course.js, kleinerer Scope) -------

class RunLogger {
  constructor(logPath) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
    this.stream = fs.createWriteStream(logPath, { flags: 'w' });
    this.logPath = logPath;
  }
  _ts() {
    return new Date().toISOString();
  }
  _write(level, msg, lessonId) {
    const tag = lessonId ? `[${lessonId}]` : '';
    const line = `${this._ts()} ${level} ${tag} ${msg}`.trimEnd();
    this.stream.write(line + '\n');
    const colored =
      level === 'ERROR'
        ? `\x1b[31m${line}\x1b[0m`
        : level === 'WARN'
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
  section(title) {
    const bar = '─'.repeat(60);
    this.stream.write(`\n${bar}\n${title}\n${bar}\n`);
    // eslint-disable-next-line no-console
    console.log(`\n${bar}\n${title}\n${bar}`);
  }
  close() {
    return new Promise((resolve) => this.stream.end(resolve));
  }
}

// --- Child-Process-Helfer ---------------------------------------------------

function runChild(cmd, args, { log, lessonId, cwd } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd: cwd || ROOT,
      env: process.env,
      shell: false,
    });
    child.stdout.on('data', (buf) => {
      buf
        .toString()
        .split(/\r?\n/)
        .forEach((line) => line.trim() && log.info(`  ${line}`, lessonId));
    });
    child.stderr.on('data', (buf) => {
      buf
        .toString()
        .split(/\r?\n/)
        .forEach((line) => line.trim() && log.warn(`  ${line}`, lessonId));
    });
    child.on('error', (err) => resolve({ code: -1, error: err }));
    child.on('close', (code) => resolve({ code: code ?? 0 }));
  });
}

// --- Schritt 1: Validate ----------------------------------------------------

async function stepValidate(ctx) {
  ctx.log.section('1. Validate Lessons');
  if (ctx.args['skip-validate']) {
    ctx.log.warn('Uebersprungen (--skip-validate)');
    return true;
  }
  const node = process.execPath;
  const res = await runChild(
    node,
    [
      path.join(ROOT, 'scripts', 'validate-lessons.js'),
      '--lessons-dir',
      ctx.lessonsDir,
      '--skip-generated',
    ],
    { log: ctx.log }
  );
  if (res.code !== 0) {
    ctx.log.error(`Validator fehlgeschlagen (Exit ${res.code}) — Abbruch.`);
    return false;
  }
  ctx.log.info('Validator ok.');
  return true;
}

// --- Schritt 2: Generator pro Lesson ---------------------------------------

async function stepGenerateForLesson(ctx, lessonId) {
  const mdPath = path.join(ctx.lessonsDir, `${lessonId}.md`);
  if (!fs.existsSync(mdPath)) {
    ctx.log.warn(
      `Markdown fehlt: ${path.relative(ROOT, mdPath)} — Generator uebersprungen.`,
      lessonId
    );
    return { status: 'md-missing' };
  }
  const outDir = path.join(ctx.generatorOutputDir, lessonId);
  if (fs.existsSync(outDir)) {
    ctx.log.info('Generator-Output bereits vorhanden — uebersprungen.', lessonId);
    return { status: 'skipped-existing' };
  }
  fs.mkdirSync(ctx.generatorOutputDir, { recursive: true });
  const node = process.execPath;
  const res = await runChild(
    node,
    [
      GENERATOR_CLI,
      '--input',
      mdPath,
      '--out',
      ctx.generatorOutputDir,
      '--style',
      STYLE_ENGINE_DIR,
    ],
    { log: ctx.log, lessonId }
  );
  if (res.code !== 0) {
    ctx.log.error(`Generator-Fehler (Exit ${res.code}).`, lessonId);
    return { status: 'error' };
  }
  ctx.log.info('Generator ok.', lessonId);
  return { status: 'generated' };
}

// --- Schritt 3 + 4: Asset-Inventur per Lesson ------------------------------

function inventoryAssets(ctx, lessonId) {
  const genDir = path.join(ctx.generatorOutputDir, lessonId);
  const assetsDir = path.join(ctx.assetsInputDir, lessonId);
  const requiredGenerated = [
    'slides_prompt.txt',
    'voice_script.txt',
    'visual_plan.json',
    'video_config.json',
  ];
  const missingGenerated = requiredGenerated.filter(
    (f) => !fs.existsSync(path.join(genDir, f))
  );

  const voicePath = path.join(assetsDir, 'voice.mp3');
  const voiceOk = fs.existsSync(voicePath) && fs.statSync(voicePath).size > 1024;

  const visualsDir = path.join(assetsDir, 'visuals');
  const visualsCount = fs.existsSync(visualsDir)
    ? fs.readdirSync(visualsDir).filter((f) => /\.(png|jpe?g|webp|svg|gif)$/i.test(f))
        .length
    : 0;

  return {
    genDirExists: fs.existsSync(genDir),
    missingGenerated,
    voiceOk,
    voicePath,
    visualsCount,
  };
}

// --- Schritt 5: Renderer ----------------------------------------------------

async function stepRender(ctx, renderables) {
  ctx.log.section(`5. Render (${renderables.length} Lektion(en))`);
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  const node = process.execPath;
  const res = await runChild(
    node,
    [
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
      renderables.join(','),
    ],
    { log: ctx.log }
  );
  return res.code === 0;
}

// --- Schritt 6: Outputs nach videos/pilot + posters/pilot -------------------

function collectOutputs(ctx, renderables) {
  fs.mkdirSync(PILOT_VIDEOS, { recursive: true });
  fs.mkdirSync(PILOT_POSTERS, { recursive: true });

  const tmpVideos = path.join(TMP_DIR, 'videos');
  const tmpPosters = path.join(TMP_DIR, 'posters');
  const moved = [];

  for (const id of renderables) {
    const mp4From = path.join(tmpVideos, `${id}.mp4`);
    const jpgFrom = path.join(tmpPosters, `${id}.jpg`);
    if (fs.existsSync(mp4From)) {
      const mp4To = path.join(PILOT_VIDEOS, `${id}.mp4`);
      fs.renameSync(mp4From, mp4To);
      moved.push({ id, video: path.relative(ROOT, mp4To) });
    } else {
      ctx.log.warn(`MP4 fehlt im Temp-Output: ${id}`, id);
    }
    if (fs.existsSync(jpgFrom)) {
      const jpgTo = path.join(PILOT_POSTERS, `${id}.jpg`);
      fs.renameSync(jpgFrom, jpgTo);
    }
  }

  // Render-Report mit uebernehmen (bleibt informativ)
  const reportFrom = path.join(TMP_DIR, 'render-report.json');
  if (fs.existsSync(reportFrom)) {
    const reportTo = path.join(LOG_DIR, 'pilot-render-batch-report.json');
    fs.copyFileSync(reportFrom, reportTo);
  }

  fs.rmSync(TMP_DIR, { recursive: true, force: true });
  return moved;
}

// --- Main -------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printUsage();
    process.exit(0);
  }

  const lessonsArg = typeof args.lessons === 'string' ? args.lessons : null;
  const selected = lessonsArg
    ? lessonsArg.split(',').map((s) => s.trim()).filter(Boolean)
    : DEFAULT_PILOT_LESSONS.slice();

  for (const id of selected) {
    if (!/^module\d{2}-lesson\d{2}$/.test(id)) {
      console.error(`Ungueltige Lesson-ID: "${id}" (erwartet moduleXX-lessonYY)`);
      process.exit(2);
    }
  }

  const ctx = {
    args,
    lessonsDir: path.resolve(ROOT, args['lessons-dir'] || 'lessons'),
    generatorOutputDir: path.resolve(
      ROOT,
      args['generator-output'] || 'generated-assets'
    ),
    assetsInputDir: path.resolve(ROOT, args['assets-input'] || 'assets-input'),
    parallel: parseInt(args.parallel || '1', 10),
    allowMissingVoice: Boolean(args['allow-missing-voice']),
    selected,
  };

  fs.mkdirSync(LOG_DIR, { recursive: true });
  const log = new RunLogger(LOG_FILE);
  ctx.log = log;

  log.section('DeFi Academy — pilot-render');
  log.info(`Start:            ${new Date().toISOString()}`);
  log.info(`Lessons-Dir:      ${ctx.lessonsDir}`);
  log.info(`Generator-Out:    ${ctx.generatorOutputDir}`);
  log.info(`Assets-Input:     ${ctx.assetsInputDir}`);
  log.info(`Parallel:         ${ctx.parallel}`);
  log.info(`Allow no voice:   ${ctx.allowMissingVoice}`);
  log.info(`Pilot-Lektionen:  ${selected.join(', ')}`);
  log.info(`Log-Datei:        ${LOG_FILE}`);

  // 1. Validate
  const validateOk = await stepValidate(ctx);
  if (!validateOk) {
    await log.close();
    process.exit(1);
  }

  // 2. Generate per lesson (seriell — Pilot hat < 10 Lektionen, Latenz egal)
  log.section(`2. Generator pro Lektion (${selected.length})`);
  const perLesson = {};
  for (const id of selected) {
    log.info('Lesson start', id);
    perLesson[id] = {
      generator: { status: 'skipped-flag' },
      assets: null,
      rendered: false,
    };
    if (!ctx.args['skip-generate']) {
      perLesson[id].generator = await stepGenerateForLesson(ctx, id);
    } else {
      log.warn('Generator uebersprungen (--skip-generate)', id);
    }
  }

  // 2b. ElevenLabs Voice-Generation (nur fuer Lektionen mit Generator-Output)
  log.section('2b. ElevenLabs Voice-Generation');
  if (args['skip-voice']) {
    log.warn('Uebersprungen (--skip-voice)');
  } else {
    const voiceCandidates = selected.filter((id) =>
      fs.existsSync(path.join(ctx.generatorOutputDir, id, 'voice_script.txt'))
    );
    if (voiceCandidates.length === 0) {
      log.warn('Keine voice_script.txt-Dateien vorhanden — Schritt uebersprungen.');
    } else if (!process.env.ELEVENLABS_API_KEY) {
      log.warn(
        'ELEVENLABS_API_KEY nicht gesetzt — Voice-Generation uebersprungen. Vorhandene voice.mp3 werden genutzt, fehlende fuehren zu Skip (oder --allow-missing-voice).'
      );
    } else {
      const res = await runChild(
        process.execPath,
        [
          path.join(ROOT, 'scripts', 'generate-voice.js'),
          '--scripts-dir',
          ctx.generatorOutputDir,
          '--output-dir',
          ctx.assetsInputDir,
          '--only',
          voiceCandidates.join(','),
          '--concurrency',
          String(ctx.parallel),
        ],
        { log }
      );
      if (res.code !== 0) {
        log.warn(
          `generate-voice.js endete mit Exit ${res.code} — Pilot laeuft mit vorhandenen/fehlenden voice.mp3 weiter.`
        );
      } else {
        log.info('generate-voice.js ok.');
      }
    }
  }

  // 3 + 4. Asset-Inventur
  log.section('3. + 4. Asset-Inventur (Generator-Output, voice.mp3, visuals/)');
  const renderables = [];
  for (const id of selected) {
    const inv = inventoryAssets(ctx, id);
    perLesson[id].assets = inv;

    if (!inv.genDirExists) {
      log.warn(
        `Generator-Output fehlt (${path.relative(
          ROOT,
          path.join(ctx.generatorOutputDir, id)
        )}) — Lektion skippt.`,
        id
      );
      continue;
    }
    if (inv.missingGenerated.length > 0) {
      log.warn(
        `Pflicht-Dateien fehlen: ${inv.missingGenerated.join(', ')}`,
        id
      );
    }
    if (!inv.voiceOk) {
      if (ctx.allowMissingVoice) {
        log.warn(
          'Voice missing — rendere trotzdem (--allow-missing-voice).',
          id
        );
        renderables.push(id);
      } else {
        log.warn('Voice missing – skipping render', id);
        continue;
      }
    } else {
      log.info(
        `Assets ok (voice.mp3, ${inv.visualsCount} visuals vorhanden).`,
        id
      );
      renderables.push(id);
    }
  }

  if (renderables.length === 0) {
    log.warn(
      'Nichts zu rendern — alle ausgewaehlten Lektionen haben fehlende Pflicht-Assets.'
    );
    log.section('Zusammenfassung');
    logSummary(log, selected, perLesson);
    await log.close();
    process.exit(0);
  }

  log.info(`Renderbar: ${renderables.length}/${selected.length} — ${renderables.join(', ')}`);

  // 5. Render
  const renderOk = await stepRender(ctx, renderables);
  if (!renderOk) {
    log.error('Renderer fehlgeschlagen.');
  }

  // 6. Outputs einsammeln
  log.section('6. Outputs sortieren → videos/pilot + posters/pilot');
  const moved = collectOutputs(ctx, renderables);
  for (const m of moved) {
    perLesson[m.id].rendered = true;
    log.info(`Render success: ${m.video}`, m.id);
  }
  for (const id of renderables) {
    if (!perLesson[id].rendered) {
      log.error('Render error: kein MP4 entstanden.', id);
    }
  }

  // Zusammenfassung + Exit
  log.section('Zusammenfassung');
  logSummary(log, selected, perLesson);

  const successCount = Object.values(perLesson).filter((p) => p.rendered).length;
  log.info(
    `Pilot abgeschlossen: ${successCount}/${selected.length} Videos in videos/pilot/ und posters/pilot/`
  );

  await log.close();
  // Exit 1 nur bei Render-Crash; per-Lesson-Skips sind erwartetes Verhalten.
  process.exit(renderOk ? 0 : 1);
}

function logSummary(log, selected, perLesson) {
  const rows = [['lesson', 'generator', 'voice', 'rendered']];
  for (const id of selected) {
    const p = perLesson[id] || {};
    rows.push([
      id,
      p.generator?.status || '—',
      p.assets?.voiceOk ? 'yes' : 'NO',
      p.rendered ? 'yes' : 'NO',
    ]);
  }
  const colWidths = rows[0].map((_, i) =>
    Math.max(...rows.map((row) => String(row[i]).length))
  );
  for (const row of rows) {
    log.info(
      row.map((cell, i) => String(cell).padEnd(colWidths[i])).join('  ')
    );
  }
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('\nUnerwarteter Fehler:', err.stack || err.message);
  process.exit(1);
});
