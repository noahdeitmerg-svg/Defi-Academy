"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress/useProgress";

export function UpgradeCourseBanner() {
  const { progress } = useProgress();
  if (progress.tier !== "free") return null;

  return (
    <aside
      className="rounded-2xl border border-ux-border border-l-4 border-l-ux-accent-gold bg-ux-surface-elevated/80 p-5 md:p-6"
      aria-label="Upgrade auf Pro"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ux-accent-gold">
        Pro Tier
      </p>
      <h2 className="mt-2 text-lg font-semibold text-ux-text-primary md:text-xl">
        Voller Kurs — ab Modul 4
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-ux-text-secondary">
        Die ersten drei Module bleiben kostenlos. Für Mechaniken, Strategien und
        Infrastruktur (Module 4–17) ist ein Pro-Zugang vorgesehen — Zahlungsanbindung
        folgt im nächsten Schritt der Plattform.
      </p>
      <Link
        href="/preise"
        className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-ux-accent-gold px-5 text-sm font-medium text-ux-background hover:bg-ux-accent-gold-hover"
      >
        Preise ansehen
      </Link>
    </aside>
  );
}
