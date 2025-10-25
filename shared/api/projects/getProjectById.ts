import type { Locale } from "next-intl";

export const getProjectBySlug = async (slug: string, locale: Locale) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}?locale=${locale}`,
  );
  if (!res.ok) throw new Error("Project not found");
  return res.json();
};
