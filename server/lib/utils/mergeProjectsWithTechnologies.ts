import type { Technology } from "@/shared/types";
import type { Project } from "@/shared/types/projects/project";

export const mergeProjectsWithTechnologies = (
  projects: Project[],
  technologies: Technology[],
) => {
  return projects.map((project) => {
    const techs = technologies.filter((tech) =>
      project.technologiesIds.includes(tech.id),
    );
    return { ...project, technologies: techs };
  });
};
