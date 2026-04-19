/**
 * tts-adapter.js
 *
 * Produktionsreifer TTS-Adapter mit zwei Backends:
 *
 *   1. "elevenlabs" — Produktion (ElevenLabs HTTP API)
 *      - Multi-Chunk-Handling fuer Texte > 5000 Zeichen
 *      - Retry mit Exponential-Backoff bei transient errors (429, 5xx)
 *      - Model: eleven_multilingual_v2 (Deutsch-optimiert)
 *      - Voice-Settings: stability 0.55, similarity 0.75, style 0.25
 *
 *   2. "espeak"  — Entwicklung / Pipeline-Test
 *      - Keine API-Keys noetig
 *      - Lokale deutsche Stimme
 *      - Fuer Pipeline-Validierung, nicht fuer Produktion
 *
 * Einheitliche Rueckgabe:
 *   { audio_path, duration_seconds, engine, word_count, wpm_effective,
 *     chunks_count, cost_estimate_usd }
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Constants ───────────────────────────────────────────────────────

const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';
const ELEVENLABS_MAX_CHARS_PER_REQUEST = 4800;
const ELEVENLABS_COST_PER_1K_CHARS_USD = 0.18;

const DEFAULT_ELEVENLABS_SETTINGS = {
  model_id: 'eleven_multilingual_v2',
  voice_settings: {
    stability: 0.55,
    similarity_boost: 0.75,
    style: 0.25,
    use_speaker_boost: true,
  },
};

// ── Utilities ───────────────────────────────────────────────────────

function stripSSMLForEspeak(text) {
  return text
    .replace(/<break\s+time=['"](\d+)ms['"]\s*\/?>/gi, (_, ms) => {
      return parseInt(ms, 10) >= 500 ? '\n\n' : ', ';
    })
    .replace(/<emphasis[^>]*>([^<]*)<\/emphasis>/gi, '$1')
    .replace(/<[^>]+>/g, '');
}

function measureDurationSeconds(audioPath) {
  const out = execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`,
    { encoding: 'utf8' }
  ).trim();
  return parseFloat(out);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function splitIntoChunks(text, maxChars) {
  if (text.length <= maxChars) return [text];

  const chunks = [];
  const paragraphs = text.split(/\n{2,}/);
  let buffer = '';

  for (const para of paragraphs) {
    const sep = buffer ? '\n\n' : '';
    const candidate = buffer + sep + para;

    if (candidate.length <= maxChars) {
      buffer = candidate;
      continue;
    }

    if (buffer) chunks.push(buffer);
    buffer = '';

    if (para.length > maxChars) {
      const sentences = para.match(/[^.!?]+[.!?]+[\s]*/g) || [para];
      let sentBuf = '';
      for (const s of sentences) {
        if ((sentBuf + s).length > maxChars) {
          if (sentBuf) chunks.push(sentBuf.trim());
          sentBuf = s;
        } else {
          sentBuf += s;
        }
      }
      if (sentBuf) buffer = sentBuf.trim();
    } else {
      buffer = para;
    }
  }

  if (buffer) chunks.push(buffer);
  return chunks;
}

// ── Espeak backend ──────────────────────────────────────────────────

function synthesizeEspeak(text, outputPath, opts = {}) {
  const voice = opts.voice || 'de';
  const speed = opts.speed || 155;
  const pitch = opts.pitch || 42;

  const cleanText = stripSSMLForEspeak(text);
  const tmpTxt = outputPath + '.input.txt';
  fs.writeFileSync(tmpTxt, cleanText, 'utf8');

  const tmpWav = outputPath + '.tmp.wav';
  execSync(
    `espeak-ng -v "${voice}" -s ${speed} -p ${pitch} -f "${tmpTxt}" -w "${tmpWav}"`,
    { stdio: 'pipe' }
  );
  execSync(
    `ffmpeg -y -loglevel error -i "${tmpWav}" -codec:a libmp3lame -b:a 128k "${outputPath}"`,
    { stdio: 'pipe' }
  );

  fs.unlinkSync(tmpWav);
  fs.unlinkSync(tmpTxt);

  return { duration: measureDurationSeconds(outputPath), chunks: 1 };
}

// ── ElevenLabs backend ──────────────────────────────────────────────

async function synthesizeElevenLabsChunk({ text, apiKey, voiceId, settings, attempt = 1 }) {
  const url = `${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}`;
  const body = {
    text,
    model_id: settings.model_id,
    voice_settings: settings.voice_settings,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return Buffer.from(await res.arrayBuffer());
  }

  const errText = await res.text();
  const retryable = [429, 500, 502, 503, 504].includes(res.status);
  if (retryable && attempt < 4) {
    const backoffMs = Math.min(1000 * 2 ** attempt, 15000);
    console.log(`    [elevenlabs] ${res.status} — retry ${attempt}/3 in ${backoffMs}ms`);
    await sleep(backoffMs);
    return synthesizeElevenLabsChunk({ text, apiKey, voiceId, settings, attempt: attempt + 1 });
  }

  throw new Error(`ElevenLabs error ${res.status}: ${errText.slice(0, 300)}`);
}

function concatMp3s(chunkPaths, outputPath) {
  const listPath = outputPath + '.concat.txt';
  const listContent = chunkPaths
    .map((p) => `file '${path.resolve(p).replace(/'/g, "'\\''")}'`)
    .join('\n');
  fs.writeFileSync(listPath, listContent, 'utf8');

  execSync(
    `ffmpeg -y -loglevel error -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}"`,
    { stdio: 'pipe' }
  );
  fs.unlinkSync(listPath);
}

async function synthesizeElevenLabs(text, outputPath, opts = {}) {
  const apiKey = opts.apiKey || process.env.ELEVENLABS_API_KEY;
  const voiceId = opts.voiceId || process.env.ELEVENLABS_VOICE_ID;
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY not set (env or --api-key)');
  if (!voiceId) throw new Error('voice_id not provided (opts.voiceId or ELEVENLABS_VOICE_ID env)');

  const settings = {
    model_id: opts.modelId || DEFAULT_ELEVENLABS_SETTINGS.model_id,
    voice_settings: {
      stability: opts.stability ?? DEFAULT_ELEVENLABS_SETTINGS.voice_settings.stability,
      similarity_boost: opts.similarityBoost ?? DEFAULT_ELEVENLABS_SETTINGS.voice_settings.similarity_boost,
      style: opts.style ?? DEFAULT_ELEVENLABS_SETTINGS.voice_settings.style,
      use_speaker_boost: opts.useSpeakerBoost ?? DEFAULT_ELEVENLABS_SETTINGS.voice_settings.use_speaker_boost,
    },
  };

  const chunks = splitIntoChunks(text, ELEVENLABS_MAX_CHARS_PER_REQUEST);
  const chunkPaths = [];

  try {
    for (let i = 0; i < chunks.length; i++) {
      const chunkPath = `${outputPath}.chunk-${i}.mp3`;
      const buf = await synthesizeElevenLabsChunk({
        text: chunks[i],
        apiKey,
        voiceId,
        settings,
      });
      fs.writeFileSync(chunkPath, buf);
      chunkPaths.push(chunkPath);
    }

    if (chunks.length === 1) {
      fs.copyFileSync(chunkPaths[0], outputPath);
    } else {
      concatMp3s(chunkPaths, outputPath);
    }
  } finally {
    for (const cp of chunkPaths) {
      try { fs.unlinkSync(cp); } catch {}
    }
  }

  return {
    duration: measureDurationSeconds(outputPath),
    chunks: chunks.length,
    cost_estimate_usd: +(text.length * ELEVENLABS_COST_PER_1K_CHARS_USD / 1000).toFixed(4),
  };
}

// ── Unified entry point ─────────────────────────────────────────────

async function synthesize(text, outputPath, opts = {}) {
  if (!text || text.trim().length === 0) {
    throw new Error('synthesize: empty text');
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const hasEleven = !!(opts.apiKey || process.env.ELEVENLABS_API_KEY);
  const hasVoice = !!(opts.voiceId || process.env.ELEVENLABS_VOICE_ID);
  const engine = opts.engine || (hasEleven && hasVoice ? 'elevenlabs' : 'espeak');

  let result;
  if (engine === 'elevenlabs') {
    result = await synthesizeElevenLabs(text, outputPath, opts);
  } else if (engine === 'espeak') {
    result = synthesizeEspeak(text, outputPath, opts);
  } else {
    throw new Error(`Unknown TTS engine: ${engine}`);
  }

  const word_count = text.trim().split(/\s+/).filter(Boolean).length;
  return {
    audio_path: outputPath,
    duration_seconds: result.duration,
    engine,
    word_count,
    char_count: text.length,
    wpm_effective: result.duration > 0 ? Math.round((word_count / result.duration) * 60) : 0,
    chunks_count: result.chunks,
    cost_estimate_usd: result.cost_estimate_usd || 0,
  };
}

async function listElevenLabsVoices(apiKey) {
  apiKey = apiKey || process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error('API key required');

  const res = await fetch(`${ELEVENLABS_BASE_URL}/voices`, {
    headers: { 'xi-api-key': apiKey },
  });
  if (!res.ok) throw new Error(`listVoices failed: ${res.status}`);
  const data = await res.json();
  return data.voices.map((v) => ({
    voice_id: v.voice_id,
    name: v.name,
    category: v.category,
    labels: v.labels,
    preview_url: v.preview_url,
  }));
}

module.exports = {
  synthesize,
  measureDurationSeconds,
  splitIntoChunks,
  listElevenLabsVoices,
};
