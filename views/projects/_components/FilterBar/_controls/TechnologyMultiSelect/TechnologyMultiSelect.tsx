"use client";

import { useTranslations } from "next-intl";
import type { Technology } from "@/entities/technology/types";
import { MultiSelect } from "@/shared/ui/MultiSelect";

type Props = {
  technologies: Technology[];
  selectedTechnologies: string[];
  onToggle: (id: string) => void;
  loading?: boolean;
};

export const TechnologyMultiSelect = ({
  technologies,
  selectedTechnologies,
  onToggle,
  loading = false,
}: Props) => {
  const t = useTranslations();

  const triggerLabel =
    selectedTechnologies.length === 0
      ? t("projects.filters.selected", {
          count: 0,
          default: "Select Technologies",
        })
      : selectedTechnologies.length === 1
        ? (technologies.find((tech) => tech.id === selectedTechnologies[0])
            ?.name ??
          t("projects.filters.selected", { count: 1, default: "1 selected" }))
        : t("projects.filters.selected", {
            count: selectedTechnologies.length,
            default: `${selectedTechnologies.length} selected`,
          });

  const items = technologies.map((tech) => ({
    id: tech.id,
    name: tech.name,
    hint: tech.category,
  }));

  return (
    <MultiSelect
      items={items}
      selected={selectedTechnologies}
      onToggle={onToggle}
      triggerLabel={triggerLabel}
      loading={loading}
    />
  );
};
