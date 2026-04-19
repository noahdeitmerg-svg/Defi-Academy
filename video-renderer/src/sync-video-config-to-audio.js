'use strict';

/**
 * Ermittelt das Ende der Sektions-Timeline (max end_seconds, duration_seconds).
 */
function getTimelineEndSeconds(videoConfig) {
  let maxEnd = Number(videoConfig.duration_seconds) || 0;
  for (const s of videoConfig.sections || []) {
    const e = Number(s.end_seconds);
    if (Number.isFinite(e) && e > maxEnd) maxEnd = e;
  }
  return maxEnd;
}

function roundTime(x) {
  return Math.round(x * 1e6) / 1e6;
}

/**
 * Skaliert alle Zeitstempel proportional, sodass die Timeline exakt
 * `targetDurationSeconds` lang ist (typisch: gemessene MP3-Dauer).
 *
 * Behebt den Fall, dass video_config.json laenger ist als die reale
 * Voice-Datei (Ton bricht ab, Folien laufen weiter) bzw. kuerzer
 * (Audio wird am Export-Ende abgeschnitten).
 */
function scaleVideoConfigToDuration(videoConfig, targetDurationSeconds) {
  const timelineEnd = getTimelineEndSeconds(videoConfig);
  if (!timelineEnd || timelineEnd <= 0) return videoConfig;
  if (!targetDurationSeconds || targetDurationSeconds <= 0) return videoConfig;

  const epsilon = 0.15;
  const out = JSON.parse(JSON.stringify(videoConfig));

  if (Math.abs(timelineEnd - targetDurationSeconds) <= epsilon) {
    out.duration_seconds = roundTime(targetDurationSeconds);
    const last = out.sections[out.sections.length - 1];
    if (last) last.end_seconds = out.duration_seconds;
    return out;
  }

  const factor = targetDurationSeconds / timelineEnd;

  for (const s of out.sections || []) {
    s.start_seconds = roundTime(Number(s.start_seconds) * factor);
    s.end_seconds = roundTime(Number(s.end_seconds) * factor);
  }

  const last = out.sections[out.sections.length - 1];
  if (last) last.end_seconds = roundTime(targetDurationSeconds);
  out.duration_seconds = roundTime(targetDurationSeconds);

  if (Array.isArray(out.visual_timing)) {
    for (const vt of out.visual_timing) {
      vt.start_seconds = roundTime(Number(vt.start_seconds) * factor);
      vt.end_seconds = roundTime(Number(vt.end_seconds) * factor);
    }
  }

  return out;
}

/**
 * Ob die Timeline an die gemessene MP3-Dauer angepasst werden soll.
 *
 * - Echte ElevenLabs-Dateien sind oft **kuerzer** als die Template-Timeline
 *   (474s) — dann soll skaliert werden, damit Folien zur Sprecherlaenge passen.
 * - Nur bei **kaputten Stubs** (winzige Datei + extrem kurze Metadata) nicht
 *   skalieren, damit nicht alles auf Sekunden zusammenfaellt.
 */
function shouldApplyAudioDurationSync(
  timelineEndSeconds,
  audioSeconds,
  fileSizeBytes = Number.POSITIVE_INFINITY
) {
  if (!timelineEndSeconds || timelineEndSeconds <= 0) return false;
  if (!audioSeconds || audioSeconds <= 0) return false;
  const stubBytes = 4096;
  const stubMaxSeconds = 25;
  if (fileSizeBytes < stubBytes && audioSeconds < stubMaxSeconds) return false;
  return true;
}

module.exports = {
  getTimelineEndSeconds,
  scaleVideoConfigToDuration,
  roundTime,
  shouldApplyAudioDurationSync,
};
