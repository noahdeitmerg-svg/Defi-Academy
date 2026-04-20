"use client";

import { useState, type ReactNode } from "react";
import type { Tier } from "@/data/types";
import { useProgress } from "@/lib/progress/useProgress";
import { PaywallModal } from "@/components/paywall/PaywallModal";
import { isUxModuleAccessible } from "@/lib/tier/tierPolicy";

export function TierGate({
  moduleTier,
  children,
}: {
  moduleTier: Tier;
  children: ReactNode;
}) {
  const { progress } = useProgress();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const allowed = isUxModuleAccessible(moduleTier, progress.tier);

  if (allowed) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-lg border border-ux-border bg-ux-surface p-8 text-center">
      <p className="text-ux-text-secondary">
        Dieser Bereich ist Teil von <strong className="text-ux-text-primary">Pro</strong>.
      </p>
      <button
        type="button"
        className="mt-4 text-sm font-medium text-ux-accent-gold hover:text-ux-accent-gold-hover"
        onClick={() => setPaywallOpen(true)}
      >
        Warum Pro?
      </button>
      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} />
    </div>
  );
}
