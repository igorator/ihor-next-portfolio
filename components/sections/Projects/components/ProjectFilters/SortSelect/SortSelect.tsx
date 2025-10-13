"use client";

import * as Select from "@radix-ui/react-select";
import styles from "./SortSelect.module.css";
import { BsChevronDown } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { GlassSurface } from "@/components/decorative/GlassSurface/GlassSurface";

const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "oldest", name: "Oldest First" },
  { id: "az", name: "A-Z" },
  { id: "za", name: "Z-A" },
];

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export const SortSelect = ({ value, onChange }: Props) => {
  return (
    <GlassSurface>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          className={`${styles.selectTrigger} glass-wrapper`}
          aria-label="Sort"
        >
          <Select.Value placeholder="Sort Projects" />
          <Select.Icon className={styles.selectIcon}>
            <BsChevronDown className={styles.chevronIcon} aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={`${styles.selectContent} glass-wrapper`}
            position="popper"
            sideOffset={6}
          >
            <Select.Viewport className={styles.selectViewport}>
              {sortOptions.map((opt) => (
                <Select.Item
                  key={opt.id}
                  value={opt.id}
                  className={styles.selectItem}
                >
                  <Select.ItemText>{opt.name}</Select.ItemText>
                  <Select.ItemIndicator className={styles.selectCheck}>
                    <BsCheckLg />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </GlassSurface>
  );
};
