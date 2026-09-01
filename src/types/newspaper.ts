export type Desk = "vs" | "eurozone" | "belgie" | "methode" | "conjunctuur";

export type ClaimKind = "feit" | "duiding" | "raming";

export type BodyBlock =
  | { type: "p"; text: string; kind?: ClaimKind }
  | { type: "h2"; text: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string }
  | { type: "note"; text: string };

export type ArticleSource = {
  label: string;
  url?: string;
  retrieved: string;
  vintage?: string;
};

export type ArticleFigure = {
  label: string;
  value: string;
  source: string;
  kind: ClaimKind;
};

export type ArticleImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Article = {
  slug: string;
  kicker: string;
  title: string;
  dek: string;
  desk: Desk;
  published: string;
  author: string;
  lead: boolean;
  readingMinutes: number;
  image: ArticleImage;
  body: BodyBlock[];
  steenman?: { objection: string; antwoord: string };
  sources: ArticleSource[];
  figures: ArticleFigure[];
};

export type OracleOutcome = "open" | "goed" | "fout" | "deels";

export type OracleClaim = {
  id: number;
  statement: string;
  origin: string;
  recorded: string;
  expires: string;
  testDate: string;
  outcome: OracleOutcome;
  confidence: "hoog" | "midden" | "laag";
  notes?: string;
};

export type MarketTile = {
  id: string;
  label: string;
  value: string;
  detail: string;
  seriesFile: string;
  asOf: string;
  spark: number[];
};
