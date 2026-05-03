import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import projectBase from "@/entities/project/data/project_base.json";
import { siteConfig } from "@/shared/config/site";

type StaticRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/employment", changeFrequency: "monthly", priority: 0.7 },
];

const projectEntries = (
  projectBase as Array<{ slug: string; date?: string }>
).map((project) => ({
  slug: project.slug,
  lastModified: project.date ? new Date(`${project.date}-01`) : undefined,
}));

const localePath = (locale: string, path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
};

function alternatesForPath(path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((l) => [
        l,
        new URL(localePath(l, path), siteConfig.url).toString(),
      ]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    urls.push({
      url: new URL(
        localePath(routing.defaultLocale, route.path),
        siteConfig.url,
      ).toString(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: alternatesForPath(route.path),
    });
  }

  for (const project of projectEntries) {
    const projectPath = `/projects/${project.slug}`;
    urls.push({
      url: new URL(
        localePath(routing.defaultLocale, projectPath),
        siteConfig.url,
      ).toString(),
      lastModified: project.lastModified ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: alternatesForPath(projectPath),
    });
  }

  return urls;
}
