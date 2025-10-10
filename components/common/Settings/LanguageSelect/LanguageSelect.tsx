"use client";

import * as Select from "@radix-ui/react-select";
import { useLanguageStore } from "@/shared/state/store/useLanguageStore";
import styles from "./LanguageSelect.module.css";

export const LanguageSelect = () => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <Select.Root value={language} onValueChange={setLanguage}>
      <Select.Trigger
        className={`${styles.selectTrigger} glass-wrapper`}
        aria-label="Language"
      >
        <div className={styles.selectLabel}>
          {language === "en" ? "EN" : "UA"}
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={`${styles.selectContent} glass-wrapper`}
          position="popper"
          side="top"
          sideOffset={5}
        >
          <Select.Viewport>
            <Select.Item value="en" className={`${styles.selectItem}`}>
              <Select.ItemText>English</Select.ItemText>
            </Select.Item>
            <Select.Item value="ua" className={styles.selectItem}>
              <Select.ItemText>Українська</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
