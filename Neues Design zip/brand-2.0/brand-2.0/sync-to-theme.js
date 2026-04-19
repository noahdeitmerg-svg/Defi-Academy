#!/usr/bin/env node
/**
 * sync-to-theme.js
 *
 * Propagiert das Brand-System in video-style-engine/theme.json.
 *
 * Das Brand-System ist Single Source of Truth. Dieses Script baut aus
 * /brand/colors.json + /brand/typography.json eine neue theme.json, die
 * exakt dieselben Farb- und Typo-Entscheidungen enthaelt.
 *
 * Usage:
 *   node brand/sync-to-theme.js [--style ../video-style-engine]
 *
 * Danach im Video-Renderer:
 *   node scripts/setup.js   # Kopiert die neue theme.json in den Renderer
 */

'use strict';

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    args[key] = val;
  }
  return args;
}

function run() {
  const args = parseArgs(process.argv);
  const brandDir = path.resolve(__dirname);
  const styleEngineDir = path.resolve(
    args.style || path.join(brandDir, '..', 'video-style-engine')
  );

  console.log('DeFi Academy — Brand → Video Style Engine Sync');
  console.log('─'.repeat(60));
  console.log('Brand dir:   ', brandDir);
  console.log('Style engine:', styleEngineDir);
  console.log('');

  if (!fs.existsSync(styleEngineDir)) {
    console.error(`❌ Style engine not found at ${styleEngineDir}`);
    process.exit(1);
  }

  const colors = JSON.parse(
    fs.readFileSync(path.join(brandDir, 'colors.json'), 'utf8')
  );
  const typo = JSON.parse(
    fs.readFileSync(path.join(brandDir, 'typography.json'), 'utf8')
  );

  const theme = {
    name: 'DeFi Academy Video Theme',
    version: '1.1.0',
    description:
      'Derived automatically from /brand/colors.json and /brand/typography.json. Do NOT edit directly — run brand/sync-to-theme.js instead.',
    _generated_from: ['brand/colors.json', 'brand/typography.json'],
    _generated_at: new Date().toISOString(),

    canvas: {
      width: 1920,
      height: 1080,
      aspect_ratio: '16:9',
      fps: 30,
      background: colors.surfaces.background_primary,
    },

    colors: {
      background: {
        primary: colors.surfaces.background_primary,
        secondary: colors.surfaces.background_elevated,
        elevated: colors.surfaces.background_overlay,
      },
      surface: {
        card: colors.surfaces.card,
        border: colors.surfaces.border,
        divider: colors.surfaces.divider,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        muted: colors.text.muted,
        inverse: colors.text.inverse,
        on_accent: colors.text.on_accent,
      },
      accent: {
        primary: colors.accent.primary,
        primary_hover: colors.accent.primary_hover,
        primary_soft: colors.accent.primary_soft,
        primary_ring: colors.accent.primary_ring,
      },
      semantic: {
        info: colors.semantic.info,
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        risk: colors.semantic.risk,
        risk_soft: colors.semantic.risk_soft,
      },
      chart_palette: colors.chart_palette,
    },

    typography: {
      font_family: typo.font_family.primary,
      fallback: typo.font_family.fallback_stack,
      weights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      scale: {
        display: {
          size: typo.display_variants.hero_intro.size_px,
          line_height: typo.display_variants.hero_intro.line_height,
          weight: typo.display_variants.hero_intro.weight,
          letter_spacing: typo.display_variants.hero_intro.letter_spacing,
        },
        title: {
          size: typo.hierarchy.title.size_px,
          line_height: typo.hierarchy.title.line_height,
          weight: typo.hierarchy.title.weight,
          letter_spacing: typo.hierarchy.title.letter_spacing,
        },
        slide_title: {
          size: typo.hierarchy.slide_title.size_px,
          line_height: typo.hierarchy.slide_title.line_height,
          weight: typo.hierarchy.slide_title.weight,
          letter_spacing: typo.hierarchy.slide_title.letter_spacing,
        },
        heading: {
          size: 44,
          line_height: 1.25,
          weight: 600,
          letter_spacing: '-0.01em',
        },
        subheading: {
          size: 30,
          line_height: 1.35,
          weight: 500,
          letter_spacing: '0em',
        },
        body: {
          size: typo.hierarchy.body.size_px,
          line_height: typo.hierarchy.body.line_height,
          weight: typo.hierarchy.body.weight,
          letter_spacing: typo.hierarchy.body.letter_spacing,
        },
        bullet: {
          size: typo.hierarchy.bullet.size_px,
          line_height: typo.hierarchy.bullet.line_height,
          weight: typo.hierarchy.bullet.weight,
          letter_spacing: typo.hierarchy.bullet.letter_spacing,
        },
        caption: {
          size: typo.hierarchy.caption.size_px,
          line_height: typo.hierarchy.caption.line_height,
          weight: typo.hierarchy.caption.weight,
          letter_spacing: typo.hierarchy.caption.letter_spacing,
        },
        label: {
          size: typo.hierarchy.section_label.size_px,
          line_height: typo.hierarchy.section_label.line_height,
          weight: typo.hierarchy.section_label.weight,
          letter_spacing: typo.hierarchy.section_label.letter_spacing,
          text_transform: 'uppercase',
        },
      },
    },

    spacing: {
      unit: 8,
      xs: 8,
      sm: 16,
      md: 24,
      lg: 40,
      xl: 64,
      xxl: 96,
      safe_area: {
        top: 80,
        right: 120,
        bottom: 80,
        left: 120,
      },
    },

    layout: {
      slide_grid: {
        columns: 12,
        gap: 32,
        content_max_width: 1680,
      },
      visual_area: {
        width_ratio: 0.55,
        height_ratio: 0.7,
        alignment: 'right',
        padding: 32,
        background: colors.surfaces.card,
        border_color: colors.surfaces.border,
        border_width: 1,
        border_radius: 12,
      },
      text_area: {
        width_ratio: 0.4,
        alignment: 'left',
        bullet_spacing: 24,
      },
    },

    elements: {
      border_radius: {
        sm: 6,
        md: 12,
        lg: 20,
        pill: 999,
      },
      shadow: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.25)',
        md: '0 8px 24px rgba(0, 0, 0, 0.35)',
        lg: '0 16px 48px rgba(0, 0, 0, 0.45)',
      },
      accent_bar: {
        width: 6,
        color: colors.accent.primary,
        border_radius: 3,
      },
      bullet: {
        type: 'dash',
        color: colors.accent.primary,
        size: 14,
        spacing: 16,
      },
    },

    branding: {
      logo_text: 'DeFi Academy',
      logo_color: colors.text.primary,
      logo_accent: colors.accent.primary,
      logo_svg_path: 'brand/logo.svg',
      logo_lockup_svg_path: 'brand/logo-lockup.svg',
      lower_third_enabled: true,
      module_label_position: 'top-left',
      module_label_format: 'MODUL {module} · LEKTION {lesson}',
    },
  };

  // Write theme.json
  const themePath = path.join(styleEngineDir, 'theme.json');
  fs.writeFileSync(themePath, JSON.stringify(theme, null, 2), 'utf8');
  console.log(`✔ Wrote ${themePath}`);

  // Copy brand files into the engine for direct access
  const brandCopyDir = path.join(styleEngineDir, 'brand');
  fs.mkdirSync(brandCopyDir, { recursive: true });
  const brandFiles = ['colors.json', 'typography.json', 'logo.svg', 'logo-lockup.svg', 'logo-mono.svg', 'brand-preview.svg', 'design-guidelines.md'];
  for (const f of brandFiles) {
    const src = path.join(brandDir, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(brandCopyDir, f));
      console.log(`✔ Mirrored brand/${f}`);
    }
  }

  console.log('');
  console.log('Done. Next step:');
  console.log('  In video-renderer:  node scripts/setup.js');
  console.log('    (propagates the new theme.json into the renderer)');
}

try {
  run();
} catch (err) {
  console.error('❌ Sync failed:', err.message);
  process.exit(1);
}
