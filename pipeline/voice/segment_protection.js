"use strict";

/** Schützt Formeln, Code, URLs, SSML und Folien-Marker vor Text-Transformationen. */
function protectVoiceSegments(text) {
  const patterns = [
    /```[\s\S]*?```/g,
    /`[^`]*`/g,
    /\$\$[\s\S]*?\$\$/g,
    /\$[^$\n]+\$/g,
    /\\\([^)]*\\\)/g,
    /https?:\/\/[^\s)'"<>]+/gi,
    /<\s*break\b[^>]*\/?>/gi,
    /<\s*emphasis\b[^>]*>[\s\S]*?<\/\s*emphasis\s*>/gi,
    /\*\*\[Slide\s*\d+\](?:[^*\n]+)?\*\*/gi,
    /\[Slide\s+\d+\]/gi,
    /\bSlide\s+\d+\b/gi,
    /\bFolie\s+\d+\b/gi,
  ];

  const map = [];
  let out = text;
  let idx = 0;
  for (const re of patterns) {
    out = out.replace(re, (m) => {
      const token = `__VP_PROTECT_${idx++}__`;
      map.push([token, m]);
      return token;
    });
  }
  return { out, map };
}

function unprotectVoiceSegments(text, map) {
  let out = text;
  for (const [token, original] of map) {
    // Kein replaceAll(..., original): "$" im Original (z. B. $$…$$) wäre
    // Ersetzungs-Syntax und würde Abschneiden / falsch expandieren.
    if (!token) continue;
    out = out.split(token).join(original);
  }
  return out;
}

module.exports = { protectVoiceSegments, unprotectVoiceSegments };
