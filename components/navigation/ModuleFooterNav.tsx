import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { prevNextModule } from "@/lib/uxNav";

const btn =
  "inline-flex min-h-10 items-center justify-center rounded-md border border-ux-border bg-ux-surface px-4 py-2 text-sm font-medium text-ux-text-primary transition-colors hover:bg-ux-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ux-accent-gold";

export function ModuleFooterNav({ modulId }: { modulId: string }) {
  const { prev, next } = prevNextModule(modulId);
  return (
    <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ux-border pt-8">
      {prev ? (
        <Link href={`/kurs/${prev.id}`} className={cn(btn)}>
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/kurs/${next.id}`} className={cn(btn)}>
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </footer>
  );
}
