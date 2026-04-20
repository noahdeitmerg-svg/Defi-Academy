"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { isSupabaseConfigured } from "./supabaseClient";

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading, demo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (demo || !isSupabaseConfigured()) return;
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, demo, router]);

  if (!isSupabaseConfigured()) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-ux-background text-ux-text-secondary">
        Sitzung wird geladen …
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
