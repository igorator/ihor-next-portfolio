"use client";

import type { Technology } from "@/shared/types/technology";
import { CommercialSwitch } from "./CommercialSwitch/CommercialSwitch";
import { FilterClearButton } from "./FilterClearButton/FilterClearButton";
import styles from "./ProjectFilters.module.css";
import { SortSelect } from "./SortSelect/SortSelect";
import { TechnologyMultiSelect } from "./TechnologyMultiSelect/TechnologyMultiSelect";

// 1) Единый тип сортировки
type SortKey = "newest" | "oldest" | "az" | "za";

// 2) Пропсы
type ProjectFiltersProps = {
  technologies: Technology[];
  selectedTechnologies: string[];
  sortBy: SortKey;
  commercialOnly: boolean; // <-- добавлено
  onTechnologySelect: (id: string) => void; // toggler
  onSortChange: (value: SortKey) => void;
  onCommercialChange: (value: boolean) => void; // <-- добавлено
};

export const ProjectFilters = ({
  technologies,
  selectedTechnologies,
  sortBy,
  commercialOnly,
  onTechnologySelect,
  onSortChange,
  onCommercialChange,
}: ProjectFiltersProps) => {
  const handleClear = () => {
    if (sortBy !== "newest") onSortChange("newest");

    if (selectedTechnologies.length) {
      selectedTechnologies.map((id) => onTechnologySelect(id));
    }

    if (commercialOnly) onCommercialChange(false);
  };

  const isPristine =
    selectedTechnologies.length === 0 && sortBy === "newest" && !commercialOnly;

  return (
    <div className={styles.filtersBar}>
      <TechnologyMultiSelect
        technologies={technologies}
        selectedTechnologies={selectedTechnologies}
        onToggle={onTechnologySelect}
      />

      <SortSelect value={sortBy} onChange={onSortChange} />

      <CommercialSwitch value={commercialOnly} onChange={onCommercialChange} />

      <FilterClearButton onClear={handleClear} disabled={isPristine} />
    </div>
  );
};
