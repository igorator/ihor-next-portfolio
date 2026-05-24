import type { GithubLink, GithubUrlValue } from "../types";

export function normalizeGithubLinks(
  githubUrl: GithubUrlValue | undefined,
): GithubLink[] {
  if (!githubUrl) return [];
  const items = Array.isArray(githubUrl) ? githubUrl : [githubUrl];
  return items
    .map(
      (item): GithubLink => (typeof item === "string" ? { url: item } : item),
    )
    .filter(({ url }) => Boolean(url));
}
