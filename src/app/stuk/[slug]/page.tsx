import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody, SteenmanBox } from "@/components/krant/article-body";
import { articles } from "@/data/articles";
import { formatNlDate, getArticle } from "@/lib/newspaper";
import { DESK_LABELS, SITE } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Stuk niet gevonden" };
  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      url: `${SITE.url}/stuk/${article.slug}`,
      publishedTime: article.published,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter(
    (item) => item.slug !== article.slug && item.desk === article.desk,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.dek,
    datePublished: article.published,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "NewsMediaOrganization", name: SITE.name },
    inLanguage: "nl",
    mainEntityOfPage: `${SITE.url}/stuk/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container py-10">
        <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
          {article.kicker}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          {article.title}
        </h1>
        <p className="mt-5 max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
          {article.dek}
        </p>
        <p className="mt-5 text-sm text-muted-foreground">
          {article.author} · {DESK_LABELS[article.desk]} ·{" "}
          {formatNlDate(article.published)} · {article.readingMinutes} minuten
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ArticleBody article={article} />
            {article.steenman ? (
              <SteenmanBox
                objection={article.steenman.objection}
                antwoord={article.steenman.antwoord}
              />
            ) : null}
          </div>
          <aside className="lg:col-span-4">
            <div className="border border-hairline bg-card p-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Cijfers in dit stuk
              </p>
              <dl className="mt-4 space-y-3">
                {article.figures.map((figure) => (
                  <div key={figure.label}>
                    <dt className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
                      {figure.label}
                    </dt>
                    <dd className="font-display text-2xl font-semibold">
                      {figure.value}
                    </dd>
                    <dd className="text-[12px] text-muted-foreground">
                      {figure.source} · {figure.kind}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-6 border-t border-hairline pt-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Bonnen
              </p>
              <ul className="mt-3 space-y-2 font-serif text-sm">
                {article.sources.map((source) => (
                  <li key={source.label}>
                    {source.url ? (
                      <a
                        href={source.url}
                        className="hover:text-accent"
                        rel="noreferrer"
                      >
                        {source.label}
                      </a>
                    ) : (
                      source.label
                    )}
                    <span className="block text-[12px] text-muted-foreground">
                      opgehaald {source.retrieved}
                      {source.vintage ? ` · vintage ${source.vintage}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {related.length > 0 ? (
              <div className="mt-8">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Zelfde desk
                </p>
                <ul className="mt-3 space-y-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/stuk/${item.slug}`}
                        className="font-display text-lg font-semibold leading-tight hover:text-accent"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </article>
    </>
  );
}
