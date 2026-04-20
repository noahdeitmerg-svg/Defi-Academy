"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { useProgress } from "@/lib/progress/useProgress";

export default function ProfilPage() {
  const { user, signOut, demo } = useAuth();
  const { progress } = useProgress();
  const router = useRouter();

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <h1 className="text-2xl font-bold text-ux-text-primary">Profil</h1>
      <dl className="space-y-4 rounded-lg border border-ux-border bg-ux-surface p-6 text-sm">
        <div>
          <dt className="text-ux-text-muted">E-Mail</dt>
          <dd className="mt-1 text-ux-text-primary">
            {user?.email ?? (demo ? "demo@defi-akademie.de" : "—")}
          </dd>
        </div>
        <div>
          <dt className="text-ux-text-muted">Abo-Status (MVP)</dt>
          <dd className="mt-1 capitalize text-ux-text-primary">{progress.tier}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/profil/abo"
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-ux-border bg-ux-surface px-4 text-sm font-medium text-ux-text-primary hover:bg-ux-surface-elevated"
        >
          Abo &amp; Pro
        </Link>
        <Button
          type="button"
          variant="ghost"
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
        >
          Abmelden
        </Button>
      </div>
    </div>
  );
}
