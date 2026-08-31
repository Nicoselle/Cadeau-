# INDEX — waar alles staat (Kapitaalkrant-redactiemap)

Aangelegd door Zetter op 2026-08-18, na negen werkrondes. **Dit is de ene ingang.** Wie hier
begint — mens of bot — hoeft niets dubbel te doen. Bijhoudplicht: elke werkronde die een
bestand toevoegt of een versie vervangt, werkt deze index bij in dezelfde commit.

---

## 1. Geldende versies (bij twee versies wint de onderste niet: kijk hier)

| Onderwerp | GELDT | Vervangen/voorloper |
|---|---|---|
| Releasekalender | `voorstel-releasekalender-v2.yaml` (geverifieerde data) | `voorstel-releasekalender.yaml` (v1, schattingen) |
| Proefstuk | `proefstuk-2026-08-17-v2.md` (drie blokken VS/EZ/BE) | `proefstuk-2026-08-17.md` (v1, zonder Belgische poot) |
| Kernmaat-België-etiket | kerninflatie = **3,13%** (Statbel-definitie); 3,67% is de eurozone-stijl maat — zie `meetrapport-2026-08-17-kalendertoets.md` §3 | de "kerninflatie 3,7%" in proefstuk v1/v2 en het meetrapport Belgische poot draagt het **oude, onjuiste etiket** |
| Centenindex-formulering | cumulatieve 2%-grens; plafond €2.000 geldt óók pensioenen — zie `dossier-2026-08-17-centenindex-stand.md` | de statische formulering "2% op de schijf" in eerdere stukken |
| Stand centenindex | **wet, in werking sinds 01-06-2026** (dossier centenindex) | de aprilstand "nog niet van kracht" in `dossier-2026-08-17-indexcommissie-april.md` §"Wat nog uitgezocht" |
| Yahoo-oordeel | quotepagina werkt, dataroutes dood, account lost niets op — `bronnenstaat-2026-08-18-yahoo.md` + `notitie-2026-08-18-geen-account.md` | de kale regel "betaalmuur" in de rolprompt |
| M2-editievloer | `data/fred_M2SL_2019-2026.csv` juni **23.155,2 · +5,53%** — geldt in editie 1 en 2 | vintage 31-08 herziet juni tot 23.115,2; die revisie overschrijft de editie **niet** |
| M2-vintage 31-08 | `data/fred_M2SL_vintage_2026-08-31.csv` + `fred_M2NS_vintage_2026-08-31.csv` — juli 23.218,0 · +5,41% SA / +5,43% NSA (H.6 25-08) | alleen in de dagelijkse mening vanaf 2026-08-25 |
| Augustus-nazien | `/nazien` + `mening/2026-08-ledger.json` — peil = laatste waarneming ≤ die dag | geen weekend verzonnen; 31 augustus blijft `vat-liegt-minder-dan-de-index` |
| Peilregel publicatie | 31 augustus 2026. Per reeks laatste waarneming; afgeleiden alleen op laatste gemeenschappelijke datum (`lastCommonDate`) | twee datums van elkaar aftrekken |

De verslagen (`verslag*.md`, a t/m 18b) zijn een **chronologisch logboek** — die vervangen
elkaar nooit. Zelfde geldt voor `registers/overdrachten.jsonl` (10 regels, append-only).

## 2. Onderwerpenkaart — "waar staat wat over…"

| Vraag | Kijk in |
|---|---|
| Welke bron is bereikbaar, via welke route? | `bronnenstaat-2026-08-17.md` (de vijf ladderbronnen) + `bronnenstaat-2026-08-18-yahoo.md` + `bronnenstaat-2026-08-18b-nieuwe-kanalen.md` (Treasury, Eurostat, Euronext, World Bank) — samen dekkend, geen overlap |
| Wanneer publiceert welke bron? | `voorstel-releasekalender-v2.yaml` (of `scripts/zetter.py agenda`) |
| Belgische inflatie/gezondheidsindex | `meetrapport-2026-08-17-belgische-poot.md` (route + cijfers) — etiketcorrectie in kalendertoets §3 |
| Spilindex, drempels, indexering | `meetrapport-2026-08-17-spilindex.md` (vondst) + `dossier-2026-08-17-centenindex-stand.md` (wettelijke stand, geldend) |
| Indexcommissie-conflict april 2026 | `dossier-2026-08-17-indexcommissie-april.md` — sterkste stukkandidaat; ontknoping in het centenindex-dossier |
| M2 / Amerikaanse geldgroei (incl. methodologiebreuk 28-07-2026) | `meetrapport-2026-08-17-kalendertoets.md` §2 |
| Lange rente, spread, breakevens | `meetnotitie-2026-08-17-lange-rente.md` + 30-jaars/S&P/VIX-aanvulling in `bronnenstaat-2026-08-18-yahoo.md` §bijvangst |
| Amerikaanse staatsschuld & rentelast | `bronnenstaat-2026-08-18b-nieuwe-kanalen.md` (Treasury FiscalData) |
| Toetsbare uitspraken + vervaldagen | `registers/orakelboek.md` (7 regels + logboek) |
| Dagelijkse editieklok (13/14/15 Brussel) | `grokbot.md` + `/api/v1/briefing` + `beslissingen/` |
| Augustus 2026 dag voor dag, met bon? | `/nazien` · `mening/LEESMIJ.md` · `mening/2026-08-ledger.json` |
| Wat is er per ronde gebeurd? | `registers/overdrachten.jsonl` (kort) of de verslagen (volledig) |
| Rolprompt-verbeteringen | `voorstel-rolpromptreparatie-zetter.md` (7 punten) + Yahoo-aanscherping in `verslag-2026-08-18.md` §aanbeveling |
| Waarom geen accounts? | `notitie-2026-08-18-geen-account.md` |

## 3. Datavloer (`data/`; controle: `python3 scripts/zetter.py dekking`)

Dagreeksen DGS10, DGS30, T10YIE, SP500 en VIX zijn op 2026-08-31
verlengd (bestaande rijen niet overschreven). M2-editievloer ongewijzigd;
vintage ernaast.

| Bestand | Reeks | Loopt t/m | Route |
|---|---|---|---|
| fred_M2SL / fred_M2NS | M2 VS editievloer (SA/NSA — altijd samen duiden) | 2026-06 | FRED |
| fred_M2SL_vintage_2026-08-31 / fred_M2NS_vintage_2026-08-31 | M2 VS vintage H.6 25-08 (juni herzien, juli erbij) | 2026-07 | FRED 31-08 |
| fred_CPIAUCSL | CPI VS (let op: 2025-10 ontbreekt in bron) | 2026-07 | FRED |
| fred_DFF_breekpunten | beleidsrente VS (breekpunten; **tegelbron**) | 2026-08-14 | FRED |
| fred_DFF_2026-07_2026-08 | DFF dagreeks (controle, geen tegel) | 2026-08-28 | FRED 31-08 |
| fred_DGS10 / fred_DGS30 | 10j/30j rente VS | 2026-08-27 / 08-27 | FRED |
| fred_T10YIE | 10j breakeven | 2026-08-28 | FRED |
| fred_SP500 / fred_VIXCLS | S&P 500 / VIX | 2026-08-28 / 08-27 | FRED |
| fred_DCOILBRENTEU / fred_DCOILWTICO | Brent / WTI, dollar per vat | 2026-08-25 | FRED (EIA), dagreeks |
| fred_PCOPPUSDM | Koper, dollar per metrische ton | 2026-07 | FRED (IMF), maandreeks |
| fred_PURANUSDM | Uranium, dollar per pond | 2026-07 | FRED (IMF), maandreeks |
| fred_HICP_EZ / fred_HICP_BE | HICP eurozone/België | 2026-06 | FRED-spiegel (verser dan Eurostat-API!) |
| statbel_cpi_gezondheidsindex | CPI, gezondheidsindex, afgevlakt, energie (BE) | 2026-07 | Statbel bestat-JSON |
| treasury_debt_to_penny | staatsschuld VS per dag | 2026-08-13 | Treasury FiscalData |
| treasury_rentelast | rentelastcomponenten VS (géén tijdreeks — staat daarom niet in `dekking`; géén totaal, zie kop in het bestand) | boekjaar t/m 2026-07 | Treasury FiscalData |

**Gat in de vloer:** BEL 20 (alleen Yahoo-quotepagina, niet machineleesbaar), eurozone-M3
(alleen bekendmaking ECB-startpagina) en vrachttarieven (nog geen reeks). Olie, koper en
uranium liggen sinds 31 augustus 2026 in de vloer.

## 4. Registers & gereedschap
- `registers/orakelboek.md` — 7 toetsbare uitspraken; eerstvolgende toets **05-10-2026** (regel 1).
- `registers/overdrachten.jsonl` — append-only logboek van alle rondes.
- `scripts/zetter.py` — `agenda` / `jj` / `dekking`; rekent alleen met opgeslagen data, haalt niets op.
- `grokbot.md` — dagelijkse zetter. Briefing 13:00, beslissing Nico 14:00, stuk 15:00. Standaard: *De mening* (vroegere Knack). Publiceert niet.
- `beslissingen/` — JSON per dag. `voorbeeld.json` telt niet als beslissing.
- `mening/` — ledger augustus 2026 + `LEESMIJ.md`. Regenereren: `npx vite-node -c vitest.config.ts scripts/dump-august-ledger.ts`.

## 5. Openstaande punten (dé lijst — nergens anders zoeken)
1. **Eurostat-opvolgerdataset** vinden (COICOP-2018; oude codes stopgezet, lopen t/m 2025-12).
2. **World Bank** opnieuw proberen (2× timeout, niet dood verklaard).
3. **Indexcommissie 2013** — historisch anker bij het aprildossier.
4. **KB berekeningswijze geconsolideerde loonmatigingsbijdrage** — bestond nog niet t.t.v. NAR-advies.
5. **Kalender v3** opstellen bij de wekkerronde van 26-08 (Treasury, Eurostat-voorbehoud, marktreeksen, Yahoo-quoteroute erin).
6. Bij Nico: **netwerkbeleid** (domeinen toelaten) en **ladder uitbreiden** (plan.be, Treasury).
7. Pack blijft onzichtbaar; alle registers hier zijn vervangers tot het er is.

## 6. Wekkers (staan al — niet opnieuw zetten)
| Wanneer | Trigger | Doet |
|---|---|---|
| 26-08-2026 09:00Z | `trig_01Td9VdhWUqqHDx2myfq5kMC` | M2-release (25-08), rentemeting verlengen, kalenderchecks |
| 29-08-2026 09:00Z | `trig_01Lkgk5aCM8jVwouAMzzhWxT` | Statbel-augustus (28-08), spilindexafstand, kernmaat met etiket; zet vervolgwekkers 08-09 en 11-09 |

## 7. Regels tegen dubbel werk
1. **Begin elke ronde met deze index** en `zetter.py agenda` — niet met zoeken.
2. Vóór een nieuwe ophaling: check `dekking` of de reeks er al ligt en tot wanneer.
3. Vóór een nieuw onderzoek: check §2 en §5 — als het er staat, verláng het bestaande bestand
   niet met een kopie maar bouw erop voort met verwijzing.
4. Nieuwe versie? Oude blijft staan, index §1 wijst de geldende aan — in dezelfde commit.
