export function ExerciseBlock({ html }: { html: string | null }) {
  if (!html) return null;
  return (
    <section className="mb-8 rounded-lg border border-ux-border bg-ux-surface p-5" aria-labelledby="uebung-heading">
      <h2 id="uebung-heading" className="text-base font-semibold text-ux-text-primary">
        Übung
      </h2>
      <div
        className="mt-3 max-w-none text-sm leading-relaxed text-ux-text-secondary [&_h1]:text-base [&_h1]:font-semibold [&_h1]:text-ux-text-primary [&_h2]:mt-4 [&_h2]:text-sm [&_h2]:font-semibold [&_p]:my-2"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
