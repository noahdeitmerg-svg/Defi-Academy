import Link from "next/link";

export default function AgbPage() {
  return (
    <div>
      <Link href="/" className="text-sm text-ux-text-muted hover:text-ux-text-primary">
        ← Start
      </Link>
      <h1 className="mt-6 text-2xl font-bold">AGB</h1>
      <p className="mt-4 text-sm text-ux-text-secondary">
        Platzhalter — Allgemeine Geschäftsbedingungen folgen mit rechtlicher Freigabe.
      </p>
    </div>
  );
}
