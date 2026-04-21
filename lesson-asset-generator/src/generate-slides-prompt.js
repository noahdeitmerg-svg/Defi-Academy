/**
 * generate-slides-prompt.js
 *
 * Erzeugt `slides_prompt.txt` fuer Gamma (und aehnliche Generatoren).
 *
 * **Wichtig:** Der Text ist absichtlich **extrem kurz** — pro Seite nur ein
 * englischer Bildbefehl (wie „generate one image: …“). Keine
 * Lektionsabsaetze, keine Kontext-Markdown-Blöcke — die verleiten Gamma
 * dazu, ganze „Slides“ statt nackter Grafiken zu malen.
 *
 * Laengere inhaltliche Vorschläge bleiben in `lessons/*.md` fuer Menschen;
 * die Pipeline mappt pro Slide-Typ + Titel auf eine Micro-Brief-Zeile.
 *
 * Details: docs/SLIDE_GENERATION_RULES.md
 */

'use strict';

/** Kurz — alles Weitere steht in den nummerierten Zeilen. */
const HEADER = [
  'Each numbered line = one PDF page = one full-bleed image.',
  'Style: dark #0B0F14 or transparent, technical, 16:9 feel.',
  'Forbidden on the canvas: slide chrome, multi-column layouts, info boxes, fishbone diagrams, English/German lesson paragraphs, titles, bullet lists. At most a few axis tick numbers or single letters (x, y, k).',
  '',
].join('\n');

const FOOTER = (n) =>
  `\nPrint exactly ${n} pages in this order. No extra pages.\n`;

/** Kleinbuchstaben + Umlaute vereinfachen (nur fuer Keyword-Match). */
function foldForMatch(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Eine Zeile pro Slide: imperative Englisch, keine Markdown-Lektion.
 */
function microBrief(slide) {
  const sec = slide.section;
  const t = foldForMatch(slide.title);

  if (sec === 'lesson_title') {
    return 'Generate one abstract image: soft neon arcs and particles on dark navy, liquidity metaphor, zero readable words.';
  }
  if (sec === 'key_takeaways') {
    return 'Generate one image: three small flat icons in a horizontal row, monochrome, no captions.';
  }

  if (sec === 'mechanism') {
    if (t.includes('gebuh') || t.includes('gebue') || t.includes('fee')) {
      return 'Generate one image: three tiny icons in a row (coin in, percent chip, pool) joined by thin arrows, two-digit numbers only, no sentences.';
    }
    if (t.includes('formel') || t.includes('constant') || t.includes(' x ') || t.includes('xy')) {
      return 'Generate one image: single x-y plot with hyperbola curve for constant product x times y equals k, numeric axis ticks only, no text blocks.';
    }
    return 'Generate one image: three rounded nodes with arrows between them, flat icon style, almost no text.';
  }

  if (sec === 'protocol_example') {
    if (t.includes('swap')) {
      return 'Generate one image: two vertical bar stacks before and after trade with one curved arrow between them, numeric labels only, no paragraphs.';
    }
    if (t.includes('preis') || t.includes('verhaltnis') || t.includes('ratio')) {
      return 'Generate one image: simple balance or two token stacks with one horizontal arrow, no sentences, no boxes.';
    }
    return 'Generate one image: stylized fake DEX tiles with placeholder numbers, no logos, no readable addresses.';
  }

  if (sec === 'risk_layer') {
    if (t.includes('kurve') || t.includes('hyperbel')) {
      return 'Generate one image: one hyperbola on a faint grid, light glow along the bend, axis tick numbers only, no titles or side panels.';
    }
    if (t.includes('arbitrage')) {
      return 'Generate one image: two small pool circles and one looping arrow between them, letters A and B at most, no explanatory text.';
    }
    return 'Generate one image: one simple curve or heat strip on dark background, numeric ticks only, no callout boxes.';
  }

  if (sec === 'concept') {
    return 'Generate one image: one central shape with two thin connector lines, flat vector look, no labels.';
  }

  if (sec === 'system_architecture') {
    return 'Generate one image: four small rectangles as nodes with arrows, short one-word role labels max, dark schematic.';
  }

  return 'Generate one image: one clean technical diagram on dark background, minimal text, no slide layout.';
}

function buildSlidesPrompt(lesson, slidePlan) {
  const { meta } = lesson;
  const { slides } = slidePlan;

  const lines = [];
  lines.push(HEADER);
  lines.push(`Lesson ${meta.lesson_id} — ${slides.length} page(s), in order:`);
  lines.push('');

  slides.forEach((slide, i) => {
    lines.push(`${i + 1}. ${microBrief(slide)}`);
  });

  lines.push(FOOTER(slides.length));

  return lines.join('\n');
}

module.exports = { buildSlidesPrompt };
