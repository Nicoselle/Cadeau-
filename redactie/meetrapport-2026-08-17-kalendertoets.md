# Meetrapport — kalendertoets, M2-methodologiebreuk en één correctie (2026-08-17, vijfde werkronde)

Doel: de velden die in `voorstel-releasekalender.yaml` op "te verifiëren" stonden, vervangen
door echte publicatiedata. Onderweg stuitte ik op een methodologiewijziging die mijn eigen
proefstuk raakt, en op één etiketfout van mezelf.

## 1. De geverifieerde publicatiekalenders (feiten)

**BLS — Amerikaanse CPI** (bon: `bls.gov/schedule/news_release/cpi.htm` en het CPI-persbericht
zelf, ±21:58Z). Vaste data, 08:30 ET:

| Verslagmaand | Publicatie |
|---|---|
| juli 2026 | 12 augustus 2026 (verschenen) |
| augustus 2026 | **11 september 2026** |
| september 2026 | 14 oktober 2026 |
| oktober 2026 | 10 november 2026 |
| november 2026 | 10 december 2026 |

**Fed — H.6 Money Stock (M2)** (bon: FRED-releasekalender rid=21, ±21:58Z). Vaste dinsdagen,
12:00 US Central: 25 augustus, 22 september, 27 oktober, 24 november, 22 december 2026.
Mijn eerder op gevoel gezette checkdatum van 26 augustus blijkt dus juist te liggen — één dag
ná de release.

**Statbel — CPI/gezondheidsindex** (bon: `statbel.fgov.be/nl/calendar` via zoekindex, ±21:59Z):
publicatie op het einde van de verslagmaand zelf — juli 2026 verscheen op 30 juli;
**28 augustus 2026** voor augustus; 27 november voor november. De geharmoniseerde index (HICP)
volgt apart en later: 15 oktober voor september, 17 november voor oktober.

Bijvangst uit dezelfde kalender, twee feiten die de reeksen verklaren:
- januari 2026: Statbel zette het referentiejaar van de CPI om naar **2025 = 100** (verklaart
  waarom mijn reeks op die basis staat);
- 29 april 2026: "Indexcommissie bereikt geen consensus met betrekking tot de
  Consumptieprijsindex van april 2026" — precies de maand met de energiesprong (+12,59 index).
  Dat verdient later uitzoeken; ik noteer het, ik duid het nog niet.

## 2. Methodologiebreuk in M2 — getoetst, signaal houdt stand

De Fed kondigde aan (bon: `federalreserve.gov/feeds/h6.html`, aankondiging 23 juni 2026,
opgehaald ±21:58Z) dat **vanaf de H.6-release van 28 juli 2026** IRA- en Keogh-saldi niet meer
op componentniveau maar op aggregaatniveau uit M2 worden genetteerd. Gevolg volgens de Fed:
niet-gecorrigeerde M2 blijft ongewijzigd, **seizoensgecorrigeerde M2 krijgt kleine revisies**.

Mijn proefstuk steunt op M2SL — de gecorrigeerde reeks. Dus getoetst tegen M2NS (bon: FRED
`M2NS`, opgehaald ±21:58Z, opgeslagen als `data/fred_M2NS_2024-2026.csv`):

| Maat | juni 2026 j/j | december 2025 j/j |
|---|---|---|
| M2SL (gecorrigeerd) | +5,53% | +4,04% |
| M2NS (ongecorrigeerd) | **+5,55%** | +4,09% |

De versnelling van ~4% naar ~5,5% staat in beide reeksen, ook in de reeks die de
methodologiewijziging níet raakt. **Het signaal is geen artefact.** Wel geldt: de
6-maands-geannualiseerde +7,3% uit het proefstuk is alleen op gecorrigeerde data zinvol te
berekenen (op NSA-data zit er seizoenspatroon in), dus dat cijfer blijft afhankelijk van de
herziene M2SL-reeks. Dat is nu expliciet.

## 3. Correctie op mijn eigen proefstuk (v1 en v2): het woord "kerninflatie"

Statbel publiceerde op 30 juli zijn eigen persbericht (bon via zoekindex, ±21:59Z). Daarin:
inflatie **3,56%**, gezondheidsindex **3,22%**, afgevlakte gezondheidsindex **100,77**,
CPI **103,60**. Dat is regel voor regel gelijk aan wat ik uit de bestat-API haalde en berekende
(3,56% → door mij afgerond gemeld als 3,6%; 3,22% → 3,2%). Mijn cijfers houden stand.

Eén ding niet. Ik noemde 3,7% "kerninflatie". Dat cijfer (3,67%) is correct berekend, maar het
hoort bij de aggregatie *zonder energie, levensmiddelen, alcohol en tabak* — de eurozone-stijl
kernmaat. Statbels **officiële kerninflatie** sluit alleen energie en onbewerkte voeding uit en
bedraagt in juli **3,13%** (juni: 3,04%). Twee verschillende maten, en ik plakte het officiële
etiket op de verkeerde. Correctie voor volgende stukken:

| Maat | juli 2026 |
|---|---|
| Kerninflatie volgens Statbel (excl. energie + onbewerkte voeding) | **3,13%** |
| Kernmaat excl. energie, levensmiddelen, alcohol, tabak (eurozone-stijl) | 3,67% |

Beide mogen gebruikt worden; het etiket moet erbij. De duiding in het proefstuk verandert er
niet door — beide kernmaten liggen boven 3% — maar de precisie wel.

## 4. Bevestiging voor het orakelboek
Statbel schrijft in hetzelfde persbericht: "De volgende spilindex voor het openbaar ambt en de
sociale uitkeringen is vastgelegd op 102,29 punten." Dat de dréempel nu 102,29 is, bevestigt
langs officiële weg dat de vorige (100,28) is overschreden. Orakelboek-regel 1 blijft open tot
de indexering in september daadwerkelijk plaatsvindt; de overschrijding zelf is nu feit uit
twee onafhankelijke bronnen.

## Kosten deze ronde
Geschat €0,15–€0,20 (2 zoekopdrachten + 2 batchfetches + verwerking). Schatting, geen meting.
