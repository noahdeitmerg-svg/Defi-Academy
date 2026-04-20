import Link from "next/link";
import { ALL_MODULES } from "@/data/courseStructure";
import { TierBadge } from "@/components/course/TierBadge";
import { PublicTopNav } from "@/components/marketing/PublicTopNav";
import { UxLogo, UxTitleGoldBars } from "@/components/brand/UxLogo";

const stages = [
  {
    title: "Grundlagen",
    meta: "3 Module · Module 1–3",
    text: "Blockchain, Wallets, Transaktionen — sauber erklärt, ohne Hype.",
  },
  {
    title: "Mechaniken",
    meta: "5 Module · Module 4–8",
    text: "DEX, Pools, Lending, Liquidationen — wie Kapital und Risiko wirklich fließen.",
  },
  {
    title: "Strategien",
    meta: "5 Module · Module 9–13",
    text: "Yield, Hebel, MEV, Flash Loans — Chancen und Grenzen mit ehrlicher Risiko-Lesart.",
  },
  {
    title: "Infrastruktur",
    meta: "4 Module · Module 14–17",
    text: "Cross-Chain, Analytics, Composability — wie Systeme zusammenspielen und wo sie brechen können.",
  },
] as const;

const lessonFlow = [
  { step: "01", title: "Video", desc: "Mechanik kompakt" },
  { step: "02", title: "Folien", desc: "Kernaussagen strukturiert" },
  { step: "03", title: "Übung", desc: "Transfer & Reflexion" },
  { step: "04", title: "Quiz", desc: "Selbsttest mit Erklärung" },
] as const;

const faq = [
  {
    q: "Ist das Anlageberatung?",
    a: "Nein. Die Akademie vermittelt Bildung und Mechanik — keine Anlageempfehlungen und keine Erfolgsgarantien.",
  },
  {
    q: "Brauche ich Vorkenntnisse?",
    a: "Module 1–3 starten bewusst grundlegend; tiefere Module setzen konsequentes Durcharbeiten voraus.",
  },
  {
    q: "Warum „Free“ und „Pro“?",
    a: "Die ersten drei Module sind frei zugänglich. Der Rest ist in der UX als Pro markiert — Zahlungsanbindung folgt.",
  },
] as const;

export function LandingPage() {
  const tableModules = ALL_MODULES.slice(0, 8);

  return (
    <div className="min-h-dvh bg-ux-background text-ux-text-primary">
      <PublicTopNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="ux-hero-glow" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <p className="ux-section-label">Lernprogramm</p>
            <p className="mt-4 inline-flex rounded-full border border-ux-border bg-ux-surface/80 px-3 py-1 text-xs text-ux-text-secondary">
              Strukturiert · Technisch · Ohne Hype
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl md:leading-[1.08]">
              DeFi verstehen.
              <br />
              <span className="text-ux-accent-gold">Ohne Hype.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ux-text-secondary">
              Strukturierte Module, Lektionen, Videos und Quiz — technisch korrekt,
              risikobewusst, auf Deutsch. Inhalt und IA folgen dem internen
              Plattform-Build (Next.js, statischer Export, 17×6 Lektionen).
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/registrieren"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-ux-accent-gold px-7 text-sm font-semibold text-ux-background hover:bg-ux-accent-gold-hover"
              >
                Kostenlos starten
              </Link>
              <Link
                href="/kurs"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-ux-border px-7 text-sm font-medium text-ux-text-primary hover:bg-ux-surface"
              >
                Kurs ansehen
              </Link>
            </div>
            <p className="mt-8 text-xs text-ux-text-muted">
              Keine Anlageberatung · Bildungsfokus · Risikohinweise in den Lektionen
            </p>
          </div>
        </section>

        <section className="border-t border-ux-border bg-ux-surface py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <p className="ux-section-label">Didaktik</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-ux-text-primary md:text-4xl">
              Vier klare Lernstufen
            </h2>
            <UxTitleGoldBars />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {stages.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-ux-border bg-ux-background p-6"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ux-text-muted">
                    {c.meta}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ux-text-primary">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ux-text-secondary">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="ux-section-label">Ablauf</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Eine Lektion — vier Schritte</h2>
          <UxTitleGoldBars />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {lessonFlow.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-ux-border bg-ux-surface p-5 text-center md:text-left"
              >
                <p className="font-ux-mono text-xs text-ux-accent-gold">{s.step}</p>
                <h3 className="mt-2 text-base font-semibold text-ux-text-primary">{s.title}</h3>
                <p className="mt-1 text-sm text-ux-text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-ux-border bg-ux-surface py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <p className="ux-section-label">Kursinhalt</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Alle 17 Module</h2>
            <UxTitleGoldBars />
            <div className="mt-10 overflow-hidden rounded-2xl border border-ux-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-ux-border bg-ux-background/80">
                    <th className="px-4 py-3 font-ux-mono text-xs font-medium uppercase tracking-wide text-ux-text-muted">
                      #
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ux-text-muted">
                      Modul
                    </th>
                    <th className="hidden px-4 py-3 text-right sm:table-cell"> </th>
                  </tr>
                </thead>
                <tbody>
                  {tableModules.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-ux-border bg-ux-background/40 last:border-0 hover:bg-ux-surface-elevated/60"
                    >
                      <td className="px-4 py-3.5 font-ux-mono text-xs text-ux-text-muted">
                        {String(m.number).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-3.5 text-ux-text-primary">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          <span>{m.title}</span>
                          <span className="sm:hidden">
                            <TierBadge tier={m.tier} />
                          </span>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3.5 text-right sm:table-cell">
                        <TierBadge tier={m.tier} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-ux-border bg-ux-surface-elevated/50 px-4 py-4 text-sm text-ux-text-secondary">
                <span className="font-ux-mono text-xs text-ux-text-muted">09–17</span> — weitere
                neun Module (Mechaniken, Strategien, Infrastruktur inkl. Portfolio &amp; RWA) mit
                gleicher Lektionsstruktur; vollständige Liste in der App unter{" "}
                <Link href="/kurs" className="text-ux-accent-gold hover:underline">
                  Kurs
                </Link>
                .
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="ux-section-label">Zugang</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Free vs. Pro</h2>
          <UxTitleGoldBars />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-ux-border bg-ux-surface p-8">
              <h3 className="text-xl font-semibold text-ux-text-primary">Free</h3>
              <p className="mt-2 text-4xl font-bold tabular-nums text-ux-text-primary">0 €</p>
              <p className="mt-4 flex-1 text-sm text-ux-text-secondary">
                Module 1–3 inkl. Videos, Folien, Übungen und Quiz — wie im Build-Dokument für
                Einstieg und Vertrauen vorgesehen.
              </p>
              <Link
                href="/registrieren"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md border border-ux-border px-5 text-sm font-medium hover:bg-ux-surface-elevated"
              >
                Registrieren
              </Link>
            </div>
            <div className="flex flex-col rounded-2xl border border-ux-accent-gold/35 bg-ux-surface-elevated p-8">
              <h3 className="text-xl font-semibold text-ux-accent-gold">Pro</h3>
              <p className="mt-2 text-4xl font-bold tabular-nums text-ux-accent-gold">49 $</p>
              <p className="mt-1 text-xs text-ux-text-muted">Beispielpreis — Abrechnung folgt</p>
              <p className="mt-4 flex-1 text-sm text-ux-text-secondary">
                Alle 17 Module — Mechaniken, Strategien, Infrastruktur und Querschnittsthemen wie
                Portfolio-Konstruktion und RWA, konsistent zur Kursmatrix.
              </p>
              <Link
                href="/preise"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-ux-accent-gold px-5 text-sm font-semibold text-ux-background hover:bg-ux-accent-gold-hover"
              >
                Zu den Preisen
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-ux-border bg-ux-surface py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <p className="ux-section-label">Fragen</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">FAQ</h2>
            <UxTitleGoldBars />
            <dl className="mt-10 space-y-8">
              {faq.map((item) => (
                <div key={item.q}>
                  <dt className="font-semibold text-ux-text-primary">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ux-text-secondary">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t border-ux-border bg-ux-background py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-start md:justify-between md:px-6">
          <div>
            <UxLogo href="/" />
            <p className="mt-4 max-w-sm text-sm text-ux-text-muted">
              Strukturierte DeFi-Bildung — technisch, risikobewusst, ohne Marketing-Noise.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ux-text-muted">
            <Link href="/impressum" className="hover:text-ux-text-primary">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-ux-text-primary">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-ux-text-primary">
              AGB
            </Link>
            <Link href="/klassisch" className="hover:text-ux-text-primary">
              Klassische Modulübersicht
            </Link>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-ux-text-muted md:px-6">
          © {new Date().getFullYear()} DeFi Akademie
        </p>
      </footer>
    </div>
  );
}
