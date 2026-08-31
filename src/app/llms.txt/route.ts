import { products, DATA_LAST_UPDATED } from "@/data/products";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `Laatst bijgewerkt: ${DATA_LAST_UPDATED}. Prijzen in EUR (Benelux/EU-markt).`,
    "Let op: voorbeelddata voor demonstratie — verifieer bij de leverancier.",
    "",
    "## Keuze — Decision Intelligence",
    `- Catalogus: ${SITE.url}/keuze`,
    `- Architectuurrapport: ${SITE.url}/keuze/architectuur`,
    `- Ledger: ${SITE.url}/keuze/ledger`,
    `- Beslissingen (JSON): ${SITE.url}/api/v1/keuze/decisions`,
    `- Evalueren (POST JSON): ${SITE.url}/api/v1/keuze/evaluate`,
    "",
    "## Data & API",
    `- Alle producten (JSON): ${SITE.url}/api/v1/products`,
    `- Eén product (JSON): ${SITE.url}/api/v1/products/{id}`,
    `- Sitemap: ${SITE.url}/sitemap.xml`,
    "",
    "De API geeft per product: pricing (EUR, prijs per 100 kcal, kosten per 2000 kcal),",
    "specifications (houdbaarheid, Resilience Score + breakdown, beschikbaarheid NL/BE/EU/Zweden),",
    "nutritional_data (kcal, kcal/dag, eiwit), preparation_requirements en suitability_scenarios.",
    "",
    "## Producten",
    ...products.map(
      (p) => `- [${p.brand} ${p.name}](${SITE.url}/product/${p.id})`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
