"use client";

import { Card } from "@/shared/ui/Card";
import { InputWrapper } from "@/shared/ui/InputWrapper";
import type { Technology } from "@/entities/technology/types";
import { TechnologyMultiSelect } from "./_controls/TechnologyMultiSelect/TechnologyMultiSelect";
import { SortSelect } from "./_controls/SortSelect/SortSelect";
import { CommercialSwitch } from "./_controls/CommercialSwitch/CommercialSwitch";
import { FilterClearButton } from "./_controls/FilterClearButton/FilterClearButton";
import type { SortKey } from "../useProjectFilters";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
  availableTechnologies: Technology[];
  technologies: Technology[];
  selectedTechs: string[];
  onToggleTech: (tech: string) => void;
  sortBy: SortKey;
  onSortChange: (sort: SortKey) => void;
  commercialOnly: boolean;
  onCommercialChange: (value: boolean) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar = ({
  availableTechnologies,
  technologies,
  selectedTechs,
  onToggleTech,
  sortBy,
  onSortChange,
  commercialOnly,
  onCommercialChange,
  onClearAll,
  hasActiveFilters,
}: FilterBarProps) => {
  const techs =
    availableTechnologies.length > 0 ? availableTechnologies : technologies;
  const loading = techs.length === 0;

  return (
    <Card className={styles.filtersBar} aria-busy={loading}>
      <InputWrapper
        className={styles.technologySelectWrapper}
        data-active={selectedTechs.length > 0 || undefined}
      >
        <TechnologyMultiSelect
          technologies={techs}
          selectedTechnologies={selectedTechs}
          onToggle={onToggleTech}
          loading={loading}
        />
      </InputWrapper>

      <InputWrapper
        className={styles.sortSelectWrapper}
        data-active={sortBy !== "newest" || undefined}
      >
        <SortSelect value={sortBy} onChange={onSortChange} loading={loading} />
      </InputWrapper>

      <InputWrapper
        className={styles.commercialSwitchWrapper}
        data-active={!commercialOnly || undefined}
      >
        <CommercialSwitch
          value={commercialOnly}
          onChange={onCommercialChange}
          loading={loading}
        />
      </InputWrapper>

      <InputWrapper
        className={styles.filterClearButtonWrapper}
        data-active={hasActiveFilters || undefined}
      >
        <FilterClearButton
          onClear={onClearAll}
          disabled={!hasActiveFilters}
          loading={loading}
        />
      </InputWrapper>
    </Card>
  );
};
