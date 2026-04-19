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

const BRAND_DIR = path.resolve(__dirname, '../../brand');
const { renderSlideV2 } = require(path.join(BRAND_DIR, 'render-slide-v2'));
const {
  categoryForModule,
  parseBulletsFromBody,
  isTitleSlide,
  renderTitleSlideV2,
} = require(path.join(BRAND_DIR, 'slide-helpers'));

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

module.exports = {
  renderSlidesToSvg,
  categoryForModule,
  parseBulletsFromBody,
};
