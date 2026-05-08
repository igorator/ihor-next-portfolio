import { cache } from "react";
import type { Locale } from "next-intl";

import projectBase from "@/entities/project/data/project_base.json";
import projectsEn from "@/entities/project/data/projects_en.json";
import projectsUk from "@/entities/project/data/projects_uk.json";
import technologiesData from "@/entities/technology/data/technologies.json";

import { listProjectImages } from "./images";
import { listProjectVideo } from "./videos";
import type {
  Project,
  ProjectWithTechnologies,
} from "@/entities/project/types";
import type { Technology } from "@/entities/technology/types";
import { mergeProjectsWithTechnologies } from "@/shared/server/utils/mergeProjectsWithTechnologies";
import { resolveLocale } from "@/shared/server/locale";

const technologies = technologiesData as Technology[];

type ProjectI18n = Pick<Project, "title" | "description" | "type" | "category">;

const I18N_BY_LOCALE: Record<Locale, Record<string, ProjectI18n>> = {
  en: projectsEn as Record<string, ProjectI18n>,
  uk: projectsUk as Record<string, ProjectI18n>,
};

function buildProject(
  base: Omit<Project, "title" | "description" | "type" | "category">,
  i18n: Record<string, ProjectI18n>,
): Project {
  const i18nEntry = i18n[base.slug];
  return {
    ...base,
    title: i18nEntry?.title ?? base.slug,
    description: i18nEntry?.description ?? "",
    type: i18nEntry?.type ?? "",
    category: i18nEntry?.category ?? "",
  };
}

function fetchProjects(locale: Locale): ProjectWithTechnologies[] {
  const safeLocale = resolveLocale(locale);
  const i18n = I18N_BY_LOCALE[safeLocale] as Record<string, ProjectI18n>;

  const bases = projectBase as Array<
    Omit<Project, "title" | "description" | "type" | "category">
  >;

  const merged = bases
    .map((base) => buildProject(base, i18n))
    .filter((p) => !p.isHidden)
    .sort((a, b) => b.date.localeCompare(a.date));

  return mergeProjectsWithTechnologies(merged, technologies);
}

export const getProjects = cache(fetchProjects);

async function fetchProjectBySlug(
  slug: string,
  locale: Locale,
): Promise<(ProjectWithTechnologies & { screens: string[] }) | null> {
  const safeLocale = resolveLocale(locale);
  const i18n = I18N_BY_LOCALE[safeLocale] as Record<string, ProjectI18n>;

  const bases = projectBase as Array<
    Omit<Project, "title" | "description" | "type" | "category">
  >;

  const base = bases.find((p) => p.slug === slug);
  if (!base || base.isHidden) return null;

  const project = buildProject(base, i18n);
  const [projectWithTech] = mergeProjectsWithTechnologies(
    [project],
    technologies,
  );
  if (!projectWithTech) return null;
  const [images, video] = await Promise.all([
    listProjectImages(slug),
    listProjectVideo(slug),
  ]);

  return {
    ...projectWithTech,
    cover: images.cover ?? undefined,
    screens: images.screens,
    video: video ?? undefined,
  };
}

export const getProjectBySlug = cache(fetchProjectBySlug);
