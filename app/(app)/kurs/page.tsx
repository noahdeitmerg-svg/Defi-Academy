import { loadModules } from "@/lib/content/loadModules";
import { ModuleCard } from "@/components/course/ModuleCard";
import { KursProgressSummaryCard } from "@/components/course/KursProgressSummaryCard";
import { UpgradeCourseBanner } from "@/components/course/UpgradeCourseBanner";
import { moduleCategory } from "@/lib/uxNav";

const groupSubtitle: Record<
  "Grundlagen" | "Mechaniken" | "Strategien" | "Infrastruktur",
  string
> = {
  Grundlagen: "Grundlagen · Modul 1–3",
  Mechaniken: "Mechaniken · Modul 4–8",
  Strategien: "Strategien · Modul 9–13",
  Infrastruktur: "Infrastruktur · Modul 14–17",
};

export default async function KursPage() {
  const modules = await loadModules();
  const groups = new Map<string, typeof modules>();
  for (const m of modules) {
    const cat = moduleCategory(m.number);
    const arr = groups.get(cat) ?? [];
    arr.push(m);
    groups.set(cat, arr);
  }

  const order = ["Grundlagen", "Mechaniken", "Strategien", "Infrastruktur"] as const;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ux-text-primary md:text-3xl">
          Kursübersicht
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ux-text-secondary">
          Vollständiges Lernprogramm — gruppiert nach didaktischer Logik, nicht nach
          Marketing-Kategorien.
        </p>
      </div>

      <KursProgressSummaryCard />

      {order.map((cat) => {
        const list = groups.get(cat);
        if (!list?.length) return null;
        return (
          <section key={cat} className="space-y-4">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ux-text-muted">
                {groupSubtitle[cat]}
              </h2>
              <p className="mt-1 text-lg font-semibold text-ux-text-primary">{cat}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => (
                <ModuleCard key={m.id} module={m} />
              ))}
            </div>
          </section>
        );
      })}

      <UpgradeCourseBanner />
    </div>
  );
}
