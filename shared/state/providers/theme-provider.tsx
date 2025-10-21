"use client";

import { type ReactNode, useEffect } from "react";
import { getEffectiveTheme, getSystemTheme } from "@/shared/lib/utils/theme";
import { useThemeStore } from "@/shared/state/store/useThemeStore";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    const effectiveTheme = getEffectiveTheme(theme);

    root.setAttribute("data-theme", effectiveTheme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        root.setAttribute("data-theme", getSystemTheme());
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return children;
}
