import { redirect } from "next/navigation";
import { getAllModules, getModule } from "@/lib/content";
import { lessonHref } from "@/lib/routes";

export async function generateStaticParams() {
  const modules = await getAllModules();
  return modules.map((m) => ({ moduleSlug: m.slug }));
}

type Props = { params: Promise<{ moduleSlug: string }> };

export default async function ModuleIndexPage({ params }: Props) {
  const { moduleSlug } = await params;
  const mod = await getModule(moduleSlug);
  const first = mod?.lessons[0]?.slug;
  if (!first) redirect("/");
  redirect(lessonHref(moduleSlug, first));
}
