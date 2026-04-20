import fs from "node:fs/promises";
import path from "node:path";
import { ALL_MODULES } from "@/data/courseStructure";

/**
 * Legacy-Dateiname unter public/videos/ (wie publish-videos.js / lessonAssets):
 * module01-lesson01 → module1-1-1 — hier aus UX-IDs (modulId + lektionId) abgeleitet.
 */
export function legacyPublicVideoBasename(
  modulId: string,
  lektionId: string
): string | null {
  const mod = ALL_MODULES.find((m) => m.id === modulId);
  if (!mod) return null;
  const idx = mod.lessons.indexOf(lektionId);
  if (idx < 0) return null;
  const n = mod.number;
  const lessonOrdinal = idx + 1;
  return `module${n}-${n}-${lessonOrdinal}`;
}

function cdnBase(): string {
  const raw = process.env.NEXT_PUBLIC_VIDEO_CDN_URL?.trim().replace(/\/$/, "") ?? "";
  return raw.length > 0 ? raw : "https://cdn.defi-akademie.de";
}

/**
 * 1) Wenn `public/videos/<legacy>.mp4` existiert → `/videos/...` (GitHub Pages + withBasePath im Player).
 * 2) Sonst CDN: `<CDN>/modules/<modulId>/<lektionId>.mp4`
 */
export async function resolveUxLessonVideoUrl(
  modulId: string,
  lektionId: string
): Promise<string> {
  const base = legacyPublicVideoBasename(modulId, lektionId);
  if (base) {
    const abs = path.join(process.cwd(), "public", "videos", `${base}.mp4`);
    try {
      const st = await fs.stat(abs);
      if (st.isFile()) return `/videos/${base}.mp4`;
    } catch {
      /* keine lokale Datei */
    }
  }
  return `${cdnBase()}/modules/${modulId}/${lektionId}.mp4`;
}
