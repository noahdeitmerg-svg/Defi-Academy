#!/usr/bin/env node
/**
 * scripts/check-assets.js
 *
 * Schritt 3 der Academy-Build-Pipeline.
 *
 * Prueft fuer jede Lektion, ob die manuell zu besorgenden Assets
 * korrekt in `assets-input/<id>/` liegen. Diese Pruefung laeuft
 * VOR dem Video-Rendering und verhindert, dass der Renderer
 * wegen fehlender Dateien crasht.
 *
 * Erwartete Assets pro Lektion (`assets-input/<lesson-id>/`):
 *   ✔ voice.mp3
 *   ✔ visual01.png, visual02.png, … (mind. 1)
 *
 * Hinweis:
 *   Die Architektur-Regel (docs/SLIDE_GENERATION_RULES.md) sagt:
 *   Gamma liefert EINZEL-VISUALS, keine kompletten Slides.
 *   Dateien heissen daher `visualNN.png`, NICHT `slideNN.png`.
 *   Findet dieses Script `slideNN.png`, gibt es eine Warnung aus
 *   und behandelt sie als Legacy-Kompatibilitaet (wird akzeptiert,
 *   aber markiert — der Asset-Resolver mappt beide Konventionen).
 *
 * Exit-Codes
 *   0  alle Pruefungen bestanden ODER nur Warnungen (--strict nicht gesetzt)
 *   1  Fehler oder --strict gesetzt und Warnungen vorhanden
 *
 * CLI
 *   node scripts/check-assets.js
 *   node scripts/check-assets.js --only module04-lesson02
 *   node scripts/check-assets.js --strict
 *
 * Flags
 *   --assets-input <path>    default: ./assets-input
 *   --source <path>          default: ./generated-assets   (Soll-Liste)
 *   --only <csv>             explizite Lesson-IDs
 *   --strict                 Warnungen als Fehler werten
 *   --help
 */

'use strict';

const fs = require('fs');
const path = require('path');

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
DeFi Akademie — check-assets

Prueft assets-input/<id>/ auf voice.mp3 und visualNN.png.

Flags:
  --assets-input <path>  default: ./assets-input
  --source <path>        default: ./generated-assets
  --only <csv>           explizite Lesson-IDs
  --strict               Warnungen -> Fehler
  --help
`);
}

function discoverExpectedLessons(sourceDir, assetsDir) {
  const set = new Set();
  const add = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
      if (name.isDirectory() && /^module\d{2}-lesson\d{2}$/i.test(name.name)) {
        set.add(name.name.toLowerCase());
      }
    }
  };
  add(sourceDir);
  add(assetsDir);
  return [...set].sort();
}

function loadVisualPlan(sourceDir, id) {
  const p = path.join(sourceDir, id, 'visual_plan.json');
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function findFiles(dir, re) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => re.test(n))
    .sort();
}

function checkLesson({ id, assetsInputDir, sourceDir }) {
  const lessonDir = path.join(assetsInputDir, id);
  const issues = { errors: [], warnings: [], info: [] };

  if (!fs.existsSync(lessonDir)) {
    issues.errors.push(`assets-input/${id}/ fehlt komplett`);
    return { id, issues };
  }

  const voicePath = path.join(lessonDir, 'voice.mp3');
  if (!fs.existsSync(voicePath)) {
    issues.errors.push('voice.mp3 fehlt');
  } else {
    const size = fs.statSync(voicePath).size;
    if (size < 1024) issues.warnings.push(`voice.mp3 ist sehr klein (${size} B)`);
    else issues.info.push(`voice.mp3 ok (${(size / 1024).toFixed(1)} KB)`);
  }

  const visuals = findFiles(lessonDir, /^visual\d{2,3}\.(png|jpg|jpeg|webp|svg)$/i);
  const legacySlides = findFiles(lessonDir, /^slide\d{2,3}\.(png|jpg|jpeg|webp|svg)$/i);

  const plan = loadVisualPlan(sourceDir, id);
  const plannedCount = plan && Array.isArray(plan.visuals) ? plan.visuals.length : null;

  if (visuals.length === 0 && legacySlides.length === 0) {
    issues.errors.push('keine visualNN.* oder slideNN.* Dateien gefunden');
  } else {
    if (visuals.length > 0) {
      issues.info.push(`${visuals.length} Visuals (visualNN) gefunden`);
      if (plannedCount && visuals.length < plannedCount) {
        issues.warnings.push(
          `visual_plan.json erwartet ${plannedCount}, gefunden ${visuals.length}`,
        );
      }
    }
    if (legacySlides.length > 0) {
      issues.warnings.push(
        `${legacySlides.length} Legacy-slideNN.* Dateien gefunden — ` +
          'nach SLIDE_GENERATION_RULES.md sollten diese visualNN.* heissen',
      );
    }
  }

  return { id, issues };
}

function printLessonResult(res) {
  const { id, issues } = res;
  const hasErr = issues.errors.length > 0;
  const hasWarn = issues.warnings.length > 0;
  const prefix = hasErr ? '✖' : hasWarn ? '⚠' : '✔';
  console.log(`${prefix} ${id}`);
  for (const e of issues.errors) console.log(`    ✖ ${e}`);
  for (const w of issues.warnings) console.log(`    ⚠ ${w}`);
  for (const i of issues.info) console.log(`    · ${i}`);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const assetsInputDir = path.resolve(ROOT, args['assets-input'] || 'assets-input');
  const sourceDir = path.resolve(ROOT, args.source || 'generated-assets');
  const onlyIds = args.only
    ? String(args.only).split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
    : null;
  const strict = Boolean(args.strict);

  console.log('────────────────────────────────────────────────────────────');
  console.log(' DeFi Akademie · Asset check (visuals + voice)');
  console.log('────────────────────────────────────────────────────────────');
  console.log(`Assets-Input : ${path.relative(ROOT, assetsInputDir) || '.'}`);
  console.log(`Source (Soll): ${path.relative(ROOT, sourceDir) || '.'}`);
  console.log(`Strict       : ${strict}`);
  if (onlyIds) console.log(`Only         : ${onlyIds.join(', ')}`);
  console.log('');

  fs.mkdirSync(assetsInputDir, { recursive: true });

  let lessons = discoverExpectedLessons(sourceDir, assetsInputDir);
  if (onlyIds) lessons = lessons.filter((id) => onlyIds.includes(id));

  if (lessons.length === 0) {
    console.log('Keine Lektionen gefunden — weder in generated-assets/ noch in assets-input/.');
    console.log('Bitte zuerst "npm run generate-assets" ausfuehren.');
    return;
  }

  const results = lessons.map((id) => checkLesson({ id, assetsInputDir, sourceDir }));
  results.forEach(printLessonResult);

  const errCount = results.filter((r) => r.issues.errors.length > 0).length;
  const warnCount = results.filter((r) => r.issues.warnings.length > 0 && r.issues.errors.length === 0).length;
  const okCount = results.length - errCount - warnCount;

  console.log('');
  console.log('────────────────────────────────────────────────────────────');
  console.log(` Ergebnis: ${okCount} ok · ${warnCount} warn · ${errCount} fehler`);
  console.log('────────────────────────────────────────────────────────────');

  if (errCount > 0) {
    console.log('');
    console.log('Fuer fehlende Dateien:');
    console.log('  Visuals : Gamma-Prompts aus gamma-prompts/<id>.txt laden,');
    console.log('            Export als visualNN.png in assets-input/<id>/');
    console.log('  Voice   : ElevenLabs-Skript aus elevenlabs-prompts/<id>.txt,');
    console.log('            Export als voice.mp3 in assets-input/<id>/');
    process.exit(1);
  }
  if (strict && warnCount > 0) {
    console.log('');
    console.log('--strict gesetzt → Warnungen werden als Fehler gewertet.');
    process.exit(1);
  }
}

try {
  main();
} catch (err) {
  console.error('✖ check-assets failed:', err.message);
  process.exit(1);
}
