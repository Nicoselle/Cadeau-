# Kapitaalkrant

Zelfstandige Nederlandstalige investeerderskrant.
Cijfers met bon. Duiding met tegenwerping.

Editie 3 — *De 2-jaars hield de vrijdagprint* — peilt tot **1 september 2026**.
Nummer 1 en 2 blijven in het archief. Dit is geen beleggingsadvies.

---

## Wat dit is

Geen bot die ergens anders post, geen aggregator, geen live-koersen van een
broker. Een krant die op zichzelf staat:

- voorpagina met masthead, datavloer en voorpaginastuk
- folio’s met bonnen en waar nodig een steenman
- marktenpagina uit CSV’s (M2, CPI, HICP, rente, S&P, VIX, spilindex, VS-schuld)
- orakelboek met zeven toetsbare uitspraken
- methodepagina (bronnenladder, etiketten, wat we niet doen)
- publieke JSON-API
- gesloten clientlaag op `/safe` (HTTP-basic, `SAFE_PASSWORD`)

Lokaal en Vesting blijven bereikbaar, maar staan niet in de masthead.
Vesting: `/cadeau`.

## Tech-stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS** — broadsheet (Source Serif 4 / Newsreader / Source Sans 3)
- Data: redactie-CSV’s + getypte stukken, geen CMS
- **Vitest** + **GitHub Actions** (lint, typecheck, test, build)
- Deploy-klaar voor Vercel

## Ontwikkelen

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm test
npm run build
```

Optioneel: `NEXT_PUBLIC_SITE_URL` voor canonieke URL’s.
`SAFE_PASSWORD` voor `/safe` — leeg of ontbrekend geeft 401, nooit open.

## Rubrieken

| Pad | Inhoud |
|---|---|
| `/` | Voorpagina, huidige editie |
| `/stuk/[slug]` | Stuk met cijfers, bonnen, steenman |
| `/markten` | Datavloer |
| `/safe` | Safe Capital (wachtwoord). Allocatie A–G en volglijst |
| `/piramide` `/volgen` `/onderzoek` `/smc` | Zelfde poort; doorverwijzing naar `/safe` |
| `/orakelboek` | Toetsbare uitspraken |
| `/desk/opinie` | De mening — dagelijks opiniestuk |
| `/nazien` | Augustus 2026: peil per weekdag, met bestand |
| `/methode` | Huisregels |
| `/briefing` | Dagelijkse redactiebriefing (niet in de kop) |
| `/archief` | Alle genummerde edities |
| `/archief/[n]` | Het nummer zelf, zoals het verscheen |
| `/desk/vs` `/desk/eurozone` `/desk/belgie` | Geografie in de stukken |
| `/lokaal` | Andere desk — vraaggestuurd lokaal |
| `/cadeau` | Andere desk — Vesting |
| `/api/v1/krant` | Huidige editie als JSON |
| `/api/v1/archief` | Lijst van alle nummers |
| `/api/v1/archief/[n]` | Eén nummer als JSON |
| `/api/v1/nazien` | Augustus-ledger (peil per weekdag) |
| `/api/v1/briefing` | Briefing voor de 14:00-beslissing |
| `/api/v1/stukken` `/api/v1/markten` `/api/v1/volgen` | Deel-API’s |

## Redactieregels (kort)

1. Elk cijfer draagt een bon (URL, tijdstip, vintage waar die bestaat).
2. Seizoensgecorrigeerde reeksen worden altijd naast de NSA-tegenhanger gelegd.
3. «Kerninflatie» volgt de publicerende instelling. In België is dat **3,13%**
   (excl. energie en onbewerkte voeding), niet de eurozone-stijl 3,67%.
4. Feiten, duiding en ramingen blijven gescheiden.
5. Alleen Nico beslist om 14:00 (Brussel) of er een editie komt. Een bot
   mag daarna zetten; live pas na uitdrukkelijk ja. Zie `redactie/grokbot.md`.
6. Standen hebben een datum en een ongeldigverklaring. Geen koersdoel.

Zie `redactie/INDEX.md` voor de bronnenstaat en openstaande punten.

## Licentie / disclaimer

Journalistiek prototype op basis van publieke reeksen. Geen beleggingsadvies.
Controleer cijfers bij de primaire bron vóór u er iets mee doet.
