"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/progress/ProgressBar";
import { useProgress } from "@/lib/progress/useProgress";
import { ALL_MODULES, TOTAL_LESSON_COUNT } from "@/data/courseStructure";
import { formatDurationMinutes } from "@/lib/utils/formatDuration";

export default function FortschrittPage() {
  const { getCourseProgress, getModuleProgress, isLessonCompleted } =
    useProgress();

  let completed = 0;
  for (const m of ALL_MODULES) {
    for (const lid of m.lessons) {
      if (isLessonCompleted(m.id, lid)) completed += 1;
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-ux-text-primary md:text-3xl">
          Fortschritt
        </h1>
        <p className="mt-2 text-sm text-ux-text-secondary">
          {completed} von {TOTAL_LESSON_COUNT} Lektionen mit Video + Quiz abgeschlossen.
        </p>
      </div>

      <ProgressBar
        label="Gesamt"
        value={getCourseProgress()}
      />

      <div className="space-y-8">
        {ALL_MODULES.map((m) => (
          <section
            key={m.id}
            className="rounded-lg border border-ux-border bg-ux-surface p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-base font-semibold text-ux-text-primary">
                {m.title}
              </h2>
              <span className="font-ux-mono text-xs text-ux-text-muted">
                {getModuleProgress(m.id)}%
              </span>
            </div>
            <ProgressBar label="" value={getModuleProgress(m.id)} />
            <ul className="mt-4 space-y-2 text-sm">
              {m.lessons.map((lid) => {
                const done = isLessonCompleted(m.id, lid);
                return (
                  <li
                    key={lid}
                    className="flex items-center justify-between gap-2 rounded-md border border-ux-border/60 px-3 py-2"
                  >
                    <Link
                      href={`/kurs/${m.id}/${lid}`}
                      className="truncate text-ux-text-secondary hover:text-ux-accent-gold"
                    >
                      {lid}
                    </Link>
                    <span
                      className={
                        done ? "text-xs text-ux-success" : "text-xs text-ux-text-muted"
                      }
                    >
                      {done ? "abgeschlossen" : "offen"}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-ux-text-muted">
              Geplant: {formatDurationMinutes(m.estimatedMinutes)}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
