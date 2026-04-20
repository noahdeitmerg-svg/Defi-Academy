"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { prevNextLesson } from "@/lib/uxNav";

export function QuizResult({
  correct,
  total,
  moduleId,
  lessonId,
  onRepeat,
}: {
  correct: number;
  total: number;
  moduleId: string;
  lessonId: string;
  onRepeat: () => void;
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = pct >= 70;
  const { next } = prevNextLesson(moduleId, lessonId);

  return (
    <div className="rounded-lg border border-ux-border bg-ux-surface-elevated p-6">
      <h3 className="text-lg font-semibold text-ux-text-primary">Ergebnis</h3>
      <p className="mt-2 font-ux-mono text-2xl text-ux-accent-gold">{pct}%</p>
      <p className="mt-1 text-sm text-ux-text-secondary">
        {correct} von {total} richtig
        {passed ? " — bestanden" : " — nicht bestanden (≥70 % erforderlich)"}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" variant="secondary" onClick={onRepeat}>
          Wiederholen
        </Button>
        {next ? (
          <Link
            href={`/kurs/${next.moduleId}/${next.lessonId}`}
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-ux-accent-gold px-4 py-2 text-sm font-medium text-ux-background hover:bg-ux-accent-gold-hover"
          >
            Nächste Lektion
          </Link>
        ) : null}
      </div>
    </div>
  );
}
