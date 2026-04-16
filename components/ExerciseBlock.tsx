"use client";

import { useEffect, useState } from "react";
import type { ExerciseData } from "@/lib/types";

type Props = {
  exercise: ExerciseData;
  storageKey: string;
};

export function ExerciseBlock({ exercise, storageKey }: Props) {
  const [checked, setChecked] = useState<boolean[]>(() =>
    exercise.steps.map(() => false),
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as boolean[];
      if (Array.isArray(parsed) && parsed.length === exercise.steps.length) {
        setChecked(parsed);
      }
    } catch {
      /* ignore */
    }
  }, [exercise.steps.length, storageKey]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, storageKey]);

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="space-y-6">
      {exercise.goal ? (
        <section>
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Ziel
          </h4>
          <p className="leading-relaxed text-[var(--color-text)]">{exercise.goal}</p>
        </section>
      ) : null}

      {exercise.steps.length > 0 ? (
        <section>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Schritte
          </h4>
          <ul className="space-y-2">
            {exercise.steps.map((step, i) => (
              <li key={step} className="flex gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
                <input
                  id={`${storageKey}-step-${i}`}
                  type="checkbox"
                  checked={checked[i] ?? false}
                  onChange={() => toggle(i)}
                  className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
                />
                <label
                  htmlFor={`${storageKey}-step-${i}`}
                  className="cursor-pointer text-sm leading-relaxed text-[var(--color-text)]"
                >
                  {step}
                </label>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {exercise.deliverable ? (
        <section>
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Deliverable
          </h4>
          <p className="leading-relaxed text-[var(--color-text)]">{exercise.deliverable}</p>
        </section>
      ) : null}
    </div>
  );
}
