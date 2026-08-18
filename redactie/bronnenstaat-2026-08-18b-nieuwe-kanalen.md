# Bronnenstaat — nieuwe kanalen getoetst (2026-08-18, negende werkronde)

Opdracht: andere kanalen zoeken. Voorwaarde die ik mezelf stelde: **geen account, geen sleutel,
geen betaling** — anders zijn we terug bij de vraag van vanmorgen. Zeven routes getest, alle
ophalingen 2026-08-18 tussen ±09:05Z en ±09:20Z.

## Uitkomst per kanaal

| Kanaal | Status | Wat het geeft |
|---|---|---|
| **US Treasury FiscalData** — `api.fiscaldata.treasury.gov` | **WERKT, geen sleutel** | Staatsschuld per dag; rentelast per maand en boekjaar. Schone JSON, filters en veldselectie. |
| **Eurostat dissemination-API** — `ec.europa.eu/eurostat/api/...` | **WERKT, geen sleutel** | HICP-reeksen per land. **Maar:** de datasets die ik aansprak (`prc_hicp_midx`, `prc_hicp_manr`) zijn door Eurostat **stopgezet** en lopen slechts t/m 2025-12. |
| World Bank — `api.worldbank.org` | onbeslist | Timeout bij beide pogingen; niet dood verklaard, opnieuw proberen. |
| Euronext BEL 20 — `live.euronext.com` | **dood voor data** | Pagina laadt, maar de koers zelf komt via JavaScript en Euronext verwijst voor gebruik naar een commerciële licentie. Geen cijfer verkregen. |
| Yahoo v8-chart-API (herhaling) | dood via deze route | content-type; vraagt géén account (zie notitie van vanmorgen). |
| NBB (vierde poging, eerder) | dood | — |
| Stooq | dood | — |

## Wat de Treasury-API oplevert — dit is de vondst

**Staatsschuld VS, 13-08-2026: $39.934.816.207.844,37** — bijna **39,93 biljoen dollar**,
waarvan $32,20 bln bij het publiek en $7,73 bln intragouvernementeel. Dagelijkse reeks,
opgeslagen als `data/treasury_debt_to_penny_2026-08.csv`.

**Rentelast, boekjaar 2026 t/m juli (tien maanden)** — hoofdcomponenten van de verhandelbare
schuld, opgeslagen als `data/treasury_rentelast_2026-07.csv`:

| Post | Boekjaar t/m juli |
|---|---|
| Treasury Notes | $410,5 mld |
| Treasury Bills | $209,2 mld |
| Treasury Bonds | $147,1 mld |
| TIPS — **inflatiecompensatie** | **$76,9 mld** |
| Floating Rate Notes | $22,1 mld |
| TIPS — opgelopen rente | $20,1 mld |
| *subtotaal deze posten* | *$886,0 mld* |

**Uitdrukkelijk voorbehoud:** dit subtotaal is **niet** het officiële totaal. De brontabel mengt
opgelopen rente met kasbasisposten (Government Account Series) en bevat nog amortisatie- en
premieregels; mijn ophaling was bovendien afgekapt voordat de laatste regels binnen waren. Wie
een totaalcijfer wil, moet de volledige tabel halen en de grondslagen scheiden. Ik publiceer dus
componenten, geen totaal. *(Ruwe ordegrootte: op tien maanden geannualiseerd zouden déze posten
alleen al richting $1.060 mld per jaar lopen — expliciet een ruwe extrapolatie, geen raming.)*

### Waarom dit kanaal er voor ons toe doet (duiding — mijn lezing, vermoeden)
Tot vandaag konden we over de fiscale kant van het verhaal alleen in verhoudingen praten
(88,9% schuld/bbp in de eurozone). Nu hebben we het bedrag zelf, per dag, uit de kas van de
schuldenaar. En één regel springt eruit: **$76,9 miljard inflatiecompensatie op TIPS in tien
maanden**. Dat is de post waarin de staat aan zijn schuldeisers uitbetaalt wat zijn eigen
geldontwaarding hun kostte — de inflatiebelasting die op één plek in de begroting zichtbaar
wordt gemaakt, en dan nog alleen voor het deel van de schuld dat zich ertegen heeft ingedekt.
Voor de Kapitaalkrant is dat geen bijzaak maar een hoofdstuk.

Tweede observatie, ook interpretatie: deze rentelast staat naast de spread die ik gisteren mat
(dertigjaars +1,62 pp boven de beleidsrente). Wie verlaagt aan het korte eind terwijl het lange
eind duurder wordt en de schuld bijna 40 biljoen bedraagt, financiert niet goedkoper — hij
verschuift alleen waar de rekening valt. Dat is een toetsbare gedachte; ik neem hem nog niet in
het orakelboek op, eerst een tweede meetpunt in september.

## Wat Eurostat oplevert — en wat er mis is
De API werkt zonder sleutel en geeft schone JSON (voorbeeld: HICP België, index 2015=100, laatste
waarden 134,67 → 137,04 voor mei t/m december 2025). Maar Eurostat meldt in het antwoord zelf dat
deze datasets **stopgezet** zijn, en de reeks eindigt op 2025-12. De FRED-spiegel die ik gebruik
loopt tot juni 2026 en is dus **verser dan de bron zelf** via deze route.
**Openstaand punt:** de actuele opvolgerdataset opzoeken (de COICOP-2018-overgang zit hier
achter). Tot dan blijft FRED de route voor Europese reeksen.

## Aanbeveling voor de ladder
1. **US Treasury FiscalData toevoegen als volwaardige bron** — gratis, geen sleutel, dagelijks,
   primair. Dit is de eerste echte aanwinst sinds plan.be.
2. **Eurostat-API opnemen als kanaal**, met de aantekening dat de datasetcodes eerst uitgezocht
   moeten worden; niet gebruiken tot dat rond is.
3. Euronext blijft dicht: voor de BEL 20 blijft de Yahoo-quotepagina voorlopig de enige route.
4. World Bank opnieuw proberen bij een volgende ronde.
Op te nemen in kalender v3.

## Kosten deze ronde
Geschat €0,20–€0,30 (drie batchfetches, waarvan één groot). Schatting, geen meting. Uitgaven: geen.
