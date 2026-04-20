import type { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { MobileBottomNav } from "./MobileBottomNav";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-ux-background pb-20 text-ux-text-primary md:pb-0">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
      <MobileBottomNav />
    </div>
  );
}
