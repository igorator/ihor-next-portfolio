"use client";

import { useTranslations } from "next-intl";
import { MdFilterAltOff } from "react-icons/md";
import { IconButton } from "@/shared/ui/IconButton";

type Props = {
  onClear: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const FilterClearButton = ({
  onClear,
  disabled,
  loading = false,
}: Props) => {
  const t = useTranslations();

  return (
    <IconButton
      icon={<MdFilterAltOff aria-hidden />}
      onClick={onClear}
      disabled={disabled}
      loading={loading}
      title={t("projects.filters.clear", { default: "Clear filters" })}
    />
  );
};
