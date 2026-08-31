import type { BriefingResponse, IntakeInput } from "@/types/briefing";
import { findCity, localToUtc } from "@/lib/cities";
import { computeBazi } from "@/lib/engines/bazi";
import { computeHumanDesign } from "@/lib/engines/humandesign";
import { computeNumerology } from "@/lib/engines/numerology";
import { computeRae } from "@/lib/engines/rae";
import { synthesize } from "@/lib/engines/synthesis";

export function parseIntake(body: unknown): IntakeInput {
  if (!body || typeof body !== "object") {
    throw new Error("Ongeldige invoer.");
  }
  const value = body as Record<string, unknown>;
  const fullName = String(value.fullName ?? "").trim();
  const birthDate = String(value.birthDate ?? "");
  const birthTime = String(value.birthTime ?? "");
  const cityId = String(value.cityId ?? "");
  const country = String(value.country ?? "");
  const companyFoundedOn = value.companyFoundedOn
    ? String(value.companyFoundedOn)
    : undefined;

  if (fullName.length < 2) throw new Error("Vul een volledige naam in.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) throw new Error("Ongeldige geboortedatum.");
  if (!/^\d{2}:\d{2}$/.test(birthTime)) throw new Error("Ongeldige geboortetijd.");
  if (!findCity(cityId)) throw new Error("Kies een geboorteplaats uit de lijst.");
  if (!["BE", "NL", "DE", "FR", "UK", "US", "CN", "OTHER"].includes(country)) {
    throw new Error("Ongeldig land.");
  }
  if (companyFoundedOn && !/^\d{4}-\d{2}-\d{2}$/.test(companyFoundedOn)) {
    throw new Error("Ongeldige oprichtingsdatum.");
  }

  return {
    fullName,
    birthDate,
    birthTime,
    cityId,
    country: country as IntakeInput["country"],
    companyFoundedOn,
  };
}

export function generateBriefing(input: IntakeInput, now = new Date()): BriefingResponse {
  const city = findCity(input.cityId);
  if (!city) throw new Error("Geboorteplaats niet gevonden.");

  const [hour, minute] = input.birthTime.split(":").map(Number);
  const utc = localToUtc(input.birthDate, input.birthTime, city);

  const rae = computeRae(input.birthDate, input.country);
  const bazi = computeBazi(utc, hour, minute);
  const numerology = computeNumerology(input.fullName, input.birthDate, now, input.companyFoundedOn);
  const design = computeHumanDesign(utc);
  const briefing = synthesize(rae, bazi, numerology, design, input.fullName);

  return {
    input,
    location: {
      city: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    },
    layers: { rae, bazi, numerology, design },
    briefing,
    generatedAt: now.toISOString(),
  };
}
