"use client";

import { ALL_MODULES, TOTAL_LESSON_COUNT } from "@/data/courseStructure";
import { useProgress } from "@/lib/progress/useProgress";
import { TierBadge } from "./TierBadge";

export function KursProgressSummaryCard() {
  const { progress, getCourseProgress, isLessonCompleted } = useProgress();
  let completed = 0;
  for (const m of ALL_MODULES) {
    for (const lid of m.lessons) {
      if (isLessonCompleted(m.id, lid)) completed += 1;
    }
  }
  const pct = getCourseProgress();

  return (
    <section
      className="rounded-2xl border border-ux-border bg-ux-surface p-5 md:p-6"
      aria-labelledby="kurs-fortschritt-heading"
    >
      <p
        id="kurs-fortschritt-heading"
        className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ux-text-muted"
      >
        Dein Fortschritt
      </p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-3xl font-bold tabular-nums text-ux-text-primary md:text-4xl">
            {completed}{" "}
            <span className="text-lg font-medium text-ux-text-muted md:text-xl">
              / {TOTAL_LESSON_COUNT} Lektionen
            </span>
          </p>
          <p className="mt-1 text-sm text-ux-text-secondary">
            Kurs gesamt: <span className="font-ux-mono text-ux-text-primary">{pct}%</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-ux-text-muted">Tier</span>
          <TierBadge tier={progress.tier} />
        </div>
      </div>
      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-ux-surface-elevated">
        <div
          className="h-full rounded-full bg-ux-accent-gold transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
}
