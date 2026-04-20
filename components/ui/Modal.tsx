"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { X } from "lucide-react";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Dialog mit nativem `<dialog>` (Fokus, Escape, Semantik).
 * `open` ist vollständig gesteuert von außen.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  const onCancel = useCallback(
    (e: Event) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("cancel", onCancel);
    return () => el.removeEventListener("cancel", onCancel);
  }, [onCancel]);

  return (
    <dialog
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 m-0 max-h-[min(90dvh,40rem)] w-[min(100%-2rem,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-ux-border bg-ux-surface-elevated p-0 text-ux-text-primary shadow-xl backdrop:bg-black/70 open:flex open:flex-col",
        className
      )}
      aria-labelledby={title ? titleId : undefined}
      onMouseDown={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="flex max-h-[min(90dvh,40rem)] flex-col p-6">
        <div className="flex shrink-0 items-start justify-between gap-4">
          {title ? (
            <h2 id={titleId} className="text-lg font-semibold tracking-tight">
              {title}
            </h2>
          ) : (
            <span className="sr-only">Dialog</span>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="min-h-8 shrink-0 px-2"
            onClick={onClose}
            aria-label="Dialog schließen"
          >
            <Icon icon={X} size={18} />
          </Button>
        </div>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </dialog>
  );
}
