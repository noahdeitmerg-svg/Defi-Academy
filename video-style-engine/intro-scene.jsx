import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import theme from './theme.json';

/**
 * IntroScene
 *
 * Einheitliche Intro-Szene fuer alle DeFi Academy Lektionsvideos.
 *
 * Aufbau:
 *   1. Horizontale Akzentlinie expandiert von Mitte nach aussen
 *   2. Logo "DeFi Academy" faded ein (leichter Rise)
 *   3. Modul- / Lektionskennzeichnung erscheint darunter
 *
 * Dauer: ca. 12 Sekunden bei 30fps (360 Frames)
 *
 * Props:
 *   - moduleNumber: number
 *   - lessonNumber: number
 *   - lessonTitle?: string   (optional, wird nicht prominent angezeigt)
 */
export const IntroScene = ({
  moduleNumber,
  lessonNumber,
  lessonTitle,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Phase 1: Linie expandiert (Frame 0 -> 20)
  const lineWidth = interpolate(frame, [0, 20], [0, 320], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2: Logo fade + rise (Frame 15 -> 40)
  const logoOpacity = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const logoTranslateY = interpolate(frame, [15, 40], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3: Label fade (Frame 45 -> 70)
  const labelOpacity = interpolate(frame, [45, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Outro: Alles fadet am Ende weg
  const outFrame = durationInFrames - 20;
  const globalOpacity = interpolate(
    frame,
    [outFrame, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const moduleLabel = theme.branding.module_label_format
    .replace('{module}', String(moduleNumber).padStart(2, '0'))
    .replace('{lesson}', String(lessonNumber).padStart(2, '0'));

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
      {/* Subtiler Gradient-Overlay fuer Tiefe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(79, 139, 255, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: theme.spacing.lg,
        }}
      >
        {/* Akzentlinie */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            backgroundColor: theme.colors.accent.primary,
            borderRadius: 2,
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: theme.typography.scale.display.size,
            fontWeight: theme.typography.scale.display.weight,
            letterSpacing: theme.typography.scale.display.letter_spacing,
            lineHeight: 1,
            opacity: logoOpacity,
            transform: `translateY(${logoTranslateY}px)`,
            display: 'flex',
            gap: 20,
          }}
        >
          <span style={{ color: theme.colors.text.primary }}>DeFi</span>
          <span style={{ color: theme.colors.accent.primary }}>Academy</span>
        </div>

        {/* Modul- / Lektions-Label */}
        <div
          style={{
            fontSize: theme.typography.scale.label.size,
            fontWeight: theme.typography.scale.label.weight,
            letterSpacing: theme.typography.scale.label.letter_spacing,
            textTransform: 'uppercase',
            color: theme.colors.text.muted,
            opacity: labelOpacity,
            marginTop: theme.spacing.md,
          }}
        >
          {moduleLabel}
        </div>

        {/* Optional: Lesson Title dezent darunter */}
        {lessonTitle && (
          <div
            style={{
              fontSize: theme.typography.scale.subheading.size,
              fontWeight: theme.typography.scale.subheading.weight,
              color: theme.colors.text.secondary,
              opacity: labelOpacity,
              maxWidth: 1200,
              textAlign: 'center',
              lineHeight: theme.typography.scale.subheading.line_height,
            }}
          >
            {lessonTitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export default IntroScene;
