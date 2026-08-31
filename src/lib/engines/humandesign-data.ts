export type CenterId =
  | "head"
  | "ajna"
  | "throat"
  | "g"
  | "heart"
  | "sacral"
  | "solarPlexus"
  | "spleen"
  | "root";

export const GATE_WHEEL = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3,
  27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50,
  28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60,
] as const;

export const HD_ZERO_LONGITUDE = 302;

export const CHANNELS: { gates: [number, number]; centers: [CenterId, CenterId] }[] = [
  { gates: [1, 8], centers: ["g", "throat"] },
  { gates: [2, 14], centers: ["g", "sacral"] },
  { gates: [3, 60], centers: ["sacral", "root"] },
  { gates: [4, 63], centers: ["ajna", "head"] },
  { gates: [5, 15], centers: ["sacral", "g"] },
  { gates: [6, 59], centers: ["solarPlexus", "sacral"] },
  { gates: [7, 31], centers: ["g", "throat"] },
  { gates: [9, 52], centers: ["sacral", "root"] },
  { gates: [10, 20], centers: ["g", "throat"] },
  { gates: [10, 34], centers: ["g", "sacral"] },
  { gates: [10, 57], centers: ["g", "spleen"] },
  { gates: [11, 56], centers: ["ajna", "throat"] },
  { gates: [12, 22], centers: ["throat", "solarPlexus"] },
  { gates: [13, 33], centers: ["g", "throat"] },
  { gates: [16, 48], centers: ["throat", "spleen"] },
  { gates: [17, 62], centers: ["ajna", "throat"] },
  { gates: [18, 58], centers: ["spleen", "root"] },
  { gates: [19, 49], centers: ["root", "solarPlexus"] },
  { gates: [20, 34], centers: ["throat", "sacral"] },
  { gates: [20, 57], centers: ["throat", "spleen"] },
  { gates: [21, 45], centers: ["heart", "throat"] },
  { gates: [23, 43], centers: ["throat", "ajna"] },
  { gates: [24, 61], centers: ["ajna", "head"] },
  { gates: [25, 51], centers: ["g", "heart"] },
  { gates: [26, 44], centers: ["heart", "spleen"] },
  { gates: [27, 50], centers: ["sacral", "spleen"] },
  { gates: [28, 38], centers: ["spleen", "root"] },
  { gates: [29, 46], centers: ["sacral", "g"] },
  { gates: [30, 41], centers: ["solarPlexus", "root"] },
  { gates: [32, 54], centers: ["spleen", "root"] },
  { gates: [34, 57], centers: ["sacral", "spleen"] },
  { gates: [35, 36], centers: ["throat", "solarPlexus"] },
  { gates: [37, 40], centers: ["solarPlexus", "heart"] },
  { gates: [39, 55], centers: ["root", "solarPlexus"] },
  { gates: [42, 53], centers: ["sacral", "root"] },
  { gates: [47, 64], centers: ["ajna", "head"] },
];

export const MOTORS: CenterId[] = ["root", "solarPlexus", "heart", "sacral"];

export const BUSINESS_GATES: Record<number, string> = {
  1: "Implementatie",
  2: "Visie en richting",
  5: "Ritme en cultuur",
  7: "Planning en sturing",
  8: "Public relations",
  13: "Administratie en geheugen",
  14: "Allocatie van middelen",
  15: "Betrouwbaarheid",
  21: "Controle en onderhandeling",
  26: "Verkoop en overtuiging",
  31: "Invloed",
  32: "Continuïteit",
  45: "Dominion / CEO-rol",
  54: "Ambities en opklimmen",
};

export const CORE_SKILL_GATES = [1, 2, 7, 8, 13, 14, 15] as const;

export function longitudeToGate(longitude: number): { gate: number; line: number } {
  const normalized = ((longitude - HD_ZERO_LONGITUDE) % 360 + 360) % 360;
  const gateIndex = Math.min(63, Math.floor(normalized / 5.625));
  const line = Math.min(6, Math.floor((normalized % 5.625) / 0.9375) + 1);
  return { gate: GATE_WHEEL[gateIndex], line };
}

export function definedCentersFromGates(gates: Set<number>): {
  centers: CenterId[];
  channels: string[];
} {
  const centers = new Set<CenterId>();
  const channels: string[] = [];

  for (const channel of CHANNELS) {
    const [a, b] = channel.gates;
    if (gates.has(a) && gates.has(b)) {
      channels.push(`${a}-${b}`);
      centers.add(channel.centers[0]);
      centers.add(channel.centers[1]);
    }
  }

  return { centers: [...centers], channels };
}

export function motorConnectedToThroat(definedChannels: string[]): boolean {
  const adjacency = new Map<CenterId, Set<CenterId>>();
  for (const channel of CHANNELS) {
    if (!definedChannels.includes(`${channel.gates[0]}-${channel.gates[1]}`)) continue;
    const [left, right] = channel.centers;
    if (!adjacency.has(left)) adjacency.set(left, new Set());
    if (!adjacency.has(right)) adjacency.set(right, new Set());
    adjacency.get(left)!.add(right);
    adjacency.get(right)!.add(left);
  }

  const queue: CenterId[] = MOTORS.filter((motor) => adjacency.has(motor));
  const seen = new Set<CenterId>(queue);
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === "throat") return true;
    for (const next of adjacency.get(current) ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return false;
}

export function classifyType(centers: CenterId[], channels: string[]): {
  careerType: "initiator" | "classic-builder" | "express-builder" | "advisor" | "evaluator";
  authority: "emotional" | "sacral" | "splenic" | "ego" | "self-projected" | "mental" | "lunar";
} {
  const defined = new Set(centers);
  if (defined.size === 0) {
    return { careerType: "evaluator", authority: "lunar" };
  }

  const sacral = defined.has("sacral");
  const toThroat = motorConnectedToThroat(channels);

  let careerType: ReturnType<typeof classifyType>["careerType"];
  if (sacral && toThroat) careerType = "express-builder";
  else if (sacral) careerType = "classic-builder";
  else if (toThroat) careerType = "initiator";
  else careerType = "advisor";

  let authority: ReturnType<typeof classifyType>["authority"];
  if (defined.has("solarPlexus")) authority = "emotional";
  else if (defined.has("sacral")) authority = "sacral";
  else if (defined.has("spleen")) authority = "splenic";
  else if (defined.has("heart")) authority = "ego";
  else if (defined.has("g")) authority = "self-projected";
  else authority = "mental";

  return { careerType, authority };
}

export function environmentFrom(profile: string, careerType: ReturnType<typeof classifyType>["careerType"]) {
  const [conscious] = profile.split("/").map(Number);
  if (careerType === "evaluator") return "large-group" as const;
  if (careerType === "advisor") {
    return conscious === 4 || conscious === 2 ? "partnership" as const : "small-group" as const;
  }
  if (careerType === "initiator") {
    return conscious === 1 || conscious === 5 ? "solo" as const : "partnership" as const;
  }
  if (careerType === "express-builder") return "small-group" as const;
  return conscious >= 4 ? "large-group" as const : "small-group" as const;
}
