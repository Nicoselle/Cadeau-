import { describe, expect, it } from "vitest";
import { evaluateDecision } from "@/lib/keuze";
import { getDecision } from "@/data/keuze/catalog";

describe("evaluateDecision", () => {
  it("herbevoorraadt bij hoge schaarste en neutrale prijs", () => {
    const definition = getDecision("noodvoedsel-herbevoorrading");
    if (!definition) throw new Error("missing decision");
    const { trace, errors } = evaluateDecision(definition, definition.sampleInputs, {
      now: "2026-08-31T10:00:00.000Z",
      id: "trc-test-stock",
    });
    expect(errors).toEqual([]);
    expect(trace.outputs.schaarsterisico).toBe("hoog");
    expect(trace.outputs.prijsdruk).toBe("neutraal");
    expect(trace.outputs.actie).toBe("herbevoorraden");
    expect(trace.firedRules.some((rule) => rule.ruleId === "a1")).toBe(true);
    expect(trace.requiresReview).toBe(false);
  });

  it("escaleert kredietlimieten vanaf 50.000", () => {
    const definition = getDecision("kredietlimiet-mkb");
    if (!definition) throw new Error("missing decision");
    const { trace } = evaluateDecision(definition, definition.sampleInputs);
    expect(trace.outputs.kredietwaardigheid).toBe("A");
    expect(trace.outputs.limiet_eur).toBe(75000);
    expect(trace.requiresReview).toBe(true);
    expect(trace.status).toBe("proposed");
  });

  it("weigeren bij 90+ dagen achterstand, ongeacht omzet", () => {
    const definition = getDecision("kredietlimiet-mkb");
    if (!definition) throw new Error("missing decision");
    const { trace } = evaluateDecision(definition, {
      ...definition.sampleInputs,
      achterstand_dagen: 120,
    });
    expect(trace.outputs.kredietwaardigheid).toBe("weigeren");
    expect(trace.outputs.limiet_eur).toBe(0);
  });

  it("indexeert wanneer de afgevlakte index de spil haalt", () => {
    const definition = getDecision("spilindex-loonindexering");
    if (!definition) throw new Error("missing decision");
    const { trace } = evaluateDecision(definition, definition.sampleInputs);
    expect(trace.outputs.spil_overschreden).toBe(true);
    expect(trace.outputs.grondslag).toBe("cao");
    expect(trace.outputs.advies).toBe("indexeren");
    expect(trace.requiresReview).toBe(true);
  });

  it("levert near-misses en counterfactuals", () => {
    const definition = getDecision("noodvoedsel-herbevoorrading");
    if (!definition) throw new Error("missing decision");
    const { trace } = evaluateDecision(definition, definition.sampleInputs);
    expect(trace.nearMisses.length).toBeGreaterThan(0);
    expect(trace.counterfactuals.length).toBeGreaterThan(0);
    expect(trace.causal.drivers.length).toBeGreaterThan(0);
  });
});
