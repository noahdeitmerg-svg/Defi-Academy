/**
 * normalize-lesson.js
 *
 * Bringt Lesson-Objekte aus altem und neuem Parser auf eine einheitliche
 * Struktur, die downstream immer gleich konsumiert werden kann.
 *
 * Die neue Moduls-Format-Lektion hat:
 *   { meta: { module, lesson, lesson_id, title },
 *     objectives: [],
 *     explanation: "...",
 *     slides: [ { number, title, body, narration, visual } ],
 *     exercise: "...",
 *     quiz_raw: "..." }
 *
 * Die alte Legacy-Lektion hat:
 *   { meta: { module, lesson, lesson_id },
 *     title: "...",
 *     objectives: [],
 *     explanation: "...",
 *     slide_summary: [],         // Bullets
 *     narration: "...",          // Fliesstext
 *     visuals: [],               // Bullets
 *     exercise: "...",
 *     quiz: [ ... ] }
 *
 * Einheitliches Zielschema:
 *   { meta: { module, lesson, lesson_id, title },
 *     objectives: [],
 *     explanation: "...",
 *     slides: [
 *       { number, title, body, narration, visual, is_title_slide }
 *     ],
 *     exercise: "...",
 *     quiz: [ ... ],             // normalisiert, falls moeglich
 *     _source_format: "module" | "single"
 *   }
 */

'use strict';

/**
 * Normalize a lesson from either parser output into the unified schema.
 */
function normalizeLesson(lesson, sourceFormat = 'unknown') {
  // If it already has the slides[] structure (new format), just ensure meta.title is set
  if (Array.isArray(lesson.slides) && lesson.slides.length > 0 && lesson.slides[0].body !== undefined) {
    const resolvedTitle = lesson.meta.title || lesson.title || '';
    return {
      meta: {
        module: lesson.meta.module,
        lesson: lesson.meta.lesson,
        lesson_id: lesson.meta.lesson_id,
        title: resolvedTitle,
      },
      title: resolvedTitle, // also on top-level for buildVideoConfig() compat
      objectives: lesson.objectives || [],
      explanation: lesson.explanation || '',
      slides: lesson.slides.map((s) => ({
        number: s.number,
        title: s.title,
        body: s.body,
        narration: s.narration || '',
        visual: s.visual || '',
        is_title_slide: s.number === 1 && (/titel/i.test(s.title) || s.body.length < 200),
      })),
      exercise: lesson.exercise || '',
      quiz: normalizeQuiz(lesson.quiz_raw || lesson.quiz),
      _source_format: sourceFormat,
    };
  }

  // Legacy format: convert slide_summary + narration into per-slide structure
  const legacy = lesson;
  const lessonTitle = legacy.title || legacy.meta.title || '';
  const summaryBullets = legacy.slide_summary || [];
  const visualBullets = legacy.visuals || [];
  const narrationFullText = legacy.narration || '';

  // Synthesize slides: first is title, rest are bullet-derived
  const slides = [
    {
      number: 1,
      title: 'Titel',
      body: lessonTitle,
      narration: narrationFullText, // all narration on slide 1 as fallback
      visual: '',
      is_title_slide: true,
    },
  ];

  // Create one slide per major bullet (cap at 6 for old format)
  const maxContentSlides = Math.min(summaryBullets.length, 6);
  for (let i = 0; i < maxContentSlides; i++) {
    slides.push({
      number: i + 2,
      title: deriveSlideTitle(summaryBullets[i]),
      body: summaryBullets[i],
      narration: '', // legacy format has no per-slide narration
      visual: visualBullets[i] || '',
      is_title_slide: false,
    });
  }

  // If there's only ONE slide (just the title), that's a degenerate legacy case
  // where we don't have structured content. Keep narration on slide 1.
  // Otherwise, split narration proportionally across content slides.
  if (slides.length > 1 && narrationFullText) {
    const contentSlides = slides.slice(1);
    const paragraphs = narrationFullText.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    if (paragraphs.length >= contentSlides.length) {
      // Distribute paragraphs to slides
      const perSlide = Math.ceil(paragraphs.length / contentSlides.length);
      contentSlides.forEach((s, i) => {
        s.narration = paragraphs.slice(i * perSlide, (i + 1) * perSlide).join('\n\n');
      });
      slides[0].narration = ''; // move all narration off the title slide
    }
    // else: keep everything on slide 1 as fallback
  }

  return {
    meta: {
      module: legacy.meta.module,
      lesson: legacy.meta.lesson,
      lesson_id: legacy.meta.lesson_id,
      title: lessonTitle,
    },
    title: lessonTitle, // also on top-level for buildVideoConfig() compat
    objectives: legacy.objectives || [],
    explanation: legacy.explanation || '',
    slides,
    exercise: legacy.exercise || '',
    quiz: normalizeQuiz(legacy.quiz),
    _source_format: sourceFormat,
  };
}

function deriveSlideTitle(bullet) {
  if (!bullet) return '';
  // If bullet starts with "X. Y: " or "X. Y —", use Y as title
  const m = bullet.match(/^\s*\d*\.?\s*([^:—\-–]{5,50})[:—\-–]/);
  if (m) return m[1].trim();
  // Otherwise take first clause up to 50 chars
  return bullet.split(/[.!?]/)[0].trim().slice(0, 50);
}

function normalizeQuiz(quiz) {
  if (!quiz) return [];
  if (Array.isArray(quiz)) return quiz; // already parsed

  // Try to parse raw quiz text (for the new format where quiz is a raw block)
  if (typeof quiz === 'string') {
    const blocks = quiz.split(/\n(?=\*\*Frage\s+\d+:|^\d+\.\s)/m).map((b) => b.trim()).filter(Boolean);
    const questions = [];
    for (const block of blocks) {
      const firstLine = block.split(/\n/)[0];
      const qmatch = firstLine.match(/^(?:\*\*)?(?:Frage\s+\d+:|\d+\.\s+)\**\s*(.+?)(?:\*\*)?$/i);
      if (!qmatch) continue;

      const question = qmatch[1].replace(/\*+$/, '').trim();
      const options = [];
      let correct = null;

      for (const line of block.split(/\n/).slice(1)) {
        const optMatch = line.match(/^\s*([a-dA-D])[)\.]\s*(.+)$/);
        if (optMatch) options.push({ key: optMatch[1].toLowerCase(), text: optMatch[2].trim() });

        const correctMatch = line.match(/(?:Correct|Korrekt)[:\s]+([a-dA-D])/);
        if (correctMatch) correct = correctMatch[1].toLowerCase();
      }

      if (question) questions.push({ question, options, correct });
    }
    return questions;
  }

  return [];
}

module.exports = { normalizeLesson };
