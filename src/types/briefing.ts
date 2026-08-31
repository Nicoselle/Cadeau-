export type Element = "wood" | "fire" | "earth" | "metal" | "water";

export type CohortPosition = "oldest" | "middle" | "youngest";

export type CareerType =
  | "initiator"
  | "classic-builder"
  | "express-builder"
  | "advisor"
  | "evaluator";

export type Authority =
  | "emotional"
  | "sacral"
  | "splenic"
  | "ego"
  | "self-projected"
  | "mental"
  | "lunar";

export type EnvironmentStyle = "solo" | "partnership" | "small-group" | "large-group";

export type CountryCode =
  | "BE"
  | "NL"
  | "DE"
  | "FR"
  | "UK"
  | "US"
  | "CN"
  | "OTHER";

export interface IntakeInput {
  fullName: string;
  birthDate: string;
  birthTime: string;
  cityId: string;
  country: CountryCode;
  companyFoundedOn?: string;
}

export interface RaeResult {
  country: CountryCode;
  cutoffMonth: number;
  cutoffLabel: string;
  birthMonth: number;
  cohortPosition: CohortPosition;
  relativeAgeMonths: number;
  riskAppetite: number;
  leadershipBias: number;
  fundingBias: "aggressive-debt" | "balanced" | "conservative-margin";
}

export interface Pillar {
  stem: string;
  stemLabel: string;
  branch: string;
  branchLabel: string;
  element: Element;
}

export interface BaziResult {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
  dayMaster: Element;
  counts: Record<Element, number>;
  dominant: Element;
  missing: Element[];
  sectors: string[];
}

export interface NumerologyResult {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  personalYear: number;
  companyYear?: number;
}

export interface GateActivation {
  gate: number;
  line: number;
  body: string;
  layer: "personality" | "design";
}

export interface DesignResult {
  careerType: CareerType;
  authority: Authority;
  profile: string;
  environment: EnvironmentStyle;
  definedCenters: string[];
  channels: string[];
  gates: number[];
  activations: GateActivation[];
  skills: string[];
  missingSkills: string[];
  approximationNotes: string[];
}

export interface Paradox {
  title: string;
  explanation: string;
}

export interface BriefingExample {
  title: string;
  story: string;
}

export interface BriefingStep {
  title: string;
  detail: string;
  window: string;
}

export interface Briefing {
  headline: string;
  lede: string;
  narrative: string;
  companyArchetype: string;
  sector: string;
  structure: string;
  role: string;
  riskStrategy: string;
  decisionProtocol: string;
  timing: string;
  examples: BriefingExample[];
  steps: BriefingStep[];
  avoid: string[];
  hiringMandate: string[];
  actionPlan: string[];
  paradoxes: Paradox[];
  confidence: number;
  evidence: {
    rae: string;
    bazi: string;
    numerology: string;
    design: string;
  };
}

export interface BriefingResponse {
  input: IntakeInput;
  location: {
    city: string;
    country: CountryCode;
    latitude: number;
    longitude: number;
  };
  layers: {
    rae: RaeResult;
    bazi: BaziResult;
    numerology: NumerologyResult;
    design: DesignResult;
  };
  briefing: Briefing;
  generatedAt: string;
}
