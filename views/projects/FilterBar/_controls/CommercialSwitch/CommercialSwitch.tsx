"use client";

import { useTranslations } from "next-intl";
import { LabeledSwitch } from "@/shared/ui/LabeledSwitch";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
};

export const CommercialSwitch = ({
  value,
  onChange,
  disabled = false,
  loading = false,
}: Props) => {
  const t = useTranslations();

  return (
    <LabeledSwitch
      label={t("projects_ui.onlyCommercialProjects", {
        default: "Commercial only",
      })}
      checked={value}
      onChange={onChange}
      disabled={disabled}
      loading={loading}
    />
  );
};
