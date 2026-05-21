"use client";

import { useTranslations } from "next-intl";
import { Select } from "@/shared/ui/Select";
import styles from "./SortSelect.module.css";

export type SortKey = "newest" | "oldest" | "az" | "za";

type Props = {
  value: SortKey;
  onChange: (val: SortKey) => void;
  disabled?: boolean;
  loading?: boolean;
};

export const SortSelect = ({
  value,
  onChange,
  disabled = false,
  loading = false,
}: Props) => {
  const t = useTranslations();

  const options = [
    {
      id: "newest",
      name: t("projects.filters.options.newest", { default: "Newest First" }),
    },
    {
      id: "oldest",
      name: t("projects.filters.options.oldest", { default: "Oldest First" }),
    },
    { id: "az", name: t("projects.filters.options.az", { default: "A-Z" }) },
    { id: "za", name: t("projects.filters.options.za", { default: "Z-A" }) },
  ] as const satisfies ReadonlyArray<{ id: SortKey; name: string }>;

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      ariaLabel={t("projects.filters.sort", { default: "Sort by" })}
      disabled={disabled}
      loading={loading}
      triggerClassName={styles.trigger}
    />
  );
};
