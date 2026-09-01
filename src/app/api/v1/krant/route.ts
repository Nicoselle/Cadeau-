import { NextResponse } from "next/server";
import { serializeEdition } from "@/lib/krant-api";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(serializeEdition(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
