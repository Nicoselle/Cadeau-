import { describe, expect, it } from "vitest";
import {
  commitTrace,
  ledgerStats,
  parseStoredLedger,
  recordOutcome,
} from "@/lib/keuze";
import { evaluateDecision } from "@/lib/keuze";
import { getDecision } from "@/data/keuze/catalog";
import { seedTraces } from "@/data/keuze/traces";

describe("ledger", () => {
  it("legt een override vast zonder de originele output te wissen", () => {
    const definition = getDecision("kredietlimiet-mkb");
    if (!definition) throw new Error("missing decision");
    const { trace } = evaluateDecision(definition, definition.sampleInputs);
    const committed = commitTrace(trace, "human-override", "Kredietcomité", "cap op 40k");
    expect(committed.status).toBe("overridden");
    expect(committed.outputs.limiet_eur).toBe(75000);
    expect(committed.note).toBe("cap op 40k");
  });

  it("sluit de lus met een outcome", () => {
    const closed = recordOutcome(seedTraces[0], "herbevoorraden", "herbevoorraden");
    expect(closed.status).toBe("outcome-recorded");
    expect(closed.outcome?.matched).toBe(true);
  });

  it("negeert corrupte storage", () => {
    expect(parseStoredLedger("niet-json")).toEqual([]);
    expect(parseStoredLedger('{"no":"array"}')).toEqual([]);
  });

  it("berekent hit-rate over seed traces", () => {
    const stats = ledgerStats(seedTraces);
    expect(stats.total).toBe(3);
    expect(stats.withOutcome).toBe(2);
    expect(stats.hitRate).toBe(1);
  });
});
