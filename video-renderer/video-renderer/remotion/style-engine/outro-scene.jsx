import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import theme from './theme.json';

/**
 * OutroScene
 *
 * Einheitliche Outro-Szene fuer alle DeFi Academy Lektionsvideos.
 *
 * Aufbau:
 *   1. Kleines Logo oben
 *   2. "NAECHSTE LEKTION" Label
 *   3. Titel der naechsten Lektion
 *   4. Dezenter Hinweis zur Lernplattform
 *
 * Dauer: ca. 12 Sekunden bei 30fps (360 Frames)
 *
 * Props:
 *   - nextLessonTitle?: string
 *   - nextModuleNumber?: number
 *   - nextLessonNumber?: number
 *   - isLastLessonInModule?: boolean
 *   - isLastLessonOverall?: boolean
 */
export const OutroScene = ({
  nextLessonTitle,
  nextModuleNumber,
  nextLessonNumber,
  isLastLessonInModule = false,
  isLastLessonOverall = false,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Phase 1: Logo erscheint (Frame 0 -> 25)
  const logoOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2: Content faded ein (Frame 20 -> 50)
  const contentOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const contentTranslateY = interpolate(frame, [20, 50], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Outro-Fade am Ende
  const outFrame = durationInFrames - 30;
  const globalOpacity = interpolate(
    frame,
    [outFrame, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Text-Logik fuer das naechste-Lektion-Label
  let nextLabel = 'NAECHSTE LEKTION';
  let nextMeta = '';

  if (isLastLessonOverall) {
    nextLabel = 'KURS ABGESCHLOSSEN';
    nextMeta = '';
  } else if (isLastLessonInModule && nextModuleNumber) {
    nextLabel = 'NAECHSTES MODUL';
    nextMeta = `MODUL ${String(nextModuleNumber).padStart(2, '0')} · LEKTION ${String(
      nextLessonNumber ?? 1
    ).padStart(2, '0')}`;
  } else if (nextLessonNumber) {
    nextMeta = `LEKTION ${String(nextLessonNumber).padStart(2, '0')}`;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background.primary,
        fontFamily: `${theme.typography.font_family}, ${theme.typography.fallback}`,
        color: theme.colors.text.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: globalOpacity,
      }}
    >
      {/* Subtiler Gradient-Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 60%, rgba(79, 139, 255, 0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: theme.spacing.lg,
          maxWidth: 1400,
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: theme.typography.scale.heading.size,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            opacity: logoOpacity,
            display: 'flex',
            gap: 14,
          }}
        >
          <span style={{ color: theme.colors.text.primary }}>DeFi</span>
          <span style={{ color: theme.colors.accent.primary }}>Academy</span>
        </div>

        {/* Trennlinie */}
        <div
          style={{
            width: 80,
            height: 2,
            backgroundColor: theme.colors.surface.divider,
            opacity: logoOpacity,
          }}
        />

        {/* Next Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing.md,
            opacity: contentOpacity,
            transform: `translateY(${contentTranslateY}px)`,
          }}
        >
          <div
            style={{
              fontSize: theme.typography.scale.label.size,
              fontWeight: theme.typography.scale.label.weight,
              letterSpacing: theme.typography.scale.label.letter_spacing,
              textTransform: 'uppercase',
              color: theme.colors.accent.primary,
            }}
          >
            {nextLabel}
          </div>

          {isLastLessonOverall ? (
            <div
              style={{
                fontSize: theme.typography.scale.title.size,
                fontWeight: theme.typography.scale.title.weight,
                lineHeight: theme.typography.scale.title.line_height,
                letterSpacing: theme.typography.scale.title.letter_spacing,
                color: theme.colors.text.primary,
                maxWidth: 1200,
              }}
            >
              Du hast den gesamten Kurs durchgearbeitet.
            </div>
          ) : (
            nextLessonTitle && (
              <div
                style={{
                  fontSize: theme.typography.scale.heading.size,
                  fontWeight: theme.typography.scale.heading.weight,
                  lineHeight: theme.typography.scale.heading.line_height,
                  letterSpacing: theme.typography.scale.heading.letter_spacing,
                  color: theme.colors.text.primary,
                  maxWidth: 1200,
                }}
              >
                {nextLessonTitle}
              </div>
            )
          )}

          {nextMeta && !isLastLessonOverall && (
            <div
              style={{
                fontSize: theme.typography.scale.caption.size,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: theme.colors.text.muted,
              }}
            >
              {nextMeta}
            </div>
          )}
        </div>

        {/* Footer Line */}
        <div
          style={{
            marginTop: theme.spacing.xl,
            fontSize: theme.typography.scale.caption.size,
            color: theme.colors.text.muted,
            opacity: contentOpacity,
          }}
        >
          defi-academy.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default OutroScene;
