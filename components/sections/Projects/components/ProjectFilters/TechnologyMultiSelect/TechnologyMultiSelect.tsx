"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./TechnologyMultiSelect.module.css";
import type { Technology } from "@/shared/types/technology";
import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import { GlassSurface } from "@/components/decorative/GlassSurface/GlassSurface";

type Props = {
  technologies: Technology[];
  selectedTechnologies: string[];
  onToggle: (id: string) => void;
};

export const TechnologyMultiSelect = ({
  technologies,
  selectedTechnologies,
  onToggle,
}: Props) => {
  const triggerLabel =
    selectedTechnologies.length === 0
      ? "Select Technologies"
      : selectedTechnologies.length === 1
        ? (technologies.find((t) => t.id === selectedTechnologies[0])?.name ??
          "1 selected")
        : `${selectedTechnologies.length} selected`;

  return (
    <DropdownMenu.Root>
      <GlassSurface>
        <DropdownMenu.Trigger
          className={`${styles.triggerButton} glass-wrapper`}
        >
          <span className={styles.triggerLabel}>{triggerLabel}</span>
          <BsChevronDown className={styles.chevronIcon} aria-hidden />
        </DropdownMenu.Trigger>
      </GlassSurface>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`${styles.menuContent} glass-wrapper`} // + glass-wrapper
          sideOffset={6}
          align="start"
        >
          {technologies.map((t) => {
            const checked = selectedTechnologies.includes(t.id);
            return (
              <DropdownMenu.CheckboxItem
                key={t.id}
                checked={checked}
                onCheckedChange={() => onToggle(t.id)}
                onSelect={(e) => e.preventDefault()} // не закрывать меню
                className={styles.menuItem}
              >
                <span className={styles.menuItemLabel}>{t.name}</span>
                <span className={styles.menuItemHint}>{t.category}</span>
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
    </DropdownMenu.Root>
  );
};
