/**
 * distribute-slide-timing.js
 *
 * Verteilt die gemessene Gesamt-Audiozeit auf die einzelnen Slides
 * proportional zu ihrer Narrations-Wortzahl.
 *
 * Zwei Strategien:
 *   1. "proportional" (default): jede Slide bekommt einen Zeitanteil
 *      gemäß ihrer Wortzahl. Das ist die beste Wahl, wenn die Narration
 *      mit unterschiedlichem Tempo gesprochen wird.
 *   2. "equal": Gesamtzeit gleichmäßig aufgeteilt.
 *      (Nur als Fallback für Slides ohne Narrationstext.)
 *
 * Empfehlung: "proportional". "equal" wird in der Aufgabenstellung
 * explizit angefragt und ist als Option implementiert.
 */

'use strict';

function distributeSlideTiming({ slides, total_audio_seconds, mode = 'proportional', intro_seconds = 0, outro_seconds = 0 }) {
  if (!Array.isArray(slides) || slides.length === 0) {
    throw new Error('distributeSlideTiming: slides array is empty');
  }
  if (typeof total_audio_seconds !== 'number' || total_audio_seconds <= 0) {
    throw new Error('distributeSlideTiming: total_audio_seconds must be > 0');
  }

  const usable = total_audio_seconds - intro_seconds - outro_seconds;
  if (usable <= 0) {
    throw new Error('distributeSlideTiming: intro+outro exceed total audio length');
  }

  let durations;

  if (mode === 'equal') {
    const per = usable / slides.length;
    durations = slides.map(() => per);
  } else {
    // proportional to word count
    const weights = slides.map((s) => Math.max(1, s.word_count_narration || 1));
    const totalW = weights.reduce((a, b) => a + b, 0);
    durations = weights.map((w) => (w / totalW) * usable);
  }

  // Cumulative start times, with intro offset
  let cursor = intro_seconds;
  const timed = slides.map((s, i) => {
    const start = cursor;
    const dur = durations[i];
    const end = start + dur;
    cursor = end;
    return {
      slide_number: s.number,
      slide_title: s.title,
      start_seconds: +start.toFixed(3),
      end_seconds: +end.toFixed(3),
      duration_seconds: +dur.toFixed(3),
      word_count: s.word_count_narration || 0,
    };
  });

  // Snap last slide exactly to audio end (avoid float drift)
  if (outro_seconds === 0 && timed.length > 0) {
    timed[timed.length - 1].end_seconds = +total_audio_seconds.toFixed(3);
    timed[timed.length - 1].duration_seconds = +(
      timed[timed.length - 1].end_seconds - timed[timed.length - 1].start_seconds
    ).toFixed(3);
  }

  return {
    mode,
    total_audio_seconds: +total_audio_seconds.toFixed(3),
    intro_seconds,
    outro_seconds,
    slides: timed,
  };
}

module.exports = { distributeSlideTiming };
