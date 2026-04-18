/**
 * generate-voice-script.js
 *
 * Erzeugt voice_script.txt — ein fuer ElevenLabs optimiertes deutsches
 * Narrations-Skript, strukturiert nach Slide-Timing.
 *
 * Regeln:
 *   - Natuerlicher, lehrender, ruhiger Ton
 *   - Englische DeFi-Begriffe werden beibehalten (Liquidity Pool, Swap, APY),
 *     aber phonetische Hinweise in eckigen Klammern fuer ElevenLabs
 *   - Pausen-Markierung via <break time="..."/> (SSML-kompatibler Hinweis,
 *     den ElevenLabs interpretiert)
 *   - Abschnittsweise: eine Sprech-Sektion pro Slide
 *   - Der Content-Agent-Text wird NICHT veraendert; nur formatiert und
 *     mit Pausen/Betonungshinweisen versehen, wenn das Rohmaterial sie
 *     nicht vorgibt
 */

'use strict';

const PHONETIC_HINTS = [
  { term: 'APY', hint: 'A-P-Y' },
  { term: 'APR', hint: 'A-P-R' },
  { term: 'LTV', hint: 'L-T-V' },
  { term: 'AMM', hint: 'A-M-M' },
  { term: 'DEX', hint: 'Dex' },
  { term: 'DeFi', hint: 'DeFi' },
  { term: 'TVL', hint: 'T-V-L' },
  { term: 'ERC-20', hint: 'E-R-C zwanzig' },
  { term: 'ERC20', hint: 'E-R-C zwanzig' },
  { term: 'ETH', hint: 'E-T-H' },
  { term: 'USDC', hint: 'U-S-D-C' },
  { term: 'USDT', hint: 'U-S-D-T' },
  { term: 'DAI', hint: 'D-A-I' },
  { term: 'MEV', hint: 'M-E-V' },
  { term: 'NFT', hint: 'N-F-T' },
];

function annotateAcronyms(text, seenTerms) {
  let out = text;
  for (const { term, hint } of PHONETIC_HINTS) {
    const regex = new RegExp(`\\b${term}\\b`, 'g');
    if (regex.test(out) && !seenTerms.has(term)) {
      // only annotate first occurrence across entire script
      out = out.replace(regex, (match, offset) => {
        if (!seenTerms.has(term)) {
          seenTerms.add(term);
          return `${match} [${hint}]`;
        }
        return match;
      });
    }
  }
  return out;
}

function fallbackNarrationForSection(section, slide, lesson) {
  // If the Content Agent did not provide narration for this section, we
  // assemble a minimal sentence from the bullets WITHOUT inventing new facts.
  // The idea: read the bullets as a sentence — factual, no embellishment.
  const bullets = slide.bullets || [];
  if (bullets.length === 0) return '';

  switch (section) {
    case 'lesson_title':
      return `In dieser Lektion behandeln wir das Thema ${lesson.title}. Die Lernziele sind: ${bullets.join('. ')}.`;
    case 'concept':
      return `Zum Konzept: ${bullets.join('. ')}.`;
    case 'mechanism':
      return `Zum Mechanismus: ${bullets.join('. ')}.`;
    case 'system_architecture':
      return `Zur Systemarchitektur: ${bullets.join('. ')}.`;
    case 'risk_layer':
      return `Zur Risikoebene: ${bullets.join('. ')}.`;
    case 'protocol_example':
      return `Als Protokollbeispiel: ${bullets.join('. ')}.`;
    case 'key_takeaways':
      return `Zusammenfassung: ${bullets.map((b, i) => `${i + 1}. ${b}`).join(' ')}.`;
    default:
      return bullets.join('. ') + '.';
  }
}

function formatForElevenLabs(text, isSectionTransition) {
  // Add subtle pauses at sentence boundaries and a longer pause at section transitions.
  // ElevenLabs interpretiert <break time="..."/> in SSML-kompatibler Form.
  let out = text.trim();

  // Normalize whitespace
  out = out.replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n');

  // Add a short pause after every sentence-ending punctuation (only once).
  out = out.replace(/([.!?])\s+(?=[A-ZÄÖÜ])/g, '$1 <break time="350ms"/> ');

  // Emphasize key phrases wrapped in **...** (if the Content Agent used them)
  out = out.replace(/\*\*([^*]+)\*\*/g, '<emphasis level="moderate">$1</emphasis>');

  return out;
}

function buildVoiceScript(lesson, slidePlan, options = {}) {
  const { meta, title } = lesson;
  const { slides } = slidePlan;

  const voiceId = options.voice_id || 'de-male-educational-01';
  const pauseBetweenSlides = options.pause_between_slides_ms || 700;

  const lines = [];

  lines.push('# ELEVENLABS VOICE SCRIPT');
  lines.push('');
  lines.push(`# Lesson: ${meta.lesson_id}`);
  lines.push(`# Title: ${title}`);
  lines.push(`# Language: de`);
  lines.push(`# Voice ID: ${voiceId}`);
  lines.push(`# Tone: educational, calm, professional instructor`);
  lines.push(`# Stability: 0.55   (stabile Lehrstimme, leichte Varianz)`);
  lines.push(`# Similarity Boost: 0.75`);
  lines.push(`# Style: 0.25`);
  lines.push('');
  lines.push('# Hinweise:');
  lines.push('# - <break time="..."/> setzt eine Pause.');
  lines.push('# - <emphasis> hebt Schluesselbegriffe an.');
  lines.push('# - Akronyme bekommen beim ersten Auftreten eine phonetische Hilfe in [Klammern].');
  lines.push('# - Zwischen Slides kein Text sprechen; Pause wird von der Render-Pipeline gesetzt.');
  lines.push('');
  lines.push('---');
  lines.push('');

  const seenTerms = new Set();
  const slideScripts = [];

  slides.forEach((slide, i) => {
    let raw = slide.narration && slide.narration.trim().length > 0
      ? slide.narration
      : fallbackNarrationForSection(slide.section, slide, lesson);

    if (!raw) raw = ''; // truly empty section — leave empty block

    // annotate acronyms (first occurrence)
    const annotated = annotateAcronyms(raw, seenTerms);

    // ElevenLabs formatting
    const formatted = formatForElevenLabs(annotated, false);

    const slideNum = i + 1;
    lines.push(`## Slide ${slideNum} · ${slide.title}`);
    lines.push(`# section: ${slide.section}`);
    lines.push('');
    lines.push(formatted);
    lines.push('');
    if (i < slides.length - 1) {
      lines.push(`<break time="${pauseBetweenSlides}ms"/>`);
      lines.push('');
    }
    lines.push('---');
    lines.push('');

    slideScripts.push({ slide_id: slide.id, text: formatted });
  });

  lines.push('# END OF SCRIPT');

  return {
    text: lines.join('\n'),
    slideScripts, // used downstream for timing calculation
    voiceId,
  };
}

module.exports = { buildVoiceScript };
