"use client";

import type { QuizQuestion as Q } from "@/data/types";

export function QuizFeedback({
  question,
  selected,
  show,
}: {
  question: Q;
  selected: number | null;
  show: boolean;
}) {
  if (!show || selected == null) return null;
  const ok = selected === question.correctIndex;
  return (
    <div
      role="status"
      className={
        ok
          ? "mt-4 rounded-lg border border-ux-success/40 bg-ux-success/10 p-4 text-sm text-ux-success"
          : "mt-4 rounded-lg border border-ux-warning/40 bg-ux-warning/10 p-4 text-sm text-ux-warning"
      }
    >
      <p className="font-medium">{ok ? "Richtig." : "Nicht richtig."}</p>
      <p className="mt-2 text-ux-text-secondary">{question.explanation}</p>
    </div>
  );
}
