"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const { signUp, demo } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signUp(email, password);
    if (res.error) setError(res.error);
    else router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      {demo ? (
        <p className="rounded-md border border-ux-border bg-ux-surface p-3 text-sm text-ux-text-secondary">
          Demo-Modus: Registrierung ist nur UI — es wird kein Konto bei Supabase angelegt.
        </p>
      ) : null}
      <div>
        <label htmlFor="reg-email" className="block text-sm text-ux-text-secondary">
          E-Mail
        </label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-ux-border bg-ux-surface px-3 py-2 text-sm text-ux-text-primary outline-none focus:border-ux-accent-gold"
        />
      </div>
      <div>
        <label htmlFor="reg-password" className="block text-sm text-ux-text-secondary">
          Passwort
        </label>
        <input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-md border border-ux-border bg-ux-surface px-3 py-2 text-sm text-ux-text-primary outline-none focus:border-ux-accent-gold"
        />
      </div>
      {error ? <p className="text-sm text-ux-warning">{error}</p> : null}
      <Button type="submit" variant="primary" className="w-full">
        Konto anlegen
      </Button>
      <p className="text-center text-sm text-ux-text-muted">
        Bereits registriert?{" "}
        <Link href="/login" className="text-ux-accent-gold hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
