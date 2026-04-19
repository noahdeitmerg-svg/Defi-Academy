#!/usr/bin/env node
/**
 * pipeline-test: Modul-Markdown → slides.json → ElevenLabs → ffprobe →
 * voice_timing.json → SVG/PNG → ffmpeg → final_test_video.mp4
 *
 * Usage (im Ordner pipeline-test):
 *   export ELEVENLABS_API_KEY=...
 *   export ELEVENLABS_VOICE_ID=...
 *   node src/run-full-pipeline.js \
 *     --input ../Module/modul-01-defi-grundlagen-FINAL.md \
 *     --lesson module01-lesson01 \
 *     --output ./test-output
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..');
require(path.join(repoRoot, 'scripts', 'lib', 'env.js')).loadProjectEnv({ cwd: repoRoot });

const { parseModule } = require(path.join(repoRoot, 'lesson-asset-generator', 'src', 'module-parser.js'));
const { ffprobeDurationSeconds } = require('./lib/ffprobe');
const { synthesizeToMp3 } = require('./lib/tts');
const { buildVoiceTiming } = require('./lib/timing');
const { renderSlidePngs } = require('./lib/svg-render');
const { buildFinalMp4 } = require('./lib/ffmpeg-build');
const { ffmpegBin } = require('./lib/ffmpeg-path');

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

function resolveMarkdownInput(raw) {
  if (raw) {
    const abs = path.isAbsolute(raw) ? raw : path.join(process.cwd(), raw);
    if (fs.existsSync(abs)) return abs;
    throw new Error(`--input nicht gefunden: ${abs}`);
  }
  const candidates = [
    path.join(repoRoot, 'content', 'modul-01-defi-grundlagen-FINAL.md'),
    path.join(repoRoot, 'Module', 'modul-01-defi-grundlagen-FINAL.md'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error(
    'Kein --input und kein Standard-Markdown (content/… oder Module/modul-01-defi-grundlagen-FINAL.md).'
  );
}

function findLesson(parsed, lessonId) {
  if (!lessonId) return parsed.lessons[0];
  const hit = parsed.lessons.find((l) => l.meta.lesson_id === lessonId);
  if (!hit) {
    const ids = parsed.lessons.map((l) => l.meta.lesson_id).join(', ');
    throw new Error(`Lektion "${lessonId}" nicht gefunden. Verfügbar: ${ids}`);
  }
  return hit;
}

function log(msg) {
  process.stdout.write(msg + '\n');
}

function assertClose(a, b, label, tol = 0.5) {
  if (Math.abs(a - b) > tol) {
    throw new Error(`${label}: ${a} vs ${b} (Toleranz ${tol}s) — Pipeline-Abbruch.`);
  }
}

function extractFrameCheck({ finalMp4, outDir }) {
  const frameDir = path.join(outDir, 'frame-check');
  fs.mkdirSync(frameDir, { recursive: true });
  const times = [5, 30, 60];
  for (const t of times) {
    const outJpg = path.join(frameDir, `at-${t}s.jpg`);
    const r = spawnSync(
      ffmpegBin(),
      ['-y', '-loglevel', 'error', '-ss', String(t), '-i', finalMp4, '-vframes', '1', outJpg],
      { encoding: 'utf8' }
    );
    if (r.status !== 0) {
      throw new Error(`Frame-Extraktion bei ${t}s: ${r.stderr}`);
    }
  }
  log(`Frame-Check: ${path.relative(process.cwd(), frameDir)}/at-5s.jpg, at-30s.jpg, at-60s.jpg`);
}

async function main() {
  const args = parseArgs(process.argv);
  const inputMd = resolveMarkdownInput(args.input);
  const lessonId = args.lesson ? String(args.lesson) : null;
  const outRoot = path.resolve(process.cwd(), args.output || './test-output');

  const md = fs.readFileSync(inputMd, 'utf8');
  const parsed = parseModule(md);
  const lesson = findLesson(parsed, lessonId);
  const id = lesson.meta.lesson_id;
  const outDir = path.join(outRoot, id);
  fs.mkdirSync(outDir, { recursive: true });

  log('═'.repeat(60));
  log(`pipeline-test · ${id}`);
  log(`Markdown: ${inputMd}`);
  log(`Output:   ${outDir}`);
  log('═'.repeat(60));

  const slides = lesson.slides.map((s) => ({
    number: s.number,
    title: s.title,
    body: s.body || '',
    narration: s.narration || '',
  }));

  if (slides.length !== 6) {
    throw new Error(`Erwartet 6 Slides aus Folien-Zusammenfassung, erhalten: ${slides.length}`);
  }

  const slidesPayload = {
    lesson_id: id,
    module: lesson.meta.module,
    lesson: lesson.meta.lesson,
    title: lesson.meta.title,
    slides: slides.map(({ number, title, body }) => ({ number, title, body })),
  };
  fs.writeFileSync(path.join(outDir, 'slides.json'), JSON.stringify(slidesPayload, null, 2), 'utf8');
  log(`slides.json (${slides.length} Slides)`);

  const voiceParts = slides.map((s) => s.narration.trim()).filter(Boolean);
  const voiceText = voiceParts.join('\n\n');
  fs.writeFileSync(path.join(outDir, 'voice_text.txt'), voiceText, 'utf8');
  log('voice_text.txt');

  const voiceMp3 = path.join(outDir, 'voice.mp3');
  await synthesizeToMp3({
    fullText: voiceParts.map((t, i) => `**[Slide ${i + 1}]**\n${t}`).join('\n\n'),
    outPath: voiceMp3,
    log,
  });
  log(`voice.mp3 geschrieben`);

  const audioSec = ffprobeDurationSeconds(voiceMp3);
  log(`ffprobe voice.mp3 → ${audioSec.toFixed(4)} s`);

  const timing = buildVoiceTiming(slides, audioSec);
  fs.writeFileSync(path.join(outDir, 'voice_timing.json'), JSON.stringify(timing, null, 2), 'utf8');
  log('voice_timing.json');

  const lastEnd = timing.slides[timing.slides.length - 1].end_seconds;
  assertClose(lastEnd, audioSec, 'Letzte Slide end_seconds vs ffprobe(audio)', 0.05);

  const pngPaths = renderSlidePngs({
    outDir,
    slides,
    repoRoot,
    moduleNumber: lesson.meta.module,
    lessonNumber: lesson.meta.lesson,
    lessonTitle: lesson.meta.title,
    log,
  });

  const finalMp4 = buildFinalMp4({
    outDir,
    timing,
    pngPaths,
    voiceMp3,
    log,
  });
  log(`final_test_video.mp4 → ${finalMp4}`);

  const videoSec = ffprobeDurationSeconds(finalMp4);
  log(`ffprobe final_test_video.mp4 → ${videoSec.toFixed(4)} s`);

  assertClose(audioSec, videoSec, 'Audio-Dauer vs Video-Dauer (ffprobe)', 0.5);

  extractFrameCheck({ finalMp4, outDir });

  log('');
  log('Verifikation 4a (manuell prüfbar):');
  log(`  Audio:  ${audioSec}`);
  log(`  Video:  ${videoSec}`);
  log(`  Timing letzte end_seconds: ${lastEnd}`);
  log('✔ pipeline-test abgeschlossen.');
}

main().catch((err) => {
  console.error('\n✖', err.message);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
