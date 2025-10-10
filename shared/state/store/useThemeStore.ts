"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "@/shared/lib/theme";
import { defaultTheme, isValidTheme } from "@/shared/lib/theme";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      setTheme: (theme) => {
        if (!isValidTheme(theme)) {
          console.warn(`Invalid theme value: ${theme}`);
          return;
        }
        set({ theme });
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
