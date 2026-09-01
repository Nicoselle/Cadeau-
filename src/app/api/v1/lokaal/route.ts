import { NextResponse } from "next/server";
import { buildEdition } from "@/lib/local-registry";
import { resolvePlace } from "@/lib/local-places";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("plaatsen") ?? url.searchParams.get("plaats") ?? "";
  const slugs = raw
    .split(",")
    .map((value) => resolvePlace(value.trim())?.slug)
    .filter((value): value is string => Boolean(value));

  if (slugs.length === 0) {
    return NextResponse.json(
      {
        meta: { status: "ok", endpoint: "/api/v1/lokaal", note: "geen vraag" },
        data: [],
      },
    );
  }

  const editions = [];
  for (const slug of slugs) {
    const edition = await buildEdition(slug, slugs);
    if (edition) editions.push(edition);
  }

  return NextResponse.json({
    meta: {
      status: "ok",
      endpoint: "/api/v1/lokaal",
      count: editions.length,
    },
    data: editions,
  });
}
