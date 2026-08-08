// Shared shape of a validation report. Imported by both the API route
// (which asks Claude to produce it) and the report UI components (which render it).

export type Verdict = "Go" | "Caution" | "No-Go";

export interface SubFactor {
  /** e.g. "Market size", "Demand", "Competition", "Moat", "Business model", "Risk" */
  name: string;
  /** 0-100 */
  score: number;
  /** one-line justification */
  note: string;
}

export interface Competitor {
  name: string;
  /** short positioning statement */
  positioning: string;
  /** e.g. "$12M Series A", "Bootstrapped", "Unknown" */
  funding: string;
  /** e.g. "$29/mo", "Freemium", "Enterprise" */
  pricing: string;
  /** the gap or weakness a new entrant could exploit */
  weakness: string;
  /** plausible source string, e.g. "Crunchbase" */
  source: string;
}

export interface MarketSizing {
  /** label like "$4.2B" */
  value: string;
  /** one-line methodology note */
  methodology: string;
}

export interface DemandSignal {
  /** where the signal comes from, e.g. "Reddit r/startups" */
  channel: string;
  /** what was observed */
  signal: string;
  /** "strong" | "moderate" | "weak" */
  strength: "strong" | "moderate" | "weak";
}

export interface Risk {
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
}

export interface Pivot {
  title: string;
  detail: string;
  /** estimated score lift, e.g. "+8" */
  scoreLift: string;
}

export interface ValidationReport {
  /** the idea as restated by the model */
  ideaSummary: string;
  /** 0-100 */
  viabilityScore: number;
  verdict: Verdict;
  /** short rationale for the verdict */
  verdictRationale: string;
  subFactors: SubFactor[];
  competitors: Competitor[];
  market: {
    tam: MarketSizing;
    sam: MarketSizing;
    som: MarketSizing;
  };
  demandSignals: DemandSignal[];
  risks: Risk[];
  pivots: Pivot[];
}
