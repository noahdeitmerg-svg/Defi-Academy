import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-ux-background px-4 py-10 text-ux-text-primary md:px-6">
      <div className="mx-auto max-w-2xl">{children}</div>
    </div>
  );
}
