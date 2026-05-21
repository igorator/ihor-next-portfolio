"use client";

import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import { IconButton } from "@/shared/ui/IconButton";

type ViewMode = "grid" | "list";

type Props = {
  viewMode: ViewMode;
  onToggle: () => void;
  loading?: boolean;
};

export const ViewToggleButton = ({
  viewMode,
  onToggle,
  loading = false,
}: Props) => {
  const toList = viewMode === "grid";

  return (
    <IconButton
      icon={toList ? <BsListUl aria-hidden /> : <BsGrid3X3Gap aria-hidden />}
      onClick={onToggle}
      loading={loading}
      pressed={viewMode === "list"}
      title={toList ? "List view" : "Grid view"}
    />
  );
};
