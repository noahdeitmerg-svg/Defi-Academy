import React from 'react';
import { Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import theme from '../../video-style-engine/theme.json';

/**
 * VisualRenderer
 *
 * Rendert den Inhalt der Visual Area einer Slide basierend auf einem
 * Visual-Plan-Eintrag.
 *
 * Prioritaet:
 *   1. Wenn eine Asset-Datei unter assets/<lesson_id>/visuals/<visual_id>.(png|jpg|svg)
 *      existiert -> diese anzeigen (vom Build/Asset-Resolver bereitgestellt).
 *   2. Fallback: didaktischer Platzhalter mit Label-Text und Typ-Icon.
 *
 * Die Komponente selbst animiert NICHT; Animations-Cues werden uebergeordnet
 * durch <Sequence> + interpolate() gesteuert.
 */
export const VisualRenderer = ({ visual, lessonId, localFps }) => {
  if (!visual) return null;

  // Pfad zur Asset-Datei, die vom Asset-Resolver abgelegt wurde.
  // Konvention: /assets/<lesson_id>/visuals/<visual_id>.<ext>
  const tryExtensions = ['png', 'jpg', 'svg', 'webp'];
  const assetCandidates = tryExtensions.map((ext) =>
    `assets/${lessonId}/visuals/${visual.id}.${ext}`
  );

  // Remotion's Img component triggers delayRender until loaded. We can't
  // "try multiple extensions" at runtime; the resolver script picks the
  // canonical path. Default to PNG.
  const imgPath = assetCandidates[0];

  // Fallback only shown if asset_status = "placeholder" was set by resolver.
  if (visual._placeholder) {
    return <Placeholder visual={visual} />;
  }

  try {
    return (
      <Img
        src={staticFile(imgPath)}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: theme.elements.border_radius.sm,
        }}
      />
    );
  } catch (err) {
    return <Placeholder visual={visual} />;
  }
};

/**
 * Placeholder fuer fehlende Visuals — didaktisch klar, damit ein Preview
 * trotzdem aussagekraeftig ist.
 */
const Placeholder = ({ visual }) => {
  const typeLabels = {
    diagram: 'DIAGRAMM',
    dashboard: 'DASHBOARD',
    screenshot: 'PROTOKOLL-SCREENSHOT',
    chart: 'CHART',
    animation: 'ANIMATION',
  };

  const color = visual.color_accent || theme.colors.accent.primary;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.md,
        width: '100%',
        height: '100%',
        padding: theme.spacing.lg,
        textAlign: 'center',
        color: theme.colors.text.muted,
      }}
    >
      <div
        style={{
          fontSize: theme.typography.scale.label.size,
          fontWeight: 600,
          letterSpacing: theme.typography.scale.label.letter_spacing,
          color,
        }}
      >
        {typeLabels[visual.type] || 'VISUAL'}
      </div>
      <div
        style={{
          width: 80,
          height: 3,
          backgroundColor: color,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          fontSize: theme.typography.scale.body.size,
          fontWeight: 400,
          lineHeight: 1.4,
          color: theme.colors.text.secondary,
          maxWidth: 600,
        }}
      >
        {visual.description}
      </div>
      {visual.source_protocol && (
        <div
          style={{
            fontSize: theme.typography.scale.caption.size,
            color: theme.colors.text.muted,
            marginTop: theme.spacing.sm,
          }}
        >
          Quelle: {visual.source_protocol}
        </div>
      )}
    </div>
  );
};

export default VisualRenderer;
