/**
 * module-parser.js
 *
 * Liest ein komplettes Modul-Markdown des Content Agents und extrahiert
 * pro Lektion:
 *   - meta (Modul- und Lektionsnummer, Titel)
 *   - slides[]        (Titel + Body, exakt nach [Slide N] Markern)
 *   - narration[]     (Sprechertext pro Slide, 1:1 mit slides)
 *   - visuals[]       (Visual Suggestions pro Slide)
 *
 * Strikte Regel:
 *   Der Sprechertext wird AUSSCHLIESSLICH aus dem Abschnitt "### Sprechertext"
 *   extrahiert. Übungen, Quiz, Visual Suggestions und Learning Objectives
 *   werden niemals in den gesprochenen Text gemischt.
 *
 * Format-Annahmen (dokumentiert durch modul-01-defi-grundlagen-FINAL.md):
 *
 *   ## Lektion 1.1 — <Titel>
 *
 *   ### Lernziele        (oder: ### Learning Objectives)
 *   - ...
 *
 *   ### Erklärung
 *   <fliesstext>
 *
 *   ### Folien-Zusammenfassung
 *   **[Slide 1] — Titel**
 *   <slide body>
 *   **[Slide 2] — <slide title>**
 *   <slide body>
 *   ...
 *
 *   ### Sprechertext
 *   **[Slide 1]**
 *   <narration>
 *   **[Slide 2]**
 *   <narration>
 *   ...
 *
 *   ### Visuelle Vorschläge
 *   **[Slide 1]** <visual description>
 *   **[Slide 2]** <visual description>
 *   ...
 *
 *   ### Übung
 *   ...
 *
 *   ### Quiz
 *   ...
 */

'use strict';

const SECTION_ALIASES = {
  'lernziele': 'objectives',
  'learning objectives': 'objectives',
  'erklärung': 'explanation',
  'erklaerung': 'explanation',
  'explanation': 'explanation',
  'folien-zusammenfassung': 'slides_raw',
  'foliensammlung': 'slides_raw',
  'slide summary': 'slides_raw',
  'sprechertext': 'narration_raw',
  'voice narration script': 'narration_raw',
  'voiceover': 'narration_raw',
  'visuelle vorschläge': 'visuals_raw',
  'visuelle vorschlaege': 'visuals_raw',
  'visual suggestions': 'visuals_raw',
  'übung': 'exercise',
  'uebung': 'exercise',
  'exercise': 'exercise',
  'quiz': 'quiz',
  'video-pipeline-assets': 'pipeline_assets',
};

function normalizeHeading(raw) {
  return raw.replace(/^#+\s*/, '').trim().toLowerCase();
}

function parseModuleNumber(markdown) {
  // "# Modul 1 — ..." or "# Module 1 ..."
  const m = markdown.match(/^#\s+Modul(?:e)?\s+(\d+)/mi);
  return m ? parseInt(m[1], 10) : null;
}

function parseLessonHeader(line) {
  // "## Lektion 1.1 — <title>"  or  "## Lesson 1.1 ..."
  const m = line.match(/^##\s+Lektion\s+(\d+)\.(\d+)\s*[—\-:]\s*(.+)$/i)
    || line.match(/^##\s+Lesson\s+(\d+)\.(\d+)\s*[—\-:]\s*(.+)$/i);
  if (!m) return null;
  return {
    module: parseInt(m[1], 10),
    lesson: parseInt(m[2], 10),
    title: m[3].trim(),
  };
}

/**
 * Split a lesson body into its named sections.
 * Only H3 headings that match SECTION_ALIASES are treated as section boundaries.
 */
function splitLessonIntoSections(lessonBody) {
  const lines = lessonBody.split(/\r?\n/);
  const sections = {};
  let currentKey = null;
  let buffer = [];

  const flush = () => {
    if (currentKey) sections[currentKey] = buffer.join('\n').trim();
    buffer = [];
  };

  for (const line of lines) {
    if (/^#{3}\s+/.test(line)) {
      const heading = normalizeHeading(line);
      const key = SECTION_ALIASES[heading];
      if (key) {
        flush();
        currentKey = key;
        continue;
      } else {
        // unknown H3 — close current section, ignore until next known one
        flush();
        currentKey = null;
        continue;
      }
    }
    if (currentKey) buffer.push(line);
  }
  flush();
  return sections;
}

/**
 * Parse **[Slide N] — Title**\n<body>\n\n**[Slide N+1] ...** blocks.
 * Returns array of { number, title, body }.
 *
 * The body is whatever comes between the marker and the next marker,
 * trimmed, with blank lines preserved within.
 */
function parseSlideBlocks(text, { requireTitle = false } = {}) {
  if (!text) return [];

  // Regex: **[Slide N]** with optional " — <title>**" (em dash, en dash, hyphen)
  // The title (if present) must stop before the closing `**`.
  const markerRegex = /\*\*\[Slide\s+(\d+)\](?:\s*[—–\-]\s*([^*\n]+?))?\s*\*\*/g;

  const matches = [];
  let m;
  while ((m = markerRegex.exec(text)) !== null) {
    matches.push({
      number: parseInt(m[1], 10),
      title: m[2] ? m[2].trim() : null,
      start: m.index,
      end: m.index + m[0].length,
    });
  }

  if (matches.length === 0) {
    // Fallback: some variations omit the bold markers (rare). Try [Slide N] only.
    const fallbackRegex = /\[Slide\s+(\d+)\](?:\s*[—–\-]\s*([^\n]+))?/g;
    while ((m = fallbackRegex.exec(text)) !== null) {
      matches.push({
        number: parseInt(m[1], 10),
        title: m[2] ? m[2].trim() : null,
        start: m.index,
        end: m.index + m[0].length,
      });
    }
  }

  if (matches.length === 0) return [];

  const slides = [];
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const next = matches[i + 1];
    const bodyStart = cur.end;
    const bodyEnd = next ? next.start : text.length;
    let body = text.slice(bodyStart, bodyEnd).trim();

    // Strip leading punctuation artefacts like stray ": " or "—"
    body = body.replace(/^[\s\n]*[—–\-:]\s*/, '');

    // If title was not on the marker line but appears in the body header,
    // the first non-empty line is often the title for slide 1 (title slide).
    let title = cur.title;
    if (!title) {
      const firstLine = body.split(/\r?\n/).find((l) => l.trim().length > 0);
      if (firstLine && firstLine.length < 120) {
        title = firstLine.trim();
      }
    }

    slides.push({
      number: cur.number,
      title: title || `Slide ${cur.number}`,
      body: body,
    });
  }

  // Sort by number to be safe (in case content out of order)
  slides.sort((a, b) => a.number - b.number);
  return slides;
}

/**
 * Parse a single lesson (its pre-split markdown body) into a structured object.
 */
function parseLesson(lessonBody, header, moduleNumber) {
  const sections = splitLessonIntoSections(lessonBody);

  const slideBlocks = parseSlideBlocks(sections.slides_raw || '');
  const narrationBlocks = parseSlideBlocks(sections.narration_raw || '');
  const visualBlocks = parseSlideBlocks(sections.visuals_raw || '');

  // Build unified slides: slide number -> { title, body, narration, visual }
  const maxSlideNum = Math.max(
    slideBlocks.length > 0 ? slideBlocks[slideBlocks.length - 1].number : 0,
    narrationBlocks.length > 0 ? narrationBlocks[narrationBlocks.length - 1].number : 0,
    visualBlocks.length > 0 ? visualBlocks[visualBlocks.length - 1].number : 0
  );

  const unified = [];
  const byNum = (arr, n) => arr.find((x) => x.number === n) || null;

  for (let n = 1; n <= maxSlideNum; n++) {
    const slide = byNum(slideBlocks, n);
    const narration = byNum(narrationBlocks, n);
    const visual = byNum(visualBlocks, n);

    unified.push({
      number: n,
      title: slide ? slide.title : `Slide ${n}`,
      body: slide ? slide.body : '',
      narration: narration ? narration.body : '',
      visual: visual ? visual.body : '',
    });
  }

  const lessonId = `module${String(moduleNumber).padStart(2, '0')}-lesson${String(header.lesson).padStart(2, '0')}`;

  return {
    meta: {
      module: moduleNumber,
      lesson: header.lesson,
      lesson_id: lessonId,
      title: header.title,
    },
    objectives: parseBulletList(sections.objectives),
    explanation: sections.explanation || '',
    slides: unified,
    exercise: sections.exercise || '',
    quiz_raw: sections.quiz || '',
    _sections: Object.keys(sections),
  };
}

function parseBulletList(text) {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => /^[-*•]\s+/.test(l))
    .map((l) => l.replace(/^[-*•]\s+/, '').trim())
    .filter(Boolean);
}

/**
 * Main entry point: parse a full module markdown file into lessons.
 */
function parseModule(markdown) {
  const moduleNumber = parseModuleNumber(markdown);
  if (!moduleNumber) {
    throw new Error('parseModule: could not find "# Modul <N>" header.');
  }

  const lines = markdown.split(/\r?\n/);
  const lessonStarts = [];
  lines.forEach((line, idx) => {
    const header = parseLessonHeader(line);
    if (header) lessonStarts.push({ index: idx, header });
  });

  if (lessonStarts.length === 0) {
    throw new Error('parseModule: no lessons found (expected "## Lektion X.Y — Title").');
  }

  const lessons = [];
  for (let i = 0; i < lessonStarts.length; i++) {
    const cur = lessonStarts[i];
    const next = lessonStarts[i + 1];
    const bodyStart = cur.index + 1;
    const bodyEnd = next ? next.index : lines.length;
    const body = lines.slice(bodyStart, bodyEnd).join('\n');
    lessons.push(parseLesson(body, cur.header, moduleNumber));
  }

  return {
    module: moduleNumber,
    lessons,
  };
}

module.exports = { parseModule, parseLesson, parseSlideBlocks };
