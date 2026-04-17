import { withBasePath } from "@/lib/assetPath";
import type { LessonVideoAsset } from "@/lib/lessonAssets";

type Props = {
  asset: LessonVideoAsset;
  title: string;
};

/**
 * Responsiver HTML5-Video-Player oberhalb des Lesson-Contents.
 *
 * - `aspect-video` + `w-full` fuer saubere Darstellung auf Desktop/Tablet/Mobile
 * - `preload="metadata"` haelt den initialen Payload klein
 * - `playsInline` verhindert Auto-Fullscreen auf iOS
 * - basePath wird via `withBasePath` an die Asset-URL gehaengt,
 *   damit es unter GitHub Pages (`/Defi-Academy/...`) korrekt ausgeliefert wird
 */
export function LessonVideoHero({ asset, title }: Props) {
  const videoSrc = withBasePath(asset.src);
  const posterSrc = asset.poster ? withBasePath(asset.poster) : undefined;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black shadow-sm">
      <video
        controls
        preload="metadata"
        playsInline
        poster={posterSrc}
        aria-label={`Video zur Lektion: ${title}`}
        className="block h-auto w-full aspect-video"
      >
        <source src={videoSrc} type={asset.type} />
        Dein Browser unterstuetzt kein HTML5-Video.
      </video>
    </div>
  );
}
