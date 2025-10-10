"use client";

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
  return (
    <button
      type="button"
      className={`${styles.clearButton} glass-wrapper`}
      onClick={onClear}
      disabled={disabled}
      title="Clear filters"
    >
      <MdOutlineClear className={styles.clearIcon} aria-hidden="true" />
    </button>
  );
};
