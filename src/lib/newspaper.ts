import { articles } from "@/data/articles";
import { EDITION } from "@/data/edition";
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

export function currentEditionArticles(): Article[] {
  return articlesByEdition(EDITION.number);
}

export function leadArticle(): Article {
  const lead =
    currentEditionArticles().find((article) => article.lead) ??
    articles.find((article) => article.lead);
  if (!lead) {
    throw new Error("editie heeft geen voorpaginastuk");
  }
  return lead;
}

export function secondaryArticles(): Article[] {
  return currentEditionArticles().filter(
    (article) => !article.lead && !isOpinion(article),
  );
}

export function editionPath(): string {
  return `/archief#editie-${EDITION.number}`;
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
