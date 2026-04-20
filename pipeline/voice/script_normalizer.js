#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
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

function numberToWords(n) {
  const ones = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  if (!Number.isFinite(n)) return String(n);
  if (n < 0) return `minus ${numberToWords(Math.abs(n))}`;
  if (n < 20) return ones[n];
  if (n < 100) {
    const t = Math.floor(n / 10);
    const r = n % 10;
    return r ? `${tens[t]} ${ones[r]}` : tens[t];
  }
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const r = n % 100;
    return r ? `${ones[h]} hundred ${numberToWords(r)}` : `${ones[h]} hundred`;
  }
  if (n < 1000000) {
    const k = Math.floor(n / 1000);
    const r = n % 1000;
    return r ? `${numberToWords(k)} thousand ${numberToWords(r)}` : `${numberToWords(k)} thousand`;
  }
  if (n < 1000000000) {
    const m = Math.floor(n / 1000000);
    const r = n % 1000000;
    return r ? `${numberToWords(m)} million ${numberToWords(r)}` : `${numberToWords(m)} million`;
  }
  const b = Math.floor(n / 1000000000);
  const r = n % 1000000000;
  return r ? `${numberToWords(b)} billion ${numberToWords(r)}` : `${numberToWords(b)} billion`;
}

/**
 * Prozent, Währungs-Kürzel ($10B), k/M/B-Suffixe, gängige lateinische Abkürzungen.
 */
function normalizeVoiceScript(rawText) {
  const { out: prot, map } = protectVoiceSegments(rawText);
  let text = prot;

  text = text.replace(/(?<![\p{L}\p{N}_])(\d{1,3})%(?![\p{L}\p{N}_])/gu, (_m, n) => {
    return `${numberToWords(Number(n))} percent`;
  });

  text = text.replace(/\$([0-9]+(?:\.[0-9]+)?)([BMK])\b/gi, (_m, num, suffix) => {
    const suffixMap = { K: "thousand", M: "million", B: "billion" };
    const s = suffixMap[String(suffix).toUpperCase()] || "";
    const v = Number(num);
    if (!Number.isFinite(v)) return _m;
    const rounded = Number.isInteger(v)
      ? numberToWords(v)
      : `${numberToWords(Math.floor(v))} point ${String(v).split(".")[1]}`;
    return `${rounded} ${s} dollars`.trim();
  });

  text = text.replace(/\b([0-9]+(?:\.[0-9]+)?)\s*([kKmMbB])\b/gi, (_m, num, suf) => {
    const v = Number(num);
    if (!Number.isFinite(v)) return _m;
    const mult = { k: 1000, K: 1000, m: 1000000, M: 1000000, b: 1000000000, B: 1000000000 }[suf];
    if (!mult) return _m;
    const scaled = v * mult;
    if (scaled >= 1000000000) {
      const b = scaled / 1000000000;
      return Number.isInteger(b) ? `${numberToWords(b)} billion` : `${numberToWords(Math.floor(b))} point ${String(b).split(".")[1] || "0"} billion`;
    }
    if (scaled >= 1000000) {
      const m = scaled / 1000000;
      return Number.isInteger(m) ? `${numberToWords(m)} million` : `${numberToWords(Math.floor(m))} point ${String(m).split(".")[1] || "0"} million`;
    }
    if (scaled >= 1000) {
      const k = scaled / 1000;
      return Number.isInteger(k) ? `${numberToWords(k)} thousand` : `${numberToWords(Math.floor(k))} point ${String(k).split(".")[1] || "0"} thousand`;
    }
    return numberToWords(scaled);
  });

  const abbrevs = [
    [/\b(?:e\.g\.|eg\.)\s*/gi, "for example "],
    [/\b(?:i\.e\.|ie\.)\s*/gi, "that is "],
    [/\betc\.\s*/gi, "and so on "],
    [/\bvs\.\s*/gi, "versus "],
    [/\bapprox\.\s*/gi, "approximately "],
  ];
  for (const [re, rep] of abbrevs) {
    text = text.replace(re, rep);
  }

  return unprotectVoiceSegments(text, map);
}

function printHelp() {
  console.log(
    [
      "DeFi Academy · script_normalizer",
      "",
      "  node pipeline/voice/script_normalizer.js --input in.txt --output out.txt",
    ].join("\n")
  );
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const root = process.cwd();
  const inputPath = path.resolve(root, args.input || "voice_script.txt");
  const outputPath = path.resolve(root, args.output || "voice_script_normalized.txt");
  if (!fs.existsSync(inputPath)) throw new Error(`Input nicht gefunden: ${inputPath}`);
  const raw = fs.readFileSync(inputPath, "utf8");
  const out = normalizeVoiceScript(raw);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, out, "utf8");
  console.log(`✔ normalized: ${outputPath}`);
}

if (require.main === module) {
  main();
}

module.exports = { normalizeVoiceScript, numberToWords };
