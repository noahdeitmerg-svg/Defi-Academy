#!/usr/bin/env node
/**
 * generate-voice.js
 *
 * Erzeugt voice.mp3 pro Lektion via ElevenLabs TTS.
 *
 * Input je Lektion:
 *   <scripts-dir>/moduleXX-lessonYY/voice_script.txt
 *   (default scripts-dir: ./generated-assets — Pipeline-Output von
 *    npm run generate-assets. Alternativ: ./generator-output, ./lessons/)
 *
 * Vor ElevenLabs: Sanitize → Script Optimizer (pipeline/voice/script_optimizer.js:
 * Zahlen, Satzlänge, Prosody) → Voice Preprocessor (pronunciation_dictionary.json)
 * (pipeline/voice/voice_pipeline.js).
 * Optional Debug: voice_script_clean.txt (Text wie an ElevenLabs gesendet).
 * Optional Audio: VOICE_ENHANCE (default an), siehe pipeline/voice/audio_post_process.js
 *
 * Output je Lektion:
 *   <output-dir>/moduleXX-lessonYY/voice.mp3
 *   (default: ./assets-input)
 *
 * Env:
 *   ELEVENLABS_API_KEY       Pflicht (ausser --dry-run)
 *   ELEVENLABS_MODEL         default: eleven_multilingual_v3
 *   ELEVENLABS_VOICE         Voice-Name (default: Florian).
 *                            Wird via /v1/voices auf die reale ID gemappt.
 *   ELEVENLABS_VOICE_ID      Direkte Voice-ID — uebersteuert den Namen.
 *   ELEVENLABS_STABILITY     default: 0.4
 *   ELEVENLABS_SIMILARITY    default: 0.8
 *   ELEVENLABS_STYLE         default: 0.2
 *
 * Usage:
 *   npm run generate:voice
 *   node scripts/generate-voice.js --only module04-lesson02
 *   node scripts/generate-voice.js --scripts-dir lessons --concurrency 3
 *   node scripts/generate-voice.js --dry-run
 *
 * Flags:
 *   --scripts-dir <path>   default: ./generated-assets (tolerant gegen
 *                          Layout "./lessons/<id>/voice_script.txt")
 *   --output-dir  <path>   default: ./assets-input
 *   --only <csv>           Lesson-IDs filtern (z. B. module01-lesson01,...)
 *   --concurrency <n>      default: 2 (Batching; ElevenLabs-Limits schonen)
 *   --force                voice.mp3 auch ueberschreiben, wenn vorhanden
 *   --dry-run              keine API-Aufrufe; zeigt nur, was passieren wuerde
 *   --help                 Hilfe
 *
 * Logs: logs/generate-voice.log
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOG_FILE = path.join(ROOT, 'logs', 'generate-voice.log');

const { sanitizeVoiceScript } = require(path.join(ROOT, 'pipeline', 'voice', 'sanitize_voice_script.js'));
const { prepareVoiceForElevenLabs } = require(path.join(ROOT, 'pipeline', 'voice', 'voice_pipeline.js'));
const { enhanceVoiceMp3 } = require(path.join(ROOT, 'pipeline', 'voice', 'audio_post_process.js'));

// .env / .env.local aus Projekt-Root laden, damit ELEVENLABS_API_KEY &
// Freunde nicht manuell in der Shell gesetzt werden muessen. Bereits
// gesetzte Env-Vars (CI/Shell) behalten Vorrang.
require('./lib/env').loadProjectEnv({ cwd: ROOT });

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
DeFi Academy — ElevenLabs Voice Generator

Usage:
  npm run generate:voice
  node scripts/generate-voice.js [flags]

Flags:
  --scripts-dir <path>   default: ./generated-assets
  --output-dir  <path>   default: ./assets-input
  --only <csv>           Lesson-IDs filtern
  --concurrency <n>      default: 2
  --force                voice.mp3 ueberschreiben
  --dry-run              keine API-Aufrufe
  --help                 Hilfe

Env:
  ELEVENLABS_API_KEY (pflicht), ELEVENLABS_MODEL (default eleven_multilingual_v3),
  ELEVENLABS_VOICE (default Florian), ELEVENLABS_VOICE_ID (override),
  ELEVENLABS_STABILITY, ELEVENLABS_SIMILARITY, ELEVENLABS_STYLE
`);
}

// --- Logger -----------------------------------------------------------------

class RunLogger {
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
  close() {
    return new Promise((resolve) => this.stream.end(resolve));
  }
}

// --- Discovery --------------------------------------------------------------

function findScriptPath(scriptsDir, lessonId) {
  // Tolerant gegen beide Layouts:
  //   generator-output/<id>/voice_script.txt        (Pipeline-Standard)
  //   lessons/<id>/voice_script.txt                 (User-Konvention)
  const candidates = [
    path.join(scriptsDir, lessonId, 'voice_script.txt'),
    path.join(scriptsDir, `${lessonId}.voice.txt`),
    path.join(scriptsDir, `${lessonId}-voice.txt`),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  return null;
}

function listLessonsInDir(scriptsDir) {
  if (!fs.existsSync(scriptsDir)) return [];
  return fs
    .readdirSync(scriptsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^module\d{2}-lesson\d{2}$/.test(e.name))
    .map((e) => e.name)
    .filter((id) => findScriptPath(scriptsDir, id))
    .sort();
}

// --- ElevenLabs-API ---------------------------------------------------------

const ELEVEN_BASE = 'https://api.elevenlabs.io/v1';

async function fetchVoicesList(apiKey, log) {
  const res = await fetch(`${ELEVEN_BASE}/voices`, {
    headers: { 'xi-api-key': apiKey, accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`GET /voices fehlgeschlagen: HTTP ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return Array.isArray(data.voices) ? data.voices : [];
}

async function resolveVoiceId(apiKey, log) {
  const direct = process.env.ELEVENLABS_VOICE_ID;
  if (direct) {
    log.info(`Verwende ELEVENLABS_VOICE_ID direkt: ${direct}`);
    return direct;
  }
  const name = process.env.ELEVENLABS_VOICE || 'Florian';
  log.info(`Loese Voice-Name "${name}" ueber /v1/voices auf ...`);
  const voices = await fetchVoicesList(apiKey, log);
  const match = voices.find(
    (v) => v.name && v.name.toLowerCase() === name.toLowerCase()
  );
  if (!match) {
    const available = voices.map((v) => v.name).slice(0, 20).join(', ');
    throw new Error(
      `Voice "${name}" nicht im Account gefunden. Verfuegbar (Auszug): ${available}`
    );
  }
  log.info(`Voice "${match.name}" = ${match.voice_id}`);
  return match.voice_id;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ttsOnce({ apiKey, voiceId, modelId, text, stability, similarity, style }) {
  const url = `${ELEVEN_BASE}/text-to-speech/${encodeURIComponent(voiceId)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'content-type': 'application/json',
      accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: {
        stability,
        similarity_boost: similarity,
        style,
        use_speaker_boost: true,
      },
    }),
  });
  if (!res.ok) {
    const retryAfter = parseInt(res.headers.get('retry-after') || '0', 10);
    const bodyText = await res.text().catch(() => '');
    const err = new Error(`HTTP ${res.status} ${res.statusText} — ${bodyText.slice(0, 200)}`);
    err.status = res.status;
    err.retryAfterMs = retryAfter > 0 ? retryAfter * 1000 : 0;
    throw err;
  }
  return Buffer.from(await res.arrayBuffer());
}

async function ttsWithRetry(opts, log, lessonId) {
  const maxAttempts = 4;
  let attempt = 0;
  let lastErr;
  while (attempt < maxAttempts) {
    attempt++;
    try {
      return await ttsOnce(opts);
    } catch (err) {
      lastErr = err;
      const retryable = err.status === 429 || (err.status >= 500 && err.status <= 599);
      if (!retryable || attempt === maxAttempts) throw err;
      const wait = err.retryAfterMs || 2 ** attempt * 500; // 1s, 2s, 4s
      log.warn(
        `TTS Versuch ${attempt}/${maxAttempts} fehlgeschlagen (${err.message}) — warte ${wait}ms`,
        lessonId
      );
      await sleep(wait);
    }
  }
  throw lastErr;
}

// --- Pool -------------------------------------------------------------------

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

// --- Main -------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printUsage();
    process.exit(0);
  }

  const scriptsDir = path.resolve(ROOT, args['scripts-dir'] || 'generated-assets');
  const outputDir = path.resolve(ROOT, args['output-dir'] || 'assets-input');
  const concurrency = parseInt(args.concurrency || '2', 10);
  const dryRun = Boolean(args['dry-run']);
  const force = Boolean(args.force);

  const log = new RunLogger(LOG_FILE);

  log.info('DeFi Academy — generate-voice (ElevenLabs TTS)');
  log.info(`Scripts-Dir:  ${scriptsDir}`);
  log.info(`Output-Dir:   ${outputDir}`);
  log.info(`Model:        ${process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v3 (default)'}`);
  log.info(`Stability:    ${process.env.ELEVENLABS_STABILITY || '0.4 (default)'}`);
  log.info(`Similarity:   ${process.env.ELEVENLABS_SIMILARITY || '0.8 (default)'}`);
  log.info(`Style:        ${process.env.ELEVENLABS_STYLE || '0.2 (default)'}`);
  log.info(`Concurrency:  ${concurrency}`);
  log.info(`Dry-run:      ${dryRun}`);
  log.info(`Force:        ${force}`);

  // Lesson-Liste auswaehlen
  let lessons;
  if (typeof args.only === 'string' && args.only.length > 0) {
    lessons = args.only.split(',').map((s) => s.trim()).filter(Boolean);
    for (const id of lessons) {
      if (!/^module\d{2}-lesson\d{2}$/.test(id)) {
        log.error(`Ungueltige Lesson-ID: "${id}"`);
        await log.close();
        process.exit(2);
      }
    }
  } else {
    lessons = listLessonsInDir(scriptsDir);
  }

  if (lessons.length === 0) {
    log.warn(`Keine Lektionen mit voice_script.txt in ${scriptsDir} gefunden.`);
    await log.close();
    process.exit(0);
  }
  log.info(`Gefundene Lektion(en): ${lessons.length} — ${lessons.join(', ')}`);

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey && !dryRun) {
    log.error('ELEVENLABS_API_KEY nicht gesetzt — setze dry-run oder die Env-Variable.');
    await log.close();
    process.exit(1);
  }

  const modelId = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v3';
  const stability = Number(process.env.ELEVENLABS_STABILITY || '0.4');
  const similarity = Number(process.env.ELEVENLABS_SIMILARITY || '0.8');
  const style = Number(process.env.ELEVENLABS_STYLE || '0.2');

  let voiceId = null;
  if (!dryRun) {
    try {
      voiceId = await resolveVoiceId(apiKey, log);
    } catch (err) {
      log.error(`Voice-Resolution fehlgeschlagen: ${err.message}`);
      await log.close();
      process.exit(1);
    }
  } else {
    voiceId = process.env.ELEVENLABS_VOICE_ID || '<dry-run-voice-id>';
    log.info(`dry-run: voiceId="${voiceId}", model="${modelId}"`);
  }

  // Pro Lektion
  const results = await runPool(lessons, concurrency, async (lessonId) => {
    const scriptPath = findScriptPath(scriptsDir, lessonId);
    if (!scriptPath) {
      throw new Error(`voice_script.txt nicht gefunden (gesucht unter ${scriptsDir})`);
    }
    const destDir = path.join(outputDir, lessonId);
    const destPath = path.join(destDir, 'voice.mp3');

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1024 && !force) {
      log.info(`voice.mp3 vorhanden — uebersprungen (--force zum Neuerzeugen).`, lessonId);
      return { status: 'skipped-existing', path: destPath };
    }

    const rawText = fs.readFileSync(scriptPath, 'utf8').trim();
    if (!rawText) {
      throw new Error(`voice_script.txt ist leer: ${scriptPath}`);
    }
    const lessonDir = path.dirname(scriptPath);
    const sanitized = sanitizeVoiceScript(rawText);
    if (!sanitized) {
      throw new Error(`voice_script.txt enthaelt nach Sanitize keinen sprechbaren Text: ${scriptPath}`);
    }
    const text = prepareVoiceForElevenLabs(sanitized);
    if (!text.trim()) {
      throw new Error(`voice_script.txt enthaelt nach Voice-Pipeline keinen Text: ${scriptPath}`);
    }
    try {
      fs.writeFileSync(path.join(lessonDir, 'voice_script_clean.txt'), text, 'utf8');
    } catch (_) {
      /* optional debug */
    }
    log.info(`Generating voice for ${lessonId}  (${text.length} chars, raw ${rawText.length})`, lessonId);

    if (dryRun) {
      return { status: 'dry-run', scriptPath, chars: text.length };
    }

    const audio = await ttsWithRetry(
      { apiKey, voiceId, modelId, text, stability, similarity, style },
      log,
      lessonId
    );

    fs.mkdirSync(destDir, { recursive: true });
    const rawMp3 = path.join(destDir, 'voice.raw.mp3');
    fs.writeFileSync(rawMp3, audio);
    const enhanced = path.join(destDir, 'voice.post.mp3');
    enhanceVoiceMp3(rawMp3, enhanced);
    try {
      fs.unlinkSync(destPath);
    } catch (_) {}
    try {
      fs.renameSync(enhanced, destPath);
      fs.unlinkSync(rawMp3);
    } catch (_) {
      fs.copyFileSync(rawMp3, destPath);
      try {
        fs.unlinkSync(rawMp3);
      } catch (_) {}
      try {
        fs.unlinkSync(enhanced);
      } catch (_) {}
    }
    log.info(`Saved voice.mp3  (${audio.length} bytes) → ${path.relative(ROOT, destPath)}`, lessonId);
    return { status: 'generated', bytes: audio.length, path: destPath };
  });

  // Zusammenfassung
  const ok = results.filter((r) => r.status === 'ok');
  const failed = results.filter((r) => r.status === 'error');
  log.info('');
  log.info(`Zusammenfassung: ${ok.length} ok, ${failed.length} fehlgeschlagen, gesamt ${lessons.length}`);
  for (const f of failed) {
    log.error(`  ${f.item} — ${f.error.message}`);
  }

  await log.close();
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('\nUnerwarteter Fehler:', err.stack || err.message);
  process.exit(1);
});
