export const SITE = {
  name: "Kapitaalkrant",
  shortName: "Kapitaalkrant",
  description:
    "Krant van de SafeCapital-onderzoeksgroep. Cijfers met bon, duiding met tegenwerping. Detail over gevolgde assets en macro die die namen raakt.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://koppel-zeta.vercel.app",
  tagline: "Cijfers met bon. Duiding met tegenwerping.",
  audience: "Onderzoeksgroep SafeCapital",
} as const;

export const CADEAU = {
  name: "Vesting Noodvoedsel-directory",
  shortName: "Vesting",
  description:
    "Filterbare directory voor noodvoedsel: vergelijk emergency food kits en langhoudbare voorraden op calorieën, houdbaarheid, prijs per 100 kcal, dieet en scenario.",
  path: "/cadeau",
} as const;

export const DESK_LABELS: Record<string, string> = {
  vs: "Verenigde Staten",
  eurozone: "Eurozone",
  belgie: "België",
  methode: "Methode",
};
