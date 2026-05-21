"use client";

import type { ReactNode } from "react";
import styles from "./IconButton.module.css";

type Props = {
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  pressed?: boolean;
};

export function IconButton({
  icon,
  onClick,
  disabled,
  loading = false,
  title,
  pressed,
}: Props) {
  return (
    <button
      type="button"
      className={`${styles.button} ${loading ? styles.loading : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      aria-pressed={pressed}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
}
