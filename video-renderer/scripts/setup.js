#!/usr/bin/env node
/**
 * scripts/setup.js
 *
 * Einmalig auszufuehren, um die Renderer-Umgebung einzurichten.
 *
 * Was passiert:
 *   1. Dateien der Video Style Engine werden nach remotion/style-engine/
 *      kopiert (theme.json, slide-template.jsx, intro-scene.jsx, outro-scene.jsx).
 *      Wir brauchen diese, damit Remotion sie ueber relative Imports aufloesen
 *      kann — staticFile() funktioniert fuer .jsx-Komponenten nicht.
 *   2. Der Lesson-Parser und Section-Mapper des Asset-Generators werden nach
 *      src/external/ kopiert (Wiederverwendung fuer Markdown → Slide Plan).
 *   3. Der public/-Ordner wird initialisiert.
 *
 * Usage:
 *   node scripts/setup.js \
 *     --style    ../video-style-engine \
 *     --generator ../lesson-asset-generator
 */

'use strict';

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    args[key] = val;
  }
  return args;
}

function copyFileSafe(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source file not found: ${src}`);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  ✔  ${path.relative(process.cwd(), dest)}`);
}

function main() {
  const args = parseArgs(process.argv);
  const rendererRoot = path.resolve(__dirname, '..');

  const stylePath = path.resolve(
    args.style || path.join(rendererRoot, '..', 'video-style-engine')
  );
  const generatorPath = path.resolve(
    args.generator || path.join(rendererRoot, '..', 'lesson-asset-generator')
  );

  console.log('DeFi Academy Video Renderer — Setup');
  console.log('─'.repeat(60));
  console.log(`Style Engine: ${stylePath}`);
  console.log(`Generator:    ${generatorPath}`);
  console.log('');

  if (!fs.existsSync(stylePath)) {
    console.error(`❌ Video Style Engine not found at ${stylePath}`);
    console.error('   Provide --style <path> or place it alongside this renderer.');
    process.exit(1);
  }
  if (!fs.existsSync(generatorPath)) {
    console.error(`❌ Lesson Asset Generator not found at ${generatorPath}`);
    console.error('   Provide --generator <path> or place it alongside this renderer.');
    process.exit(1);
  }

  // Step 1: Mirror style engine files into remotion/style-engine/
  console.log('[1] Mirroring Video Style Engine files');
  const styleEngineTarget = path.join(rendererRoot, 'remotion', 'style-engine');
  fs.mkdirSync(styleEngineTarget, { recursive: true });

  const styleFiles = [
    'theme.json',
    'visual-timing.json',
    'animation-rules.json',
    'slide-template.jsx',
    'intro-scene.jsx',
    'outro-scene.jsx',
  ];

  for (const f of styleFiles) {
    const src = path.join(stylePath, f);
    const dest = path.join(styleEngineTarget, f);
    copyFileSafe(src, dest);
  }

  // Patch the scene files so their `import theme from './theme.json'` works.
  // The original files reference ./theme.json relatively — they already do.
  // Nothing to patch; copying preserves that.

  // 1b: Mirror brand assets (logos, colors, typography) if present.
  //     The scenes embed the logo inline as SVG, so this mirror is only
  //     a convenience for future staticFile() lookups and documentation.
  const brandSrc = path.join(stylePath, 'brand');
  if (fs.existsSync(brandSrc)) {
    const brandDest = path.join(styleEngineTarget, 'brand');
    fs.mkdirSync(brandDest, { recursive: true });
    for (const entry of fs.readdirSync(brandSrc, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      copyFileSafe(
        path.join(brandSrc, entry.name),
        path.join(brandDest, entry.name)
      );
    }
  }

  console.log('');

  // Step 2: Mirror generator's parser + section-mapper into src/external/
  console.log('[2] Mirroring Lesson Asset Generator modules');
  const externalTarget = path.join(rendererRoot, 'src', 'external');
  fs.mkdirSync(externalTarget, { recursive: true });

  const generatorFiles = [
    'src/lesson-parser.js',
    'src/section-mapper.js',
  ];

  for (const f of generatorFiles) {
    const src = path.join(generatorPath, f);
    const dest = path.join(externalTarget, path.basename(f));
    copyFileSafe(src, dest);
  }

  console.log('');

  // Step 3: Initialize public/ directory
  console.log('[3] Preparing public/ directory');
  const publicDir = path.join(rendererRoot, 'public');
  fs.mkdirSync(path.join(publicDir, 'assets'), { recursive: true });
  console.log(`  ✔  ${path.relative(process.cwd(), publicDir)}/`);
  console.log('');

  console.log('✅ Setup complete. Next:');
  console.log('   1. Install dependencies:  npm install');
  console.log('   2. Preflight-check:       npm run test:preflight');
  console.log('   3. Render a single:       node src/render-lesson.js --lesson-id moduleXX-lessonYY ...');
  console.log('   4. Batch-render:          node src/render-batch.js ...');
}

try {
  main();
} catch (err) {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
}
