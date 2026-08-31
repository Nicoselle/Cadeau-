import type { CountryCode, RaeResult } from "@/types/briefing";

interface Cutoff {
  month: number;
  label: string;
}

const CUTOFFS: Record<CountryCode, Cutoff> = {
  BE: { month: 1, label: "1 januari (kalenderjaar-cohort)" },
  NL: { month: 10, label: "1 oktober (klassieke Nederlandse peildatum)" },
  DE: { month: 7, label: "1 juli (dominante Duitse deelstaatpeildatum)" },
  FR: { month: 1, label: "1 januari (kalenderjaar-cohort)" },
  UK: { month: 9, label: "1 september" },
  US: { month: 9, label: "1 september" },
  CN: { month: 9, label: "1 september" },
  OTHER: { month: 9, label: "1 september (internationale default)" },
};

export function monthsSinceCutoff(birthMonth: number, cutoffMonth: number): number {
  return (birthMonth - cutoffMonth + 12) % 12;
}

export function classifyCohort(relativeAgeMonths: number): RaeResult["cohortPosition"] {
  if (relativeAgeMonths <= 2) return "oldest";
  if (relativeAgeMonths >= 9) return "youngest";
  return "middle";
}

export function computeRae(birthDate: string, country: CountryCode): RaeResult {
  const birthMonth = Number(birthDate.slice(5, 7));
  const cutoff = CUTOFFS[country];
  const relativeAgeMonths = monthsSinceCutoff(birthMonth, cutoff.month);
  const cohortPosition = classifyCohort(relativeAgeMonths);

  const riskAppetite =
    cohortPosition === "oldest" ? 78 : cohortPosition === "middle" ? 52 : 28;
  const leadershipBias =
    cohortPosition === "oldest" ? 72 : cohortPosition === "middle" ? 50 : 34;

  return {
    country,
    cutoffMonth: cutoff.month,
    cutoffLabel: cutoff.label,
    birthMonth,
    cohortPosition,
    relativeAgeMonths,
    riskAppetite,
    leadershipBias,
    fundingBias:
      cohortPosition === "oldest"
        ? "aggressive-debt"
        : cohortPosition === "youngest"
          ? "conservative-margin"
          : "balanced",
  };
}
