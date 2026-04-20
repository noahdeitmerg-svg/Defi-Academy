"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { UxLogo } from "@/components/brand/UxLogo";
import { useAuth } from "@/lib/auth/useAuth";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/kurs", label: "Kurs" },
  { href: "/fortschritt", label: "Fortschritt" },
  { href: "/profil", label: "Profil" },
] as const;

function avatarLetter(email: string | undefined): string {
  const e = email?.trim();
  if (!e) return "?";
  return e[0]!.toUpperCase();
}

export function TopNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-ux-border bg-ux-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <UxLogo href="/dashboard" />
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden items-stretch gap-1 md:flex" aria-label="Hauptnavigation">
            {links.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative flex items-center px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-ux-text-primary" : "text-ux-text-secondary hover:text-ux-text-primary"
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-opacity",
                      active ? "bg-ux-accent-gold opacity-100" : "opacity-0"
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>
          <Link
            href="/klassisch"
            className="hidden text-xs text-ux-text-muted hover:text-ux-text-secondary lg:inline"
          >
            Klassisch
          </Link>
          <Link
            href="/profil"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ux-border bg-ux-surface-elevated text-xs font-semibold text-ux-accent-gold hover:border-ux-accent-gold/50"
            aria-label="Profil"
          >
            {avatarLetter(user?.email)}
          </Link>
        </div>
      </div>
    </header>
  );
}
