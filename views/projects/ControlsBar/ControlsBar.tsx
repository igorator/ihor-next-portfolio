"use client";

import { Card } from "@/shared/ui/Card";
import { InputWrapper } from "@/shared/ui/InputWrapper";
import { ViewToggleButton } from "../FilterBar/_controls/ViewToggleButton/ViewToggleButton";
import styles from "./ControlsBar.module.css";

interface ControlsBarProps {
  viewMode: "grid" | "list";
  onToggleView: () => void;
}

export const ControlsBar = ({ viewMode, onToggleView }: ControlsBarProps) => {
  return (
    <Card className={styles.controlsBar}>
      <InputWrapper className={styles.viewToggleWrapper}>
        <ViewToggleButton viewMode={viewMode} onToggle={onToggleView} />
      </InputWrapper>
    </Card>
  );
};
