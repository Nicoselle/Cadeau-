import { describe, expect, it } from "vitest";
import { synthesize } from "@/lib/engines/synthesis";
import { generateBriefing, parseIntake } from "@/lib/engines";
import type { BaziResult, DesignResult, NumerologyResult, RaeResult } from "@/types/briefing";

const raeYoung: RaeResult = {
  country: "US",
  cutoffMonth: 9,
  cutoffLabel: "1 september",
  birthMonth: 6,
  cohortPosition: "youngest",
  relativeAgeMonths: 9,
  riskAppetite: 28,
  leadershipBias: 34,
  fundingBias: "conservative-margin",
};

const baziWood: BaziResult = {
  year: { stem: "Jia", stemLabel: "Yang Hout", branch: "Zi", branchLabel: "Rat", element: "wood" },
  month: { stem: "Yi", stemLabel: "Yin Hout", branch: "Si", branchLabel: "Slang", element: "wood" },
  day: { stem: "Jia", stemLabel: "Yang Hout", branch: "Wu", branchLabel: "Paard", element: "wood" },
  hour: { stem: "Yi", stemLabel: "Yin Hout", branch: "Wei", branchLabel: "Geit", element: "wood" },
  dayMaster: "wood",
  counts: { wood: 8, fire: 1, earth: 1, metal: 0, water: 0 },
  dominant: "wood",
  missing: ["metal"],
  sectors: ["educatieve technologie", "management consultancy", "human resources", "leiderschapstraining"],
};

const numerology84: NumerologyResult = {
  lifePath: 8,
  expression: 4,
  soulUrge: 2,
  personality: 6,
  personalYear: 1,
};

const advisor: DesignResult = {
  careerType: "advisor",
  authority: "emotional",
  profile: "1/3",
  environment: "small-group",
  definedCenters: ["ajna", "throat"],
  channels: ["17-62"],
  gates: [2, 8, 17, 62],
  activations: [],
  skills: ["Visie en richting", "Public relations"],
  missingSkills: ["Implementatie"],
  approximationNotes: [],
};

describe("synthesis", () => {
  it("converges the research-report matrix into a boutique consultancy", () => {
    const briefing = synthesize(raeYoung, baziWood, numerology84, advisor);
    expect(briefing.headline.toLowerCase()).toContain("consultancy");
    expect(briefing.riskStrategy.toLowerCase()).toMatch(/berekend|marges|durfkapitaal/);
    expect(briefing.hiringMandate.join(" ")).toMatch(/implementatie/i);
    expect(briefing.decisionProtocol.toLowerCase()).toContain("nacht");
    expect(briefing.structure).toMatch(/drie tot vijf/i);
    expect(briefing.confidence).toBeGreaterThanOrEqual(48);
    expect(briefing.narrative.length).toBeGreaterThan(280);
    expect(briefing.examples).toHaveLength(3);
    expect(briefing.steps.length).toBeGreaterThanOrEqual(6);
    expect(briefing.avoid.length).toBeGreaterThanOrEqual(3);
  });

  it("surfaces the solo-command paradox for life path 1 + oldest", () => {
    const briefing = synthesize(
      { ...raeYoung, cohortPosition: "oldest", fundingBias: "aggressive-debt" },
      baziWood,
      { ...numerology84, lifePath: 1 },
      advisor,
    );
    expect(briefing.paradoxes.some((item) => item.title.toLowerCase().includes("solo"))).toBe(true);
  });

  it("rejects incomplete intake", () => {
    expect(() => parseIntake({})).toThrow(/naam/i);
  });

  it("generates a full briefing for a Flemish founder", () => {
    const result = generateBriefing({
      fullName: "Pieter Vandenberghe",
      birthDate: "1988-06-20",
      birthTime: "08:15",
      cityId: "antwerpen",
      country: "BE",
    });
    expect(result.briefing.headline.length).toBeGreaterThan(10);
    expect(result.briefing.lede).toMatch(/Pieter/);
    expect(result.briefing.steps[0]?.detail.length).toBeGreaterThan(40);
    expect(result.layers.design.careerType).toBeTruthy();
    expect(result.layers.bazi.dominant).toBeTruthy();
    expect(result.location.city).toBe("Antwerpen");
  });
});
