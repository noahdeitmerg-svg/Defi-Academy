import type { ReactNode } from "react";

export function LessonLayout({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_1fr] lg:items-start">
      <aside className="order-2 lg:order-1 lg:sticky lg:top-24">{sidebar}</aside>
      <div className="order-1 min-w-0 lg:order-2">{children}</div>
    </div>
  );
}
