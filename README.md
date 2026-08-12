# Cadeau — Noodvoedsel-directory

Een filterbare productdirectory voor noodvoedsel (emergency food kits & long-term
food storage). Gebouwd om zowel mensen als AI-agents snel het beste
noodvoedselpakket te laten vinden op basis van calorieën, houdbaarheid, prijs,
dieet en scenario.

Unieke maatstaven: **prijs per 100 kcal**, een **transparante Resilience Score**,
**scenario-filters** en **beschikbaarheid in Nederland, België, EU en Zweden**.
Markt en prijzen zijn georiënteerd op de **Benelux/EU** (bedragen in **EUR**).

> ⚠️ **Echte producten, echte links.** De dataset bevat 9 producten die
> daadwerkelijk in NL/BE/EU te koop zijn, met **live geverifieerde
> retailerlinks** (o.a. Prepshop.nl, Goedvoorbereid.nl, Darkshop.nl,
> Allprepare.com, Outdoor-food.nl, RealHikingFood.nl, Armed.eu,
> Freezedriedandco.com). Naam, retailer, prijs (EUR), totale calorieën en
> houdbaarheid zijn van de winkelpagina gelezen (~2026-08-12). Sommige velden
> (bv. eiwit in gram, waterbehoefte) worden zelden vermeld en zijn **geschat en
> als zodanig gemarkeerd** in `src/data/products.ts`. Prijzen en voorraad
> wijzigen — **controleer altijd bij de retailer vóór aankoop.**

---

## Tech-stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS** met shadcn/ui-stijl componenten (zelfstandig, geen runtime-dependency)
- Data: **hardcoded JSON** (geen backend, database of CMS in v1); afgeleide velden
  (kcal/dag, prijs per 100 kcal, Resilience Score) worden **berekend** — één bron van waarheid
- Filters & sortering volledig **client-side**, met **filterstatus in de URL** (deelbaar)
- **Vitest** unit-tests + **GitHub Actions** CI (lint, typecheck, test, build)
- **Deploy-klaar voor Vercel**

## Ontwikkelen & testen

```bash
npm run dev        # dev-server op http://localhost:3000
npm run lint       # ESLint (next lint)
npm run typecheck  # tsc --noEmit
npm test           # Vitest unit-tests (filtering, resilience, data/API)
npm run build      # productie-build
```

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
2. **Filters:** houdbaarheid, kcal/dag, prijs per 100 kcal, dieet, type, scenario,
   NL/BE/EU/Zweden + vrij zoeken — de **filterstatus staat in de URL**, dus een
   gefilterde weergave is deelbaar en bookmarkbaar (bv. `/?type=bar&nl=1`)
3. **Sorteren:** prijs per 100 kcal, totaalprijs, calorieën, houdbaarheid, Resilience Score
4. **Productdetailpagina** met stabiele URL `/product/[id]`, incl. **uitgesplitste
   Resilience Score** en genormaliseerde **kosten per 2000 kcal**
5. **Vergelijkingstabel** (`/compare`) voor 2–4 producten, met de beste waarde per rij gemarkeerd
6. **Responsief** ontwerp (mobiel → desktop)

De selectie voor vergelijken wordt bewaard in `localStorage`, zodat je selectie
behouden blijft tussen pagina's.

## Resilience Score (methodiek)

De score (0–100) is **niet handmatig toegekend** maar berekend uit een
financiële-ROI-model (zie `src/lib/resilience.ts`):

| Onderdeel | Bijdrage | Formule |
|---|---|---|
| Calorie-ROI | max 60 pt | `min(kcal/prijs ÷ 250, 1) × 60` |
| Levensduur | max 40 pt | `houdbaarheid ÷ 25 jaar × 40` |
| Logistieke penalty | −10 pt per stuk | −10 voor water, −10 voor hittebron |

Eindscore = `clamp(round(ROI + levensduur − penalty), 0, 100)`. Kern: hoeveel
calorieën krijg je per euro, hoe lang blijft het goed, en hoeveel gedoe kost de
bereiding.

De uitsplitsing is zichtbaar op elke productpagina en zit ook in de JSON-API,
zodat de score reproduceerbaar en uitlegbaar is voor mens én AI.

## GEO / AEO (machine-leesbaarheid)

Deze directory is geoptimaliseerd voor zowel zoekmachines als AI-agents:

- **Semantische HTML:** `<table>` voor overzichten en `<dl>`-definitielijsten voor specs
- **JSON-LD** `Product`-schema op elke productpagina, met specs (kcal, houdbaarheid,
  waterbehoefte) in zowel `description` als `additionalProperty`
- **`FAQPage` JSON-LD** + zichtbare FAQ-sectie per product (kcal, houdbaarheid,
  waterbehoefte, bereiding zonder heet water)
- **`ItemList` JSON-LD** op de overzichtspagina; **`WebSite` + `SearchAction`**
  (sitelinks-zoekvak) en **`BreadcrumbList`** op productpagina's
- **`/llms.txt`** — beknopte, machineleesbare gids voor AI-agents met links naar
  de API en alle producten
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
      "pricing": { "currency": "EUR", "price_eur": 109, "price_per_100kcal_eur": 2.13, "cost_per_2000kcal_eur": 42.59, "...": "..." },
      "specifications": { "shelf_life_years_min": 25, "resilience_score": 82, "resilience_breakdown": [], "available_in_netherlands": true, "available_in_belgium": true, "...": "..." },
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
│   ├── page.tsx                   # Overzicht + ItemList/WebSite JSON-LD
│   ├── product/[id]/page.tsx      # Detailpagina + Product/FAQ/Breadcrumb JSON-LD
│   ├── compare/page.tsx           # Vergelijkingstabel
│   ├── api/v1/products/route.ts   # JSON-endpoint (lijst)
│   ├── api/v1/products/[id]/route.ts
│   ├── llms.txt/route.ts          # /llms.txt (AI-gids)
│   ├── sitemap.ts                 # /sitemap.xml
│   ├── robots.ts                  # /robots.txt (staat AI-crawlers toe)
│   └── globals.css                # Tailwind + kleurpalet
├── components/
│   ├── ui/                        # Herbruikbare shadcn/ui-stijl primitives
│   ├── product-directory.tsx      # Client: filters, sortering, view, URL-sync
│   ├── product-filters.tsx        # Filterpaneel
│   ├── product-card.tsx           # Cardweergave
│   ├── product-table.tsx          # Tabelweergave
│   ├── compare-bar.tsx            # Zwevende vergelijkbalk
│   ├── resilience-score.tsx       # Cirkeldiagram voor de score
│   └── resilience-breakdown.tsx   # Uitsplitsing van de score
├── data/products.ts               # 9 echte NL/BE/EU-producten + retailerlinks (afgeleide velden berekend)
├── lib/
│   ├── filtering.ts               # Filter/sorteer-logica + URL-(de)serialisatie
│   ├── resilience.ts              # Transparante Resilience Score
│   ├── compare.ts                 # Gedeelde compare-state (useCompare hook)
│   ├── api.ts / product-schema.ts # API- en JSON-LD-serializers
│   └── utils.ts / site.ts
└── types/product.ts               # Product-datamodel

tests/                             # Vitest: filtering, resilience, data/API
.github/workflows/ci.yml           # CI: lint, typecheck, test, build
```

## Deployen op Vercel

1. Push de repository naar GitHub.
2. Importeer in Vercel — het framework (Next.js) wordt automatisch herkend.
3. Zet optioneel `NEXT_PUBLIC_SITE_URL` op je productie-domein.
4. Deploy. Geen verdere configuratie nodig (geen database of secrets).

## Licentie / disclaimer

Prototype met voorbeelddata voor demonstratiedoeleinden. Niet bedoeld als
voedings- of aankoopadvies.
