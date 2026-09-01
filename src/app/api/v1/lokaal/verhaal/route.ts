import { NextResponse } from "next/server";
import { submitStory } from "@/lib/local-registry";
import type { StoryIntake } from "@/types/local";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | (StoryIntake & { extraDemand?: string[] })
    | null;

  if (!body) {
    return NextResponse.json(
      { meta: { status: "error" }, error: "Geen geldige inzending." },
      { status: 400 },
    );
  }

  const result = submitStory(body, body.extraDemand ?? []);
  if (!result.ok) {
    return NextResponse.json(
      { meta: { status: "error" }, error: result.error },
      { status: 400 },
    );
  }

  return NextResponse.json({
    meta: { status: "ok", endpoint: "/api/v1/lokaal/verhaal" },
    data: result.story,
  });
}
