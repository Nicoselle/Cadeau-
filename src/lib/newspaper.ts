import { articles } from "@/data/articles";
import { EDITION, EDITIONS, type EditionMeta } from "@/data/edition";
import type { Article, BodyBlock, Desk } from "@/types/newspaper";

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function isOpinion(article: Article): boolean {
  return article.desk === "opinie";
}

export function articlesByDesk(desk: Desk): Article[] {
  return articles
    .filter((article) => article.desk === desk)
    .slice()
    .sort(
      (a, b) =>
        b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug),
    );
}

export function latestOpinion(): Article | undefined {
  return articles
    .filter(isOpinion)
    .slice()
    .sort((a, b) => b.published.localeCompare(a.published))[0];
}

export function articlesByEdition(number: number): Article[] {
  return articles.filter((article) => article.edition === number);
}

export function getEdition(number: number): EditionMeta | undefined {
  return EDITIONS.find((edition) => edition.number === number);
}

export function newsOfEdition(number: number): Article[] {
  return articlesByEdition(number).filter((article) => !isOpinion(article));
}

export function leadOfEdition(number: number): Article {
  const meta = getEdition(number);
  const bySlug = meta ? getArticle(meta.leadSlug) : undefined;
  if (bySlug && bySlug.edition === number && !isOpinion(bySlug)) {
    return bySlug;
  }
  const fallback =
    newsOfEdition(number).find((article) => article.lead) ??
    newsOfEdition(number)[0];
  if (!fallback) {
    throw new Error(`editie ${number} heeft geen voorpaginastuk`);
  }
  return fallback;
}

export function secondaryOfEdition(number: number): Article[] {
  const lead = leadOfEdition(number);
  return newsOfEdition(number).filter((article) => article.slug !== lead.slug);
}

export function opinionsOfEdition(number: number): Article[] {
  const meta = getEdition(number);
  if (!meta) return [];
  const previous = getEdition(number - 1);
  const after = previous?.date ?? "";
  return articles
    .filter(isOpinion)
    .filter(
      (article) =>
        article.published <= meta.date && article.published > after,
    )
    .slice()
    .sort(
      (a, b) =>
        b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug),
    );
}

export function opinionOnEditionDate(number: number): Article | undefined {
  const meta = getEdition(number);
  if (!meta) return undefined;
  return articles
    .filter(isOpinion)
    .find((article) => article.published === meta.date);
}

export function currentEditionArticles(): Article[] {
  return articlesByEdition(EDITION.number);
}

export function leadArticle(): Article {
  return leadOfEdition(EDITION.number);
}

export function secondaryArticles(): Article[] {
  return secondaryOfEdition(EDITION.number);
}

export function editionPath(number = EDITION.number): string {
  return `/archief/${number}`;
}

export function firstParagraph(article: Article): string {
  const block = article.body.find(
    (item): item is Extract<BodyBlock, { type: "p" }> => item.type === "p",
  );
  return block?.text ?? "";
}

export function formatNlDate(iso: string, style: "long" | "short" = "long"): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: "UTC",
    year: "numeric",
    month: style === "short" ? "short" : "long",
    day: "numeric",
  }).format(date);
}

export function formatWeekday(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: "UTC",
    weekday: "long",
  }).format(date);
}

export { formatPct, formatPlainNumber } from "@/lib/format";
