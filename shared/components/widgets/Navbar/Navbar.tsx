"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { routing } from "@/i18n/routing";
import { LanguageSelect } from "@/shared/components/features/LanguageSelect/LanguageSelect";
import { ThemeSwitch } from "@/shared/components/features/Theme/ThemeSwitcher/ThemeSwitcher";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import { Socials } from "../Socials/Socials";
import styles from "./Navbar.module.css";

type Route = (typeof routes)[keyof typeof routes];

export const Navbar = () => {
  const pathname = usePathname() ?? "/";
  const locale = useLocale();

  // Уберём возможный слэш в конце
  const normalized =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  // Стрип локали из начала пути: /ua/..., /en/..., /de-CH/...
  const stripLocale = (p: string) => {
    const locales = routing.locales; // например: ["en","ua",...]
    const re = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`, "i");
    const stripped = p.replace(re, "");
    return stripped === "" ? "/" : stripped;
  };

  const currentPath = stripLocale(normalized);

  const t = useTranslations();
  const items: Route[] = useMemo(() => Object.values(routes), []);

  return (
    <nav className={styles.navbar}>
      <GlassSurface>
        <Socials />
      </GlassSurface>

      <GlassSurface>
        <div className={styles.navbarLinks}>
          {items.map(({ path, icon: Icon }) => {
            // path из routes — без локали (например, "/projects")
            const active =
              path === "/"
                ? currentPath === "/"
                : currentPath === path || currentPath.startsWith(`${path}/`);

            return (
              <Link
                key={path}
                href={`/${locale}${path === "/" ? "" : path}`}
                className={`${styles.navItem} ${active ? styles.isActive : ""}`}
                aria-current={active ? "page" : undefined}
                prefetch
              >
                <Icon className={styles.icon} aria-hidden="true" />
                <span className={styles.label}>
                  {path === routes.root.path
                    ? t("navigation.root")
                    : path === routes.cv.path
                      ? t("navigation.cv")
                      : path === routes.employment.path
                        ? t("navigation.employment")
                        : t("navigation.projects")}
                </span>
              </Link>
            );
          })}
        </div>
      </GlassSurface>

      <GlassSurface>
        <ThemeSwitch />
      </GlassSurface>

      <GlassSurface>
        <LanguageSelect />
      </GlassSurface>
    </nav>
  );
};
