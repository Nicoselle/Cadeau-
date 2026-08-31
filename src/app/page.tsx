import Link from "next/link";
import { EditionFigure } from "@/components/krant/edition-figure";
import { MarketTape } from "@/components/krant/market-tape";
import { StoryCard } from "@/components/krant/story-card";
import { EDITION } from "@/data/edition";
import { LOKAAL_IMAGE } from "@/data/page-images";
import { oracles } from "@/data/oracles";
import { getMarketBoard } from "@/data/markets";
import {
  firstParagraph,
  formatNlDate,
  leadArticle,
  secondaryArticles,
} from "@/lib/newspaper";
import { DESK_LABELS, SITE } from "@/lib/site";

export default function HomePage() {
  const lead = leadArticle();
  const rest = secondaryArticles();
  const board = getMarketBoard();
  const nextOracle = oracles.find((claim) => claim.outcome === "open");

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} editie ${EDITION.number}`,
    numberOfItems: 1 + rest.length,
    itemListElement: [lead, ...rest].map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE.url}/stuk/${article.slug}`,
      name: article.title,
    })),
  };

  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "nl",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <MarketTape tiles={board.tiles} />

      <div className="container py-10">
        <section className="grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
              {lead.kicker}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
              <Link href={`/stuk/${lead.slug}`} className="hover:text-accent">
                {lead.title}
              </Link>
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-muted-foreground">
              {lead.dek}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {DESK_LABELS[lead.desk]} · {formatNlDate(lead.published)} ·{" "}
              {lead.readingMinutes} minuten
            </p>
            <EditionFigure
              image={lead.image}
              priority
              className="mt-7 max-w-3xl"
            />
            <p className="drop-cap mt-8 max-w-2xl font-serif text-[1.08rem] leading-[1.7]">
              {firstParagraph(lead)}
            </p>
            <Link
              href={`/stuk/${lead.slug}`}
              className="mt-6 inline-block border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-[0.12em] hover:text-accent hover:border-accent"
            >
              Lees het voorpaginastuk
            </Link>
          </article>

          <aside className="flex flex-col gap-8 border-t border-hairline pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                In deze editie
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">
                {EDITION.folio} — {EDITION.name}
              </p>
            </div>
            {rest.slice(0, 2).map((article) => (
              <StoryCard key={article.slug} article={article} size="compact" />
            ))}
            {nextOracle ? (
              <div className="border border-foreground p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
                  Volgende toets
                </p>
                <p className="mt-2 font-serif text-sm leading-relaxed">
                  Regel {nextOracle.id}: {nextOracle.statement}
                </p>
                <Link
                  href="/orakelboek"
                  className="mt-3 inline-block text-xs uppercase tracking-[0.14em] hover:text-accent"
                >
                  Naar het orakelboek
                </Link>
              </div>
            ) : null}
          </aside>
        </section>

        <section className="mt-14 grid gap-8 border-t-2 border-foreground pt-8 md:grid-cols-3">
          {rest.slice(2).map((article) => (
            <StoryCard key={article.slug} article={article} />
          ))}
        </section>

        <section className="mt-14 grid gap-8 border-t-2 border-foreground pt-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <EditionFigure image={LOKAAL_IMAGE} />
          </div>
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
              Nieuwe desk
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold">
              Lokaal, maar alleen waar u om vraagt
            </h2>
            <p className="mt-3 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
              Abonnees zetten hun gemeente. De desk zoekt daarna zelf
              ondernemersnieuws en zet verhalen van zaakvoerders — automatisch,
              zonder dat een redacteur een stad kiest.
            </p>
            <Link
              href="/lokaal"
              className="mt-5 inline-block border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-[0.12em] hover:border-accent hover:text-accent"
            >
              Naar de lokale desk
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
