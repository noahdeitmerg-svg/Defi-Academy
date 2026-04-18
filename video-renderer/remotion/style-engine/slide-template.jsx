import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import theme from './theme.json';

/**
 * SlideTemplate
 *
 * Wiederverwendbare Slide-Komponente für alle DeFi Academy Lektionsvideos.
 *
 * Layout:
 *   - Module-Label (oben links)
 *   - Accent Bar + Titel (oben)
 *   - Linke Spalte: 3-4 Bullet Points
 *   - Rechte Spalte: Visual Area (Diagramm / Screenshot / Grafik)
 *   - Slide-Counter (unten rechts)
 *
 * Props:
 *   - moduleNumber: number   (z.B. 6)
 *   - lessonNumber: number   (z.B. 1)
 *   - slideIndex: number     (1-basiert)
 *   - slideTotal: number     (Gesamtzahl Slides in der Lektion)
 *   - sectionLabel: string   (z.B. "Mechanismus", "Risikoebene")
 *   - title: string
 *   - bullets: string[]      (3-4 Einträge)
 *   - visual: ReactNode      (Diagramm-Komponente oder <img>)
 *   - accentColor?: string   (default: theme.accent.primary)
 */
export const SlideTemplate = ({
  moduleNumber,
  lessonNumber,
  slideIndex,
  slideTotal,
  sectionLabel,
  title,
  bullets = [],
  visual = null,
  accentColor = theme.colors.accent.primary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Minimaler Fade-In für Titel (0 -> 15 Frames)
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleTranslateY = interpolate(frame, [0, 20], [12, 0], {
    extrapolateRight: 'clamp',
  });

  // Gestaffelter Bullet-Fade-In (Start ab Frame 15, je Bullet +8 Frames)
  const getBulletOpacity = (i) =>
    interpolate(frame, [15 + i * 8, 25 + i * 8], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  const getBulletTranslateX = (i) =>
    interpolate(frame, [15 + i * 8, 28 + i * 8], [-8, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Visual Area Fade-In (nach Bullets)
  const visualOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const moduleLabel = theme.branding.module_label_format
    .replace('{module}', String(moduleNumber).padStart(2, '0'))
    .replace('{lesson}', String(lessonNumber).padStart(2, '0'));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background.primary,
        fontFamily: `${theme.typography.font_family}, ${theme.typography.fallback}`,
        color: theme.colors.text.primary,
        padding: `${theme.spacing.safe_area.top}px ${theme.spacing.safe_area.right}px ${theme.spacing.safe_area.bottom}px ${theme.spacing.safe_area.left}px`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* --- Top Bar: Module Label --- */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
        }}
      >
        <div
          style={{
            fontSize: theme.typography.scale.label.size,
            fontWeight: theme.typography.scale.label.weight,
            letterSpacing: theme.typography.scale.label.letter_spacing,
            textTransform: 'uppercase',
            color: theme.colors.text.muted,
          }}
        >
          {moduleLabel}
        </div>
        {sectionLabel && (
          <div
            style={{
              fontSize: theme.typography.scale.label.size,
              fontWeight: theme.typography.scale.label.weight,
              letterSpacing: theme.typography.scale.label.letter_spacing,
              textTransform: 'uppercase',
              color: accentColor,
              padding: `6px 14px`,
              border: `1px solid ${accentColor}`,
              borderRadius: theme.elements.border_radius.pill,
            }}
          >
            {sectionLabel}
          </div>
        )}
      </div>

      {/* --- Title Row --- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl,
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
        }}
      >
        <div
          style={{
            width: theme.elements.accent_bar.width,
            height: theme.typography.scale.slide_title.size * 1.1,
            backgroundColor: accentColor,
            borderRadius: theme.elements.accent_bar.border_radius,
            flexShrink: 0,
            marginTop: 6,
          }}
        />
        <h1
          style={{
            fontSize: theme.typography.scale.slide_title.size,
            fontWeight: theme.typography.scale.slide_title.weight,
            lineHeight: theme.typography.scale.slide_title.line_height,
            letterSpacing: theme.typography.scale.slide_title.letter_spacing,
            margin: 0,
            color: theme.colors.text.primary,
          }}
        >
          {title}
        </h1>
      </div>

      {/* --- Content Grid: Bullets (left) + Visual (right) --- */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          gap: theme.spacing.xl,
          alignItems: 'stretch',
        }}
      >
        {/* Left: Bullets */}
        <div
          style={{
            flex: theme.layout.text_area.width_ratio,
            display: 'flex',
            flexDirection: 'column',
            gap: theme.layout.text_area.bullet_spacing,
            justifyContent: 'flex-start',
            paddingTop: theme.spacing.md,
          }}
        >
          {bullets.slice(0, 4).map((bullet, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: theme.elements.bullet.spacing,
                opacity: getBulletOpacity(i),
                transform: `translateX(${getBulletTranslateX(i)}px)`,
              }}
            >
              <div
                style={{
                  width: theme.elements.bullet.size,
                  height: 3,
                  backgroundColor: accentColor,
                  borderRadius: 2,
                  marginTop: theme.typography.scale.bullet.size * 0.6,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontSize: theme.typography.scale.bullet.size,
                  fontWeight: theme.typography.scale.bullet.weight,
                  lineHeight: theme.typography.scale.bullet.line_height,
                  color: theme.colors.text.secondary,
                  margin: 0,
                }}
              >
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Visual Area */}
        <div
          style={{
            flex: theme.layout.visual_area.width_ratio,
            backgroundColor: theme.layout.visual_area.background,
            border: `${theme.layout.visual_area.border_width}px solid ${theme.layout.visual_area.border_color}`,
            borderRadius: theme.layout.visual_area.border_radius,
            padding: theme.layout.visual_area.padding,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: visualOpacity,
            overflow: 'hidden',
          }}
        >
          {visual || (
            <div
              style={{
                color: theme.colors.text.muted,
                fontSize: theme.typography.scale.caption.size,
                textAlign: 'center',
              }}
            >
              [ Visual Placeholder ]
            </div>
          )}
        </div>
      </div>

      {/* --- Footer: Brand + Slide Counter --- */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: theme.spacing.lg,
          paddingTop: theme.spacing.md,
          borderTop: `1px solid ${theme.colors.surface.divider}`,
        }}
      >
        <div
          style={{
            fontSize: theme.typography.scale.caption.size,
            fontWeight: 600,
            color: theme.colors.text.secondary,
          }}
        >
          <span style={{ color: theme.colors.text.primary }}>
            {theme.branding.logo_text.split(' ')[0]}
          </span>
          <span style={{ color: accentColor }}>
            {' '}
            {theme.branding.logo_text.split(' ')[1]}
          </span>
        </div>
        <div
          style={{
            fontSize: theme.typography.scale.caption.size,
            color: theme.colors.text.muted,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {String(slideIndex).padStart(2, '0')} / {String(slideTotal).padStart(2, '0')}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default SlideTemplate;
