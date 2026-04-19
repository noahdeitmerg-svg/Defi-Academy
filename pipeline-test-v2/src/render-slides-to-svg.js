/**
 * render-slides-to-svg.js
 *
 * Nimmt slides.json einer Lektion und erzeugt pro Slide eine SVG-Datei
 * im 1920x1080 Brand-Layout.
 *
 * Das Layout folgt exakt dem Brand-System:
 *   - Hintergrund #0B1F3B
 *   - Titel (Slide Title 48px Bold) mit goldener Akzentbar
 *   - Modul-/Lektions-Label oben links
 *   - Body-Text als Fliesstext ODER Bullet-List (je nach Inhalt)
 *   - Footer mit "DeFi Academy" und Slide-Counter
 *
 * Für die erste Slide (Title-Slide) wird ein spezielles Intro-Layout
 * mit dem Brand-Shield-Symbol verwendet.
 *
 * Output: SVG pro Slide, <slide_number>.svg
 */

'use strict';

const fs = require('fs');
const path = require('path');

const BRAND = {
  background: '#0B1F3B',
  background_card: '#11284A',
  border: '#1F3A66',
  accent: '#F5B841',
  risk: '#D9544E',
  text_primary: '#FFFFFF',
  text_secondary: '#A0AEC0',
  text_muted: '#6B7A8F',
};

const CANVAS = { width: 1920, height: 1080 };

function escapeXml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Word-wrap text into lines, using approximate character-per-pixel math
 * suitable for Inter at given font size.
 * For 28px Inter: ~0.55em per char average → ~15.4px per char.
 */
function wrapText(text, maxWidth, fontSize) {
  if (!text) return [];
  const avgCharWidth = fontSize * 0.55;
  const maxCharsPerLine = Math.floor(maxWidth / avgCharWidth);

  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';

  for (const w of words) {
    const tentative = cur ? cur + ' ' + w : w;
    if (tentative.length > maxCharsPerLine && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = tentative;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/**
 * Parse body text into structured lines.
 * If body contains numbered items "1. ... 2. ..." or lines starting with "-",
 * treat them as bullets. Otherwise, wrap as paragraph.
 */
function parseBody(body) {
  if (!body) return { type: 'empty', lines: [] };

  // Markdown table detection (first line with |...| and second with ---)
  const rawLines = body.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const tableStart = rawLines.findIndex((l) => /^\|.*\|$/.test(l));
  if (
    tableStart >= 0 &&
    rawLines[tableStart + 1] &&
    /^\|[\s\-:|]+\|$/.test(rawLines[tableStart + 1])
  ) {
    const headerLine = rawLines[tableStart];
    const headers = headerLine.split('|').slice(1, -1).map((c) => c.trim());
    const rows = rawLines.slice(tableStart + 2)
      .filter((l) => /^\|.*\|$/.test(l))
      .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
    return { type: 'table', headers, rows };
  }

  // Numbered list
  if (rawLines.some((l) => /^\d+\.\s+/.test(l))) {
    const items = rawLines
      .filter((l) => /^\d+\.\s+/.test(l))
      .map((l) => l.replace(/^\d+\.\s+/, '').trim());
    if (items.length >= 2) return { type: 'bullets', items };
  }

  // Bullet list
  if (rawLines.filter((l) => /^[-*•]\s+/.test(l)).length >= 2) {
    const items = rawLines
      .filter((l) => /^[-*•]\s+/.test(l))
      .map((l) => l.replace(/^[-*•]\s+/, '').trim());
    return { type: 'bullets', items };
  }

  // Plain paragraph (possibly multi-line)
  return { type: 'paragraph', text: rawLines.join(' ') };
}

function renderTitleSlide(slide, lesson) {
  const moduleLabel = `MODUL ${String(lesson.module).padStart(2, '0')} · LEKTION ${String(
    lesson.lesson
  ).padStart(2, '0')}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS.width} ${CANVAS.height}"
     width="${CANVAS.width}" height="${CANVAS.height}">
  <!-- Background -->
  <rect width="100%" height="100%" fill="${BRAND.background}"/>

  <!-- Subtle gold glow -->
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${BRAND.accent}" stop-opacity="0.08"/>
      <stop offset="60%" stop-color="${BRAND.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#glow)"/>

  <!-- Accent bar (top) -->
  <rect x="860" y="340" width="200" height="3" fill="${BRAND.accent}" rx="1.5"/>

  <!-- Brand Shield -->
  <g transform="translate(860, 390) scale(3.1)">
    <path d="M32 4 L54 12 L54 32 C54 44.5 44.5 55 32 60 C19.5 55 10 44.5 10 32 L10 12 Z"
          stroke="${BRAND.accent}" stroke-width="2" stroke-linejoin="round" fill="none"/>
    <g stroke="${BRAND.text_primary}" stroke-width="1.5" stroke-linecap="round">
      <line x1="32" y1="32" x2="24" y2="22"/>
      <line x1="32" y1="32" x2="40" y2="22"/>
      <line x1="32" y1="32" x2="32" y2="44"/>
    </g>
    <g fill="${BRAND.text_primary}">
      <circle cx="24" cy="22" r="3.2"/>
      <circle cx="40" cy="22" r="3.2"/>
      <circle cx="32" cy="44" r="3.2"/>
    </g>
    <circle cx="32" cy="32" r="4.2" fill="${BRAND.accent}"/>
  </g>

  <!-- Wordmark: "DeFi" and "Academy" as separate elements so the space
       renders reliably at any font-size/kerning combination -->
  <text x="856" y="670" text-anchor="end"
        font-family="Inter" font-size="64" font-weight="700" letter-spacing="-1.6px"
        fill="${BRAND.text_primary}">DeFi</text>
  <text x="884" y="670" text-anchor="start"
        font-family="Inter" font-size="64" font-weight="700" letter-spacing="-1.6px"
        fill="${BRAND.accent}">Academy</text>

  <!-- Module label -->
  <text x="960" y="730" text-anchor="middle"
        font-family="Inter" font-size="22" font-weight="600"
        letter-spacing="1.76px" fill="${BRAND.text_secondary}">${escapeXml(moduleLabel)}</text>

  <!-- Lesson title (the actual slide body = lesson title) -->
  ${renderLessonTitleOnTitleSlide(slide.body || lesson.title)}

  <!-- Footer -->
  <text x="120" y="1020" font-family="Inter" font-size="20" font-weight="600" fill="${BRAND.text_secondary}">
    <tspan fill="${BRAND.text_primary}">DeFi </tspan><tspan fill="${BRAND.accent}">Academy</tspan>
  </text>
  <text x="1800" y="1020" text-anchor="end"
        font-family="Inter" font-size="20" font-variant-numeric="tabular-nums" fill="${BRAND.text_muted}">${String(slide.number).padStart(2, '0')} / ${String(lesson.total_slides).padStart(2, '0')}</text>
</svg>`;
}

function renderLessonTitleOnTitleSlide(title) {
  // Centered, wrapped title below the wordmark
  const lines = wrapText(title, 1400, 34);
  const startY = 820;
  return lines
    .map((line, i) => {
      return `<text x="960" y="${startY + i * 44}" text-anchor="middle"
        font-family="Inter" font-size="34" font-weight="500" fill="${BRAND.text_primary}">${escapeXml(line)}</text>`;
    })
    .join('\n  ');
}

function renderContentSlide(slide, lesson, isRisk = false) {
  const accentColor = isRisk ? BRAND.risk : BRAND.accent;
  const moduleLabel = `MODUL ${String(lesson.module).padStart(2, '0')} · LEKTION ${String(
    lesson.lesson
  ).padStart(2, '0')}`;

  const parsed = parseBody(slide.body);
  const titleLines = wrapText(slide.title, 1500, 48);

  // --- Layout measurements ---
  const SAFE_LEFT = 120;
  const SAFE_TOP = 80;
  const SAFE_RIGHT = 1800;
  const TITLE_Y = 220;
  const CONTENT_TOP = 340;
  const CONTENT_BOTTOM = 940;
  const FOOTER_Y = 1020;

  // Title with accent bar
  const titleSvg = titleLines
    .map((line, i) => {
      return `<text x="${SAFE_LEFT + 32}" y="${TITLE_Y + i * 56}"
        font-family="Inter" font-size="48" font-weight="700"
        letter-spacing="-0.72px" fill="${BRAND.text_primary}">${escapeXml(line)}</text>`;
    })
    .join('\n  ');

  // Accent bar left of title (matches total title height)
  const accentBarHeight = titleLines.length * 56 + 4;
  const accentBar = `<rect x="${SAFE_LEFT}" y="${TITLE_Y - 40}" width="6" height="${accentBarHeight}" fill="${accentColor}" rx="3"/>`;

  // Body content
  const bodySvg = renderBody(parsed, SAFE_LEFT + 32, CONTENT_TOP, SAFE_RIGHT - SAFE_LEFT - 32, CONTENT_BOTTOM - CONTENT_TOP, accentColor);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS.width} ${CANVAS.height}"
     width="${CANVAS.width}" height="${CANVAS.height}">
  <rect width="100%" height="100%" fill="${BRAND.background}"/>

  <!-- Module label top-left -->
  <text x="${SAFE_LEFT}" y="${SAFE_TOP + 30}"
        font-family="Inter" font-size="22" font-weight="600"
        letter-spacing="1.76px" fill="${BRAND.text_muted}">${escapeXml(moduleLabel)}</text>

  ${accentBar}
  ${titleSvg}

  ${bodySvg}

  <!-- Footer divider + brand + counter -->
  <line x1="${SAFE_LEFT}" y1="${FOOTER_Y - 30}" x2="${SAFE_RIGHT}" y2="${FOOTER_Y - 30}" stroke="#1A355F" stroke-width="1"/>
  <text x="${SAFE_LEFT}" y="${FOOTER_Y}"
        font-family="Inter" font-size="20" font-weight="600">
    <tspan fill="${BRAND.text_primary}">DeFi </tspan><tspan fill="${BRAND.accent}">Academy</tspan>
  </text>
  <text x="${SAFE_RIGHT}" y="${FOOTER_Y}" text-anchor="end"
        font-family="Inter" font-size="20"
        font-variant-numeric="tabular-nums" fill="${BRAND.text_muted}">${String(slide.number).padStart(2, '0')} / ${String(lesson.total_slides).padStart(2, '0')}</text>
</svg>`;
}

function renderBody(parsed, x, y, maxWidth, maxHeight, accentColor) {
  if (parsed.type === 'empty') return '';

  if (parsed.type === 'paragraph') {
    const lines = wrapText(parsed.text, maxWidth, 34);
    const maxLines = Math.floor(maxHeight / 52);
    const visible = lines.slice(0, maxLines);
    return visible
      .map(
        (line, i) => `<text x="${x}" y="${y + 40 + i * 52}"
        font-family="Inter" font-size="34" font-weight="400"
        fill="${BRAND.text_primary}">${escapeXml(line)}</text>`
      )
      .join('\n  ');
  }

  if (parsed.type === 'bullets') {
    const out = [];
    let cursorY = y + 40;
    const lineHeight = 46;
    const itemGap = 30;
    for (const item of parsed.items) {
      const lines = wrapText(item, maxWidth - 40, 30);
      // Bullet marker (gold dash)
      out.push(
        `<rect x="${x}" y="${cursorY - 14}" width="16" height="3" fill="${accentColor}" rx="1.5"/>`
      );
      lines.forEach((line, i) => {
        out.push(
          `<text x="${x + 32}" y="${cursorY + i * lineHeight - 8}"
          font-family="Inter" font-size="30" font-weight="400"
          fill="${BRAND.text_secondary}">${escapeXml(line)}</text>`
        );
      });
      cursorY += lines.length * lineHeight + itemGap;
    }
    return out.join('\n  ');
  }

  if (parsed.type === 'table') {
    const cols = parsed.headers.length;
    const colWidth = Math.min(maxWidth / cols, 440);
    const rowHeight = 56;
    const out = [];

    // Header
    out.push(
      `<rect x="${x}" y="${y + 20}" width="${colWidth * cols}" height="${rowHeight}" fill="${accentColor}" opacity="0.15" rx="4"/>`
    );
    parsed.headers.forEach((h, i) => {
      out.push(
        `<text x="${x + 20 + i * colWidth}" y="${y + 58}"
          font-family="Inter" font-size="24" font-weight="600"
          letter-spacing="0.48px" fill="${accentColor}">${escapeXml(h.toUpperCase())}</text>`
      );
    });

    // Rows (max 5 rows fit)
    const maxRows = Math.min(parsed.rows.length, 5);
    for (let r = 0; r < maxRows; r++) {
      const rowY = y + 20 + (r + 1) * rowHeight;
      out.push(
        `<line x1="${x}" y1="${rowY}" x2="${x + colWidth * cols}" y2="${rowY}" stroke="#1A355F" stroke-width="1"/>`
      );
      parsed.rows[r].forEach((cell, i) => {
        const lines = wrapText(cell, colWidth - 40, 26);
        lines.slice(0, 1).forEach((line) => {
          out.push(
            `<text x="${x + 20 + i * colWidth}" y="${rowY + 38}"
              font-family="Inter" font-size="26" font-weight="400"
              fill="${BRAND.text_primary}">${escapeXml(line)}</text>`
          );
        });
      });
    }
    return out.join('\n  ');
  }

  return '';
}

/**
 * Main function: generate SVG files for every slide in a slides.json.
 */
function renderSlidesToSvg(slidesJsonPath, outputDir) {
  const slidesJson = JSON.parse(fs.readFileSync(slidesJsonPath, 'utf8'));
  fs.mkdirSync(outputDir, { recursive: true });

  const lessonMeta = {
    module: slidesJson.module,
    lesson: slidesJson.lesson,
    title: slidesJson.title,
    total_slides: slidesJson.slides.length,
  };

  const written = [];
  for (const slide of slidesJson.slides) {
    // Detect if this is a risk slide (title or body contains "Risiko"/"Risk")
    const isRisk =
      /risik/i.test(slide.title) ||
      /risik/i.test(slide.body || '');

    const svg = slide.is_title_slide
      ? renderTitleSlide(slide, lessonMeta)
      : renderContentSlide(slide, lessonMeta, isRisk);

    const filename = `slide-${String(slide.number).padStart(2, '0')}.svg`;
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, svg, 'utf8');
    written.push({ number: slide.number, title: slide.title, svg_path: filepath, is_risk: isRisk });
  }

  return written;
}

module.exports = { renderSlidesToSvg };
