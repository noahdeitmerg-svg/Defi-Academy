export function LearningObjectives({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mb-8" aria-labelledby="lernziele-heading">
      <h2 id="lernziele-heading" className="text-base font-semibold text-ux-text-primary">
        Lernziele
      </h2>
      <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-ux-text-secondary">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
