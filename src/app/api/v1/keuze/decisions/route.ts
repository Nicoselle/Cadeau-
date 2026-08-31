import { NextResponse } from "next/server";
import { decisions, KEUZE_UPDATED } from "@/data/keuze/catalog";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      meta: {
        status: "ok",
        last_updated: KEUZE_UPDATED,
        endpoint: "/api/v1/keuze/decisions",
        endpoint_version: "v1",
        count: decisions.length,
      },
      data: decisions.map((decision) => ({
        id: decision.id,
        name: decision.name,
        domain: decision.domain,
        mode: decision.mode,
        owner: decision.owner,
        version: decision.version,
        summary: decision.summary,
      })),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
