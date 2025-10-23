import { NextResponse } from "next/server";
import employmentDataEn from "@/server/data/employment/employment_en.json";
import employmentDataUk from "@/server/data/employment/employment_uk.json";
import type { Locale } from "next-intl";
import type { Employment } from "@/shared/types";

const EMPLOYMENT_BY_LANG: Record<Locale, Employment[]> = {
  en: employmentDataEn,
  uk: employmentDataUk,
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as Locale) || "en";

  const employment = EMPLOYMENT_BY_LANG[locale];

  return NextResponse.json(employment);
}
