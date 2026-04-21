/**
 * generate-slides-prompt.js
 *
 * Erzeugt `slides_prompt.txt` — Eingabetext fuer Gamma (API) oder
 * manuelle Tools (Midjourney, DALL·E, …). Ziel: **pro logischer Slide
 * genau eine Vollflächen-Grafik** (Diagramm/Illustration), keine
 * fertigen „Slides“ mit Titelzeile und Bullet-Layout.
 *
 * Hinweis zur Kürze
 * ------------------
 * Gamma bekommt diesen Text (ggf. plus einen sehr kurzen API-Prefix in
 * scripts/generate-slides.js). Lange Wiederholungen und Pfade wie
 * `assets-input/...` verwirren eher (Dateinamen legt die Pipeline fest).
 *
 * Details: docs/SLIDE_GENERATION_RULES.md
 */

'use strict';

/** Kompakter Kopf — Regeln einmal, ohne Remotion-Dateipfade. */
const HEADER = [
  '# Visual brief — one full-page graphic per item',
  '',
  'You output a **PDF or deck export** that we slice to images. Each page must be **one** full-bleed diagram or illustration (the whole canvas is the graphic).',
  '',
  'Hard rules:',
  '- No slide template: no title bar, no bullet blocks, no footer, no fake browser UI, no logos/watermarks.',
  '- No lesson titles or body copy painted as typography — short numeric axis labels only if needed.',
  '- Dark background **#0B0F14** or transparent; technical / didactic line style; 16:9 composition.',
  '- One idea per page, in the order listed below (page 1 = first block, …).',
  '',
  'Critical — do NOT “illustrate the brief”:',
  '- Never paint the assignment as a **spec sheet**, wireframe, sticky-note, or design doc (no headings like “Visual 04”, no yellow warning boxes, no paragraph-long instructions on canvas).',
  '- The bullets under each block are **private notes for you** — output only the actual subject (curve, pool schematic, numbers on axes, etc.), not a screenshot of those notes.',
  '- If the brief mentions “dashboard” or “screenshot”, draw a **clean stylized UI mock** with neutral fake numbers — not a poster that repeats the written requirements.',
  '',
  'Layout discipline (one chart, not a mini-slide):',
  '- **Exactly one** primary graphic per page (one curve, one flow, one schematic, or one simple UI mock) — no fishbone/Ishikawa, no SWOT, no multi-panel “storyboard”.',
  '- **No boxed paragraphs** or footer “takeaway” strips; no big German/English titles or lesson copy on the canvas.',
  '- On-canvas text: **at most a few short labels** (e.g. axis names, x, y, k, token tickers) — not full sentences.',
  '',
].join('\n');

/**
 * Lektions-Markdown enthält oft Meta-Zeilen (SCREENSHOT SUGGESTION, „auf der Folie“).
 * Die sollen Gamma nicht als Bildinhalt interpretieren.
 */
function stripMetaInstructions(raw) {
  if (raw == null || typeof raw !== 'string') return raw;
  let s = raw.trim();
  const parts = s.split(
    /\*\*\s*SCREENSHOT\s+SUGGESTION:\*\*|\bSCREENSHOT\s+SUGGESTION:\s*|\*\*SUGGESTION:\*\*|\bSUGGESTION:\s*/i
  );
  s = (parts[0] || '').trim();
  s = s
    .replace(/\s+auf der Folie\.?/gi, '')
    .replace(/\s+auf die Folie\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  const max = 240;
  if (s.length > max) {
    s = `${s.slice(0, max - 1).trim()}…`;
  }
  return s.length > 0 ? s : raw.trim();
}

const FOOTER = [
  '',
  '---',
  '',
  'Check: page count matches the number of blocks above. Each page = one standalone graphic only.',
].join('\n');

function buildSlidesPrompt(lesson, slidePlan) {
  const { meta, title } = lesson;
  const { slides } = slidePlan;

  const lines = [];
  lines.push(HEADER);
  lines.push('');
  lines.push(`Lesson: ${meta.lesson_id} — ${title}`);
  lines.push('');
  lines.push(`## ${slides.length} graphics (in this order)`);
  lines.push('');

  slides.forEach((slide, i) => {
    const n = String(i + 1).padStart(2, '0');
    const slideNum = i + 1;
    lines.push(`### ${slideNum} / ${slides.length}`);
    lines.push(`Context: ${slide.title}`);
    lines.push(`Type: ${slide.section}`);
    lines.push('');
    lines.push('Draw exactly one image for this page (graphic only — not a text poster of these notes):');
    if (slide.visuals && slide.visuals.length > 0) {
      slide.visuals.forEach((v) => {
        const cleaned = stripMetaInstructions(String(v));
        lines.push(`- ${cleaned}`);
      });
    } else {
      lines.push(getDefaultVisualHint(slide.section));
    }
    lines.push(
      '- Execution: one central figure only (plot/schematic/mock). No infographic template, no multi-box summaries.'
    );
    lines.push('');
  });

  lines.push(FOOTER);

  return lines.join('\n');
}

function getDefaultVisualHint(section) {
  switch (section) {
    case 'lesson_title':
      return (
        '- Optional: one minimal abstract mark or simple shape suggesting the topic. ' +
        'No text; may be nearly empty dark canvas.'
      );
    case 'concept':
      return (
        '- One simple concept diagram: a single focal element with 2–3 neutral connectors. ' +
        'No sentences on canvas.'
      );
    case 'mechanism':
      return (
        '- Flow or step diagram: boxes/arrows only; no paragraph text (axis numbers OK).'
      );
    case 'system_architecture':
      return (
        '- System sketch: 3–5 nodes (e.g. user, pool, oracle) and arrows; at most short role words, no bullets.'
      );
    case 'risk_layer':
      return (
        '- Single plot only: e.g. the x·y=k hyperbola on axes with light shading where liquidity is dense vs sparse. ' +
          'No title block, no extra panels, no bullet boxes.'
      );
    case 'protocol_example':
      return (
        '- **Stylized** protocol / DEX UI schematic (not a real product screenshot). No readable wallet addresses.'
      );
    case 'key_takeaways':
      return (
        '- Three simple icons or shapes suggesting three ideas. No headline text.'
      );
    default:
      return '- One technical diagram matching the context line. No embedded sentences.';
  }
}

module.exports = { buildSlidesPrompt };
