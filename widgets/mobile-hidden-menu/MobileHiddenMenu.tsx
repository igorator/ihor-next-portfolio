"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { BsX } from "react-icons/bs";
import { Portal } from "@/shared/ui/Portal";
import { LanguageSelect } from "@/widgets/language-select/LanguageSelect";
import { Socials } from "@/widgets/socials/Socials";
import { ThemeSwitch } from "@/widgets/theme-switcher/ThemeSwitcher";
import styles from "./MobileHiddenMenu.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const MobileHiddenMenu: React.FC<Props> = ({ open, onClose }) => {
  const t = useTranslations("a11y");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    const html = document.documentElement;
    if (open) html.setAttribute("data-scroll-locked", "true");
    else html.removeAttribute("data-scroll-locked");
    return () => html.removeAttribute("data-scroll-locked");
  }, [open]);

  if (!open) return null;

  return (
    <Portal>
      <button
        type="button"
        className={styles.layer}
        aria-label={t("closeMenu")}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("openMenu")}
        className={styles.menu}
      >
        <div className={styles.menuInner}>
          <div className={styles.header}>
            <LanguageSelect
              triggerClassName={styles.langTrigger}
              contentAlign="start"
              sideOffset={8}
            />
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label={t("closeMenu")}
            >
              <BsX className={styles.closeIcon} size={30} />
            </button>
          </div>

          <div
            className={styles.content}
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest("a, button")) onClose();
            }}
          >
            <Socials vertical />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </Portal>
  );
};
