"use strict";

const { optimizeVoiceScript } = require("./script_optimizer");
const { applyPronunciationProcessor } = require("./preprocess_voice_script");

/**
 * Volle Text-Pipeline nach Sanitize:
 * Script Optimizer (Zahlen + Satzlänge + Prosody) → Pronunciation → ElevenLabs-Input
 */
function prepareVoiceForElevenLabs(sanitizedText) {
  const optimized = optimizeVoiceScript(sanitizedText);
  return applyPronunciationProcessor(optimized);
}

module.exports = { prepareVoiceForElevenLabs };
