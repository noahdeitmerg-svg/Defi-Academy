'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { ffmpegBin } = require('./ffmpeg-path');

/**
 * Baut video-only aus PNGs mit exakten Segment-Dauern, muxed mit voice.mp3.
 * Nutzt -shortest damit Audio und Video nicht auseinanderlaufen.
 */
function buildFinalMp4({ outDir, timing, pngPaths, voiceMp3, log }) {
  const slides = timing.slides;
  if (pngPaths.length !== slides.length) {
    throw new Error('ffmpeg-build: Anzahl PNGs != Timing-Slides.');
  }

  const segDir = path.join(outDir, '_segments');
  fs.mkdirSync(segDir, { recursive: true });
  const segFiles = [];

  for (let i = 0; i < slides.length; i++) {
    const dur = slides[i].duration_seconds;
    const png = pngPaths[i];
    const seg = path.join(segDir, `seg_${String(i + 1).padStart(2, '0')}.mp4`);
    const r = spawnSync(
      ffmpegBin(),
      [
        '-y',
        '-loop',
        '1',
        '-i',
        png,
        '-c:v',
        'libx264',
        '-t',
        String(dur),
        '-pix_fmt',
        'yuv420p',
        '-r',
        '30',
        '-movflags',
        '+faststart',
        seg,
      ],
      { encoding: 'utf8' }
    );
    if (r.status !== 0) {
      throw new Error(`ffmpeg Segment ${i + 1}: ${r.stderr || r.stdout}`);
    }
    segFiles.push(seg);
    log(`Segment ${i + 1} ${dur.toFixed(2)}s`);
  }

  const concatList = path.join(segDir, 'concat.txt');
  const lines = segFiles.map((f) => `file '${f.replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(concatList, lines, 'utf8');

  const videoOnly = path.join(outDir, '_video_only.mp4');
  const c1 = spawnSync(
    ffmpegBin(),
    ['-y', '-f', 'concat', '-safe', '0', '-i', concatList, '-c', 'copy', videoOnly],
    { encoding: 'utf8' }
  );
  if (c1.status !== 0) {
    throw new Error(`ffmpeg concat video: ${c1.stderr || c1.stdout}`);
  }

  const finalMp4 = path.join(outDir, 'final_test_video.mp4');
  const c2 = spawnSync(
    ffmpegBin(),
    [
      '-y',
      '-i',
      videoOnly,
      '-i',
      voiceMp3,
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      '-shortest',
      finalMp4,
    ],
    { encoding: 'utf8' }
  );
  if (c2.status !== 0) {
    throw new Error(`ffmpeg final mux: ${c2.stderr || c2.stdout}`);
  }

  try {
    fs.unlinkSync(videoOnly);
  } catch (_) {}

  return finalMp4;
}

module.exports = { buildFinalMp4 };
