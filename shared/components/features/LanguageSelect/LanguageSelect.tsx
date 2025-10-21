"use client";

import * as Select from "@radix-ui/react-select";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LanguageSelect.module.css";

const localeLabels = {
  en: "English",
  uk: "Українська",
} as const;

export const LanguageSelect = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Select.Root value={locale} onValueChange={onChange}>
      <Select.Trigger className={styles.selectTrigger} aria-label="Language">
        <div className={styles.selectLabel}>{locale.toUpperCase()}</div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={styles.selectContent}
          position="popper"
          side="top"
          align="end"
          sideOffset={12}
        >
          <Select.Viewport>
            {routing.locales.map((loc) => (
              <Select.Item key={loc} value={loc} className={styles.selectItem}>
                <Select.ItemText>{localeLabels[loc]}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
