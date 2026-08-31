import Link from "next/link";
import { EditionFigure } from "@/components/krant/edition-figure";
import { StoryCard } from "@/components/krant/story-card";
import { WatchTape } from "@/components/krant/watch-tape";
import { EDITION } from "@/data/edition";
import { oracles } from "@/data/oracles";
import { WATCHLIST } from "@/data/watchlist";
import {
  articlesByDesk,
  firstParagraph,
  formatNlDate,
  latestOpinion,
  leadArticle,
  secondaryArticles,
} from "@/lib/newspaper";
import { mastheadRubrieken } from "@/lib/rubrieken";
import { DESK_LABELS, SITE } from "@/lib/site";

export default function HomePage() {
  const lead = leadArticle();
  const rest = secondaryArticles();
  const opinion = latestOpinion();
  const nextOracle = oracles.find((claim) => claim.outcome === "open");

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} editie ${EDITION.number}`,
    numberOfItems: 1 + rest.length + (opinion ? 1 : 0),
    itemListElement: [lead, ...rest, ...(opinion ? [opinion] : [])].map(
      (article, index) => ({
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
      <WatchTape />

      <div className="container py-8 sm:py-10">
        <section className="grid gap-10 lg:grid-cols-12">
          <article className="rule-story lg:col-span-8">
            <p className="kicker">{lead.kicker}</p>
            <h1 className="mt-2 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.025em]">
              <Link href={`/stuk/${lead.slug}`} className="hover:text-accent">
                {lead.title}
              </Link>
            </h1>
            <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {lead.dek}
            </p>
            <p className="mt-3 font-sans text-[13px] text-muted-foreground">
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

          <aside className="flex flex-col gap-6 border-t border-hairline pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="rule-story">
              <p className="kicker">In deze editie</p>
              <p className="mt-1 font-display text-2xl font-bold tracking-[-0.02em]">
                {EDITION.folio} — {EDITION.name}
              </p>
            </div>
            {rest.slice(0, 2).map((article) => (
              <StoryCard key={article.slug} article={article} size="compact" />
            ))}
            {rest.length === 0 ? (
              <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                Deze editie telt één voorpaginastuk.{" "}
                <Link href="/archief/1" className="underline hover:text-accent">
                  Nummer 1 in het archief
                </Link>
                .
              </p>
            ) : null}
            {nextOracle ? (
              <div className="rule-story">
                <p className="kicker">Volgende toets</p>
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

        {opinion ? (
          <section className="mt-14 border-t border-foreground pt-8 lg:grid lg:grid-cols-12 lg:gap-10">
            <article className="rule-story lg:col-span-8">
              <p className="kicker">{opinion.kicker}</p>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.025em]">
                <Link href={`/stuk/${opinion.slug}`} className="hover:text-accent">
                  {opinion.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
                {opinion.dek}
              </p>
              <p className="mt-3 font-sans text-[13px] text-muted-foreground">
                {DESK_LABELS[opinion.desk]} · {formatNlDate(opinion.published)} ·{" "}
                {opinion.readingMinutes} minuten
              </p>
              <p className="mt-5 max-w-2xl font-serif text-[1.05rem] leading-[1.7]">
                {firstParagraph(opinion)}
              </p>
              <Link
                href={`/stuk/${opinion.slug}`}
                className="mt-6 inline-block border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-[0.12em] hover:border-accent hover:text-accent"
              >
                Lees de mening
              </Link>
            </article>
          </section>
        ) : null}

        {rest.length > 2 ? (
          <section className="mt-14 grid gap-8 border-t border-foreground pt-8 md:grid-cols-3">
            {rest.slice(2).map((article) => (
              <StoryCard key={article.slug} article={article} />
            ))}
          </section>
        ) : null}

        <section className="mt-14 border-t border-foreground pt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="kicker">De krant</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em]">
                Rubrieken
              </h2>
            </div>
            <Link
              href="/rubrieken"
              className="hidden text-sm font-medium uppercase tracking-[0.12em] underline hover:text-accent sm:inline"
            >
              Alle rubrieken
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mastheadRubrieken()
              .filter((item) => item.desk && item.desk !== "opinie")
              .map((item) => {
                const latest = articlesByDesk(item.desk!)[0];
                return (
                  <article key={item.id} className="rule-story">
                    <p className="kicker">
                      <Link href={item.href} className="hover:text-accent">
                        {item.label}
                      </Link>
                    </p>
                    {latest ? (
                      <>
                        <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-[-0.02em]">
                          <Link
                            href={`/stuk/${latest.slug}`}
                            className="hover:text-accent"
                          >
                            {latest.title}
                          </Link>
                        </h3>
                        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                          {latest.dek}
                        </p>
                      </>
                    ) : (
                      <p className="mt-2 font-serif text-sm text-muted-foreground">
                        {item.blurb}
                      </p>
                    )}
                  </article>
                );
              })}
          </div>
        </section>

        <section className="mt-14 grid gap-8 border-t border-foreground pt-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker">Extra aandacht</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em]">
              De piramide van SafeCapital
            </h2>
            <p className="mt-3 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
              Methode om kapitaal veilig te stellen: 40 procent edelmetalen,
              30 procent liquide middelen, 20 procent beursgenoteerde
              aandelen, 10 procent crypto. Daaronder{" "}
              {WATCHLIST.filter((item) => item.kind === "aandeel").length}{" "}
              namen die wij volgen. Ter lering, geen advies.
            </p>
            <div className="mt-5">
              <Link
                href="/piramide"
                className="inline-block border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-[0.12em] hover:border-accent hover:text-accent"
              >
                Naar de piramide
              </Link>
            </div>
          </div>
          <aside className="rule-story lg:col-span-5">
            <p className="kicker">Lagen</p>
            <ol className="mt-3 space-y-2 font-serif text-sm leading-relaxed">
              <li>40 % — edelmetalen (goud, zilver)</li>
              <li>30 % — liquide middelen (euro 50, dollar 40, frank 5, kroon 5)</li>
              <li>20 % — beursgenoteerde aandelen</li>
              <li>10 % — crypto (Bitcoin, Monero, Gram)</li>
            </ol>
          </aside>
        </section>
      </div>
    </>
  );
}
