"use client";

import { Button } from "@/components/ui/Button";

export function UpgradeBanner({ onUpgrade }: { onUpgrade?: () => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-ux-border bg-ux-surface-elevated p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-ux-text-secondary">
        <span className="font-medium text-ux-text-primary">Pro</span> schaltet
        Module 4–17 frei — ohne Hype, mit voller Tiefe.
      </p>
      <Button type="button" variant="secondary" size="sm" onClick={onUpgrade}>
        Details
      </Button>
    </div>
  );
}
