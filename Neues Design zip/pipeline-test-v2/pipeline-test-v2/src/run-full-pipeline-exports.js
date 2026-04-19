/**
 * run-full-pipeline-exports.js
 *
 * Extrahiert die reine runLesson-Funktion aus run-full-pipeline.js, damit
 * sie in Batch-Kontexten nutzbar ist, ohne dass die Main-CLI triggert.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { buildSlidesJson } = require('./generate-slides-json');
const { buildVoiceText, validateCleanNarration } = require('./extract-voice-text');
const { synthesize } = require('./tts-adapter');
const { distributeSlideTiming } = require('./distribute-slide-timing');
const { renderSlidesToSvg } = require('./render-slides-to-svg');
const { composeVideo } = require('./compose-video');

async function runLesson({ lesson, outputRoot, timingMode = 'proportional', ttsEngine, voiceId }) {
  const lessonId = lesson.meta.lesson_id;
  const dir = path.join(outputRoot, lessonId);
  const svgDir = path.join(dir, 'slides-svg');
  fs.mkdirSync(svgDir, { recursive: true });

  console.log('');
  console.log('━'.repeat(68));
  console.log(`▶ ${lessonId}: ${lesson.meta.title}`);
  console.log('━'.repeat(68));

  // [1] Slides
  const slidesJson = buildSlidesJson(lesson);
  const slidesJsonPath = path.join(dir, 'slides.json');
  fs.writeFileSync(slidesJsonPath, JSON.stringify(slidesJson, null, 2), 'utf8');
  console.log(`  [1] slides.json — ${slidesJson.meta.total_slides} slides, ${slidesJson.meta.total_narration_words} words`);

  // [2] Voice text
  const validation = validateCleanNarration(lesson);
  if (!validation.clean) {
    throw new Error('Voice contaminated: ' + validation.contaminations.join(', '));
  }
  const voiceText = buildVoiceText(lesson, { mode: 'plain' });
  fs.writeFileSync(path.join(dir, 'voice_text.txt'), voiceText, 'utf8');
  console.log(`  [2] voice_text.txt — ${voiceText.length} chars, clean`);

  // [3] TTS — picks engine automatically (elevenlabs if env vars set, else espeak)
  const voiceMp3 = path.join(dir, 'voice.mp3');
  const ttsOpts = { engine: ttsEngine, voiceId, speed: 155 };
  const tts = await synthesize(voiceText, voiceMp3, ttsOpts);
  console.log(`  [3] voice.mp3 — ${tts.duration_seconds.toFixed(1)}s, engine=${tts.engine}, WPM=${tts.wpm_effective}${tts.cost_estimate_usd ? ', est $' + tts.cost_estimate_usd : ''}`);

  // [4] Timing
  const timing = distributeSlideTiming({
    slides: slidesJson.slides,
    total_audio_seconds: tts.duration_seconds,
    mode: timingMode,
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
  console.log(`  [4] voice_timing.json — ${timing.slides.length} slides, ${timingMode} mode`);

  // [5] SVG slides
  const rendered = renderSlidesToSvg(slidesJsonPath, svgDir);
  console.log(`  [5] SVG slides — ${rendered.length} rendered`);

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
    word_count: tts.word_count,
    effective_wpm: tts.wpm_effective,
    video_size_mb: +(comp.size_bytes / 1024 / 1024).toFixed(2),
    narration_clean: true,
  };
}

module.exports = { runLesson };
