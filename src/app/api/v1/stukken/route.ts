import { NextResponse } from "next/server";
import { articles } from "@/data/articles";
import { EDITION } from "@/data/edition";
import { serializeArticle } from "@/lib/krant-api";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      meta: {
        status: "ok",
        last_updated: EDITION.asOf,
        endpoint_version: "v1",
        count: articles.length,
        endpoint: "/api/v1/stukken",
      },
      data: articles.map(serializeArticle),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
