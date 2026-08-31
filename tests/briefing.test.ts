import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { EDITION } from "@/data/edition";
import { getMarketBoard } from "@/data/markets";
import {
  buildBriefing,
  DESK_CLOCK,
  latestDecision,
  parseDecision,
  serializeBriefing,
} from "@/lib/briefing";

describe("grokbot-briefing", () => {
  it("keeps the Brussels desk clock at 13 / 14 / 15", () => {
    expect(DESK_CLOCK).toEqual({
      timezone: "Europe/Brussels",
      briefingHour: 13,
      decisionHour: 14,
      editionHour: 15,
    });
  });

  it("recommends the same floor while no tile is newer than the edition", () => {
    const briefing = buildBriefing();
    expect(briefing.edition.number).toBe(EDITION.number);
    expect(briefing.tiles.length).toBe(getMarketBoard().tiles.length);
    expect(briefing.newer).toHaveLength(0);
    expect(briefing.recommendation).toBe("zelfde_vloer");
    expect(briefing.questions).toHaveLength(5);
    expect(briefing.decision).toBeNull();
  });

  it("skips the example file as a real decision", () => {
    expect(latestDecision()).toBeNull();
    const voorbeeld = JSON.parse(
      readFileSync(
        path.join(process.cwd(), "redactie", "beslissingen", "voorbeeld.json"),
        "utf8",
      ),
    );
    const parsed = parseDecision(voorbeeld);
    expect(parsed?.publish).toBe(false);
    expect(parseDecision({ date: "2026-09-01" })).toBeNull();
  });

  it("serializes a briefing the bot can fetch", () => {
    const payload = serializeBriefing();
    expect(payload.meta.endpoint).toBe("/api/v1/briefing");
    expect(payload.clock.decisionHour).toBe(14);
    expect(payload.rule).toMatch(/publiceert niet/i);
    expect(payload.tiles.some((tile) => tile.id === "brent")).toBe(true);
  });

  it("keeps the grokbot runbook next to the floor", () => {
    const file = path.join(process.cwd(), "redactie", "grokbot.md");
    expect(existsSync(file)).toBe(true);
    const text = readFileSync(file, "utf8");
    expect(text).toMatch(/14:00/);
    expect(text).toMatch(/publiceert niet/);
    expect(text).toMatch(/voorbeeld\.json/);
  });
});
