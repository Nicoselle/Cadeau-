import { NextResponse } from "next/server";
import { EDITIONS } from "@/data/edition";
import { serializeArchivedEdition } from "@/lib/krant-api";

export const dynamic = "force-static";

export function generateStaticParams() {
  return EDITIONS.map((edition) => ({ nummer: String(edition.number) }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ nummer: string }> },
) {
  const { nummer } = await params;
  const body = serializeArchivedEdition(Number(nummer));
  if (!body) {
    return NextResponse.json(
      { meta: { status: "not_found" }, error: "editie niet gevonden" },
      { status: 404 },
    );
  }
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
