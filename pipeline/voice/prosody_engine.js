"use strict";

/**
 * Pausen und leichte Sprechgliederung für TTS (nach Pronunciation Engine).
 */
function applyProsody(text) {
  const keyStatementRegex =
    /\b(Wichtig|Merke|Achte darauf|Zusammengefasst|Key Takeaway|Risiko|Kernaussage|Entscheidend|Beachte)\b/i;

  const parts = text.split(/([.!?]+(?:\s+|$))/);
  let out = "";
  for (let i = 0; i < parts.length; i += 2) {
    const sentence = (parts[i] || "").trim();
    const punct = parts[i + 1] || "";
    if (!sentence) continue;
    const needsPause = keyStatementRegex.test(sentence);
    const trailer = needsPause ? " ..." : "";
    out += `${sentence}${punct.trimEnd()}${trailer} `;
  }
  return out.trim();
}

module.exports = { applyProsody };
