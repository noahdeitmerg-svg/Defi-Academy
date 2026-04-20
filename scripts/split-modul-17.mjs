#!/usr/bin/env node
/**
 * Splittet Module/modul-17-portfolio-construction-rwa-FINAL.md an
 * Überschriften "## Lektion 17.N" in genau 6 Markdown-Blöcke.
 *
 * Standard: Schreibt nach tmp/modul17-split/lesson-17-<n>.md (gitignored tmp/).
 *   node scripts/split-modul-17.mjs
 * Nur validieren, keine Dateien:
 *   node scripts/split-modul-17.mjs --dry-run
 *
 * Ändert NICHT data/courseStructure.ts und importiert nichts aus der App.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INPUT = path.join(
  ROOT,
  "Module",
  "modul-17-portfolio-construction-rwa-FINAL.md",
);
const OUT_DIR = path.join(ROOT, "tmp", "modul17-split");

const LESSON_HEADING = /^##\s+Lektion\s+17\.(\d+)\b[^\n]*$/gm;

function splitLessons(md) {
  const matches = [];
  let m;
  while ((m = LESSON_HEADING.exec(md)) !== null) {
    matches.push({ index: m.index, num: parseInt(m[1], 10) });
  }
  if (matches.length !== 6) {
    throw new Error(
      `Erwartet 6 Lektionen (## Lektion 17.1 … 17.6), gefunden: ${matches.length}`,
    );
  }
  for (let i = 0; i < 6; i++) {
    if (matches[i].num !== i + 1) {
      throw new Error(
        `Unerwartete Lektionsnummer an Position ${i}: erwartet ${i + 1}, got ${matches[i].num}`,
      );
    }
  }
  const chunks = [];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : md.length;
    chunks.push({
      num: matches[i].num,
      markdown: md.slice(start, end).trim(),
    });
  }
  return chunks;
}

const dryRun = process.argv.includes("--dry-run");

function main() {
  if (!fs.existsSync(INPUT)) {
    console.error("Fehlt:", INPUT);
    process.exit(1);
  }
  const md = fs.readFileSync(INPUT, "utf8");
  const chunks = splitLessons(md);
  console.log(`Gelesen: ${path.basename(INPUT)} → ${chunks.length} Abschnitte`);

  if (dryRun) {
    for (const c of chunks) {
      const lines = c.markdown.split("\n").length;
      const words = c.markdown.split(/\s+/).filter(Boolean).length;
      console.log(`  Lektion 17.${c.num}: ${lines} Zeilen, ~${words} Wörter`);
    }
    console.log("--dry-run: keine Dateien geschrieben.");
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const c of chunks) {
    const out = path.join(OUT_DIR, `lesson-17-${c.num}.md`);
    fs.writeFileSync(out, c.markdown + "\n", "utf8");
  }
  console.log("Geschrieben nach:", OUT_DIR);
}

main();
