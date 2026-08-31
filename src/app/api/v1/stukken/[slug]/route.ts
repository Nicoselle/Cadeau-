import { NextResponse } from "next/server";
import { articles } from "@/data/articles";
import { EDITION } from "@/data/edition";
import { serializeArticle } from "@/lib/krant-api";
import { getArticle } from "@/lib/newspaper";

export const dynamic = "force-static";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return NextResponse.json(
      {
        meta: { status: "not_found", endpoint: `/api/v1/stukken/${slug}` },
        data: null,
      },
      { status: 404, headers: { "Access-Control-Allow-Origin": "*" } },
    );
  }

  return NextResponse.json(
    {
      meta: {
        status: "ok",
        last_updated: EDITION.asOf,
        endpoint_version: "v1",
        endpoint: `/api/v1/stukken/${article.slug}`,
      },
      data: serializeArticle(article),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
