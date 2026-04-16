"use client";

import { useCallback, useMemo, useState } from "react";
import type { Slide } from "@/lib/types";

type Props = {
  slides: Slide[];
};

export function SlideViewer({ slides }: Props) {
  const safeSlides = useMemo(
    () => (slides.length ? slides : [{ title: "Keine Folien", bullets: [] }]),
    [slides],
  );
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => {
        const n = i + dir;
        if (n < 0) return 0;
        if (n >= safeSlides.length) return safeSlides.length - 1;
        return n;
      });
    },
    [safeSlides.length],
  );

  const slide = safeSlides[index];
  const progress = ((index + 1) / safeSlides.length) * 100;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6 shadow-sm">
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            Folie {index + 1} / {safeSlides.length}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-[var(--color-text)]">{slide.title}</h3>
          {slide.bullets.length > 0 ? (
            <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
              {slide.bullets.map((b, bi) => (
                <li key={`${b}-${bi}`} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-accent)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              Keine Stichpunkte für diese Folie hinterlegt.
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-lg transition enabled:hover:border-[var(--color-accent)] disabled:opacity-40"
            aria-label="Vorherige Folie"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === safeSlides.length - 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-lg transition enabled:hover:border-[var(--color-accent)] disabled:opacity-40"
            aria-label="Nächste Folie"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
