import { NextResponse } from "next/server";
import { getMarketBoard } from "@/data/markets";

export const dynamic = "force-static";

export function GET() {
  const board = getMarketBoard();
  return NextResponse.json(
    {
      meta: {
        status: "ok",
        last_updated: board.asOf,
        endpoint_version: "v1",
        endpoint: "/api/v1/markten",
      },
      data: board,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
