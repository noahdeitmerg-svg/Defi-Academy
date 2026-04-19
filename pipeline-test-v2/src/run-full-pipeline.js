#!/usr/bin/env node
/**
 * run-full-pipeline.js
 *
 * Kompletter End-to-End-Test: Markdown → slides.json + voice.mp3 +
 * voice_timing.json + final_test_video.mp4.
 *
 * Validiert die gesamte Video-Pipeline in einem Durchgang.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { parseModule } = require('./module-parser');
const { buildSlidesJson } = require('./generate-slides-json');
const { buildVoiceText, validateCleanNarration } = require('./extract-voice-text');
const { synthesize } = require('./tts-adapter');
const { distributeSlideTiming } = require('./distribute-slide-timing');
const { renderSlidesToSvg } = require('./render-slides-to-svg');
const { composeVideo } = require('./compose-video');

async function runLesson({ lesson, outputRoot, timingMode = 'proportional' }) {
  const lessonId = lesson.meta.lesson_id;
  const dir = path.join(outputRoot, lessonId);
  const svgDir = path.join(dir, 'slides-svg');
  fs.mkdirSync(svgDir, { recursive: true });

  console.log('');
  console.log('━'.repeat(68));
  console.log(`▶ ${lessonId}: ${lesson.meta.title}`);
  console.log('━'.repeat(68));

  // ── [1] Slide Extraction ──────────────────────────────────────────
  console.log('\n[1] Slide Extraction');
  const slidesJson = buildSlidesJson(lesson);
  const slidesJsonPath = path.join(dir, 'slides.json');
  fs.writeFileSync(slidesJsonPath, JSON.stringify(slidesJson, null, 2), 'utf8');
  console.log(`    ✔ ${slidesJson.meta.total_slides} slides extracted`);
  console.log(`      narration words: ${slidesJson.meta.total_narration_words}`);

  // ── [2] Voice Extraction ──────────────────────────────────────────
  console.log('\n[2] Voice Extraction');
  const validation = validateCleanNarration(lesson);
  if (!validation.clean) {
    throw new Error('Voice extraction contaminated: ' + validation.contaminations.join(', '));
  }
  const voiceText = buildVoiceText(lesson, { mode: 'plain' });
  const voiceTxtPath = path.join(dir, 'voice_text.txt');
  fs.writeFileSync(voiceTxtPath, voiceText, 'utf8');
  console.log(`    ✔ Narration is clean`);
  console.log(`    ✔ voice_text.txt: ${voiceText.length} chars`);

  // ── [3] TTS + Duration ────────────────────────────────────────────
  console.log('\n[3] Audio Synthesis + Duration Measurement');
  const voiceMp3 = path.join(dir, 'voice.mp3');
  const tts = await synthesize(voiceText, voiceMp3, { engine: 'espeak', speed: 155 });
  console.log(`    ✔ engine: ${tts.engine}`);
  console.log(`    ✔ duration: ${tts.duration_seconds.toFixed(2)}s (${Math.floor(tts.duration_seconds / 60)}m ${Math.round(tts.duration_seconds % 60)}s)`);
  console.log(`    ✔ words: ${tts.word_count}, effective WPM: ${tts.wpm_effective}`);

  // ── [4] Slide Timing ──────────────────────────────────────────────
  console.log('\n[4] Slide Timing Distribution');
  const timing = distributeSlideTiming({
    slides: slidesJson.slides,
    total_audio_seconds: tts.duration_seconds,
    mode: timingMode,
  });
  const timingPath = path.join(dir, 'voice_timing.json');
  fs.writeFileSync(timingPath, JSON.stringify(timing, null, 2), 'utf8');
  console.log(`    ✔ mode: ${timing.mode}, ${timing.slides.length} timings`);

  // Attach timing to slides.json
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

  // ── [5] SVG-Slides rendern ────────────────────────────────────────
  console.log('\n[5] SVG Slide Rendering');
  const rendered = renderSlidesToSvg(slidesJsonPath, svgDir);
  console.log(`    ✔ ${rendered.length} SVGs generated`);
  for (const r of rendered) {
    console.log(`      slide ${r.number}: ${r.title.slice(0, 50)}${r.is_risk ? '  [RISK accent]' : ''}`);
  }

  // ── [6] Video Composition ─────────────────────────────────────────
  console.log('\n[6] Video Composition (SVG → PNG → MP4)');
  const outputMp4 = path.join(dir, 'final_test_video.mp4');
  const comp = composeVideo({
    svgDir,
    voiceMp3,
    voiceTiming: timing,
    outputPath: outputMp4,
  });
  console.log(`    ✔ raster:   ${comp.raster_ms} ms (${comp.slides_rasterized} slides)`);
  console.log(`    ✔ encode:   ${comp.encode_ms} ms`);
  console.log(`    ✔ size:     ${(comp.size_bytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`    ✔ output:   ${path.relative(outputRoot, outputMp4)}`);

  return {
    lesson_id: lessonId,
    title: lesson.meta.title,
    slides_json_path: slidesJsonPath,
    voice_mp3_path: voiceMp3,
    voice_timing_path: timingPath,
    final_video_path: outputMp4,
    duration_seconds: tts.duration_seconds,
    slide_count: slidesJson.meta.total_slides,
    video_size_mb: +(comp.size_bytes / 1024 / 1024).toFixed(2),
  };
}

async function main() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const a = process.argv[i];
    if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1];
  }

  const inputPath = args.input || '/mnt/user-data/uploads/modul-01-defi-grundlagen-FINAL.md';
  const outputRoot = path.resolve(args.output || './output');
  const onlyLessonId = args.lesson || 'module01-lesson01';

  console.log('═'.repeat(68));
  console.log('DeFi Academy — Full Pipeline Test (Modul 1)');
  console.log('═'.repeat(68));
  console.log('Input:  ', inputPath);
  console.log('Output: ', outputRoot);
  console.log('Target: ', onlyLessonId);

  const md = fs.readFileSync(inputPath, 'utf8');
  const parsed = parseModule(md);

  const target = parsed.lessons.find((l) => l.meta.lesson_id === onlyLessonId);
  if (!target) {
    throw new Error(`Lesson ${onlyLessonId} not found in module ${parsed.module}`);
  }

  const result = await runLesson({ lesson: target, outputRoot });

  console.log('');
  console.log('═'.repeat(68));
  console.log('✅ Pipeline complete');
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
