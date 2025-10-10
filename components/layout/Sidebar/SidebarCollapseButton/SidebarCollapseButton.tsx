"use client";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styles from "./NavbarCollapseButton.module.css";

interface NavbarCollapseButtonProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const NavbarCollapseButton = ({
  collapsed,
  onToggle,
}: NavbarCollapseButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.collapseButton} glass-wrapper`}
      onClick={onToggle}
      aria-pressed={collapsed}
      aria-label={collapsed ? "Expand navbar" : "Collapse navbar"}
      title={collapsed ? "Expand" : "Collapse"}
    >
      {collapsed ? <BsChevronRight /> : <BsChevronLeft />}
    </button>
  );
};
