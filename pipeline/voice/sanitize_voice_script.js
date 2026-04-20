"use strict";

/**
 * Entfernt Markdown-/Folien-Artefakte aus Sprechertext (ElevenLabs).
 * Vereinheitlicht generate-voice.js und pipeline-test/src/lib/tts.js.
 */
function sanitizeVoiceScript(raw) {
  const slideLineOnly =
    /^\*\*\[Slide\s*\d+\](?:\s*[—–\-]\s*[^*\n]+)?\*\*\s*$/;
  const slidePrefix =
    /^\*\*\[Slide\s*\d+\](?:\s*[—–\-]\s*[^*]+)?\*\*\s*/;

  const kept = [];
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#")) continue;
    if (/^-{3,}$/.test(trimmed)) continue;
    if (slideLineOnly.test(trimmed)) continue;
    const cleaned = line.replace(slidePrefix, "");
    if (cleaned.trim().length === 0) continue;
    kept.push(cleaned);
  }
  let text = kept.join("\n");
  text = text.replace(/(\w[\w-]*)\s*\[\s*\1\s*\]/g, "$1");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

module.exports = { sanitizeVoiceScript };
