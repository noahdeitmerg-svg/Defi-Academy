"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { normalizeVoiceScript } = require("../script_normalizer");
const { optimizeVoiceScript } = require("../script_optimizer");
const { applyProsody } = require("../prosody_engine");
const { prepareVoiceForElevenLabs } = require("../voice_pipeline");

function longestSentenceWordCount(text) {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return Math.max(
    0,
    ...sentences.map((s) => s.split(/\s+/).filter(Boolean).length)
  );
}

test("normalizer: Prozent und Dollar-Kürzel", () => {
  const out = normalizeVoiceScript("Wir sehen 50% und $10B TVL.");
  assert.match(out, /fifty percent/);
  assert.match(out, /ten billion dollars/);
});

test("normalizer: k/M/B-Suffixe", () => {
  assert.match(normalizeVoiceScript("10k Nutzer"), /ten thousand/);
  assert.match(normalizeVoiceScript("2.5M TVL"), /two point 5 million|two million/);
});

test("optimizer splittet sehr lange Sätze", () => {
  const input =
    "Dieses Modul erklaert die Marktmechanik sehr detailliert und zeigt wie Liquiditaet, Slippage und Preiswirkung zusammenarbeiten damit du die Folgen fuer Positionen in volatilen Maerkten sauber einschaetzen kannst.";
  const optimized = optimizeVoiceScript(input);
  assert.ok(
    longestSentenceWordCount(optimized) <= 20,
    "Lange Saetze sollten gekuerzt werden"
  );
});

test("script optimizer: Slide-Nummerierung bleibt bei Struktur-Optimierung", () => {
  const input =
    "Siehe Slide 4 und **[Slide 5]** in einem sehr langen Satz der unbedingt gesplittet werden muss weil er viel zu viele Woerter hat und sonst schlecht klingt und noch mehr Fuelltext braucht.";
  const out = optimizeVoiceScript(input);
  assert.match(out, /\bSlide 4\b/);
  assert.match(out, /\*\*\[Slide 5\]\*\*/);
});

test("script optimizer: Zahlen + Prosody in einem Schritt", () => {
  const input =
    "Wichtig: Wir messen 50% in einem einzigen sehr langen Satz der unbedingt gesplittet werden muss weil er viel zu viele Woerter enthaelt und sonst schlecht klingt.";
  const out = optimizeVoiceScript(input);
  assert.match(out, /fifty percent/);
  assert.match(out, /\.\.\./);
  assert.ok(longestSentenceWordCount(out) <= 20);
});

test("prepareVoice: Reihenfolge Optimizer dann Woerterbuch, Inhalt bleibt konsistent", () => {
  const input =
    "In DeFi messen wir 50% und MEV bei Uniswap in einem sehr langen Satz der gesplittet werden sollte damit TTS verstaendlich bleibt und wir genug Testmaterial haben.";
  const out = prepareVoiceForElevenLabs(input);
  assert.match(out, /fifty percent/);
  assert.match(out, /Dee-Fi/);
  assert.match(out, /M E V/);
  assert.match(out, /Uni-swap/);
  assert.ok(longestSentenceWordCount(out) <= 22);
});

test("prosody: Pausen nach Schluesselwort Wichtig", () => {
  const input = "Wichtig: Wir pruefen das jetzt.";
  const out = applyProsody(input);
  assert.match(out, /\.\.\./);
});

test("prepareVoice: Woerterbuch nach Pipeline", () => {
  const input = "In DeFi analysieren wir MEV bei Uniswap und ERC-20 Token.";
  const out = prepareVoiceForElevenLabs(input);
  assert.match(out, /Dee-Fi/);
  assert.match(out, /M E V/);
  assert.match(out, /Uni-swap/);
  assert.match(out, /E R C twenty/);
});

test("prepareVoice: URLs, Formeln, Code und Slides bleiben", () => {
  const input = [
    "Slide 3 zeigt die Formel $x*y=k$.",
    "Siehe https://defi.example.org/docs fuer Details.",
    "Code: `const mev = true;`",
    "50% der Fees gehen an LPs und $10B fliessen in TVL.",
  ].join("\n");
  const out = prepareVoiceForElevenLabs(input);
  assert.match(out, /Slide 3/);
  assert.match(out, /\$x\*y=k\$/);
  assert.match(out, /https:\/\/defi\.example\.org\/docs/);
  assert.match(out, /`const mev = true;`/);
  assert.match(out, /fifty percent/);
  assert.match(out, /ten billion dollars/);
});

test("prepareVoice: Display-Math $$...$$ und Jahreszahl bleiben, DeFi ersetzt", () => {
  const input =
    "Seit 2024 nutzen wir DeFi. Display: $$E = mc^2$$ und **[Slide 2]** Marker.";
  const out = prepareVoiceForElevenLabs(input);
  assert.match(out, /\$\$E = mc\^2\$\$/);
  assert.match(out, /2024/);
  assert.match(out, /Dee-Fi/);
  assert.match(out, /\*\*\[Slide 2\]\*\*/);
});

test("SSML break bleibt in prepareVoice erhalten", () => {
  const input =
    "Wichtig: Test. <break time=\"0.4s\"/> Danach geht es weiter mit vielen weiteren Details und Erklaerungen zum Thema.";
  const out = prepareVoiceForElevenLabs(input);
  assert.match(out, /<break time="0\.4s"\s*\/>/);
});

test("pronunciation engine alias", () => {
  const { applyPronunciationEngine } = require("../preprocess_voice_script");
  assert.equal(typeof applyPronunciationEngine, "function");
});
