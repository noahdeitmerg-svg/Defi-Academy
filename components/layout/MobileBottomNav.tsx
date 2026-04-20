"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gauge, LayoutDashboard, User } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/dashboard", label: "Start", icon: LayoutDashboard },
  { href: "/kurs", label: "Kurs", icon: BookOpen },
  { href: "/fortschritt", label: "Stand", icon: Gauge },
  { href: "/profil", label: "Profil", icon: User },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-ux-border bg-ux-surface px-2 py-2 md:hidden"
      aria-label="Mobile Navigation"
    >
      {items.map(({ href, label, icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 rounded-md py-1 text-[10px] font-medium",
              active ? "text-ux-accent-gold" : "text-ux-text-muted"
            )}
          >
            <Icon icon={icon} size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
