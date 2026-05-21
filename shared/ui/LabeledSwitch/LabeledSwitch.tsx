"use client";

import { Switch } from "@/shared/ui/Switch";
import styles from "./LabeledSwitch.module.css";

type Props = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
};

export function LabeledSwitch({
  label,
  checked,
  onChange,
  disabled = false,
  loading = false,
}: Props) {
  return (
    <div
      className={`${styles.row} ${loading ? styles.loading : disabled ? styles.disabled : ""}`}
    >
      {loading ? (
        <>
          <span className={styles.skeletonText} aria-hidden />
          <span className={styles.skeletonSwitch} aria-hidden />
        </>
      ) : (
        <>
          <span className={styles.label}>{label}</span>
          <Switch checked={checked} onChange={onChange} disabled={disabled} />
        </>
      )}
    </div>
  );
}
