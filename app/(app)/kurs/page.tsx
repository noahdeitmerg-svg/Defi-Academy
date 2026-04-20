import { loadModules } from "@/lib/content/loadModules";
import { ModuleCard } from "@/components/course/ModuleCard";
import { moduleCategory } from "@/lib/uxNav";

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
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ux-text-primary md:text-3xl">
          Alle Module
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ux-text-secondary">
          Vollständiges Lernprogramm — gruppiert nach didaktischer Logik, nicht nach Marketing-Kategorien.
        </p>
      </div>

      {order.map((cat) => {
        const list = groups.get(cat);
        if (!list?.length) return null;
        return (
          <section key={cat}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ux-text-muted">
              {cat}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => (
                <ModuleCard key={m.id} module={m} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
