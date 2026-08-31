export const SITE = {
  name: "Azimut",
  shortName: "Azimut",
  tagline: "Zakelijk kompas voor ondernemers",
  description:
    "Azimut weegt klaspositie, sector, drijfveer en organisatie tot één dossier voor je zaak. Geen horoscoop. Welk bedrijf bij jou past.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azimut.example.com",
} as const;
