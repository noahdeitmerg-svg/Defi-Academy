import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule } from "@/lib/content";
import { SidebarNav } from "@/components/SidebarNav";
import { ThemeToggle } from "@/components/ThemeToggle";

type Props = {
  children: React.ReactNode;
  params: Promise<{ moduleSlug: string }>;
};

export default async function ModuleLayout({ children, params }: Props) {
  const { moduleSlug } = await params;
  const mod = await getModule(moduleSlug);
  if (!mod) notFound();

  return (
    <div className="min-h-dvh">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
            ← Zur Übersicht
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
        <SidebarNav module={mod} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
