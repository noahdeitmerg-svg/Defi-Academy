export function KeyConcepts({ concepts }: { concepts: string[] }) {
  if (concepts.length === 0) return null;
  return (
    <section className="mb-8" aria-labelledby="konzepte-heading">
      <h2 id="konzepte-heading" className="text-base font-semibold text-ux-text-primary">
        Kernbegriffe
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {concepts.map((c) => (
          <li
            key={c}
            className="rounded-full border border-ux-border bg-ux-surface-elevated px-3 py-1 text-xs text-ux-text-secondary"
          >
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
