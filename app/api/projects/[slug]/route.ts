import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "next-intl";

import projectsDataEn from "@/server/data/projects/projects_en.json";
import projectsDataUk from "@/server/data/projects/projects_uk.json";
import technologiesData from "@/server/data/technologies/technologies.json";
import { mergeProjectsWithTechnologies } from "@/server/lib/utils/mergeProjectsWithTechnologies";
import type { Project } from "@/shared/types/projects/project";
import type { Technology } from "@/shared/types/technology";

const technologies = technologiesData as Technology[];

const PROJECTS_BY_LANG: Record<Locale, Project[]> = {
  en: projectsDataEn as unknown as Project[],
  uk: projectsDataUk as unknown as Project[],
};

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;

  // locale из query (?locale=en|uk), fallback -> "en"
  const qp = request.nextUrl.searchParams.get("locale") as Locale | null;
  const locale: Locale = qp && qp in PROJECTS_BY_LANG ? qp : "en";

  const projects = PROJECTS_BY_LANG[locale] ?? PROJECTS_BY_LANG.en;

  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return NextResponse.json(
      { error: "Project not found", slug, locale },
      { status: 404 },
    );
  }

  const [projectWithTech] = mergeProjectsWithTechnologies(
    [project],
    technologies,
  );

  return NextResponse.json(projectWithTech);
}
