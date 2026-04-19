'use strict';

const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const W = 1920;

function loadBrandColors(repoRoot) {
  const p = path.join(repoRoot, 'brand', 'colors.json');
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  return {
    primary_background: j.brand.primary_background.hex,
    primary_accent: j.brand.primary_accent.hex,
    text_primary: j.brand.text_primary.hex,
    text_secondary: j.brand.text_secondary.hex,
  };
}

/**
 * Brand 2.0: SVGs aus brand/render-slide-v2.js, PNGs via @resvg/resvg-js mit Inter (brand/fonts).
 */
function renderSlidePngs({
  outDir,
  slides,
  repoRoot,
  moduleNumber,
  lessonNumber,
  lessonTitle,
  log,
}) {
  const brandDir = path.join(repoRoot, 'brand');
  const { renderSlideV2 } = require(path.join(brandDir, 'render-slide-v2'));
  const {
    categoryForModule,
    parseBulletsFromBody,
    isTitleSlide,
    renderTitleSlideV2,
  } = require(path.join(brandDir, 'slide-helpers'));
  const { resvgFontOptions } = require(path.join(brandDir, 'resvg-inter-fonts'));

  const colors = loadBrandColors(repoRoot);
  const modN = Number(moduleNumber) || 1;
  const lesN = Number(lessonNumber) || 1;
  const category = categoryForModule(modN);
  const fontOpts = resvgFontOptions(brandDir);

  const total = slides.length;
  const paths = [];
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const titleSlide = isTitleSlide(s, i);
    const svg = titleSlide
      ? renderTitleSlideV2({
        moduleNumber: modN,
        lessonNumber: lesN,
        category,
        lessonTitle,
      })
      : renderSlideV2({
        moduleNumber: modN,
        lessonNumber: lesN,
        category,
        title: s.title,
        bullets: parseBulletsFromBody(s.body || ''),
        showProgressBar: false,
      });

    const svgPath = path.join(outDir, `slide-${String(s.number).padStart(2, '0')}.svg`);
    fs.writeFileSync(svgPath, svg, 'utf8');

    const resvg = new Resvg(svg, {
      ...fontOpts,
      fitTo: { mode: 'width', value: W },
      background: colors.primary_background,
    });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(s.number).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    paths.push(pngPath);
    log(`SVG/PNG Slide ${s.number}: ${path.basename(svgPath)}`);
  }
  return paths;
}

module.exports = { renderSlidePngs, loadBrandColors };
