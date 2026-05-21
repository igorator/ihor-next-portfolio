"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsChevronDown } from "react-icons/bs";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import styles from "./Select.module.css";

export type SelectOption = { id: string; name: string; triggerLabel?: string };

type Props<T extends string> = {
  value: T;
  onChange: (val: T) => void;
  options: readonly SelectOption[];
  ariaLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  hideChevron?: boolean;
  triggerClassName?: string;
  contentAlign?: "start" | "center" | "end";
  sideOffset?: number;
};

export function Select<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  loading = false,
  disabled = false,
  hideChevron = false,
  triggerClassName,
  contentAlign = "start",
  sideOffset = 8,
}: Props<T>) {
  const isMobile = useIsMobile();
  const selected = options.find((o) => o.id === value);

  return (
    <DropdownMenu.Root modal={isMobile}>
      <DropdownMenu.Trigger
        className={`${styles.trigger} ${hideChevron ? styles.centered : ""} ${loading ? styles.loading : disabled ? styles.disabled : ""} ${triggerClassName ?? ""}`}
        aria-label={ariaLabel}
        disabled={disabled || loading}
      >
        {loading ? (
          <span className={styles.skeleton} aria-hidden />
        ) : (
          <span>{selected?.triggerLabel ?? selected?.name}</span>
        )}
        {!hideChevron && (
          <BsChevronDown className={styles.chevron} aria-hidden />
        )}
      </DropdownMenu.Trigger>

      {!loading && (
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`${styles.content} glass-card`}
            sideOffset={sideOffset}
            align={contentAlign}
          >
            {options.map((opt) => (
              <DropdownMenu.Item
                key={opt.id}
                className={`${styles.item}${opt.id === value ? ` ${styles.itemSelected}` : ""}`}
                onSelect={() => onChange(opt.id as T)}
              >
                <span>{opt.name}</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      )}
    </DropdownMenu.Root>
  );
}
