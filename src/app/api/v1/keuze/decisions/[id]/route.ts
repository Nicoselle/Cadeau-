import { NextResponse } from "next/server";
import { getDecision, listDecisions, KEUZE_UPDATED } from "@/data/keuze/catalog";

export const dynamic = "force-static";

export function generateStaticParams() {
  return listDecisions().map((decision) => ({ id: decision.id }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const decision = getDecision(id);
  if (!decision) {
    return NextResponse.json(
      {
        meta: { status: "error", endpoint: "/api/v1/keuze/decisions/[id]" },
        error: "Beslissing niet gevonden",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      meta: {
        status: "ok",
        last_updated: KEUZE_UPDATED,
        endpoint: `/api/v1/keuze/decisions/${decision.id}`,
        endpoint_version: "v1",
      },
      data: decision,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
