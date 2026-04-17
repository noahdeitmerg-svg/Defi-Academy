import fs from "node:fs/promises";
import path from "node:path";

/**
 * Konvention fuer Lesson-Videos (optional pro Lektion):
 *
 *   public/videos/<moduleSlug>-<lessonSlug>.mp4
 *   public/posters/<moduleSlug>-<lessonSlug>.jpg   (optional)
 *
 * Beispiel:
 *   public/videos/module6-6-1.mp4
 *   public/posters/module6-6-1.jpg
 *
 * Erkennung erfolgt zur Build-Zeit (Server Component). Wenn die Datei
 * nicht existiert, liefert `resolveLessonVideo` `null`, und die Lesson
 * rendert ohne Video-Player weiter.
 */

export type LessonVideoAsset = {
  /** oeffentlicher Pfad ab `/`, ohne basePath */
  src: string;
  /** oeffentlicher Pfad ab `/`, ohne basePath; null wenn kein Poster vorhanden */
  poster: string | null;
  /** MIME Type */
  type: "video/mp4";
};

const VIDEO_DIR = path.join(process.cwd(), "public", "videos");
const POSTER_DIR = path.join(process.cwd(), "public", "posters");

async function fileExists(abs: string): Promise<boolean> {
  try {
    const stat = await fs.stat(abs);
    return stat.isFile();
  } catch {
    return false;
  }
}

export function buildLessonAssetBase(moduleSlug: string, lessonSlug: string): string {
  return `${moduleSlug}-${lessonSlug}`;
}

export async function resolveLessonVideo(
  moduleSlug: string,
  lessonSlug: string,
): Promise<LessonVideoAsset | null> {
  const base = buildLessonAssetBase(moduleSlug, lessonSlug);
  const videoAbs = path.join(VIDEO_DIR, `${base}.mp4`);
  if (!(await fileExists(videoAbs))) return null;

  const posterAbs = path.join(POSTER_DIR, `${base}.jpg`);
  const hasPoster = await fileExists(posterAbs);

  return {
    src: `/videos/${base}.mp4`,
    poster: hasPoster ? `/posters/${base}.jpg` : null,
    type: "video/mp4",
  };
}
