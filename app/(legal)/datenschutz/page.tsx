import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <div>
      <Link href="/" className="text-sm text-ux-text-muted hover:text-ux-text-primary">
        ← Start
      </Link>
      <h1 className="mt-6 text-2xl font-bold">Datenschutz</h1>
      <p className="mt-4 text-sm text-ux-text-secondary">
        Platzhalter — Datenschutzerklärung inkl. Hosting (GitHub Pages), lokaler Fortschritt im
        Browser und optional Supabase folgt mit rechtlicher Freigabe.
      </p>
    </div>
  );
}
