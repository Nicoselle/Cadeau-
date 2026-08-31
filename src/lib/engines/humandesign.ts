import * as Astronomy from "astronomy-engine";
import type { DesignResult, GateActivation } from "@/types/briefing";
import { julianDate } from "@/lib/engines/calendar";
import {
  BUSINESS_GATES,
  CORE_SKILL_GATES,
  classifyType,
  definedCentersFromGates,
  environmentFrom,
  longitudeToGate,
} from "@/lib/engines/humandesign-data";

const BODIES: { body: Astronomy.Body; name: string }[] = [
  { body: Astronomy.Body.Sun, name: "sun" },
  { body: Astronomy.Body.Moon, name: "moon" },
  { body: Astronomy.Body.Mercury, name: "mercury" },
  { body: Astronomy.Body.Venus, name: "venus" },
  { body: Astronomy.Body.Mars, name: "mars" },
  { body: Astronomy.Body.Jupiter, name: "jupiter" },
  { body: Astronomy.Body.Saturn, name: "saturn" },
  { body: Astronomy.Body.Uranus, name: "uranus" },
  { body: Astronomy.Body.Neptune, name: "neptune" },
  { body: Astronomy.Body.Pluto, name: "pluto" },
];

export function eclipticLongitude(body: Astronomy.Body, date: Date): number {
  if (body === Astronomy.Body.Sun) {
    return Astronomy.SunPosition(date).elon;
  }
  return Astronomy.EclipticLongitude(body, date);
}

export function meanNorthNode(date: Date): number {
  const T = (julianDate(date) - 2_451_545.0) / 36_525;
  const lon = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T;
  return ((lon % 360) + 360) % 360;
}

export function designDate(birthUtc: Date): Date {
  const sunLon = eclipticLongitude(Astronomy.Body.Sun, birthUtc);
  const target = (sunLon - 88 + 360) % 360;
  const start = new Date(birthUtc.getTime() - 95 * 86_400_000);
  const found = Astronomy.SearchSunLongitude(target, start, 16);
  if (!found) {
    return new Date(birthUtc.getTime() - 88 * 86_400_000);
  }
  return found.date;
}

function activationsAt(date: Date, layer: GateActivation["layer"]): GateActivation[] {
  const activations: GateActivation[] = [];
  for (const item of BODIES) {
    const { gate, line } = longitudeToGate(eclipticLongitude(item.body, date));
    activations.push({ gate, line, body: item.name, layer });
  }
  const sunLon = eclipticLongitude(Astronomy.Body.Sun, date);
  const earth = longitudeToGate((sunLon + 180) % 360);
  activations.push({ gate: earth.gate, line: earth.line, body: "earth", layer });
  const node = longitudeToGate(meanNorthNode(date));
  activations.push({ gate: node.gate, line: node.line, body: "north-node", layer });
  activations.push({
    gate: longitudeToGate((meanNorthNode(date) + 180) % 360).gate,
    line: longitudeToGate((meanNorthNode(date) + 180) % 360).line,
    body: "south-node",
    layer,
  });
  return activations;
}

export function computeHumanDesign(birthUtc: Date): DesignResult {
  const designUtc = designDate(birthUtc);
  const personality = activationsAt(birthUtc, "personality");
  const design = activationsAt(designUtc, "design");
  const activations = [...personality, ...design];
  const gates = new Set(activations.map((item) => item.gate));

  const { centers, channels } = definedCentersFromGates(gates);
  const { careerType, authority } = classifyType(centers, channels);

  const sunP = personality.find((item) => item.body === "sun");
  const sunD = design.find((item) => item.body === "sun");
  const profile = `${sunP?.line ?? 1}/${sunD?.line ?? 3}`;

  const skills = [...new Set(
    [...gates]
      .map((gate) => BUSINESS_GATES[gate])
      .filter((label): label is string => Boolean(label)),
  )];
  const missingSkills = CORE_SKILL_GATES
    .filter((gate) => !gates.has(gate))
    .map((gate) => BUSINESS_GATES[gate]);

  return {
    careerType,
    authority,
    profile,
    environment: environmentFrom(profile, careerType),
    definedCenters: centers,
    channels,
    gates: [...gates].sort((a, b) => a - b),
    activations,
    skills,
    missingSkills,
    approximationNotes: [
      "Rol, besluitvorming en schaal volgen uit geboortetijd en plaats.",
      "De schaal — alleen, klein team of grotere groep — is een werkhypothese, geen wet.",
      "Zomertijd volgt de Europese en Amerikaanse regels. Uitzonderlijke lokale tijden kunnen een kwartier schelen.",
    ],
  };
}
