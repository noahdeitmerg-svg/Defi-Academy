'use strict';

function wordCount(s) {
  return String(s || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function round4(x) {
  return Math.round(x * 10000) / 10000;
}

/**
 * Verteilt audioDuration exakt auf Slides proportional zur Wortzahl der Narration.
 * Letzte Slide end_seconds === audioDuration (Nachkommastellen bereinigt).
 *
 * @param {Array<{ number, title, body, narration }>} slides
 * @param {number} audioDurationSeconds — nur aus ffprobe
 */
function buildVoiceTiming(slides, audioDurationSeconds) {
  if (!slides.length) throw new Error('buildVoiceTiming: keine Slides.');
  if (!Number.isFinite(audioDurationSeconds) || audioDurationSeconds <= 0) {
    throw new Error('buildVoiceTiming: ungültige Audio-Dauer.');
  }

  const weights = slides.map((s) => Math.max(1, wordCount(s.narration)));
  const wSum = weights.reduce((a, b) => a + b, 0);

  const durations = weights.map((w) => (audioDurationSeconds * w) / wSum);
  const sumD = durations.reduce((a, b) => a + b, 0);
  durations[durations.length - 1] += audioDurationSeconds - sumD;

  let cursor = 0;
  const out = [];
  for (let i = 0; i < slides.length; i++) {
    const start = cursor;
    const dur = durations[i];
    cursor += dur;
    const end = i === slides.length - 1 ? audioDurationSeconds : cursor;
    out.push({
      number: slides[i].number,
      title: slides[i].title,
      start_seconds: round4(start),
      end_seconds: round4(end),
      duration_seconds: round4(end - start),
      word_weight: weights[i],
    });
  }

  return {
    audio_duration_seconds: round4(audioDurationSeconds),
    slides: out,
  };
}

module.exports = { buildVoiceTiming, wordCount };
