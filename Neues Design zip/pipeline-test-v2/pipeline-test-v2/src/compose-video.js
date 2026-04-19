/**
 * compose-video.js
 *
 * Baut aus SVGs + Audio + Timing eine MP4-Videodatei.
 *
 * Pipeline:
 *   1. SVGs → PNGs rastern (rsvg-convert, respektiert Inter-Fonts)
 *   2. ffmpeg concat demuxer: Slide-PNGs für entsprechende Dauer in einem Video
 *   3. Audio-Spur dazumixen
 *   4. H.264/AAC/MP4 encoden
 *
 * Input:
 *   - svgDir:       Ordner mit slide-NN.svg
 *   - voiceMp3:     Pfad zur Audiodatei
 *   - voiceTiming:  geladenes voice_timing.json
 *   - outputPath:   MP4-Zielpfad
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function rasterize(svgPath, pngPath, width = 1920, height = 1080) {
  // rsvg-convert: schnell, präzise, font-aware
  execSync(
    `rsvg-convert -w ${width} -h ${height} -b "#0B1F3B" -f png -o "${pngPath}" "${svgPath}"`,
    { stdio: 'pipe' }
  );
}

/**
 * Build the ffmpeg concat file that lists each slide PNG + its duration.
 * Format spec: https://ffmpeg.org/ffmpeg-formats.html#concat
 */
function buildConcatFile(slides, pngDir, concatPath) {
  const lines = ["ffconcat version 1.0"];
  for (const s of slides) {
    const pngName = `slide-${String(s.slide_number).padStart(2, '0')}.png`;
    const absPath = path.resolve(pngDir, pngName);
    lines.push(`file '${absPath}'`);
    lines.push(`duration ${s.duration_seconds.toFixed(3)}`);
  }
  // ffmpeg requires the last file to be re-declared (duration quirk)
  const last = slides[slides.length - 1];
  const lastPng = `slide-${String(last.slide_number).padStart(2, '0')}.png`;
  lines.push(`file '${path.resolve(pngDir, lastPng)}'`);

  fs.writeFileSync(concatPath, lines.join('\n'), 'utf8');
}

function composeVideo({ svgDir, voiceMp3, voiceTiming, outputPath, verbose = false }) {
  const pngDir = path.join(svgDir, '.pngs');
  fs.mkdirSync(pngDir, { recursive: true });

  // Step 1: Rasterize all SVGs
  const svgs = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg')).sort();
  if (svgs.length === 0) throw new Error(`No SVG files in ${svgDir}`);

  const rasterStarted = Date.now();
  for (const svg of svgs) {
    const svgPath = path.join(svgDir, svg);
    const pngPath = path.join(pngDir, svg.replace('.svg', '.png'));
    rasterize(svgPath, pngPath);
  }
  const rasterMs = Date.now() - rasterStarted;

  // Step 2: Build concat file
  const concatPath = path.join(svgDir, 'concat.ffconcat');
  buildConcatFile(voiceTiming.slides, pngDir, concatPath);

  // Step 3: ffmpeg render
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const ffmpegCmd = [
    'ffmpeg -y',
    verbose ? '-loglevel info' : '-loglevel warning -stats',
    `-f concat -safe 0 -i "${concatPath}"`,
    `-i "${voiceMp3}"`,
    '-c:v libx264',
    '-pix_fmt yuv420p',
    '-preset ultrafast',
    '-crf 23',
    '-r 30',
    '-c:a aac',
    '-b:a 128k',
    // Video ends when audio ends (should match by design, but -shortest ensures sync)
    '-shortest',
    '-movflags +faststart',
    `"${outputPath}"`,
  ].join(' ');

  const encStarted = Date.now();
  execSync(ffmpegCmd, { stdio: verbose ? 'inherit' : 'pipe' });
  const encMs = Date.now() - encStarted;

  return {
    output: outputPath,
    raster_ms: rasterMs,
    encode_ms: encMs,
    slides_rasterized: svgs.length,
    size_bytes: fs.statSync(outputPath).size,
  };
}

module.exports = { composeVideo, rasterize };
