import { ProjectsSection } from "@/components/sections/Projects/Projects";
import { getProjects } from "@/shared/api/services/projects";
import { getTechnologies } from "@/shared/api/services/technologies";

export default async function Projects() {
  const [projects, technologies] = await Promise.all([
    getProjects(),
    getTechnologies(),
  ]);

  return <ProjectsSection projects={projects} technologies={technologies} />;
}
