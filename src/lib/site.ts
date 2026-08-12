export const SITE = {
  name: "Vesting Noodvoedsel-directory",
  shortName: "Vesting",
  description:
    "Filterbare directory voor noodvoedsel: vergelijk emergency food kits en langhoudbare voorraden op calorieën, houdbaarheid, prijs per 100 kcal, dieet en scenario.",
  // Public base URL used for canonical URLs, OG tags, sitemap and JSON-LD.
  // Override with NEXT_PUBLIC_SITE_URL once a custom domain is live; defaults
  // to the real Vercel production URL so AI crawlers reach a working page.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://koppel-zeta.vercel.app",
} as const;
