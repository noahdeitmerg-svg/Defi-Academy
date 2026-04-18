/**
 * format-detector.js
 *
 * Erkennt automatisch, welches Content-Agent-Format vorliegt und waehlt
 * den richtigen Parser:
 *
 *   "module" — neues Format mit "## Lektion X.Y" und "[Slide N]"-Markern.
 *              Eine Datei enthaelt mehrere Lektionen eines ganzen Moduls.
 *              Parser: module-parser.js
 *
 *   "single" — altes Format mit einzelner Lektion pro Datei.
 *              Ueberschriften wie "# Lesson Title", "# Learning Objectives".
 *              Parser: lesson-parser.js
 *
 * Die Erkennung basiert auf drei Kriterien:
 *   1. Enthaelt die Datei ein "# Modul <N>"-Header? → module
 *   2. Enthaelt sie mindestens eine "## Lektion X.Y"-Zeile? → module
 *   3. Enthaelt sie "**[Slide N]**"-Marker? → module
 *   Andernfalls → single
 */

'use strict';

const fs = require('fs');
const { parseLesson } = require('./lesson-parser');
const { parseModule } = require('./module-parser');

function detectFormat(markdown) {
  const hasModuleHeader = /^#\s+Modul(?:e)?\s+\d+/mi.test(markdown);
  const hasLessonHeaders = /^##\s+(?:Lektion|Lesson)\s+\d+\.\d+/mi.test(markdown);
  const hasSlideMarkers = /\*\*\[Slide\s+\d+\]/.test(markdown);

  // Strong indicators of new "module" format:
  if (hasModuleHeader || (hasLessonHeaders && hasSlideMarkers)) {
    return 'module';
  }

  // Weak indicator: Lektion-Header without Slide-Marker (could be transitional)
  if (hasLessonHeaders) {
    return 'module';
  }

  return 'single';
}

/**
 * Unified parsing entry point.
 *
 * @param {string} markdown - the full markdown content
 * @param {object} opts
 * @param {string} [opts.sourcePath] - file path (for module/lesson inference in single-mode)
 * @param {number} [opts.module]     - override module number (single-mode)
 * @param {number} [opts.lesson]     - override lesson number (single-mode)
 * @returns {object}
 *   {
 *     format: 'module' | 'single',
 *     lessons: [ lessonObject, ... ]  // always an array
 *   }
 */
function parseAuto(markdown, opts = {}) {
  const format = detectFormat(markdown);

  if (format === 'module') {
    const { module: moduleNumber, lessons } = parseModule(markdown);
    return { format, module: moduleNumber, lessons };
  }

  // single-lesson legacy format
  const lesson = parseLesson(markdown, opts);
  return {
    format: 'single',
    module: lesson.meta.module,
    lessons: [lesson],
  };
}

function parseFromFile(filePath, opts = {}) {
  const md = fs.readFileSync(filePath, 'utf8');
  return parseAuto(md, { ...opts, sourcePath: filePath });
}

module.exports = { detectFormat, parseAuto, parseFromFile };
