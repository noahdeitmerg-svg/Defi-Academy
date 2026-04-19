import lessonDurations from "@/config/lesson-audio-durations.json";

function formatSeconds(total: number): string {
  const s = Math.max(0, Math.round(total));
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m === 0) return `${r} s`;
  if (r === 0) return `${m} Min`;
  return `${m} Min ${r} s`;
}

/**
 * Anzeige-Dauer: bevorzugt gemessene Audio-Länge (Pipeline v2, ffprobe),
 * sonst Frontmatter-Fallback (z. B. „60–75 Minuten“ aus Modul-Header).
 */
export function resolveLessonDurationLabel(
  moduleSlug: string,
  lessonSlug: string,
  frontmatterFallback: string,
): string {
  const key = `${moduleSlug}/${lessonSlug}`;
  const map = lessonDurations as Record<string, number>;
  const sec = map[key];
  if (typeof sec === "number" && Number.isFinite(sec) && sec > 0) {
    return formatSeconds(sec);
  }
  const fb = (frontmatterFallback || "").trim();
  return fb.length > 0 ? fb : "—";
}
