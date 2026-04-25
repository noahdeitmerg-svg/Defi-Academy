#!/usr/bin/env node
/**
 * export-image-tool-prompts.js
 *
 * Zerlegt slides_prompt.txt pro Lektion in Dateien fuer **manuelle**
 * Bildgeneratoren (Midjourney, DALL·E, Firefly, Gamma-UI ohne API, …).
 *
 * Die automatische Gamma-API + PDF-Slice-Route liefert oft schlecht
 * brauchbare Ergebnisse; dieser Export macht Copy-Paste pro Frame
 * einfach und haelt den Brand-Block bei jedem Frame wiederholbar.
 *
 * Ausgabe (default):
 *   exports/image-tool-prompts/<lessonId>/
 *     README.md           Kurzanleitung
 *     GLOBAL-PROMPT.txt  Alles vor "Lesson module…" (Brand + Regeln)
 *     visual01-MJ.txt    GLOBAL + Zeile 1 (ein Prompt pro Datei)
 *     visual02-MJ.txt    …
 *
 * CLI
 *   node scripts/export-image-tool-prompts.js
 *   node scripts/export-image-tool-prompts.js --only module01-lesson01,module04-lesson02
 *   node scripts/export-image-tool-prompts.js --source generated-assets --out exports/image-tool-prompts
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = {
    source: path.join(ROOT, 'generated-assets'),
    out: path.join(ROOT, 'exports', 'image-tool-prompts'),
    only: null,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    args[key] = next;
  }
  return args;
}

function printHelp() {
  console.log(`
export-image-tool-prompts — Midjourney / manuell / Gamma-UI

  --source <path>   default: ./generated-assets
  --out <path>      default: ./exports/image-tool-prompts
  --only <csv>      nur diese Lesson-IDs
  --help
`);
}

function discoverLessonIds(sourceDir) {
  const re = /^module\d{2}-lesson\d{2}$/;
  if (!fs.existsSync(sourceDir)) return [];
  return fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && re.test(e.name))
    .map((e) => e.name)
    .sort();
}

/**
 * @returns {{ lessonId: string|null, globalPart: string, frameLines: { index: number, text: string }[] }}
 */
function parseSlidesPrompt(content) {
  const lines = content.split(/\r?\n/);
  const lessonIdx = lines.findIndex((l) =>
    /^Lesson\s+module\d{2}-lesson\d{2}\s+—/i.test(l.trim())
  );
  const globalPart =
    lessonIdx >= 0 ? lines.slice(0, lessonIdx).join('\n').trim() : content.trim();

  const lessonM = content.match(/^Lesson\s+(module\d{2}-lesson\d{2})\s+—/im);
  const lessonId = lessonM ? lessonM[1] : null;

  const printIdx = lines.findIndex((l) => /^Print exactly\s+\d+/i.test(l.trim()));
  const midEnd = printIdx >= 0 ? printIdx : lines.length;
  const frameLines = [];
  const start = lessonIdx >= 0 ? lessonIdx + 1 : 0;
  for (let i = start; i < midEnd; i++) {
    const raw = lines[i].trim();
    const m = raw.match(/^(\d+)\.\s+(.+)$/);
    if (m) frameLines.push({ index: parseInt(m[1], 10), text: m[2].trim() });
  }
  return { lessonId, globalPart, frameLines };
}

const LESSON_README = (lessonId, n) => `# ${lessonId} — Bilder manuell erzeugen

## Ziel

Pro generiertem Bild eine Datei \`visualNN.png\` in:

\`assets-input/${lessonId}/\`

(Reihenfolge wie unten: 01 → \`visual01.png\`, …)

## Vorgehen

1. **Midjourney (Discord):** Inhalt von \`visual01-MJ.txt\` etc. als **einen** Prompt posten. Typische Parameter: \`--ar 16:9 --style raw\` (Modell je nach Abo anpassen). Wenn der Prompt zu lang ist: \`GLOBAL-PROMPT.txt\` einmal ins Profil / Stil-Notiz legen, dann nur die **eine** nummerierte Zeile aus derselben \`visualNN-MJ.txt\` (unterhalb des Blocks) nutzen.
2. **DALL·E / Firefly / andere:** Gleicher Text; Seitenverhältnis **16:9** wählen, Auflösung möglichst **1920×1080**.
3. **Gamma Web-UI:** Pro Seite ein Bild exportieren — **kein** fertiges „Slide-Deck“ mit Titeln nutzen; nur die Grafik. Kein Text auf der Fläche (siehe GLOBAL-PROMPT).
4. Exportierte Bilder als **PNG** speichern und exakt \`visual01.png\` … \`visual${String(n).padStart(2, '0')}.png\` benennen.

## Dateien in diesem Ordner

| Datei | Inhalt |
|-------|--------|
| \`GLOBAL-PROMPT.txt\` | Brand + Verbote (nur Referenz) |
| \`visualNN-MJ.txt\` | GLOBAL + eine Zeile — **Copy-Paste** pro Bild |

**Anzahl Frames:** ${n}

---

Siehe auch: \`docs/VIDEO_PRODUCTION_WORKFLOW.md\` §3 und \`docs/SLIDE_GENERATION_RULES.md\`.
`;

const ROOT_README = `# image-tool-prompts

Von \`npm run export:image-prompts\` erzeugt.

Unterordner pro Lektion: \`moduleXX-lessonYY/\` mit \`visual01-MJ.txt\` …

**Workflow:** Prompts hier generieren → Bilder in \`assets-input/<lessonId>/visualNN.png\` legen → Voice/Render wie gehabt.

Gamma-**API** (\`npm run generate:slides\`) ist optional; bei schlechter Qualität diesen manuellen Pfad nutzen.
`;

function main() {
  const argv = process.argv;
  if (argv.includes('--help')) {
    printHelp();
    process.exit(0);
  }
  const args = parseArgs(argv);
  const sourceDir = path.resolve(String(args.source));
  const outRoot = path.resolve(String(args.out));
  const onlySet =
    typeof args.only === 'string'
      ? new Set(args.only.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean))
      : null;

  let ids = discoverLessonIds(sourceDir);
  if (onlySet) ids = ids.filter((id) => onlySet.has(id));

  if (!ids.length) {
    console.error('Keine Lektionen unter', sourceDir, '(mit slides_prompt.txt).');
    process.exit(1);
  }

  fs.mkdirSync(outRoot, { recursive: true });
  fs.writeFileSync(path.join(outRoot, 'README.md'), ROOT_README, 'utf8');

  let ok = 0;
  for (const lessonId of ids) {
    const promptPath = path.join(sourceDir, lessonId, 'slides_prompt.txt');
    if (!fs.existsSync(promptPath)) {
      console.warn('skip (kein slides_prompt.txt):', lessonId);
      continue;
    }
    const content = fs.readFileSync(promptPath, 'utf8');
    const parsed = parseSlidesPrompt(content);
    const frames = parsed.frameLines.length ? parsed.frameLines : [];
    if (!frames.length) {
      console.warn('skip (keine nummerierten Zeilen):', lessonId);
      continue;
    }

    const dir = path.join(outRoot, lessonId);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'GLOBAL-PROMPT.txt'), parsed.globalPart + '\n', 'utf8');
    fs.writeFileSync(
      path.join(dir, 'README.md'),
      LESSON_README(lessonId, frames.length),
      'utf8'
    );

    for (const { index, text } of frames) {
      const pad = String(index).padStart(2, '0');
      const body = `${parsed.globalPart}\n\n${index}. ${text}\n`;
      fs.writeFileSync(path.join(dir, `visual${pad}-MJ.txt`), body, 'utf8');
    }
    console.log('ok', lessonId, frames.length, 'frames →', dir);
    ok++;
  }

  console.log('—'.repeat(50));
  console.log('Fertig:', ok, 'Lektion(en) →', outRoot);
}

main();
