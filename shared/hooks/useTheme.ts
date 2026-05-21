"use client";

import { useSyncExternalStore } from "react";
export type ThemeSetting = "light" | "dark" | "system";
type Effective = Exclude<ThemeSetting, "system">;

function readSetting(): ThemeSetting {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return "system";
}

function readEffective(): Effective {
  const setting = readSetting();
  if (setting !== "system") return setting;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribe(callback: () => void): () => void {
  const obs = new MutationObserver(callback);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  mq?.addEventListener("change", callback);
  return () => {
    obs.disconnect();
    mq?.removeEventListener("change", callback);
  };
}

const getSetting = (): ThemeSetting => readSetting();
const getEffective = (): Effective => readEffective();
const getServerSetting = (): ThemeSetting => "system";
const getServerEffective = (): Effective => "dark";

export function useTheme() {
  const setting = useSyncExternalStore(subscribe, getSetting, getServerSetting);
  const effective = useSyncExternalStore(
    subscribe,
    getEffective,
    getServerEffective,
  );

  return { setting, effective, isDark: effective === "dark" };
}
