import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import projectBase from "@/entities/project/data/project_base.json";
import { getProjectBySlug } from "@/entities/project/api";
import { ProjectSection } from "@/views/project-detail/Project";
import { siteConfig } from "@/shared/config/site";
import type { SlugPageProps } from "@/shared/types/page";

export function generateStaticParams() {
  const bases = projectBase as Array<{ slug: string }>;
  return routing.locales.flatMap((locale) =>
    bases.map((p) => ({ locale, slug: p.slug })),
  );
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return { title: "Not Found" };
  }

  const title = project.title || slug;
  const description =
    project.description || siteConfig.pages.project.fallbackDescription;
  const canonical =
    locale === routing.defaultLocale
      ? `/projects/${slug}`
      : `/${locale}/projects/${slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title,
      description,
      images: project.cover
        ? [{ url: project.cover, alt: title }]
        : [{ url: siteConfig.og.image }],
    },
    twitter: {
      title,
      description,
      images: project.cover ? [project.cover] : [siteConfig.og.image],
    },
  };
}

export default async function ProjectPage({ params }: SlugPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug, locale);

  if (!project) notFound();

  const isDefaultLocale = locale === routing.defaultLocale;
  const baseUrl = siteConfig.url;
  const projectUrl = `${baseUrl}${isDefaultLocale ? "" : `/${locale}`}/projects/${slug}`;
  const projectsUrl = `${baseUrl}${isDefaultLocale ? "" : `/${locale}`}/projects`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: projectsUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      <ProjectSection
        title={project.title}
        description={project.description}
        type={project.type}
        category={project.category}
        date={project.date}
        cover={project.cover ?? ""}
        technologies={project.technologies}
        githubUrl={project.githubUrl}
        demoUrl={project.demoUrl}
        screens={project.screens ?? []}
        video={project.video}
      />
    </>
  );
}
