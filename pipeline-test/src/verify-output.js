#!/usr/bin/env node
/**
 * Prüft test-output/module01-lesson01 gemäß Spezifikation.
 * Usage: node src/verify-output.js [pfad-zu-lesson-dir]
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { ffprobeDurationSeconds } = require('./lib/ffprobe');

const arg = process.argv[2];
const lessonDir = arg && path.isAbsolute(arg)
  ? arg
  : path.resolve(process.cwd(), arg || path.join('test-output', 'module01-lesson01'));

function main() {
  const voice = path.join(lessonDir, 'voice.mp3');
  const vid = path.join(lessonDir, 'final_test_video.mp4');
  const slidesPath = path.join(lessonDir, 'slides.json');
  const timingPath = path.join(lessonDir, 'voice_timing.json');

  for (const p of [voice, vid, slidesPath, timingPath]) {
    if (!fs.existsSync(p)) throw new Error(`Fehlt: ${p}`);
  }

  const audio = ffprobeDurationSeconds(voice);
  const video = ffprobeDurationSeconds(vid);
  const slides = JSON.parse(fs.readFileSync(slidesPath, 'utf8'));
  const timing = JSON.parse(fs.readFileSync(timingPath, 'utf8'));

  console.log('Audio duration:', audio);
  console.log('Video duration:', video);
  const lastEnd = timing.slides[timing.slides.length - 1].end_seconds;
  console.log('Timing ends at:', lastEnd);

  if (Math.abs(audio - video) > 0.5) throw new Error('Audio/Video Dauer weicht >0.5s ab.');
  if (Math.abs(lastEnd - audio) > 0.5) throw new Error('last end_seconds weicht >0.5s von Audio ab.');
  if (timing.slides.length !== slides.slides.length) {
    throw new Error(
      `voice_timing.json (${timing.slides.length} Einträge) passt nicht zu slides.json (${slides.slides.length}).`,
    );
  }

  console.log('OK — alle Prüfungen bestanden.');
}

try {
  main();
} catch (e) {
  console.error('FEHLER:', e.message);
  process.exit(1);
}
