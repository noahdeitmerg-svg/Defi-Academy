#!/usr/bin/env node
/**
 * scripts/collect-prompts.js
 *
 * Schritt 2 der Academy-Build-Pipeline.
 *
 * Sammelt alle generierten Prompt-Dateien aus
 * `generated-assets/<id>/` und spiegelt sie in zwei flache
 * Upload-Ordner:
 *
 *   gamma-prompts/<id>.txt           (aus slides_prompt.txt)
 *   elevenlabs-prompts/<id>.txt      (aus voice_script.txt)
 *
 * Damit kann der User ALLE Prompts auf einmal per Drag&Drop
 * in Gamma bzw. ElevenLabs hochladen.
 *
 * Namenskonvention
 *   Die Ziel-Dateien werden mit der Lesson-ID benannt
 *   (moduleXX-lessonYY.txt), damit es in den flachen
 *   Upload-Ordnern keine Namenskollisionen gibt.
 *
 * CLI
 *   node scripts/collect-prompts.js
 *   node scripts/collect-prompts.js --source generated-assets
 *   node scripts/collect-prompts.js --only module01-lesson01,module04-lesson02
 *   node scripts/collect-prompts.js --clean   # leert Zielordner vorher
 *
 * Flags
 *   --source <path>         default: ./generated-assets
 *   --gamma-out <path>      default: ./gamma-prompts
 *   --elevenlabs-out <path> default: ./elevenlabs-prompts
 *   --only <csv>            nur diese Lesson-IDs
 *   --clean                 Zielordner vor dem Kopieren leeren
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
DeFi Akademie — collect-prompts

Sammelt slides_prompt.txt und voice_script.txt aus allen Lesson-
Unterordnern von generated-assets/ und legt sie flach unter
gamma-prompts/ bzw. elevenlabs-prompts/ ab.

Flags:
  --source <path>          default: ./generated-assets
  --gamma-out <path>       default: ./gamma-prompts
  --elevenlabs-out <path>  default: ./elevenlabs-prompts
  --only <csv>             explizite Lesson-IDs
  --clean                  Zielordner vor dem Kopieren leeren
  --help
`);
}

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isFile()) fs.rmSync(p);
  }
}

function writeReadme(dir, title, body) {
  const readme = path.join(dir, 'README.md');
  if (fs.existsSync(readme)) return;
  fs.writeFileSync(readme, `# ${title}\n\n${body}\n`, 'utf8');
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const sourceDir = path.resolve(ROOT, args.source || 'generated-assets');
  const gammaOut = path.resolve(ROOT, args['gamma-out'] || 'gamma-prompts');
  const elevenlabsOut = path.resolve(ROOT, args['elevenlabs-out'] || 'elevenlabs-prompts');
  const onlyIds = args.only
    ? String(args.only).split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
    : null;

  console.log('────────────────────────────────────────────────────────────');
  console.log(' DeFi Akademie · Collecting prompts for manual upload');
  console.log('────────────────────────────────────────────────────────────');
  console.log(`Source       : ${path.relative(ROOT, sourceDir) || '.'}`);
  console.log(`Gamma-Out    : ${path.relative(ROOT, gammaOut) || '.'}`);
  console.log(`ElevenLabs   : ${path.relative(ROOT, elevenlabsOut) || '.'}`);
  if (onlyIds) console.log(`Only         : ${onlyIds.join(', ')}`);
  console.log('');

  if (!fs.existsSync(sourceDir)) {
    console.log(`✖ Quelle fehlt: ${sourceDir}`);
    console.log('  Bitte zuerst "npm run generate-assets" ausfuehren.');
    process.exit(1);
  }

  fs.mkdirSync(gammaOut, { recursive: true });
  fs.mkdirSync(elevenlabsOut, { recursive: true });

  if (args.clean) {
    console.log('Zielordner werden geleert …');
    cleanDir(gammaOut);
    cleanDir(elevenlabsOut);
  }

  writeReadme(
    gammaOut,
    'Gamma Visual-Asset-Prompts',
    [
      'Jede `.txt`-Datei in diesem Ordner ist ein **Visual-Asset-Prompt**',
      'fuer **eine** Lektion (Dateiname = Lesson-ID).',
      '',
      '**Regel**: Gamma erzeugt NUR Einzel-Visuals',
      '(Diagramme, Illustrationen, Charts) — keine Slide-Layouts.',
      'Siehe `docs/SLIDE_GENERATION_RULES.md`.',
      '',
      '**Upload-Workflow**',
      '1. Alle `.txt`-Dateien per Drag&Drop in Gamma oeffnen.',
      '2. Generierte Visuals als PNG exportieren.',
      '3. Dateien entpacken und als `visual01.png`, `visual02.png`, …',
      '   in `assets-input/<lesson-id>/` ablegen.',
    ].join('\n'),
  );

  writeReadme(
    elevenlabsOut,
    'ElevenLabs Voice-Skripte',
    [
      'Jede `.txt`-Datei ist ein **Voice-Skript** fuer eine Lektion',
      '(Dateiname = Lesson-ID) mit SSML `<break time="…"/>` fuer Pausen.',
      '',
      '**Upload-Workflow**',
      '1. Jedes Skript in ElevenLabs Text-to-Speech einfuegen.',
      '2. Voice "Florian" (oder konfigurierte Voice) waehlen,',
      '   Modell: `eleven_turbo_v2`.',
      '3. Ausgabe-MP3 speichern als',
      '   `assets-input/<lesson-id>/voice.mp3`.',
      '',
      '**Alternative (automatisiert)**',
      '   ELEVENLABS_API_KEY setzen und `npm run generate:voice` nutzen.',
    ].join('\n'),
  );

  const lessonDirs = fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((id) => /^module\d{2}-lesson\d{2}$/i.test(id))
    .sort();

  if (lessonDirs.length === 0) {
    console.error('✖ Keine Lesson-Ordner unter generated-assets/ gefunden.');
    process.exit(1);
  }

  let copiedGamma = 0;
  let copiedVoice = 0;
  let missingGamma = 0;
  let missingVoice = 0;

  for (const id of lessonDirs) {
    if (onlyIds && !onlyIds.includes(id.toLowerCase())) continue;

    const lessonDir = path.join(sourceDir, id);
    const srcSlides = path.join(lessonDir, 'slides_prompt.txt');
    const srcVoice = path.join(lessonDir, 'voice_script.txt');

    if (fs.existsSync(srcSlides)) {
      fs.copyFileSync(srcSlides, path.join(gammaOut, `${id}.txt`));
      copiedGamma++;
      console.log(`  ✔ gamma-prompts/${id}.txt`);
    } else {
      missingGamma++;
      console.warn(`  ⚠ ${id}: slides_prompt.txt fehlt`);
    }

    if (fs.existsSync(srcVoice)) {
      fs.copyFileSync(srcVoice, path.join(elevenlabsOut, `${id}.txt`));
      copiedVoice++;
      console.log(`  ✔ elevenlabs-prompts/${id}.txt`);
    } else {
      missingVoice++;
      console.warn(`  ⚠ ${id}: voice_script.txt fehlt`);
    }
  }

  console.log('');
  console.log('────────────────────────────────────────────────────────────');
  console.log(` Gamma-Prompts     : ${copiedGamma} ok, ${missingGamma} fehlen`);
  console.log(` ElevenLabs-Prompts: ${copiedVoice} ok, ${missingVoice} fehlen`);
  console.log('────────────────────────────────────────────────────────────');
  console.log('');
  console.log('Naechste Schritte (manuell):');
  console.log(`  1. gamma-prompts/*.txt      → Gamma hochladen`);
  console.log(`     Export: visual01..visual07.png  →  assets-input/<id>/`);
  console.log(`  2. elevenlabs-prompts/*.txt → ElevenLabs hochladen`);
  console.log(`     Export: voice.mp3               →  assets-input/<id>/`);
  console.log(`  3. npm run check-assets`);
  console.log(`  4. npm run render-videos`);
}

try {
  main();
} catch (err) {
  console.error('✖ collect-prompts failed:', err.message);
  process.exit(1);
}
