"use client";

import { useId } from "react";

type Props = {
  /** Kurzer Titel im UI (z. B. deutsch) */
  title: string;
  /** Entspricht der Markdown-Überschrift im Kurrikulum */
  sourceHeading: string;
  children: React.ReactNode;
};

export function LessonSectionBlock({ title, sourceHeading, children }: Props) {
  const id = useId();
  const headingId = `lesson-block-${id}`;

  return (
    <section
      className="mb-10 scroll-mt-24 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6 shadow-sm"
      aria-labelledby={headingId}
    >
      <div className="border-b border-[var(--color-border)] pb-3">
        <h2 id={headingId} className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
          {title}
        </h2>
        <p className="mt-1 font-mono text-xs text-[var(--color-text-muted)]">{sourceHeading}</p>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
