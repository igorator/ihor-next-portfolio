import type { Locale } from "next-intl";
import { getProjectBySlug } from "@/shared/api/projects/getProjectById";
import { ProjectSection } from "@/shared/components/pages/Projects/Project/Project";

type ProjectPageProps = {
  params: { slug: string; locale: Locale };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale } = params;
  const project = await getProjectBySlug(slug, locale);

  return (
    <ProjectSection
      title={project.title}
      description={project.description}
      type={project.type}
      category={project.category}
      year={project.year}
      date={project.date}
      imageUrl={project.imageUrl}
      technologies={project.technologies}
      githubUrl={project.githubUrl}
      demoUrl={project.demoUrl}
    />
  );
}
