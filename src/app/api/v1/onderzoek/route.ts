import { NextResponse } from "next/server";
import { NEWS_CHANNELS } from "@/data/dossiers";
import { searchAllChannels, searchChannel } from "@/lib/macro-news";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const kanaal = url.searchParams.get("kanaal");

  if (kanaal) {
    const result = await searchChannel(kanaal);
    return NextResponse.json({
      meta: {
        status: "ok",
        endpoint: "/api/v1/onderzoek",
        kanaal,
        note: "Koppen zijn titel, bron en link. Geen nabewerkte reportage.",
      },
      data: result,
    });
  }

  const result = await searchAllChannels();
  return NextResponse.json({
    meta: {
      status: "ok",
      endpoint: "/api/v1/onderzoek",
      kanalen: NEWS_CHANNELS.map((item) => item.id),
      note: "Alleen macro die de gevolgde assets raakt.",
    },
    data: result,
  });
}
