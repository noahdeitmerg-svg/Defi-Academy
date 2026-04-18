#!/usr/bin/env node
/**
 * scripts/generate-all-assets.js
 *
 * Schritt 1 der Academy-Build-Pipeline.
 *
 * Scannt `lessons/` nach allen `moduleXX-lessonYY.md`-Dateien und ruft
 * den Lesson-Asset-Generator fuer jede Lektion auf. Die vier Artefakte
 * pro Lektion werden zentral unter `generated-assets/<id>/` abgelegt.
 *
 * Ausgabe pro Lektion:
 *   generated-assets/moduleXX-lessonYY/
 *     ├── slides_prompt.txt
 *     ├── voice_script.txt
 *     ├── visual_plan.json
 *     ├── video_config.json
 *     ├── slides.json
 *     └── visuals-manifest.json
 *
 * Hinweis zur Regel:
 *   Der `slides_prompt.txt`-Kopf enthaelt seit dem Visuals-Only-
 *   Umbau explizit: "Generate diagrams or illustrations only. Do
 *   not design slides or layouts." Gamma liefert NUR Einzel-Visuals
 *   (visual01.png, visual02.png, ...). Siehe
 *   docs/SLIDE_GENERATION_RULES.md.
 *
 * CLI
 *   node scripts/generate-all-assets.js
 *   node scripts/generate-all-assets.js --lessons-dir lessons
 *   node scripts/generate-all-assets.js --only module01-lesson01,module04-lesson02
 *   node scripts/generate-all-assets.js --dry-run
 *
 * Flags
 *   --lessons-dir <path>   default: ./lessons
 *   --out <path>           default: ./generated-assets
 *   --style <path>         default: ./video-style-engine
 *                          (mit Fallback auf ./video-style-engine)
 *   --generator <path>     default: lesson-asset-generator/.../src/cli.js
 *   --only <csv>           nur diese Lesson-IDs
 *   --dry-run              nichts schreiben
 *   --help
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith('--')) {
      out[key] = next;
      i++;
    } else {
      out[key] = true;
    }
  }
  return out;
}

function printHelp() {
  console.log(`
DeFi Akademie — generate-all-assets

Scannt alle Lektionen in lessons/ und erzeugt die Generator-Artefakte
pro Lektion in generated-assets/<id>/.

Flags:
  --lessons-dir <path>   default: ./lessons
  --out <path>           default: ./generated-assets
  --style <path>         default: auto (video-style-engine/...)
  --generator <path>     default: auto (lesson-asset-generator/.../cli.js)
  --only <csv>           explizite Lesson-IDs
  --dry-run              nur planen, nichts schreiben
  --help

Beispiel:
  npm run generate-assets
  npm run generate-assets -- --only module04-lesson02
`);
}

function firstExisting(paths) {
  for (const p of paths) if (p && fs.existsSync(p)) return p;
  return null;
}

function resolveGenerator(flag) {
  return firstExisting([
    flag,
    path.join(ROOT, 'lesson-asset-generator/lesson-asset-generator/src/cli.js'), // legacy
    path.join(ROOT, 'lesson-asset-generator/src/cli.js'),
  ]);
}

function resolveStyleEngine(flag) {
  return firstExisting([
    flag,
    path.join(ROOT, 'video-style-engine/video-style-engine'),
    path.join(ROOT, 'video-style-engine'),
  ]);
}

function discoverLessons(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const re = /^(module\d{2}-lesson\d{2})\.md$/i;
  for (const name of fs.readdirSync(dir)) {
    const m = name.match(re);
    if (m) out.push({ id: m[1].toLowerCase(), file: path.join(dir, name) });
  }
  return out.sort((a, b) => a.id.localeCompare(b.id));
}

function runGeneratorForLesson({ cliPath, inputFile, outRoot, styleDir, dryRun }) {
  fs.mkdirSync(outRoot, { recursive: true });
  const args = [
    cliPath,
    '--input', inputFile,
    '--out', outRoot,
    '--style', styleDir,
  ];
  if (dryRun) {
    console.log(`  [dry-run] node ${args.map((a) => JSON.stringify(a)).join(' ')}`);
    return { ok: true, dry: true };
  }
  const res = spawnSync(process.execPath, args, {
    encoding: 'utf8',
    cwd: ROOT,
  });
  if (res.status !== 0) {
    return {
      ok: false,
      stderr: (res.stderr || '').trim() || (res.stdout || '').trim(),
    };
  }
  return { ok: true };
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const lessonsDir = path.resolve(ROOT, args['lessons-dir'] || 'lessons');
  const outDir = path.resolve(ROOT, args.out || 'generated-assets');
  const onlyIds = args.only
    ? String(args.only).split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
    : null;
  const dryRun = Boolean(args['dry-run']);

  const cliPath = resolveGenerator(args.generator);
  const styleDir = resolveStyleEngine(args.style);

  console.log('────────────────────────────────────────────────────────────');
  console.log(' DeFi Akademie · Generating lesson assets');
  console.log('────────────────────────────────────────────────────────────');
  console.log(`Lessons-Dir : ${path.relative(ROOT, lessonsDir) || '.'}`);
  console.log(`Out-Dir     : ${path.relative(ROOT, outDir) || '.'}`);
  console.log(`Generator   : ${cliPath ? path.relative(ROOT, cliPath) : '(nicht gefunden)'}`);
  console.log(`Style-Engine: ${styleDir ? path.relative(ROOT, styleDir) : '(nicht gefunden)'}`);
  console.log(`Dry-Run     : ${dryRun}`);
  if (onlyIds) console.log(`Only        : ${onlyIds.join(', ')}`);
  console.log('');

  if (!cliPath) {
    console.error('✖ Lesson-Asset-Generator-CLI nicht gefunden. Flag: --generator <path>');
    process.exit(1);
  }
  if (!styleDir) {
    console.error('✖ video-style-engine nicht gefunden. Flag: --style <path>');
    process.exit(1);
  }

  if (!fs.existsSync(lessonsDir)) {
    console.log(`ℹ lessons/-Ordner existiert noch nicht — lege leeren Ordner an.`);
    if (!dryRun) fs.mkdirSync(lessonsDir, { recursive: true });
  }

  const lessons = discoverLessons(lessonsDir);
  if (lessons.length === 0) {
    console.log('');
    console.log('Keine Lektionen in lessons/ gefunden.');
    console.log('Erwartet: lessons/moduleXX-lessonYY.md');
    console.log('');
    console.log('Naechster Schritt: Lektions-Markdowns in lessons/ ablegen,');
    console.log('dann "npm run generate-assets" erneut ausfuehren.');
    return;
  }

  const selected = onlyIds ? lessons.filter((l) => onlyIds.includes(l.id)) : lessons;
  if (selected.length === 0) {
    console.error('✖ --only-Filter passt auf keine Lektion. Verfuegbar:');
    lessons.forEach((l) => console.error(`  - ${l.id}`));
    process.exit(1);
  }

  if (!dryRun) fs.mkdirSync(outDir, { recursive: true });

  const success = [];
  const failed = [];
  for (let i = 0; i < selected.length; i++) {
    const lesson = selected[i];
    const pct = `${i + 1}/${selected.length}`;
    console.log(`[${pct}] ${lesson.id}  ← ${path.relative(ROOT, lesson.file)}`);
    const lessonOutDir = path.join(outDir, lesson.id);
    const result = runGeneratorForLesson({
      cliPath,
      inputFile: lesson.file,
      outRoot: outDir,
      styleDir,
      dryRun,
    });
    if (result.ok) {
      success.push(lesson.id);
      if (!result.dry) console.log(`      ✔ Artefakte in ${path.relative(ROOT, lessonOutDir)}`);
    } else {
      failed.push({ id: lesson.id, err: result.stderr });
      console.error(`      ✖ Fehler: ${result.stderr || '(unbekannt)'}`);
    }
  }

  console.log('');
  console.log('────────────────────────────────────────────────────────────');
  console.log(`Fertig: ${success.length} ok, ${failed.length} Fehler`);
  console.log('────────────────────────────────────────────────────────────');
  if (failed.length > 0) {
    failed.forEach((f) => console.error(`  ✖ ${f.id}: ${f.err}`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('✖ generate-all-assets failed:', err.message);
  process.exit(1);
});
