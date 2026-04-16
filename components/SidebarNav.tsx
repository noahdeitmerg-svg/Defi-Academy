"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { lessonHref, quizHref } from "@/lib/routes";
import { lessonKey, loadProgress } from "@/lib/progress";
import type { ModuleMeta } from "@/lib/types";

type Props = {
  module: ModuleMeta;
};

export function SidebarNav({ module }: Props) {
  const pathname = usePathname();
  const [completed, setCompleted] = useState<string[]>([]);
  const [moduleQuizPercent, setModuleQuizPercent] = useState<number | undefined>();

  useEffect(() => {
    const p = loadProgress();
    setCompleted(p.completedLessons);
    setModuleQuizPercent(p.quizScores[module.slug]);
  }, [module.slug, pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="sticky top-6 h-fit w-64 shrink-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
        Navigation
      </p>
      <h2 className="mt-1 text-sm font-semibold text-[var(--color-text)]">{module.title}</h2>
      <nav className="mt-4 space-y-1">
        {module.lessons.map((l) => {
          const href = lessonHref(module.slug, l.slug);
          const done = completed.includes(lessonKey(module.slug, l.slug));
          return (
            <Link
              key={l.slug}
              href={href}
              className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition ${
                isActive(href)
                  ? "bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  done ? "bg-emerald-500" : "bg-[var(--color-border)]"
                }`}
              />
              <span className="truncate">
                {l.moduleNumber}.{l.lessonNumber} {l.title}
              </span>
            </Link>
          );
        })}
        <Link
          href={quizHref(module.slug)}
          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition ${
            isActive(quizHref(module.slug))
              ? "bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]"
              : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
          }`}
        >
          <span className="font-mono text-xs">?</span>
          <span className="flex-1 truncate">Quiz</span>
          {moduleQuizPercent !== undefined ? (
            <span className="text-xs text-[var(--color-text-muted)]">{moduleQuizPercent}%</span>
          ) : null}
        </Link>
      </nav>
    </aside>
  );
}
