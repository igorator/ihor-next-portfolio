"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import styles from "./Navbar.module.css";
import { routes } from "@/shared/config/routes";
import { useTranslations } from "next-intl";
import { LanguageSelect } from "@/shared/components/features/LanguageSelect/LanguageSelect";
import { ThemeSwitch } from "@/shared/components/features/Theme/ThemeSwitcher/ThemeSwitcher";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { Socials } from "../Socials/Socials";

type Route = (typeof routes)[keyof typeof routes];

export const Navbar = () => {
  const pathname = usePathname() ?? "/";

  const normalized =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

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
            const active =
              path === "/"
                ? normalized === "/"
                : normalized === path || normalized.startsWith(path + "/");

            return (
              <Link
                key={path}
                href={path}
                className={`${styles.navItem} ${active ? styles.isActive : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={styles.icon} aria-hidden="true" />
                <span className={styles.label}>
                  {
                    // compute translated label per route
                    path === routes.root.path
                      ? t("navigation.root")
                      : path === routes.cv.path
                        ? t("navigation.cv")
                        : path === routes.employment.path
                          ? t("navigation.employment")
                          : t("navigation.projects")
                  }
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
