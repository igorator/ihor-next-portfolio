import { NextResponse } from "next/server";
import employmentData from "@/server/data/employment.json";

export async function GET() {
  try {
    return NextResponse.json(employmentData);
  } catch (error) {
    console.error("Error loading employment data:", error);
    return NextResponse.json(
      { error: "Failed to load employment data" },
      { status: 500 },
    );
  }
}
