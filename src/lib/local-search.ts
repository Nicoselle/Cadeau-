import type { FoundStory, Place } from "@/types/local";

const BUSINESS_TERMS = [
  "ondernemer",
  "zaakvoerder",
  "zelfstandige",
  "kmo",
  "mkb",
  "winkel",
  "horeca",
  "bakker",
  "slager",
  "café",
  "cafe",
  "restaurant",
  "start-up",
  "startup",
  "bedrijf",
  "zaak",
  "vestiging",
  "opening",
  "overname",
  "faillissement",
  "ambacht",
  "brouwerij",
  "hoeve",
  "producent",
  "handelaar",
  "zaakvoerster",
];

const REJECT_TERMS = [
  "voetbal",
  "eredivisie",
  "champions league",
  "transfer",
  "wedstrijd",
];

export function buildSearchQuery(place: Place): string {
  return `${place.name} (ondernemer OR KMO OR zaakvoerder OR winkel OR horeca OR zelfstandige OR "lokaal bedrijf")`;
}

export function buildSearchUrl(place: Place): string {
  const params = new URLSearchParams({
    q: buildSearchQuery(place),
    hl: "nl",
    gl: place.country,
    ceid: `${place.country}:nl`,
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

export function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function stripHtml(value: string): string {
  return decodeXml(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseRssItems(xml: string): Array<{
  title: string;
  url: string;
  published: string;
  source: string;
  description: string;
}> {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.map((item) => {
    const title = stripHtml(tag(item, "title"));
    const sourceTag = item.match(/<source[^>]*>([\s\S]*?)<\/source>/);
    const sourceFromTag = sourceTag ? stripHtml(sourceTag[1]) : "";
    const split = splitTitleSource(title);
    return {
      title: split.title,
      url: stripHtml(tag(item, "link")),
      published: toIso(stripHtml(tag(item, "pubDate"))),
      source: sourceFromTag || split.source || "onbekende bron",
      description: stripHtml(tag(item, "description")),
    };
  });
}

function tag(xml: string, name: string): string {
  const match = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return match?.[1] ?? "";
}

function splitTitleSource(title: string): { title: string; source: string } {
  const idx = title.lastIndexOf(" - ");
  if (idx < 8) return { title, source: "" };
  return { title: title.slice(0, idx).trim(), source: title.slice(idx + 3).trim() };
}

function toIso(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
}

export function scoreFoundItem(
  place: Place,
  item: { title: string; description: string },
): number {
  const hay = `${item.title} ${item.description}`.toLowerCase();
  const plaats = place.name.toLowerCase();
  let score = 0;
  if (hay.includes(plaats)) score += 2;
  for (const term of BUSINESS_TERMS) {
    if (hay.includes(term)) score += 1;
  }
  for (const term of REJECT_TERMS) {
    if (hay.includes(term) && !hay.includes("ondernemer") && !hay.includes("sponsor")) {
      score -= 3;
    }
  }
  return score;
}

export function toFoundStory(
  place: Place,
  item: {
    title: string;
    url: string;
    published: string;
    source: string;
    description: string;
  },
  retrieved: string,
  score: number,
): FoundStory {
  const dek = item.description.slice(0, 220);
  return {
    id: `gevonden-${hash(`${place.slug}|${item.title}|${item.url}`)}`,
    kind: "gevonden",
    status: "gepubliceerd",
    plaatsSlug: place.slug,
    plaatsName: place.name,
    title: item.title,
    dek: dek || `Gevonden voor abonnees die ${place.name} vroegen.`,
    source: item.source,
    url: item.url,
    published: item.published.slice(0, 10),
    retrieved,
    score,
  };
}

function hash(value: string): string {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

const cache = new Map<string, { at: number; stories: FoundStory[]; error?: string }>();
const CACHE_MS = 15 * 60 * 1000;

export async function searchPlaceNews(place: Place): Promise<{
  stories: FoundStory[];
  error?: string;
}> {
  const cached = cache.get(place.slug);
  if (cached && Date.now() - cached.at < CACHE_MS) {
    return { stories: cached.stories, error: cached.error };
  }

  const retrieved = new Date().toISOString();
  try {
    const response = await fetch(buildSearchUrl(place), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Kapitaalkrant-Lokaal/1.0; +https://kapitaalkrant.example/methode)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`bron gaf ${response.status}`);
    }
    const xml = await response.text();
    const items = parseRssItems(xml);
    const stories = items
      .map((item) => {
        const score = scoreFoundItem(place, item);
        return { item, score };
      })
      .filter((row) => row.score >= 2 && row.item.url.startsWith("http"))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((row) => toFoundStory(place, row.item, retrieved, row.score));

    cache.set(place.slug, { at: Date.now(), stories });
    return { stories };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "zoekbron onbereikbaar";
    cache.set(place.slug, { at: Date.now(), stories: [], error: message });
    return { stories: [], error: message };
  }
}
