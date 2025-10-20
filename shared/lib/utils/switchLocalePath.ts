import { locales, type Locale } from "@/shared/config/i18n/config";

export function getPathLocale(pathname: string): Locale | null {
  const seg = pathname.split("/")[1];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : null;
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/");
  // если в пути нет локали — вставим
  if (!getPathLocale(pathname)) {
    return `/${nextLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
  }
  parts[1] = nextLocale;
  return parts.join("/") || "/";
}
