import { NextResponse } from "next/server";
import technologiesData from "@/server/data/technologies.json";

export async function GET() {
  try {
    return NextResponse.json(technologiesData.technologies);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to load technologies" },
      { status: 500 },
    );
  }
}
