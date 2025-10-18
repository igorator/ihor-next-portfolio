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
        project.technologies.some((tech) => tech.id === selectedTech),
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
          project.technologies.some((pt) => pt.id === tech.id),
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
