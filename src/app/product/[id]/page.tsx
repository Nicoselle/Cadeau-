import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductById } from "@/data/products";
import { SCENARIO_LABELS, TYPE_LABELS, dietLabel } from "@/types/product";
import {
  buildBreadcrumbJsonLd,
  buildFaq,
  buildFaqJsonLd,
  buildProductJsonLd,
} from "@/lib/product-schema";
import { computeResilience } from "@/lib/resilience";
import { ResilienceScore } from "@/components/resilience-score";
import { ResilienceBreakdown } from "@/components/resilience-breakdown";
import { LastUpdated } from "@/components/last-updated";
import { AddToCompare } from "@/components/add-to-compare";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatShelfLife, formatEUR, formatNumber } from "@/lib/utils";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product niet gevonden" };

  const title = `${product.brand} ${product.name}`;
  const description = `${formatNumber(product.totalCalories)} kcal totaal · ~${formatNumber(
    product.caloriesPerDay,
  )} kcal/dag · houdbaar ${formatShelfLife(
    product.shelfLifeYearsMin,
    product.shelfLifeYearsMax,
  )} · ${formatEUR(product.pricePer100Kcal)} per 100 kcal.`;

  return {
    title,
    description,
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      title: `${title} · ${SITE.shortName}`,
      description,
      url: `${SITE.url}/product/${product.id}`,
      type: "website",
    },
  };
}

function SpecRow({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-2 last:border-0">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right font-medium tabular-nums">{children}</dd>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const faq = buildFaq(product);
  const productJsonLd = buildProductJsonLd(product);
  const faqJsonLd = buildFaqJsonLd(faq);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(product);
  const resilience = computeResilience(product);
  const costPer2000 = (product.priceEUR / product.totalCalories) * 2000;

  return (
    <article className="container py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="mb-6 text-sm text-muted-foreground" aria-label="Kruimelpad">
        <Link href="/" className="hover:text-foreground">
          Directory
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {product.brand}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">{TYPE_LABELS[product.type]}</Badge>
                {product.availableInNetherlands ? (
                  <Badge variant="accent">Beschikbaar in Nederland</Badge>
                ) : null}
                {product.availableInBelgium ? (
                  <Badge variant="accent">Beschikbaar in België</Badge>
                ) : null}
                {product.availableInEU ? (
                  <Badge variant="accent">EU</Badge>
                ) : null}
                {product.availableInSweden ? (
                  <Badge variant="accent">Zweden</Badge>
                ) : null}
                {product.dietOptions.map((d) => (
                  <Badge key={d} variant="outline">
                    {dietLabel(d)}
                  </Badge>
                ))}
              </div>
            </div>
            <ResilienceScore score={product.resilienceScore} size="lg" />
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">
            {product.preparation}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <section aria-labelledby="voeding-heading">
              <h2
                id="voeding-heading"
                className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Voeding &amp; porties
              </h2>
              <dl className="text-sm">
                <SpecRow term="Totale calorieën">
                  {formatNumber(product.totalCalories)} kcal
                </SpecRow>
                <SpecRow term="Calorieën per dag">
                  {formatNumber(product.caloriesPerDay)} kcal
                </SpecRow>
                <SpecRow term="Porties">{product.servings}</SpecRow>
                <SpecRow term="Dagen voorraad">
                  {product.daysOfSupply}
                </SpecRow>
                <SpecRow term="Voor aantal personen">
                  {product.intendedPersons}
                </SpecRow>
                <SpecRow term="Eiwit totaal">
                  {product.totalProteinGrams} g
                </SpecRow>
              </dl>
            </section>

            <section aria-labelledby="opslag-heading">
              <h2
                id="opslag-heading"
                className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Opslag, water &amp; bereiding
              </h2>
              <dl className="text-sm">
                <SpecRow term="Houdbaarheid">
                  {formatShelfLife(
                    product.shelfLifeYearsMin,
                    product.shelfLifeYearsMax,
                  )}
                </SpecRow>
                <SpecRow term="Water vereist">
                  {product.waterRequired ? "Ja" : "Nee"}
                </SpecRow>
                <SpecRow term="Waterbehoefte">
                  {product.totalWaterLiters !== null
                    ? `${product.totalWaterLiters} L`
                    : "—"}
                </SpecRow>
                <SpecRow term="Heet water verplicht">
                  {product.hotWaterMandatory ? "Ja" : "Nee"}
                </SpecRow>
                <SpecRow term="Type">{TYPE_LABELS[product.type]}</SpecRow>
                <SpecRow term="Resilience Score">
                  {product.resilienceScore} / 100
                </SpecRow>
              </dl>
            </section>
          </div>

          <section aria-labelledby="scenario-heading" className="mt-8">
            <h2
              id="scenario-heading"
              className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Geschikte scenario&apos;s
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.scenarios.map((s) => (
                <Badge key={s} variant="outline">
                  {SCENARIO_LABELS[s]}
                </Badge>
              ))}
            </div>
          </section>

          <section aria-labelledby="resilience-heading" className="mt-10">
            <h2 id="resilience-heading" className="text-xl font-semibold">
              Resilience Score: {product.resilienceScore} / 100
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Berekend uit vijf gewogen componenten (geen handmatig cijfer), zodat
              de score reproduceerbaar en uitlegbaar is voor mens én AI.
            </p>
            <div className="mt-4 max-w-md">
              <ResilienceBreakdown components={resilience.components} />
            </div>
          </section>

          <section aria-labelledby="faq-heading" className="mt-10">
            <h2 id="faq-heading" className="text-xl font-semibold">
              Veelgestelde vragen
            </h2>
            <dl className="mt-4 divide-y divide-border">
              {faq.map((item) => (
                <div key={item.question} className="py-4">
                  <dt className="font-medium">{item.question}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <Card>
            <CardContent className="space-y-4 pt-5">
              <div>
                <p className="text-xs text-muted-foreground">Prijs per 100 kcal</p>
                <p className="text-3xl font-bold tabular-nums">
                  {formatEUR(product.pricePer100Kcal)}
                </p>
              </div>
              <dl className="text-sm">
                <SpecRow term="Totaalprijs">
                  {formatEUR(product.priceEUR)}
                </SpecRow>
                <SpecRow term="Kosten per 2000 kcal">
                  {formatEUR(costPer2000)}
                </SpecRow>
                <SpecRow term="Prijs per dag">
                  {formatEUR(product.priceEUR / product.daysOfSupply)}
                </SpecRow>
                <SpecRow term="Prijs per portie">
                  {formatEUR(product.priceEUR / product.servings)}
                </SpecRow>
              </dl>
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Bekijk bij {product.retailer}
              </a>
              <p className="text-center text-[11px] text-muted-foreground">
                Echte retailerlink · prijs en voorraad kunnen wijzigen
              </p>
              <AddToCompare id={product.id} />
              <LastUpdated
                date={product.lastUpdated}
                className="border-t border-border pt-3 text-xs text-muted-foreground"
              />
            </CardContent>
          </Card>
        </aside>
      </div>
    </article>
  );
}
