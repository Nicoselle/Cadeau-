import { describe, expect, it } from "vitest";
import { evaluateDecision } from "@/lib/keuze";
import { decisions } from "@/data/keuze/catalog";

describe("beslissingscatalogus", () => {
  it("heeft unieke ids en verwijst alleen naar bestaande tabellen", () => {
    const ids = decisions.map((decision) => decision.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const decision of decisions) {
      const tableIds = new Set(decision.tables.map((table) => table.id));
      for (const node of decision.nodes) {
        if (node.tableId) {
          expect(tableIds.has(node.tableId)).toBe(true);
        }
      }
    }
  });

  it("evalueert elk voorbeeldscenario zonder engine-fout", () => {
    for (const decision of decisions) {
      const { errors, trace } = evaluateDecision(
        decision,
        decision.sampleInputs,
      );
      expect(errors, decision.id).toEqual([]);
      for (const output of decision.outputs) {
        expect(trace.outputs[output.id], `${decision.id}.${output.id}`).not.toBe(
          null,
        );
      }
    }
  });
});
