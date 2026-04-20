import Link from "next/link";
import { UxLogo } from "@/components/brand/UxLogo";

export function PublicTopNav() {
  return (
    <header className="border-b border-ux-border bg-ux-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <UxLogo href="/" />
        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm text-ux-text-secondary md:gap-6">
          <Link href="/kurs" className="hover:text-ux-text-primary">
            Kurse
          </Link>
          <Link href="/preise" className="hover:text-ux-text-primary">
            Preise
          </Link>
          <Link href="/login" className="hover:text-ux-text-primary">
            Login
          </Link>
          <Link
            href="/registrieren"
            className="rounded-full border border-ux-accent-gold/50 bg-ux-accent-gold/10 px-4 py-2 text-xs font-semibold text-ux-accent-gold hover:bg-ux-accent-gold/20"
          >
            Kostenlos starten
          </Link>
        </nav>
      </div>
    </header>
  );
}
