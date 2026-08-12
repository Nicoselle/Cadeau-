import { NextResponse } from "next/server";
import { products, DATA_LAST_UPDATED } from "@/data/products";
import { apiMeta, serializeProduct } from "@/lib/api";

export const dynamic = "force-static";

export function GET() {
  const body = {
    meta: apiMeta(DATA_LAST_UPDATED, {
      count: products.length,
      endpoint: "/api/v1/products",
    }),
    data: products.map(serializeProduct),
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
