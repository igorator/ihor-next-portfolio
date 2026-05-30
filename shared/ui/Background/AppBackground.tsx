"use client";

import { useState } from "react";
import { useTheme } from "@/shared/hooks/useTheme";
import { Spinner } from "@/shared/loading/Spinner";
import { Grainient } from "./Grainient";
import styles from "./AppBackground.module.css";

const ANIMATION = {
  timeSpeed: 0.65,
  warpSpeed: 2.0,
  warpStrength: 1.0,
  warpAmplitude: 50,
  warpFrequency: 5.0,
  rotationAmount: 500,
  grainAmount: 0.1,
  grainScale: 2.0,
  zoom: 0.8,
};

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
  const COLORS = isDark ? DARK : LIGHT;

  const handleReady = () => {
    setTimeout(() => {
      setReady(true);
      setTimeout(() => setUnmounted(true), 900);
    }, 500);
  };

  return (
    <>
      <div className={styles.wrapper} aria-hidden="true">
        <Grainient {...ANIMATION} {...COLORS} onReady={handleReady} />
      </div>

      {!unmounted && (
        <div
          className={styles.loader}
          data-ready={ready || undefined}
          aria-hidden="true"
        >
          <Spinner size={36} />
        </div>
      )}
    </>
  );
}
