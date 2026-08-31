import { NextResponse } from "next/server";
import { SMC_UNIVERSE } from "@/data/smc-universe";
import { readSmcBoard, readSmcFor, serializeSmcCard } from "@/lib/smc-board";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (id) {
    const card = await readSmcFor(id);
    if (!card) {
      return NextResponse.json(
        { meta: { status: "error", error: "geen SMC-lens voor deze naam" } },
        { status: 404 },
      );
    }
    return NextResponse.json({
      meta: {
        status: "ok",
        endpoint: "/api/v1/smc",
        note: "Raming. Smart Money Concept als herleidbare lens, geen advies.",
      },
      data: serializeSmcCard(card),
    });
  }

  const board = await readSmcBoard([...SMC_UNIVERSE]);
  return NextResponse.json({
    meta: {
      status: "ok",
      endpoint: "/api/v1/smc",
      note: "Raming. Smart Money Concept als herleidbare lens, geen advies.",
    },
    data: board.map(serializeSmcCard),
  });
}
