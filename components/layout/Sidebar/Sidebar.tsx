"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "@/components/common/Settings/Settings";
import { useEffect, useMemo, useState } from "react";
import styles from "./Sidebar.module.css";
import { routes } from "@/shared/config/routes";

type Route = (typeof routes)[keyof typeof routes];

export const Sidebar = () => {
  const pathname = usePathname() ?? "/";

  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("navbar:collapsed");
    if (stored != null) setCollapsed(stored === "1");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("navbar:collapsed", collapsed ? "1" : "0");
  }, [collapsed, mounted]);

  const normalized =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const items: Route[] = useMemo(() => Object.values(routes), []);

  return (
    <nav
      className={`${styles.sidebarNav} glass-wrapper`}
      data-collapsed={collapsed ? "true" : "false"}
    >
      <div className={styles.sidebarInner}>
        <div className={styles.menuList}>
          {items.map(({ path, label, icon: Icon }) => {
            const isRoot = path === "/";
            const active = isRoot
              ? normalized === "/"
              : normalized === path || normalized.startsWith(path + "/");

            return (
              <Link
                key={path}
                href={path}
                className={`${styles.menuLink} ${active ? styles.isActive : ""}`}
                aria-current={active ? "page" : undefined}
                prefetch
                title={mounted && collapsed ? label : undefined}
              >
                <Icon className={styles.menuIcon} aria-hidden="true" />
                <span className={styles.menuLabel}>{label}</span>
              </Link>
            );
          })}
        </div>

        <Settings />
      </div>
    </nav>
  );
};
