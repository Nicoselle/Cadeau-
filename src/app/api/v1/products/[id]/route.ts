import { NextResponse } from "next/server";
import { products, getProductById } from "@/data/products";
import { apiMeta, serializeProduct } from "@/lib/api";

export const dynamic = "force-static";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json(
      {
        meta: {
          status: "not_found",
          endpoint_version: "v1",
          endpoint: `/api/v1/products/${id}`,
        },
        data: null,
      },
      {
        status: 404,
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    );
  }

  const body = {
    meta: apiMeta(product.lastUpdated, {
      endpoint: `/api/v1/products/${product.id}`,
    }),
    data: serializeProduct(product),
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
