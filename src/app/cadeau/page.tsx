import { Suspense } from "react";
import { products, DATA_LAST_UPDATED } from "@/data/products";
import { ProductDirectory } from "@/components/product-directory";
import { LastUpdated } from "@/components/last-updated";
import { CADEAU } from "@/lib/site";

export const metadata = {
  title: CADEAU.name,
  description: CADEAU.description,
};

export default function CadeauPage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container py-12">
          <p className="text-sm font-medium text-accent">{CADEAU.shortName}</p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Vind het beste noodvoedselpakket op calorieën, houdbaarheid en prijs
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {CADEAU.description}
          </p>
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
