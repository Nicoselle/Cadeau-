import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditionFigure } from "@/components/krant/edition-figure";
import { StoryCard } from "@/components/krant/story-card";
import { EDITIONS } from "@/data/edition";
import {
  firstParagraph,
  formatNlDate,
  formatWeekday,
  getEdition,
  leadOfEdition,
  newsOfEdition,
  opinionOnEditionDate,
  opinionsOfEdition,
  secondaryOfEdition,
} from "@/lib/newspaper";
import { DESK_LABELS, SITE } from "@/lib/site";

export function generateStaticParams() {
  return EDITIONS.map((edition) => ({ nummer: String(edition.number) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nummer: string }>;
}): Promise<Metadata> {
  const { nummer } = await params;
  const edition = getEdition(Number(nummer));
  if (!edition) return { title: "Editie niet gevonden" };
  return {
    title: `${edition.folio} — ${edition.name}`,
    description: edition.note,
    openGraph: {
      title: `${SITE.name} ${edition.folio} — ${edition.name}`,
      description: edition.note,
      type: "article",
      url: `${SITE.url}/archief/${edition.number}`,
    },
  };
}

export default async function EditionArchivePage({
  params,
}: {
  params: Promise<{ nummer: string }>;
}) {
  const { nummer } = await params;
  const number = Number(nummer);
  const edition = getEdition(number);
  if (!edition || !Number.isInteger(number)) notFound();

  const lead = leadOfEdition(number);
  const rest = secondaryOfEdition(number);
  const news = newsOfEdition(number);
  const dayOpinion = opinionOnEditionDate(number);
  const otherOpinions = opinionsOfEdition(number).filter(
    (article) => article.slug !== dayOpinion?.slug,
  );
  const previous = getEdition(number - 1);
  const next = getEdition(number + 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE.name} ${edition.folio} — ${edition.name}`,
    description: edition.note,
    datePublished: edition.date,
    url: `${SITE.url}/archief/${edition.number}`,
    isPartOf: { "@type": "Collection", name: `${SITE.name} archief` },
    hasPart: [lead, ...rest, ...(dayOpinion ? [dayOpinion] : [])].map(
      (article) => ({
        "@type": "NewsArticle",
        headline: article.title,
        url: `${SITE.url}/stuk/${article.slug}`,
        datePublished: article.published,
      }),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container py-10">
        <p className="kicker">
          <Link href="/archief" className="hover:text-accent">
            Archief
          </Link>
          {" · "}
          Jaargang 1 · {edition.folio}
        </p>
        <p className="mt-3 font-sans text-[13px] uppercase tracking-[0.14em] text-muted-foreground">
          {formatWeekday(edition.date)} {formatNlDate(edition.date)} · Peil{" "}
          {formatNlDate(edition.asOf, "short")}
        </p>
        <h1 className="mt-2 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.025em]">
          {edition.name}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          {edition.note}
        </p>

        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {previous ? (
            <Link
              href={`/archief/${previous.number}`}
              className="underline hover:text-accent"
            >
              ← {previous.folio} · {previous.name}
            </Link>
          ) : (
            <span className="text-muted-foreground">Eerste nummer</span>
          )}
          {next ? (
            <Link
              href={`/archief/${next.number}`}
              className="underline hover:text-accent"
            >
              {next.folio} · {next.name} →
            </Link>
          ) : (
            <span className="text-muted-foreground">Laatste nummer</span>
          )}
        </nav>

        <section className="mt-10 border-t-2 border-foreground pt-6">
          <p className="kicker">Inhoud</p>
          <ol className="mt-4 max-w-2xl space-y-2 font-serif">
            {news.map((article) => (
              <li key={article.slug}>
                <Link href={`/stuk/${article.slug}`} className="hover:text-accent">
                  {article.lead || article.slug === lead.slug
                    ? `Voorpagina — ${article.title}`
                    : article.title}
                </Link>
                <span className="text-muted-foreground">
                  {" "}
                  · {DESK_LABELS[article.desk]}
                </span>
              </li>
            ))}
            {dayOpinion ? (
              <li>
                <Link
                  href={`/stuk/${dayOpinion.slug}`}
                  className="hover:text-accent"
                >
                  De mening — {dayOpinion.title}
                </Link>
              </li>
            ) : null}
          </ol>
        </section>

        <article className="mt-12 grid gap-10 border-t border-foreground pt-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="kicker">{lead.kicker}</p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.025em]">
              <Link href={`/stuk/${lead.slug}`} className="hover:text-accent">
                {lead.title}
              </Link>
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
              {lead.dek}
            </p>
            <p className="mt-3 font-sans text-[13px] text-muted-foreground">
              {DESK_LABELS[lead.desk]} · {formatNlDate(lead.published)} ·{" "}
              {lead.readingMinutes} minuten
            </p>
            <EditionFigure image={lead.image} className="mt-7 max-w-3xl" />
            <p className="drop-cap mt-8 max-w-2xl font-serif text-[1.08rem] leading-[1.7]">
              {firstParagraph(lead)}
            </p>
            <Link
              href={`/stuk/${lead.slug}`}
              className="mt-6 inline-block border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-[0.12em] hover:border-accent hover:text-accent"
            >
              Lees het voorpaginastuk
            </Link>
          </div>
          <aside className="lg:col-span-4">
            <p className="kicker">Dit nummer</p>
            <p className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
              {edition.folio}
            </p>
            <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
              {news.length} {news.length === 1 ? "stuk" : "stukken"} in het
              nummer
              {dayOpinion ? ", plus de mening van die dag" : ""}.
            </p>
            <p className="mt-6 text-sm">
              <Link
                href={`/api/v1/archief/${edition.number}`}
                className="underline hover:text-accent"
              >
                Dit nummer als JSON
              </Link>
            </p>
          </aside>
        </article>

        {rest.length > 0 ? (
          <section className="mt-14 grid gap-8 border-t border-foreground pt-8 md:grid-cols-2">
            {rest.map((article) => (
              <StoryCard key={article.slug} article={article} />
            ))}
          </section>
        ) : null}

        {dayOpinion ? (
          <section className="mt-14 border-t border-foreground pt-8 lg:grid lg:grid-cols-12 lg:gap-10">
            <article className="rule-story lg:col-span-8">
              <p className="kicker">{dayOpinion.kicker}</p>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.025em]">
                <Link
                  href={`/stuk/${dayOpinion.slug}`}
                  className="hover:text-accent"
                >
                  {dayOpinion.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
                {dayOpinion.dek}
              </p>
              <p className="mt-5 max-w-2xl font-serif text-[1.05rem] leading-[1.7]">
                {firstParagraph(dayOpinion)}
              </p>
              <Link
                href={`/stuk/${dayOpinion.slug}`}
                className="mt-6 inline-block border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-[0.12em] hover:border-accent hover:text-accent"
              >
                Lees de mening
              </Link>
            </article>
          </section>
        ) : null}

        {otherOpinions.length > 0 ? (
          <section className="mt-14 border-t border-foreground pt-8">
            <p className="kicker">Meningen bij dit nummer</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
              Dagen uit dezelfde editie
            </h2>
            <ol className="mt-5 max-w-2xl space-y-2 font-serif">
              {otherOpinions.map((article) => (
                <li key={article.slug}>
                  <span className="text-muted-foreground">
                    {formatNlDate(article.published, "short")}
                    {" — "}
                  </span>
                  <Link
                    href={`/stuk/${article.slug}`}
                    className="hover:text-accent"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <p className="mt-14 border-t border-hairline pt-6 text-sm text-muted-foreground">
          <Link href="/archief" className="underline hover:text-accent">
            Terug naar alle edities
          </Link>
        </p>
      </div>
    </>
  );
}
