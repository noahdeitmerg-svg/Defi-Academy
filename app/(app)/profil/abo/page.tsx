"use client";

import { useState } from "react";
import Link from "next/link";
import { TierComparison } from "@/components/paywall/TierComparison";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AboPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link href="/profil" className="text-sm text-ux-text-muted hover:text-ux-text-primary">
        ← Profil
      </Link>
      <h1 className="text-2xl font-bold text-ux-text-primary">Abo</h1>
      <TierComparison />
      <Button type="button" variant="primary" onClick={() => setOpen(true)}>
        Pro werden
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Pro">
        <p className="text-sm text-ux-text-secondary">Coming Soon — Zahlung und Freischaltung folgen.</p>
        <Button className="mt-4" variant="secondary" type="button" onClick={() => setOpen(false)}>
          Schließen
        </Button>
      </Modal>
    </div>
  );
}
