"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useTranslations } from "next-intl";
import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import type { Technology } from "@/entities/technology/types";
import styles from "./TechnologyMultiSelect.module.css";

type Props = {
  technologies: Technology[];
  selectedTechnologies: string[];
  onToggle: (id: string) => void;
  loading?: boolean;
};

export const TechnologyMultiSelect = ({
  technologies,
  selectedTechnologies,
  onToggle,
  loading = false,
}: Props) => {
  const t = useTranslations();

  const triggerLabel =
    selectedTechnologies.length === 0
      ? t("projects.filters.selected", {
          count: 0,
          default: "Select Technologies",
        })
      : selectedTechnologies.length === 1
        ? (technologies.find((tech) => tech.id === selectedTechnologies[0])
            ?.name ??
          t("projects.filters.selected", { count: 1, default: "1 selected" }))
        : t("projects.filters.selected", {
            count: selectedTechnologies.length,
            default: `${selectedTechnologies.length} selected`,
          });

  return (
    <DropdownMenu.Root open={loading ? false : undefined}>
      <DropdownMenu.Trigger
        className={`${styles.triggerButton} ${loading ? styles.loading : ""}`}
        disabled={loading}
        aria-disabled={loading}
      >
        {loading ? (
          <span className={styles.skeletonText} aria-hidden />
        ) : (
          <span className={styles.triggerLabel}>{triggerLabel}</span>
        )}
        <BsChevronDown className={styles.chevronIcon} aria-hidden />
      </DropdownMenu.Trigger>

      {!loading && (
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`${styles.menuContent} glass-card`}
            sideOffset={8}
            align="start"
          >
            {technologies.map((tech) => {
              const isChecked = selectedTechnologies.includes(tech.id);
              return (
                <DropdownMenu.CheckboxItem
                  key={tech.id}
                  checked={isChecked}
                  onCheckedChange={() => onToggle(tech.id)}
                  onSelect={(event) => event.preventDefault()}
                  className={styles.menuItem}
                >
                  <span className={styles.menuItemLabel}>{tech.name}</span>
                  <span className={styles.menuItemHint}>{tech.category}</span>
                  <span className={styles.rightSlot}>
                    <DropdownMenu.ItemIndicator>
                      <BsCheckLg className={styles.checkIcon} aria-hidden />
                    </DropdownMenu.ItemIndicator>
                  </span>
                </DropdownMenu.CheckboxItem>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      )}
    </DropdownMenu.Root>
  );
};
