"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Module } from "@/data/types";
import { cn } from "@/lib/utils/cn";
import { useProgress } from "@/lib/progress/useProgress";

export function LessonSidebar({
  module,
  currentLessonId,
}: {
  module: Module;
  currentLessonId: string;
}) {
  const pathname = usePathname();
  const { isLessonCompleted, getModuleProgress } = useProgress();
  const modPct = getModuleProgress(module.id);

  return (
    <nav
      aria-label="Lektionen in diesem Modul"
      className="overflow-hidden rounded-2xl border border-ux-border bg-ux-surface"
    >
      <div className="border-b border-ux-border bg-ux-surface-elevated/40 px-4 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ux-text-muted">
          Modul {String(module.number).padStart(2, "0")}
        </p>
        <p className="mt-1 text-sm font-semibold leading-snug text-ux-text-primary">{module.title}</p>
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[10px] text-ux-text-muted">
            <span>Fortschritt</span>
            <span className="font-ux-mono text-ux-text-secondary">{modPct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ux-background">
            <div
              className="h-full rounded-full bg-ux-accent-gold transition-all"
              style={{ width: `${modPct}%` }}
            />
          </div>
        </div>
      </div>
      <ul className="divide-y divide-ux-border p-2">
        {module.lessons.map((lid, idx) => {
          const href = `/kurs/${module.id}/${lid}`;
          const active = pathname === href || currentLessonId === lid;
          const done = isLessonCompleted(module.id, lid);
          const label = `${module.number}.${idx + 1}`;
          const slugTitle = lid.replace(/^\d+-/, "").replace(/-/g, " ");
          return (
            <li key={lid}>
              <Link
                href={href}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-ux-surface-elevated font-medium text-ux-text-primary"
                    : "text-ux-text-secondary hover:bg-ux-surface-elevated/70 hover:text-ux-text-primary"
                )}
              >
                {active ? (
                  <span
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-ux-accent-gold"
                    aria-hidden
                  />
                ) : null}
                <span className="pl-1 font-ux-mono text-xs text-ux-text-muted">{label}</span>
                <span className="min-w-0 flex-1 truncate text-[13px] capitalize">{slugTitle}</span>
                {done ? (
                  <span className="shrink-0 text-xs text-ux-success" aria-label="Abgeschlossen">
                    ✓
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
