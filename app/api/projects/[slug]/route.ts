import { NextResponse } from "next/server";
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

type RouteParams = {
  params: { slug: string };
};

export async function GET(request: Request, { params }: RouteParams) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as Locale) || "en";
  const slug = params.slug;

  // fallback на en, если передали неизвестную локаль
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
