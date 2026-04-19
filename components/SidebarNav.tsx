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

  const lessonLabel = (slug: string, title: string) => {
    const m = /^(\d+)-(\d+)$/.exec(slug);
    if (m) return `${m[1]}.${m[2]} ${title}`;
    return title;
  };

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
              className={`lesson-nav-item flex items-center gap-2 rounded-lg py-2 pl-[13px] pr-2 text-sm transition ${
                isActive(href)
                  ? "border-l-[3px] border-[var(--color-accent)] font-semibold text-[var(--color-accent)]"
                  : "border-l-[3px] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
              }`}
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  done ? "bg-emerald-500" : "bg-[var(--color-border)]"
                }`}
              />
              <span className="truncate">{lessonLabel(l.slug, l.title)}</span>
            </Link>
          );
        })}
        <Link
          href={quizHref(module.slug)}
          className={`lesson-nav-item flex items-center gap-2 rounded-lg py-2 pl-[13px] pr-2 text-sm transition ${
            isActive(quizHref(module.slug))
              ? "border-l-[3px] border-[var(--color-accent)] font-semibold text-[var(--color-accent)]"
              : "border-l-[3px] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
          }`}
        >
          <span
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)] text-[10px] font-bold text-[var(--color-accent)]"
            aria-hidden
          >
            ?
          </span>
          <span className="flex-1 truncate">Quiz zum Modul</span>
          {moduleQuizPercent !== undefined ? (
            <span className="text-xs text-[var(--color-text-muted)]">{moduleQuizPercent}%</span>
          ) : null}
        </Link>
      </nav>
    </aside>
  );
}
