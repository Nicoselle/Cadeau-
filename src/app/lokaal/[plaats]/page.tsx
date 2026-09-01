import type { Metadata } from "next";
import { PlaceEditionClient } from "@/components/lokaal/place-edition-client";
import { getPlaceBySlug, resolvePlace } from "@/lib/local-places";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plaats: string }>;
}): Promise<Metadata> {
  const { plaats } = await params;
  const place = getPlaceBySlug(plaats) ?? resolvePlace(plaats);
  return {
    title: place ? `Lokaal · ${place.name}` : "Lokale editie",
    description: place
      ? `Vraaggerichte ondernemerseditie voor ${place.name}.`
      : "Lokale editie",
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ plaats: string }>;
}) {
  const { plaats } = await params;
  return (
    <div className="container py-10">
      <PlaceEditionClient slug={plaats} />
    </div>
  );
}
