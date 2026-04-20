"use client";

import { Button } from "@/components/ui/Button";

export function SlideNavigator({
  index,
  total,
  onChange,
}: {
  index: number;
  total: number;
  onChange: (i: number) => void;
}) {
  if (total <= 0) return null;
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="font-ux-mono text-xs text-ux-text-muted">
        Folie {index + 1} / {total}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={index <= 0}
          onClick={() => onChange(Math.max(0, index - 1))}
        >
          Zurück
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={index >= total - 1}
          onClick={() => onChange(Math.min(total - 1, index + 1))}
        >
          Weiter
        </Button>
      </div>
    </div>
  );
}
