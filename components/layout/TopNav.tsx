"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/kurs", label: "Kurs" },
  { href: "/fortschritt", label: "Fortschritt" },
  { href: "/profil", label: "Profil" },
] as const;

export function TopNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-ux-border bg-ux-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/dashboard"
          className="text-sm font-semibold tracking-tight text-ux-text-primary"
        >
          DeFi Akademie
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Hauptnavigation">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-ux-surface-elevated text-ux-accent-gold"
                    : "text-ux-text-secondary hover:bg-ux-surface hover:text-ux-text-primary"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/klassisch"
          className="text-xs text-ux-text-muted hover:text-ux-text-secondary"
        >
          Klassische Ansicht
        </Link>
      </div>
    </header>
  );
}
