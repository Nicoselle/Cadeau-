import { NextResponse } from "next/server";
import { serializeArchiveIndex } from "@/lib/krant-api";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(serializeArchiveIndex(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
