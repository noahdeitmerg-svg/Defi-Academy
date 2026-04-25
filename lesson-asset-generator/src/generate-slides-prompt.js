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
 * **Brand:** Kernfarben und Chart-Reihenfolge kommen aus
 * `video-style-engine/brand/colors.json` (Single Source of Truth), damit
 * Gamma-Bilder zur Remotion-Brand-2.0-Passung passen.
 *
 * Laengere inhaltliche Vorschläge bleiben in `lessons/*.md` fuer Menschen;
 * die Pipeline mappt pro Slide-Typ + Titel auf eine Micro-Brief-Zeile.
 *
 * Details: docs/SLIDE_GENERATION_RULES.md
 */

'use strict';

const fs = require('fs');
const path = require('path');

/** Minimal-Fallback wenn colors.json fehlt (z. B. isolierter Checkout). */
const FALLBACK_COLORS = {
  brand: {
    primary_background: { hex: '#0B1F3B' },
    primary_accent: { hex: '#F5B841' },
    text_primary: { hex: '#FFFFFF' },
    text_secondary: { hex: '#A0AEC0' },
    risk_highlight: { hex: '#D9544E' },
  },
  surfaces: {
    background_primary: '#0B1F3B',
    background_elevated: '#11284A',
    background_overlay: '#1A355F',
    border: '#1F3A66',
    divider: '#1A355F',
  },
  text: { primary: '#FFFFFF', secondary: '#A0AEC0', muted: '#6B7A8F' },
  semantic: {
    info: '#5EA9F0',
    success: '#3FB58B',
    warning: '#F5B841',
    risk: '#D9544E',
    risk_soft: '#3B1F1E',
  },
  chart_palette: [
    '#F5B841',
    '#5EA9F0',
    '#3FB58B',
    '#D9544E',
    '#B388E8',
    '#5DC7D1',
  ],
};

function resolveColorsJsonPath() {
  return path.join(
    __dirname,
    '..',
    '..',
    'video-style-engine',
    'brand',
    'colors.json'
  );
}

function loadBrandColors() {
  const fp = resolveColorsJsonPath();
  try {
    const raw = fs.readFileSync(fp, 'utf8');
    return JSON.parse(raw);
  } catch {
    return FALLBACK_COLORS;
  }
}

/**
 * Englischer Brand-Lock fuer Gamma: exakte Hex-Werte, keine freien Regenbogen.
 */
function buildBrandLockBlock(colors) {
  const c = colors || FALLBACK_COLORS;
  const bg = c.brand?.primary_background?.hex || c.surfaces?.background_primary;
  const acc = c.brand?.primary_accent?.hex || c.accent?.primary;
  const tx = c.brand?.text_primary?.hex || c.text?.primary;
  const tx2 = c.brand?.text_secondary?.hex || c.text?.secondary;
  const muted = c.text?.muted || '#6B7A8F';
  const el = c.surfaces?.background_elevated;
  const ov = c.surfaces?.background_overlay;
  const br = c.surfaces?.border;
  const div = c.surfaces?.divider;
  const info = c.semantic?.info;
  const ok = c.semantic?.success;
  const risk = c.brand?.risk_highlight?.hex || c.semantic?.risk;
  const riskSoft = c.semantic?.risk_soft;
  const charts = Array.isArray(c.chart_palette) ? c.chart_palette.join(', ') : FALLBACK_COLORS.chart_palette.join(', ');

  return [
    'BRAND 2.0 — use ONLY these hex colors (no extra rainbow, no random neon):',
    `- Full-bleed background / large fills: ${bg}; elevated panels ${el}, ${ov}; subtle borders/dividers ${br}, ${div}.`,
    `- Primary accent (highlights, key curves, connectors, markers): ${acc}.`,
    `- Secondary ink (thin lines, de-emphasized shapes, grid): ${tx2}, ${muted}; rare bright strokes: ${tx}.`,
    `- Multi-series data (prefer this order): ${charts}.`,
    `- Risk red ${risk} and tinted risk panels ${riskSoft} ONLY for explicit danger / loss / attack / depeg motifs — never as a generic accent.`,
    'Visual language: flat vector, calm fintech-docs (Stripe-like), generous whitespace, no skeuomorphic metal/glass; optional very soft radial gold glow at low opacity on intro pages only.',
    'Forbidden on the canvas: slide chrome, multi-column layouts, info boxes, fishbone diagrams, lesson paragraphs, slide titles, bullet lists, watermarks, real protocol logos. At most a few axis tick numbers or single letters (x, y, k).',
    '',
  ].join('\n');
}

function buildPromptHeader() {
  const colors = loadBrandColors();
  return [
    'Each numbered line = one PDF page = one full-bleed 16:9 illustration (not a slide layout).',
    'Keep every page visually consistent with the palette below (same family as DeFi Academy video slides).',
    '',
    buildBrandLockBlock(colors),
  ].join('\n');
}

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
    return 'Generate one abstract image: deep navy field #0B1F3B, sparse gold #F5B841 particles and thin arcs (liquidity metaphor), very soft radial gold glow, zero readable words.';
  }
  if (sec === 'key_takeaways') {
    return 'Generate one image: three small flat icons in a horizontal row using accent #F5B841 on shapes with #11284A tiles, no captions.';
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
      return 'Generate one image: one hyperbola on #0B1F3B with faint #1F3A66 grid, curve stroke #F5B841 or thin #FFFFFF, soft gold glow on bend, axis tick numbers only, no titles or side panels.';
    }
    if (t.includes('arbitrage')) {
      return 'Generate one image: on #0B1F3B, two small pool discs as #11284A rings with #F5B841 looping arrow between, letters A and B at most, no explanatory text.';
    }
    return 'Generate one image: one simple curve or heat strip on #0B1F3B, use brand risk red #D9544E only where the graphic implies danger or loss, numeric ticks only, no callout boxes.';
  }

  if (sec === 'concept') {
    return 'Generate one image: one central shape with two thin connector lines, flat vector look, no labels.';
  }

  if (sec === 'system_architecture') {
    return 'Generate one image: four small rectangles as nodes with arrows, short one-word role labels max, dark schematic.';
  }

  return 'Generate one image: one clean technical diagram on #0B1F3B using only the BRAND 2.0 palette from the header, minimal text, no slide layout.';
}

function buildSlidesPrompt(lesson, slidePlan) {
  const { meta } = lesson;
  const { slides } = slidePlan;

  const lines = [];
  lines.push(buildPromptHeader());
  lines.push(`Lesson ${meta.lesson_id} — ${slides.length} page(s), in order:`);
  lines.push('');

  slides.forEach((slide, i) => {
    lines.push(`${i + 1}. ${microBrief(slide)}`);
  });

  lines.push(FOOTER(slides.length));

  return lines.join('\n');
}

module.exports = {
  buildSlidesPrompt,
  buildBrandLockBlock,
  loadBrandColors,
  resolveColorsJsonPath,
};
