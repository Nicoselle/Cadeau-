import { resolvePlace } from "@/lib/local-places";
import { searchPlaceNews } from "@/lib/local-search";
import { moderateIntake, typesetStory } from "@/lib/local-story";
import type {
  EntrepreneurStory,
  PlaceEdition,
  StoryIntake,
} from "@/types/local";

type Registry = {
  demand: Map<string, number>;
  stories: EntrepreneurStory[];
};

const globalForLocal = globalThis as typeof globalThis & {
  kapitaalkrantLocal?: Registry;
};

function registry(): Registry {
  if (!globalForLocal.kapitaalkrantLocal) {
    globalForLocal.kapitaalkrantLocal = {
      demand: new Map(),
      stories: [],
    };
  }
  return globalForLocal.kapitaalkrantLocal;
}

export function addDemand(slugs: string[], extra = 1): void {
  const box = registry();
  for (const slug of slugs) {
    const place = resolvePlace(slug);
    if (!place) continue;
    box.demand.set(place.slug, (box.demand.get(place.slug) ?? 0) + extra);
  }
}

export function demandFor(slug: string): number {
  return registry().demand.get(slug) ?? 0;
}

export function hasDemand(slug: string, extraSlugs: string[] = []): boolean {
  if (extraSlugs.includes(slug)) return true;
  return demandFor(slug) > 0;
}

export function listDemand(): Array<{ slug: string; count: number }> {
  return [...registry().demand.entries()]
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));
}

export function submitStory(input: StoryIntake, extraDemand: string[] = []) {
  const refusal = moderateIntake(input);
  if (refusal) {
    return { ok: false as const, error: refusal };
  }
  const place = resolvePlace(input.plaats);
  if (!place) {
    return { ok: false as const, error: "Plaats onbekend." };
  }
  const demanded = hasDemand(place.slug, extraDemand);
  const story = typesetStory(input, demanded);
  registry().stories.unshift(story);
  return { ok: true as const, story };
}

export function storiesFor(slug: string): EntrepreneurStory[] {
  return registry().stories.filter((story) => story.plaatsSlug === slug);
}

export function releaseWaiting(slug: string): number {
  const box = registry();
  let released = 0;
  for (const story of box.stories) {
    if (story.plaatsSlug === slug && story.status === "wachtkamer") {
      story.status = "gepubliceerd";
      story.refusal = undefined;
      released += 1;
    }
  }
  return released;
}

export async function buildEdition(
  plaatsInput: string,
  extraDemand: string[] = [],
): Promise<PlaceEdition | null> {
  const place = resolvePlace(plaatsInput);
  if (!place) return null;

  const demanded = hasDemand(place.slug, extraDemand);
  if (!demanded) {
    return {
      plaats: place,
      vraag: 0,
      gevonden: [],
      verhalen: [],
      wachtkamer: storiesFor(place.slug).filter((s) => s.status === "wachtkamer"),
    };
  }

  const search = await searchPlaceNews(place);
  const own = storiesFor(place.slug);
  return {
    plaats: place,
    vraag: demandFor(place.slug) + (extraDemand.includes(place.slug) ? 1 : 0),
    gevonden: search.stories,
    verhalen: own.filter((s) => s.status === "gepubliceerd"),
    wachtkamer: own.filter((s) => s.status === "wachtkamer"),
    searchError: search.error,
  };
}

export function resetRegistryForTests(): void {
  globalForLocal.kapitaalkrantLocal = { demand: new Map(), stories: [] };
}
