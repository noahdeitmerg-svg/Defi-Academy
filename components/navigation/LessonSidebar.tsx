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
  const { isLessonCompleted } = useProgress();

  return (
    <nav
      aria-label="Lektionen in diesem Modul"
      className="rounded-lg border border-ux-border bg-ux-surface p-3"
    >
      <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-ux-text-muted">
        Modul {String(module.number).padStart(2, "0")}
      </p>
      <ul className="space-y-1">
        {module.lessons.map((lid) => {
          const href = `/kurs/${module.id}/${lid}`;
          const active =
            pathname === href || currentLessonId === lid;
          const done = isLessonCompleted(module.id, lid);
          return (
            <li key={lid}>
              <Link
                href={href}
                className={cn(
                  "block rounded-md px-2 py-2 text-sm transition-colors",
                  active
                    ? "bg-ux-surface-elevated font-medium text-ux-accent-gold"
                    : "text-ux-text-secondary hover:bg-ux-surface-elevated hover:text-ux-text-primary"
                )}
              >
                <span className="font-ux-mono text-xs text-ux-text-muted">
                  {lid}
                </span>
                {done ? (
                  <span className="ml-2 text-xs text-ux-success">✓</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
