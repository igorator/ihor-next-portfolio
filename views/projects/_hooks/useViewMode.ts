"use client";

import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";

export const useViewMode = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const viewMode = (searchParams.get("view") as "grid" | "list") ?? "grid";

  const toggleViewMode = () => {
    const next = viewMode === "grid" ? "list" : "grid";
    const params = new URLSearchParams(searchParams.toString());
    if (next === "grid") params.delete("view");
    else params.set("view", "list");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return { viewMode, toggleViewMode };
};
