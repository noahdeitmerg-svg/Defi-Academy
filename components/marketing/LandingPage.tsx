import Link from "next/link";
import { ALL_MODULES } from "@/data/courseStructure";
import { TierBadge } from "@/components/course/TierBadge";

const categories = [
  {
    title: "Grundlagen",
    text: "Blockchain, Wallets, Transaktionen — sauber erklärt, ohne Hype.",
  },
  {
    title: "Mechaniken",
    text: "DEX, Pools, Lending, Liquidationen — wie Kapital und Risiko wirklich fließen.",
  },
  {
    title: "Strategien",
    text: "Yield, Hebel, MEV, Flash Loans — Chancen und Grenzen mit ehrlicher Risiko-Lesart.",
  },
  {
    title: "Infrastruktur",
    text: "Cross-Chain, Analytics, Composability — wie Systeme zusammenspielen und wo sie brechen können.",
  },
];

const faq = [
  {
    q: "Ist das Anlageberatung?",
    a: "Nein. Die Akademie vermittelt Bildung und Mechanik — keine Anlageempfehlungen und keine Erfolgsgarantien.",
  },
  {
    q: "Brauche ich Vorkenntnisse?",
    a: "Module 1–3 starten bewusst grundlegend; tiefergehende Module setzen konsequentes Durcharbeiten voraus.",
  },
  {
    q: "Warum „Free“ und „Pro“?",
    a: "Die ersten drei Module sind frei zugänglich. Der Rest ist in der UX als Pro markiert — Zahlung folgt später.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-ux-background text-ux-text-primary">
      <header className="border-b border-ux-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <span className="text-sm font-semibold tracking-tight">DeFi Akademie</span>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/preise" className="text-ux-text-secondary hover:text-ux-text-primary">
              Preise
            </Link>
            <Link href="/login" className="text-ux-text-secondary hover:text-ux-text-primary">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md bg-ux-accent-gold px-3 py-2 text-xs font-medium text-ux-background hover:bg-ux-accent-gold-hover"
            >
              App öffnen
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ux-text-muted">
            Lernprogramm
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            DeFi verstehen.
            <br />
            Ohne Hype.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ux-text-secondary">
            Strukturierte Module, Lektionen, Videos und Quiz — technisch korrekt, risikobewusst, auf Deutsch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/registrieren"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-ux-accent-gold px-6 text-sm font-medium text-ux-background hover:bg-ux-accent-gold-hover"
            >
              Registrieren
            </Link>
            <Link
              href="/klassisch"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-ux-border px-6 text-sm font-medium text-ux-text-primary hover:bg-ux-surface"
            >
              Klassische Modulübersicht
            </Link>
          </div>
        </section>

        <section className="border-t border-ux-border bg-ux-surface py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-semibold">Was du lernst</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {categories.map((c) => (
                <div key={c.title} className="rounded-lg border border-ux-border bg-ux-background p-6">
                  <h3 className="text-lg font-medium text-ux-text-primary">{c.title}</h3>
                  <p className="mt-2 text-sm text-ux-text-secondary">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="text-2xl font-semibold">Alle 17 Module</h2>
          <ul className="mt-8 space-y-3">
            {ALL_MODULES.map((m) => (
              <li
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ux-border bg-ux-surface px-4 py-3"
              >
                <span className="text-sm text-ux-text-primary">
                  <span className="font-ux-mono text-xs text-ux-text-muted">
                    {String(m.number).padStart(2, "0")}
                  </span>{" "}
                  {m.title}
                </span>
                <TierBadge tier={m.tier} />
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-ux-border bg-ux-surface py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-semibold">Aufbau einer Lektion</h2>
            <ol className="mt-8 list-inside list-decimal space-y-3 text-sm text-ux-text-secondary">
              <li>Video — komprimierte Einführung in die Mechanik</li>
              <li>Folien — strukturierte Kernaussagen</li>
              <li>Übung — kurze Reflexions- oder Transferaufgabe</li>
              <li>Quiz — Selbsttest mit Erklärungen</li>
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="text-2xl font-semibold">Free vs. Pro</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-ux-border p-6">
              <h3 className="text-lg font-medium">Free</h3>
              <p className="mt-2 text-sm text-ux-text-secondary">Module 1–3 inkl. Videos und Übungen.</p>
            </div>
            <div className="rounded-lg border border-ux-accent-gold/30 bg-ux-surface-elevated p-6">
              <h3 className="text-lg font-medium text-ux-accent-gold">Pro</h3>
              <p className="mt-2 text-sm text-ux-text-secondary">
                Alle 17 Module — Strategien, Infrastruktur, Risiko-Querschnitte.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-ux-border bg-ux-surface py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <dl className="mt-8 space-y-6">
              {faq.map((item) => (
                <div key={item.q}>
                  <dt className="font-medium text-ux-text-primary">{item.q}</dt>
                  <dd className="mt-2 text-sm text-ux-text-secondary">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t border-ux-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-ux-text-muted md:flex-row md:items-center md:justify-between md:px-6">
          <p>© DeFi Akademie</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/impressum" className="hover:text-ux-text-primary">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-ux-text-primary">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-ux-text-primary">
              AGB
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
