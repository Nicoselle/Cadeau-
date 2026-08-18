# Meetrapport — de Belgische poot en de ECB-herkansing (2026-08-17, tweede werkronde)

Vervolg op `bronnenstaat-2026-08-17.md` en `proefstuk-2026-08-17.md`. Twee doelen uit mijn
vorige verslag: (1) Statbel-CPI alsnog binnenhalen, (2) de ECB-CSV-API herkansen.

## Resultaat 1 — Statbel: BINNEN, via de bestat-API (JSON)

De route die werkt, gevonden in drie stappen:
- De datasetpagina (`statbel.fgov.be/en/open-data/consumer-price-index-and-health-index`) zet
  een **CAPTCHA** voor de crawler — dood voor automatisch gebruik (bon: ±21:06Z, "testing whether
  you are a human visitor").
- De API-catalogus `bestat.statbel.fgov.be/bestat/api/views` antwoordt wél: volledige lijst
  van ~200 KB met alle gepubliceerde views (bon: ±21:07Z).
- Daarin de view `6354a929-6969-4172-8143-e57aab550cc3` ("Consumptieprijsindex, inflatie,
  gezondheidsindex, afgevlakte index, indexen zonder petroleum en energie, laatste 13 maanden").
  De **JSON-export** (`…/result/JSON`) leverde de volledige tabel (bon: ±21:09Z); de
  CSV-export faalde op content-type. JSON is dus de standaardroute voor Statbel.

Data opgeslagen als `data/statbel_cpi_gezondheidsindex_2025-07_2026-07.csv` (basis 2025=100;
bronwaarden droegen float-ruis zoals 100.15000000000036, afgerond op 2 decimalen zoals Statbel
zelf publiceert — dit is de enige bewerking).

### Kerncijfers België (juli 2026, j/j tenzij anders vermeld)

| Reeks | jul 2025 | jul 2026 | j/j |
|---|---|---|---|
| Consumptieprijsindex (globaal) | 100,04 | 103,60 | **+3,6%** |
| Gezondheidsindex | 100,02 | 103,24 | **+3,2%** |
| Afgevlakte gezondheidsindex | 97,58 | 100,77 | +3,3% |
| Kerninflatie (excl. energie, voeding, alcohol, tabak) | 100,15 | 103,83 | **+3,7%** |
| Energiedragers | 98,93 | 109,41 | **+10,6%** |

Ter controle uit de tweede, onafhankelijke route: Belgische HICP via FRED
(`CP0000BEM086NEST`, opgeslagen als `data/fred_HICP_BE_2019-2026.csv`, bon ±21:07Z):
juni 2026 103,21 vs juni 2025 99,87 = **+3,3% j/j**. Nationale CPI en HICP meten net iets
anders; de ordegrootte klopt over beide routes.

### Wat dit betekent voor het proefstuk (aanvulling, geen herschrijving)

De Belgische poot die in het proefstuk ontbrak, is er nu, en hij verscherpt het beeld:
België zit met 3,6% **boven** de eurozone (2,9%) en zelfs boven de VS (3,3%), met een
kerninflatie van 3,7% en energie die na de val van 2025 weer +10,6% j/j doet. Voor de
Oostenrijkse duiding is de gezondheidsindex het interessantst: de afgevlakte index (basis van
de automatische loonindexering) steeg in twaalf maanden van 97,58 naar 100,77. De indexering
beschermt de nominale lonen, maar institutionaliseert daarmee de doorgifte van de
geldontwaarding in de hele loonstructuur — de inflatiebelasting wordt niet afgeschaft maar
rondgepompt, en wie buiten de indexmechanismen valt (spaarders, renteniers, kleine
verhuurders) draagt de rekening. *[Duiding = interpretatie, geen feit.]*

**Niet gezien:** de actuele spilindexdrempel. Die staat niet in deze view; zonder die waarde
doe ik geen uitspraak over wanneer de volgende overschrijding valt.

## Resultaat 2 — ECB-CSV-API: blijft dood, drie varianten getest

Alle op ±21:05Z:
- `data-api.ecb.europa.eu/...?format=csvdata` → CRAWL_UNEXPECTED_CONTENT_TYPE (herbevestigd);
- `...?format=jsondata` → CRAWL_UNEXPECTED_CONTENT_TYPE;
- legacy `sdw-wsrest.ecb.europa.eu` → CRAWL_UNKNOWN_ERROR;
- legacy `sdw.ecb.europa.eu/quickviewexport.do?...&type=csv` → CRAWL_UNKNOWN_ERROR.

Opmerkelijk: bestat-JSON kwam wél door terwijl ECB-JSON werd geweigerd — de blokkade zit dus
bij hoe de ECB-API zijn content-type/headers serveert, niet bij JSON als zodanig. *[Vermoeden.]*
Conclusie: voor machineleesbare eurozone-reeksen blijft de FRED-spiegel de route; de
ECB-homepage blijft bruikbaar voor headline-cijfers. Definitieve oplossing blijft de
netwerkbeleid-aanpassing (zie bronnenstaat).

## Kosten deze ronde
Geschat €0,15–€0,25 (7 fetches waarvan 1 grote, plus verwerking) — onder de €0,50-mediaan.
Schatting, geen meting.
