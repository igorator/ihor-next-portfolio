import { useState, useMemo } from "react";
import type { Project } from "@/shared/types/project";
import type { Technology } from "@/shared/types/technology";

export const useProjectFilters = (
  projects: Project[],
  technologies: Technology[],
) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Filter by specific technology
    if (selectedTech) {
      filtered = filtered.filter((project) =>
        // projects may be merged with technologies on server; fall back to technologyIds
        ((project as any).technologies ?? project.technologyIds ?? []).some(
          (tech: any) => tech.id === selectedTech || tech === selectedTech,
        ),
      );
    }

    // Sort projects
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.date.localeCompare(a.date);
        case "oldest":
          return a.date.localeCompare(b.date);
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [projects, selectedTech, sortBy]);

  const handleTechSelect = (techId: string) => {
    setSelectedTech((current) => (current === techId ? null : techId));
  };

  const availableTechnologies = useMemo(
    () =>
      technologies.filter((tech) =>
        projects.some((project) =>
          // project may have merged technologies or only ids
          ((project as any).technologies ?? project.technologyIds ?? []).some(
            (pt: any) => (pt && pt.id ? pt.id === tech.id : pt === tech.id),
          ),
        ),
      ),
    [projects, technologies],
  );

  return {
    selectedTechs: selectedTech ? [selectedTech] : [],
    sortBy,
    filteredProjects,
    handleTechSelect,
    setSortBy,
    availableTechnologies,
  };
};
