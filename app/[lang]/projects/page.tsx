import { ProjectsSection } from "@/shared/components/pages/Projects/Projects";
import { getProjects } from "@/server/services/projects.service";
import { getTechnologies } from "@/server/services/technologies.service";
import { mergeProjectsWithTechnologies } from "@/shared/lib/utils/data-utils";

export default async function Projects() {
  const [projects, technologies] = await Promise.all([
    getProjects(),
    getTechnologies(),
  ]);

  const projectsWithTech = mergeProjectsWithTechnologies(
    projects,
    technologies,
  );

  return (
    <ProjectsSection projects={projectsWithTech} technologies={technologies} />
  );
}
