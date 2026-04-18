#!/usr/bin/env node
/**
 * render-course.js
 *
 * Master-Orchestrator fuer die DeFi-Academy-Video-Produktionspipeline.
 *
 * Pipeline:
 *
 *   1. Pre-Render-Validator          (npm run validate-lessons)
 *   2. Lesson Asset Generator        (lesson-asset-generator/src/cli.js)
 *   3. Slides (Gamma)                (stub wenn GAMMA_API_KEY fehlt)
 *   4. Voice (ElevenLabs)            (stub wenn ELEVENLABS_API_KEY fehlt)
 *   5. Visuals Collection            (Download direkter Bild-URLs,
 *                                     sonst manuelle Erfassung)
 *   6. Video-Render (Batch)          (video-renderer/src/render-batch.js
 *                                     --parallel 2)
 *
 * Schritte 1 und 2 sind Hard-Gates: wenn sie scheitern, bricht der Lauf ab.
 * Schritte 3–5 laufen pro Lektion mit try/catch — eine Lektion mit fehlenden
 * Assets blockiert den Rest nicht. Schritt 6 rendert auch bei fehlenden
 * Assets (Renderer nutzt Platzhalter).
 *
 * Usage:
 *   npm run render-course
 *   node scripts/render-course.js --parallel 2 --dry-run
 *
 * Flags:
 *   --lessons-dir <path>       Quellverzeichnis (default: ./lessons)
 *   --generator-output <path>  Generator-Output (default: ./generator-output)
 *   --assets-input <path>      Externe Assets (default: ./assets-input)
 *   --output-dir <path>        Video-Output (default: .; erzeugt videos/, posters/)
 *   --parallel <n>             Parallelitaet fuer Slides/Voice/Visuals + Render (default 2)
 *   --only <ids>               Komma-Liste von Lesson-IDs (z. B. module04-lesson02)
 *   --skip-validate            Schritt 1 ueberspringen
 *   --skip-generate            Schritt 2 ueberspringen
 *   --skip-slides              Schritt 3 ueberspringen
 *   --skip-voice               Schritt 4 ueberspringen
 *   --skip-visuals             Schritt 5 ueberspringen
 *   --skip-render              Schritt 6 ueberspringen
 *   --dry-run                  Keine externen API-Aufrufe; nur Platzhalter erzeugen
 *   --help                     Diese Hilfe anzeigen
 *
 * Env:
 *   GAMMA_API_KEY              API-Key fuer Gamma. Fehlt er -> Stub-Modus.
 *   GAMMA_API_URL              Endpoint (default: https://api.gamma.app/v1/generations)
 *   ELEVENLABS_API_KEY         API-Key fuer ElevenLabs. Fehlt er -> skip.
 *   ELEVENLABS_VOICE_ID        Realer Voice-ID-Fallback (die logische ID aus
 *                              video_config.audio_track.voice_id wird zuerst probiert).
 *   ELEVENLABS_MODEL_ID        default: eleven_multilingual_v2
 *
 * Logs: logs/render-course.log (wird pro Lauf ueberschrieben).
 */

'use strict';

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const LOG_DIR = path.join(ROOT, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'render-course.log');

// --- Tool-Pfade (tolerant gegen doppelte Ordnerstruktur) ---------------------

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

// --- CLI ---------------------------------------------------------------------

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
DeFi Academy — Master-Render-Orchestrator

Usage:
  npm run render-course
  node scripts/render-course.js [flags]

Flags:
  --lessons-dir <path>       Lektionen (default: ./lessons)
  --generator-output <path>  Generator-Output (default: ./generator-output)
  --assets-input <path>      Externe Assets (default: ./assets-input)
  --output-dir <path>        Video-Output-Root (default: .)
  --parallel <n>             Parallelitaet (default: 2)
  --only <ids>               Komma-Liste von Lesson-IDs
  --skip-validate            Schritt 1 ueberspringen
  --skip-generate            Schritt 2 ueberspringen
  --skip-slides              Schritt 3 ueberspringen
  --skip-voice               Schritt 4 ueberspringen
  --skip-visuals             Schritt 5 ueberspringen
  --skip-render              Schritt 6 ueberspringen
  --dry-run                  Keine externen API-Aufrufe
  --help                     Diese Hilfe
`;
  console.log(usage);
}

// --- Logger ------------------------------------------------------------------

class RunLogger {
  constructor(logPath) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
    // Ueberschreibt Log pro Lauf — wer Historie will, rotiert sich eines.
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
    const consoleLine =
      level === 'ERROR'
        ? `\x1b[31m${line}\x1b[0m`
        : level === 'WARN'
        ? `\x1b[33m${line}\x1b[0m`
        : line;
    // eslint-disable-next-line no-console
    console.log(consoleLine);
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

// --- Child-Process-Helfer ----------------------------------------------------

function runChild(cmd, args, { log, lessonId, cwd } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd: cwd || ROOT,
      env: process.env,
      shell: false,
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (buf) => {
      const text = buf.toString();
      stdout += text;
      text.split(/\r?\n/).forEach((line) => {
        if (line.trim()) log.info(`  ${line}`, lessonId);
      });
    });
    child.stderr.on('data', (buf) => {
      const text = buf.toString();
      stderr += text;
      text.split(/\r?\n/).forEach((line) => {
        if (line.trim()) log.warn(`  ${line}`, lessonId);
      });
    });
    child.on('error', (err) => {
      resolve({ code: -1, stdout, stderr, error: err });
    });
    child.on('close', (code) => {
      resolve({ code: code ?? 0, stdout, stderr });
    });
  });
}

// --- Pool fuer parallele Lesson-Steps ---------------------------------------

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let idx = 0;
  async function next() {
    const i = idx++;
    if (i >= items.length) return;
    try {
      results[i] = { status: 'ok', item: items[i], value: await worker(items[i], i) };
    } catch (err) {
      results[i] = { status: 'error', item: items[i], error: err };
    }
    return next();
  }
  const starters = [];
  for (let k = 0; k < Math.min(concurrency, items.length); k++) starters.push(next());
  await Promise.all(starters);
  return results;
}

// --- Lesson-Discovery --------------------------------------------------------

function listGeneratedLessons(generatorOutputDir) {
  if (!fs.existsSync(generatorOutputDir)) return [];
  return fs
    .readdirSync(generatorOutputDir, { withFileTypes: true })
    .filter(
      (e) => e.isDirectory() && /^module\d{2}-lesson\d{2}$/.test(e.name)
    )
    .map((e) => e.name)
    .sort();
}

// --- Schritt 1: Validate -----------------------------------------------------

async function stepValidate(ctx) {
  ctx.log.section('1. Validate Lessons');
  if (ctx.args['skip-validate']) {
    ctx.log.warn('Uebersprungen (--skip-validate)');
    return true;
  }
  const node = process.execPath;
  const result = await runChild(
    node,
    [
      path.join(ROOT, 'scripts', 'validate-lessons.js'),
      '--lessons-dir',
      ctx.lessonsDir,
      ...(ctx.args['skip-generate'] || !fs.existsSync(ctx.generatorOutputDir)
        ? ['--skip-generated']
        : []),
    ],
    { log: ctx.log }
  );
  if (result.code !== 0) {
    ctx.log.error(`Validator fehlgeschlagen (Exit ${result.code}) — Abbruch.`);
    return false;
  }
  ctx.log.info('Validator ok.');
  return true;
}

// --- Schritt 2: Generate Assets ---------------------------------------------

async function stepGenerate(ctx) {
  ctx.log.section('2. Generate Lesson Assets');
  if (ctx.args['skip-generate']) {
    ctx.log.warn('Uebersprungen (--skip-generate)');
    return true;
  }
  if (!fs.existsSync(ctx.lessonsDir)) {
    ctx.log.error(`Lessons-Verzeichnis nicht gefunden: ${ctx.lessonsDir}`);
    return false;
  }
  fs.mkdirSync(ctx.generatorOutputDir, { recursive: true });
  const node = process.execPath;
  const result = await runChild(
    node,
    [
      GENERATOR_CLI,
      '--input-dir',
      ctx.lessonsDir,
      '--out',
      ctx.generatorOutputDir,
      '--style',
      STYLE_ENGINE_DIR,
    ],
    { log: ctx.log }
  );
  if (result.code !== 0) {
    // Generator-Exit-Code 1 kann auch bedeuten: einige Lektionen ok, einige nicht.
    // Wenn mindestens eine Lektion im Output existiert, fahren wir fort.
    const found = listGeneratedLessons(ctx.generatorOutputDir);
    if (found.length === 0) {
      ctx.log.error('Kein Generator-Output entstanden — Abbruch.');
      return false;
    }
    ctx.log.warn(
      `Generator meldete Fehler (Exit ${result.code}), aber ${found.length} Lektion(en) vorhanden — weiter.`
    );
  } else {
    ctx.log.info('Generator ok.');
  }
  return true;
}

// --- Schritt 3: Slides (Gamma) ----------------------------------------------

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

function buildSlidesStub(lessonId, videoConfig, visualPlan, promptText) {
  // Abgeleitet aus video_config.sections — ohne echte Bullet-Texte.
  const sections = Array.isArray(videoConfig.sections) ? videoConfig.sections : [];
  const contentSections = sections.filter((s) => s.scene === 'slide-template');
  const slides = contentSections.map((s) => ({
    id: s.slide_ref,
    section: s.name,
    title: s.name === 'lesson_title' ? videoConfig.title : s.name,
    bullets: [],
    speaker_notes: '',
    visuals: (visualPlan?.visuals || [])
      .filter((v) => v.slide_ref === s.slide_ref)
      .map((v) => ({ id: v.id, type: v.type, description: v.description })),
  }));
  return {
    lesson_id: lessonId,
    generated_by: 'render-course.js (stub)',
    _stub: true,
    _note:
      'Stub: echter Gamma-Export fehlt. slides_prompt.txt liegt daneben — manuell in Gamma importieren oder GAMMA_API_KEY setzen.',
    prompt_excerpt: (promptText || '').slice(0, 280),
    slides,
  };
}

async function callGamma(promptText, lessonId, log) {
  const apiKey = process.env.GAMMA_API_KEY;
  const apiUrl = process.env.GAMMA_API_URL || 'https://api.gamma.app/v1/generations';
  if (!apiKey) return null;
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        input_text: promptText,
        format: 'presentation',
        export_as: 'json',
      }),
    });
    if (!res.ok) {
      log.warn(`Gamma API HTTP ${res.status} ${res.statusText}`, lessonId);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    log.warn(`Gamma API Fehler: ${err.message}`, lessonId);
    return null;
  }
}

async function stepSlides(ctx, lessonId) {
  const genDir = path.join(ctx.generatorOutputDir, lessonId);
  const assetsDir = path.join(ctx.assetsInputDir, lessonId);
  const promptPath = path.join(genDir, 'slides_prompt.txt');
  const slidesOutPath = path.join(assetsDir, 'slides.json');
  const promptCopyPath = path.join(assetsDir, 'slides_prompt.txt');

  if (!fs.existsSync(promptPath)) {
    throw new Error(`slides_prompt.txt fehlt: ${promptPath}`);
  }

  fs.mkdirSync(assetsDir, { recursive: true });

  // Prompt immer in assets-input spiegeln — Operatoren koennen manuell arbeiten.
  fs.copyFileSync(promptPath, promptCopyPath);

  if (fs.existsSync(slidesOutPath)) {
    const existing = readJson(slidesOutPath);
    if (!existing._stub) {
      ctx.log.info('Slides vorhanden — uebersprungen.', lessonId);
      return { status: 'skipped', path: slidesOutPath };
    }
  }

  const promptText = fs.readFileSync(promptPath, 'utf8');
  const videoConfig = readJson(path.join(genDir, 'video_config.json'));
  const visualPlan = readJson(path.join(genDir, 'visual_plan.json'));

  if (!ctx.args['dry-run'] && process.env.GAMMA_API_KEY) {
    const remote = await callGamma(promptText, lessonId, ctx.log);
    if (remote) {
      writeJson(slidesOutPath, { ...remote, lesson_id: lessonId, _stub: false });
      ctx.log.info(`Slides via Gamma erzeugt: ${slidesOutPath}`, lessonId);
      return { status: 'generated', path: slidesOutPath };
    }
    ctx.log.warn('Gamma-API nicht nutzbar — Stub als Fallback.', lessonId);
  } else {
    ctx.log.info('GAMMA_API_KEY nicht gesetzt / dry-run — Stub.', lessonId);
  }

  const stub = buildSlidesStub(lessonId, videoConfig, visualPlan, promptText);
  writeJson(slidesOutPath, stub);
  ctx.log.info(`Slides-Stub geschrieben: ${slidesOutPath}`, lessonId);
  return { status: 'stub', path: slidesOutPath };
}

// --- Schritt 4: Voice (ElevenLabs) ------------------------------------------

async function stepVoice(ctx, lessonId) {
  // Delegiert an scripts/generate-voice.js pro Lesson-ID.
  // Damit bleibt die Voice-Erzeugung an einer einzigen Stelle (DRY) und
  // render-course profitiert automatisch von Retries / Batching /
  // Voice-ID-Mapping aus generate-voice.js.
  const genDir = path.join(ctx.generatorOutputDir, lessonId);
  const assetsDir = path.join(ctx.assetsInputDir, lessonId);
  const scriptPath = path.join(genDir, 'voice_script.txt');
  const voiceOutPath = path.join(assetsDir, 'voice.mp3');

  if (!fs.existsSync(scriptPath)) {
    throw new Error(`voice_script.txt fehlt: ${scriptPath}`);
  }
  fs.mkdirSync(assetsDir, { recursive: true });

  if (fs.existsSync(voiceOutPath) && fs.statSync(voiceOutPath).size > 1024) {
    ctx.log.info('voice.mp3 vorhanden — uebersprungen.', lessonId);
    return { status: 'skipped', path: voiceOutPath };
  }

  if (ctx.args['dry-run']) {
    ctx.log.info('dry-run — voice.mp3 uebersprungen.', lessonId);
    return { status: 'skipped' };
  }

  if (!process.env.ELEVENLABS_API_KEY) {
    ctx.log.info(
      'ELEVENLABS_API_KEY nicht gesetzt — voice.mp3 uebersprungen (Renderer nutzt stille Tonspur).',
      lessonId,
    );
    return { status: 'skipped' };
  }

  const generateVoiceScript = path.join(__dirname, 'generate-voice.js');
  const args = [
    generateVoiceScript,
    '--only', lessonId,
    '--scripts-dir', ctx.generatorOutputDir,
    '--output-dir', ctx.assetsInputDir,
  ];

  return new Promise((resolve, reject) => {
    const child = require('child_process').spawn(process.execPath, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: process.env,
    });
    let stderrBuf = '';
    child.stdout.on('data', (d) => {
      for (const line of String(d).split(/\r?\n/)) {
        if (line.trim()) ctx.log.info(`[generate-voice] ${line}`, lessonId);
      }
    });
    child.stderr.on('data', (d) => {
      stderrBuf += String(d);
    });
    child.on('close', (code) => {
      if (code !== 0) {
        return reject(
          new Error(`generate-voice.js exit=${code} ${stderrBuf.trim().slice(0, 400)}`),
        );
      }
      if (fs.existsSync(voiceOutPath) && fs.statSync(voiceOutPath).size > 1024) {
        const bytes = fs.statSync(voiceOutPath).size;
        ctx.log.info(`voice.mp3 erzeugt (${bytes} Bytes)`, lessonId);
        resolve({ status: 'generated', path: voiceOutPath, bytes });
      } else {
        // generate-voice.js kann bewusst ueberspringen (z.B. fehlende
        // Voice-ID-Map). Kein Fehler, nur Info.
        resolve({ status: 'skipped' });
      }
    });
    child.on('error', reject);
  });
}

// --- Schritt 5: Visuals ------------------------------------------------------

const IMAGE_EXT_RE = /\.(png|jpe?g|webp|svg|gif)(?:$|[?#])/i;

function extFromContentType(ct) {
  if (!ct) return null;
  const lower = ct.toLowerCase();
  if (lower.includes('png')) return 'png';
  if (lower.includes('jpeg') || lower.includes('jpg')) return 'jpg';
  if (lower.includes('webp')) return 'webp';
  if (lower.includes('svg')) return 'svg';
  if (lower.includes('gif')) return 'gif';
  return null;
}

async function downloadImage(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  let ext = extFromContentType(ct);
  if (!ext) {
    const m = url.match(IMAGE_EXT_RE);
    ext = m ? m[1].toLowerCase().replace('jpeg', 'jpg') : null;
  }
  if (!ext) throw new Error(`Kein Bild (content-type=${ct})`);
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, ext };
}

async function stepVisuals(ctx, lessonId) {
  const genDir = path.join(ctx.generatorOutputDir, lessonId);
  const assetsDir = path.join(ctx.assetsInputDir, lessonId);
  const visualsDir = path.join(assetsDir, 'visuals');
  const planPath = path.join(genDir, 'visual_plan.json');

  if (!fs.existsSync(planPath)) {
    throw new Error(`visual_plan.json fehlt: ${planPath}`);
  }

  fs.mkdirSync(visualsDir, { recursive: true });
  const plan = readJson(planPath);
  const visuals = Array.isArray(plan.visuals) ? plan.visuals : [];

  let resolved = 0;
  let needManual = 0;
  const manifest = [];

  for (const v of visuals) {
    const existing = fs
      .readdirSync(visualsDir)
      .find((f) => f.startsWith(`${v.id}.`));
    if (existing) {
      resolved++;
      manifest.push({ id: v.id, status: 'present', file: existing });
      continue;
    }

    const hint = v.source_url_hint;
    const isDirectImage = hint && IMAGE_EXT_RE.test(hint);

    if (!hint) {
      needManual++;
      manifest.push({
        id: v.id,
        status: 'manual',
        reason: 'kein source_url_hint',
        description: v.description,
      });
      continue;
    }

    if (!isDirectImage) {
      needManual++;
      manifest.push({
        id: v.id,
        status: 'manual',
        reason: 'URL ist keine direkte Bild-URL (manueller Screenshot noetig)',
        url: hint,
        description: v.description,
      });
      continue;
    }

    if (ctx.args['dry-run']) {
      manifest.push({
        id: v.id,
        status: 'would-fetch',
        url: hint,
      });
      continue;
    }

    try {
      const { buf, ext } = await downloadImage(hint);
      const outFile = path.join(visualsDir, `${v.id}.${ext}`);
      fs.writeFileSync(outFile, buf);
      resolved++;
      manifest.push({ id: v.id, status: 'fetched', file: `${v.id}.${ext}`, url: hint });
    } catch (err) {
      needManual++;
      manifest.push({
        id: v.id,
        status: 'fetch-failed',
        url: hint,
        error: err.message,
      });
      ctx.log.warn(`Visual ${v.id} Download fehlgeschlagen: ${err.message}`, lessonId);
    }
  }

  const manifestPath = path.join(assetsDir, 'visuals-manifest.json');
  writeJson(manifestPath, {
    lesson_id: lessonId,
    total: visuals.length,
    resolved,
    need_manual: needManual,
    items: manifest,
  });

  ctx.log.info(
    `Visuals: ${resolved}/${visuals.length} automatisch, ${needManual} manuell noetig.`,
    lessonId
  );
  return { status: 'ok', resolved, total: visuals.length, needManual };
}

// --- Schritt 6: Render ------------------------------------------------------

async function stepRender(ctx) {
  ctx.log.section('6. Render Videos');
  if (ctx.args['skip-render']) {
    ctx.log.warn('Uebersprungen (--skip-render)');
    return true;
  }
  fs.mkdirSync(path.join(ctx.outputDir, 'videos'), { recursive: true });
  fs.mkdirSync(path.join(ctx.outputDir, 'posters'), { recursive: true });

  const node = process.execPath;
  const args = [
    RENDERER_BATCH,
    '--generator',
    ctx.generatorOutputDir,
    '--lessons',
    ctx.lessonsDir,
    '--assets',
    ctx.assetsInputDir,
    '--output',
    ctx.outputDir,
    '--parallel',
    String(ctx.parallel),
  ];
  if (ctx.args.only) args.push('--only', ctx.args.only);

  const result = await runChild(node, args, { log: ctx.log });
  if (result.code !== 0) {
    ctx.log.error(`Renderer endete mit Exit ${result.code}.`);
    return false;
  }
  ctx.log.info('Renderer ok.');
  return true;
}

// --- Main --------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printUsage();
    process.exit(0);
  }

  const lessonsDir = path.resolve(ROOT, args['lessons-dir'] || 'lessons');
  const generatorOutputDir = path.resolve(
    ROOT,
    args['generator-output'] || 'generator-output'
  );
  const assetsInputDir = path.resolve(ROOT, args['assets-input'] || 'assets-input');
  const outputDir = path.resolve(ROOT, args['output-dir'] || '.');
  const parallel = parseInt(args.parallel || '2', 10);

  fs.mkdirSync(LOG_DIR, { recursive: true });
  const log = new RunLogger(LOG_FILE);

  log.section('DeFi Academy — render-course');
  log.info(`Start: ${new Date().toISOString()}`);
  log.info(`Lessons:         ${lessonsDir}`);
  log.info(`Generator-Out:   ${generatorOutputDir}`);
  log.info(`Assets-Input:    ${assetsInputDir}`);
  log.info(`Output:          ${outputDir}`);
  log.info(`Parallel:        ${parallel}`);
  log.info(`Dry-run:         ${args['dry-run'] ? 'yes' : 'no'}`);
  log.info(`Gamma-API:       ${process.env.GAMMA_API_KEY ? 'configured' : 'missing'}`);
  log.info(
    `ElevenLabs-API:  ${process.env.ELEVENLABS_API_KEY ? 'configured' : 'missing'}`
  );
  log.info(`Log-Datei:       ${LOG_FILE}`);

  const ctx = {
    args,
    log,
    lessonsDir,
    generatorOutputDir,
    assetsInputDir,
    outputDir,
    parallel,
  };

  // Hard-Gates
  const validateOk = await stepValidate(ctx);
  if (!validateOk) {
    log.error('Abbruch nach Validate.');
    await log.close();
    process.exit(1);
  }

  const generateOk = await stepGenerate(ctx);
  if (!generateOk) {
    log.error('Abbruch nach Generate.');
    await log.close();
    process.exit(1);
  }

  // Lesson-Liste aus Generator-Output
  let lessons = listGeneratedLessons(generatorOutputDir);
  if (args.only) {
    const filter = new Set(args.only.split(',').map((s) => s.trim()));
    lessons = lessons.filter((l) => filter.has(l));
  }
  if (lessons.length === 0) {
    log.error('Keine Lektionen gefunden.');
    await log.close();
    process.exit(1);
  }

  log.section(`3–5. Per-Lesson Assets (${lessons.length} Lektion(en), parallel=${parallel})`);

  const perLessonReport = {};
  const steps = [
    { key: 'slides', fn: stepSlides, skipFlag: 'skip-slides', label: '3. Slides' },
    { key: 'voice', fn: stepVoice, skipFlag: 'skip-voice', label: '4. Voice' },
    { key: 'visuals', fn: stepVisuals, skipFlag: 'skip-visuals', label: '5. Visuals' },
  ];

  await runPool(lessons, parallel, async (lessonId) => {
    log.info('Lesson start', lessonId);
    perLessonReport[lessonId] = {};
    for (const step of steps) {
      if (args[step.skipFlag]) {
        perLessonReport[lessonId][step.key] = { status: 'skipped-flag' };
        continue;
      }
      try {
        const result = await step.fn(ctx, lessonId);
        perLessonReport[lessonId][step.key] = result;
        log.info(
          `${step.label}: ${result?.status || 'done'}`,
          lessonId
        );
      } catch (err) {
        perLessonReport[lessonId][step.key] = { status: 'error', error: err.message };
        log.error(`${step.label} fehlgeschlagen: ${err.message}`, lessonId);
        // Weiter mit naechstem Schritt dieser Lektion — die Lektion wird
        // degraded gerendert, statt sie komplett auszusparen.
      }
    }
    log.info('Lesson per-asset steps abgeschlossen', lessonId);
  });

  // Schritt 6: Render (auch bei degradierten Assets)
  const renderOk = await stepRender(ctx);

  // Finale Zusammenfassung
  log.section('Zusammenfassung');
  const statusColumns = ['slides', 'voice', 'visuals'];
  const rows = [['lesson', ...statusColumns]];
  for (const lessonId of lessons) {
    const r = perLessonReport[lessonId] || {};
    rows.push([
      lessonId,
      ...statusColumns.map((c) => (r[c]?.status || '—')),
    ]);
  }
  const colWidths = rows[0].map((_, i) =>
    Math.max(...rows.map((row) => String(row[i]).length))
  );
  for (const row of rows) {
    const line = row
      .map((cell, i) => String(cell).padEnd(colWidths[i]))
      .join('  ');
    log.info(line);
  }
  log.info(`Render-Schritt: ${renderOk ? 'ok' : 'FEHLER'}`);

  const reportPath = path.join(LOG_DIR, 'render-course-report.json');
  writeJson(reportPath, {
    ran_at: new Date().toISOString(),
    lessons,
    per_lesson: perLessonReport,
    render_ok: renderOk,
  });
  log.info(`Report: ${reportPath}`);

  await log.close();
  // Exit 0 wenn Render durchlief — per-Lesson-Asset-Fehler sind per Design nicht fatal.
  process.exit(renderOk ? 0 : 1);
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('\nUnerwarteter Fehler:', err.stack || err.message);
  process.exit(1);
});
