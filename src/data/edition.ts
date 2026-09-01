export type EditionMeta = {
  number: number;
  date: string;
  name: string;
  asOf: string;
  folio: string;
  note: string;
  leadSlug: string;
};

export const EDITIONS: EditionMeta[] = [
  {
    number: 1,
    date: "2026-08-18",
    name: "De kraan weer open",
    asOf: "2026-08-18",
    folio: "Nr. 1",
    note: "Eerste zelfstandige editie. Alle cijfers tot de peildatum van 18 augustus 2026, herleidbaar uit de reeksen in redactie/data.",
    leadSlug: "kraan-weer-open",
  },
  {
    number: 2,
    date: "2026-08-31",
    name: "De bodem houdt",
    asOf: "2026-08-31",
    folio: "Nr. 2",
    note: "Tweede editie. Drie cijfers die de piramide raken: M2, reële tienjaars, Fed funds. Dezelfde vloer als editie 1; DGS10 loopt tot 6 augustus, T10YIE tot 17 augustus, DFF tot 14 augustus. Geen nieuwe M2-waarneming.",
    leadSlug: "reele-rente-houdt-de-bodem",
  },
  {
    number: 3,
    date: "2026-09-01",
    name: "De 2-jaars hield de vrijdagprint",
    asOf: "2026-09-01",
    folio: "Nr. 3",
    note: "Conjunctuur-brief van dinsdag 1 september 2026. Per reeks de laatste waarneming op of vóór de peildatum. CMT 1 september bestaat nog niet. Geen verzonnen prints.",
    leadSlug: "conjunctuur-brief-1-september",
  },
];

export const EDITION = EDITIONS[EDITIONS.length - 1]!;

export const PUBLICATION_AS_OF = EDITION.asOf;

export const PEIL_RULE =
  "Peildatum publicatie: 1 september 2026. Marktdata: laatste beschikbare waarneming per reeks (lastOnOrBefore); niet alle reeksen hebben dezelfde observatiedatum. Afgeleide cijfers: uitsluitend berekend op de laatste gemeenschappelijke datum van de gebruikte reeksen (lastCommonDate).";

export const DATA_LAST_UPDATED = EDITION.asOf;
