"use client";

import type { Slide } from "@/data/types";
import { cn } from "@/lib/utils/cn";

export function SlideThumbnailStrip({
  slides,
  index,
  onSelect,
}: {
  slides: Slide[];
  index: number;
  onSelect: (i: number) => void;
}) {
  if (slides.length <= 1) return null;

  return (
    <div
      className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Folien auswählen"
    >
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(i)}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-md border-2 transition-colors",
              active
                ? "border-ux-accent-gold ring-1 ring-ux-accent-gold/40"
                : "border-ux-border hover:border-ux-text-muted"
            )}
          >
            <div className="flex h-14 w-20 flex-col bg-ux-surface-elevated">
              {s.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.imageUrl}
                  alt=""
                  className="h-full w-full object-cover opacity-90"
                />
              ) : (
                <div className="flex flex-1 flex-col justify-between p-1.5 text-left">
                  <span className="font-ux-mono text-[9px] text-ux-text-muted">
                    {i + 1}
                  </span>
                  <span className="line-clamp-2 text-[9px] leading-tight text-ux-text-secondary">
                    {s.title}
                  </span>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
