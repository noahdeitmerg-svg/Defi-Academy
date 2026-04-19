#!/usr/bin/env node
/**
 * run-pipeline.js
 *
 * End-to-End Test der kompletten Video-Pipeline anhand von Modul 1,
 * Lektion 1.1.
 *
 * Schritte:
 *   1. Parse das Modul-Markdown → alle 6 Lektionen extrahieren
 *   2. Generiere slides.json für Lektion 1.1
 *   3. Extrahiere den reinen Sprechertext (keine Übungen/Quiz/Visuals)
 *   4. Synthetisiere voice.mp3 (espeak im Test, ElevenLabs in Prod)
 *   5. Messe die tatsächliche Audio-Dauer
 *   6. Verteile die Dauer gleichmäßig (bzw. proportional) auf die Slides
 *   7. Schreibe voice_timing.json + aktualisierte slides.json
 *
 * Output pro Lektion:
 *   output/<lesson_id>/
 *     ├── slides.json
 *     ├── voice.mp3
 *     ├── voice_text.txt            (was an TTS gegangen ist)
 *     ├── voice_timing.json         (Slide-Start-/End-Zeiten)
 *     └── pipeline_report.json      (Metriken, Validierungsergebnisse)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { parseModule } = require('./module-parser');
const { buildSlidesJson } = require('./generate-slides-json');
const { buildVoiceText, validateCleanNarration } = require('./extract-voice-text');
const { synthesize } = require('./tts-adapter');
const { distributeSlideTiming } = require('./distribute-slide-timing');

async function runForLesson({ lesson, outputRoot, timingMode = 'proportional' }) {
  const lessonId = lesson.meta.lesson_id;
  const lessonDir = path.join(outputRoot, lessonId);
  fs.mkdirSync(lessonDir, { recursive: true });

  console.log('');
  console.log('━'.repeat(64));
  console.log(`▶ ${lessonId}: ${lesson.meta.title}`);
  console.log('━'.repeat(64));

  // ── STEP 1: Slide Extraction ──────────────────────────────────────
  console.log('\n[1] Slide Extraction');
  const slidesJson = buildSlidesJson(lesson);
  const slidesJsonPath = path.join(lessonDir, 'slides.json');
  fs.writeFileSync(slidesJsonPath, JSON.stringify(slidesJson, null, 2), 'utf8');
  console.log(`    ✔ ${slidesJson.meta.total_slides} slides extracted`);
  console.log(`      narration words: ${slidesJson.meta.total_narration_words}`);
  console.log(`      written to: ${path.relative(outputRoot, slidesJsonPath)}`);

  // ── STEP 2: Voice Extraction + Cleanliness Validation ─────────────
  console.log('\n[2] Voice Extraction');
  const validation = validateCleanNarration(lesson);
  if (!validation.clean) {
    console.log(`    ✘ Narration contains non-narration content:`);
    validation.contaminations.forEach((c) => console.log(`        - ${c}`));
    throw new Error('Voice extraction failed: contamination detected');
  }
  console.log(`    ✔ Narration is clean (no exercises, quiz, or visuals)`);

  const voiceText = buildVoiceText(lesson, { mode: 'plain' });
  const voiceTextPath = path.join(lessonDir, 'voice_text.txt');
  fs.writeFileSync(voiceTextPath, voiceText, 'utf8');
  console.log(`    ✔ voice_text.txt written (${voiceText.length} chars)`);

  // ── STEP 3: TTS + Audio Duration Measurement ──────────────────────
  console.log('\n[3] Audio Synthesis + Duration Measurement');
  const voiceMp3Path = path.join(lessonDir, 'voice.mp3');
  const t0 = Date.now();
  const tts = await synthesize(voiceText, voiceMp3Path, { engine: 'espeak', speed: 155 });
  const tSynth = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`    ✔ engine: ${tts.engine}  (${tSynth}s wall time)`);
  console.log(`    ✔ duration:      ${tts.duration_seconds.toFixed(2)}s`);
  console.log(`    ✔ effective WPM: ${tts.wpm_effective}`);
  console.log(`    ✔ audio path:    ${path.relative(outputRoot, voiceMp3Path)}`);

  // ── STEP 4: Slide Timing Distribution ─────────────────────────────
  console.log('\n[4] Slide Timing Distribution');
  const timing = distributeSlideTiming({
    slides: slidesJson.slides,
    total_audio_seconds: tts.duration_seconds,
    mode: timingMode,
  });
  const timingPath = path.join(lessonDir, 'voice_timing.json');
  fs.writeFileSync(timingPath, JSON.stringify(timing, null, 2), 'utf8');
  console.log(`    ✔ mode: ${timing.mode}`);
  console.log(`    ✔ ${timing.slides.length} slide timings computed`);
  timing.slides.forEach((t) => {
    console.log(
      `      slide ${t.slide_number}: ` +
        `${t.start_seconds.toFixed(1)}s → ${t.end_seconds.toFixed(1)}s ` +
        `(${t.duration_seconds.toFixed(1)}s, ${t.word_count} words)`
    );
  });

  // ── STEP 5: Enrich slides.json with timing ────────────────────────
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

  return {
    lesson_id: lessonId,
    title: lesson.meta.title,
    slides_json_path: slidesJsonPath,
    voice_mp3_path: voiceMp3Path,
    voice_timing_path: timingPath,
    duration_seconds: tts.duration_seconds,
    word_count: tts.word_count,
    effective_wpm: tts.wpm_effective,
    slide_count: slidesJson.meta.total_slides,
    narration_clean: validation.clean,
  };
}

async function main() {
  const args = Object.fromEntries(
    process.argv
      .slice(2)
      .map((a, i, arr) => (a.startsWith('--') ? [a.slice(2), arr[i + 1]] : null))
      .filter(Boolean)
  );

  const inputPath = args.input || '/mnt/user-data/uploads/modul-01-defi-grundlagen-FINAL.md';
  const outputRoot = path.resolve(args.output || './output');
  const onlyLessonId = args.lesson || null; // e.g. "module01-lesson01"
  const timingMode = args.mode || 'proportional';

  console.log('═'.repeat(64));
  console.log('DeFi Academy — Pipeline Test (Modul 1)');
  console.log('═'.repeat(64));
  console.log('Input: ', inputPath);
  console.log('Output:', outputRoot);

  const md = fs.readFileSync(inputPath, 'utf8');
  const parsed = parseModule(md);
  console.log(`\nParsed module ${parsed.module} with ${parsed.lessons.length} lesson(s).`);

  fs.mkdirSync(outputRoot, { recursive: true });

  const results = [];
  for (const lesson of parsed.lessons) {
    if (onlyLessonId && lesson.meta.lesson_id !== onlyLessonId) continue;
    const r = await runForLesson({ lesson, outputRoot, timingMode });
    results.push(r);
  }

  // Write pipeline report
  const report = {
    module: parsed.module,
    input_markdown: inputPath,
    total_lessons_processed: results.length,
    timing_mode: timingMode,
    ran_at: new Date().toISOString(),
    results,
  };
  const reportPath = path.join(outputRoot, 'pipeline_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('');
  console.log('═'.repeat(64));
  console.log(`✅ Pipeline complete — ${results.length} lesson(s) processed`);
  console.log('═'.repeat(64));
  console.log(`Report: ${reportPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('\n❌ Pipeline failed:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  });
}

module.exports = { runForLesson };
