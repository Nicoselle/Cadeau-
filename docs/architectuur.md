# Azimut — technische architectuur

## Beslissing: in-house engines, API-ready

De MVP berekent alle vier de lagen lokaal in TypeScript. Externe astrologie-API's
(Human Design Hub, AstrologyAPI, RoxyAPI) blijven een geldige productieroute
wanneer volume, DST-edge-cases of officiële BG5-visuals dat eisen. De
synthese-laag is daarvan ontkoppeld: zij consumeert alleen genormaliseerde
structs (`RaeResult`, `BaziResult`, `NumerologyResult`, `DesignResult`).

```
intake → parseIntake
      → RAE (land × maand)
      → BaZi (zonneboog + sexagenary)
      → numerologie (naam + datum + jaarcyclus)
      → Human Design (astronomy-engine, 88° design)
      → synthesize() → Briefing
```

## Astronomische engine

`astronomy-engine` levert tropische eclipticale lengtes (DE-kwaliteit, geen
Swiss Ephemeris). Design-moment = `SearchSunLongitude(sun − 88°)`. Poorten
volgen het standaard Rave-wiel vanaf 02° Waterman (Gate 41). Type en autoriteit
komen uit gedefinieerde kanalen, niet uit een LLM.

Productiekloof versus Swiss Ephemeris / timezonefinder:

- Historische DST dekt EU- en VS-regels, geen lokale uitzonderingen.
- Geocoding is een gecureerde stedenlijst, geen Nominatim.
- Omgevingsstijl (solo/penta/OC16) is een BG5-heuristiek, geen gelicentieerde Penta.

## Opslag en caching (fase 2)

Geboortekaarten zijn immutable. Productie: PostgreSQL JSONB + Redis-sleutel
`natal_${date}_${time}_${lat}_${lng}`. De huidige MVP slaat niets op; het
dossier leeft in `sessionStorage`.

## LLM-laag (fase 2)

De synthese is deterministisch zodat tests de research-matrix kunnen vastzetten.
Een later LLM-pass (Claude/OpenAI + optioneel Qdrant RAG op BG5-literatuur)
herschrijft alleen het proza, niet de variabelen.

## API

`POST /api/v1/briefing` — JSON in, briefing uit. Geen auth in de MVP.
PII verlaat de request niet naar een derde partij.
