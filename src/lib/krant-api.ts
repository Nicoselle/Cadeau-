import { articles } from "@/data/articles";
import { EDITION } from "@/data/edition";
import { getMarketBoard } from "@/data/markets";
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
