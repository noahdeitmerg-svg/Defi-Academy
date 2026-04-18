#!/usr/bin/env node
/**
 * render-lesson.js
 *
 * Rendert eine einzelne Lektion in ein MP4.
 *
 * Usage:
 *   node src/render-lesson.js \
 *     --lesson-id    module04-lesson02 \
 *     --generator    ../lesson-asset-generator/output \
 *     --assets       ./assets-input \
 *     --markdown     ../lesson-asset-generator/examples/module04-lesson02.md \
 *     --output-video ./output/videos/module04-lesson02.mp4 \
 *     --output-poster ./output/posters/module04-lesson02.jpg
 */

'use strict';

const path = require('path');
const fs = require('fs');

const { bundle } = require('@remotion/bundler');
const { selectComposition, renderMedia, renderStill } = require('@remotion/renderer');

const { resolveLessonAssets } = require('./asset-resolver');

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

async function renderLesson({
  lessonId,
  generatorOutputDir,
  assetsInputDir,
  lessonMarkdownPath,
  outputVideo,
  outputPoster,
  nextLesson,
  concurrency = 4,
  jpegQuality = 90,
  videoCrf = 18,
  logLevel = 'info',
  bundleCachePath = null,
  onProgress = null,
}) {
  const rendererRoot = path.resolve(__dirname, '..');
  const publicDir = path.join(rendererRoot, 'public');
  fs.mkdirSync(publicDir, { recursive: true });

  // 1) Resolve assets
  const { renderInput, targetAssetsDir } = resolveLessonAssets({
    generatorOutputDir,
    lessonId,
    assetsInputDir,
    lessonMarkdownPath,
    publicDir,
    nextLesson,
  });

  // 2) Bundle Remotion project (cache if possible)
  const entryPoint = path.join(rendererRoot, 'remotion', 'index.jsx');
  const bundleLocation =
    bundleCachePath && fs.existsSync(bundleCachePath)
      ? bundleCachePath
      : await bundle({
          entryPoint,
          publicDir,
          webpackOverride: (config) => config,
        });

  // 3) Select composition with our lesson's videoConfig injected
  const inputProps = {
    videoConfig: renderInput.videoConfig,
    slidePlan: renderInput.slidePlan,
    visualPlan: renderInput.visualPlan,
    audioPath: renderInput.audioPath,
    nextLesson: renderInput.nextLesson,
  };

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'Lesson',
    inputProps,
  });

  // Sanity check: durationInFrames must match videoConfig
  const expectedFrames = Math.round(
    renderInput.videoConfig.duration_seconds * renderInput.videoConfig.fps
  );
  if (Math.abs(composition.durationInFrames - expectedFrames) > 2) {
    console.warn(
      `[warn] composition duration ${composition.durationInFrames} != expected ${expectedFrames}`
    );
  }

  // 4) Render video
  if (outputVideo) {
    fs.mkdirSync(path.dirname(outputVideo), { recursive: true });
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputVideo,
      inputProps,
      concurrency,
      logLevel,
      jpegQuality,
      crf: videoCrf,
      pixelFormat: 'yuv420p',
      onProgress: onProgress || ((p) => {
        if (p.progress !== undefined) {
          const pct = (p.progress * 100).toFixed(1);
          process.stdout.write(`\r[${lessonId}] ${pct}%   `);
        }
      }),
    });
    if (!onProgress) process.stdout.write('\n');
  }

  // 5) Render poster (still frame from lesson_title section)
  if (outputPoster) {
    fs.mkdirSync(path.dirname(outputPoster), { recursive: true });
    const lessonTitleSection = renderInput.videoConfig.sections.find(
      (s) => s.name === 'lesson_title'
    );
    const posterTimeSeconds = lessonTitleSection
      ? lessonTitleSection.start_seconds + 3
      : renderInput.videoConfig.sections[1]?.start_seconds || 15;

    const posterFrame = Math.round(posterTimeSeconds * renderInput.videoConfig.fps);

    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: outputPoster,
      inputProps,
      frame: Math.min(posterFrame, composition.durationInFrames - 1),
      imageFormat: 'jpeg',
      jpegQuality,
      logLevel,
    });
  }

  return {
    lessonId,
    outputVideo,
    outputPoster,
    durationSeconds: renderInput.videoConfig.duration_seconds,
    audioProvided: renderInput._meta.audio_provided,
    visualsResolved: renderInput._meta.visuals_resolved,
    visualsTotal: renderInput._meta.visuals_total,
    bundleLocation,
  };
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help || !args['lesson-id']) {
    console.log(`
Render a single DeFi Academy lesson video.

Usage:
  node src/render-lesson.js \\
    --lesson-id      moduleXX-lessonYY \\
    --generator      <path to lesson-asset-generator/output> \\
    --assets         <path to assets-input dir>  (optional) \\
    --markdown       <path to lesson .md>        (optional but recommended) \\
    --output-video   ./output/videos/moduleXX-lessonYY.mp4 \\
    --output-poster  ./output/posters/moduleXX-lessonYY.jpg

Optional:
  --concurrency <n>      default 4
  --log-level <level>    info|warn|error|verbose  (default: info)
  --bundle-cache <path>  Reuse an existing Remotion bundle dir (skip rebuild)
`);
    process.exit(args.help ? 0 : 1);
  }

  const lessonId = args['lesson-id'];

  const result = await renderLesson({
    lessonId,
    generatorOutputDir: path.resolve(args.generator || '../lesson-asset-generator/output'),
    assetsInputDir: args.assets ? path.resolve(args.assets) : null,
    lessonMarkdownPath: args.markdown ? path.resolve(args.markdown) : null,
    outputVideo:
      args['output-video'] || path.resolve(`./output/videos/${lessonId}.mp4`),
    outputPoster:
      args['output-poster'] || path.resolve(`./output/posters/${lessonId}.jpg`),
    concurrency: parseInt(args.concurrency || '4', 10),
    logLevel: args['log-level'] || 'info',
    bundleCachePath: args['bundle-cache']
      ? path.resolve(args['bundle-cache'])
      : process.env.REMOTION_BUNDLE_CACHE
        ? path.resolve(process.env.REMOTION_BUNDLE_CACHE)
        : null,
  });

  console.log('');
  console.log('─'.repeat(60));
  console.log(`✔ ${result.lessonId}`);
  console.log(`  video:   ${result.outputVideo}`);
  console.log(`  poster:  ${result.outputPoster}`);
  console.log(`  duration: ${result.durationSeconds}s`);
  console.log(`  audio:   ${result.audioProvided ? 'provided' : 'MISSING'}`);
  console.log(`  visuals: ${result.visualsResolved}/${result.visualsTotal} resolved`);
  console.log('─'.repeat(60));
}

if (require.main === module) {
  main().catch((err) => {
    console.error('\n❌ Render failed:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  });
}

module.exports = { renderLesson };
