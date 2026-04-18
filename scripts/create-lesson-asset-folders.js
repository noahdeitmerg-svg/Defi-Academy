#!/usr/bin/env node
/**
 * scripts/create-lesson-asset-folders.js
 *
 * Legt fuer jede Lektion in `lesson-asset-generator/output/` (oder dem
 * via `--generator-output` angegebenen Pfad) einen entsprechenden
 * Ordner unter `assets-input/<moduleXX-lessonYY>/` an, inklusive
 * `visuals/`-Unterordner und einer `README.md`, die erklaert, welche
 * Dateien hier abgelegt werden muessen.
 *
 * Das ist der erste Schritt im manuellen Slides-Flow:
 *
 *   1. npm run prepare:assets
 *      -> assets-input/moduleXX-lessonYY/ werden angelegt
 *   2. In Gamma mit slides_prompt.txt ein Deck bauen
 *   3. 7 Folien als slide01.png ... slide07.png in den Lektions-Ordner
 *      legen
 *   4. npm run generate:voice
 *   5. npm run render:course
 *
 * CLI
 *   node scripts/create-lesson-asset-folders.js
 *   node scripts/create-lesson-asset-folders.js --only module01-lesson01
 *   node scripts/create-lesson-asset-folders.js --copy-prompt
 *   node scripts/create-lesson-asset-folders.js --dry-run
 *
 * Flags
 *   --generator-output <path>  default: ./lesson-asset-generator/output
 *                              (Fallback: ./generator-output,
 *                               ./lesson-asset-generator/lesson-asset-generator/output)
 *   --assets-input <path>      default: ./assets-input
 *   --only <csv>               nur diese Lesson-IDs anlegen
 *   --copy-prompt              slides_prompt.txt und voice_script.txt
 *                              direkt in den Asset-Ordner kopieren
 *                              (praktisch fuer Offline-Content-Arbeit)
 *   --dry-run                  nichts erzeugen, nur anzeigen
 *   --help
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

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

function printUsage() {
  console.log(String.raw`
DeFi Academy — Lesson-Asset-Folder-Helper

Usage:
  node scripts/create-lesson-asset-folders.js [flags]

Flags:
  --generator-output <path>  default: ./lesson-asset-generator/output
                             (Fallback: ./generator-output,
                              ./lesson-asset-generator/lesson-asset-generator/output)
  --assets-input <path>      default: ./assets-input
  --only <csv>               explizite Lesson-IDs
  --copy-prompt              Prompt- und Script-Dateien mitkopieren
  --dry-run                  keine Schreiboperationen
  --help                     Hilfe
`);
}

function firstExisting(candidates) {
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function discoverLessons(generatorOutputDir) {
  if (!fs.existsSync(generatorOutputDir)) return [];
  return fs
    .readdirSync(generatorOutputDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^module\d{2}-lesson\d{2}$/.test(e.name))
    .map((e) => e.name)
    .sort();
}

const LESSON_README = String.raw`# Asset-Ordner fuer <LESSON_ID>

In diesem Ordner erwartet die DeFi-Academy-Pipeline die folgenden
Artefakte, bevor das Video gerendert werden kann:

## Pflicht (sonst Preflight-Skip)

- voice.mp3         — ElevenLabs-Voice-Over (npm run generate:voice)
- slide01.png ... slide07.png
                    — 7 Folien, manuell in Gamma aus slides_prompt.txt
                      generiert und als PNG exportiert
  (Im Notfall tolerant: der Renderer rendert auch ohne Slides
   in einer degradierten Demo-Version.)

## Optional

- slides.pdf        — Wenn pdftoppm installiert ist, schneidet
                      scripts/generate-slides.js die PDF automatisch
                      in slide01.png ... slideNN.png.
- visuals/          — Screenshots/Diagramme gemaess visual_plan.json.
                      Werden von visuals-manifest.json referenziert.

## Automatisch vom Lesson-Asset-Generator befuellt

- slides.json, visuals-manifest.json

## Gebaut vom Slides-Generator (optional)

- slides_prompt.txt (Kopie aus lesson-asset-generator/output/)
- SLIDES_HANDOFF.md (nur im Manual-Handoff-Modus)

Workflow-Details: docs/VIDEO_PRODUCTION_WORKFLOW.md
`;

function ensureLessonFolder({ lessonId, assetsInputDir, generatorOutputDir, copyPrompt, dryRun }) {
  const dir = path.join(assetsInputDir, lessonId);
  const visualsDir = path.join(dir, 'visuals');
  const readmePath = path.join(dir, 'README.md');

  const actions = [];

  if (!fs.existsSync(dir)) {
    actions.push(`mkdir ${path.relative(ROOT, dir)}`);
    if (!dryRun) fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(visualsDir)) {
    actions.push(`mkdir ${path.relative(ROOT, visualsDir)}`);
    if (!dryRun) fs.mkdirSync(visualsDir, { recursive: true });
  }
  if (!fs.existsSync(readmePath)) {
    actions.push(`write ${path.relative(ROOT, readmePath)}`);
    if (!dryRun) {
      fs.writeFileSync(
        readmePath,
        LESSON_README.replace('<LESSON_ID>', lessonId),
        'utf8'
      );
    }
  }

  if (copyPrompt) {
    const srcGenDir = path.join(generatorOutputDir, lessonId);
    for (const file of ['slides_prompt.txt', 'voice_script.txt']) {
      const src = path.join(srcGenDir, file);
      const dst = path.join(dir, file);
      if (fs.existsSync(src) && !fs.existsSync(dst)) {
        actions.push(`copy ${file}`);
        if (!dryRun) fs.copyFileSync(src, dst);
      }
    }
  }

  return { lessonId, dir: path.relative(ROOT, dir), actions };
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printUsage();
    process.exit(0);
  }

  const generatorOutputDir = path.resolve(
    ROOT,
    args['generator-output'] ||
      firstExisting([
        path.join(ROOT, 'lesson-asset-generator/output'),
        path.join(ROOT, 'generator-output'),
        path.join(ROOT, 'lesson-asset-generator/lesson-asset-generator/output'),
      ]) ||
      'lesson-asset-generator/output'
  );

  const assetsInputDir = path.resolve(ROOT, args['assets-input'] || 'assets-input');
  const copyPrompt = Boolean(args['copy-prompt']);
  const dryRun = Boolean(args['dry-run']);

  console.log('DeFi Academy — prepare:assets');
  console.log(`Generator-Out:  ${path.relative(ROOT, generatorOutputDir)}`);
  console.log(`Assets-Input:   ${path.relative(ROOT, assetsInputDir)}`);
  console.log(`Copy-Prompt:    ${copyPrompt}`);
  console.log(`Dry-Run:        ${dryRun}`);

  if (!fs.existsSync(generatorOutputDir)) {
    console.error(
      `\nFehler: Generator-Output nicht gefunden: ${generatorOutputDir}\n` +
        `Lauf zuerst den Lesson-Asset-Generator.`
    );
    process.exit(1);
  }

  let lessons = discoverLessons(generatorOutputDir);
  if (typeof args.only === 'string') {
    const filter = new Set(args.only.split(',').map((s) => s.trim()).filter(Boolean));
    lessons = lessons.filter((l) => filter.has(l));
    // explizit angeforderte IDs die (noch) keinen Generator-Output haben
    for (const id of filter) if (!lessons.includes(id)) lessons.push(id);
    lessons.sort();
  }

  if (lessons.length === 0) {
    console.log('\nKeine Lektionen gefunden.');
    process.exit(0);
  }

  if (!dryRun) fs.mkdirSync(assetsInputDir, { recursive: true });

  let created = 0;
  let existed = 0;
  for (const id of lessons) {
    const result = ensureLessonFolder({
      lessonId: id,
      assetsInputDir,
      generatorOutputDir,
      copyPrompt,
      dryRun,
    });
    if (result.actions.length > 0) {
      created++;
      console.log(`+ ${id}   ${result.actions.join(', ')}`);
    } else {
      existed++;
      console.log(`= ${id}   (bereits vollstaendig)`);
    }
  }

  console.log('');
  console.log('─'.repeat(60));
  console.log(
    `Lektionen: ${lessons.length}   neu: ${created}   unveraendert: ${existed}`
  );
  console.log('─'.repeat(60));

  if (dryRun) {
    console.log('Dry-Run — nichts geschrieben.');
  } else {
    console.log('Naechste Schritte:');
    console.log('  1) In Gamma mit slides_prompt.txt Deck bauen');
    console.log('  2) 7 Folien als slide01.png ... slide07.png in den Ordner legen');
    console.log('  3) npm run generate:voice');
    console.log('  4) npm run render:course');
  }
}

main();
