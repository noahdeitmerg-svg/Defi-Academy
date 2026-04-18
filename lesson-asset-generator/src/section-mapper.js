/**
 * section-mapper.js
 *
 * Ordnet die geparsten Lektionsinhalte den 9 Sektionen der Video Style
 * Engine zu (intro, lesson_title, concept, mechanism, system_architecture,
 * risk_layer, protocol_example, key_takeaways, outro).
 *
 * Ausgabe: slide_plan (6-7 Content-Slides) + narration_plan (Textbloecke
 * pro Slide, auf Basis der Content-Agent-Narration).
 *
 * Wichtige Regel: Der Mapper veraendert KEINE Lerninhalte. Er sortiert
 * vorhandene Slide-Summary-Eintraege und Narration-Abschnitte den Sektionen
 * zu. Wenn ein Feld keine klare Zuordnung zulaesst, erhaelt es die
 * Default-Sektion (concept / mechanism / takeaways).
 */

'use strict';

/**
 * 6-7 Slides pro Lektion:
 *   1. lesson_title       (Titel-Slide, voice: kurz)
 *   2. concept
 *   3. mechanism
 *   4. system_architecture
 *   5. risk_layer
 *   6. protocol_example
 *   7. key_takeaways
 *
 * "system_architecture" ist die einzige optionale Sektion. Wenn eine Lektion
 * explizit keine eigene Architekturebene hat (z.B. reine Wallet-Einfuehrung),
 * wird sie zusammengelegt mit "mechanism". Dann entstehen 6 Slides.
 * Dies wird in der Config vermerkt, damit die Render-Pipeline
 * entsprechend Timing verteilt.
 */

const SECTION_KEYWORDS = {
  concept: [
    'definition', 'was ist', 'grundbegriff', 'begriff', 'konzept',
    'ueberblick', 'übersicht', 'einordnung', 'grundlage', 'prinzip',
  ],
  mechanism: [
    'mechanismus', 'funktion', 'funktioniert', 'formel', 'berechnung',
    'schritt', 'ablauf', 'logik', 'wie', 'prozess', 'rechnung',
    'gebuehr', 'gebühr', 'fee', 'rate', 'zinssatz', 'apy', 'apr',
  ],
  system_architecture: [
    'architektur', 'struktur', 'system', 'komponente', 'diagramm',
    'interaktion', 'zusammenspiel', 'flow', 'fluss', 'protokollstruktur',
    'smart contract', 'contract', 'oracle', 'keeper',
  ],
  risk_layer: [
    'risiko', 'risiken', 'gefahr', 'liquidation', 'slippage',
    'impermanent loss', 'il', 'exploit', 'bug', 'oracle attack',
    'depeg', 'verlust', 'manipulation', 'failure', 'grenzfall',
  ],
  protocol_example: [
    'beispiel', 'aave', 'uniswap', 'compound', 'curve', 'maker',
    'balancer', 'sushi', 'gmx', 'morpho', 'lido', 'dashboard',
    'interface', 'praxis', 'fallbeispiel', 'etherscan',
  ],
  key_takeaways: [
    'zusammenfassung', 'takeaway', 'kernaussage', 'merke',
    'wichtig', 'fazit', 'kernpunkt',
  ],
};

function scoreSectionForText(text) {
  const lower = (text || '').toLowerCase();
  const scores = {};
  for (const [section, keywords] of Object.entries(SECTION_KEYWORDS)) {
    let s = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) s += 1;
    }
    scores[section] = s;
  }
  return scores;
}

function assignBulletToSection(bullet, usedCounts) {
  const scores = scoreSectionForText(bullet);

  // Find best match, respecting capacity limits.
  const ORDERED = [
    'concept',
    'mechanism',
    'system_architecture',
    'risk_layer',
    'protocol_example',
    'key_takeaways',
  ];

  let best = null;
  let bestScore = 0;
  for (const sec of ORDERED) {
    if ((scores[sec] || 0) > bestScore && (usedCounts[sec] || 0) < 4) {
      best = sec;
      bestScore = scores[sec];
    }
  }

  // No keyword hit: assign to least-filled critical section.
  if (!best) {
    const fallback = ORDERED.find((s) => (usedCounts[s] || 0) < 3);
    best = fallback || 'concept';
  }

  return best;
}

function distributeBullets(slideSummary) {
  const sections = {
    concept: [],
    mechanism: [],
    system_architecture: [],
    risk_layer: [],
    protocol_example: [],
    key_takeaways: [],
  };

  const used = {};

  for (const bullet of slideSummary) {
    const target = assignBulletToSection(bullet, used);
    sections[target].push(bullet);
    used[target] = (used[target] || 0) + 1;
  }

  // Guarantee each section has at least 3 bullets where possible.
  // If a critical section is empty, pull from the most-filled one.
  const CRITICAL = ['concept', 'mechanism', 'risk_layer', 'key_takeaways'];
  for (const crit of CRITICAL) {
    if (sections[crit].length === 0) {
      const donor = Object.entries(sections)
        .filter(([k]) => k !== crit)
        .sort((a, b) => b[1].length - a[1].length)[0];
      if (donor && donor[1].length > 3) {
        sections[crit].push(donor[1].pop());
      }
    }
  }

  // Cap each section at 4 bullets (template limit).
  for (const k of Object.keys(sections)) {
    if (sections[k].length > 4) sections[k] = sections[k].slice(0, 4);
  }

  return sections;
}

function splitNarrationIntoSections(narration, sectionBullets) {
  if (!narration) return {};

  // Simple paragraph-based split: each non-empty paragraph is a chunk.
  const paragraphs = narration
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const sectionOrder = [
    'lesson_title',
    'concept',
    'mechanism',
    'system_architecture',
    'risk_layer',
    'protocol_example',
    'key_takeaways',
  ];

  // If the narration contains explicit section markers (like "// Konzept"),
  // respect them.
  const markerPattern = /^(?:\/\/|#|##)\s*(konzept|concept|mechanismus|mechanism|architektur|risiko|risk|beispiel|protokollbeispiel|takeaway|zusammenfassung|titel|title)/i;
  const markerMap = {
    konzept: 'concept',
    concept: 'concept',
    mechanismus: 'mechanism',
    mechanism: 'mechanism',
    architektur: 'system_architecture',
    risiko: 'risk_layer',
    risk: 'risk_layer',
    beispiel: 'protocol_example',
    protokollbeispiel: 'protocol_example',
    takeaway: 'key_takeaways',
    zusammenfassung: 'key_takeaways',
    titel: 'lesson_title',
    title: 'lesson_title',
  };

  const hasMarkers = paragraphs.some((p) => markerPattern.test(p));

  const result = {
    lesson_title: '',
    concept: '',
    mechanism: '',
    system_architecture: '',
    risk_layer: '',
    protocol_example: '',
    key_takeaways: '',
  };

  if (hasMarkers) {
    let current = 'concept';
    for (const p of paragraphs) {
      const m = p.match(markerPattern);
      if (m) {
        current = markerMap[m[1].toLowerCase()] || current;
        const stripped = p.replace(markerPattern, '').replace(/^\s*[-–—]\s*/, '').trim();
        if (stripped) result[current] += (result[current] ? '\n\n' : '') + stripped;
      } else {
        result[current] += (result[current] ? '\n\n' : '') + p;
      }
    }
  } else {
    // Heuristic distribution: score each paragraph and assign to best-matching
    // section that has bullets (so the narration follows the slide structure).
    const paragraphScores = paragraphs.map((p) => ({
      text: p,
      scores: scoreSectionForText(p),
    }));

    const sectionsWithContent = sectionOrder.filter(
      (s) => s === 'lesson_title' || (sectionBullets[s] && sectionBullets[s].length > 0)
    );

    // Round-robin-ish: walk paragraphs in order, assign each to the next
    // section with content that best matches, falling back to sequential.
    let idx = 0;
    for (const { text, scores } of paragraphScores) {
      // best section with content
      let best = null;
      let bestScore = -1;
      for (const s of sectionsWithContent) {
        const sc = scores[s] || 0;
        if (sc > bestScore) {
          bestScore = sc;
          best = s;
        }
      }
      if (bestScore <= 0) {
        best = sectionsWithContent[Math.min(idx, sectionsWithContent.length - 1)];
        idx += 1;
      }
      result[best] += (result[best] ? '\n\n' : '') + text;
    }

    // If lesson_title is still empty, create a brief opener from the lesson objective.
    // Leave it empty here; voice-script-generator will fill with title + "In dieser Lektion..."
  }

  return result;
}

function distributeVisuals(visualSuggestions, sectionBullets) {
  // Heuristic: assign each visual suggestion to the best-matching section
  // that has bullets.
  const result = {
    concept: [],
    mechanism: [],
    system_architecture: [],
    risk_layer: [],
    protocol_example: [],
    key_takeaways: [],
  };

  for (const v of visualSuggestions) {
    const scores = scoreSectionForText(v);
    let best = null;
    let bestScore = -1;
    for (const [sec, score] of Object.entries(scores)) {
      if (score > bestScore && sectionBullets[sec] && sectionBullets[sec].length > 0) {
        bestScore = score;
        best = sec;
      }
    }
    if (!best) {
      // fallback to system_architecture (most likely diagram target)
      best = sectionBullets.system_architecture.length > 0
        ? 'system_architecture'
        : 'concept';
    }
    result[best].push(v);
  }

  return result;
}

/**
 * Build the slide plan (6 or 7 content slides) from a parsed lesson.
 *
 * Supports TWO input formats:
 *
 *   1. NEW MODULE FORMAT (post-normalization)
 *      lesson.slides = [{ number, title, body, narration, visual, is_title_slide }]
 *      → direct 1:1 mapping, no heuristics. Each slide becomes one slide in
 *        the plan, with section names inferred from title keywords.
 *
 *   2. LEGACY SINGLE-LESSON FORMAT
 *      lesson.slide_summary = [...bullets]
 *      lesson.narration = "...fliesstext"
 *      lesson.visuals = [...bullets]
 *      → heuristic section distribution (original behavior).
 *
 * The function auto-detects the format by checking if lesson.slides exists
 * as a structured array with per-slide narration.
 *
 * @param {object} lesson - output of parseLesson() or normalizeLesson()
 * @returns {object} slide plan
 */
function mapLessonToSections(lesson) {
  // ── Format detection ──────────────────────────────────────────
  const hasDirectSlides =
    Array.isArray(lesson.slides) &&
    lesson.slides.length > 0 &&
    lesson.slides[0].body !== undefined;

  if (hasDirectSlides) {
    return mapDirectSlides(lesson);
  }

  // Legacy fallback: heuristic section distribution
  return mapLegacySections(lesson);
}

/**
 * Direct 1:1 mapping for the new module format. Each slide from the
 * content agent becomes one slide in the plan. Section name inferred
 * from slide title using the same keyword sets.
 */
function mapDirectSlides(lesson) {
  const inputSlides = lesson.slides;
  const slides = [];

  // First slide is always lesson_title
  if (inputSlides[0]) {
    slides.push({
      id: 'slide-01-title',
      section: 'lesson_title',
      title: lesson.meta.title || inputSlides[0].body || inputSlides[0].title,
      bullets: (lesson.objectives || []).slice(0, 3),
      visuals: inputSlides[0].visual ? [inputSlides[0].visual] : [],
      narration: inputSlides[0].narration || '',
    });
  }

  // Remaining slides get section inferred from title keywords.
  // Risk-related slides get risk_layer accent. Order preserved.
  for (let i = 1; i < inputSlides.length; i++) {
    const s = inputSlides[i];
    const section = inferSectionFromSlide(s, i);
    const accent = section === 'risk_layer' ? '#D9544E' : undefined;

    slides.push({
      id: `slide-${String(i + 1).padStart(2, '0')}-${section}`,
      section,
      title: s.title,
      bullets: bulletsFromBody(s.body),
      visuals: s.visual ? [s.visual] : [],
      narration: s.narration || '',
      accent_color_override: accent,
    });
  }

  return {
    slide_count: slides.length,
    has_architecture_section: slides.some((s) => s.section === 'system_architecture'),
    source_format: 'module_direct',
    slides,
  };
}

/**
 * Infer a section name from a slide's title and body. Uses the same
 * SECTION_KEYWORDS dictionary as the legacy mapper.
 */
function inferSectionFromSlide(slide, index) {
  const text = (slide.title + ' ' + slide.body).toLowerCase();
  const scores = scoreSectionForText(text);

  let best = null;
  let bestScore = 0;
  for (const [sec, sc] of Object.entries(scores)) {
    if (sc > bestScore) {
      bestScore = sc;
      best = sec;
    }
  }

  // Default fallback based on positional heuristic:
  //   slide 2 → concept, slide 3 → mechanism, slide 4 → mechanism/arch,
  //   last → key_takeaways
  if (!best) {
    const positional = ['concept', 'mechanism', 'mechanism', 'protocol_example', 'key_takeaways'];
    best = positional[index - 1] || 'mechanism';
  }

  return best;
}

/**
 * Extract bullet points from a slide's body text. Handles:
 *   - Numbered lists "1. ..." → bullets
 *   - Bullet lists "- ..." → bullets
 *   - Short paragraphs → single bullet
 *   - Markdown tables → first non-header row as fallback
 */
function bulletsFromBody(body) {
  if (!body) return [];
  const lines = body.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  // Table: use first 3 non-header data rows
  const tableStart = lines.findIndex((l) => /^\|.*\|$/.test(l));
  if (tableStart >= 0) {
    const dataRows = lines
      .slice(tableStart)
      .filter((l) => /^\|.*\|$/.test(l))
      .filter((l) => !/^\|[\s\-:|]+\|$/.test(l))
      .slice(1, 5); // skip header, take up to 4 rows
    if (dataRows.length >= 2) {
      return dataRows.map((l) =>
        l.split('|').slice(1, -1).map((c) => c.trim()).filter(Boolean).join(' — ')
      );
    }
  }

  // Numbered list
  const numbered = lines.filter((l) => /^\d+\.\s+/.test(l));
  if (numbered.length >= 2) {
    return numbered.map((l) => l.replace(/^\d+\.\s+/, '').trim()).slice(0, 4);
  }

  // Bullet list
  const bulleted = lines.filter((l) => /^[-*•]\s+/.test(l));
  if (bulleted.length >= 2) {
    return bulleted.map((l) => l.replace(/^[-*•]\s+/, '').trim()).slice(0, 4);
  }

  // Paragraph: split on sentence boundaries, take first 3 sentences
  const sentences = lines.join(' ').match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length >= 2) return sentences.map((s) => s.trim()).slice(0, 3);

  // Fallback: entire body as single bullet
  return [lines.join(' ')];
}

/**
 * Legacy heuristic-based mapping (original behavior).
 */
function mapLegacySections(lesson) {
  const sectionBullets = distributeBullets(lesson.slide_summary || []);
  const sectionVisuals = distributeVisuals(lesson.visuals || [], sectionBullets);
  const sectionNarration = splitNarrationIntoSections(
    lesson.narration || '',
    sectionBullets
  );

  // Decide slide count: 7 if all critical sections have content, else 6
  // (merge system_architecture into mechanism when empty).
  const archEmpty = sectionBullets.system_architecture.length === 0;

  const slides = [];

  // Slide 1: lesson_title
  slides.push({
    id: 'slide-01-title',
    section: 'lesson_title',
    title: lesson.title,
    bullets: lesson.objectives.slice(0, 3),
    visuals: [],
    narration: sectionNarration.lesson_title || '',
  });

  // Slide 2: concept
  slides.push({
    id: 'slide-02-concept',
    section: 'concept',
    title: 'Konzept',
    bullets: sectionBullets.concept,
    visuals: sectionVisuals.concept,
    narration: sectionNarration.concept || '',
  });

  // Slide 3: mechanism (absorbs architecture if missing)
  const mechanismBullets = archEmpty
    ? [...sectionBullets.mechanism, ...sectionBullets.system_architecture]
    : sectionBullets.mechanism;
  slides.push({
    id: 'slide-03-mechanism',
    section: 'mechanism',
    title: 'Mechanismus',
    bullets: mechanismBullets.slice(0, 4),
    visuals: archEmpty
      ? [...sectionVisuals.mechanism, ...sectionVisuals.system_architecture]
      : sectionVisuals.mechanism,
    narration: archEmpty
      ? [sectionNarration.mechanism, sectionNarration.system_architecture]
          .filter(Boolean)
          .join('\n\n')
      : sectionNarration.mechanism || '',
  });

  // Slide 4: system_architecture (only if present)
  if (!archEmpty) {
    slides.push({
      id: 'slide-04-architecture',
      section: 'system_architecture',
      title: 'Systemarchitektur',
      bullets: sectionBullets.system_architecture,
      visuals: sectionVisuals.system_architecture,
      narration: sectionNarration.system_architecture || '',
    });
  }

  // Slide: risk_layer
  slides.push({
    id: `slide-${String(slides.length + 1).padStart(2, '0')}-risk`,
    section: 'risk_layer',
    title: 'Risikoebene',
    bullets: sectionBullets.risk_layer,
    visuals: sectionVisuals.risk_layer,
    narration: sectionNarration.risk_layer || '',
    accent_color_override: '#D9544E',
  });

  // Slide: protocol_example
  slides.push({
    id: `slide-${String(slides.length + 1).padStart(2, '0')}-example`,
    section: 'protocol_example',
    title: 'Protokollbeispiel',
    bullets: sectionBullets.protocol_example,
    visuals: sectionVisuals.protocol_example,
    narration: sectionNarration.protocol_example || '',
  });

  // Slide: key_takeaways
  slides.push({
    id: `slide-${String(slides.length + 1).padStart(2, '0')}-takeaways`,
    section: 'key_takeaways',
    title: 'Kernaussagen',
    bullets: sectionBullets.key_takeaways,
    visuals: sectionVisuals.key_takeaways,
    narration: sectionNarration.key_takeaways || '',
  });

  return {
    slide_count: slides.length,
    has_architecture_section: !archEmpty,
    source_format: 'legacy_heuristic',
    slides,
  };
}

module.exports = { mapLessonToSections };
