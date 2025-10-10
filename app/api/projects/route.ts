import { NextResponse } from "next/server";
import projectsData from "@/server/data/projects/projects.json";
import technologiesData from "@/server/data/technologies.json";
import { mergeProjectsWithTechnologies } from "@/shared/lib/data-utils";

export async function GET() {
  try {
    const projects = projectsData.projects;
    const technologies = technologiesData.technologies;

    const projectsWithTechnologies = mergeProjectsWithTechnologies(
      projects,
      technologies,
    );

    return NextResponse.json(projectsWithTechnologies);
  } catch (error) {
    console.error("Error loading projects:", error);
    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 },
    );
  }
}
