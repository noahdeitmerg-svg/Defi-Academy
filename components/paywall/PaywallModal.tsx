"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export type PaywallModalProps = {
  open: boolean;
  onClose: () => void;
};

export function PaywallModal({ open, onClose }: PaywallModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Pro-Inhalt">
      <p className="text-sm text-ux-text-secondary">
        Dieses Modul ist Teil von <strong className="text-ux-text-primary">Pro</strong>.
        Im MVP gibt es noch keine Zahlung — Freischaltung folgt mit Abo-Phase.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" variant="primary" onClick={onClose}>
          Verstanden
        </Button>
      </div>
    </Modal>
  );
}
