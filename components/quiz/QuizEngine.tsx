"use client";

import { useCallback, useState } from "react";
import type { QuizQuestion as Q } from "@/data/types";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/lib/progress/useProgress";
import { QuizQuestionView } from "./QuizQuestion";
import { QuizFeedback } from "./QuizFeedback";
import { QuizResult } from "./QuizResult";

type Phase = "idle" | "active" | "result";

export function QuizEngine({
  questions,
  moduleId,
  lessonId,
}: {
  questions: Q[];
  moduleId: string;
  lessonId: string;
}) {
  const { submitQuizResult } = useProgress();
  const [phase, setPhase] = useState<Phase>("idle");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);

  const total = questions.length;
  const q = questions[index];

  const reset = useCallback(() => {
    setPhase("idle");
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScores([]);
  }, []);

  const start = useCallback(() => {
    setPhase("active");
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScores(Array.from({ length: total }, () => false));
  }, [total]);

  const onCheck = useCallback(() => {
    if (selected == null || !q) return;
    setChecked(true);
    setScores((prev) => {
      const next = [...prev];
      next[index] = selected === q.correctIndex;
      return next;
    });
  }, [index, q, selected]);

  const onAdvance = useCallback(() => {
    if (index + 1 >= total) {
      setScores((prev) => {
        const correct = prev.filter(Boolean).length;
        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
        submitQuizResult(moduleId, lessonId, pct, pct >= 70);
        return prev;
      });
      setPhase("result");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setChecked(false);
  }, [index, moduleId, lessonId, submitQuizResult, total]);

  if (total === 0) {
    return (
      <p className="text-sm text-ux-text-muted">Für diese Lektion liegt kein Quiz vor.</p>
    );
  }

  if (phase === "idle") {
    return (
      <div className="rounded-lg border border-ux-border bg-ux-surface p-6">
        <h3 className="text-base font-semibold text-ux-text-primary">Quiz</h3>
        <p className="mt-2 text-sm text-ux-text-secondary">{total} Fragen</p>
        <Button type="button" variant="primary" className="mt-4" onClick={start}>
          Quiz starten
        </Button>
      </div>
    );
  }

  if (phase === "result") {
    const correct = scores.filter(Boolean).length;
    return (
      <QuizResult
        correct={correct}
        total={total}
        moduleId={moduleId}
        lessonId={lessonId}
        onRepeat={reset}
      />
    );
  }

  return (
    <div className="rounded-lg border border-ux-border bg-ux-surface p-6">
      <p className="font-ux-mono text-xs text-ux-text-muted">
        Frage {index + 1} von {total}
      </p>
      {q ? (
        <>
          <QuizQuestionView
            question={q}
            selected={selected}
            disabled={checked}
            onSelect={setSelected}
          />
          <QuizFeedback question={q} selected={selected} show={checked} />
          <div className="mt-6 flex flex-wrap gap-3">
            {!checked ? (
              <Button
                type="button"
                variant="primary"
                disabled={selected == null}
                onClick={onCheck}
              >
                Antwort prüfen
              </Button>
            ) : (
              <Button type="button" variant="secondary" onClick={onAdvance}>
                {index + 1 >= total ? "Ergebnis" : "Weiter"}
              </Button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
