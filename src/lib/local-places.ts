import { PLACES } from "@/data/local-places";
import type { Place } from "@/types/local";

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findPlace(input: string): Place | undefined {
  const slug = slugify(input);
  if (!slug) return undefined;
  return PLACES.find(
    (place) =>
      place.slug === slug || slugify(place.name) === slug || place.name.toLowerCase() === input.trim().toLowerCase(),
  );
}

export function resolvePlace(input: string): Place | null {
  const named = findPlace(input);
  if (named) return named;

  const name = input.trim().replace(/\s+/g, " ");
  if (!/^[\p{L}][\p{L}\s.'-]{1,39}$/u.test(name)) return null;

  return {
    slug: slugify(name),
    name,
    country: "BE",
    province: "buiten catalogus",
  };
}

export function searchPlaces(query: string, limit = 8): Place[] {
  const needle = slugify(query);
  if (!needle) return PLACES.slice(0, limit);

  const scored = PLACES.map((place) => {
    const hay = `${place.slug} ${slugify(place.name)} ${slugify(place.province)}`;
    let score = 0;
    if (place.slug === needle) score += 100;
    else if (place.slug.startsWith(needle)) score += 60;
    else if (hay.includes(needle)) score += 30;
    return { place, score };
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.place.name.localeCompare(b.place.name, "nl"));

  return scored.slice(0, limit).map((row) => row.place);
}

export function getPlaceBySlug(slug: string): Place | undefined {
  return PLACES.find((place) => place.slug === slug);
}

export function placeLabel(place: Place): string {
  return `${place.name} (${place.country})`;
}
