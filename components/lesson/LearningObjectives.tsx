import { Check } from "lucide-react";

export function LearningObjectives({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mb-8" aria-labelledby="lernziele-heading">
      <div className="rounded-2xl border border-ux-border bg-ux-surface-elevated/60 p-5 md:p-6">
        <h2
          id="lernziele-heading"
          className="text-sm font-semibold uppercase tracking-wide text-ux-text-primary"
        >
          Lernziele
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-ux-text-secondary">
          {items.map((t) => (
            <li key={t} className="flex gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ux-success/35 bg-ux-success/10 text-ux-success"
                aria-hidden
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
