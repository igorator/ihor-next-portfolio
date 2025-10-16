import { ProjectsSection } from "@/components/sections/Projects/Projects";
import { getProjects, getTechnologies } from "@/lib/data";

export default async function Projects() {
  const [projects, technologies] = await Promise.all([
    getProjects(),
    getTechnologies(),
  ]);

  return <ProjectsSection projects={projects} technologies={technologies} />;
}
