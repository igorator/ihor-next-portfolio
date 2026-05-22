"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Select } from "@/shared/ui/Select";

type Locale = (typeof routing.locales)[number];

const localeNames: Partial<Record<Locale, string>> = {
  en: "English",
  uk: "Українська",
};
const localeTriggerLabels: Partial<Record<Locale, string>> = {
  en: "EN",
  uk: "UA",
};

const localeOptions = routing.locales.map((loc) => ({
  id: loc,
  name: localeNames[loc] ?? loc.toUpperCase(),
  triggerLabel: localeTriggerLabels[loc],
}));

type Props = {
  triggerClassName?: string;
  contentAlign?: "start" | "center" | "end";
  sideOffset?: number;
};

export function LanguageSelect({
  triggerClassName,
  contentAlign = "center",
  sideOffset = 16,
}: Props) {
  const locale = useLocale();
  const t = useTranslations("a11y");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Select
      value={locale}
      onChange={(nextLocale) => {
        const qs = searchParams.toString();
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`, {
          locale: nextLocale,
        });
      }}
      options={localeOptions}
      ariaLabel={t("language")}
      hideChevron
      contentAlign={contentAlign}
      sideOffset={sideOffset}
      triggerClassName={triggerClassName}
    />
  );
}
