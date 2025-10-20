import { ProjectsSection } from "@/shared/components/pages/Projects/Projects";
import { getProjects } from "@/server/services/projects.service";
import { getTechnologies } from "@/server/services/technologies.service";
import { mergeProjectsWithTechnologies } from "@/shared/lib/utils/data-utils";
import type { Locale } from "next-intl";

export default async function Projects({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const [projects, technologies] = await Promise.all([
    getProjects(lang),
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
