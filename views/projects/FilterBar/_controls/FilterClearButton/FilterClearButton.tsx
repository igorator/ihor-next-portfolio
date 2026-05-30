"use client";

import { useTranslations } from "next-intl";
import { MdFilterAltOff } from "react-icons/md";
import { Button } from "@/shared/ui/Button";

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
    <Button onClick={onClear} disabled={disabled} loading={loading}>
      <MdFilterAltOff aria-hidden />
      {t("projects.filters.clear", { default: "Clear filters" })}
    </Button>
  );
};
