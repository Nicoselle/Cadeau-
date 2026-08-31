export const SITE = {
  name: "Azimut",
  shortName: "Azimut",
  tagline: "Zakelijk kompas voor ondernemers",
  description:
    "Azimut synthetiseert sociologische cohort-data, BaZi-sectorlogica, numerologische drijfveren en BG5-organisatiemechanica tot een operationele bedrijfsblauwdruk. Geen daghoroscoop.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azimut.example.com",
} as const;
