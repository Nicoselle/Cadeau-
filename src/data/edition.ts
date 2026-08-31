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
];

export const EDITION = EDITIONS[EDITIONS.length - 1]!;

export const DATA_LAST_UPDATED = EDITION.asOf;
