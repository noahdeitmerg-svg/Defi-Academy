/**
 * hero-motifs.js
 *
 * Generiert ein flaches Line-Art-SVG-Motiv pro Modul. Jedes Motiv ist
 * ein thematischer visueller Anker, keine Illustration im klassischen
 * Sinne — mehr im Stil von Linear-Changelog-Hero-Grafiken oder
 * Stripe-Docs-Diagrammen.
 *
 * Regel: Alle Motive arbeiten mit derselben Strokestaerke, demselben
 * Farbset und derselben Viewport-Groesse. Das garantiert, dass sie
 * ueber 13 Module visuell zusammengehoeren.
 *
 * Jedes Motiv ist eine pure Funktion:
 *   motif(size) -> SVG-String
 */

'use strict';

const STROKE = '#F5B841';
const STROKE_SOFT = 'rgba(245, 184, 65, 0.35)';
const STROKE_FAINT = 'rgba(245, 184, 65, 0.15)';
const SW = 2;

// ── Helpers ───────────────────────────────────────────────────────

function wrapSvg(size, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
${content}
  </g>
</svg>`;
}

function circle(cx, cy, r, opts = {}) {
  const stroke = opts.stroke || STROKE;
  const fill = opts.fill || 'none';
  const sw = opts.sw || SW;
  const dash = opts.dash ? ` stroke-dasharray="${opts.dash}"` : '';
  return `    <circle cx="${cx}" cy="${cy}" r="${r}" stroke="${stroke}" fill="${fill}" stroke-width="${sw}"${dash}/>`;
}

function line(x1, y1, x2, y2, opts = {}) {
  const stroke = opts.stroke || STROKE;
  const sw = opts.sw || SW;
  const dash = opts.dash ? ` stroke-dasharray="${opts.dash}"` : '';
  return `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
}

function path(d, opts = {}) {
  const stroke = opts.stroke || STROKE;
  const fill = opts.fill || 'none';
  const sw = opts.sw || SW;
  return `    <path d="${d}" stroke="${stroke}" fill="${fill}" stroke-width="${sw}"/>`;
}

function dot(cx, cy, r = 4, fill = STROKE) {
  return `    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

// ── Modul 1: DeFi-Grundlagen ──────────────────────────────────────
// Drei konzentrische Schichten: Blockchain → Smart Contract → App
// Zeigt die Stack-Architektur von DeFi.
function motifModule1(size = 400) {
  const c = size / 2;
  return wrapSvg(size, [
    circle(c, c, 160, { stroke: STROKE_SOFT, dash: '4 6' }),
    circle(c, c, 110, { stroke: STROKE_SOFT }),
    circle(c, c, 60, { stroke: STROKE }),
    dot(c, c, 6),
    // Connection lines
    line(c, c - 160, c, c - 110, { stroke: STROKE_FAINT, sw: 1 }),
    line(c, c + 110, c, c + 160, { stroke: STROKE_FAINT, sw: 1 }),
    line(c - 160, c, c - 110, c, { stroke: STROKE_FAINT, sw: 1 }),
    line(c + 110, c, c + 160, c, { stroke: STROKE_FAINT, sw: 1 }),
  ].join('\n'));
}

// ── Modul 2: Wallets & On-Chain Identity ──────────────────────────
// Schluessel + Adressgitter.
function motifModule2(size = 400) {
  const c = size / 2;
  return wrapSvg(size, [
    // Key body
    circle(c - 60, c, 40, { stroke: STROKE }),
    circle(c - 60, c, 16, { stroke: STROKE }),
    // Key shaft
    line(c - 20, c, c + 100, c),
    // Key teeth
    line(c + 70, c, c + 70, c + 20),
    line(c + 90, c, c + 90, c + 20),
    // Address grid dots
    ...Array.from({ length: 4 }, (_, i) => dot(c + 140, c - 40 + i * 20, 2, STROKE_SOFT)),
    ...Array.from({ length: 4 }, (_, i) => dot(c + 160, c - 40 + i * 20, 2, STROKE_SOFT)),
  ].join('\n'));
}

// ── Modul 3: Ethereum & EVM ───────────────────────────────────────
// Sechseck mit innerer Schaltung.
function motifModule3(size = 400) {
  const c = size / 2;
  // Hexagon
  const r = 120;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return [c + r * Math.cos(angle), c + r * Math.sin(angle)];
  });
  const hexPath = `M ${points[0][0]} ${points[0][1]} ` +
    points.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' ') + ' Z';
  return wrapSvg(size, [
    path(hexPath, { stroke: STROKE }),
    // Inner circuit
    circle(c, c, 40, { stroke: STROKE_SOFT }),
    dot(c, c, 4),
    ...points.map(p => line(c, c, p[0], p[1], { stroke: STROKE_FAINT, sw: 1, dash: '3 4' })),
    ...points.map(p => dot(p[0], p[1], 4)),
  ].join('\n'));
}

// ── Modul 4: Stablecoins ──────────────────────────────────────────
// Peg-Linie mit Oszillation.
function motifModule4(size = 400) {
  const c = size / 2;
  return wrapSvg(size, [
    // Peg reference line
    line(60, c, size - 60, c, { stroke: STROKE_SOFT, dash: '4 4' }),
    // Oscillating price
    path(`M 60 ${c} Q 130 ${c - 30}, 200 ${c + 10} T 340 ${c - 5}`, { stroke: STROKE }),
    // Peg point marker
    circle(200, c, 8, { stroke: STROKE }),
    dot(200, c, 3),
    // Value labels (ticks)
    line(60, c - 10, 60, c + 10, { stroke: STROKE_SOFT, sw: 1 }),
    line(size - 60, c - 10, size - 60, c + 10, { stroke: STROKE_SOFT, sw: 1 }),
  ].join('\n'));
}

// ── Modul 5: DEX & AMMs ───────────────────────────────────────────
// Constant Product Curve x*y=k.
function motifModule5(size = 400) {
  return wrapSvg(size, [
    // Axes
    line(80, size - 80, size - 60, size - 80, { stroke: STROKE_SOFT, sw: 1 }),
    line(80, size - 80, 80, 60, { stroke: STROKE_SOFT, sw: 1 }),
    // Hyperbola x*y=k
    path(
      `M 90 90 Q 120 140, 160 200 Q 200 260, 260 300 Q 300 320, ${size - 70} ${size - 90}`,
      { stroke: STROKE }
    ),
    // Current price dot
    dot(200, 260, 6),
    // Dashed projection lines
    line(200, 260, 200, size - 80, { stroke: STROKE_FAINT, sw: 1, dash: '3 4' }),
    line(200, 260, 80, 260, { stroke: STROKE_FAINT, sw: 1, dash: '3 4' }),
  ].join('\n'));
}

// ── Modul 6: Lending & Borrowing ──────────────────────────────────
// Zwei Kreise mit Pfeil (Collateral ↔ Loan).
function motifModule6(size = 400) {
  const c = size / 2;
  return wrapSvg(size, [
    circle(c - 90, c, 55, { stroke: STROKE }),
    circle(c + 90, c, 55, { stroke: STROKE }),
    // Arrows
    line(c - 30, c - 18, c + 30, c - 18),
    path(`M ${c + 22} ${c - 26} L ${c + 32} ${c - 18} L ${c + 22} ${c - 10}`),
    line(c + 30, c + 18, c - 30, c + 18),
    path(`M ${c - 22} ${c + 26} L ${c - 32} ${c + 18} L ${c - 22} ${c + 10}`),
    // Dots inside
    dot(c - 90, c, 4),
    dot(c + 90, c, 4),
  ].join('\n'));
}

// ── Modul 7: Liquidations ─────────────────────────────────────────
// Fallender Preis unter Liquidation-Schwelle.
function motifModule7(size = 400) {
  const c = size / 2;
  return wrapSvg(size, [
    // Threshold line
    line(60, c - 20, size - 60, c - 20, { stroke: STROKE_SOFT, dash: '4 4' }),
    // Falling price line
    path(`M 80 ${c - 80} L 140 ${c - 60} L 200 ${c - 30} L 260 ${c + 20} L 320 ${c + 60}`, { stroke: STROKE }),
    // Breach point
    circle(240, c - 5, 10, { stroke: STROKE }),
    dot(240, c - 5, 4),
    // Direction arrow at end
    path(`M 310 ${c + 55} L 320 ${c + 65} L 326 ${c + 52}`),
  ].join('\n'));
}

// ── Modul 8: Yield & Strategies ───────────────────────────────────
// Wachstumskurve mit Marker-Punkten.
function motifModule8(size = 400) {
  const baseY = size - 100;
  return wrapSvg(size, [
    // Axis
    line(80, baseY, size - 60, baseY, { stroke: STROKE_SOFT, sw: 1 }),
    line(80, baseY, 80, 80, { stroke: STROKE_SOFT, sw: 1 }),
    // Exponential-ish growth
    path(`M 90 ${baseY - 10} Q 160 ${baseY - 30}, 230 ${baseY - 80} T 340 ${baseY - 180}`, { stroke: STROKE }),
    // Compound markers
    dot(130, baseY - 22, 4),
    dot(200, baseY - 55, 4),
    dot(270, baseY - 110, 4),
    dot(340, baseY - 180, 6),
    // Soft projection arc
    path(`M 340 ${baseY - 180} Q 360 ${baseY - 220}, 380 ${baseY - 260}`, { stroke: STROKE_SOFT, sw: 1, dash: '4 4' }),
  ].join('\n'));
}

// ── Modul 9: Advanced Strategies ──────────────────────────────────
// Verschachtelte Protokoll-Hops.
function motifModule9(size = 400) {
  const c = size / 2;
  const positions = [
    [c - 130, c - 70],
    [c, c - 120],
    [c + 130, c - 70],
    [c + 130, c + 70],
    [c, c + 120],
    [c - 130, c + 70],
  ];
  return wrapSvg(size, [
    ...positions.map(([x, y]) => circle(x, y, 24, { stroke: STROKE })),
    ...positions.map(([x, y]) => dot(x, y, 3)),
    // Sequential path through nodes
    path(
      `M ${positions[0][0]} ${positions[0][1]} ` +
      positions.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' '),
      { stroke: STROKE_SOFT, dash: '4 6' }
    ),
    // Center composite dot
    circle(c, c, 10, { stroke: STROKE }),
    dot(c, c, 3),
  ].join('\n'));
}

// ── Modul 10: Portfolio & Risk Management ─────────────────────────
// Segmentierter Ring (Allocation).
function motifModule10(size = 400) {
  const c = size / 2;
  const r = 110;
  const segments = 6;
  const segs = Array.from({ length: segments }, (_, i) => {
    const a1 = (2 * Math.PI / segments) * i - Math.PI / 2;
    const a2 = (2 * Math.PI / segments) * (i + 1) - Math.PI / 2;
    const x1 = c + r * Math.cos(a1), y1 = c + r * Math.sin(a1);
    const x2 = c + r * Math.cos(a2), y2 = c + r * Math.sin(a2);
    const large = (a2 - a1) > Math.PI ? 1 : 0;
    return path(`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`, {
      stroke: i % 2 === 0 ? STROKE : STROKE_SOFT,
      sw: i % 2 === 0 ? SW + 1 : SW,
    });
  });
  return wrapSvg(size, [
    ...segs,
    circle(c, c, 40, { stroke: STROKE_SOFT, sw: 1 }),
    dot(c, c, 5),
  ].join('\n'));
}

// ── Modul 11: Smart Contract Risk & Audits ────────────────────────
// Code-Block mit Lupe / Marker.
function motifModule11(size = 400) {
  const c = size / 2;
  return wrapSvg(size, [
    // Code block frame
    path(`M ${c - 110} ${c - 90} L ${c + 90} ${c - 90} L ${c + 90} ${c + 90} L ${c - 110} ${c + 90} Z`, { stroke: STROKE_SOFT }),
    // Code lines
    line(c - 90, c - 60, c - 20, c - 60, { stroke: STROKE_SOFT, sw: 1 }),
    line(c - 90, c - 40, c + 30, c - 40, { stroke: STROKE_SOFT, sw: 1 }),
    line(c - 90, c - 20, c - 10, c - 20, { stroke: STROKE, sw: 2 }),
    line(c - 90, c, c + 40, c, { stroke: STROKE_SOFT, sw: 1 }),
    line(c - 90, c + 20, c + 10, c + 20, { stroke: STROKE_SOFT, sw: 1 }),
    line(c - 90, c + 40, c + 30, c + 40, { stroke: STROKE_SOFT, sw: 1 }),
    // Magnifier
    circle(c + 90, c + 60, 32, { stroke: STROKE }),
    line(c + 112, c + 82, c + 140, c + 110),
    // Highlight on flagged line
    line(c - 95, c - 20, c - 90, c - 20, { stroke: STROKE, sw: 4 }),
  ].join('\n'));
}

// ── Modul 12: MEV & Advanced On-Chain Dynamics ────────────────────
// Zwei parallele Tx-Spuren mit Sandwich-Marker.
function motifModule12(size = 400) {
  const c = size / 2;
  return wrapSvg(size, [
    // Block lane 1
    line(60, c - 40, size - 60, c - 40, { stroke: STROKE_SOFT }),
    dot(120, c - 40, 4),
    dot(220, c - 40, 4, STROKE_SOFT),
    dot(320, c - 40, 4),
    // Block lane 2 (victim tx)
    line(60, c + 10, size - 60, c + 10, { stroke: STROKE }),
    circle(220, c + 10, 8, { stroke: STROKE }),
    // Sandwich connectors
    line(120, c - 36, 220, c + 6, { stroke: STROKE_FAINT, sw: 1, dash: '3 4' }),
    line(320, c - 36, 220, c + 14, { stroke: STROKE_FAINT, sw: 1, dash: '3 4' }),
    // Mempool badge
    circle(c, c + 80, 26, { stroke: STROKE_SOFT, dash: '3 4' }),
  ].join('\n'));
}

// ── Modul 13: Governance & Protocol Economics ─────────────────────
// Knotenstruktur mit Stimmgewichten.
function motifModule13(size = 400) {
  const c = size / 2;
  const nodes = [
    [c, c - 110],
    [c - 110, c - 30],
    [c + 110, c - 30],
    [c - 70, c + 80],
    [c + 70, c + 80],
  ];
  return wrapSvg(size, [
    // Edges from center
    ...nodes.map(([x, y]) => line(c, c, x, y, { stroke: STROKE_FAINT, sw: 1 })),
    // Nodes with varying weights
    circle(nodes[0][0], nodes[0][1], 24, { stroke: STROKE, sw: 2.5 }),
    circle(nodes[1][0], nodes[1][1], 18, { stroke: STROKE }),
    circle(nodes[2][0], nodes[2][1], 28, { stroke: STROKE, sw: 2.5 }),
    circle(nodes[3][0], nodes[3][1], 14, { stroke: STROKE_SOFT }),
    circle(nodes[4][0], nodes[4][1], 20, { stroke: STROKE }),
    ...nodes.map(([x, y]) => dot(x, y, 3)),
    // Center coordinator
    circle(c, c, 10, { stroke: STROKE }),
    dot(c, c, 3),
  ].join('\n'));
}

// ── Registry ──────────────────────────────────────────────────────

const MOTIFS = {
  1: motifModule1,
  2: motifModule2,
  3: motifModule3,
  4: motifModule4,
  5: motifModule5,
  6: motifModule6,
  7: motifModule7,
  8: motifModule8,
  9: motifModule9,
  10: motifModule10,
  11: motifModule11,
  12: motifModule12,
  13: motifModule13,
};

function getMotif(moduleNumber, size = 400) {
  const fn = MOTIFS[moduleNumber];
  if (!fn) throw new Error(`No hero motif defined for module ${moduleNumber}`);
  return fn(size);
}

module.exports = { getMotif, MOTIFS };
