/**
 * brand-2.0 design tokens
 *
 * Dieser File ergänzt colors.json um die Komponenten-Primitives,
 * die Brand 2.0 einführt. Die Farb-Grundlage bleibt unverändert.
 *
 * Philosophie:
 *   "Tiefe statt Hype" bleibt Leitprinzip.
 *   Keine 3D-Renders, keine Sparkles, keine Stock-Illustrationen.
 *   Stattdessen: flache, präzise Module-Hero-Motive, die visuelle
 *   Konsistenz über alle 13 Module sicherstellen.
 *
 * Komponenten definiert:
 *   - checkmark_bullet  (gold-umrandeter Kreis mit weißem Check)
 *   - category_pill     (klein, oben links)
 *   - wordmark_footer   (zentriert, mit Shield)
 *   - progress_bar      (gold, prominent)
 *   - hero_motif_spec   (Vorgabe fuer Modul-Hero-Motive)
 */

'use strict';

const BRAND_2_COMPONENTS = {
  version: '2.0.0',

  // ── Bullet Markers ─────────────────────────────────────────────
  checkmark_bullet: {
    type: 'circle_with_check',
    diameter_px: 32,
    ring_color: '#F5B841',
    ring_width_px: 2,
    fill_color: 'rgba(245, 184, 65, 0.10)',
    check_color: '#F5B841',
    check_stroke_width_px: 2.5,
    spacing_to_text_px: 16,
    text_color: '#FFFFFF',
    text_size_px: 28,
    text_weight: 500,
    item_gap_px: 18,
  },

  // ── Category Pill ──────────────────────────────────────────────
  category_pill: {
    position: 'top_left',
    padding_x_px: 16,
    padding_y_px: 6,
    border_radius_px: 999,
    border_width_px: 1,
    border_color: '#F5B841',
    background_color: 'rgba(245, 184, 65, 0.08)',
    text_color: '#F5B841',
    text_size_px: 14,
    text_weight: 600,
    letter_spacing_em: 0.1,
    uppercase: true,
    categories: {
      foundation: 'GRUNDLAGEN',              // Module 1–3
      practice: 'PROTOKOLLMECHANIK',         // Module 4–8
      strategy: 'STRATEGIE',                  // Module 9–13
      infrastructure: 'INFRASTRUKTUR',        // Module 14–17
    },
  },

  // ── Wordmark Footer ────────────────────────────────────────────
  wordmark_footer: {
    position: 'bottom_center',
    shield_size_px: 28,
    shield_gap_to_text_px: 12,
    wordmark_size_px: 24,
    wordmark_weight: 700,
    wordmark_text: 'DeFi Academy',
    wordmark_color_primary: '#FFFFFF',   // "DeFi"
    wordmark_color_accent: '#F5B841',    // "Academy"
    letter_spacing_em: 0.02,
    margin_bottom_px: 60,
  },

  // ── Progress Bar ───────────────────────────────────────────────
  progress_bar: {
    position: 'above_wordmark',
    height_px: 4,
    track_color: 'rgba(245, 184, 65, 0.15)',
    fill_color: '#F5B841',
    playhead_diameter_px: 14,
    playhead_color: '#F5B841',
    playhead_ring_color: 'rgba(245, 184, 65, 0.25)',
    show_timestamp: true,
    timestamp_color: '#A0AEC0',
    timestamp_size_px: 14,
  },

  // ── Hero-Motif Specification ──────────────────────────────────
  // Wir definieren einmal, was jedes Hero-Motiv erfuellen muss.
  // Dann generieren wir eins pro Modul (13 insgesamt) nach exakt
  // dieser Spezifikation — keine KI-Renders, keine Stockfotos,
  // sondern programmatisch erzeugte, brand-konsistente SVG.
  hero_motif_spec: {
    size_px: 400,
    stroke_based: true, // line-art, keine Solid-Flaechen
    primary_stroke_color: '#F5B841',
    primary_stroke_width_px: 2,
    secondary_stroke_color: 'rgba(245, 184, 65, 0.35)',
    background: 'transparent',
    allowed_elements: [
      'geometric_shapes', // Kreise, Polygone, Linien
      'dashed_lines',
      'dotted_grids',
      'directional_arrows',
      'abstract_network_nodes',
    ],
    forbidden_elements: [
      'solid_fill_shapes',
      'gradients',
      'glow_effects',
      'sparkles_or_particles',
      'photo_realistic_objects',
      'mascots_or_characters',
    ],
    philosophy: [
      'Ein Motiv ist ein visueller Anker, kein Blickfang.',
      'Es sollte in Graustufen und bei 50% Transparenz noch funktionieren.',
      'Es muss auf den Lektionstitel antworten, nicht auf das Thema DeFi.',
      'Bewegungen sind subtil — dezentes Zeichnen, kein Explodieren.',
    ],
  },

  // ── Slide Layout Overrides ────────────────────────────────────
  slide_layout: {
    category_pill_position: { x: 120, y: 80 },
    title_start_y: 220,
    title_accent_bar_width_px: 6,
    title_accent_bar_color: '#F5B841',
    bullet_list_start_y: 360,
    hero_motif_position: { x: 1200, y: 380 }, // right side, vertical center
    hero_motif_max_width: 520,
    hero_motif_max_height: 520,
    footer_divider_y: 960,
    wordmark_y: 1020,
  },
};

module.exports = BRAND_2_COMPONENTS;
