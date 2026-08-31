import { NextResponse } from "next/server";
import { serializeBriefing } from "@/lib/briefing";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(serializeBriefing(), {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
