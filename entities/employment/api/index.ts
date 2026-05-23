import { cache } from "react";
import type { Locale } from "next-intl";

import employmentBase from "@/entities/employment/data/employment_base.json";
import employmentEn from "@/entities/employment/data/employment_en.json";
import employmentUk from "@/entities/employment/data/employment_uk.json";

import projectBase from "@/entities/project/data/project_base.json";
import projectsEn from "@/entities/project/data/projects_en.json";
import projectsUk from "@/entities/project/data/projects_uk.json";

import type { Employment } from "@/entities/employment/types";
import type { Project } from "@/entities/project/types";
import { resolveLocale } from "@/shared/server/locale";

type LocalizedMap = Record<
  string,
  { type: string; category?: string; position?: string; roles: string[] }
>;

const EMPLOYMENT_BY_LANG: Record<Locale, LocalizedMap> = {
  en: employmentEn as LocalizedMap,
  uk: employmentUk as LocalizedMap,
};

function fetchEmployment(locale: Locale): Employment[] {
  const safeLocale = resolveLocale(locale);
  const localeMap = (EMPLOYMENT_BY_LANG[safeLocale] ??
    EMPLOYMENT_BY_LANG.en) as LocalizedMap;
  const enMap = EMPLOYMENT_BY_LANG.en as LocalizedMap;

  const availableProjectSlugs = new Set(
    (
      projectBase as Array<
        Omit<Project, "title" | "description" | "type" | "category">
      >
    )
      .filter((projectEntry) => !projectEntry.isHidden)
      .map((projectEntry) => projectEntry.slug),
  );

  const projectsI18n = (
    safeLocale === "uk" ? projectsUk : projectsEn
  ) as Record<
    string,
    Pick<Project, "title" | "description" | "type" | "category">
  >;

  return employmentBase.map((baseItem) => {
    const localizedEntry = localeMap[baseItem.id] ?? enMap[baseItem.id];

    const linkedProjects = (baseItem.projects || [])
      .filter((slug) => availableProjectSlugs.has(slug))
      .map((slug) => ({ slug, title: projectsI18n[slug]?.title ?? slug }));

    return {
      ...baseItem,
      type: localizedEntry?.type ?? "unknown",
      category: localizedEntry?.category,
      position: localizedEntry?.position,
      roles: localizedEntry?.roles ?? [],
      linkedProjects,
    } as Employment;
  });
}

export const getEmployment = cache(fetchEmployment);
