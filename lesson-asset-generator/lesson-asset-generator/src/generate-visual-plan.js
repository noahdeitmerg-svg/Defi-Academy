/**
 * generate-visual-plan.js
 *
 * Erzeugt visual_plan.json mit:
 *   - visuals[]        → Liste aller Visuals (Diagramme, Dashboards, Screenshots)
 *   - animation_cues[] → Animations-Hinweise zeitlich verankert
 *
 * Die Regeln folgen animation-rules.json der Video Style Engine.
 */

'use strict';

// Each hint has a strict regex that requires word boundaries AND excludes
// compound terms like "bonding-curve" that would otherwise trigger a false
// positive on "curve".
const PROTOCOL_HINTS = [
  { protocol: 'aave',      regex: /\baave\b/i,                 url: 'https://app.aave.com/markets/' },
  { protocol: 'uniswap',   regex: /\buniswap\b/i,              url: 'https://info.uniswap.org/' },
  { protocol: 'compound',  regex: /\bcompound(\s+finance)?\b/i, url: 'https://app.compound.finance/' },
  // "curve" only counts when it refers to the protocol. Exclude "bonding-curve",
  // "bonding curve", "iv-curve" etc.
  { protocol: 'curve',     regex: /(?<!bonding[- ])(?<!iv[- ])\bcurve(\.fi|\s+finance|\s+protocol|\s+dao|\s+pool|\s+v[0-9])/i, url: 'https://curve.fi/' },
  { protocol: 'makerdao',  regex: /\b(maker ?dao|makerburn)\b/i, url: 'https://makerburn.com/' },
  { protocol: 'morpho',    regex: /\bmorpho\b/i,               url: 'https://app.morpho.org/' },
  { protocol: 'lido',      regex: /\blido\b/i,                 url: 'https://stake.lido.fi/' },
  { protocol: 'gmx',       regex: /\bgmx\b/i,                  url: 'https://app.gmx.io/' },
  { protocol: 'etherscan', regex: /\betherscan\b/i,            url: 'https://etherscan.io/' },
  { protocol: 'balancer',  regex: /\bbalancer\b/i,             url: 'https://app.balancer.fi/' },
  { protocol: 'sushiswap', regex: /\bsushi(swap)?\b/i,         url: 'https://www.sushi.com/' },
];

function detectProtocol(text) {
  const t = text || '';
  for (const hint of PROTOCOL_HINTS) {
    if (hint.regex.test(t)) {
      return { source_protocol: hint.protocol, source_url_hint: hint.url };
    }
  }
  return { source_protocol: null, source_url_hint: null };
}

function visualTypeForSection(section, description) {
  const lower = (description || '').toLowerCase();
  if (lower.includes('screenshot') || lower.includes('dashboard') || lower.includes('interface')) {
    return section === 'protocol_example' ? 'screenshot' : 'dashboard';
  }
  if (lower.includes('chart') || lower.includes('graph') || lower.includes('kurve')) {
    return 'chart';
  }
  if (lower.includes('animation') || lower.includes('aufbau')) {
    return 'animation';
  }
  if (section === 'protocol_example') return 'screenshot';
  if (section === 'system_architecture' || section === 'mechanism') return 'diagram';
  if (section === 'key_takeaways') return 'diagram';
  return 'diagram';
}

function captureInstructionsFor(section, description, protocol) {
  const base = [];
  if (section === 'protocol_example' && protocol) {
    base.push(
      `Screenshot vom ${protocol}-Dashboard. Nur den relevanten UI-Bereich zeigen. ` +
        'Persoenliche Wallet-Adressen und Balances anonymisieren/schwaerzen.'
    );
  }
  if (section === 'risk_layer') {
    base.push('Roten Akzent (#D9544E) fuer Risikoelemente verwenden.');
  }
  if (description) base.push(`Hinweis aus Lektion: ${description}`);
  return base.length > 0 ? base.join(' ') : null;
}

function buildVisuals(slides) {
  const visuals = [];

  slides.forEach((slide, slideIdx) => {
    if (slide.section === 'lesson_title') return; // intro slide has no visual
    const items = slide.visuals && slide.visuals.length > 0 ? slide.visuals : [null];

    items.forEach((desc, i) => {
      const description =
        desc || defaultVisualDescription(slide.section, slide.title);
      const { source_protocol, source_url_hint } = detectProtocol(description);
      const type = visualTypeForSection(slide.section, description);
      const accent = slide.accent_color_override || null;

      visuals.push({
        id: `v${String(visuals.length + 1).padStart(2, '0')}`,
        slide_ref: slide.id,
        type,
        description,
        source_protocol,
        source_url_hint,
        labels: extractLabels(description),
        color_accent: accent,
        capture_instructions: captureInstructionsFor(
          slide.section,
          description,
          source_protocol
        ),
      });
    });
  });

  return visuals;
}

function extractLabels(description) {
  if (!description) return [];
  // Very lightweight: pick comma-separated words inside quotes or parens.
  const quoted = [...description.matchAll(/["„»']([^"„»']{2,30})["«"']/g)].map(
    (m) => m[1].trim()
  );
  const paren = [...description.matchAll(/\(([^)]+)\)/g)].flatMap((m) =>
    m[1].split(/[,;]/).map((s) => s.trim())
  );
  const all = [...quoted, ...paren].filter(Boolean);
  return Array.from(new Set(all)).slice(0, 6);
}

function defaultVisualDescription(section, slideTitle) {
  switch (section) {
    case 'concept':
      return `Begriffsdiagramm zu "${slideTitle}": zentraler Knoten mit 2-3 verbundenen Eigenschaften.`;
    case 'mechanism':
      return `Flussdiagramm des Mechanismus: Schritt 1, Schritt 2, Schritt 3 als nummerierte Knoten mit Pfeilen.`;
    case 'system_architecture':
      return 'Systemdiagramm: Nutzer, Smart Contract, Oracle und externe Datenquelle mit gerichteten Kanten.';
    case 'risk_layer':
      return 'Tabelle der Risiken: Spalten "Risiko", "Ausloeser", "Auswirkung". Roter Akzent auf Kopfzeile.';
    case 'protocol_example':
      return 'Screenshot eines echten DeFi-Protokoll-Dashboards, relevante Bereiche hervorgehoben.';
    case 'key_takeaways':
      return 'Drei nummerierte Kernaussagen mit blauen Akzentbalken, klare Hierarchie.';
    default:
      return `Didaktisches Diagramm passend zum Slide "${slideTitle}".`;
  }
}

function buildAnimationCues(visuals, sectionTimings) {
  // sectionTimings: [{ section, start_seconds, end_seconds }]
  const cues = [];

  const sectionStartBySlideRef = {};
  sectionTimings.forEach((st) => {
    if (st.slide_id) sectionStartBySlideRef[st.slide_id] = st;
  });

  for (const v of visuals) {
    const sectionTiming = sectionStartBySlideRef[v.slide_ref];
    if (!sectionTiming) continue;

    // Fade-In at section start + 1s (after text introduction begins).
    cues.push({
      visual_id: v.id,
      cue_type: 'fade_in',
      trigger_seconds: +(sectionTiming.start_seconds + 1).toFixed(2),
      duration_frames: 20,
      target_element: null,
    });

    // For diagrams: reveal nodes one by one 3s after section start.
    if (v.type === 'diagram') {
      cues.push({
        visual_id: v.id,
        cue_type: 'node_reveal',
        trigger_seconds: +(sectionTiming.start_seconds + 3).toFixed(2),
        duration_frames: 10,
        target_element: 'nodes',
      });
      cues.push({
        visual_id: v.id,
        cue_type: 'edge_draw',
        trigger_seconds: +(sectionTiming.start_seconds + 4.5).toFixed(2),
        duration_frames: 15,
        target_element: 'edges',
      });
    }

    // For risk tables / risk layer: highlight pulse.
    if (v.color_accent === '#D9544E') {
      cues.push({
        visual_id: v.id,
        cue_type: 'highlight_pulse',
        trigger_seconds: +(sectionTiming.start_seconds + 5).toFixed(2),
        duration_frames: 20,
        target_element: 'header',
      });
    }

    // Fade-Out 1s before section end.
    cues.push({
      visual_id: v.id,
      cue_type: 'fade_out',
      trigger_seconds: +(sectionTiming.end_seconds - 1).toFixed(2),
      duration_frames: 12,
      target_element: null,
    });
  }

  return cues;
}

function buildVisualPlan(lesson, slidePlan, sectionTimings) {
  const visuals = buildVisuals(slidePlan.slides);
  const animation_cues = buildAnimationCues(visuals, sectionTimings);

  return {
    lesson_id: lesson.meta.lesson_id,
    visuals,
    animation_cues,
  };
}

module.exports = { buildVisualPlan };
