import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brotkrumen" className="mb-6 text-xs text-ux-text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? (
              <span className="text-ux-text-muted/80" aria-hidden>
                ›
              </span>
            ) : null}
            {c.href ? (
              <Link href={c.href} className="hover:text-ux-text-primary">
                {c.label}
              </Link>
            ) : (
              <span className="text-ux-text-secondary">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
