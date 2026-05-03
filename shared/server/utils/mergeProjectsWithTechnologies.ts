import type { Technology } from "@/entities/technology/types";
import type {
  Project,
  ProjectWithTechnologies,
} from "@/entities/project/types";

export const mergeProjectsWithTechnologies = (
  projects: Project[],
  technologies: Technology[],
): ProjectWithTechnologies[] => {
  const techMap = new Map(technologies.map((t) => [t.id, t]));

  return projects.map((project) => {
    const { technologiesIds, ...rest } = project;
    const techs = technologiesIds
      .map((id) => techMap.get(id))
      .filter((t): t is Technology => t !== undefined);
    return { ...rest, technologies: techs };
  });
};
