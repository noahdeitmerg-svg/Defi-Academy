#!/usr/bin/env node
/**
 * run-full-pipeline-v2.js
 *
 * End-to-End Video-Pipeline mit Brand 2.0 Slide-Rendering.
 *
 * Unterschied zu v1:
 *   - Nutzt render-slides-to-svg-v2.js (Brand 2.0 Design)
 *   - Alles andere bleibt identisch (Parser, TTS, Timing, Composition)
 *
 * Usage:
 *   node src/run-full-pipeline-v2.js \
 *     --input ../content/modul-01-defi-grundlagen-FINAL.md \
 *     --lesson module01-lesson01 \
 *     --output ./test-output-v2
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
try {
  const { loadProjectEnv } = require(path.join(REPO_ROOT, 'scripts', 'lib', 'env.js'));
  loadProjectEnv({ cwd: REPO_ROOT });
} catch (_) {
  /* optional */
}

const { parseModule } = require('./module-parser');
const { buildSlidesJson } = require('./generate-slides-json');
const { buildVoiceText, validateCleanNarration } = require('./extract-voice-text');
const { synthesize } = require('./tts-adapter');
const { distributeSlideTiming } = require('./distribute-slide-timing');
const { renderSlidesToSvg } = require('./render-slides-to-svg-v2'); // ← Brand 2.0
const { composeVideo } = require('./compose-video');

async function runLesson({ lesson, outputRoot }) {
  const lessonId = lesson.meta.lesson_id;
  const dir = path.join(outputRoot, lessonId);
  const svgDir = path.join(dir, 'slides-svg');
  fs.mkdirSync(svgDir, { recursive: true });

  console.log('');
  console.log('━'.repeat(68));
  console.log(`▶ ${lessonId}: ${lesson.meta.title}`);
  console.log('━'.repeat(68));

  // [1] slides.json
  const slidesJson = buildSlidesJson(lesson);
  const slidesJsonPath = path.join(dir, 'slides.json');
  fs.writeFileSync(slidesJsonPath, JSON.stringify(slidesJson, null, 2), 'utf8');
  console.log(`  [1] slides.json — ${slidesJson.meta.total_slides} slides, ${slidesJson.meta.total_narration_words} words`);

  // [2] voice_text.txt (clean)
  const validation = validateCleanNarration(lesson);
  if (!validation.clean) {
    throw new Error('Voice contaminated: ' + validation.contaminations.join(', '));
  }
  const voiceText = buildVoiceText(lesson, { mode: 'plain' });
  fs.writeFileSync(path.join(dir, 'voice_text.txt'), voiceText, 'utf8');
  console.log(`  [2] voice_text.txt — ${voiceText.length} chars, clean`);

  // [3] TTS
  const voiceMp3 = path.join(dir, 'voice.mp3');
  const tts = await synthesize(voiceText, voiceMp3, { speed: 155 });
  console.log(`  [3] voice.mp3 — ${tts.duration_seconds.toFixed(1)}s, engine=${tts.engine}`);

  // [4] Timing
  const timing = distributeSlideTiming({
    slides: slidesJson.slides,
    total_audio_seconds: tts.duration_seconds,
    mode: 'proportional',
  });
  fs.writeFileSync(path.join(dir, 'voice_timing.json'), JSON.stringify(timing, null, 2), 'utf8');
  slidesJson.slides = slidesJson.slides.map((s, i) => ({
    ...s,
    timing: {
      start_seconds: timing.slides[i].start_seconds,
      end_seconds: timing.slides[i].end_seconds,
      duration_seconds: timing.slides[i].duration_seconds,
    },
  }));
  slidesJson.meta.total_audio_seconds = timing.total_audio_seconds;
  slidesJson.meta.timing_mode = timing.mode;
  fs.writeFileSync(slidesJsonPath, JSON.stringify(slidesJson, null, 2), 'utf8');
  console.log(`  [4] voice_timing.json — ${timing.slides.length} slides timed`);

  // [5] SVG slides (BRAND 2.0)
  const rendered = renderSlidesToSvg(slidesJsonPath, svgDir);
  console.log(`  [5] SVG slides (Brand 2.0) — ${rendered.length} rendered`);
  for (const r of rendered) {
    console.log(`      slide ${r.number}: ${r.category} · ${r.title.slice(0, 40)}${r.is_title ? ' [title]' : ''}`);
  }

  // [6] Video
  const outputMp4 = path.join(dir, 'final_test_video.mp4');
  const comp = composeVideo({
    svgDir,
    voiceMp3,
    voiceTiming: timing,
    outputPath: outputMp4,
  });
  console.log(`  [6] final_test_video.mp4 — ${(comp.size_bytes / 1024 / 1024).toFixed(2)} MB`);

  return {
    lesson_id: lessonId,
    title: lesson.meta.title,
    slides_json_path: slidesJsonPath,
    voice_mp3_path: voiceMp3,
    voice_timing_path: path.join(dir, 'voice_timing.json'),
    final_video_path: outputMp4,
    duration_seconds: tts.duration_seconds,
    slide_count: slidesJson.meta.total_slides,
    video_size_mb: +(comp.size_bytes / 1024 / 1024).toFixed(2),
  };
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith('--')) {
      args[key] = next;
      i += 1;
    } else {
      args[key] = true;
    }
  }
  return args;
}

function defaultModuleMarkdown() {
  const candidates = [
    path.join(REPO_ROOT, 'Module', 'modul-01-defi-grundlagen-FINAL.md'),
    path.join(REPO_ROOT, 'content', 'modul-01-defi-grundlagen-FINAL.md'),
  ];
  return candidates.find((p) => fs.existsSync(p)) || candidates[0];
}

async function main() {
  const args = parseArgs(process.argv);

  const inputPath = path.resolve(args.input || defaultModuleMarkdown());
  const outputRoot = path.resolve(args.output || path.join(__dirname, '..', 'test-output-v2'));
  const onlyLessonId = args.lesson || 'module01-lesson01';

  console.log('═'.repeat(68));
  console.log('DeFi Academy — Pipeline v2 (Brand 2.0 Design)');
  console.log('═'.repeat(68));
  console.log('Input:  ', inputPath);
  console.log('Output: ', outputRoot);
  console.log('Target: ', onlyLessonId);

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input not found: ${inputPath}`);
  }
  const md = fs.readFileSync(inputPath, 'utf8');
  const parsed = parseModule(md);

  const target = parsed.lessons.find((l) => l.meta.lesson_id === onlyLessonId);
  if (!target) {
    throw new Error(`Lesson ${onlyLessonId} not found in module ${parsed.module}`);
  }

  const result = await runLesson({ lesson: target, outputRoot });

  console.log('');
  console.log('═'.repeat(68));
  console.log('✅ Pipeline v2 complete');
  console.log('═'.repeat(68));
  console.log('Generated:');
  console.log(`  slides.json:          ${result.slides_json_path}`);
  console.log(`  voice.mp3:            ${result.voice_mp3_path}`);
  console.log(`  voice_timing.json:    ${result.voice_timing_path}`);
  console.log(`  final_test_video.mp4: ${result.final_video_path}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('\n❌ Pipeline failed:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  });
}
