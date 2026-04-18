/**
 * tests/run-tests.js
 *
 * End-to-End Test der Pipeline mit der Beispiel-Lektion.
 * Validiert:
 *   - Parser arbeitet korrekt
 *   - Section-Mapper liefert 6-7 Slides
 *   - Alle vier Output-Dateien werden geschrieben
 *   - JSON-Outputs sind valide gegen die Schemas
 *   - Dauer liegt im erlaubten Bereich (300-600s)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { parseLesson } = require('../src/lesson-parser');
const { mapLessonToSections } = require('../src/section-mapper');
const { runPipelineForLesson } = require('../src/pipeline');

const ROOT = path.resolve(__dirname, '..');
const STYLE = path.resolve(ROOT, '../video-style-engine');
const OUT = path.join(ROOT, 'output');
const SAMPLE = path.join(ROOT, 'examples', 'module04-lesson02.md');

function assert(cond, msg) {
  if (!cond) throw new Error('ASSERT FAILED: ' + msg);
}

function validateMinimal(videoConfigObj) {
  assert(videoConfigObj.lesson_id.match(/^module\d{2}-lesson\d{2}$/), 'lesson_id format');
  assert(videoConfigObj.fps === 30, 'fps = 30');
  assert(videoConfigObj.resolution === '1920x1080', 'resolution');
  assert(videoConfigObj.aspect_ratio === '16:9', 'aspect');
  assert(videoConfigObj.duration_seconds >= 300, 'duration >= 300s');
  assert(videoConfigObj.duration_seconds <= 600, 'duration <= 600s');
  assert(Array.isArray(videoConfigObj.sections) && videoConfigObj.sections.length >= 8, 'sections >=8');
  assert(Array.isArray(videoConfigObj.slide_order), 'slide_order exists');
  assert(videoConfigObj.slide_order.length >= 6 && videoConfigObj.slide_order.length <= 7, 'slides 6-7');
  assert(videoConfigObj.audio_track.language === 'de', 'audio de');
}

function run() {
  console.log('─'.repeat(60));
  console.log('Lesson Asset Generator — Test Suite');
  console.log('─'.repeat(60));

  // Clean output
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // Step 1: Parser
  console.log('\n[1] Parser');
  const raw = fs.readFileSync(SAMPLE, 'utf8');
  const lesson = parseLesson(raw, { sourcePath: SAMPLE });
  assert(lesson.title.length > 0, 'title parsed');
  assert(lesson.objectives.length === 4, 'objectives parsed (4)');
  assert(lesson.slide_summary.length >= 10, 'slide summary parsed');
  assert(lesson.quiz.length === 3, 'quiz parsed (3 questions)');
  assert(lesson.meta.module === 4 && lesson.meta.lesson === 2, 'module/lesson inferred');
  console.log(`    ok: parsed "${lesson.title}"`);
  console.log(`    module=${lesson.meta.module}, lesson=${lesson.meta.lesson}`);
  console.log(`    objectives=${lesson.objectives.length}, summary bullets=${lesson.slide_summary.length}, quiz=${lesson.quiz.length}`);

  // Step 2: Section Mapper
  console.log('\n[2] Section Mapper');
  const plan = mapLessonToSections(lesson);
  assert(plan.slide_count >= 6 && plan.slide_count <= 7, 'slide count 6-7');
  assert(plan.slides.every((s) => s.bullets.length <= 4), 'max 4 bullets per slide');
  console.log(`    ok: ${plan.slide_count} slides`);
  plan.slides.forEach((s) => {
    console.log(`      - ${s.id}  [${s.section}]  bullets=${s.bullets.length}  visuals=${s.visuals.length}`);
  });

  // Step 3: Full pipeline
  console.log('\n[3] Full pipeline run');
  const res = runPipelineForLesson({
    input: SAMPLE,
    outputRoot: OUT,
    stylePath: STYLE,
  });
  console.log(`    ok: ${res.lesson_id}`);
  console.log(`    duration: ${res.duration_seconds}s`);
  res.files.forEach((f) => console.log(`      + ${f}`));

  // Step 4: Validate output files exist
  console.log('\n[4] Output files');
  const lessonDir = path.join(OUT, res.lesson_id);
  const expected = ['slides_prompt.txt', 'voice_script.txt', 'visual_plan.json', 'video_config.json'];
  for (const f of expected) {
    const fp = path.join(lessonDir, f);
    assert(fs.existsSync(fp), `file exists: ${f}`);
    const size = fs.statSync(fp).size;
    assert(size > 200, `file non-trivial: ${f}  (${size} bytes)`);
    console.log(`    ok: ${f}  (${size} bytes)`);
  }

  // Step 5: Validate video_config JSON
  console.log('\n[5] video_config.json validation');
  const vc = JSON.parse(fs.readFileSync(path.join(lessonDir, 'video_config.json'), 'utf8'));
  validateMinimal(vc);
  console.log(`    ok: duration=${vc.duration_seconds}s, sections=${vc.sections.length}, slides=${vc.slide_order.length}`);

  // Step 6: Validate visual_plan JSON
  console.log('\n[6] visual_plan.json validation');
  const vp = JSON.parse(fs.readFileSync(path.join(lessonDir, 'visual_plan.json'), 'utf8'));
  assert(vp.lesson_id === res.lesson_id, 'lesson_id matches');
  assert(Array.isArray(vp.visuals) && vp.visuals.length > 0, 'visuals exist');
  assert(Array.isArray(vp.animation_cues) && vp.animation_cues.length > 0, 'animation cues exist');
  console.log(`    ok: ${vp.visuals.length} visuals, ${vp.animation_cues.length} animation cues`);

  // Step 7: voice_script contains ElevenLabs markers
  console.log('\n[7] voice_script.txt validation');
  const vs = fs.readFileSync(path.join(lessonDir, 'voice_script.txt'), 'utf8');
  assert(vs.includes('<break time='), 'contains <break> tags');
  assert(vs.toLowerCase().includes('language: de'), 'contains language: de');
  assert(vs.includes('Slide 1'), 'contains slide markers');
  console.log('    ok: ElevenLabs-compatible script with break markers');

  // Step 8: slides_prompt contains 6-7 slide sections
  console.log('\n[8] slides_prompt.txt validation');
  const sp = fs.readFileSync(path.join(lessonDir, 'slides_prompt.txt'), 'utf8');
  const slideHeaders = sp.match(/### Slide \d+ – /g) || [];
  assert(slideHeaders.length >= 6 && slideHeaders.length <= 7, `slide headers 6-7, got ${slideHeaders.length}`);
  console.log(`    ok: ${slideHeaders.length} slide sections found`);

  console.log('\n' + '─'.repeat(60));
  console.log('✅ All tests passed.');
  console.log('─'.repeat(60));
}

try {
  run();
} catch (err) {
  console.error('\n❌ TEST FAILED:', err.message);
  process.exit(1);
}
