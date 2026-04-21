'use strict';

const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');
const { ffmpegBin } = require('./ffmpeg-path');

const repoRoot = path.join(__dirname, '..', '..', '..');
const { sanitizeVoiceScript } = require(path.join(repoRoot, 'pipeline', 'voice', 'sanitize_voice_script.js'));
const { prepareVoiceForElevenLabs } = require(path.join(repoRoot, 'pipeline', 'voice', 'voice_pipeline.js'));
const { enhanceVoiceMp3 } = require(path.join(repoRoot, 'pipeline', 'voice', 'audio_post_process.js'));

const ELEVEN_BASE = 'https://api.elevenlabs.io/v1';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function resolveElevenLabsSpeed() {
  const rawStr = process.env.ELEVENLABS_SPEED;
  if (rawStr == null || String(rawStr).trim() === '') return 0.88;
  const raw = Number(rawStr);
  if (!Number.isFinite(raw)) return 0.88;
  return Math.min(4, Math.max(0.25, raw));
}

async function ttsOnce({ apiKey, voiceId, modelId, text, stability, similarity, style, speed }) {
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
        speed,
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
  const sanitized = sanitizeVoiceScript(fullText);
  const text = prepareVoiceForElevenLabs(sanitized);
  if (!text.trim()) throw new Error('Sprechertext nach Voice-Pipeline leer.');

  const modelId = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v3';
  const stability = parseFloat(process.env.ELEVENLABS_STABILITY || '0.4', 10);
  const similarity = parseFloat(process.env.ELEVENLABS_SIMILARITY || '0.8', 10);
  const style = parseFloat(process.env.ELEVENLABS_STYLE || '0.2', 10);
  const speed = resolveElevenLabsSpeed();

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
      style,
      speed,
    });
    fs.writeFileSync(part, buf);
    partPaths.push(part);
  }

  if (partPaths.length === 1) {
    fs.renameSync(partPaths[0], outPath);
  } else {
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

  const enhanced = `${outPath}.post.mp3`;
  enhanceVoiceMp3(outPath, enhanced);
  try {
    fs.unlinkSync(outPath);
    fs.renameSync(enhanced, outPath);
  } catch (_) {
    try {
      fs.copyFileSync(enhanced, outPath);
      fs.unlinkSync(enhanced);
    } catch (_) {}
  }
}

module.exports = { sanitizeVoiceScript, synthesizeToMp3 };
