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

// ── Modul 14: Cross-Chain Infrastructure ──────────────────────────
// Zwei Chain-Cluster, verbunden durch eine Bridge (gepunktet = Trust-Annahme).
function motifModule14(size = 400) {
  const c = size / 2;

  // Left chain cluster (3 Knoten in Dreiecksform)
  const leftNodes = [
    [c - 130, c - 60],
    [c - 160, c + 20],
    [c - 100, c + 60],
  ];
  // Right chain cluster (3 Knoten, leicht rotiert)
  const rightNodes = [
    [c + 130, c - 60],
    [c + 160, c + 20],
    [c + 100, c + 60],
  ];

  // Helper: draw closed triangle through 3 points
  const closedPath = (pts, opts) => {
    const [a, b, d] = pts;
    return path(`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]} L ${d[0]} ${d[1]} Z`, opts);
  };

  return wrapSvg(size, [
    // Left cluster edges + nodes
    closedPath(leftNodes, { stroke: STROKE_SOFT, sw: 1 }),
    ...leftNodes.map(([x, y]) => circle(x, y, 10, { stroke: STROKE })),
    ...leftNodes.map(([x, y]) => dot(x, y, 3)),

    // Right cluster edges + nodes
    closedPath(rightNodes, { stroke: STROKE_SOFT, sw: 1 }),
    ...rightNodes.map(([x, y]) => circle(x, y, 10, { stroke: STROKE })),
    ...rightNodes.map(([x, y]) => dot(x, y, 3)),

    // Bridge — dashed line between closest nodes across clusters
    // (trust assumption = dashed, not solid)
    line(c - 90, c, c + 90, c, { stroke: STROKE, dash: '6 6' }),

    // Bridge anchor dots at the midpoint endpoints
    circle(c - 90, c, 6, { stroke: STROKE }),
    circle(c + 90, c, 6, { stroke: STROKE }),

    // Center "bridge" marker — small diamond to emphasize the crossing
    path(`M ${c} ${c - 14} L ${c + 10} ${c} L ${c} ${c + 14} L ${c - 10} ${c} Z`, { stroke: STROKE_SOFT }),
  ].join('\n'));
}

// ── Modul 15: On-Chain Analytics ──────────────────────────────────
// Datenpunkte + Trendlinie, eingerahmt wie ein Dashboard-Panel.
function motifModule15(size = 400) {
  const c = size / 2;
  const frameX = 70, frameY = 110, frameW = size - 140, frameH = size - 220;

  // Scatter points representing on-chain data (positions chosen to suggest upward trend)
  const points = [
    [frameX + 30, frameY + frameH - 40],
    [frameX + 60, frameY + frameH - 55],
    [frameX + 95, frameY + frameH - 45],
    [frameX + 130, frameY + frameH - 75],
    [frameX + 170, frameY + frameH - 85],
    [frameX + 200, frameY + frameH - 120],
    [frameX + 230, frameY + frameH - 110],
  ];

  return wrapSvg(size, [
    // Dashboard frame
    path(
      `M ${frameX} ${frameY} L ${frameX + frameW} ${frameY} L ${frameX + frameW} ${frameY + frameH} L ${frameX} ${frameY + frameH} Z`,
      { stroke: STROKE_SOFT }
    ),
    // Small title ticks (simulating dashboard header)
    line(frameX + 12, frameY + 20, frameX + 60, frameY + 20, { stroke: STROKE_FAINT, sw: 1 }),
    line(frameX + 12, frameY + 32, frameX + 40, frameY + 32, { stroke: STROKE_FAINT, sw: 1 }),

    // Grid lines (dashed, faint)
    line(frameX + 10, frameY + frameH - 50, frameX + frameW - 10, frameY + frameH - 50, { stroke: STROKE_FAINT, sw: 1, dash: '3 4' }),
    line(frameX + 10, frameY + frameH - 100, frameX + frameW - 10, frameY + frameH - 100, { stroke: STROKE_FAINT, sw: 1, dash: '3 4' }),

    // Trend line (polyline through points)
    path(
      `M ${points[0][0]} ${points[0][1]} ` +
      points.slice(1).map((p) => `L ${p[0]} ${p[1]}`).join(' '),
      { stroke: STROKE }
    ),

    // Data point dots
    ...points.map(([x, y]) => dot(x, y, 4)),

    // Highlighted latest point
    circle(points[points.length - 1][0], points[points.length - 1][1], 9, { stroke: STROKE }),

    // Small magnifier-like query indicator, bottom-right
    circle(frameX + frameW + 30, frameY + frameH + 10, 18, { stroke: STROKE_SOFT }),
    line(frameX + frameW + 43, frameY + frameH + 23, frameX + frameW + 58, frameY + frameH + 38),
  ].join('\n'));
}

// ── Modul 16: Composability Risk ─────────────────────────────────
// Gestapelte Protokoll-Ebenen mit multiplikativen Dependency-Pfeilen.
function motifModule16(size = 400) {
  const c = size / 2;
  const layerW = 200;
  const layerH = 36;
  const gap = 18;

  // Four stacked layers, each a rounded rectangle
  const layers = [];
  const startY = c - (4 * layerH + 3 * gap) / 2;
  for (let i = 0; i < 4; i++) {
    const y = startY + i * (layerH + gap);
    const isTop = i === 0;
    layers.push(
      `    <rect x="${c - layerW / 2}" y="${y}" width="${layerW}" height="${layerH}" rx="4"
        stroke="${isTop ? STROKE : STROKE_SOFT}" fill="none" stroke-width="${isTop ? 2 : SW}"/>`
    );
    // Small dot indicating protocol identity
    layers.push(dot(c - layerW / 2 + 20, y + layerH / 2, 3));
    // Horizontal marker line inside (suggesting protocol slug)
    layers.push(
      line(c - layerW / 2 + 34, y + layerH / 2, c - layerW / 2 + 80, y + layerH / 2, { stroke: STROKE_FAINT, sw: 1 })
    );
  }

  // Dependency arrows on the right side — each layer depends on the one above
  const arrows = [];
  for (let i = 1; i < 4; i++) {
    const yAbove = startY + (i - 1) * (layerH + gap) + layerH;
    const yBelow = startY + i * (layerH + gap);
    const arrowX = c + layerW / 2 + 14;
    // Vertical line
    arrows.push(line(arrowX, yAbove, arrowX, yBelow, { stroke: STROKE, sw: 1.5 }));
    // Arrowhead pointing down
    arrows.push(
      path(`M ${arrowX - 4} ${yBelow - 6} L ${arrowX} ${yBelow} L ${arrowX + 4} ${yBelow - 6}`, { stroke: STROKE, sw: 1.5 })
    );
  }

  // Risk multiplication indicators on the left — small × symbols between layers
  const multipliers = [];
  for (let i = 1; i < 4; i++) {
    const yBetween = startY + (i - 1) * (layerH + gap) + layerH + gap / 2;
    const markX = c - layerW / 2 - 20;
    multipliers.push(line(markX - 4, yBetween - 4, markX + 4, yBetween + 4, { stroke: STROKE_SOFT, sw: 1 }));
    multipliers.push(line(markX - 4, yBetween + 4, markX + 4, yBetween - 4, { stroke: STROKE_SOFT, sw: 1 }));
  }

  return wrapSvg(size, [
    ...layers,
    ...arrows,
    ...multipliers,
  ].join('\n'));
}

// ── Modul 17: Portfolio Construction + RWA ────────────────────────
// Vier-Bucket-Allokation: Ring in vier Segmente unterschiedlicher Gewichtung.
function motifModule17(size = 400) {
  const c = size / 2;
  const r = 120;

  // Four segments with different weights (angular coverage)
  // Bucket allocation example: 40% stable, 25% yield, 20% RWA, 15% exploration
  const segments = [
    { start: -Math.PI / 2, end: -Math.PI / 2 + 2 * Math.PI * 0.40, strong: true },   // Stable (biggest)
    { start: -Math.PI / 2 + 2 * Math.PI * 0.40, end: -Math.PI / 2 + 2 * Math.PI * 0.65, strong: false },
    { start: -Math.PI / 2 + 2 * Math.PI * 0.65, end: -Math.PI / 2 + 2 * Math.PI * 0.85, strong: true },
    { start: -Math.PI / 2 + 2 * Math.PI * 0.85, end: -Math.PI / 2 + 2 * Math.PI * 1.00, strong: false },
  ];

  const arcPath = (startAngle, endAngle, radius) => {
    const x1 = c + radius * Math.cos(startAngle);
    const y1 = c + radius * Math.sin(startAngle);
    const x2 = c + radius * Math.cos(endAngle);
    const y2 = c + radius * Math.sin(endAngle);
    const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const segmentPaths = segments.map((s) =>
    path(arcPath(s.start, s.end, r), {
      stroke: s.strong ? STROKE : STROKE_SOFT,
      sw: s.strong ? SW + 1 : SW,
    })
  );

  // Segment separator ticks (short radial marks)
  const separators = segments.map((s) => {
    const ax = c + (r - 12) * Math.cos(s.start);
    const ay = c + (r - 12) * Math.sin(s.start);
    const bx = c + (r + 12) * Math.cos(s.start);
    const by = c + (r + 12) * Math.sin(s.start);
    return line(ax, ay, bx, by, { stroke: STROKE_FAINT, sw: 1 });
  });

  return wrapSvg(size, [
    ...segmentPaths,
    ...separators,

    // Inner ring (hints at rebalancing / core)
    circle(c, c, 50, { stroke: STROKE_SOFT, sw: 1, dash: '4 4' }),

    // Center marker
    circle(c, c, 14, { stroke: STROKE }),
    dot(c, c, 4),
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
  14: motifModule14,
  15: motifModule15,
  16: motifModule16,
  17: motifModule17,
};

function getMotif(moduleNumber, size = 400) {
  const fn = MOTIFS[moduleNumber];
  if (!fn) throw new Error(`No hero motif defined for module ${moduleNumber}`);
  return fn(size);
}

module.exports = { getMotif, MOTIFS };
