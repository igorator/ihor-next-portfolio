"use client";

import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  pressed?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({
  children,
  onClick,
  disabled,
  loading = false,
  pressed,
  className,
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      className={[styles.button, loading ? styles.loading : "", className]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={disabled || loading}
      aria-pressed={pressed}
    >
      {children}
    </button>
  );
}
