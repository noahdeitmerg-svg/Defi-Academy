import { notFound } from "next/navigation";
import { loadModules } from "@/lib/content/loadModules";
import { loadLesson } from "@/lib/content/loadLesson";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { AccentBar } from "@/components/ui/AccentBar";
import { ModuleFooterNav } from "@/components/navigation/ModuleFooterNav";
import { TierGate } from "@/lib/tier/TierGate";
import { formatDurationMinutes } from "@/lib/utils/formatDuration";
import { TierBadge } from "@/components/course/TierBadge";
import { ModulProgressClient } from "./ModulProgressClient";
import { ModulLessonsList } from "./ModulLessonsList";
import { ALL_MODULES } from "@/data/courseStructure";

export function generateStaticParams() {
  return ALL_MODULES.map((m) => ({ modulId: m.id }));
}

export default async function ModulPage({
  params,
}: {
  params: Promise<{ modulId: string }>;
}) {
  const { modulId } = await params;
  const modules = await loadModules();
  const mod = modules.find((m) => m.id === modulId);
  if (!mod) notFound();

  const titles: Record<string, string> = {};
  for (const lid of mod.lessons) {
    try {
      const a = await loadLesson(mod.id, lid);
      titles[lid] = a.lesson.title;
    } catch {
      titles[lid] = lid;
    }
  }

  const lessonRows = mod.lessons.map((lid) => ({
    id: lid,
    title: titles[lid] ?? lid,
  }));

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Kurs", href: "/kurs" },
          { label: mod.title },
        ]}
      />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ux-text-muted">
            Modul {String(mod.number).padStart(2, "0")}
          </p>
          <h1 className="mt-2 text-2xl font-bold text-ux-text-primary md:text-3xl">
            {mod.title}
          </h1>
          <AccentBar />
        </div>
        <TierBadge tier={mod.tier} />
      </div>
      <p className="mt-4 max-w-2xl text-sm text-ux-text-secondary">{mod.description}</p>
      <dl className="mt-6 flex flex-wrap gap-6 text-sm text-ux-text-muted">
        <div>
          <dt className="text-xs uppercase tracking-wide">Lektionen</dt>
          <dd className="font-ux-mono text-ux-text-primary">{mod.lessons.length}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide">Geschätzte Dauer</dt>
          <dd className="text-ux-text-primary">
            {formatDurationMinutes(mod.estimatedMinutes)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 max-w-md">
        <ModulProgressClient moduleId={mod.id} />
      </div>

      <TierGate moduleTier={mod.tier}>
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-ux-text-primary">Lektionen</h2>
          <ModulLessonsList module={mod} lessons={lessonRows} />
        </section>
      </TierGate>

      <p className="mt-6 text-xs text-ux-text-muted">
        Eine Lektion gilt als abgeschlossen, wenn das Video zu mindestens 90 % gesehen und das Quiz
        bestanden wurde.
      </p>

      <ModuleFooterNav modulId={mod.id} />
    </div>
  );
}
