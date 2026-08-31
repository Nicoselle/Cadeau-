import type { Article, BodyBlock } from "@/types/newspaper";

/** Vaste test vóór publicatie van loon-, belasting- en pensioenmaatregelen. */
export const EFFECTKETEN_TEST =
  "Tijdelijk in de regel betekent niet noodzakelijk tijdelijk in de portemonnee. Wordt het gemiste bedrag later nominaal ingehaald: ja, nee, of onbekend?";

export const FORBIDDEN_LEVEL_CLAIM = [
  /geen blijvende korting/i,
  /geen permanente korting/i,
] as const;

function blockClaimText(block: BodyBlock): string {
  if (block.type === "p" || block.type === "h2" || block.type === "quote") {
    return block.text;
  }
  if (block.type === "table") {
    return [block.caption, block.headers.join(" "), ...block.rows.map((row) => row.join(" "))]
      .filter(Boolean)
      .join(" ");
  }
  return "";
}

/** Titel, dek, alinea's, tabellen, steenman. Noten mogen een oude fout citeren. */
export function flattenClaimText(article: Article): string {
  const parts = [
    article.title,
    article.dek,
    article.image.caption,
    ...article.body.map(blockClaimText),
    article.steenman?.objection,
    article.steenman?.antwoord,
    ...article.figures.map((figure) => `${figure.label} ${figure.value} ${figure.source}`),
  ];
  return parts.filter(Boolean).join("\n");
}

export function claimsTemporaryEqualsLevel(text: string): boolean {
  return FORBIDDEN_LEVEL_CLAIM.some((pattern) => pattern.test(text));
}

export function answersCatchUp(text: string): boolean {
  return /inhaal|niet ingehaald|niveauverschil|lagere (loon|basis)|niet automatisch terug/i.test(
    text,
  );
}
