import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-dvh bg-ux-background px-4 py-12 text-ux-text-primary md:px-6">
      <div className="mx-auto max-w-md">
        <Link href="/" className="text-sm text-ux-text-muted hover:text-ux-text-primary">
          ← Start
        </Link>
        <h1 className="mt-6 text-2xl font-bold">Anmelden</h1>
        <LoginForm />
      </div>
    </div>
  );
}
