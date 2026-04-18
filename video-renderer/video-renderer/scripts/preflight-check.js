#!/usr/bin/env node
/**
 * preflight-check.js
 *
 * Prueft ohne Rendering, ob alle Inputs fuer die Batch-Pipeline vorhanden
 * sind. Liefert eine klare Checkliste, was noch fehlt.
 *
 * Prueft:
 *   - Generator-Output (video_config.json + visual_plan.json pro Lesson)
 *   - Lesson-Markdown-Datei (fuer Slide-Plan-Rebuild)
 *   - Voice-MP3 pro Lesson
 *   - Visual-Assets (fuer jedes Visual mit id v01, v02, ... eine Datei)
 *   - Video Style Engine ist am richtigen Platz
 *
 * Exit 0 wenn alles OK, Exit 1 wenn kritische Inputs fehlen, Exit 2 bei
 * Warnungen (Visuals fehlen, werden als Placeholder gerendert).
 */

'use strict';

const fs = require('fs');
const path = require('path');

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

function check(name, ok, detail) {
  const mark = ok === true ? '✔' : ok === 'warn' ? '⚠' : '✘';
  const pad = name.padEnd(50, ' ');
  console.log(`  ${mark}  ${pad} ${detail || ''}`);
  return ok;
}

function run() {
  const args = parseArgs(process.argv);

  const rendererRoot = path.resolve(__dirname, '..');
  const stylePath = path.resolve(
    args.style || path.join(rendererRoot, '..', 'video-style-engine')
  );
  const generatorDir = path.resolve(
    args.generator || path.join(rendererRoot, '..', 'lesson-asset-generator', 'output')
  );
  const lessonsDir = args.lessons ? path.resolve(args.lessons) : null;
  const assetsDir = args.assets ? path.resolve(args.assets) : null;

  console.log('═'.repeat(68));
  console.log('Video Renderer — Preflight Check');
  console.log('═'.repeat(68));
  console.log('Style engine: ', stylePath);
  console.log('Generator:    ', generatorDir);
  console.log('Lessons MD:   ', lessonsDir || '(not provided)');
  console.log('Assets:       ', assetsDir || '(not provided)');
  console.log('');

  let errors = 0;
  let warnings = 0;

  // Section 1: Style Engine files
  console.log('[1] Video Style Engine');
  const requiredStyle = [
    'theme.json',
    'visual-timing.json',
    'animation-rules.json',
    'slide-template.jsx',
    'intro-scene.jsx',
    'outro-scene.jsx',
  ];
  for (const f of requiredStyle) {
    const ok = fs.existsSync(path.join(stylePath, f));
    if (!ok) errors++;
    check(f, ok, ok ? '' : 'missing');
  }
  console.log('');

  // Section 2: Renderer internals
  console.log('[2] Renderer files');
  const requiredRenderer = [
    'remotion/index.jsx',
    'remotion/components/Lesson.jsx',
    'remotion/components/VisualRenderer.jsx',
    'remotion/style-engine/theme.json', // mirrored by setup script
    'remotion/style-engine/slide-template.jsx',
    'remotion/style-engine/intro-scene.jsx',
    'remotion/style-engine/outro-scene.jsx',
    'src/asset-resolver.js',
    'src/render-lesson.js',
    'src/render-batch.js',
    'src/external/lesson-parser.js',
    'src/external/section-mapper.js',
  ];
  for (const f of requiredRenderer) {
    const ok = fs.existsSync(path.join(rendererRoot, f));
    if (!ok) {
      errors++;
      check(f, false, 'missing — run scripts/setup.js');
    } else {
      check(f, true);
    }
  }
  console.log('');

  // Section 3: Lesson discovery
  console.log('[3] Lesson discovery');
  if (!fs.existsSync(generatorDir)) {
    errors++;
    check('generator output dir', false, 'does not exist');
    console.log('');
    finalize(errors, warnings);
    return;
  }
  const lessons = fs
    .readdirSync(generatorDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^module\d{2}-lesson\d{2}$/.test(e.name))
    .map((e) => e.name)
    .sort();
  check(
    `found ${lessons.length} lesson folder(s)`,
    lessons.length > 0,
    lessons.length > 0 ? lessons.slice(0, 3).join(', ') + (lessons.length > 3 ? ' …' : '') : ''
  );
  if (lessons.length === 0) errors++;
  console.log('');

  // Section 4: Per-lesson checks
  console.log('[4] Per-lesson assets');
  for (const lessonId of lessons) {
    console.log('');
    console.log(`  ── ${lessonId}`);

    const lessonDir = path.join(generatorDir, lessonId);
    const cfg = path.join(lessonDir, 'video_config.json');
    const vp = path.join(lessonDir, 'visual_plan.json');
    const cfgOk = fs.existsSync(cfg);
    const vpOk = fs.existsSync(vp);
    if (!cfgOk) errors++;
    if (!vpOk) errors++;
    check('video_config.json', cfgOk);
    check('visual_plan.json', vpOk);

    if (lessonsDir) {
      const mdCandidates = [
        path.join(lessonsDir, `${lessonId}.md`),
        path.join(lessonsDir, lessonId, 'lesson.md'),
      ];
      const md = mdCandidates.find((p) => fs.existsSync(p));
      if (md) {
        check(`lesson.md`, true, path.relative(rendererRoot, md));
      } else {
        warnings++;
        check(`lesson.md`, 'warn', 'not found — slide bullets will be reconstructed');
      }
    }

    if (assetsDir) {
      const voice = path.join(assetsDir, lessonId, 'voice.mp3');
      const voiceOk = fs.existsSync(voice);
      if (!voiceOk) warnings++;
      check(`voice.mp3`, voiceOk ? true : 'warn', voiceOk ? '' : 'missing — render will have no audio');

      // Check visuals
      if (vpOk) {
        try {
          const visualPlan = JSON.parse(fs.readFileSync(vp, 'utf8'));
          const visualsDir = path.join(assetsDir, lessonId, 'visuals');
          const required = visualPlan.visuals || [];
          let found = 0;
          for (const v of required) {
            const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
            const any = exts.some((e) =>
              fs.existsSync(path.join(visualsDir, `${v.id}.${e}`))
            );
            if (any) found++;
          }
          const ratio = required.length === 0 ? 1 : found / required.length;
          if (ratio === 1) {
            check(`visuals`, true, `${found}/${required.length}`);
          } else if (ratio >= 0.5) {
            warnings++;
            check(`visuals`, 'warn', `${found}/${required.length} — missing will be placeholders`);
          } else {
            warnings++;
            check(`visuals`, 'warn', `${found}/${required.length} — most missing, placeholders will dominate`);
          }
        } catch (e) {
          warnings++;
          check(`visuals`, 'warn', 'cannot parse visual_plan.json');
        }
      }
    } else {
      warnings++;
      check(`assets dir`, 'warn', 'not provided — will render with placeholders only');
    }
  }
  console.log('');
  finalize(errors, warnings);
}

function finalize(errors, warnings) {
  console.log('─'.repeat(68));
  if (errors === 0 && warnings === 0) {
    console.log('✅ All clear. Ready to render.');
    process.exit(0);
  } else if (errors === 0) {
    console.log(`⚠  ${warnings} warning(s). Rendering will proceed but some assets are missing.`);
    process.exit(2);
  } else {
    console.log(`❌ ${errors} error(s), ${warnings} warning(s). Fix errors before rendering.`);
    process.exit(1);
  }
}

run();
