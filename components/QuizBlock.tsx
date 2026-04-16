"use client";

import { useMemo, useState } from "react";
import { setModuleCompleted, setQuizScore } from "@/lib/progress";
import type { QuizFile, QuizQuestion } from "@/lib/types";

type Props = {
  quiz: QuizFile;
  /** Schlüssel in `quizScores` (z. B. Modulslug oder `lessonQuizProgressKey`). */
  scoreStorageKey: string;
  /** Nur für das Modul-Endquiz: bei ausreichendem Score Modul abschließen. */
  completeModuleOnPass?: boolean;
  completionModuleSlug?: string;
};

type AnswerState = Record<string, number>;

export function QuizBlock({
  quiz,
  scoreStorageKey,
  completeModuleOnPass,
  completionModuleSlug,
}: Props) {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const answeredAll = useMemo(
    () => quiz.questions.every((q) => submitted[q.id]),
    [submitted, quiz.questions],
  );

  const scorePercent = useMemo(() => {
    if (!finished) return 0;
    let correct = 0;
    for (const q of quiz.questions) {
      if (answers[q.id] === q.correctIndex) correct += 1;
    }
    return Math.round((correct / quiz.questions.length) * 100);
  }, [finished, answers, quiz.questions]);

  const selectAnswer = (q: QuizQuestion, optionIndex: number) => {
    if (submitted[q.id]) return;
    setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }));
    setSubmitted((prev) => ({ ...prev, [q.id]: true }));
  };

  const finishQuiz = () => {
    if (!answeredAll) return;
    setFinished(true);
    const correct = quiz.questions.filter((q) => answers[q.id] === q.correctIndex).length;
    const pct = Math.round((correct / quiz.questions.length) * 100);
    setQuizScore(scoreStorageKey, pct);
    if (completeModuleOnPass && completionModuleSlug && pct >= 70) {
      setModuleCompleted(completionModuleSlug, true);
    }
  };

  return (
    <div className="space-y-8">
      {quiz.questions.map((q, idx) => {
        const selected = answers[q.id] ?? null;
        const isSubmitted = submitted[q.id];
        const isCorrect = selected === q.correctIndex;

        return (
          <section
            key={q.id}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
              Frage {idx + 1}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--color-text)]">{q.question}</h3>
            <div className="mt-4 space-y-2">
              {q.options.map((opt, i) => {
                const active = selected === i;
                let tone =
                  "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]";
                if (isSubmitted) {
                  if (i === q.correctIndex) tone = "border-emerald-500/60 bg-emerald-500/10";
                  else if (active && !isCorrect) tone = "border-red-500/50 bg-red-500/10";
                  else tone = "border-[var(--color-border)] bg-[var(--color-surface)] opacity-60";
                } else if (active) {
                  tone = "border-[var(--color-accent)] bg-[var(--color-accent-soft)]";
                }

                return (
                  <button
                    key={`${q.id}-opt-${i}`}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => selectAnswer(q, i)}
                    className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${tone}`}
                  >
                    <span className="mt-0.5 font-mono text-xs text-[var(--color-text-muted)]">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span className="text-[var(--color-text)]">{opt}</span>
                  </button>
                );
              })}
            </div>

            {isSubmitted ? (
              <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
                <p className="font-medium text-[var(--color-text)]">
                  {isCorrect ? "Richtig" : "Leider falsch"}
                </p>
                {q.explanation ? (
                  <p className="mt-2 text-[var(--color-text-muted)]">{q.explanation}</p>
                ) : null}
              </div>
            ) : (
              <p className="mt-4 text-xs text-[var(--color-text-muted)]">
                Wähle eine Option — das Feedback erscheint sofort.
              </p>
            )}
          </section>
        );
      })}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={finishQuiz}
          disabled={!answeredAll || finished}
          className="rounded-lg bg-[var(--color-text)] px-4 py-2 text-sm font-medium text-[var(--color-surface)] transition enabled:hover:opacity-90 disabled:opacity-40"
        >
          Quiz abschließen
        </button>
        {finished ? (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm">
            <span className="font-semibold text-[var(--color-text)]">Ergebnis: {scorePercent}%</span>
            <span className="ml-2 text-[var(--color-text-muted)]">
              {scorePercent >= 70
                ? "Sehr gut — weiter so."
                : "Wiederhole die Lektionen und versuche es erneut."}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
