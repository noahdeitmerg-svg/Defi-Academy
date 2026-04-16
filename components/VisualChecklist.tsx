import type { VisualSuggestion } from "@/lib/types";

type Props = {
  items: VisualSuggestion[];
};

export function VisualChecklist({ items }: Props) {
  if (!items.length) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        Keine Visual-Vorschläge für diese Lektion.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((v, i) => (
        <article
          key={`${v.timestamp}-${i}`}
          className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4"
        >
          <div className="mb-2 inline-flex w-fit rounded-md bg-[var(--color-accent-soft)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--color-accent)]">
            {v.timestamp}
          </div>
          <p className="text-sm leading-relaxed text-[var(--color-text)]">{v.instruction}</p>
          <p className="mt-3 text-xs text-[var(--color-text-muted)]">Produktions-Checkliste</p>
        </article>
      ))}
    </div>
  );
}
