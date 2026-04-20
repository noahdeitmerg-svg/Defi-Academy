"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "./supabaseClient";

export type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  demo: boolean;
};

export function useAuth(): AuthState & {
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
} {
  const demo = !isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(!demo);

  useEffect(() => {
    if (demo) {
      setUser({ id: "demo", email: "demo@defi-akademie.de" } as User);
      setSession({} as Session);
      setLoading(false);
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    void supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
    });
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [demo]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (demo) {
        setUser({ id: "demo", email } as User);
        setSession({} as Session);
        return {};
      }
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return { error: "Supabase nicht konfiguriert." };
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return error ? { error: error.message } : {};
    },
    [demo]
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      if (demo) {
        setUser({ id: "demo", email } as User);
        setSession({} as Session);
        return {};
      }
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return { error: "Supabase nicht konfiguriert." };
      const { error } = await supabase.auth.signUp({ email, password });
      return error ? { error: error.message } : {};
    },
    [demo]
  );

  const signOut = useCallback(async () => {
    if (demo) {
      setUser(null);
      setSession(null);
      return;
    }
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
  }, [demo]);

  return useMemo(
    () => ({
      user,
      session,
      loading,
      demo,
      signIn,
      signUp,
      signOut,
    }),
    [user, session, loading, demo, signIn, signUp, signOut]
  );
}
