export const SITE = {
  name: "Azimut",
  shortName: "Azimut",
  tagline: "Een kompas voor je zaak",
  description:
    "Azimut geeft je een eerlijk beeld van welke zaak bij je past — sector, schaal en met wie je het best werkt. Geen horoscoop.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azimut.example.com",
} as const;
