import { resolvePlace } from "@/lib/local-places";
import type { EntrepreneurStory, StoryIntake } from "@/types/local";

const SPAM = [
  "crypto giveaway",
  "gratis geld",
  "click here",
  "viagra",
  "forex signal",
];

export function moderateIntake(input: StoryIntake): string | null {
  const author = input.author.trim();
  const company = input.company.trim();
  const body = input.body.trim();
  const plaats = input.plaats.trim();

  if (author.length < 2) return "Zet uw naam erbij. De lezer moet weten wie spreekt.";
  if (company.length < 2) return "Zet de naam van de zaak erbij.";
  if (!resolvePlace(plaats)) {
    return "Die gemeente herkennen we niet. Gebruik een plaatsnaam zoals Gent of een dorpsnaam.";
  }
  if (body.length < 80) {
    return "Het verhaal is te kort. Schrijf minstens een kleine alinea (80 tekens).";
  }
  if (body.length > 8000) return "Het verhaal is te lang. Houd het onder de 8.000 tekens.";
  if ((body.match(/https?:\/\//g) ?? []).length > 3) {
    return "Te veel links. Eén website volstaat.";
  }
  const hay = `${author} ${company} ${body}`.toLowerCase();
  if (SPAM.some((term) => hay.includes(term))) {
    return "Dit leest als spam, niet als een ondernemersverhaal.";
  }
  if (body === body.toUpperCase() && body.length > 80) {
    return "Schrijf in normale zinnen, niet in hoofdletters.";
  }
  return null;
}

export function typesetStory(
  input: StoryIntake,
  demanded: boolean,
  now = new Date(),
): EntrepreneurStory {
  const place = resolvePlace(input.plaats);
  if (!place) {
    throw new Error("plaats ontbreekt na moderatie");
  }

  const body = input.body.trim().replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
  const company = input.company.trim();
  const title =
    input.title?.trim() ||
    `${company} in ${place.name}: ${firstWords(body, 8)}`;
  const dek = firstSentence(body).slice(0, 200);
  const iso = now.toISOString();

  return {
    id: `verhaal-${hash(`${place.slug}|${company}|${iso}`)}`,
    kind: "verhaal",
    status: demanded ? "gepubliceerd" : "wachtkamer",
    plaatsSlug: place.slug,
    plaatsName: place.name,
    title,
    dek,
    body,
    author: input.author.trim(),
    company,
    website: cleanUrl(input.website),
    published: iso.slice(0, 10),
    refusal: demanded
      ? undefined
      : `Nog geen abonnee vroeg ${place.name}. Het verhaal staat klaar en gaat automatisch mee zodra iemand die gemeente aanvinkt.`,
  };
}

export function firstWords(text: string, n: number): string {
  const words = text.replace(/\s+/g, " ").trim().split(" ").slice(0, n);
  const line = words.join(" ");
  return line.endsWith(".") ? line : `${line}…`;
}

export function firstSentence(text: string): string {
  const match = text.trim().match(/^[^.!?]+[.!?]?/);
  return (match?.[0] ?? text).trim();
}

function cleanUrl(value?: string): string | undefined {
  const raw = value?.trim();
  if (!raw) return undefined;
  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function hash(value: string): string {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}
