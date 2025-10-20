"use client";

import * as Select from "@radix-ui/react-select";
import styles from "./SortSelect.module.css";
import { BsChevronDown } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";

import { useTranslations } from "next-intl";

const sortOptions = (t: any) => [
  { id: "newest", name: t("projects.filters.options.newest") },
  { id: "oldest", name: t("projects.filters.options.oldest") },
  { id: "az", name: t("projects.filters.options.az") },
  { id: "za", name: t("projects.filters.options.za") },
];

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export const SortSelect = ({ value, onChange }: Props) => {
  const t = useTranslations();

  return (
    <GlassSurface>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          className={`${styles.selectTrigger} glass-wrapper`}
          aria-label="Sort"
        >
          <Select.Value placeholder={t("projects.filters.sort")} />
          <Select.Icon className={styles.selectIcon}>
            <BsChevronDown className={styles.chevronIcon} aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={`${styles.selectContent} glass-wrapper`}
            position="popper"
            sideOffset={20}
          >
            <Select.Viewport className={styles.selectViewport}>
              {sortOptions(t).map((opt) => (
                <Select.Item
                  key={opt.id}
                  value={opt.id}
                  className={styles.selectItem}
                >
                  <Select.ItemText>{opt.name}</Select.ItemText>
                  <Select.ItemIndicator className={styles.selectCheck}>
                    <BsCheckLg />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </GlassSurface>
  );
};
