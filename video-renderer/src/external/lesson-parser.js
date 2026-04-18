/**
 * lesson-parser.js
 *
 * Liest eine Markdown-Datei des Content Agents und gibt ein strukturiertes
 * Lesson-Objekt zurueck, das in den weiteren Pipeline-Schritten verwendet
 * werden kann.
 *
 * Erwartetes Input-Format (Content Agent Standard):
 *
 *   # Lesson Title
 *   <titel>
 *
 *   # Learning Objectives
 *   - objective 1
 *   - objective 2
 *
 *   # Explanation
 *   <fliesstext>
 *
 *   # Slide Summary
 *   - slide 1 text
 *   - slide 2 text
 *
 *   # Voice Narration Script
 *   <fliesstext / absaetze>
 *
 *   # Visual Suggestions
 *   - visual 1
 *   - visual 2
 *
 *   # Exercise
 *   <beschreibung>
 *
 *   # Quiz
 *   1. Frage?
 *      a) Antwort
 *      b) Antwort
 *      Correct: a
 *
 * Zusaetzlich akzeptiert der Parser Varianten mit ## statt # und deutschen
 * Ueberschriften (z.B. "Lernziele", "Erklaerung").
 */

'use strict';

const SECTION_ALIASES = {
  'lesson title': 'title',
  'titel': 'title',
  'learning objectives': 'objectives',
  'lernziele': 'objectives',
  'explanation': 'explanation',
  'erklaerung': 'explanation',
  'erklärung': 'explanation',
  'slide summary': 'slide_summary',
  'foliensubersicht': 'slide_summary',
  'voice narration script': 'narration',
  'voiceover': 'narration',
  'narration': 'narration',
  'visual suggestions': 'visuals',
  'visuelle vorschlaege': 'visuals',
  'visuelle vorschläge': 'visuals',
  'exercise': 'exercise',
  'uebung': 'exercise',
  'übung': 'exercise',
  'quiz': 'quiz',
};

function normalizeHeading(raw) {
  return raw
    .replace(/^#+\s*/, '')
    .trim()
    .toLowerCase();
}

function splitIntoSections(markdown) {
  const lines = markdown.split(/\r?\n/);
  const sections = {};
  let currentKey = null;
  let buffer = [];

  const flush = () => {
    if (currentKey) {
      sections[currentKey] = buffer.join('\n').trim();
    }
    buffer = [];
  };

  for (const line of lines) {
    if (/^#{1,3}\s+/.test(line)) {
      const heading = normalizeHeading(line);
      const key = SECTION_ALIASES[heading];
      if (key) {
        flush();
        currentKey = key;
        continue;
      }
    }
    if (currentKey) buffer.push(line);
  }
  flush();

  return sections;
}

function parseBulletList(text) {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => /^[-*•]\s+/.test(l) || /^\d+\.\s+/.test(l))
    .map((l) => l.replace(/^[-*•]\s+/, '').replace(/^\d+\.\s+/, '').trim())
    .filter(Boolean);
}

function parseQuiz(text) {
  if (!text) return [];
  // Split on lines starting with "1.", "2." etc.
  const blocks = text.split(/\n(?=\d+\.\s)/).map((b) => b.trim()).filter(Boolean);
  const questions = [];

  for (const block of blocks) {
    const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    const questionLine = lines[0].replace(/^\d+\.\s*/, '').trim();
    const options = [];
    let correct = null;

    for (let i = 1; i < lines.length; i++) {
      const l = lines[i];
      const optMatch = l.match(/^([a-d])\)\s*(.+)$/i);
      if (optMatch) {
        options.push({ key: optMatch[1].toLowerCase(), text: optMatch[2].trim() });
        continue;
      }
      const correctMatch = l.match(/^correct[:\s]+([a-d])/i);
      if (correctMatch) {
        correct = correctMatch[1].toLowerCase();
      }
    }

    questions.push({ question: questionLine, options, correct });
  }

  return questions;
}

function inferModuleLesson(filenameOrId) {
  if (!filenameOrId) return { module: null, lesson: null };
  // accepts module01-lesson03, module01/lesson03, module-01-lesson-03 etc.
  const m = filenameOrId.match(/module[\s\-_]?(\d{1,2})[^\d]*lesson[\s\-_]?(\d{1,2})/i);
  if (!m) return { module: null, lesson: null };
  return { module: parseInt(m[1], 10), lesson: parseInt(m[2], 10) };
}

/**
 * Main parse function.
 *
 * @param {string} markdown - Raw markdown content of the lesson.
 * @param {object} opts
 * @param {string} [opts.sourcePath] - Optional filename / path (used to infer module & lesson numbers).
 * @param {number} [opts.module] - Explicit module number (overrides inference).
 * @param {number} [opts.lesson] - Explicit lesson number (overrides inference).
 * @returns {object} parsed lesson
 */
function parseLesson(markdown, opts = {}) {
  if (typeof markdown !== 'string' || markdown.trim().length === 0) {
    throw new Error('parseLesson: markdown input is empty.');
  }

  const sections = splitIntoSections(markdown);

  if (!sections.title) {
    // fallback: first H1 in document
    const firstH1 = markdown.match(/^#\s+(.+)$/m);
    if (firstH1) sections.title = firstH1[1].trim();
  }

  const inferred = inferModuleLesson(opts.sourcePath);
  const moduleNumber = opts.module ?? inferred.module;
  const lessonNumber = opts.lesson ?? inferred.lesson;

  if (!moduleNumber || !lessonNumber) {
    throw new Error(
      'parseLesson: could not determine module/lesson number. ' +
        'Pass { module, lesson } explicitly or provide a sourcePath like "module03-lesson02.md".'
    );
  }

  const objectives = parseBulletList(sections.objectives);
  const slideSummary = parseBulletList(sections.slide_summary);
  const visuals = parseBulletList(sections.visuals);
  const quiz = parseQuiz(sections.quiz);

  return {
    meta: {
      module: moduleNumber,
      lesson: lessonNumber,
      lesson_id: `module${String(moduleNumber).padStart(2, '0')}-lesson${String(
        lessonNumber
      ).padStart(2, '0')}`,
    },
    title: (sections.title || '').trim(),
    objectives,
    explanation: (sections.explanation || '').trim(),
    slide_summary: slideSummary,
    narration: (sections.narration || '').trim(),
    visuals,
    exercise: (sections.exercise || '').trim(),
    quiz,
    raw_sections: sections,
  };
}

module.exports = { parseLesson, inferModuleLesson };
