"use client";

import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import styles from "./FilterClearButton.module.css";
import { MdOutlineClear } from "react-icons/md";

type FilterClearButtonProps = {
  onClear: () => void;
  disabled?: boolean;
};

export const FilterClearButton = ({
  onClear,
  disabled,
}: FilterClearButtonProps) => {
  const { useTranslations } = require("next-intl");
  const t = useTranslations();

  return (
    <GlassSurface>
      <button
        type="button"
        className={`${styles.clearButton} glass-wrapper`}
        onClick={onClear}
        disabled={disabled}
        title={t("projects.filters.clear")}
      >
        <MdOutlineClear className={styles.clearIcon} aria-hidden="true" />
      </button>
    </GlassSurface>
  );
};
