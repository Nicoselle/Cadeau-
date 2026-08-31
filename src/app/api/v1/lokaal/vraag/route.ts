import { NextResponse } from "next/server";
import { listDemand } from "@/lib/local-registry";
import { getPlaceBySlug, resolvePlace } from "@/lib/local-places";

export const dynamic = "force-dynamic";

export function GET() {
  const vraag = listDemand().map((row) => {
    const place = getPlaceBySlug(row.slug) ?? resolvePlace(row.slug);
    return {
      slug: row.slug,
      name: place?.name ?? row.slug,
      country: place?.country ?? "BE",
      count: row.count,
    };
  });

  return NextResponse.json({
    meta: { status: "ok", endpoint: "/api/v1/lokaal/vraag" },
    data: vraag,
  });
}
