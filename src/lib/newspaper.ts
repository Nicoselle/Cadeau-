import { articles } from "@/data/articles";
import { EDITION } from "@/data/edition";
import type { Article, BodyBlock, Desk } from "@/types/newspaper";

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function articlesByDesk(desk: Desk): Article[] {
  return articles.filter((article) => article.desk === desk);
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
  return currentEditionArticles().filter((article) => !article.lead);
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

export function formatPct(value: number, digits = 1): string {
  const formatted = new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    signDisplay: "exceptZero",
  }).format(value);
  return `${formatted}%`;
}

export function formatPlainNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
