/**
 * extract-voice-text.js
 *
 * Extrahiert aus einer geparsten Lektion den REINEN Sprechertext, der an
 * ElevenLabs geschickt wird — ohne Markdown, ohne Slide-Marker, ohne
 * Übungen, ohne Quiz, ohne Visuals.
 *
 * Ausgabe-Optionen:
 *   - "plain"   : reiner Fließtext, zusammenhängend (eine Slide pro Absatz)
 *   - "marked"  : mit SSML-kompatiblen <break>-Tags zwischen Slides
 *     (für ElevenLabs-v1-API, die diese interpretiert)
 *   - "per_slide": Array { slide_number, text } — für slice-weise Audio
 *
 * Absolute Regel: Der Content kommt AUSSCHLIESSLICH aus slides[i].narration.
 * Alles andere (objectives, explanation, exercise, quiz_raw) wird
 * komplett ignoriert.
 */

'use strict';

function stripMarkdown(text) {
  if (!text) return '';
  return text
    // Bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Inline code
    .replace(/`([^`]+)`/g, '$1')
    // Links [text](url) → text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Stray markdown chars
    .replace(/^\s*[-*•]\s+/gm, '')
    .replace(/^\s*#+\s+/gm, '')
    // Collapse whitespace within a line, keep blank lines
    .split(/\n/)
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildVoiceText(lesson, { mode = 'plain', pause_between_slides_ms = 700 } = {}) {
  if (mode === 'per_slide') {
    return lesson.slides.map((s) => ({
      slide_number: s.number,
      text: stripMarkdown(s.narration),
      word_count: wordCount(s.narration),
    }));
  }

  const parts = lesson.slides.map((s) => stripMarkdown(s.narration)).filter(Boolean);

  if (mode === 'marked') {
    // ElevenLabs-style SSML-compatible breaks
    return parts.join(`\n\n<break time="${pause_between_slides_ms}ms"/>\n\n`);
  }

  // plain
  return parts.join('\n\n');
}

function wordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Validate that narration contains nothing from excluded sections.
 * Returns an object { clean: true/false, contaminations: [...] }.
 */
function validateCleanNarration(lesson) {
  const full = lesson.slides.map((s) => s.narration).join('\n\n');
  const contaminations = [];

  // 1. Kein Multiple-Choice-Pattern
  if (/^\s*[Aa]\)\s+.+\n\s*[Bb]\)/m.test(full)) {
    contaminations.push('multiple choice options (A)/B)/C)) found');
  }
  // 2. Keine Fragenummerierung "Frage 1:" / "Question 1:"
  if (/\b(Frage|Question)\s+\d+\s*:/m.test(full)) {
    contaminations.push('question marker (Frage N:) found');
  }
  // 3. Keine Quiz-Antwort-Marker
  if (/\bKorrekte?\s+(Antwort|Answer)\s*:/i.test(full)) {
    contaminations.push('quiz answer key found');
  }
  // 4. Keine "Übung"-/"Exercise"-Überschrift-Reste
  if (/^(Übung|Exercise|Aufgabe)\s*:/m.test(full)) {
    contaminations.push('exercise header found');
  }
  // 5. Keine Visual-Hinweise wie "SCREENSHOT SUGGESTION:"
  if (/SCREENSHOT\s+SUGGESTION/i.test(full)) {
    contaminations.push('screenshot suggestion marker found');
  }
  // 6. Keine Slide-Marker mehr (die sollten vom Parser entfernt sein)
  if (/\*\*\[Slide\s+\d+\]/i.test(full)) {
    contaminations.push('unstripped [Slide N] markers');
  }

  return {
    clean: contaminations.length === 0,
    contaminations,
  };
}

module.exports = { buildVoiceText, validateCleanNarration, stripMarkdown, wordCount };
