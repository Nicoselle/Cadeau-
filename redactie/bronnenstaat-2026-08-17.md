# Bronnenstaat — 2026-08-17

Toetsing van de publieke bronnenladder van de Kapitaalkrant. De pack-versie van de ladder
(`00-BRONNEN.md`) was **niet zichtbaar** in deze werkruimte; getoetst is de vaste vijf uit de
rolomschrijving: FRED, Statbel, dataexplorer.nbb.be, ECB Data Portal, Stooq.

Belangrijk voor de leesbaarheid van dit rapport: de container waarin ik draai heeft een
netwerkbeleid dat **directe HTTPS-verbindingen naar alle vijf de bronnen blokkeert**
(proxy-gateway antwoordt 403 op CONNECT; bewijs: proxystatuslog 2026-08-17T20:56Z, host
`fred.stlouisfed.org:443` e.a., "policy denial"). Bereikbaarheid is daarom getoetst via de
Exa-crawler (indirecte route). "Bereikbaar" hieronder betekent: data of pagina daadwerkelijk
binnengehaald via die route.

## Per bron

### 1. FRED — BEREIKBAAR (via indirecte route)
- Bewijs: `https://fred.stlouisfed.org/graph/fredgraph.csv?id=M2SL&cosd=2019-01-01`
  opgehaald 2026-08-17 ±20:58Z; volledige CSV ontvangen, laatste waarneming 2026-06-01 (23.155,2 mld USD).
- Vier reeksen succesvol opgehaald (zie `data/`). Directe curl: dood (HTTP 000, proxy 403).

### 2. Statbel — BEREIKBAAR (portaalpagina; downloads niet getest werkend)
- Bewijs: `https://statbel.fgov.be/en/open-data` opgehaald 2026-08-17 ±20:58Z; pagina toont o.a.
  dataset "Consumer price index and health index, Period: since 1920" met TXT/XLSX-downloadlinks.
- Kanttekening: de eigenlijke bestanden zijn ZIP/XLSX; die kon ik via de crawler-route **niet**
  binnenhalen. Portaal leeft, dataophaling onbewezen.

### 3. dataexplorer.nbb.be — DOOD voor dataophaling
- Bewijs: `https://dataexplorer.nbb.be/` opgehaald 2026-08-17 ±20:58Z; de pagina laadt maar de
  applicatie zelf meldt "We are sorry, something went wrong. Please try again later."
- Het is een JavaScript-app (.Stat Suite); zonder browser-sessie geen data. Directe curl: dood (proxy 403).

### 4. ECB Data Portal — GEDEELTELIJK BEREIKBAAR
- Bewijs: `https://data.ecb.europa.eu/` opgehaald 2026-08-17 ±20:59Z; homepage leverde actuele
  kerncijfers: HICP-inflatie juli 2026 = 2,9%; M3-groei juni 2026 = 3,3%; €STR 14-08-2026 = 2,189%;
  USD/EUR 17-08-2026 = 1,1593; reëel bbp Q2 2026 = +0,4% k/k; werkloosheid juni 2026 = 6,3%;
  overheidsschuld Q1 2026 = 88,9% bbp.
- De CSV-API (`data-api.ecb.europa.eu/service/data/...?format=csvdata`) faalde via de crawler
  (CRAWL_UNEXPECTED_CONTENT_TYPE) én via directe curl (proxy 403). Machineleesbare reeksen dus
  onbereikbaar; alleen homepage-kerncijfers.

### 5. Stooq — DOOD
- Bewijs: `https://stooq.com/q/d/l/?s=^spx&i=d` — directe curl HTTP 000 (proxy 403,
  2026-08-17T20:56:42Z); crawler-route: CRAWL_EMPTY_CONTENT resp. "unknown error" op de quotepagina.
- Geen enkele route leverde iets op.

(Yahoo-CSV conform instructie niet getoetst: betaalmuur, we leunen er niet op.)

## Samenvatting

| Bron | Status | Route |
|---|---|---|
| FRED | bereikbaar | indirect (Exa), volledige CSV's |
| Statbel | portaal bereikbaar, downloads onbewezen | indirect |
| NBB dataexplorer | dood | app-fout; geen route werkt |
| ECB Data Portal | homepage-cijfers ja, CSV-API nee | indirect |
| Stooq | dood | geen route werkt |

## Structureel punt voor Nico
Het netwerkbeleid van deze omgeving blokkeert alle databronnen voor directe toegang. Eén
beleidswijziging (deze vijf domeinen op de toelatingslijst van de omgeving zetten) maakt de hele
ladder direct en betrouwbaar bereikbaar, inclusief de nu dode ECB-CSV-API en Stooq. Tot dan werkt
alleen de indirecte route, en die is beperkt (geen ZIP/XLSX, geen niet-HTML content-types, geen
JavaScript-apps).
