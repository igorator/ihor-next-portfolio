// app/[lang]/i18n.ts
import "server-only";
import type { Locale } from "@/shared/config/i18n/config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  uk: () => import("./dictionaries/uk.json").then((m) => m.default),
} as const;

export type Dict = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getDictionary(locale: Locale): Promise<Dict> {
  return (dictionaries[locale] ?? dictionaries.en)();
}
