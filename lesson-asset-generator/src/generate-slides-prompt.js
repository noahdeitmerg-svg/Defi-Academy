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
].join('\n');

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
    lines.push('Draw exactly one image for this page:');
    if (slide.visuals && slide.visuals.length > 0) {
      slide.visuals.forEach((v) => lines.push(`- ${v}`));
    } else {
      lines.push(getDefaultVisualHint(slide.section));
    }
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
        '- Neutral grayscale risk illustration (matrix or simple curves). No alarmist text blocks.'
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
