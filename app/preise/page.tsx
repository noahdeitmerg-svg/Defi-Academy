import Link from "next/link";
import { TierComparison } from "@/components/paywall/TierComparison";

export default function PreisePage() {
  return (
    <div className="min-h-dvh bg-ux-background px-4 py-12 text-ux-text-primary md:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-ux-text-muted hover:text-ux-text-primary">
          ← Start
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Preise</h1>
        <p className="mt-4 text-sm text-ux-text-secondary">
          Transparente Staffelung — Zahlungsabwicklung folgt in einer späteren Ausbauphase.
        </p>
        <div className="mt-10">
          <TierComparison />
        </div>
      </div>
    </div>
  );
}
