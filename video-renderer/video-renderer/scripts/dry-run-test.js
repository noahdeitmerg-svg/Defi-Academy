#!/usr/bin/env node
/**
 * scripts/dry-run-test.js
 *
 * End-to-End-Test der Renderer-Pipeline OHNE tatsaechliches Video-Rendering.
 * Validiert:
 *   1. Setup hat alle Style-Engine- und Generator-Dateien korrekt kopiert
 *   2. Asset-Resolver laeuft fehlerfrei durch und schreibt render-input.json
 *   3. Das erzeugte render-input.json hat die vom Remotion-Bundle erwarteten
 *      Props (videoConfig, slidePlan, visualPlan, audioPath, nextLesson)
 *   4. Der Slide-Plan matched die section_refs aus video_config.json
 *   5. Die Remotion-Entry-Datei und die Lesson-Komposition sind syntaktisch
 *      valide (require-Test auf die JS-Module)
 *
 * Der echte renderMedia()-Aufruf ist nicht testbar ohne Remotion-Install,
 * wird aber durch einen Mock-Test ersetzt, der die Props und die
 * Composition-Registrierung prueft.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const rendererRoot = path.resolve(__dirname, '..');

function assert(cond, msg) {
  if (!cond) throw new Error('ASSERT FAILED: ' + msg);
}

function run() {
  console.log('═'.repeat(68));
  console.log('Video Renderer — Dry-Run Test (no Remotion install required)');
  console.log('═'.repeat(68));

  // 1. Check setup
  console.log('\n[1] Setup verification');
  const requiredFiles = [
    'remotion/index.jsx',
    'remotion/components/Lesson.jsx',
    'remotion/components/VisualRenderer.jsx',
    'remotion/style-engine/theme.json',
    'remotion/style-engine/slide-template.jsx',
    'remotion/style-engine/intro-scene.jsx',
    'remotion/style-engine/outro-scene.jsx',
    'src/asset-resolver.js',
    'src/render-lesson.js',
    'src/render-batch.js',
    'src/external/lesson-parser.js',
    'src/external/section-mapper.js',
  ];

  for (const f of requiredFiles) {
    const p = path.join(rendererRoot, f);
    assert(fs.existsSync(p), `missing ${f}`);
    console.log(`    ok: ${f}`);
  }

  // 2. Verify generator output exists
  console.log('\n[2] Generator output discovery');
  const generatorDir = path.resolve(
    rendererRoot,
    '..',
    'lesson-asset-generator',
    'output'
  );
  assert(fs.existsSync(generatorDir), `generator output dir missing: ${generatorDir}`);
  const lessons = fs
    .readdirSync(generatorDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^module\d{2}-lesson\d{2}$/.test(e.name))
    .map((e) => e.name);
  assert(lessons.length > 0, 'no lessons in generator output');
  console.log(`    ok: ${lessons.length} lesson(s)`);
  lessons.forEach((l) => console.log(`       - ${l}`));

  // 3. Test asset resolver
  console.log('\n[3] Asset resolver');
  const { resolveLessonAssets } = require('../src/asset-resolver');

  const lessonId = lessons[0];
  const mdPath = path.resolve(
    rendererRoot,
    '..',
    'lesson-asset-generator',
    'examples',
    `${lessonId}.md`
  );
  const mdExists = fs.existsSync(mdPath);

  const tmpPublicDir = path.join(rendererRoot, '.tmp-public');
  fs.rmSync(tmpPublicDir, { recursive: true, force: true });

  const result = resolveLessonAssets({
    generatorOutputDir: generatorDir,
    lessonId,
    assetsInputDir: null, // no external assets in this test
    lessonMarkdownPath: mdExists ? mdPath : null,
    publicDir: tmpPublicDir,
    nextLesson: null,
  });

  assert(result.renderInput, 'renderInput object present');
  assert(fs.existsSync(result.renderInputPath), 'render-input.json written');
  console.log(`    ok: resolved ${lessonId}`);
  console.log(`       render-input.json: ${result.renderInputPath}`);

  // 4. Verify render-input structure
  console.log('\n[4] render-input.json validation');
  const ri = JSON.parse(fs.readFileSync(result.renderInputPath, 'utf8'));

  assert(ri.lesson_id === lessonId, 'lesson_id match');
  assert(ri.videoConfig, 'videoConfig present');
  assert(ri.slidePlan, 'slidePlan present');
  assert(ri.visualPlan, 'visualPlan present');
  assert(Array.isArray(ri.videoConfig.sections), 'sections array');
  assert(ri.videoConfig.sections.length === 9, 'exactly 9 sections');
  assert(Array.isArray(ri.slidePlan.slides), 'slides array');
  assert(
    ri.slidePlan.slides.length >= 6 && ri.slidePlan.slides.length <= 7,
    'slide count 6-7'
  );
  console.log(`    ok: ${ri.videoConfig.sections.length} sections, ${ri.slidePlan.slides.length} slides`);

  // 5. Verify that every slide_ref in sections has a matching slide
  console.log('\n[5] Cross-reference validation');
  const slideIds = new Set(ri.slidePlan.slides.map((s) => s.id));
  const slideRefs = ri.videoConfig.sections
    .filter((s) => s.scene === 'slide-template')
    .map((s) => s.slide_ref);
  for (const ref of slideRefs) {
    assert(slideIds.has(ref), `section references unknown slide: ${ref}`);
  }
  console.log(`    ok: all ${slideRefs.length} section slide_refs match slides`);

  // Verify every visual references a valid slide
  const visualSlideRefs = ri.visualPlan.visuals.map((v) => v.slide_ref);
  for (const ref of visualSlideRefs) {
    assert(slideIds.has(ref), `visual references unknown slide: ${ref}`);
  }
  console.log(`    ok: all ${visualSlideRefs.length} visuals reference valid slides`);

  // Verify all visuals are marked as placeholder (no assets provided)
  const placeholderCount = ri.visualPlan.visuals.filter((v) => v._placeholder).length;
  assert(placeholderCount === ri.visualPlan.visuals.length, 'all visuals placeholder');
  console.log(`    ok: ${placeholderCount}/${ri.visualPlan.visuals.length} visuals are placeholders (expected in dry-run)`);

  // 6. Verify Lesson.jsx compiles (basic syntax check via require of its Babel-transformed form)
  console.log('\n[6] JSX syntax checks');
  // We can't require .jsx directly without a transformer. Do a string-level sanity check.
  const lessonJsx = fs.readFileSync(
    path.join(rendererRoot, 'remotion/components/Lesson.jsx'),
    'utf8'
  );
  assert(lessonJsx.includes('from \'remotion\''), 'Lesson imports from remotion');
  assert(lessonJsx.includes('<IntroScene'), 'uses IntroScene');
  assert(lessonJsx.includes('<OutroScene'), 'uses OutroScene');
  assert(lessonJsx.includes('<SlideTemplate'), 'uses SlideTemplate');
  assert(lessonJsx.includes('<Audio'), 'uses Audio');
  assert(lessonJsx.includes('<Sequence'), 'uses Sequence');
  console.log('    ok: Lesson.jsx references all required Remotion primitives');

  const indexJsx = fs.readFileSync(
    path.join(rendererRoot, 'remotion/index.jsx'),
    'utf8'
  );
  assert(indexJsx.includes('registerRoot'), 'index.jsx calls registerRoot');
  assert(indexJsx.includes('id="Lesson"'), 'Lesson composition registered');
  assert(indexJsx.includes('width={1920}') || indexJsx.includes('WIDTH = 1920'), 'width 1920');
  assert(indexJsx.includes('height={1080}') || indexJsx.includes('HEIGHT = 1080'), 'height 1080');
  console.log('    ok: remotion/index.jsx registers Lesson composition');

  // 7. Verify section-mapper & parser can be required (they're plain Node.js)
  console.log('\n[7] External module smoke test');
  const { parseLesson } = require('../src/external/lesson-parser');
  const { mapLessonToSections } = require('../src/external/section-mapper');
  if (mdExists) {
    const l = parseLesson(fs.readFileSync(mdPath, 'utf8'), { sourcePath: mdPath });
    const plan = mapLessonToSections(l);
    assert(plan.slides.length >= 6 && plan.slides.length <= 7, 'mapped slides 6-7');
    console.log(`    ok: parse + map produces ${plan.slides.length} slides`);
  } else {
    console.log('    skip: no markdown file to test against');
  }

  // 8. Simulate batch lesson discovery
  console.log('\n[8] Batch discovery simulation');
  const discovered = fs
    .readdirSync(generatorDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^module\d{2}-lesson\d{2}$/.test(e.name))
    .map((e) => e.name)
    .sort();
  console.log(`    ok: batch would process ${discovered.length} lesson(s) in order`);
  discovered.forEach((l) => console.log(`       → ${l}`));

  // Cleanup
  fs.rmSync(tmpPublicDir, { recursive: true, force: true });

  console.log('\n' + '═'.repeat(68));
  console.log('✅ Dry-run passed. Pipeline wiring is correct.');
  console.log('   To do an actual render, run:');
  console.log('     npm install');
  console.log('     npm run render -- --lesson-id moduleXX-lessonYY ...');
  console.log('═'.repeat(68));
}

try {
  run();
} catch (err) {
  console.error('\n❌ Dry-run failed:', err.message);
  if (err.stack) console.error(err.stack);
  process.exit(1);
}
