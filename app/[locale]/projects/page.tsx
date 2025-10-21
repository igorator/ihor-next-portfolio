import type { Locale } from "next-intl";
import { getProjects } from "@/server/services/projects.service";
import { getTechnologies } from "@/server/services/technologies.service";
import { ProjectsSection } from "@/shared/components/pages/Projects/Projects";
import { mergeProjectsWithTechnologies } from "@/shared/lib/utils/data-utils";

export default async function Projects({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const [projects, technologies] = await Promise.all([
    getProjects(locale),
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
