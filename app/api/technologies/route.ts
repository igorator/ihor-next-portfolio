import { NextResponse as Response } from "next/server";
import technologiesData from "@/server/data/technologies/technologies.json";

export async function GET() {
  const sorted = [...technologiesData].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.priority - b.priority;
  });

  return Response.json(sorted);
}
