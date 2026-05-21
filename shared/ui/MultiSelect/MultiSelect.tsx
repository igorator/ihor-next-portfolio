"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsChevronDown } from "react-icons/bs";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import styles from "./MultiSelect.module.css";

export type MultiSelectItem = {
  id: string;
  name: string;
  hint?: string;
};

type Props = {
  items: MultiSelectItem[];
  selected: string[];
  onToggle: (id: string) => void;
  triggerLabel: string;
  loading?: boolean;
};

export function MultiSelect({
  items,
  selected,
  onToggle,
  triggerLabel,
  loading = false,
}: Props) {
  const isMobile = useIsMobile();
  return (
    <DropdownMenu.Root open={loading ? false : undefined} modal={isMobile}>
      <DropdownMenu.Trigger
        className={`${styles.trigger} ${loading ? styles.loading : ""}`}
        disabled={loading}
        aria-disabled={loading}
      >
        {loading ? (
          <span className={styles.skeleton} aria-hidden />
        ) : (
          <span className={styles.label}>{triggerLabel}</span>
        )}
        <BsChevronDown className={styles.chevron} aria-hidden />
      </DropdownMenu.Trigger>

      {!loading && (
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`${styles.content} glass-card`}
            sideOffset={8}
            align="start"
          >
            {items.map((item) => (
              <DropdownMenu.CheckboxItem
                key={item.id}
                checked={selected.includes(item.id)}
                onCheckedChange={() => onToggle(item.id)}
                onSelect={(e) => e.preventDefault()}
                className={styles.item}
              >
                <span className={styles.itemLabel}>{item.name}</span>
                {item.hint && (
                  <span className={styles.itemHint}>{item.hint}</span>
                )}
              </DropdownMenu.CheckboxItem>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      )}
    </DropdownMenu.Root>
  );
}
