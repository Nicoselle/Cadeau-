# Kapitaalkrant

Zelfstandige Nederlandstalige investeerderskrant. Cijfers met bon. Duiding
met tegenwerping. Drie desks: Verenigde Staten, eurozone, België.

Editie 1 — *De kraan weer open* — peilt tot **18 augustus 2026**. Alle
marktcijfers zijn herberekend uit de opgeslagen reeksen in `redactie/data`.
Dit is geen beleggingsadvies.

---

## Wat dit is

Geen bot die ergens anders post, geen aggregator, geen live-koersen van een
broker. Een krant die op zichzelf staat:

- voorpagina met masthead, datavloer en voorpaginastuk
- zes stukken, elk met bonnen en waar nodig een steenman
- marktenpagina uit CSV’s (M2, CPI, HICP, rente, S&P, VIX, spilindex, VS-schuld)
- orakelboek met zeven toetsbare uitspraken
- piramide: uitleg investeringspiramide + volglijst met extra aandacht
- methodepagina (bronnenladder, etiketten, wat we niet doen)
- publieke JSON-API

De noodvoedsel-directory Vesting blijft bereikbaar op `/cadeau`.

## Tech-stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS** — krantenhuisstijl (Fraunces / Newsreader / IBM Plex Sans)
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

## Rubrieken

| Pad | Inhoud |
|---|---|
| `/` | Voorpagina, editie 1 |
| `/stuk/[slug]` | Stuk met cijfers, bonnen, steenman |
| `/markten` | Datavloer |
| `/piramide` | Investeringspiramide en volglijst (publieke tape) |
| `/orakelboek` | Toetsbare uitspraken |
| `/methode` | Huisregels |
| `/archief` | Edities |
| `/desk/vs` `/desk/eurozone` `/desk/belgie` | Desks |
| `/lokaal` | Vraaggerichte lokale ondernemersdesk |
| `/lokaal/verhaal` | Zaakvoerders sturen hun verhaal in |
| `/api/v1/krant` | Volledige editie als JSON |
| `/api/v1/stukken` `/api/v1/markten` `/api/v1/volgen` | Deel-API’s |

## Redactieregels (kort)

1. Elk cijfer draagt een bon (URL, tijdstip, vintage waar die bestaat).
2. Seizoensgecorrigeerde reeksen worden altijd naast de NSA-tegenhanger gelegd.
3. «Kerninflatie» volgt de publicerende instelling. In België is dat **3,13%**
   (excl. energie en onbewerkte voeding), niet de eurozone-stijl 3,67%.
4. Feiten, duiding en ramingen blijven gescheiden.
5. Alleen een mens duwt een nieuwe editie door.

Zie `redactie/INDEX.md` voor de bronnenstaat en openstaande punten.

## Licentie / disclaimer

Journalistiek prototype op basis van publieke reeksen. Geen beleggingsadvies.
Controleer cijfers bij de primaire bron vóór u er iets mee doet.
