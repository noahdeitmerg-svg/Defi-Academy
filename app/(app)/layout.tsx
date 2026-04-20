import type { ReactNode } from "react";
import { ProgressProvider } from "@/lib/progress/ProgressProvider";
import { AuthGate } from "@/lib/auth/AuthGate";
import { AppLayout } from "@/components/layout/AppLayout";

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return (
    <ProgressProvider>
      <AuthGate>
        <AppLayout>{children}</AppLayout>
      </AuthGate>
    </ProgressProvider>
  );
}
