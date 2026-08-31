import { describe, expect, it } from "vitest";
import {
  classifyType,
  definedCentersFromGates,
  longitudeToGate,
  motorConnectedToThroat,
} from "@/lib/engines/humandesign-data";
import { eclipticLongitude } from "@/lib/engines/humandesign";
import { Body } from "astronomy-engine";

describe("Human Design mechanics", () => {
  it("places 2° Aquarius on Gate 41 line 1", () => {
    expect(longitudeToGate(302)).toEqual({ gate: 41, line: 1 });
  });

  it("wraps the wheel just before the HD offset", () => {
    expect(longitudeToGate(301.9).gate).toBe(60);
  });

  it("defines a center only when a full channel is present", () => {
    const incomplete = definedCentersFromGates(new Set([1]));
    expect(incomplete.centers).toEqual([]);
    const complete = definedCentersFromGates(new Set([1, 8]));
    expect(complete.channels).toContain("1-8");
    expect(complete.centers).toEqual(expect.arrayContaining(["g", "throat"]));
  });

  it("classifies sacral + motor-to-throat as express builder", () => {
    const gates = new Set([20, 34]);
    const { centers, channels } = definedCentersFromGates(gates);
    expect(motorConnectedToThroat(channels)).toBe(true);
    expect(classifyType(centers, channels).careerType).toBe("express-builder");
  });

  it("classifies no sacral and no motor-to-throat as advisor", () => {
    const gates = new Set([17, 62]);
    const { centers, channels } = definedCentersFromGates(gates);
    expect(classifyType(centers, channels)).toEqual({
      careerType: "advisor",
      authority: "mental",
    });
  });

  it("classifies an empty graph as evaluator", () => {
    expect(classifyType([], []).careerType).toBe("evaluator");
  });

  it("computes a plausible June solstice sun longitude", () => {
    const lon = eclipticLongitude(Body.Sun, new Date("2026-06-21T08:00:00Z"));
    expect(lon).toBeGreaterThan(85);
    expect(lon).toBeLessThan(95);
  });
});
