import { NextResponse } from "next/server";
import { addDemand, listDemand, releaseWaiting } from "@/lib/local-registry";
import { resolvePlace } from "@/lib/local-places";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    plaatsen?: string[];
    email?: string;
  } | null;

  const slugs = (body?.plaatsen ?? [])
    .map((value) => resolvePlace(value)?.slug)
    .filter((value): value is string => Boolean(value));

  if (slugs.length === 0) {
    return NextResponse.json(
      { meta: { status: "error" }, error: "Kies minstens één gemeente." },
      { status: 400 },
    );
  }

  addDemand(slugs);
  const released = slugs.reduce((sum, slug) => sum + releaseWaiting(slug), 0);

  return NextResponse.json({
    meta: { status: "ok", endpoint: "/api/v1/lokaal/abonneren" },
    data: {
      plaatsen: slugs,
      released,
      vraag: listDemand(),
    },
  });
}
