/**
 * generate-slides-prompt.js
 *
 * Erzeugt slides_prompt.txt — einen strukturierten Prompt fuer Gamma
 * (oder einen kompatiblen AI-Slide-Generator), der 6-7 Slides pro
 * Lektion produziert.
 *
 * Jede Slide enthaelt: Titel + Bullet Points + Visual Description.
 */

'use strict';

function buildSlidesPrompt(lesson, slidePlan) {
  const { meta, title } = lesson;
  const { slides } = slidePlan;

  const lines = [];

  // Header / Context Block
  lines.push('# GAMMA SLIDE DECK PROMPT');
  lines.push('');
  lines.push(`Lesson ID: ${meta.lesson_id}`);
  lines.push(`Module: ${String(meta.module).padStart(2, '0')}`);
  lines.push(`Lesson: ${String(meta.lesson).padStart(2, '0')}`);
  lines.push(`Title: ${title}`);
  lines.push('');
  lines.push('## Designvorgaben (zwingend einhalten)');
  lines.push('');
  lines.push('- Dunkler Hintergrund (#0B0F14), Text in Weiss/Grau-Toenen');
  lines.push('- Akzentfarbe Blau (#4F8BFF); Risiko-Sektion in Rot (#D9544E)');
  lines.push('- Schriftart: Inter');
  lines.push('- Pro Slide: Titel + 3-4 Bullet Points + 1 visuelles Element rechts');
  lines.push('- Minimale Dekoration, keine Emojis, keine Stockfotos');
  lines.push('- Technische, didaktische Sprache; kein Marketing-Hype');
  lines.push('- Diagramme, Dashboards oder Protokoll-Screenshots in der Visual Area');
  lines.push('');
  lines.push(`## Deck Struktur (${slides.length} Slides)`);
  lines.push('');

  // Slide-by-slide
  slides.forEach((slide, i) => {
    const slideNum = i + 1;
    lines.push(`---`);
    lines.push(``);
    lines.push(`### Slide ${slideNum} – ${slide.title}`);
    lines.push(`Section: ${slide.section}`);
    if (slide.accent_color_override) {
      lines.push(`Accent Color: ${slide.accent_color_override} (Risk)`);
    }
    lines.push('');
    lines.push('**Title:**');
    lines.push(slide.title);
    lines.push('');
    lines.push('**Bullet Points:**');
    if (slide.bullets.length === 0) {
      lines.push('- [Content Agent: keine Bullets fuer diese Sektion geliefert]');
    } else {
      slide.bullets.forEach((b) => lines.push(`- ${b}`));
    }
    lines.push('');
    lines.push('**Visual Description:**');
    if (slide.visuals.length === 0) {
      const fallback = getDefaultVisualHint(slide.section);
      lines.push(fallback);
    } else {
      slide.visuals.forEach((v) => lines.push(`- ${v}`));
    }
    lines.push('');
  });

  lines.push(`---`);
  lines.push('');
  lines.push('## Output-Anforderung');
  lines.push('');
  lines.push('Liefere exakt ' + slides.length + ' Slides im obigen Stil.');
  lines.push('Jede Slide muss im 16:9 Format angelegt sein (1920x1080).');
  lines.push('Die Visual Area belegt ca. 55% der Breite rechts, der Text 40% links.');

  return lines.join('\n');
}

function getDefaultVisualHint(section) {
  switch (section) {
    case 'lesson_title':
      return '- Keine eigene Grafik. Nur Titelanimation der Video Style Engine.';
    case 'concept':
      return '- Einfaches Begriffsdiagramm: zentrale Entitaet mit 2-3 verbundenen Eigenschaften.';
    case 'mechanism':
      return '- Flussdiagramm oder nummerierte Schrittfolge (Input → Prozess → Output).';
    case 'system_architecture':
      return '- Systemdiagramm mit Komponenten (Nutzer, Smart Contract, Oracle) und Datenfluessen.';
    case 'risk_layer':
      return '- Tabelle oder Liste von Risiken mit rotem Akzent.';
    case 'protocol_example':
      return '- Screenshot eines echten Protokoll-Dashboards (z.B. Aave, Uniswap, Curve), sensible Daten geschwaerzt.';
    case 'key_takeaways':
      return '- Drei nummerierte Kernaussagen mit blauen Akzentbalken.';
    default:
      return '- Didaktisches Diagramm passend zum Titel.';
  }
}

module.exports = { buildSlidesPrompt };
