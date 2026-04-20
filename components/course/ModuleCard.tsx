"use client";

import Link from "next/link";
import type { Module } from "@/data/types";
import { TierBadge } from "./TierBadge";
import { useProgress } from "@/lib/progress/useProgress";
import { formatDurationMinutes } from "@/lib/utils/formatDuration";
import { cn } from "@/lib/utils/cn";

export function ModuleCard({ module }: { module: Module }) {
  const { progress, getModuleProgress, isLessonCompleted } = useProgress();
  const pct = getModuleProgress(module.id);
  const total = module.lessons.length;
  const done = module.lessons.filter((l) => isLessonCompleted(module.id, l)).length;
  const locked = module.tier === "pro" && progress.tier === "free";

  const stripClass = locked
    ? "bg-ux-locked"
    : pct >= 100
      ? "bg-ux-success"
      : pct > 0
        ? "bg-ux-accent-gold"
        : "bg-ux-border";

  const statusLabel = locked
    ? "Upgrade erforderlich"
    : pct >= 100
      ? "✓ Fertig"
      : pct > 0
        ? `${pct}%`
        : "0%";

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[220px] overflow-hidden rounded-2xl border border-ux-border bg-ux-surface",
        locked && "opacity-[0.72]"
      )}
    >
      <div className={cn("w-1 shrink-0 rounded-l-2xl", stripClass)} aria-hidden />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ux-text-muted">
            Modul {String(module.number).padStart(2, "0")}
          </p>
          <TierBadge tier={module.tier} />
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-ux-text-primary">
          {module.title}
        </h3>
        <div className="mt-2 h-0.5 w-10 rounded-full bg-ux-accent-gold/80" aria-hidden />
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ux-text-secondary">
          {module.description}
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-ux-text-muted">
            <span>
              {done}/{total} Lektionen
            </span>
            <span className="font-ux-mono text-ux-text-secondary">{statusLabel}</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-ux-surface-elevated">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                locked ? "bg-ux-locked" : "bg-ux-accent-gold"
              )}
              style={{ width: locked ? "0%" : `${pct}%` }}
            />
          </div>
          <p className="text-[11px] text-ux-text-muted">{formatDurationMinutes(module.estimatedMinutes)}</p>
        </div>
        <Link
          href={`/kurs/${module.id}`}
          className={cn(
            "mt-4 inline-flex min-h-10 items-center justify-center rounded-md px-4 text-center text-sm font-medium transition-colors",
            locked
              ? "border border-ux-border bg-ux-background text-ux-text-secondary hover:bg-ux-surface-elevated"
              : "bg-ux-accent-gold text-ux-background hover:bg-ux-accent-gold-hover"
          )}
        >
          {locked ? "Übersicht" : "Modul öffnen"}
        </Link>
      </div>
    </div>
  );
}
