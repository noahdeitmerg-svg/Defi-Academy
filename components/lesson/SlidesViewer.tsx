"use client";

import type { Slide } from "@/data/types";
import { cn } from "@/lib/utils/cn";

export function SlidesViewer({
  slides,
  index,
}: {
  slides: Slide[];
  index: number;
}) {
  const slide = slides[index];
  if (!slide) {
    return (
      <div className="rounded-lg border border-dashed border-ux-border bg-ux-surface p-8 text-center text-sm text-ux-text-muted">
        Keine Folien für diese Lektion hinterlegt.
      </div>
    );
  }
  return (
    <article
      className={cn(
        "min-h-[12rem] rounded-lg border border-ux-border bg-ux-surface-elevated p-6",
        slide.imageUrl && "p-0 overflow-hidden"
      )}
      aria-live="polite"
    >
      {slide.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={slide.imageUrl} alt="" className="max-h-80 w-full object-contain" />
      ) : null}
      <div className={slide.imageUrl ? "p-6" : ""}>
        <h3 className="text-lg font-semibold text-ux-text-primary">{slide.title}</h3>
        <p className="mt-3 whitespace-pre-wrap text-sm text-ux-text-secondary">{slide.content}</p>
      </div>
    </article>
  );
}
