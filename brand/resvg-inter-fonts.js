/**
 * Inter-TTFs fuer @resvg/resvg-js (font.fontFiles).
 * Dateien liegen unter brand/fonts/ (Inter 4.x, OFL).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const INTER_FILES = [
  'Inter-Regular.ttf',
  'Inter-Medium.ttf',
  'Inter-SemiBold.ttf',
  'Inter-Bold.ttf',
];

/**
 * @param {string} brandDir - absoluter Pfad zum brand/-Ordner
 * @returns {string[]} existierende .ttf-Pfade
 */
function interFontFiles(brandDir) {
  const fontsDir = path.join(brandDir, 'fonts');
  return INTER_FILES.map((f) => path.join(fontsDir, f)).filter((p) => fs.existsSync(p));
}

/**
 * Optionen-Snippet fuer `new Resvg(svg, { ... })`
 * @param {string} brandDir
 * @returns {{ font?: { fontFiles: string[], loadSystemFonts?: boolean } }}
 */
function resvgFontOptions(brandDir) {
  const fontFiles = interFontFiles(brandDir);
  if (fontFiles.length === 0) return {};
  return {
    font: {
      fontFiles,
      loadSystemFonts: true,
    },
  };
}

module.exports = { interFontFiles, resvgFontOptions, INTER_FILES };
