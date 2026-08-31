import {
  NEWS_CHANNELS,
  channelById,
  type NewsChannel,
} from "@/data/dossiers";
import { parseRssItems } from "@/lib/local-search";

export type MacroHeadline = {
  id: string;
  channelId: string;
  dossier: string;
  title: string;
  source: string;
  url: string;
  published: string;
  retrieved: string;
  score: number;
};

const cache = new Map<
  string,
  { at: number; headlines: MacroHeadline[]; error?: string }
>();
const CACHE_MS = 15 * 60 * 1000;

export function buildChannelUrl(channel: NewsChannel): string {
  const params = new URLSearchParams({
    q: channel.query,
    hl: channel.locale.hl,
    gl: channel.locale.gl,
    ceid: channel.locale.ceid,
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

export function scoreHeadline(
  channel: NewsChannel,
  item: { title: string; description: string },
): number {
  const hay = `${item.title} ${item.description}`.toLowerCase();
  let score = 0;
  for (const word of channel.keywords) {
    if (hay.includes(word.toLowerCase())) score += 1;
  }
  return score;
}

export function toHeadline(
  channel: NewsChannel,
  item: {
    title: string;
    url: string;
    published: string;
    source: string;
  },
  retrieved: string,
  score: number,
): MacroHeadline {
  return {
    id: `macro-${hash(`${channel.id}|${item.title}|${item.url}`)}`,
    channelId: channel.id,
    dossier: channel.dossier,
    title: item.title,
    source: item.source,
    url: item.url,
    published: item.published.slice(0, 10),
    retrieved,
    score,
  };
}

export async function searchChannel(channelId: string): Promise<{
  headlines: MacroHeadline[];
  error?: string;
}> {
  const channel = channelById(channelId);
  if (!channel) return { headlines: [], error: "onbekend kanaal" };

  const cached = cache.get(channel.id);
  if (cached && Date.now() - cached.at < CACHE_MS) {
    return { headlines: cached.headlines, error: cached.error };
  }

  const retrieved = new Date().toISOString();
  try {
    const response = await fetch(buildChannelUrl(channel), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Kapitaalkrant-Onderzoek/1.0; +https://koppel-zeta.vercel.app/methode)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`bron gaf ${response.status}`);

    const items = parseRssItems(await response.text());
    const headlines = items
      .map((item) => ({ item, score: scoreHeadline(channel, item) }))
      .filter((row) => row.score >= 1 && row.item.url.startsWith("http"))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((row) => toHeadline(channel, row.item, retrieved, row.score));

    cache.set(channel.id, { at: Date.now(), headlines });
    return { headlines };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "zoekbron onbereikbaar";
    cache.set(channel.id, { at: Date.now(), headlines: [], error: message });
    return { headlines: [], error: message };
  }
}

export async function searchAllChannels(): Promise<{
  headlines: MacroHeadline[];
  errors: Record<string, string>;
}> {
  const errors: Record<string, string> = {};
  const batches = await Promise.all(
    NEWS_CHANNELS.map(async (channel) => {
      const result = await searchChannel(channel.id);
      if (result.error) errors[channel.id] = result.error;
      return result.headlines;
    }),
  );
  return { headlines: batches.flat(), errors };
}

function hash(value: string): string {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

export function resetMacroCacheForTests(): void {
  cache.clear();
}
