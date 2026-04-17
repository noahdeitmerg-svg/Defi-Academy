import Link from "next/link";
import { getAllModules } from "@/lib/content";
import { lessonHref, quizHref } from "@/lib/routes";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function HomePage() {
  const modules = await getAllModules();

  return (
    <div className="min-h-dvh">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
              DeFi Academy
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text)]">
              Kurrikulum-Plattform
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <p className="max-w-2xl text-[var(--color-text-muted)]">
          MVP: Markdown-Lektionen werden in Erklärung, Folien, Voice-Skript, Visual-Checkliste und Übung
          zerlegt — vorbereitet für spätere Automatisierung (Slides → Video → Lessons).
        </p>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {modules.map((m) => (
            <article
              key={m.slug}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6"
            >
              <h2 className="text-lg font-semibold text-[var(--color-text)]">{m.title}</h2>
              {m.description ? (
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{m.description}</p>
              ) : null}
              <p className="mt-4 text-xs text-[var(--color-text-muted)]">
                {m.lessons.length} Lektionen · inkl. Quiz
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {m.lessons[0] ? (
                  <Link
                    href={lessonHref(m.slug, m.lessons[0].slug)}
                    className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Modul starten
                  </Link>
                ) : null}
                <Link
                  href={quizHref(m.slug)}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:border-[var(--color-accent)]"
                >
                  Zum Quiz
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
