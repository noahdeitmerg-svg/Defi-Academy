#!/usr/bin/env node
/**
 * Lesson Validator fuer die DeFi Academy Video-Pipeline.
 *
 * Prueft alle Markdown-Lektionen in `lessons/` gegen die Regeln, die ein
 * erfolgreicher Batch-Render-Lauf voraussetzt. Wenn hier etwas rot ist,
 * bricht der Renderer spaeter sicher ab — also zuerst pruefen, dann rendern.
 *
 * Checks pro Lektion:
 *   1. Section Presence         — 8 Pflicht-Sektionen (DE/EN Aliase)
 *   2. Slide Count              — Slide Summary hat 6–7 Bullets
 *   3. Visual Requirements      — mind. 1 Diagramm, 1 Protocol Example, 1 Concept Visual
 *   4. Voice Script             — <break time="..."/> im generierten voice_script.txt
 *   5. Video Duration Estimate  — 300–600 Sekunden
 *   6. JSON Validation          — visual_plan.json + video_config.json gegen Schema
 *
 * Usage:
 *   npm run validate-lessons
 *   node scripts/validate-lessons.js [options]
 *
 * Options:
 *   --lessons-dir <pfad>         Quellverzeichnis (default: ./lessons)
 *   --generator-output <pfad>    Generator-Output (default: lesson-asset-generator/output)
 *   --skip-generated             Checks 4 + 6 auslassen (nur Source-MD validieren)
 *   --help                       Diese Hilfe
 *
 * Exit-Codes:
 *   0 — alle Lektionen valide
 *   1 — mindestens ein Problem, oder Setup-Fehler (Verzeichnis fehlt etc.)
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

// ───────────────────────────── CLI ─────────────────────────────

function parseArgs(argv) {
  const args = { skipGenerated: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--lessons-dir") args.lessonsDir = argv[++i];
    else if (a === "--generator-output") args.generatorOutput = argv[++i];
    else if (a === "--skip-generated") args.skipGenerated = true;
    else if (a === "--help" || a === "-h") args.help = true;
  }
  return args;
}

function printHelp() {
  const text = [
    "validate-lessons — Pre-Render-Validator fuer die Video-Pipeline",
    "",
    "Usage:",
    "  npm run validate-lessons",
    "  node scripts/validate-lessons.js [options]",
    "",
    "Options:",
    "  --lessons-dir <pfad>         Quellverzeichnis (default: ./lessons)",
    "  --generator-output <pfad>    Generator-Output (default: lesson-asset-generator/output)",
    "  --skip-generated             Checks 4 + 6 auslassen",
    "  --help                       Diese Hilfe",
  ].join("\n");
  console.log(text);
}

// ───────────────────────── Pfad-Resolver ──────────────────────

const ROOT = process.cwd();
const CLI = parseArgs(process.argv);

if (CLI.help) {
  printHelp();
  process.exit(0);
}

const LESSONS_DIR = CLI.lessonsDir
  ? path.resolve(CLI.lessonsDir)
  : path.join(ROOT, "lessons");

/**
 * Tolerant gegenueber der aktuellen Doppelstruktur
 * `lesson-asset-generator/lesson-asset-generator/output/`. Nimmt den
 * ersten existierenden Pfad; fehlt er, wird der Default-Pfad zurueckgegeben
 * und der spaetere Existenz-Check schlaegt mit klarer Meldung an.
 */
function resolveGeneratorOutput() {
  if (CLI.generatorOutput) return path.resolve(CLI.generatorOutput);
  const candidates = [
    path.join(ROOT, "lesson-asset-generator", "output"),
    path.join(ROOT, "lesson-asset-generator", "lesson-asset-generator", "output"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

const GENERATOR_OUTPUT_DIR = resolveGeneratorOutput();

// ───────────────────────── Sektionen ──────────────────────────

const REQUIRED_SECTIONS = [
  { canonical: "Lesson Title", aliases: ["Lesson Title", "Lektionstitel"] },
  { canonical: "Learning Objectives", aliases: ["Learning Objectives", "Lernziele"] },
  { canonical: "Explanation", aliases: ["Explanation", "Erklärung", "Erklaerung"] },
  { canonical: "Slide Summary", aliases: ["Slide Summary", "Slide-Zusammenfassung"] },
  {
    canonical: "Voice Narration Script",
    aliases: ["Voice Narration Script", "Sprecher-Skript", "Voiceover-Skript"],
  },
  {
    canonical: "Visual Suggestions",
    aliases: ["Visual Suggestions", "Visuelle Vorschläge", "Visuelle Vorschlaege"],
  },
  {
    canonical: "Exercise",
    aliases: ["Exercise", "Practical Exercise", "Übung", "Uebung", "Praktische Übung"],
  },
  { canonical: "Quiz", aliases: ["Quiz"] },
];

function parseSections(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const sections = {};
  const headingRe = /^#{1,3}\s+(.+?)\s*$/;
  let current = null;
  let buffer = [];
  for (const line of lines) {
    const m = headingRe.exec(line);
    if (m) {
      if (current) sections[current] = buffer.join("\n").trim();
      current = m[1].trim();
      buffer = [];
    } else if (current) {
      buffer.push(line);
    }
  }
  if (current) sections[current] = buffer.join("\n").trim();
  return sections;
}

function findSection(sections, aliases) {
  const lowerMap = new Map(
    Object.keys(sections).map((k) => [k.toLowerCase(), k]),
  );
  for (const alias of aliases) {
    if (alias in sections) return { heading: alias, body: sections[alias] };
    const hit = lowerMap.get(alias.toLowerCase());
    if (hit) return { heading: hit, body: sections[hit] };
  }
  return null;
}

// ─────────────────────── Check-Helfer ─────────────────────────

function countBullets(body) {
  let n = 0;
  for (const line of body.split("\n")) {
    if (/^\s*(?:[-*•]|\d+[.)])\s+\S/.test(line)) n++;
  }
  return n;
}

const VISUAL_KEYWORDS = {
  diagram: /\b(diagram|diagramm|flowchart|graph|chart)\b/i,
  protocolExample: /\b(uniswap|aave|compound|curve|makerdao|maker|lido|eigenlayer|sushiswap|balancer|protocol|protokoll)\b/i,
  concept: /\b(concept|konzept|konzeptionell|conceptual)\b/i,
};

function checkVisualRequirements(body) {
  const missing = [];
  if (!VISUAL_KEYWORDS.diagram.test(body)) missing.push("Diagramm");
  if (!VISUAL_KEYWORDS.protocolExample.test(body)) missing.push("Protocol Example");
  if (!VISUAL_KEYWORDS.concept.test(body)) missing.push("Concept Visual");
  return missing;
}

const BREAK_TAG_RE = /<break\s+time\s*=\s*["']?[^"'>]+["']?\s*\/?>/i;

function hasBreakTags(text) {
  return BREAK_TAG_RE.test(text);
}

/**
 * Schaetzt die Sprechdauer eines (deutschen, educational) Voice-Texts.
 * Strippt SSML-Tags, phonetische Hinweise und Sektions-Marker, zaehlt
 * Woerter und rechnet bei 2.5 wps (≈150 wpm) um. <break time="..."/>
 * Pausen werden separat aufaddiert.
 */
function estimateDurationSeconds(voiceText) {
  let breakSeconds = 0;
  const breakTimeRe = /<break\s+time\s*=\s*["']?(\d+(?:\.\d+)?)\s*(ms|s)?["']?\s*\/?>/gi;
  for (const m of voiceText.matchAll(breakTimeRe)) {
    const num = parseFloat(m[1]);
    const unit = (m[2] || "s").toLowerCase();
    if (Number.isFinite(num)) {
      breakSeconds += unit === "ms" ? num / 1000 : num;
    }
  }
  const clean = voiceText
    .replace(/<break[^>]*\/?>/gi, " ")
    .replace(/<\/?emphasis[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[[A-ZÄÖÜa-zäöü\- ]+\]/g, " ")
    .replace(/^#.*$/gm, " ")
    .replace(/^\/\/.*$/gm, " ")
    .replace(/^---+$/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = clean ? clean.split(/\s+/).filter(Boolean).length : 0;
  const WPS = 2.5;
  return Math.round(words / WPS + breakSeconds);
}

// ──────────────────── Minimal JSON-Schema-Validator ────────────────
// Unterstuetzt type/required/properties/items/enum/pattern/minimum/maximum/minItems/maxItems.
// Ausreichend fuer unsere beiden Schemata; wenn spaeter mehr gebraucht wird,
// ist `ajv` der richtige Upgrade-Pfad.

function jsonType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value; // "object", "string", "number", "boolean"
}

function validateAgainstSchema(data, schema, pathStr = "$") {
  const errors = [];

  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actual = jsonType(data);
    const ok = types.some((t) => {
      if (t === "integer") return actual === "number" && Number.isInteger(data);
      return t === actual;
    });
    if (!ok) {
      errors.push(`${pathStr}: type ${actual}, erwartet ${types.join("|")}`);
      return errors;
    }
  }

  if (schema.enum && !schema.enum.includes(data)) {
    errors.push(`${pathStr}: "${String(data)}" nicht in enum ${JSON.stringify(schema.enum)}`);
  }

  if (schema.pattern !== undefined && typeof data === "string") {
    if (!new RegExp(schema.pattern).test(data)) {
      errors.push(`${pathStr}: "${data}" matched pattern ${schema.pattern} nicht`);
    }
  }

  if (typeof data === "number") {
    if (schema.minimum !== undefined && data < schema.minimum) {
      errors.push(`${pathStr}: ${data} < min ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      errors.push(`${pathStr}: ${data} > max ${schema.maximum}`);
    }
  }

  if (Array.isArray(data)) {
    if (schema.minItems !== undefined && data.length < schema.minItems) {
      errors.push(`${pathStr}: ${data.length} items < minItems ${schema.minItems}`);
    }
    if (schema.maxItems !== undefined && data.length > schema.maxItems) {
      errors.push(`${pathStr}: ${data.length} items > maxItems ${schema.maxItems}`);
    }
    if (schema.items) {
      data.forEach((v, i) => {
        errors.push(...validateAgainstSchema(v, schema.items, `${pathStr}[${i}]`));
      });
    }
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (schema.required) {
      for (const key of schema.required) {
        if (!(key in data)) errors.push(`${pathStr}.${key} fehlt`);
      }
    }
    if (schema.properties) {
      for (const [key, subschema] of Object.entries(schema.properties)) {
        if (key in data) {
          errors.push(
            ...validateAgainstSchema(data[key], subschema, `${pathStr}.${key}`),
          );
        }
      }
    }
  }

  return errors;
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    return { ok: false, errors: [`${path.basename(filePath)} fehlt`] };
  }
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return { ok: true, data };
  } catch (e) {
    return { ok: false, errors: [`${path.basename(filePath)}: ungueltiges JSON (${e.message})`] };
  }
}

function loadSchemas() {
  const base = path.dirname(GENERATOR_OUTPUT_DIR); // .../lesson-asset-generator[/lesson-asset-generator]
  const schemasDir = path.join(base, "schemas");
  const vpPath = path.join(schemasDir, "visual_plan.schema.json");
  const vcPath = path.join(schemasDir, "video_config.schema.json");
  const schemas = {};
  if (fs.existsSync(vpPath)) {
    try {
      schemas.visualPlan = JSON.parse(fs.readFileSync(vpPath, "utf8"));
    } catch {
      /* behandelt durch Fallback-Check */
    }
  }
  if (fs.existsSync(vcPath)) {
    try {
      schemas.videoConfig = JSON.parse(fs.readFileSync(vcPath, "utf8"));
    } catch {
      /* behandelt durch Fallback-Check */
    }
  }
  return schemas;
}

// ─────────────────────── Lesson ↔ Datei ───────────────────────

function lessonIdFromFile(file) {
  return path.basename(file, path.extname(file));
}

function parseModuleLesson(lessonId) {
  const m = /^module0*(\d+)-lesson0*(\d+)$/i.exec(lessonId);
  if (!m) return { module: null, lesson: null };
  return { module: parseInt(m[1], 10), lesson: parseInt(m[2], 10) };
}

function prettyName(lessonId) {
  const { module, lesson } = parseModuleLesson(lessonId);
  if (module !== null && lesson !== null) return `Module ${module} Lesson ${lesson}`;
  return lessonId;
}

function collectLessonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectLessonFiles(full));
    else if (entry.isFile() && /\.md$/i.test(entry.name)) out.push(full);
  }
  return out.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

// ─────────────────────── Validierung pro Lesson ─────────────

function validateLesson(file, ctx) {
  const lessonId = lessonIdFromFile(file);
  const errors = [];
  const md = fs.readFileSync(file, "utf8");
  const sections = parseSections(md);

  // 1. Section Presence
  const missingSections = [];
  for (const req of REQUIRED_SECTIONS) {
    if (!findSection(sections, req.aliases)) missingSections.push(req.canonical);
  }
  for (const s of missingSections) errors.push(`Sektion fehlt: ${s}`);

  // 2. Slide Count
  const slideSection = findSection(sections, ["Slide Summary", "Slide-Zusammenfassung"]);
  if (slideSection) {
    const n = countBullets(slideSection.body);
    if (n < 6 || n > 7) errors.push(`Slide Summary hat ${n} Bullets (erwartet 6–7)`);
  }

  // 3. Visual Requirements
  const visSection = findSection(sections, [
    "Visual Suggestions",
    "Visuelle Vorschläge",
    "Visuelle Vorschlaege",
  ]);
  if (visSection) {
    const missingVisuals = checkVisualRequirements(visSection.body);
    for (const m of missingVisuals) errors.push(`Visual Suggestions: ${m} fehlt`);
  }

  // 5. Duration Estimate aus Source
  const voiceSection = findSection(sections, [
    "Voice Narration Script",
    "Sprecher-Skript",
    "Voiceover-Skript",
  ]);
  let sourceDuration = null;
  if (voiceSection) {
    sourceDuration = estimateDurationSeconds(voiceSection.body);
  }

  // Checks 4 + 6 gegen Generator-Output
  let configDuration = null;
  if (!ctx.skipGenerated) {
    const outDir = path.join(GENERATOR_OUTPUT_DIR, lessonId);
    if (!fs.existsSync(outDir)) {
      errors.push(
        `Generator-Output fehlt: ${path.relative(ROOT, outDir)} — erst lesson-asset-generator laufen lassen`,
      );
    } else {
      // 4. Voice Script enthaelt <break time="..."/>
      const voicePath = path.join(outDir, "voice_script.txt");
      if (!fs.existsSync(voicePath)) {
        errors.push("voice_script.txt fehlt");
      } else {
        const voiceText = fs.readFileSync(voicePath, "utf8");
        if (!hasBreakTags(voiceText)) {
          errors.push('voice_script.txt enthaelt kein <break time="..."/>');
        }
      }

      // 6. JSON Validation
      const vpPath = path.join(outDir, "visual_plan.json");
      const vcPath = path.join(outDir, "video_config.json");

      const vpRead = readJson(vpPath);
      if (!vpRead.ok) {
        for (const e of vpRead.errors) errors.push(e);
      } else if (ctx.schemas.visualPlan) {
        const schemaErrors = validateAgainstSchema(vpRead.data, ctx.schemas.visualPlan, "visual_plan");
        for (const e of schemaErrors) errors.push(e);
      }

      const vcRead = readJson(vcPath);
      if (!vcRead.ok) {
        for (const e of vcRead.errors) errors.push(e);
      } else {
        if (ctx.schemas.videoConfig) {
          const schemaErrors = validateAgainstSchema(
            vcRead.data,
            ctx.schemas.videoConfig,
            "video_config",
          );
          for (const e of schemaErrors) errors.push(e);
        }
        const cfgDur = vcRead.data?.duration_seconds;
        if (typeof cfgDur === "number") {
          configDuration = cfgDur;
        }
      }
    }
  }

  // 5. Duration-Range-Check (nutzt generierten Wert wenn da, sonst Schaetzung)
  const effectiveDuration = configDuration ?? sourceDuration;
  if (effectiveDuration !== null) {
    if (effectiveDuration < 300 || effectiveDuration > 600) {
      const src = configDuration !== null ? "video_config.json" : "Source-Narration geschaetzt";
      errors.push(`Video-Dauer ${effectiveDuration}s (${src}) — erwartet 300–600s`);
    }
  }

  return { lessonId, file, errors, effectiveDuration };
}

// ───────────────────────────── Main ─────────────────────────

function main() {
  console.log(`[validate:lessons] Scanne ${path.relative(ROOT, LESSONS_DIR) || LESSONS_DIR}/`);

  if (!fs.existsSync(LESSONS_DIR)) {
    console.error(`[validate:lessons] Verzeichnis nicht gefunden: ${LESSONS_DIR}`);
    console.error(
      "  Lege Lektionen im Video-Pipeline-Format (z. B. module04-lesson02.md) dort ab",
    );
    console.error("  oder setze --lessons-dir <pfad>.");
    process.exit(1);
  }

  const files = collectLessonFiles(LESSONS_DIR);
  if (files.length === 0) {
    console.error(`[validate:lessons] Keine .md-Dateien in ${LESSONS_DIR} gefunden.`);
    process.exit(1);
  }

  const ctx = {
    skipGenerated: CLI.skipGenerated,
    schemas: CLI.skipGenerated ? {} : loadSchemas(),
  };

  if (!ctx.skipGenerated && !fs.existsSync(GENERATOR_OUTPUT_DIR)) {
    console.warn(
      `[validate:lessons] Hinweis: Generator-Output ${path.relative(ROOT, GENERATOR_OUTPUT_DIR)} existiert nicht.`,
    );
    console.warn("  Checks 4 + 6 werden pro Lektion als Fehler gemeldet werden.");
    console.warn("  Alternative: --skip-generated setzen, um nur Source zu pruefen.");
  }

  const results = files.map((f) => validateLesson(f, ctx));
  let failed = 0;
  for (const r of results) {
    const name = prettyName(r.lessonId);
    if (r.errors.length === 0) {
      console.log(`\u2714 ${name} OK`);
    } else {
      failed++;
      for (const err of r.errors) {
        console.log(`\u2716 ${name} ${err}`);
      }
    }
  }

  console.log(""); // leere Zeile vor Fazit

  if (failed > 0) {
    console.error(
      `[validate:lessons] Fehlgeschlagen: ${failed}/${results.length} Lektion(en) mit Problemen`,
    );
    process.exit(1);
  }

  console.log(`[validate:lessons] All lessons validated successfully. (${results.length}/${results.length})`);
}

main();
