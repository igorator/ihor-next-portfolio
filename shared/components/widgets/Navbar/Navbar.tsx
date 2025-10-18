"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import styles from "./Navbar.module.css";
import { routes } from "@/shared/config/routes";
import { LanguageSelect } from "@/shared/components/widgets/LanguageSelect/LanguageSelect";
import { ThemeSwitch } from "@/shared/components/widgets/ThemeSwitcher/ThemeSwitcher";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { Socials } from "../Socials/Socials";

type Route = (typeof routes)[keyof typeof routes];

export const Navbar = () => {
  const pathname = usePathname() ?? "/";

  const normalized =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const items: Route[] = useMemo(() => Object.values(routes), []);

  return (
    <nav className={styles.navbar}>
      <GlassSurface>
        <Socials />
      </GlassSurface>

      <GlassSurface>
        <div className={styles.navbarLinks}>
          {items.map(({ path, label, icon: Icon }) => {
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
                <span className={styles.label}>{label}</span>
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
