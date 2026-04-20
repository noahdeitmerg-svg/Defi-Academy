"use client";

import type { QuizQuestion as Q } from "@/data/types";
import { cn } from "@/lib/utils/cn";

export function QuizQuestionView({
  question,
  selected,
  disabled,
  onSelect,
}: {
  question: Q;
  selected: number | null;
  disabled: boolean;
  onSelect: (i: number) => void;
}) {
  return (
    <fieldset disabled={disabled} className="space-y-3">
      <legend className="text-base font-medium text-ux-text-primary">
        {question.question}
      </legend>
      {question.options.map((opt, i) => (
        <label
          key={i}
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-lg border border-ux-border p-3 text-sm transition-colors",
            selected === i && "border-ux-accent-gold bg-ux-surface-elevated",
            disabled && "cursor-default opacity-80"
          )}
        >
          <input
            type="radio"
            className="mt-1 accent-ux-accent-gold"
            name={`q-${question.id}`}
            checked={selected === i}
            onChange={() => onSelect(i)}
          />
          <span className="text-ux-text-secondary">{opt}</span>
        </label>
      ))}
    </fieldset>
  );
}
