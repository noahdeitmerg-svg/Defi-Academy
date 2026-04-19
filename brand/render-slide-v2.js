/**
 * render-slide-v2.js
 *
 * Brand 2.0 Slide-Template. Erzeugt eine 1920x1080 SVG im neuen Design:
 *   - Kategorie-Pill oben links
 *   - Titel mit goldener Akzentbar
 *   - Checkmark-Bullets in goldenen Kreisen
 *   - Hero-Motiv rechts (aus hero-motifs.js)
 *   - Prominenter Wordmark-Footer mit Shield-Lockup
 *   - Goldene Progress-Bar (optional)
 */

'use strict';

const { getMotif } = require('./hero-motifs');

const BRAND = {
  bg: '#0B1F3B',
  bg_elevated: '#11284A',
  accent: '#F5B841',
  accent_soft: 'rgba(245, 184, 65, 0.10)',
  accent_ring: 'rgba(245, 184, 65, 0.25)',
  text_primary: '#FFFFFF',
  text_secondary: '#A0AEC0',
  text_muted: '#6B7A8F',
  divider: '#1A355F',
  risk: '#D9544E',
};

const CATEGORIES = {
  foundation: 'GRUNDLAGEN',
  practice: 'PRAXIS',
  strategy: 'STRATEGIE',
  risk: 'RISIKO & AUDIT',
  advanced: 'FORTGESCHRITTEN',
};

/** Ungültige Legacy-Kategorien → Brand-2.0-Keys (P3). */
function normalizeCategoryKey(category) {
  const raw = String(category || 'foundation').trim().toLowerCase();
  const ascii = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (raw === 'einführung' || ascii === 'einfuhrung' || raw === 'introduction' || raw === 'einleitung') {
    return 'foundation';
  }
  if (['foundation', 'practice', 'strategy', 'risk', 'advanced'].includes(raw)) return raw;
  return 'foundation';
}

function escXml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapLines(text, maxChars) {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/**
 * Category pill (top-left).
 */
function renderPill(category, x = 120, y = 80) {
  const key = normalizeCategoryKey(category);
  const label = CATEGORIES[key];
  const pillW = label.length * 10 + 32;
  return `
  <!-- Category pill -->
  <g>
    <rect x="${x}" y="${y}" width="${pillW}" height="36" rx="18"
          fill="${BRAND.accent_soft}" stroke="${BRAND.accent}" stroke-width="1.5"/>
    <text x="${x + pillW / 2}" y="${y + 24}" text-anchor="middle"
          font-family="Inter" font-size="14" font-weight="600"
          letter-spacing="1.4px" fill="${BRAND.accent}">${escXml(label)}</text>
  </g>`;
}

/**
 * Lesson header: module/lesson label (small, muted).
 */
function renderHeader({ moduleNumber, lessonNumber }, x = 120, y = 60) {
  const label = `MODUL ${String(moduleNumber).padStart(2, '0')} · LEKTION ${String(lessonNumber).padStart(2, '0')}`;
  return `
  <text x="${x}" y="${y}" font-family="Inter" font-size="14" font-weight="600"
        letter-spacing="1.4px" fill="${BRAND.text_muted}">${escXml(label)}</text>`;
}

/**
 * Big title with gold accent bar on left.
 */
function renderTitle(title, startX = 120, startY = 220, maxWidth = 900) {
  const lines = wrapLines(title, 24); // roughly 56px font on 900px width
  const lineHeight = 72;
  const totalHeight = lines.length * lineHeight;

  const titleSvg = lines
    .map((line, i) => `
    <text x="${startX + 28}" y="${startY + i * lineHeight}"
          font-family="Inter" font-size="56" font-weight="700"
          letter-spacing="-1.12px" fill="${BRAND.text_primary}">${escXml(line)}</text>`)
    .join('');

  return `
  <!-- Title accent bar -->
  <rect x="${startX}" y="${startY - 50}" width="6" height="${totalHeight + 6}"
        rx="3" fill="${BRAND.accent}"/>
  <!-- Title text -->${titleSvg}`;
}

/**
 * Checkmark bullets (gold circle with check icon).
 */
function renderCheckmarkBullets(items, startX = 148, startY = 440, maxWidth = 760) {
  const out = [];
  let cursorY = startY;
  const lineHeight = 40;
  const itemGap = 28;

  for (const item of items) {
    const lines = wrapLines(item, 40);

    // Checkmark circle
    out.push(`
    <circle cx="${startX}" cy="${cursorY - 4}" r="16"
            fill="${BRAND.accent_soft}" stroke="${BRAND.accent}" stroke-width="2"/>
    <path d="M ${startX - 7} ${cursorY - 4} l 5 5 l 9 -10"
          stroke="${BRAND.accent}" stroke-width="2.5" fill="none"
          stroke-linecap="round" stroke-linejoin="round"/>`);

    // Text
    lines.forEach((line, i) => {
      out.push(`
    <text x="${startX + 32}" y="${cursorY + i * lineHeight}"
          font-family="Inter" font-size="26" font-weight="500"
          fill="${BRAND.text_primary}">${escXml(line)}</text>`);
    });

    cursorY += Math.max(lines.length * lineHeight, 32) + itemGap;
  }

  return out.join('');
}

/**
 * Hero motif on the right side.
 */
function renderHeroMotif(moduleNumber, x = 1240, y = 340, size = 440) {
  const motifSvg = getMotif(moduleNumber, size);
  // Extract the <g> content from the generated motif SVG
  const gMatch = motifSvg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const inner = gMatch ? gMatch[1] : '';
  return `
  <!-- Hero motif (module ${moduleNumber}) -->
  <g transform="translate(${x}, ${y})">${inner}</g>`;
}

/**
 * Shield+wordmark footer (bottom-center).
 */
function renderWordmarkFooter(y = 1020) {
  const cx = 960;
  return `
  <!-- Footer divider -->
  <line x1="120" y1="${y - 40}" x2="1800" y2="${y - 40}"
        stroke="${BRAND.divider}" stroke-width="1"/>

  <!-- Shield + DeFi Academy lockup, centered -->
  <g transform="translate(${cx - 120}, ${y - 24})">
    <!-- Shield icon (scaled) -->
    <g transform="scale(1.2)">
      <path d="M 16 2 L 28 6 L 28 16 C 28 22 23 27 16 30 C 9 27 4 22 4 16 L 4 6 Z"
            stroke="${BRAND.accent}" stroke-width="1.5" fill="none"
            stroke-linejoin="round"/>
      <g stroke="${BRAND.text_primary}" stroke-width="1" stroke-linecap="round">
        <line x1="16" y1="16" x2="12" y2="11"/>
        <line x1="16" y1="16" x2="20" y2="11"/>
        <line x1="16" y1="16" x2="16" y2="22"/>
      </g>
      <circle cx="12" cy="11" r="1.8" fill="${BRAND.text_primary}"/>
      <circle cx="20" cy="11" r="1.8" fill="${BRAND.text_primary}"/>
      <circle cx="16" cy="22" r="1.8" fill="${BRAND.text_primary}"/>
      <circle cx="16" cy="16" r="2.4" fill="${BRAND.accent}"/>
    </g>
    <!-- DeFi Academy wordmark -->
    <text x="56" y="26" font-family="Inter" font-size="22" font-weight="700"
          letter-spacing="0.44px" fill="${BRAND.text_primary}">DeFi</text>
    <text x="112" y="26" font-family="Inter" font-size="22" font-weight="700"
          letter-spacing="0.44px" fill="${BRAND.accent}">Academy</text>
  </g>`;
}

/**
 * Progress bar (gold, prominent). Optional for videos.
 */
function renderProgressBar({ progress = 0.3, currentTime = '1:05', totalTime = '6:12' }, y = 960) {
  const x = 120, w = 1680;
  const fillW = w * progress;
  const playheadX = x + fillW;
  return `
  <!-- Progress bar track -->
  <rect x="${x}" y="${y}" width="${w}" height="4" rx="2" fill="rgba(245, 184, 65, 0.15)"/>
  <!-- Progress fill -->
  <rect x="${x}" y="${y}" width="${fillW}" height="4" rx="2" fill="${BRAND.accent}"/>
  <!-- Playhead -->
  <circle cx="${playheadX}" cy="${y + 2}" r="8" fill="${BRAND.accent}"
          stroke="rgba(245, 184, 65, 0.25)" stroke-width="6"/>
  <!-- Time label -->
  <text x="${x}" y="${y - 16}" font-family="Inter" font-size="14"
        font-variant-numeric="tabular-nums" fill="${BRAND.text_secondary}">${currentTime} / ${totalTime}</text>`;
}

/**
 * Full slide composition.
 */
function renderSlideV2({
  moduleNumber,
  lessonNumber,
  category = 'foundation',
  title,
  bullets = [],
  showProgressBar = false,
  progressPercent = 0.17,
  currentTime = '1:05',
  totalTime = '6:12',
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <!-- Background -->
  <rect width="100%" height="100%" fill="${BRAND.bg}"/>

  <!-- Subtle radial glow (very low opacity) -->
  <defs>
    <radialGradient id="bgGlow" cx="70%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${BRAND.accent}" stop-opacity="0.04"/>
      <stop offset="60%" stop-color="${BRAND.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bgGlow)"/>

  ${renderHeader({ moduleNumber, lessonNumber }, 120, 60)}
  ${renderPill(category, 120, 100)}
  ${renderTitle(title, 120, 260)}
  ${renderCheckmarkBullets(bullets, 148, 480)}
  ${renderHeroMotif(moduleNumber, 1260, 340, 440)}
  ${showProgressBar ? renderProgressBar({ progress: progressPercent, currentTime, totalTime }, 960) : ''}
  ${renderWordmarkFooter(1020)}
</svg>`;
}

module.exports = { renderSlideV2, renderPill, renderCheckmarkBullets, renderWordmarkFooter };
