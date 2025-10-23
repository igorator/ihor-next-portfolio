import { useMemo, useState } from "react";
import type { ProjectWithTechnologies } from "@/shared/types/projects/project";
import type { Technology } from "@/shared/types/technology";

type MatchMode = "any" | "all"; // any = ИЛИ, all = И

export const useProjectFilters = (
  projects: ProjectWithTechnologies[],
  technologies: Technology[],
) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az" | "za">(
    "newest",
  );
  const [matchMode, setMatchMode] = useState<MatchMode>("all"); // <-- ключевой переключатель

  const toggleTech = (id: string) => {
    setSelectedTechs((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const setOnlyTechnology = (id: string) => setSelectedTechs([id]);
  const clearTechnologies = () => setSelectedTechs([]);

  const filteredProjects = useMemo(() => {
    const toIdArray = (p: ProjectWithTechnologies): string[] =>
      (p.technologies ?? []).map((t) => t.id).filter(Boolean);

    let filtered = projects;

    if (selectedTechs.length > 0) {
      filtered = projects.filter((project) => {
        const projectTechIds = toIdArray(project);

        if (matchMode === "all") {
          // И: проект должен содержать каждую из выбранных технологий
          return selectedTechs.every((id) => projectTechIds.includes(id));
        } else {
          // ИЛИ: достаточно хотя бы одной
          return selectedTechs.some((id) => projectTechIds.includes(id));
        }
      });
    }

    return [...filtered].sort((a, b) => {
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
  }, [projects, selectedTechs, sortBy, matchMode]);

  const availableTechnologies = useMemo(() => {
    const projectHasTech = (project: ProjectWithTechnologies, techId: string) =>
      (project.technologies ?? []).some((t) => t.id === techId);

    return technologies.filter((tech) =>
      projects.some((project) => projectHasTech(project, tech.id)),
    );
  }, [projects, technologies]);

  return {
    // состояние
    selectedTechs,
    sortBy,
    matchMode,
    filteredProjects,
    availableTechnologies,
    // экшены
    toggleTech,
    setOnlyTechnology,
    clearTechnologies,
    setSortBy,
    setMatchMode, // можно вывести в UI переключатель AND/OR
  };
};
