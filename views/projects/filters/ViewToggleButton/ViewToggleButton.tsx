"use client";

import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import styles from "../FilterClearButton/FilterClearButton.module.css";

type ViewMode = "grid" | "list";

type ViewToggleButtonProps = {
  viewMode: ViewMode;
  onToggle: () => void;
  loading?: boolean;
};

export const ViewToggleButton = ({
  viewMode,
  onToggle,
  loading = false,
}: ViewToggleButtonProps) => {
  const toList = viewMode === "grid";

  return (
    <button
      type="button"
      className={`${styles.clearButton} ${loading ? styles.loading : ""}`}
      onClick={onToggle}
      disabled={loading}
      aria-pressed={viewMode === "list"}
      title={toList ? "List view" : "Grid view"}
    >
      {toList ? (
        <BsListUl className={styles.clearIcon} aria-hidden="true" />
      ) : (
        <BsGrid3X3Gap className={styles.clearIcon} aria-hidden="true" />
      )}
    </button>
  );
};
