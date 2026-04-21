#!/usr/bin/env node
/**
 * scripts/generate-slides.js
 *
 * Gamma-Visuals-Slicer für die DeFi-Academy-Video-Pipeline.
 *
 * ⚠ Achtung — Rollen-Regel:
 *   Gamma liefert in der neuen Architektur **nur Einzel-Visuals**
 *   (Diagramme/Illustrationen/Charts), die Remotion danach in die
 *   Visual-Area seines Slide-Templates einsetzt. Siehe
 *   docs/SLIDE_GENERATION_RULES.md.
 *
 *   Dieses Skript existiert als Fallback für den klassischen
 *   Deck-Slicing-Flow: Wer trotzdem ein Gamma-PDF hat, kann es hier
 *   in einzelne PNGs zerschneiden. Enthält das Deck komplette Slides
 *   (Titel + Bullets auf dem Bild), bricht das die Architektur-Regel.
 *   Für reguläre Produktion bitte den manuellen Visuals-Only-Pfad aus
 *   docs/VIDEO_PRODUCTION_WORKFLOW.md §3 nutzen.
 *
 * Flow pro Lektion (moduleXX-lessonYY)
 * ------------------------------------
 *   1. Finde `slides_prompt.txt` (priorisiert <generator-output>/<id>/,
 *      default: generated-assets), dann lessons/<id>/, dann assets-input/<id>/).
 *   2. Idempotenz-Gate: Wenn visual01.png bereits in
 *      assets-input/<id>/ liegt und nicht `--force`, überspringen.
 *   3. Slicing-Shortcut: Liegt assets-input/<id>/slides.pdf bereits vor
 *      (z. B. manuell aus Gamma exportiert), wird direkt in PNGs
 *      zerschnitten — kein API-Call.
 *   4. Gamma-API-Pfad: Mit `GAMMA_API_KEY` ruft das Skript Gamma
 *      `/generations` → polled bis `status=completed` → lädt das PDF →
 *      zerschneidet zu PNGs (bevorzugt `pdftoppm`, sonst PDF.js +
 *      `@napi-rs/canvas` ohne Poppler) → visual01.png, visual02.png, …
 *      Der API-Text ist absichtlich kurz; der Bildauftrag steht in
 *      `slides_prompt.txt` (lesson-asset-generator, knapper Brief).
 *   5. Manual-Handoff-Fallback: Ohne Key oder wenn PDF→PNG fehlschlägt,
 *      wird der Prompt nach assets-input/<id>/slides_prompt.txt kopiert
 *      und eine README hinterlegt.
 *
 * Ausgabestruktur
 *   assets-input/<id>/
 *     visual01.png
 *     visual02.png
 *     ...
 *     slides.pdf            (optional, nur wenn API-Flow oder manuell)
 *     slides_prompt.txt     (Kopie, für manuelle Weiterverarbeitung)
 *
 * CLI
 *   node scripts/generate-slides.js
 *   node scripts/generate-slides.js --only module01-lesson01,module04-lesson02
 *   node scripts/generate-slides.js --force --concurrency 3
 *   node scripts/generate-slides.js --dry-run
 *
 * Flags
 *   --generator-output <path>  default: ./generated-assets
 *   --assets-input <path>      default: ./assets-input
 *   --lessons-dir <path>       default: ./lessons (Fallback-Quelle für
 *                                                  slides_prompt.txt)
 *   --only <csv>               nur diese Lesson-IDs
 *   --force                    bestehende PNGs neu generieren
 *   --concurrency <n>          default: 1 (Gamma-Rate-Limit schützen)
 *   --dry-run                  kein API-Call, kein Slicing, nur Planung
 *   --pdftoppm <path>          expliziter Pfad zur pdftoppm-Binary
 *   --dpi <n>                  default: 150 (Auflösung für Slicing)
 *   --help
 *
 * Env
 *   GAMMA_API_KEY              Gamma Generate API Key (Beta). Fehlt er,
 *                              läuft das Skript im Manual-Handoff-Modus.
 *   GAMMA_API_URL              default: https://public-api.gamma.app/v1.0/generations
 *   GAMMA_FORMAT               default: presentation
 *   GAMMA_THEME                optional, Theme-Name aus Gamma-Account
 *   GAMMA_POLL_INTERVAL_MS     default: 4000
 *   GAMMA_POLL_TIMEOUT_MS      default: 300000 (5 Minuten)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
require('./lib/env').loadProjectEnv({ cwd: ROOT });
const LOG_DIR = path.join(ROOT, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'generate-slides.log');

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
DeFi Academy — Gamma Slides Generator

Usage:
  node scripts/generate-slides.js [flags]

Flags:
  --generator-output <path>  default: ./generated-assets
  --assets-input <path>      default: ./assets-input
  --lessons-dir <path>       default: ./lessons
  --only <csv>               explizite Lesson-ID-Liste
  --force                    bestehende PNGs neu rendern
  --concurrency <n>          default: 1
  --dry-run                  kein API-Call / Slicing
  --pdftoppm <path>          expliziter pdftoppm-Pfad
  --dpi <n>                  default: 150
  --help                     Hilfe

Env:
  GAMMA_API_KEY              Gamma Generate API Key
  GAMMA_API_URL              default: https://public-api.gamma.app/v1.0/generations
  GAMMA_TEXT_MODE            generate | condense | preserve (default: preserve)
  GAMMA_FORMAT               default: presentation
  GAMMA_THEME_ID             optional Theme-UUID (API v1)
  GAMMA_THEME                optional Alias fuer themeId (Name funktioniert ggf. nicht)
  GAMMA_POLL_INTERVAL_MS     default: 4000
  GAMMA_POLL_TIMEOUT_MS      default: 300000
  GAMMA_SLICE_DPI            optional: PNG-Aufloesung beim PDF-Slicing (default: --dpi / 150; pdftoppm + PDF.js)
  GAMMA_API_PROMPT_PREFIX    optional: ersetzt den kurzen API-Prefix (sonst 2 Zeilen)
  GAMMA_DISABLE_API_PROMPT_PREFIX  set to 1 to skip any prefix
`);
}

// --- Logger -----------------------------------------------------------------

class Logger {
  constructor(logPath) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
    this.stream = fs.createWriteStream(logPath, { flags: 'w' });
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
        : level === 'WARN '
        ? `\x1b[33m${line}\x1b[0m`
        : line;
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
  async close() {
    return new Promise((r) => this.stream.end(r));
  }
}

// --- Discovery --------------------------------------------------------------

function discoverLessons(generatorOutputDir, lessonsDir, log) {
  const set = new Set();
  const re = /^module\d{2}-lesson\d{2}$/;
  const pushFromDir = (dir, kind) => {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory() && re.test(e.name)) set.add(e.name);
      if (kind === 'lessons' && e.isFile()) {
        const m = e.name.match(/^(module\d{2}-lesson\d{2})\.md$/);
        if (m) set.add(m[1]);
      }
    }
  };
  pushFromDir(generatorOutputDir, 'gen');
  pushFromDir(lessonsDir, 'lessons');
  return [...set].sort();
}

function findPromptPath(lessonId, { generatorOutputDir, lessonsDir, assetsInputDir }) {
  const candidates = [
    path.join(generatorOutputDir, lessonId, 'slides_prompt.txt'),
    path.join(lessonsDir, lessonId, 'slides_prompt.txt'),
    path.join(assetsInputDir, lessonId, 'slides_prompt.txt'),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  return null;
}

// --- pdftoppm ---------------------------------------------------------------

/**
 * Chocolatey: echte EXE oft tief unter lib\\poppler\\tools, Shim dagegen unter
 * %ChocolateyInstall%\\bin (steht oft nicht in der PATH-Session).
 */
function findPdftoppmOnWindows() {
  if (process.platform !== 'win32') return [];
  const programData = process.env.ProgramData || 'C:\\ProgramData';
  const chocoInstall = (process.env.ChocolateyInstall || path.join(programData, 'chocolatey')).replace(
    /[/\\]+$/,
    ''
  );
  const roots = [
    path.join(chocoInstall, 'bin'),
    path.join(programData, 'chocolatey', 'bin'),
    path.join(programData, 'chocolatey', 'lib', 'poppler', 'tools'),
    path.join(programData, 'chocolatey', 'lib-bad', 'poppler', 'tools'),
  ];
  const found = new Set();
  for (const shimDir of [roots[0], roots[1]]) {
    const shim = path.join(shimDir, 'pdftoppm.exe');
    if (fs.existsSync(shim)) found.add(path.resolve(shim));
  }
  function walk(dir, depth) {
    if (depth > 10 || found.size >= 5) return;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full, depth + 1);
      else if (e.name.toLowerCase() === 'pdftoppm.exe') found.add(path.resolve(full));
    }
  }
  for (const root of roots.slice(2)) {
    if (fs.existsSync(root)) walk(root, 0);
  }
  return [...found];
}

/** Windows: `where.exe pdftoppm` falls doch irgendwo im PATH. */
function wherePdftoppmOnWindows() {
  if (process.platform !== 'win32') return null;
  const r = spawnSync('where.exe', ['pdftoppm'], { encoding: 'utf8', windowsHide: true });
  if (r.status !== 0 || !r.stdout) return null;
  const line = r.stdout.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)[0];
  return line && fs.existsSync(line) ? line : null;
}

function normalizeExplicitPdftoppmArg(raw) {
  if (raw == null || typeof raw !== 'string') return null;
  let t = raw.trim().replace(/^["']|["']$/g, '');
  if (!t || t.includes('\u2026') || t.includes('...')) return null;
  t = path.resolve(t);
  return t;
}

function resolvePdftoppm(explicitRaw, log) {
  const probes = [];
  const explicit = normalizeExplicitPdftoppmArg(
    typeof explicitRaw === 'string' ? explicitRaw : null
  );
  if (explicitRaw && typeof explicitRaw === 'string' && explicitRaw.trim() && !explicit) {
    if (log && log.warn) {
      log.warn(
        '--pdftoppm ungueltig (Pfad mit … oder nicht aufloesbar). Bitte echte pdftoppm.exe angeben.'
      );
    }
  }
  if (explicit) {
    if (fs.existsSync(explicit)) probes.push(explicit);
    else if (log && log.warn) {
      log.warn(`--pdftoppm Datei nicht gefunden: ${explicit}`);
    }
  }
  const whereWin = wherePdftoppmOnWindows();
  if (whereWin) probes.push(whereWin);
  probes.push('pdftoppm');
  probes.push(...findPdftoppmOnWindows());
  const seen = new Set();
  for (const bin of probes) {
    if (!bin || seen.has(bin)) continue;
    seen.add(bin);
    const r = spawnSync(bin, ['-v'], {
      encoding: 'utf8',
      windowsHide: true,
    });
    if (r.status === 0 || (r.stderr || '').toLowerCase().includes('pdftoppm')) {
      return bin;
    }
  }
  return null;
}

function sliceePdfToPngs({ pdfPath, outputDir, dpi, pdftoppm, log, lessonId }) {
  fs.mkdirSync(outputDir, { recursive: true });
  // pdftoppm zerlegt ein PDF in <prefix>-1.png, <prefix>-2.png, ...
  const prefix = path.join(outputDir, '__slide');
  const res = spawnSync(
    pdftoppm,
    ['-r', String(dpi), '-png', pdfPath, prefix],
    { encoding: 'utf8' }
  );
  if (res.status !== 0) {
    log.error(
      `pdftoppm schlug fehl (exit ${res.status}): ${(res.stderr || '').trim()}`,
      lessonId
    );
    return [];
  }
  const produced = fs
    .readdirSync(outputDir)
    .filter((n) => n.startsWith('__slide-') && n.endsWith('.png'))
    .map((n) => ({
      full: path.join(outputDir, n),
      index: parseInt(n.match(/__slide-(\d+)\.png$/)[1], 10),
    }))
    .sort((a, b) => a.index - b.index);

  const renamed = [];
  for (let i = 0; i < produced.length; i++) {
    const pad = String(i + 1).padStart(2, '0');
    const finalName = path.join(outputDir, `visual${pad}.png`);
    // Falls alte Version existiert, überschreiben
    if (fs.existsSync(finalName)) fs.rmSync(finalName);
    fs.renameSync(produced[i].full, finalName);
    renamed.push(finalName);
    log.info(`Saved visual${pad}.png`, lessonId);
  }
  return renamed;
}

/** Ohne Poppler: pdfjs-dist + @napi-rs/canvas (npm devDependencies). */
function canSlicePdfWithPdfJs() {
  try {
    require.resolve('pdfjs-dist/package.json');
    require.resolve('@napi-rs/canvas/package.json');
    return true;
  } catch {
    return false;
  }
}

/**
 * PDF → visual01.png … (reine Node-Abhaengigkeiten, kein pdftoppm).
 * @returns {Promise<string[]>} Pfade der geschriebenen PNGs
 */
async function slicePdfToPngsPdfJs({ pdfPath, outputDir, dpi, log, lessonId }) {
  fs.mkdirSync(outputDir, { recursive: true });
  let getDocument;
  let createCanvas;
  try {
    const pdfMod = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const canvasMod = await import('@napi-rs/canvas');
    getDocument = pdfMod.getDocument;
    createCanvas = canvasMod.createCanvas;
  } catch (err) {
    log.error(`PDF.js-Module laden fehlgeschlagen: ${err.message}`, lessonId);
    return [];
  }
  const renamed = [];
  try {
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const scale = dpi / 72;
    const loadingTask = getDocument({
      data,
      verbosity: 0,
      useSystemFonts: true,
      isEvalSupported: false,
    });
    const doc = await loadingTask.promise;
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const viewport = page.getViewport({ scale });
      const w = Math.max(1, Math.ceil(viewport.width));
      const h = Math.max(1, Math.ceil(viewport.height));
      const canvas = createCanvas(w, h);
      const ctx = canvas.getContext('2d');
      await page.render({
        canvasContext: ctx,
        viewport,
        background: '#ffffff',
      }).promise;
      const pad = String(p).padStart(2, '0');
      const finalName = path.join(outputDir, `visual${pad}.png`);
      fs.writeFileSync(finalName, canvas.toBuffer('image/png'));
      renamed.push(finalName);
      log.info(`Saved visual${pad}.png (PDF.js)`, lessonId);
    }
  } catch (err) {
    log.error(`PDF.js-Slicing: ${err.message}`, lessonId);
    return [];
  }
  return renamed;
}

// --- Gamma-API --------------------------------------------------------------

/**
 * Sehr kurzer API-Prefix — der inhaltliche Brief steht in slides_prompt.txt
 * (lesson-asset-generator) und ist absichtlich knapp gehalten.
 * GAMMA_DISABLE_API_PROMPT_PREFIX=1 → nur promptText.
 * GAMMA_API_PROMPT_PREFIX=... → ersetzt den eingebauten Mini-Prefix.
 */
function buildGammaInputText(promptText) {
  if (String(process.env.GAMMA_DISABLE_API_PROMPT_PREFIX || '').trim() === '1') {
    return promptText;
  }
  const custom = (process.env.GAMMA_API_PROMPT_PREFIX || '').trim();
  if (custom) {
    return `${custom}\n\n---\n\n${promptText}`;
  }
  const builtIn = [
    'Each numbered line in the file = one page = one image only (no slide layout, no paragraphs on canvas).',
    '',
  ].join('\n');
  return `${builtIn}${promptText}`;
}

function gammaGenerationsPostUrl() {
  const u = (process.env.GAMMA_API_URL || '').trim().replace(/\/$/, '');
  if (u) return u;
  return 'https://public-api.gamma.app/v1.0/generations';
}

function gammaGenerationStatusUrl(generationId) {
  const post = gammaGenerationsPostUrl();
  return `${post}/${encodeURIComponent(generationId)}`;
}

async function gammaCreateGeneration(promptText, log, lessonId) {
  const apiKey = process.env.GAMMA_API_KEY;
  if (!apiKey) return null;

  const apiUrl = gammaGenerationsPostUrl();
  const format = process.env.GAMMA_FORMAT || 'presentation';
  const textMode = (process.env.GAMMA_TEXT_MODE || 'preserve').trim();
  const body = {
    inputText: buildGammaInputText(promptText),
    textMode,
    format,
    exportAs: 'pdf',
  };
  const themeId =
    (process.env.GAMMA_THEME_ID || process.env.GAMMA_THEME || '').trim();
  if (themeId) body.themeId = themeId;

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify(body),
    });
    const raw = await res.text();
    let data = null;
    try {
      data = JSON.parse(raw);
    } catch {
      /* noop */
    }
    if (!res.ok) {
      log.warn(
        `Gamma API POST HTTP ${res.status} ${res.statusText}: ${raw.slice(0, 200)}`,
        lessonId
      );
      return null;
    }
    const id =
      (data && (data.generationId || data.id)) ||
      null;
    if (!id) {
      log.warn(
        `Gamma API POST ok, aber keine generationId im Body: ${raw.slice(0, 200)}`,
        lessonId
      );
      return null;
    }
    return { generationId: id, raw: data };
  } catch (err) {
    log.warn(`Gamma API POST Fehler: ${err.message}`, lessonId);
    return null;
  }
}

function extractPdfUrl(statusBody) {
  if (!statusBody || typeof statusBody !== 'object') return null;
  const probes = [
    statusBody.exportUrl,
    statusBody.export_url,
    statusBody.pdfUrl,
    statusBody.pdf_url,
    statusBody.export && statusBody.export.pdfUrl,
    statusBody.export && statusBody.export.url,
    statusBody.exports && statusBody.exports.pdf,
    statusBody.data && statusBody.data.pdfUrl,
  ];
  for (const p of probes) if (typeof p === 'string' && p.startsWith('http')) return p;
  return null;
}

async function gammaPollGeneration(generationId, log, lessonId) {
  const apiKey = process.env.GAMMA_API_KEY;
  const statusUrl = gammaGenerationStatusUrl(generationId);
  const interval = parseInt(process.env.GAMMA_POLL_INTERVAL_MS || '4000', 10);
  const timeout = parseInt(process.env.GAMMA_POLL_TIMEOUT_MS || '300000', 10);
  const deadline = Date.now() + timeout;

  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, interval));
    try {
      const res = await fetch(statusUrl, {
        headers: { 'X-API-KEY': apiKey },
      });
      const raw = await res.text();
      if (!res.ok) {
        log.warn(
          `Gamma status HTTP ${res.status}: ${raw.slice(0, 200)}`,
          lessonId
        );
        continue;
      }
      let data = null;
      try {
        data = JSON.parse(raw);
      } catch {
        /* noop */
      }
      const status = (data && (data.status || data.state || '')) + '';
      if (/completed|success|done|finished/i.test(status)) {
        const pdf = extractPdfUrl(data);
        if (!pdf) {
          log.warn(
            `Gamma fertig, aber keine PDF-URL im Body: ${raw.slice(0, 200)}`,
            lessonId
          );
          return null;
        }
        return { pdfUrl: pdf, raw: data };
      }
      if (/failed|error|cancelled/i.test(status)) {
        log.warn(`Gamma status=${status}: ${raw.slice(0, 200)}`, lessonId);
        return null;
      }
      log.info(`Gamma poll: status=${status || 'pending'}`, lessonId);
    } catch (err) {
      log.warn(`Gamma poll Fehler: ${err.message}`, lessonId);
    }
  }
  log.warn(`Gamma poll Timeout nach ${timeout}ms`, lessonId);
  return null;
}

async function downloadToFile(url, destPath, log, lessonId) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      log.warn(`PDF-Download HTTP ${res.status} ${res.statusText}`, lessonId);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, buf);
    return true;
  } catch (err) {
    log.warn(`PDF-Download Fehler: ${err.message}`, lessonId);
    return false;
  }
}

// --- Manual-Handoff ---------------------------------------------------------

const HANDOFF_README = [
  '# Manual Gamma Handoff',
  '',
  '> Pflichtlektuere vorher: docs/SLIDE_GENERATION_RULES.md',
  '> Gamma liefert nur Einzel-Visuals, nicht komplette Slides.',
  '',
  'Der automatische Gamma-Pfad war diesmal nicht verfuegbar (kein',
  'GAMMA_API_KEY, oder PDF→PNG schlug fehl / pdfjs-dist fehlt).',
  '',
  '## Empfohlener Weg — Einzel-Visuals',
  '',
  '1. Oeffne slides_prompt.txt aus diesem Ordner in https://gamma.app/',
  '   (oder einem anderen AI-Bildgenerator).',
  '2. Erzeuge pro Slide EIN Einzel-Visual (Diagramm/Illustration/',
  '   Chart, 16:9 oder 1:1, transparent oder dunkler Hintergrund).',
  '3. KEINE Slide-Titel, KEINE Bullets, KEINE Branding-Chrome auf',
  '   das Bild. Das Slide-Layout rendert Remotion zur Build-Zeit.',
  '4. Speichere die Bilder als visual01.png, visual02.png, ...',
  '   direkt HIER (neben dieser README).',
  '5. Weiter mit:',
  '',
  '       npm run render:course',
  '',
  '## Notfall-Pfad — Gamma-Deck als PDF',
  '',
  'Nur verwenden, wenn das Gamma-Deck selbst ausschliesslich',
  'Einzel-Visuals auf neutralem Hintergrund enthaelt (KEINE Decks',
  'mit Titel-Layouts, dann bricht die Architektur-Regel).',
  '',
  '1. Export in Gamma als PDF, Datei als slides.pdf HIER ablegen.',
  '2. Fuehre aus:',
  '',
  '       npm run generate:slides -- --only <moduleXX-lessonYY>',
  '',
  'Das Skript schneidet slides.pdf in visual01.png, visual02.png, ...',
  '',
].join('\n');

function writeHandoff({ lessonId, promptText, assetsDir }) {
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.writeFileSync(path.join(assetsDir, 'slides_prompt.txt'), promptText, 'utf8');
  const readmePath = path.join(assetsDir, 'SLIDES_HANDOFF.md');
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(
      readmePath,
      HANDOFF_README.replace('<moduleXX-lessonYY>', lessonId),
      'utf8'
    );
  }
}

// --- Per-Lesson-Flow --------------------------------------------------------

async function processLesson(lessonId, ctx) {
  const { log } = ctx;
  const assetsDir = path.join(ctx.assetsInputDir, lessonId);
  fs.mkdirSync(assetsDir, { recursive: true });

  // Idempotenz: visual01.png (neu) ODER slide01.png (alt) als Marker.
  const hasVisual01 = fs.existsSync(path.join(assetsDir, 'visual01.png'));
  const hasSlide01 = fs.existsSync(path.join(assetsDir, 'slide01.png'));
  if ((hasVisual01 || hasSlide01) && !ctx.force) {
    log.info(
      hasVisual01
        ? 'Visuals schon da (visual01.png) — skip.'
        : 'Slides schon da (slide01.png, alte Konvention) — skip.',
      lessonId
    );
    return { lessonId, status: 'skipped' };
  }

  const promptPath = findPromptPath(lessonId, ctx);
  if (!promptPath) {
    log.warn('slides_prompt.txt nicht gefunden — skip.', lessonId);
    return { lessonId, status: 'no-prompt' };
  }
  const promptText = fs.readFileSync(promptPath, 'utf8');

  log.info(`Generating slides for ${lessonId}`, lessonId);

  if (ctx.dryRun) {
    log.info('[dry-run] kein API-Call, kein Slicing.', lessonId);
    return { lessonId, status: 'dry-run' };
  }

  const pdfPath = path.join(assetsDir, 'slides.pdf');
  let pdfReady = fs.existsSync(pdfPath);

  if (!pdfReady) {
    if (process.env.GAMMA_API_KEY) {
      log.info('Rufe Gamma-API auf …', lessonId);
      const created = await gammaCreateGeneration(promptText, log, lessonId);
      if (created) {
        log.info(`Gamma generationId=${created.generationId}`, lessonId);
        const polled = await gammaPollGeneration(
          created.generationId,
          log,
          lessonId
        );
        if (polled && polled.pdfUrl) {
          log.info('Lade PDF …', lessonId);
          const ok = await downloadToFile(polled.pdfUrl, pdfPath, log, lessonId);
          if (ok) {
            log.info(`Saved slides.pdf (${fs.statSync(pdfPath).size} bytes)`, lessonId);
            pdfReady = true;
          }
        }
      }
    } else {
      log.warn('GAMMA_API_KEY nicht gesetzt — Manual-Handoff.', lessonId);
    }
  } else {
    log.info('slides.pdf liegt bereits vor — slicing only.', lessonId);
  }

  if (!pdfReady) {
    writeHandoff({ lessonId, promptText, assetsDir });
    log.info('Handoff-Hinweis geschrieben (SLIDES_HANDOFF.md).', lessonId);
    return { lessonId, status: 'handoff' };
  }

  let renamed = [];
  if (ctx.pdftoppm) {
    renamed = sliceePdfToPngs({
      pdfPath,
      outputDir: assetsDir,
      dpi: ctx.dpi,
      pdftoppm: ctx.pdftoppm,
      log,
      lessonId,
    });
  }
  if (renamed.length === 0 && canSlicePdfWithPdfJs()) {
    if (ctx.pdftoppm) {
      log.warn(
        'pdftoppm lieferte keine PNGs — Fallback: PDF.js (@napi-rs/canvas).',
        lessonId
      );
    } else {
      log.info(
        'pdftoppm nicht im PATH — PDF-Slicing mit PDF.js (ohne Poppler).',
        lessonId
      );
    }
    renamed = await slicePdfToPngsPdfJs({
      pdfPath,
      outputDir: assetsDir,
      dpi: ctx.dpi,
      log,
      lessonId,
    });
  }
  if (renamed.length === 0) {
    log.warn(
      'PDF→PNG nicht moeglich (weder pdftoppm noch PDF.js). ' +
        'Windows: optional choco install poppler, oder npm ci fuer pdfjs-dist + @napi-rs/canvas.',
      lessonId
    );
    writeHandoff({ lessonId, promptText, assetsDir });
    return { lessonId, status: 'no-pdftoppm' };
  }

  if (renamed.length === 0) {
    log.error('Slicing lieferte 0 Bilder.', lessonId);
    return { lessonId, status: 'slice-failed' };
  }

  // Prompt zur Nachvollziehbarkeit mitkopieren.
  fs.writeFileSync(path.join(assetsDir, 'slides_prompt.txt'), promptText, 'utf8');

  log.info(
    `Fertig: ${renamed.length} PNGs in ${path.relative(ROOT, assetsDir)}`,
    lessonId
  );
  return {
    lessonId,
    status: 'generated',
    count: renamed.length,
    files: renamed.map((f) => path.relative(ROOT, f)),
  };
}

// --- Pool -------------------------------------------------------------------

async function runPool(items, concurrency, worker) {
  const results = [];
  let i = 0;
  async function lane() {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      results[idx] = await worker(items[idx]);
    }
  }
  const lanes = Array.from({ length: Math.max(1, concurrency) }, () => lane());
  await Promise.all(lanes);
  return results;
}

// --- Main -------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printUsage();
    process.exit(0);
  }

  fs.mkdirSync(LOG_DIR, { recursive: true });
  const log = new Logger(LOG_FILE);

  const ctx = {
    generatorOutputDir: path.resolve(
      ROOT,
      args['generator-output'] || 'generated-assets'
    ),
    assetsInputDir: path.resolve(ROOT, args['assets-input'] || 'assets-input'),
    lessonsDir: path.resolve(ROOT, args['lessons-dir'] || 'lessons'),
    force: Boolean(args.force),
    dryRun: Boolean(args['dry-run']),
    concurrency: Math.max(1, parseInt(args.concurrency || '1', 10)),
    dpi: Math.max(
      72,
      parseInt(
        args.dpi != null && args.dpi !== true
          ? args.dpi
          : process.env.GAMMA_SLICE_DPI || '150',
        10
      )
    ),
    pdftoppm: null,
    log,
  };

  log.info('DeFi Academy — generate-slides');
  log.info(`Generator-Out:  ${ctx.generatorOutputDir}`);
  log.info(`Assets-Input:   ${ctx.assetsInputDir}`);
  log.info(`Lessons-Dir:    ${ctx.lessonsDir}`);
  log.info(`Concurrency:    ${ctx.concurrency}`);
  log.info(`DPI:            ${ctx.dpi}`);
  log.info(`Force:          ${ctx.force}`);
  log.info(`Dry-Run:        ${ctx.dryRun}`);
  const gammaKey = process.env.GAMMA_API_KEY;
  log.info(
    `Gamma-API:      ${
      gammaKey && String(gammaKey).trim()
        ? 'configured'
        : 'missing (Handoff-Modus) — .env/.env.local: GAMMA_API_KEY=... (UTF-8), keine leere Zeile in .env.local die den Key überschreibt'
    }`
  );

  ctx.pdftoppm = resolvePdftoppm(
    typeof args.pdftoppm === 'string' ? args.pdftoppm : null,
    log
  );
  const pdfJsOk = canSlicePdfWithPdfJs();
  log.info(
    `pdftoppm:       ${
      ctx.pdftoppm ||
      'missing (Chocolatey: Shim unter %ChocolateyInstall%\\bin — oder --pdftoppm "C:\\...\\pdftoppm.exe" ohne …)'
    }`
  );
  log.info(
    `PDF-Slicing:    ${
      ctx.pdftoppm
        ? 'Poppler zuerst, bei Fehlschlag PDF.js'
        : pdfJsOk
        ? 'PDF.js + @napi-rs/canvas (kein Poppler noetig)'
        : 'FEHLT — npm install (pdfjs-dist, @napi-rs/canvas) ausfuehren'
    }`
  );

  // --- Lesson-Liste ---------------------------------------------------------
  let lessons = discoverLessons(
    ctx.generatorOutputDir,
    ctx.lessonsDir,
    log
  );
  if (typeof args.only === 'string') {
    const filter = new Set(args.only.split(',').map((s) => s.trim()).filter(Boolean));
    lessons = lessons.filter((l) => filter.has(l));
    // Auch explizit angeforderte IDs durchlassen, die (noch) nicht im Discovery liegen
    for (const id of filter) if (!lessons.includes(id)) lessons.push(id);
    lessons.sort();
  }

  if (lessons.length === 0) {
    log.warn('Keine Lektionen zu verarbeiten.');
    await log.close();
    process.exit(0);
  }

  log.info(`Lektionen: ${lessons.length} (${lessons.join(', ')})`);

  // --- Verarbeiten ----------------------------------------------------------
  const results = await runPool(lessons, ctx.concurrency, (id) =>
    processLesson(id, ctx).catch((err) => ({
      lessonId: id,
      status: 'error',
      error: err.message || String(err),
    }))
  );

  // --- Summary --------------------------------------------------------------
  const counts = {};
  for (const r of results) counts[r.status] = (counts[r.status] || 0) + 1;

  log.info('');
  log.info('━'.repeat(60));
  log.info(
    `Summary: ${Object.entries(counts)
      .map(([k, v]) => `${v} ${k}`)
      .join(', ')}`
  );
  log.info('━'.repeat(60));

  const hardFail = results.filter(
    (r) => r.status === 'error' || r.status === 'slice-failed'
  );
  await log.close();
  process.exit(hardFail.length > 0 ? 1 : 0);
}

main().catch(async (err) => {
  console.error('\nUnerwarteter Fehler:', err.stack || err.message);
  process.exit(1);
});
