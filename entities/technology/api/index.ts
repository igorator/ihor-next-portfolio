import { cache } from "react";
import type { Locale } from "next-intl";
import technologyBase from "@/entities/technology/data/technology_base.json";
import technologiesEn from "@/entities/technology/data/technologies_en.json";
import technologiesUk from "@/entities/technology/data/technologies_uk.json";
import type { Technology } from "@/entities/technology/types";
import { resolveLocale } from "@/shared/server/locale";

type TechnologyI18n = { name: string; category: string };
type TechnologyBase = {
  id: string;
  color: string;
  textColor?: string;
  priority: number;
};

const I18N_BY_LOCALE: Record<string, Record<string, TechnologyI18n>> = {
  en: technologiesEn,
  uk: technologiesUk,
};

export function buildTechnologies(locale: string): Technology[] {
  const safeLocale = resolveLocale(locale);
  const i18n = I18N_BY_LOCALE[safeLocale] as Record<string, TechnologyI18n>;
  const bases = technologyBase as TechnologyBase[];

  return bases
    .map((base) => ({
      ...base,
      name: i18n[base.id]?.name ?? base.id,
      category: i18n[base.id]?.category ?? "",
    }))
    .toSorted((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category, safeLocale);
      }
      return a.priority - b.priority;
    });
}

export const getTechnologies = cache(buildTechnologies);
