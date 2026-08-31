# Augustus 2026 — hoe nazien

Terugwerkende dagelijkse mening, weekdagen 3–31 augustus. Geen
vooruitkijken. Elk cijfer is de laatste waarneming ≤ die dag.

## Ingang

| Wat | Waar |
|---|---|
| Tabel in de krant | `/nazien` |
| Zelfde tabel als JSON | `/api/v1/nazien` |
| Rekenblad (commit) | `redactie/mening/2026-08-ledger.json` |
| Stukken | `/stuk/mening-2026-08-XX` · 31 augustus: `/stuk/vat-liegt-minder-dan-de-index` |
| Bron-CSV’s | `redactie/data/` |

## Regel

1. Peildatum publicatie: 31 augustus 2026.
2. Per reeks: `lastOnOrBefore(reeks, peildatum)`. Datums lopen niet gelijk.
3. Afgeleiden (reële 10-jaars, spread): `lastCommonDate` van de gebruikte
   reeksen. Geen twee datums van elkaar aftrekken.
4. M2 tot en met 24 augustus: editievloer `fred_M2SL_2019-2026.csv` (juni
   23.155,2 · +5,53 % j/j).
5. M2 vanaf 25 augustus: `fred_M2SL_vintage_2026-08-31.csv` (H.6 25-08;
   juli 23.218,0 · +5,41 % SA). Juni in die vintage is herzien tot
   23.115,2. Die revisie overschrijft de editievloer **niet**.
6. Weekends 1–2, 8–9, 15–16, 22–23, 29–30 augustus: geen stuk, geen
   verzonnen rij.

## Regenereren

```bash
npx vite-node -c vitest.config.ts scripts/dump-august-ledger.ts
```

Het JSON-bestand moet gelijk blijven aan `buildAugustLedger()` — dat toetst
`tests/august.test.ts`.
