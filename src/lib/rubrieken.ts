import type { Desk } from "@/types/newspaper";

export type Rubriek = {
  id: string;
  label: string;
  href: string;
  blurb: string;
  desk?: Desk;
  /** Tweede balk onder de masthead. */
  masthead: boolean;
};

export const RUBRIEKEN: Rubriek[] = [
  {
    id: "vs",
    label: "Verenigde Staten",
    href: "/desk/vs",
    desk: "vs",
    masthead: true,
    blurb: "Geldgroei, Fed en de lange kant van de curve. Elke cijfer uit de vloer.",
  },
  {
    id: "eurozone",
    label: "Eurozone",
    href: "/desk/eurozone",
    desk: "eurozone",
    masthead: true,
    blurb: "HICP als reeks, ECB-headlines als bekendmaking. Cash dat reëel inlevert.",
  },
  {
    id: "belgie",
    label: "België",
    href: "/desk/belgie",
    desk: "belgie",
    masthead: true,
    blurb: "Gezondheidsindex, spil, centenindex. Tijdelijk in de regel is niet tijdelijk in de portemonnee.",
  },
  {
    id: "geld",
    label: "Geld",
    href: "/desk/geld",
    desk: "geld",
    masthead: true,
    blurb: "M2 en inflatie. Seizoensgecorrigeerd altijd naast de ongecorrigeerde reeks. Geen stille revisie.",
  },
  {
    id: "rente",
    label: "Rente",
    href: "/desk/rente",
    desk: "rente",
    masthead: true,
    blurb: "Beleidsrente, tienjaars, breakeven. Afgeleiden alleen op de laatste gemeenschappelijke datum.",
  },
  {
    id: "grondstoffen",
    label: "Grondstoffen",
    href: "/desk/grondstoffen",
    desk: "grondstoffen",
    masthead: true,
    blurb: "Olie als dagreeks, koper en uranium als maandreeks. Geen ticker als vloer.",
  },
  {
    id: "titels",
    label: "Titels",
    href: "/desk/titels",
    desk: "titels",
    masthead: true,
    blurb: "De namen op de piramide. Dossier en stand met datum. Geen koersdoel.",
  },
  {
    id: "opinie",
    label: "De mening",
    href: "/desk/opinie",
    desk: "opinie",
    masthead: true,
    blurb: "Eén stelling, in de adem van de vroegere Knack. Geen lijstje.",
  },
  {
    id: "methode",
    label: "Methode",
    href: "/desk/methode",
    desk: "methode",
    masthead: false,
    blurb: "Hoe wij meten en wat wij niet doen. Huisregels staan ook op /methode.",
  },
  {
    id: "markten",
    label: "Markten",
    href: "/markten",
    masthead: false,
    blurb: "De datavloer. Per reeks de laatste waarneming; afgeleiden op de gemeenschappelijke datum.",
  },
  {
    id: "piramide",
    label: "Piramide",
    href: "/piramide",
    masthead: false,
    blurb: "40 / 30 / 20 / 10. Allocatie, dossiers en koerslezing op één pagina.",
  },
  {
    id: "orakelboek",
    label: "Orakelboek",
    href: "/orakelboek",
    masthead: false,
    blurb: "Toetsbare uitspraken met vervaldag. Uitkomsten worden bijgeschreven, nooit weggewist.",
  },
];

export const DESK_LABELS: Record<Desk, string> = Object.fromEntries(
  RUBRIEKEN.filter((item) => item.desk).map((item) => [item.desk, item.label]),
) as Record<Desk, string>;

export function desks(): Desk[] {
  return RUBRIEKEN.filter((item): item is Rubriek & { desk: Desk } => Boolean(item.desk)).map(
    (item) => item.desk,
  );
}

export function rubriekByDesk(desk: Desk): Rubriek | undefined {
  return RUBRIEKEN.find((item) => item.desk === desk);
}

export function mastheadRubrieken(): Rubriek[] {
  return RUBRIEKEN.filter((item) => item.masthead);
}
