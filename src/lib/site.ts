export const SITE = {
  name: "Cadeau Noodvoedsel-directory",
  shortName: "Cadeau",
  description:
    "Filterbare directory voor noodvoedsel: vergelijk emergency food kits en langhoudbare voorraden op calorieën, houdbaarheid, prijs per 100 kcal, dieet en scenario.",
  // Public base URL. Override with NEXT_PUBLIC_SITE_URL in production (Vercel).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cadeau.example.com",
} as const;
