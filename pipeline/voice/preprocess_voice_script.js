#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_DICT_PATH = path.join(__dirname, "pronunciation_dictionary.json");

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      out[key] = next;
      i++;
    } else {
      out[key] = true;
    }
  }
  return out;
}

function printHelp() {
  console.log(
    [
      "DeFi Academy · Voice Preprocessor (Aussprache-Woerterbuch)",
      "",
      "Liest voice_script.txt, ersetzt nur bekannte Krypto-/Protokoll-Begriffe",
      "(pronunciation_dictionary.json). Zahlen, Formeln, Code, URLs, SSML und",
      "Folien-/Slide-Referenzen bleiben geschuetzt (segment_protection.js).",
      "",
      "Typischer manueller Schritt vor ElevenLabs:",
      "  voice_script.txt  →  preprocess_voice_script.js  →  voice_script_clean.txt",
      "",
      "Im automatischen Lauf (npm run generate:voice) kommt der Preprocessor",
      "nach dem Script Optimizer in prepareVoiceForElevenLabs() (voice_pipeline.js).",
      "",
      "Usage (Defaults: ./voice_script.txt → ./voice_script_clean.txt):",
      "  node pipeline/voice/preprocess_voice_script.js",
      "  node pipeline/voice/preprocess_voice_script.js \\",
      "    --input path/to/voice_script.txt \\",
      "    --output path/to/voice_script_clean.txt",
      "  node pipeline/voice/preprocess_voice_script.js --dict path/to/custom.json",
      "",
      "API (require):",
      "  const { applyPronunciationProcessor, loadPronunciationDictionary } = require('./preprocess_voice_script');",
    ].join("\n")
  );
}

const { protectVoiceSegments, unprotectVoiceSegments } = require("./segment_protection");

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildMatcher(key) {
  if (/\s/.test(key)) {
    const parts = key
      .trim()
      .split(/\s+/)
      .map((p) => escapeRegExp(p))
      .filter(Boolean);
    return new RegExp(parts.join("\\s+"), "gi");
  }
  const esc = escapeRegExp(key);
  return new RegExp(`(?<![\\p{L}\\p{N}_])${esc}(?![\\p{L}\\p{N}_])`, "giu");
}

function loadPronunciationDictionary(dictPath = DEFAULT_DICT_PATH) {
  const raw = fs.readFileSync(dictPath, "utf8");
  const obj = JSON.parse(raw);
  if (typeof obj !== "object" || obj === null) {
    throw new Error(`Ungültiges Wörterbuch: ${dictPath}`);
  }
  return obj;
}

/**
 * Ersetzt bekannte Fachbegriffe durch TTS-freundliche Aussprache-Hilfen.
 * Geschuetzt bleiben u. a.: Code-Fences/Inline-Code, Display-/Inline-Math,
 * URLs, SSML-Tags, Slide-/Folien-Marker (siehe protectVoiceSegments).
 * Woerterbuch-Treffer nutzen Wortgrenzen — reine Zahlen werden nicht ersetzt.
 */
function applyPronunciationProcessor(text, dict) {
  const d = dict && typeof dict === "object" ? dict : loadPronunciationDictionary();
  const { out: protectedText, map } = protectVoiceSegments(text);
  const keys = Object.keys(d).sort((a, b) => b.length - a.length);
  let cur = protectedText;
  for (const key of keys) {
    const val = d[key];
    if (val == null || val === "") continue;
    const re = buildMatcher(key);
    cur = cur.replace(re, val);
  }
  return unprotectVoiceSegments(cur, map);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const root = process.cwd();
  const inputPath = path.resolve(root, args.input || "voice_script.txt");
  const outputPath = path.resolve(root, args.output || "voice_script_clean.txt");
  const dictPath = args.dict ? path.resolve(root, args.dict) : DEFAULT_DICT_PATH;

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input nicht gefunden: ${inputPath}`);
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const dict = loadPronunciationDictionary(dictPath);
  const clean = applyPronunciationProcessor(raw, dict);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, clean, "utf8");
  console.log(`✔ voice_script_clean geschrieben: ${outputPath}`);
}

if (require.main === module) {
  main();
}

const applyPronunciationEngine = applyPronunciationProcessor;

module.exports = {
  applyPronunciationProcessor,
  applyPronunciationEngine,
  loadPronunciationDictionary,
  protectSegments: protectVoiceSegments,
  unprotectSegments: unprotectVoiceSegments,
};
