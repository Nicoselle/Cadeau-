import { NextResponse } from "next/server";
import { generateBriefing, parseIntake } from "@/lib/engines";

export async function GET() {
  return NextResponse.json({
    meta: { status: "ok", endpoint: "/api/v1/briefing" },
    usage: "POST JSON { fullName, birthDate, birthTime, cityId, country, companyFoundedOn? }",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = parseIntake(body);
    const result = generateBriefing(input);
    return NextResponse.json({ meta: { status: "ok" }, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout.";
    return NextResponse.json({ meta: { status: "error" }, error: message }, { status: 400 });
  }
}
