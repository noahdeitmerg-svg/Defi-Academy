/**
 * Gemeinsame Hilfen fuer Brand-2.0-Slides (Parser-unabhaengig).
 * Von pipeline-test (svg-render) und pipeline-test-v2 (render-slides-to-svg-v2) genutzt.
 */

'use strict';

const { renderSlideV2 } = require('./render-slide-v2');

function categoryForModule(n) {
  if (n <= 2) return 'foundation';
  if (n === 7 || n === 11) return 'risk';
  if (n <= 5) return 'practice';
  if (n <= 10) return 'strategy';
  return 'advanced';
}

/**
 * Parse slide body into a bullet list suitable for checkmark rendering.
 */
function parseBulletsFromBody(body) {
  if (!body) return [];
  const lines = body.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

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

  const numbered = lines.filter((l) => /^\d+\.\s+/.test(l));
  if (numbered.length >= 2) {
    return numbered
      .map((l) => l.replace(/^\d+\.\s+/, '').trim())
      .slice(0, 5);
  }

  const bulleted = lines.filter((l) => /^[-*•]\s+/.test(l));
  if (bulleted.length >= 2) {
    return bulleted
      .map((l) => l.replace(/^[-*•]\s+/, '').trim())
      .slice(0, 5);
  }

  const sentences = (lines.join(' ').match(/[^.!?]+[.!?]+/g) || [])
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 3);
  if (sentences.length >= 2) return sentences.slice(0, 4);

  return [lines.join(' ').slice(0, 140)];
}

function isTitleSlide(slide, index) {
  if (index !== 0) return false;
  const hasTitelKeyword = /^titel$/i.test(slide.title || '');
  const shortBody = !slide.body || slide.body.length < 200;
  return hasTitelKeyword || shortBody;
}

function renderTitleSlideV2({ moduleNumber, lessonNumber, category, lessonTitle }) {
  return renderSlideV2({
    moduleNumber,
    lessonNumber,
    category,
    title: lessonTitle,
    bullets: [],
    showProgressBar: false,
  });
}

module.exports = {
  categoryForModule,
  parseBulletsFromBody,
  isTitleSlide,
  renderTitleSlideV2,
};
