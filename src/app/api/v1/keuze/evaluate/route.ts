import { NextResponse } from "next/server";
import { getDecision } from "@/data/keuze/catalog";
import { evaluateDecision, type FeelValue } from "@/lib/keuze";

export async function POST(request: Request) {
  let body: { decisionId?: string; inputs?: Record<string, FeelValue> };
  try {
    body = (await request.json()) as {
      decisionId?: string;
      inputs?: Record<string, FeelValue>;
    };
  } catch {
    return NextResponse.json(
      { meta: { status: "error" }, error: "Ongeldige JSON-body" },
      { status: 400 },
    );
  }

  const decision = body.decisionId ? getDecision(body.decisionId) : undefined;
  if (!decision) {
    return NextResponse.json(
      { meta: { status: "error" }, error: "Beslissing niet gevonden" },
      { status: 404 },
    );
  }

  const result = evaluateDecision(decision, body.inputs ?? {});
  return NextResponse.json(
    {
      meta: {
        status: result.errors.length === 0 ? "ok" : "partial",
        endpoint: "/api/v1/keuze/evaluate",
        endpoint_version: "v1",
      },
      errors: result.errors,
      data: result.trace,
    },
    { headers: { "Access-Control-Allow-Origin": "*" } },
  );
}
