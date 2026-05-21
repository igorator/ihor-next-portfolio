"use client";

import styles from "./Spinner.module.css";

type SpinnerProps = {
  size?: number | string;
  className?: string;
};

export function Spinner({ size = 20, className }: SpinnerProps) {
  const dim = typeof size === "number" ? `${size}px` : size;

  return (
    <span
      className={`${styles.wrap} ${className ?? ""}`}
      role="status"
      aria-live="polite"
    >
      <svg
        className={styles.spinner}
        style={{ width: dim, height: dim }}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-busy="true"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1="20"
            y1="7"
            x2="20"
            y2="13"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${i * 30} 20 20)`}
            opacity={((12 - i) / 12).toFixed(2)}
          />
        ))}
      </svg>
    </span>
  );
}

export default Spinner;
