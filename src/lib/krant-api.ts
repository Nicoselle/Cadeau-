import { articles } from "@/data/articles";
import { EDITION, EDITIONS } from "@/data/edition";
import { getMarketBoard } from "@/data/markets";
import {
  getEdition,
  leadOfEdition,
  newsOfEdition,
  opinionsOfEdition,
} from "@/lib/newspaper";
import { oracles } from "@/data/oracles";
import { SITE } from "@/lib/site";
import type { Article } from "@/types/newspaper";

export function serializeArticle(article: Article) {
  return {
    slug: article.slug,
    url: `${SITE.url}/stuk/${article.slug}`,
    kicker: article.kicker,
    title: article.title,
    dek: article.dek,
    desk: article.desk,
    published: article.published,
    author: article.author,
    lead: article.lead,
    reading_minutes: article.readingMinutes,
    body: article.body,
    steenman: article.steenman ?? null,
    sources: article.sources,
    figures: article.figures,
  };
}

export function serializeEdition() {
  return {
    meta: {
      status: "ok" as const,
      publication: SITE.name,
      edition: EDITION.number,
      date: EDITION.date,
      as_of: EDITION.asOf,
      endpoint_version: "v1",
    },
    edition: {
      number: EDITION.number,
      name: EDITION.name,
      folio: EDITION.folio,
      note: EDITION.note,
    },
    articles: articles.map(serializeArticle),
    oracles,
    markets: getMarketBoard(),
  };
}

export function serializeArchiveIndex() {
  return {
    meta: {
      status: "ok" as const,
      publication: SITE.name,
      endpoint_version: "v1",
    },
    editions: EDITIONS.map((edition) => {
      const lead = leadOfEdition(edition.number);
      const news = newsOfEdition(edition.number);
      const opinions = opinionsOfEdition(edition.number);
      return {
        number: edition.number,
        date: edition.date,
        as_of: edition.asOf,
        name: edition.name,
        folio: edition.folio,
        note: edition.note,
        lead: { slug: lead.slug, title: lead.title },
        news_count: news.length,
        opinion_count: opinions.length,
        url: `${SITE.url}/archief/${edition.number}`,
        json_url: `${SITE.url}/api/v1/archief/${edition.number}`,
      };
    }),
  };
}

export function serializeArchivedEdition(number: number) {
  const edition = getEdition(number);
  if (!edition) return null;
  const lead = leadOfEdition(number);
  const news = newsOfEdition(number);
  const opinions = opinionsOfEdition(number);
  return {
    meta: {
      status: "ok" as const,
      publication: SITE.name,
      edition: edition.number,
      date: edition.date,
      as_of: edition.asOf,
      endpoint_version: "v1",
    },
    edition: {
      number: edition.number,
      name: edition.name,
      folio: edition.folio,
      note: edition.note,
      url: `${SITE.url}/archief/${edition.number}`,
    },
    lead: serializeArticle(lead),
    articles: news.map(serializeArticle),
    opinions: opinions.map(serializeArticle),
  };
}
