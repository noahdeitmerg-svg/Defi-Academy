/**
 * generate-slides-prompt.js
 *
 * Erzeugt `slides_prompt.txt` — einen strukturierten Prompt fuer Gamma
 * (oder einen aehnlichen AI-Generator), der **ausschliesslich Einzel-
 * Visuals** (Diagramme, Illustrationen, Charts) pro Slide liefert.
 *
 * WICHTIG — Rollen-Trennung
 * -------------------------
 * Gamma baut KEINE Slides. Kein Layout, keine Texte, keine Farben,
 * keine Fonts, kein Corporate-Design. Das Slide-Layout wird
 * vollstaendig vom Remotion-Template `video-style-engine/slide-template.jsx`
 * gerendert. Gamma liefert nur das zentrale Visual-Asset pro Slide,
 * das vom `VisualRenderer` in die Visual-Area der Remotion-Slide
 * eingesetzt wird.
 *
 * Details: docs/SLIDE_GENERATION_RULES.md
 */

'use strict';

const HEADER = [
  '# GAMMA VISUAL ASSET PROMPT',
  '',
  '> This prompt produces **individual visual assets** (diagrams,',
  '> illustrations, charts, conceptual visuals). It is **NOT** a',
  '> slide-layout prompt.',
  '',
  '## Scope — read before generating',
  '',
  "**Gamma's job (this prompt):**",
  '',
  '- Generate **one standalone visual per lesson slide**.',
  '- Output format: PNG, 16:9 (1920x1080) or square 1:1 (1080x1080).',
  '- Background: transparent or dark navy (#0B0F14) — **no** opinionated',
  '  backgrounds, **no** frames, **no** branding, **no** title bars.',
  '- Style: clean, didactic, technical — diagrams and illustrations,',
  '  no stock photography, no emojis, no decorative clutter.',
  '',
  '**What Gamma must NOT do:**',
  '',
  '- **Do NOT design slide layouts.** Slide layout, title bar,',
  '  bullet list, accent bar, footer and slide counter are rendered by',
  '  Remotion (video-style-engine/slide-template.jsx).',
  '- **Do NOT embed slide titles, bullet text or any written copy**',
  '  onto the visual — typography is applied by Remotion from',
  '  theme.json at render time.',
  '- **Do NOT pick brand colors, fonts or spacing.** The final video',
  '  uses colors and fonts from video-style-engine/theme.json.',
  '- **Do NOT produce a deck.** Produce **N separate images**, one per',
  '  lesson slide, delivered as discrete PNG files.',
  '',
  '## File naming — required',
  '',
  'Name the exports strictly:',
  '',
  '    visual01.png',
  '    visual02.png',
  '    visual03.png',
  '    ...',
  '',
  'Place them into:',
  '',
  '    assets-input/<lesson_id>/',
  '',
  'Index order must match the slide order defined below.',
].join('\n');

const FOOTER_TEMPLATE = [
  '',
  '## Output — required',
  '',
  'Deliver **<COUNT> individual PNG files** named',
  'visual01.png ... visual<COUNT>.png, dropped into',
  'assets-input/<LESSON_ID>/.',
  '',
  'If a slide does not need a custom visual (e.g. the title slide), skip',
  'it — the Remotion intro/outro scenes render without an external',
  'asset. The Remotion slide template will fall back to a neutral',
  'placeholder for any missing visualNN.png.',
  '',
  '**Final reminder:** no titles, no bullet text, no brand layout on',
  'the images. Those are rendered by Remotion at video-build time. This',
  'prompt is an asset brief, not a deck brief.',
  '',
  'See also: docs/SLIDE_GENERATION_RULES.md.',
].join('\n');

function buildSlidesPrompt(lesson, slidePlan) {
  const { meta, title } = lesson;
  const { slides } = slidePlan;

  const lines = [];
  lines.push(HEADER);
  lines.push('');
  lines.push('## Lesson context (metadata only — do not render as text)');
  lines.push('');
  lines.push(`- Lesson ID: ${meta.lesson_id}`);
  lines.push(`- Module: ${String(meta.module).padStart(2, '0')}`);
  lines.push(`- Lesson: ${String(meta.lesson).padStart(2, '0')}`);
  lines.push(`- Title: ${title}`);
  lines.push('');
  lines.push(`## Visuals to generate (${slides.length} assets)`);
  lines.push('');
  lines.push(
    'For each slide below, generate **exactly one** visual. The ' +
      '"Slide X" header is a sequencing hint, not an instruction to design ' +
      'a slide. Only the "Visual to generate" block tells Gamma what to ' +
      'draw.'
  );
  lines.push('');

  slides.forEach((slide, i) => {
    const n = String(i + 1).padStart(2, '0');
    const slideNum = i + 1;
    lines.push('---');
    lines.push('');
    lines.push(`### Slide ${slideNum} – ${slide.title}`);
    lines.push(`Save as: visual${n}.png`);
    lines.push(`Section (context only): ${slide.section}`);
    lines.push('');
    lines.push('**Visual to generate:**');
    if (slide.visuals && slide.visuals.length > 0) {
      slide.visuals.forEach((v) => lines.push(`- ${v}`));
    } else {
      lines.push(getDefaultVisualHint(slide.section));
    }
    lines.push('');
    lines.push(
      '**Do NOT include on the image:** slide title, bullet points, ' +
        'slide counters, logos, or any piece of UI chrome.'
    );
    lines.push('');
  });

  lines.push(
    FOOTER_TEMPLATE.replace(/<COUNT>/g, String(slides.length))
      .replace(/<LESSON_ID>/g, meta.lesson_id)
  );

  return lines.join('\n');
}

function getDefaultVisualHint(section) {
  switch (section) {
    case 'lesson_title':
      return (
        '- (optional) Abstract hero visual — e.g. a minimal vector mark or ' +
        'conceptual shape evoking the lesson topic. No text. Safe to skip; ' +
        'the Remotion intro-scene renders the title itself.'
      );
    case 'concept':
      return (
        '- Simple concept diagram: one central entity with 2–3 connected ' +
        'properties. Clean lines, no labels baked into the image (labels ' +
        'can be language-neutral or omitted).'
      );
    case 'mechanism':
      return (
        '- Flow diagram or numbered step sequence: Input → Process → Output. ' +
        'Arrows only, no descriptive text.'
      );
    case 'system_architecture':
      return (
        '- System diagram with named components (user, smart contract, oracle) ' +
        'and data flows. Short role labels (User, Oracle, Pool) are fine; ' +
        'avoid sentences.'
      );
    case 'risk_layer':
      return (
        '- Risk-matrix or stacked-list illustration. Avoid baked-in colors — ' +
        'use neutral grayscale; Remotion applies the red accent at render time.'
      );
    case 'protocol_example':
      return (
        '- Illustration or stylized mock of a protocol dashboard ' +
        '(Aave, Uniswap, Curve, …). Real screenshots only if redacted; ' +
        'prefer a clean illustration.'
      );
    case 'key_takeaways':
      return (
        '- Three-up visual abstraction (three icons / three shapes) that ' +
        'symbolise the three takeaways. No text.'
      );
    default:
      return '- Didaktic diagram matching the slide title. No embedded text.';
  }
}

module.exports = { buildSlidesPrompt };
