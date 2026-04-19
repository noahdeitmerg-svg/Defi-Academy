/**
 * generate-slides-json.js
 *
 * Konvertiert die vom Parser extrahierten Lektionen in das kanonische
 * slides.json-Format. Dieses Format wird vom Render-Pipeline konsumiert,
 * ist aber auch direkt vom UI-Layer lesbar.
 *
 * Format:
 *
 *   {
 *     "module": 1,
 *     "lesson": 1,
 *     "lesson_id": "module01-lesson01",
 *     "title": "Was ist DeFi? Eine präzise Definition",
 *     "slides": [
 *       {
 *         "number": 1,
 *         "title": "Titel",
 *         "body": "DeFi: Eine präzise Definition",
 *         "narration": "Willkommen zu Modul 1. ...",
 *         "visual": "Titelfolie mit ...",
 *         "is_title_slide": true,
 *         "word_count_narration": 52
 *       },
 *       ...
 *     ],
 *     "meta": {
 *       "total_slides": 6,
 *       "total_narration_words": 512,
 *       "estimated_duration_seconds_at_135wpm": 227
 *     }
 *   }
 */

'use strict';

const WPM = 135; // deutsches Lehrtempo — aus Module-Header-Spec (120–140 WPM)

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function detectTitleSlide(slide) {
  // Eine Title-Slide hat üblicherweise:
  //   - Slide-Nummer 1
  //   - Title-Marker ist "Titel" oder body enthält den Lektions-Titel
  return slide.number === 1 &&
    (/^titel$/i.test(slide.title || '') || slide.body.length < 200);
}

function buildSlidesJson(lesson) {
  const slides = lesson.slides.map((s) => {
    const word_count_narration = countWords(s.narration);
    return {
      number: s.number,
      title: s.title,
      body: s.body,
      narration: s.narration,
      visual: s.visual,
      is_title_slide: detectTitleSlide(s),
      word_count_narration,
      estimated_seconds_at_wpm: Math.round((word_count_narration / WPM) * 60),
    };
  });

  const total_narration_words = slides.reduce(
    (sum, s) => sum + s.word_count_narration,
    0
  );

  return {
    module: lesson.meta.module,
    lesson: lesson.meta.lesson,
    lesson_id: lesson.meta.lesson_id,
    title: lesson.meta.title,
    objectives: lesson.objectives,
    slides,
    meta: {
      total_slides: slides.length,
      total_narration_words,
      target_wpm: WPM,
      estimated_duration_seconds_at_wpm: Math.round(
        (total_narration_words / WPM) * 60
      ),
    },
  };
}

module.exports = { buildSlidesJson };
