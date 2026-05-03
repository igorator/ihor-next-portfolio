import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/entities/project/api";
import { getTechnologies } from "@/entities/technology/api";
import { ProjectsSection } from "@/views/projects/Projects";
import { AppLoading } from "@/shared/ui/AppLoading/AppLoading";
import { siteConfig } from "@/shared/config/site";
import type { LocalePageProps } from "@/shared/types/page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const title = t("title");
  const canonical =
    locale === routing.defaultLocale ? "/projects" : `/${locale}/projects`;

  return {
    title,
    description: siteConfig.pages.projects.description,
    alternates: { canonical },
    openGraph: { url: canonical, images: [{ url: siteConfig.og.image }] },
  };
}

export default async function Projects({ params }: LocalePageProps) {
  const { locale } = await params;

  const [projects, technologies] = await Promise.all([
    getProjects(locale),
    getTechnologies(),
  ]);

  return (
    <Suspense fallback={<AppLoading />}>
      <ProjectsSection projects={projects} technologies={technologies} />
    </Suspense>
  );
}
