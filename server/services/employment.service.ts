import "server-only";
import { routing } from "@/i18n/routing";
// Статические импортЫ (удобно и надёжно для serverless)
import employmentEn from "@/server/data/employment/employment_en.json";
import employmentUk from "@/server/data/employment/employment_uk.json";
import type { Employment } from "@/shared/types/employment";

// Тип локали из routing (строго: "en" | "uk")
type Locale = (typeof routing.locales)[number];

// Карта локалей → данных
const EMPLOYMENT_BY_LOCALE: Record<Locale, Employment[]> = {
  en: employmentEn as Employment[],
  uk: employmentUk as Employment[],
};

// Нормализация: если не передали или передали несуществующую — вернём defaultLocale
function normalizeLocale(locale?: string): Locale {
  return routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : (routing.defaultLocale as Locale);
}

/**
 * Основная функция: вернуть employment по локали (или по умолчанию "en")
 */
export async function getEmployment(locale?: string): Promise<Employment[]> {
  const loc = normalizeLocale(locale);
  return EMPLOYMENT_BY_LOCALE[loc];
}
