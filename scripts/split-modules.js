#!/usr/bin/env node
/**
 * scripts/split-modules.js
 *
 * Zerlegt die FINAL-Modul-Sammeldateien unter `Module/` in Einzel-
 * Lektions-Dateien unter `lessons/moduleXX-lessonYY.md`, die vom
 * Lesson-Asset-Generator und vom Validator verarbeitet werden koennen.
 *
 * Input-Format (je Sammeldatei `Module/modul-XX-*.md`):
 *
 *   # Modul N — Titel                     (H1, wird verworfen)
 *
 *   ## Modul-Überblick                    (optional, wird verworfen)
 *
 *   ## Lektion N.M — Lektionstitel        (H2, Start einer Lektion)
 *
 *     ### Lernziele                       (H3, Sub-Sektion)
 *     …
 *     ### Erklärung
 *     ### Folien-Zusammenfassung
 *     ### Sprechertext
 *     ### Visuelle Vorschläge
 *     ### Übung
 *     ### Quiz
 *     ### Video-Pipeline-Assets           (optional, wird mitkopiert)
 *
 *   ## Lektion N.(M+1) — …                (naechste Lektion)
 *
 * Output pro Lektion (`lessons/module0N-lesson0M.md`):
 *
 *   # Lektionstitel                       (H1 — wird vom Parser als Titel
 *                                          erkannt)
 *
 *   ## Lernziele                          (H2 — aus H3 hochgezogen)
 *   ## Erklärung
 *   ## Folien-Zusammenfassung
 *   ## Sprechertext
 *   ## Visuelle Vorschläge
 *   ## Übung
 *   ## Quiz
 *   ## Video-Pipeline-Assets
 *
 * Der Splitter ist idempotent und ueberschreibt bestehende Dateien nur
 * mit --force. Leere oder kollidierende Dateinamen werden uebersprungen.
 *
 * CLI
 *   node scripts/split-modules.js
 *   node scripts/split-modules.js --dry-run
 *   node scripts/split-modules.js --force
 *   node scripts/split-modules.js --only modul-01-defi-grundlagen-FINAL.md
 *
 * Flags
 *   --source <path>      default: ./Module
 *   --out <path>         default: ./lessons
 *   --only <csv>         Sammeldatei-Namen (nur diese verarbeiten)
 *   --force              vorhandene lessons/*.md ueberschreiben
 *   --dry-run            nichts schreiben
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
DeFi Akademie — split-modules

Zerlegt Module/modul-XX-*.md in lessons/moduleXX-lessonYY.md.

Flags:
  --source <path>   default: ./Module
  --out <path>      default: ./lessons
  --only <csv>      Sammeldatei-Namen (nur diese)
  --force           vorhandene Lessons ueberschreiben
  --dry-run
  --help
`);
}

const SECTION_RE = /^(#{1,6})\s+(.+?)\s*$/;

function parseModuleFile(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const lessons = [];
  let moduleNumber = null;
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = SECTION_RE.exec(line);
    if (!m) {
      if (current) current.body.push(line);
      continue;
    }
    const level = m[1].length;
    const heading = m[2].trim();

    if (level === 1) {
      const mod = heading.match(/Modul\s+(\d+)/i);
      if (mod) moduleNumber = parseInt(mod[1], 10);
      continue;
    }

    if (level === 2) {
      const les = heading.match(/Lektion\s+(\d+)\.(\d+)\s*[—–-]?\s*(.*)$/i);
      if (les) {
        if (current) lessons.push(current);
        current = {
          module: parseInt(les[1], 10),
          lesson: parseInt(les[2], 10),
          title: (les[3] || '').trim(),
          body: [],
        };
        continue;
      }
      if (current) lessons.push(current);
      current = null;
      continue;
    }

    if (current && level === 3) {
      current.body.push(`## ${heading}`);
      continue;
    }

    if (current) current.body.push(line);
  }
  if (current) lessons.push(current);

  return { moduleNumber, lessons };
}

function buildLessonMarkdown(lesson) {
  const body = lesson.body.join('\n').replace(/^\n+/, '').replace(/\n+$/, '');
  return `# ${lesson.title || `Lektion ${lesson.module}.${lesson.lesson}`}\n\n${body}\n`;
}

function lessonFilename(mod, les) {
  const pad = (n) => String(n).padStart(2, '0');
  return `module${pad(mod)}-lesson${pad(les)}.md`;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const sourceDir = path.resolve(ROOT, args.source || 'Module');
  const outDir = path.resolve(ROOT, args.out || 'lessons');
  const onlyList = args.only
    ? String(args.only).split(',').map((s) => s.trim()).filter(Boolean)
    : null;
  const force = Boolean(args.force);
  const dryRun = Boolean(args['dry-run']);

  console.log('────────────────────────────────────────────────────────────');
  console.log(' DeFi Akademie · Split FINAL modules into lessons');
  console.log('────────────────────────────────────────────────────────────');
  console.log(`Source : ${path.relative(ROOT, sourceDir) || '.'}`);
  console.log(`Out    : ${path.relative(ROOT, outDir) || '.'}`);
  console.log(`Force  : ${force}`);
  console.log(`Dry-Run: ${dryRun}`);
  if (onlyList) console.log(`Only   : ${onlyList.join(', ')}`);
  console.log('');

  if (!fs.existsSync(sourceDir)) {
    console.error(`✖ Source fehlt: ${sourceDir}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(sourceDir)
    .filter((n) => /^modul-\d{2}-.*\.md$/i.test(n))
    .filter((n) => !onlyList || onlyList.includes(n))
    .sort();

  if (files.length === 0) {
    console.log('Keine modul-XX-*.md-Dateien gefunden.');
    return;
  }

  if (!dryRun) fs.mkdirSync(outDir, { recursive: true });

  let totalWritten = 0;
  let totalSkipped = 0;
  let totalSkippedExisting = 0;

  for (const name of files) {
    const full = path.join(sourceDir, name);
    const md = fs.readFileSync(full, 'utf8');
    const parsed = parseModuleFile(md);

    if (!parsed.moduleNumber) {
      console.warn(`⚠ ${name}: keine "# Modul N" H1 gefunden — skip`);
      totalSkipped++;
      continue;
    }
    if (parsed.lessons.length === 0) {
      console.warn(`⚠ ${name}: keine "## Lektion N.M" Sektionen — skip`);
      totalSkipped++;
      continue;
    }

    console.log(`• ${name}  →  Modul ${parsed.moduleNumber}, ${parsed.lessons.length} Lektionen`);
    for (const lesson of parsed.lessons) {
      if (lesson.module !== parsed.moduleNumber) {
        console.warn(
          `    ⚠ Modul-Nummer ${lesson.module} in Lektion widerspricht H1 ` +
            `${parsed.moduleNumber} — nehme H1`,
        );
        lesson.module = parsed.moduleNumber;
      }
      const outName = lessonFilename(lesson.module, lesson.lesson);
      const outPath = path.join(outDir, outName);
      if (fs.existsSync(outPath) && !force) {
        console.log(`    ○ ${outName} existiert — skip (--force um zu ueberschreiben)`);
        totalSkippedExisting++;
        continue;
      }
      const content = buildLessonMarkdown(lesson);
      if (dryRun) {
        console.log(`    [dry] ${outName} (${content.length} chars)`);
      } else {
        fs.writeFileSync(outPath, content, 'utf8');
        console.log(`    ✔ ${outName}`);
      }
      totalWritten++;
    }
  }

  console.log('');
  console.log('────────────────────────────────────────────────────────────');
  console.log(` Geschrieben: ${totalWritten}`);
  console.log(` Uebersprungen (existiert): ${totalSkippedExisting}`);
  if (totalSkipped > 0) console.log(` Fehlerhaft (skip): ${totalSkipped}`);
  console.log('────────────────────────────────────────────────────────────');
}

try {
  main();
} catch (err) {
  console.error('✖ split-modules failed:', err.message);
  console.error(err.stack);
  process.exit(1);
}
