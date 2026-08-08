import { NextResponse } from "next/server";
import { getAnthropic, MODEL } from "@/lib/anthropic";
import { REPORT_TOOL, SYSTEM_PROMPT } from "@/lib/prompt";
import type { ValidationReport } from "@/lib/report";

export const runtime = "nodejs";
// Reports take ~10-20s; give the function room.
export const maxDuration = 60;

const MAX_IDEA_LENGTH = 600;

export async function POST(request: Request) {
  // 1. Parse and validate input at the boundary — fail loudly.
  let idea: unknown;
  try {
    const body = await request.json();
    idea = body?.idea;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof idea !== "string" || idea.trim().length === 0) {
    return NextResponse.json(
      { error: "Describe your idea in a sentence or two." },
      { status: 400 },
    );
  }

  const trimmed = idea.trim();
  if (trimmed.length > MAX_IDEA_LENGTH) {
    return NextResponse.json(
      { error: `Keep it under ${MAX_IDEA_LENGTH} characters.` },
      { status: 400 },
    );
  }

  // 2. Call Claude, forcing the structured report tool.
  let anthropic;
  try {
    anthropic = getAnthropic();
  } catch {
    return NextResponse.json(
      { error: "The validation engine is not configured (missing API key)." },
      { status: 503 },
    );
  }

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 6000,
      system: SYSTEM_PROMPT,
      tools: [REPORT_TOOL],
      tool_choice: { type: "tool", name: REPORT_TOOL.name },
      messages: [
        {
          role: "user",
          content: `Validate this startup idea:\n\n"${trimmed}"`,
        },
      ],
    });

    const toolUse = response.content.find(
      (block) => block.type === "tool_use" && block.name === REPORT_TOOL.name,
    );

    if (!toolUse || toolUse.type !== "tool_use") {
      return NextResponse.json(
        { error: "The engine did not return a report. Please try again." },
        { status: 502 },
      );
    }

    const report = toolUse.input as ValidationReport;
    return NextResponse.json({ report });
  } catch (err) {
    console.error("Validation request failed:", err);
    return NextResponse.json(
      { error: "The engine hit an error. Please try again in a moment." },
      { status: 502 },
    );
  }
}
