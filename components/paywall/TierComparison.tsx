"use client";

export function TierComparison() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-ux-border bg-ux-surface p-6">
        <h3 className="text-lg font-semibold text-ux-text-primary">Free</h3>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-ux-text-secondary">
          <li>Module 1–3 (Grundlagen)</li>
          <li>Videos &amp; Übungen in diesen Modulen</li>
          <li>Fortschritt lokal im Browser</li>
        </ul>
      </div>
      <div className="rounded-lg border border-ux-accent-gold/40 bg-ux-surface-elevated p-6">
        <h3 className="text-lg font-semibold text-ux-accent-gold">Pro</h3>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-ux-text-secondary">
          <li>Alle 17 Module inkl. Strategien &amp; Infrastruktur</li>
          <li>Erweiterte Lernpfade (geplant)</li>
          <li>Sync über Konto (geplant)</li>
        </ul>
      </div>
    </div>
  );
}
