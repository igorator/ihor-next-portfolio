import { NextResponse as Response } from "next/server";
import technologiesData from "@/server/data/technologies/technologies.json";

export async function GET(_request: Request) {
  return Response.json(technologiesData);
}
