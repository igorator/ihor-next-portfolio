import { NextResponse } from "next/server";
import type { Locale } from "next-intl";
import type { Project } from "@/shared/types/projects/project";
import type { Technology } from "@/shared/types/technology";
import { mergeProjectsWithTechnologies } from "@/server/lib/utils/mergeProjectsWithTechnologies";
import projectsDataEn from "@/server/data/projects/projects_en.json";
import projectsDataUk from "@/server/data/projects/projects_uk.json";
import technologiesData from "@/server/data/technologies/technologies.json";

const technologies = technologiesData as Technology[];

const PROJECTS_BY_LANG: Record<Locale, Project[]> = {
  en: projectsDataEn,
  uk: projectsDataUk,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as Locale) || "en";
  const projects = PROJECTS_BY_LANG[locale];
  const projectsWithTechnologies = mergeProjectsWithTechnologies(
    projects,
    technologies,
  );

  return NextResponse.json(projectsWithTechnologies);
}
