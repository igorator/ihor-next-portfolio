import { cache } from "react";

const OWNER = "igorator";
const REPO = "portfolio-assets";
const DEFAULT_REF = "main";

export const CDN_ROOT = `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}`;
const GITHUB_COMMITS_API = `https://api.github.com/repos/${OWNER}/${REPO}/commits/${DEFAULT_REF}`;

export type JsDelivrNode = {
  name: string;
  type: "file" | "directory";
  files?: JsDelivrNode[];
};

type JsDelivrTree = JsDelivrNode & { version?: string; hash?: string };

export const fetchTree = cache(async (ref: string): Promise<JsDelivrTree> => {
  const dataUrl = `https://data.jsdelivr.com/v1/package/gh/${OWNER}/${REPO}@${ref}`;
  const res = await fetch(dataUrl, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to load jsDelivr package tree");
  return res.json();
});

export const resolveRef = cache(async (): Promise<string> => {
  const headers: Record<string, string> = {};
  const token =
    process.env.GITHUB_TOKEN ??
    process.env.GH_TOKEN ??
    process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(GITHUB_COMMITS_API, {
      headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Failed to resolve ref");
    const data = await res.json();
    return typeof data?.sha === "string" ? data.sha : DEFAULT_REF;
  } catch {
    return DEFAULT_REF;
  }
});

export function findDir(
  root: JsDelivrNode,
  path: string[],
): JsDelivrNode | null {
  let node: JsDelivrNode | undefined = root;
  for (const seg of path) {
    node = node?.files?.find((n) => n.type === "directory" && n.name === seg);
    if (!node) return null;
  }
  return node ?? null;
}

export function buildCdnUrl(
  ref: string,
  slug: string,
  filename: string,
): string {
  return `${CDN_ROOT}@${ref}/Projects/${slug}/${filename}`;
}
