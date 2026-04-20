#!/usr/bin/env node
/**
 * Liest docs/F7-MAPPING.md (Tabelle A: Legacy-Pfad → UX-Modul/Lektion) und schreibt:
 *   - config/f7-redirects.generated.json  — maschinenlesbar
 *   - config/f7-next-redirects.snippet.js — async redirects() für next.config (nur Snippet)
 *   - config/f7-netlify-redirects.txt     — Netlify / kompatible Static-Hosts
 *
 * Legacy-URL-Konvention: /module/module{N}/lesson/{N}-{M}
 * Ziel-URL: /kurs/{moduleId}/{lessonId}
 *
 * Hinweis: Bei output: "export" (GitHub Pages) werden next.config redirects NICHT
 * angewendet — Snippet dient Zukunftssicherheit + Referenz; siehe docs/F7-REDIRECTS.md
 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const MAPPING = path.join(ROOT, "docs", "F7-MAPPING.md");
const OUT_JSON = path.join(ROOT, "config", "f7-redirects.generated.json");
const OUT_SNIPPET = path.join(ROOT, "config", "f7-next-redirects.snippet.js");
const OUT_NETLIFY = path.join(ROOT, "config", "f7-netlify-redirects.txt");

/** Zeilen in Tabelle A zwischen Kopfzeile und nächstem ### */
function parseTableA(md) {
  const start = md.indexOf("### A)");
  const end = md.indexOf("### B)");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("F7-MAPPING.md: Abschnitt A oder B nicht gefunden");
  }
  const block = md.slice(start, end);
  const rows = [];
  const lineRe =
    /\|\s*`content\/modules\/module(\d+)\/(\d+)-(\d+)\.md`\s*\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|/g;
  let m;
  while ((m = lineRe.exec(block)) !== null) {
    const moduleNum = parseInt(m[1], 10);
    const nFile = parseInt(m[2], 10);
    const mFile = parseInt(m[3], 10);
    const uxModule = m[4].trim();
    const uxLesson = m[5].trim();
    if (nFile !== moduleNum) {
      console.warn(
        `Warnung: Modulnummer in Pfad (${nFile}) != module${moduleNum} — Zeile trotzdem übernommen`,
      );
    }
    rows.push({
      legacyPath: `content/modules/module${moduleNum}/${nFile}-${mFile}.md`,
      moduleNum,
      legacyLessonKey: `${nFile}-${mFile}`,
      uxModuleId: uxModule,
      uxLessonId: uxLesson,
      source: `/module/module${moduleNum}/lesson/${nFile}-${mFile}`,
      destination: `/kurs/${uxModule}/${uxLesson}`,
    });
  }
  return rows;
}

function toNextRedirects(rows) {
  return rows.map((r) => ({
    source: r.source,
    destination: r.destination,
    permanent: true,
  }));
}

function toNetlify(rows) {
  return rows.map((r) => `${r.source} ${r.destination} 301`).join("\n") + "\n";
}

function main() {
  const md = fs.readFileSync(MAPPING, "utf8");
  const rows = parseTableA(md);
  if (rows.length === 0) {
    throw new Error("Keine Mapping-Zeilen geparst — Regex an F7-MAPPING.md anpassen");
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceDoc: "docs/F7-MAPPING.md",
    count: rows.length,
    note:
      "Bei next.config output: 'export' sind redirects() nicht wirksam — für GitHub Pages siehe docs/F7-REDIRECTS.md",
    redirects: rows.map((r) => ({
      legacyPath: r.legacyPath,
      source: r.source,
      destination: r.destination,
      uxModuleId: r.uxModuleId,
      uxLessonId: r.uxLessonId,
    })),
    nextConfigRedirects: toNextRedirects(rows),
  };

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2), "utf8");

  const snippet = `/**
 * AUTOGENERIERT — nicht direkt importieren.
 * Inhalt in next.config.ts → async redirects() einfügen, sobald kein static export mehr nötig ist.
 * Generator: node scripts/generate-f7-redirects.js
 * Stand: ${payload.generatedAt}
 */
module.exports = ${JSON.stringify(toNextRedirects(rows), null, 2)};
`;

  fs.writeFileSync(OUT_SNIPPET, snippet, "utf8");
  fs.writeFileSync(OUT_NETLIFY, toNetlify(rows), "utf8");

  console.log(
    `OK: ${rows.length} Redirects → ${path.relative(ROOT, OUT_JSON)}, ${path.relative(ROOT, OUT_SNIPPET)}, ${path.relative(ROOT, OUT_NETLIFY)}`,
  );
}

main();
