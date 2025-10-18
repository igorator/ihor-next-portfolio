export const ThemeValues = ["light", "dark", "system"] as const;
export type Theme = (typeof ThemeValues)[number];

export const defaultTheme: Theme = "system";

export const isValidTheme = (theme: string): theme is Theme => {
  return ThemeValues.includes(theme as Theme);
};

export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getEffectiveTheme = (theme: Theme): Theme => {
  return theme === "system" ? getSystemTheme() : theme;
};
