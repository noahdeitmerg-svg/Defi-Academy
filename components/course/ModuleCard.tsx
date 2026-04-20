"use client";

import Link from "next/link";
import type { Module } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { AccentBar } from "@/components/ui/AccentBar";
import { TierBadge } from "./TierBadge";
import { useProgress } from "@/lib/progress/useProgress";
import { formatDurationMinutes } from "@/lib/utils/formatDuration";
import { cn } from "@/lib/utils/cn";

export function ModuleCard({ module }: { module: Module }) {
  const { progress, getModuleProgress, isLessonCompleted } = useProgress();
  const pct = getModuleProgress(module.id);
  const total = module.lessons.length;
  const done = module.lessons.filter((l) =>
    isLessonCompleted(module.id, l)
  ).length;
  const locked = module.tier === "pro" && progress.tier === "free";

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ux-text-muted">
          Modul {String(module.number).padStart(2, "0")}
        </p>
        <TierBadge tier={module.tier} />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-ux-text-primary">{module.title}</h3>
      <AccentBar className="max-w-[4rem]" />
      <p className="mt-3 line-clamp-3 flex-1 text-sm text-ux-text-secondary">
        {module.description}
      </p>
      <p className="mt-4 text-xs text-ux-text-muted">
        {done}/{total} Lektionen · {formatDurationMinutes(module.estimatedMinutes)}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ux-surface-elevated">
        <div
          className="h-full rounded-full bg-ux-accent-gold transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <Link
        href={`/kurs/${module.id}`}
        className={cn(
          "mt-4 inline-flex justify-center rounded-md px-4 py-2 text-center text-sm font-medium",
          locked
            ? "border border-ux-border bg-ux-surface text-ux-text-secondary hover:bg-ux-surface-elevated"
            : "bg-ux-accent-gold text-ux-background hover:bg-ux-accent-gold-hover"
        )}
      >
        {locked ? "Übersicht" : "Modul öffnen"}
      </Link>
    </Card>
  );
}
