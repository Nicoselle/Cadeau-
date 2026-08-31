import { NextResponse } from "next/server";
import { fetchWatchBoard, serializeWatchBoard } from "@/lib/quotes";

export const dynamic = "force-dynamic";

export async function GET() {
  const board = await fetchWatchBoard();
  return NextResponse.json(
    {
      meta: {
        status: "ok",
        last_updated: board.asOf,
        endpoint_version: "v1",
        endpoint: "/api/v1/volgen",
        disclaimer:
          "Laatste print van de publieke tape. Educatief. SafeCapital is geen erkende beleggingsadviseur.",
      },
      data: serializeWatchBoard(board),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
