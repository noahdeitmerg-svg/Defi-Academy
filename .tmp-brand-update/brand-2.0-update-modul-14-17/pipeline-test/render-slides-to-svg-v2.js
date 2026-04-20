/**
 * render-slides-to-svg-v2.js
 *
 * Brand 2.0 Slide-Renderer fuer die Video-Pipeline.
 *
 * Aendert gegenueber v1:
 *   - Nutzt renderSlideV2 aus brand/render-slide-v2.js
 *   - Extrahiert Bullet-Punkte fuer die Checkmark-Liste
 *   - Mappt Modul-Nummer auf Kategorie-Pill
 *   - Hero-Motiv wird automatisch ueber die Modul-Nummer zugeordnet
 *
 * Input: gleiches slides.json-Format wie v1
 * Output: SVGs pro Slide im Brand-2.0-Design
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Brand 2.0 imports — pfad relativ aus pipeline-test/src/ zu brand/
const BRAND_DIR = path.resolve(__dirname, '../../brand');
const { renderSlideV2 } = require(path.join(BRAND_DIR, 'render-slide-v2'));

/**
 * Modul-Nummer → Kategorie (fuer den Pill oben links).
 *
 * Verbindliche Gruppierung laut AGENTEN-HANDBUCH §2:
 *   Module 1–3   → Grundlagen
 *   Module 4–8   → Protokollmechaniken
 *   Module 9–13  → Fortgeschrittene Strategien
 *   Module 14–17 → Infrastruktur & Analyse
 *
 * Die Pill-Labels sind in brand/brand-2.0-components.js definiert.
 */
function categoryForModule(n) {
  if (n <= 3) return 'foundation';      // GRUNDLAGEN
  if (n <= 8) return 'practice';         // PROTOKOLLMECHANIK
  if (n <= 13) return 'strategy';        // STRATEGIE
  return 'infrastructure';               // INFRASTRUKTUR & ANALYSE
}

/**
 * Parse slide body into a bullet list suitable for checkmark rendering.
 * Handles:
 *   - Numbered lists "1. ..."
 *   - Bullet lists "- ..."
 *   - Short paragraphs (split on sentence boundaries)
 *   - Markdown tables → first column as bullets
 */
function parseBulletsFromBody(body) {
  if (!body) return [];
  const lines = body.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  // Markdown table: use first column of data rows
  const tableStart = lines.findIndex((l) => /^\|.*\|$/.test(l));
  if (tableStart >= 0) {
    const dataRows = lines
      .slice(tableStart)
      .filter((l) => /^\|.*\|$/.test(l))
      .filter((l) => !/^\|[\s\-:|]+\|$/.test(l));
    if (dataRows.length >= 2) {
      const rows = dataRows.slice(1, 6);
      return rows.map((l) => {
        const cells = l.split('|').slice(1, -1).map((c) => c.trim());
        return cells.filter(Boolean).slice(0, 2).join(' — ');
      });
    }
  }

  // Numbered list
  const numbered = lines.filter((l) => /^\d+\.\s+/.test(l));
  if (numbered.length >= 2) {
    return numbered
      .map((l) => l.replace(/^\d+\.\s+/, '').trim())
      .slice(0, 5);
  }

  // Bullet list
  const bulleted = lines.filter((l) => /^[-*•]\s+/.test(l));
  if (bulleted.length >= 2) {
    return bulleted
      .map((l) => l.replace(/^[-*•]\s+/, '').trim())
      .slice(0, 5);
  }

  // Paragraph: split into meaningful sentences (3+ words each)
  const sentences = (lines.join(' ').match(/[^.!?]+[.!?]+/g) || [])
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 3);
  if (sentences.length >= 2) return sentences.slice(0, 4);

  // Fallback
  return [lines.join(' ').slice(0, 140)];
}

/**
 * Detect if a slide is the title slide (first slide, short body).
 */
function isTitleSlide(slide, index) {
  if (index !== 0) return false;
  const hasTitelKeyword = /^titel$/i.test(slide.title || '');
  const shortBody = !slide.body || slide.body.length < 200;
  return hasTitelKeyword || shortBody;
}

/**
 * Render the TITLE slide (first slide of each lesson).
 * Uses a variant of renderSlideV2 that emphasizes lesson title + module context.
 */
function renderTitleSlideV2({ moduleNumber, lessonNumber, category, lessonTitle }) {
  // Use the same slide template but with an empty bullet list.
  // The "title" becomes the lesson title itself.
  return renderSlideV2({
    moduleNumber,
    lessonNumber,
    category,
    title: lessonTitle,
    bullets: [],
    showProgressBar: false,
  });
}

/**
 * Main entry point: render all slides of a lesson as SVG files.
 *
 * @param {string} slidesJsonPath - path to slides.json
 * @param {string} outputDir      - where to write slide-NN.svg
 * @returns {Array<{number, title, svg_path}>}
 */
function renderSlidesToSvg(slidesJsonPath, outputDir) {
  const slidesJson = JSON.parse(fs.readFileSync(slidesJsonPath, 'utf8'));
  fs.mkdirSync(outputDir, { recursive: true });

  const moduleNumber = slidesJson.module;
  const lessonNumber = slidesJson.lesson;
  const lessonTitle = slidesJson.title;
  const category = categoryForModule(moduleNumber);

  const written = [];

  slidesJson.slides.forEach((slide, index) => {
    const isTitle = isTitleSlide(slide, index);

    let svg;
    if (isTitle) {
      svg = renderTitleSlideV2({
        moduleNumber,
        lessonNumber,
        category,
        lessonTitle,
      });
    } else {
      const bullets = parseBulletsFromBody(slide.body);
      svg = renderSlideV2({
        moduleNumber,
        lessonNumber,
        category,
        title: slide.title,
        bullets,
        showProgressBar: false,
      });
    }

    const filename = `slide-${String(slide.number).padStart(2, '0')}.svg`;
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, svg, 'utf8');

    written.push({
      number: slide.number,
      title: slide.title,
      svg_path: filepath,
      is_title: isTitle,
      category,
    });
  });

  return written;
}

module.exports = { renderSlidesToSvg, categoryForModule, parseBulletsFromBody };
