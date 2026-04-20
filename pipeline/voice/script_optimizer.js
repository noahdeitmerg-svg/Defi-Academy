#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { normalizeVoiceScript } = require("./script_normalizer");
const { applyProsody } = require("./prosody_engine");
const { protectVoiceSegments, unprotectVoiceSegments } = require("./segment_protection");

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
      "DeFi Academy · Script Optimizer (TTS-Vorbereitung)",
      "",
      "  node pipeline/voice/script_optimizer.js --input in.txt --output out.txt",
      "",
      "In einem Durchlauf:",
      "  • Zahlen/Prozent/$-Kürzel/k·M·B → gesprochene Form (script_normalizer)",
      "  • lange Sätze splitten (Ziel ≤ ca. 18 Wörter), Aufzählungen glätten",
      "  • Pausen „...“ nach Schlüssel-Sätzen (prosody_engine)",
      "  • Formeln/Code/URLs/Slides geschützt (segment_protection)",
      "",
      "Pipeline: voice_script.txt → Script Optimizer → Pronunciation → ElevenLabs",
    ].join("\n")
  );
}

/** Lange Zeilen mit mehreren Semikolons in kürzere TTS-Sätze teilen. */
function restructureEnumerations(line) {
  const t = line.trim();
  if (t.length < 100) return line;
  const semiCount = (t.match(/;/g) || []).length;
  if (semiCount >= 2) return t.replace(/;\s+/g, ". ");
  return line;
}

function splitLongSentence(sentence, maxWords = 18) {
  function inner(part) {
    const trimmed = part.trim();
    if (!trimmed) return "";
    const words = trimmed.split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) return trimmed;

    const commaParts = trimmed.split(/,\s*/);
    if (commaParts.length > 1) {
      const rebuilt = commaParts
        .map((p) => inner(p))
        .filter(Boolean)
        .join(". ");
      const w2 = rebuilt.split(/\s+/).filter(Boolean);
      if (w2.length <= maxWords) return rebuilt;
    }

    const head = words.slice(0, maxWords).join(" ");
    const tail = words.slice(maxWords).join(" ");
    return `${head}. ${inner(tail)}`.trim();
  }
  return inner(sentence);
}

/**
 * Nur Struktur (Satzlängen, Aufzählungen) — nach Normalisierung der Zahlen.
 * Geschützte Segmente bleiben unverändert.
 */
function optimizeSentenceStructure(rawText) {
  const { out: protectedText, map } = protectVoiceSegments(rawText);

  let text = protectedText
    .split(/\n+/)
    .map((line) => {
      const restructured = restructureEnumerations(line);
      const trimmed = restructured.trim();
      if (!trimmed) return "";

      const sentenceParts = trimmed.split(/(?<=[.!?])\s+/);
      return sentenceParts
        .map((s) => splitLongSentence(s, 18))
        .join(" ")
        .replace(/\s{2,}/g, " ")
        .trim();
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");

  return unprotectVoiceSegments(text, map);
}

/**
 * Script Optimizer: Normalisierung → Satzstruktur → Prosody.
 * Danach in der Voice-Pipeline: Pronunciation Processor (Wörterbuch).
 */
function optimizeVoiceScript(rawText) {
  const normalized = normalizeVoiceScript(rawText);
  const structured = optimizeSentenceStructure(normalized);
  return applyProsody(structured);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const root = process.cwd();
  const inputPath = path.resolve(root, args.input || "voice_script.txt");
  const outputPath = path.resolve(root, args.output || "voice_script_optimized.txt");

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input nicht gefunden: ${inputPath}`);
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const optimized = optimizeVoiceScript(raw.trim());
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, optimized, "utf8");
  console.log(`✔ voice_script_optimized geschrieben: ${outputPath}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  optimizeVoiceScript,
  optimizeSentenceStructure,
  protectVoiceSegments,
  splitLongSentence,
  restructureEnumerations,
  unprotectVoiceSegments,
};
