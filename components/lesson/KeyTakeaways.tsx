"use client";

import { Card } from "@/components/ui/Card";

type Props = {
  takeaways: string[];
};

/**
 * Kernaussagen nach dem Video. Bei leerem Array: nichts rendern.
 */
export function KeyTakeaways({ takeaways }: Props) {
  if (takeaways.length === 0) return null;

  return (
    <section
      className="mb-8"
      aria-label="Kernaussagen der Lektion"
    >
      <Card className="p-5 md:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ux-text-muted">
          Key Takeaways
        </p>
        <h3 className="mt-2 text-lg font-semibold text-ux-text-primary">
          Das solltest du mitnehmen
        </h3>
        <div
          className="mt-2 h-0.5 w-6 rounded-sm bg-ux-accent-gold"
          aria-hidden
        />
        <ul className="mt-5 list-none space-y-4 p-0">
          {takeaways.map((text, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ux-accent-gold"
                aria-hidden
              />
              <span className="leading-[1.6] text-ux-text-primary">{text}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
