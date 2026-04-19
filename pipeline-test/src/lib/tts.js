'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const { ffmpegBin } = require('./ffmpeg-path');

const ELEVEN_BASE = 'https://api.elevenlabs.io/v1';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Markdown- und Pipeline-Artefakte entfernen, die TTS nicht sprechen soll. */
function sanitizeVoiceScript(raw) {
  /** Zeile nur aus `**[Slide n]**` bzw. `**[Slide n] — Titel**` (Folien-Markdown). */
  const slideLineOnly = /^\*\*\[Slide\s*\d+\](?:\s*[—–\-]\s*[^*\n]+)?\*\*\s*$/;
  /** Gleiches Muster am Zeilenanfang, gefolgt von echtem Sprechertext. */
  const slidePrefix = /^\*\*\[Slide\s*\d+\](?:\s*[—–\-]\s*[^*]+)?\*\*\s*/;

  const kept = [];
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) continue;
    if (/^-{3,}$/.test(trimmed)) continue;
    if (slideLineOnly.test(trimmed)) continue;
    const cleaned = line.replace(slidePrefix, '');
    if (cleaned.trim().length === 0) continue;
    kept.push(cleaned);
  }
  let text = kept.join('\n');
  text = text.replace(/(\w[\w-]*)\s*\[\s*\1\s*\]/g, '$1');
  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

async function ttsOnce({ apiKey, voiceId, modelId, text, stability, similarity }) {
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
        style: 0,
        use_speaker_boost: true,
      },
    }),
  });
  if (!res.ok) {
    const bodyText = await res.text().catch(() => '');
    const err = new Error(`ElevenLabs HTTP ${res.status} — ${bodyText.slice(0, 300)}`);
    err.status = res.status;
    err.retryAfterMs = parseInt(res.headers.get('retry-after') || '0', 10) * 1000;
    throw err;
  }
  return Buffer.from(await res.arrayBuffer());
}

async function ttsWithRetry(opts, maxAttempts = 4) {
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
      const wait = err.retryAfterMs || 2 ** attempt * 500;
      await sleep(wait);
    }
  }
  throw lastErr;
}

const CHUNK_MAX = 4500;

/**
 * Lange Skripte in Chunks (ElevenLabs-Limits), MP3s aneinanderhängen per ffmpeg concat.
 */
async function synthesizeToMp3({ fullText, outPath, log }) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY fehlt.');
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (!voiceId) throw new Error('ELEVENLABS_VOICE_ID fehlt.');
  const modelId = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
  const stability = parseFloat(process.env.ELEVENLABS_STABILITY || '0.55', 10);
  const similarity = parseFloat(process.env.ELEVENLABS_SIMILARITY || '0.75', 10);

  const text = sanitizeVoiceScript(fullText);
  if (!text) throw new Error('Sprechertext nach Sanitize leer.');

  const chunks = [];
  let rest = text;
  while (rest.length > 0) {
    if (rest.length <= CHUNK_MAX) {
      chunks.push(rest);
      break;
    }
    let cut = rest.lastIndexOf('\n\n', CHUNK_MAX);
    if (cut < CHUNK_MAX * 0.5) cut = rest.lastIndexOf('. ', CHUNK_MAX);
    if (cut < CHUNK_MAX * 0.5) cut = CHUNK_MAX;
    chunks.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }

  const partPaths = [];
  for (let i = 0; i < chunks.length; i++) {
    const part = `${outPath}.part${i}.mp3`;
    log(`TTS chunk ${i + 1}/${chunks.length} (${chunks[i].length} Zeichen)…`);
    const buf = await ttsWithRetry({
      apiKey,
      voiceId,
      modelId,
      text: chunks[i],
      stability,
      similarity,
    });
    fs.writeFileSync(part, buf);
    partPaths.push(part);
  }

  if (partPaths.length === 1) {
    fs.renameSync(partPaths[0], outPath);
    return;
  }

  const listPath = `${outPath}.concat.txt`;
  const norm = (p) => p.replace(/\\/g, '/');
  fs.writeFileSync(
    listPath,
    partPaths.map((p) => `file '${norm(p)}'`).join('\n'),
    'utf8'
  );
  const r = spawnSync(
    ffmpegBin(),
    ['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-c', 'copy', outPath],
    { encoding: 'utf8' }
  );
  if (r.status !== 0) {
    throw new Error(`ffmpeg concat MP3: ${r.stderr || r.stdout}`);
  }
  for (const p of partPaths) try { fs.unlinkSync(p); } catch (_) {}
  try { fs.unlinkSync(listPath); } catch (_) {}
}

module.exports = { sanitizeVoiceScript, synthesizeToMp3 };
