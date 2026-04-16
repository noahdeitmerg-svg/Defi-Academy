"use client";

import { useEffect, useState } from "react";
import { lessonKey, loadProgress, markLessonComplete } from "@/lib/progress";

type Props = {
  moduleSlug: string;
  lessonSlug: string;
};

export function LessonCompleteButton({ moduleSlug, lessonSlug }: Props) {
  const key = lessonKey(moduleSlug, lessonSlug);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const p = loadProgress();
    setDone(p.completedLessons.includes(key));
  }, [key]);

  return (
    <div className="mt-10 flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <p className="text-sm text-[var(--color-text-muted)]">
        Fortschritt wird lokal im Browser gespeichert (localStorage).
      </p>
      <button
        type="button"
        disabled={done}
        onClick={() => {
          markLessonComplete(moduleSlug, lessonSlug);
          setDone(true);
        }}
        className="shrink-0 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition enabled:hover:opacity-90 disabled:cursor-default disabled:opacity-60"
      >
        {done ? "Als erledigt markiert" : "Als erledigt markieren"}
      </button>
    </div>
  );
}
