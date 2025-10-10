"use client";

import { useMemo } from "react";
import type { Technology } from "@/shared/types/technology";
import styles from "./ProjectFilters.module.css";
import { TechnologyMultiSelect } from "./TechnologyMultiSelect/TechnologyMultiSelect";
import { SortSelect } from "./SortSelect/SortSelect";
import { FilterClearButton } from "./FilterClearButton/FilterClearButton";

type ProjectFiltersProps = {
  technologies: Technology[];
  selectedTechnologies: string[];
  sortBy: string;
  onTechnologySelect: (id: string) => void; // toggler
  onSortChange: (value: string) => void;
};

export const ProjectFilters = ({
  technologies,
  selectedTechnologies,
  sortBy,
  onTechnologySelect,
  onSortChange,
}: ProjectFiltersProps) => {
  const techs = useMemo(() => {
    return [...technologies].sort((a, b) => {
      if (a.category !== b.category)
        return a.category.localeCompare(b.category);
      return a.priority - b.priority;
    });
  }, [technologies]);

  const handleClear = () => {
    // Сброс сортировки
    if (sortBy !== "newest") onSortChange("newest");

    // Снять все выбранные технологии (toggler-логика)
    if (selectedTechnologies.length) {
      selectedTechnologies.forEach((id) => {
        onTechnologySelect(id); // ← теперь без возврата
      });
    }
  };

  const isPristine = selectedTechnologies.length === 0 && sortBy === "newest";

  return (
    <div className={styles.filtersBar}>
      <TechnologyMultiSelect
        technologies={techs}
        selectedTechnologies={selectedTechnologies}
        onToggle={onTechnologySelect}
      />

      <SortSelect value={sortBy} onChange={onSortChange} />

      <FilterClearButton onClear={handleClear} disabled={isPristine} />
    </div>
  );
};
