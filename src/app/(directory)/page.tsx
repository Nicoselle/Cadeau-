import { Suspense } from "react";
import { products, DATA_LAST_UPDATED } from "@/data/products";
import { ProductDirectory } from "@/components/product-directory";
import { LastUpdated } from "@/components/last-updated";
import { SITE } from "@/lib/site";

export default function HomePage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: SITE.name,
    description: SITE.description,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/product/${p.id}`,
      name: `${p.brand} ${p.name}`,
    })),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "nl",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <section className="border-b border-border bg-card">
        <div className="container py-12">
          <p className="text-sm font-medium text-accent">
            Noodvoedsel-directory
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Vind het beste noodvoedselpakket op calorieën, houdbaarheid en prijs
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Vergelijk emergency food kits en langhoudbare voorraden met unieke
            maatstaven: prijs per 100 kcal, een transparante Resilience Score,
            scenario-filters en beschikbaarheid in Nederland, België en de rest
            van de EU. Gebouwd om zowel mensen als AI-agents snel het juiste
            pakket te laten vinden.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="text-2xl font-bold tabular-nums">
                {products.length}
              </span>{" "}
              <span className="text-muted-foreground">producten</span>
            </div>
            <div>
              <span className="text-2xl font-bold tabular-nums">5</span>{" "}
              <span className="text-muted-foreground">producttypes</span>
            </div>
            <div>
              <span className="text-2xl font-bold tabular-nums">4</span>{" "}
              <span className="text-muted-foreground">scenario&apos;s</span>
            </div>
          </div>
          <LastUpdated
            date={DATA_LAST_UPDATED}
            className="mt-6 text-sm text-muted-foreground"
          />
        </div>
      </section>

      <Suspense fallback={<div className="container py-8" />}>
        <ProductDirectory products={products} />
      </Suspense>
    </>
  );
}
