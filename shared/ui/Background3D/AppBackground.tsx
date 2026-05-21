"use client";

import { useState } from "react";
import { useTheme } from "@/shared/hooks/useTheme";
import { Grainient } from "./Grainient";
import styles from "./AppBackground.module.css";

const DARK = {
  color1: "#1e3d6e",
  color2: "#0a1628",
  color3: "#000000",
  contrast: 1.2,
  saturation: 0.9,
};

const LIGHT = {
  color1: "#9fc8f0",
  color2: "#d4e8ff",
  color3: "#f5f8ff",
  contrast: 1.1,
  saturation: 0.85,
};

export function AppBackground() {
  const { isDark } = useTheme();
  const [ready, setReady] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const colors = isDark ? DARK : LIGHT;

  const handleReady = () => {
    setTimeout(() => {
      setReady(true);
      setTimeout(() => setUnmounted(true), 900);
    }, 500);
  };

  return (
    <>
      <div className={styles.wrapper} aria-hidden="true">
        <Grainient
          {...colors}
          timeSpeed={0.6}
          warpSpeed={3.5}
          grainAmount={0.06}
          grainScale={2.5}
          warpStrength={0.8}
          zoom={0.85}
          onReady={handleReady}
        />
      </div>

      {!unmounted && (
        <div
          className={styles.loader}
          data-ready={ready || undefined}
          aria-hidden="true"
        >
          <svg
            className={styles.loaderSpinner}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        </div>
      )}
    </>
  );
}
