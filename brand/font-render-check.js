#!/usr/bin/env node
/**
 * Schreibt brand/samples/inter-700-proof.png — prüfen, ob Resvg Inter Bold laedt
 * (kein Serif-Fallback). Aufruf vom Repo-Root: node brand/font-render-check.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

function requireResvg() {
  const roots = [
    path.join(__dirname, '..', 'pipeline-test-v2', 'node_modules'),
    path.join(__dirname, '..', 'pipeline-test', 'node_modules'),
  ];
  for (const r of roots) {
    const entry = path.join(r, '@resvg', 'resvg-js');
    if (fs.existsSync(entry)) return require(entry);
  }
  return require('@resvg/resvg-js');
}

const { Resvg } = requireResvg();
const { resvgFontOptions } = require('./resvg-inter-fonts');

const brandDir = __dirname;
const outDir = path.join(brandDir, 'samples');
fs.mkdirSync(outDir, { recursive: true });

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="200" viewBox="0 0 640 200">
  <rect width="100%" height="100%" fill="#0B1F3B"/>
  <text x="32" y="110" font-family="Inter" font-size="56" font-weight="700" fill="#FFFFFF">Inter 700 · DeFi</text>
  <text x="32" y="160" font-family="Inter" font-size="28" font-weight="400" fill="#A0AEC0">Regular 400 Zeile</text>
</svg>`;

const resvg = new Resvg(svg, {
  ...resvgFontOptions(brandDir),
  fitTo: { mode: 'width', value: 640 },
  background: '#0B1F3B',
});
const pngPath = path.join(outDir, 'inter-700-proof.png');
fs.writeFileSync(pngPath, resvg.render().asPng());
console.log('OK:', pngPath);
