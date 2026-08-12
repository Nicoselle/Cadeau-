# Cadeau — Noodvoedsel-directory

Een filterbare productdirectory voor noodvoedsel (emergency food kits & long-term
food storage). Gebouwd om zowel mensen als AI-agents snel het beste
noodvoedselpakket te laten vinden op basis van calorieën, houdbaarheid, prijs,
dieet en scenario.

Unieke maatstaven: **prijs per 100 kcal**, een **Resilience Score**,
**scenario-filters** en **EU/Zweden-beschikbaarheid**.

> ⚠️ **Voorbeelddata.** Op de gedocumenteerde Mountain House "Just in Case"
> 3-Day (SKU `mh-83608`) na bevat de dataset plausibele, illustratieve waarden
> voor demonstratie. Controleer specificaties en prijzen bij de leverancier vóór
> aankoop.

---

## Tech-stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS** met shadcn/ui-stijl componenten (zelfstandig, geen runtime-dependency)
- Data: **hardcoded JSON** (geen backend, database of CMS in v1)
- Filters & sortering volledig **client-side**
- **Deploy-klaar voor Vercel**

## Snel starten

```bash
# 1. Dependencies installeren
npm install

# 2. Development-server starten
npm run dev
# open http://localhost:3000

# 3. Productie-build maken en draaien
npm run build
npm run start
```

Optioneel: zet `NEXT_PUBLIC_SITE_URL` om de absolute URL's in JSON-LD, sitemap en
robots te overschrijven (standaard `https://cadeau.example.com`).

```bash
NEXT_PUBLIC_SITE_URL=https://mijn-domein.nl npm run build
```

## Functionaliteit (MVP)

1. **Overzichtspagina** (`/`) met alle producten in **card-** én **tabelweergave**
2. **Filters:** houdbaarheid, kcal/dag, prijs per 100 kcal, dieet, type, scenario, EU/Zweden + vrij zoeken
3. **Sorteren:** prijs per 100 kcal, totaalprijs, calorieën, houdbaarheid, Resilience Score
4. **Productdetailpagina** met stabiele URL `/product/[id]`
5. **Vergelijkingstabel** (`/compare`) voor 2–4 producten, met de beste waarde per rij gemarkeerd
6. **Responsief** ontwerp (mobiel → desktop)

De selectie voor vergelijken wordt bewaard in `localStorage`, zodat je selectie
behouden blijft tussen pagina's.

## GEO / AEO (machine-leesbaarheid)

Deze directory is geoptimaliseerd voor zowel zoekmachines als AI-agents:

- **Semantische HTML:** `<table>` voor overzichten en `<dl>`-definitielijsten voor specs
- **JSON-LD** `Product`-schema op elke productpagina, met specs (kcal, houdbaarheid,
  waterbehoefte) in zowel `description` als `additionalProperty`
- **`FAQPage` JSON-LD** + zichtbare FAQ-sectie per product (kcal, houdbaarheid,
  waterbehoefte, bereiding zonder heet water)
- **`ItemList` JSON-LD** op de overzichtspagina
- Zichtbare **"Laatst bijgewerkt: [datum]"** op elke pagina
- **Publieke JSON-API** (zie hieronder)
- **XML-sitemap** (`/sitemap.xml`) en **`robots.txt`** die grote AI-crawlers
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) expliciet toelaten

## Publieke JSON-API

Read-only, statisch gegenereerd, CORS open (`Access-Control-Allow-Origin: *`).

| Endpoint | Beschrijving |
|---|---|
| `GET /api/v1/products` | Alle producten |
| `GET /api/v1/products/[id]` | Eén product (404 met JSON-body bij onbekende id) |

Responsestructuur:

```jsonc
{
  "meta": {
    "status": "ok",
    "last_updated": "2026-08-01",
    "endpoint_version": "v1",
    "endpoint": "/api/v1/products"
  },
  "data": [
    {
      "id": "mh-83608",
      "name": "Just in Case 3-Day Emergency Food Supply",
      "brand": "Mountain House",
      "pricing": { "price_usd": 98, "price_per_100kcal_usd": 1.91, "...": "..." },
      "specifications": { "shelf_life_years_min": 25, "resilience_score": 72, "...": "..." },
      "nutritional_data": { "total_calories": 5118, "calories_per_day": 1706, "...": "..." },
      "preparation_requirements": { "water_required": true, "total_water_liters": 2.84, "...": "..." },
      "suitability_scenarios": [{ "code": "72_HOUR_KIT", "label": "72-uurs kit" }]
    }
  ]
}
```

## Projectstructuur

```
src/
├── app/
│   ├── layout.tsx                 # Root layout, metadata, header/footer
│   ├── page.tsx                   # Overzicht + ItemList JSON-LD
│   ├── product/[id]/page.tsx      # Detailpagina + Product/FAQ JSON-LD
│   ├── compare/page.tsx           # Vergelijkingstabel
│   ├── api/v1/products/route.ts   # JSON-endpoint (lijst)
│   ├── api/v1/products/[id]/route.ts
│   ├── sitemap.ts                 # /sitemap.xml
│   ├── robots.ts                  # /robots.txt (staat AI-crawlers toe)
│   └── globals.css                # Tailwind + kleurpalet
├── components/
│   ├── ui/                        # Herbruikbare shadcn/ui-stijl primitives
│   ├── product-directory.tsx      # Client: filters, sortering, view, compare-state
│   ├── product-filters.tsx        # Filterpaneel
│   ├── product-card.tsx           # Cardweergave
│   ├── product-table.tsx          # Tabelweergave
│   ├── compare-bar.tsx            # Zwevende vergelijkbalk
│   └── resilience-score.tsx       # Cirkeldiagram voor de score
├── data/products.ts               # 10 voorbeeldproducten
├── lib/                           # utils, filtering, API- en schema-serializers
└── types/product.ts               # Product-datamodel
```

## Deployen op Vercel

1. Push de repository naar GitHub.
2. Importeer in Vercel — het framework (Next.js) wordt automatisch herkend.
3. Zet optioneel `NEXT_PUBLIC_SITE_URL` op je productie-domein.
4. Deploy. Geen verdere configuratie nodig (geen database of secrets).

## Licentie / disclaimer

Prototype met voorbeelddata voor demonstratiedoeleinden. Niet bedoeld als
voedings- of aankoopadvies.
