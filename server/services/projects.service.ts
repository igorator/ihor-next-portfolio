import "server-only";
import { routing } from "@/i18n/routing";
// Импорты статичных JSON
import projectDataEn from "@/server/data/projects/projects_en.json";
import projectDataUk from "@/server/data/projects/projects_uk.json";
import type { Project } from "@/shared/types/project";

type Locale = (typeof routing.locales)[number];

// Карта локалей
const PROJECTS_BY_LOCALE: Record<Locale, Project[]> = {
  en: projectDataEn.projects as Project[],
  uk: projectDataUk.projects as Project[],
};

// Функция нормализации (если локаль не передана или неизвестна → defaultLocale)
function normalizeLocale(locale?: string): Locale {
  return routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : (routing.defaultLocale as Locale);
}

/**
 * Возвращает список проектов для указанной локали
 * Если не передано — вернётся default ("en")
 */
export async function getProjects(locale?: string): Promise<Project[]> {
  const loc = normalizeLocale(locale);
  return PROJECTS_BY_LOCALE[loc];
}
