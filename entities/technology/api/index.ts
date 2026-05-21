import { cache } from "react";
import technologiesData from "@/entities/technology/data/technologies.json";
import type { Technology } from "@/entities/technology/types";

const technologies = technologiesData as Technology[];

function fetchTechnologies(): Technology[] {
  return technologies.toSorted((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.priority - b.priority;
  });
}

export const getTechnologies = cache(fetchTechnologies);
