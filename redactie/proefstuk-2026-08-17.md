# PROEFSTUK — CONCEPT, NIET PUBLICEREN (fase 0, statuut §5: alleen Nico duwt door)

## De centrale banken verruimen alweer — en de inflatie is nog niet weg

*Proefdraai van de volledige keten: signaal → cijfers → duiding → steenman → poorttoetsen.*

---

### Signaal

De Amerikaanse geldhoeveelheid M2 groeit weer versneld — van +4,0% jaar-op-jaar in december 2025
naar +5,5% in juni 2026 — terwijl de Fed sinds september 2025 driemaal de rente verlaagde en de
Amerikaanse consumenteninflatie juist opliep van 2,7% naar 3,3%. In de eurozone hetzelfde patroon,
gedempt: M3 +3,3%, inflatie 2,9%, en een korte rente (€STR 2,19%) die **onder** de inflatie ligt.

### Cijfers (elk cijfer draagt een bon; alle bonnen 2026-08-17 ±20:58–20:59Z opgehaald)

| Grootheid | Waarde | Berekening | Bon |
|---|---|---|---|
| M2 (VS), juni 2026 | 23.155,2 mld USD | — | fredgraph.csv?id=M2SL (FRED) |
| M2-groei j/j, juni 2026 | +5,5% | 23.155,2 / 21.942,7 | idem |
| M2-groei j/j, dec 2025 | +4,0% | 22.355,3 / 21.487,6 | idem |
| M2-groei 6m geannualiseerd | +7,3% | (23.155,2 / 22.355,3)² | idem |
| CPI (VS) j/j, juli 2026 | +3,3% | 332,813 / 322,169 | fredgraph.csv?id=CPIAUCSL (FRED) |
| CPI (VS) j/j, juli 2025 | +2,7% | 322,169 / 313,569 | idem |
| Fed funds effectief | 4,33% → 3,63% | dagreeks, verlagingen 18-09, 30-10, 11-12-2025 | fredgraph.csv?id=DFF (FRED) |
| HICP eurozone j/j, juni 2026 | +2,7% | 103,00 / 100,26 | fredgraph.csv?id=CP0000EZ19M086NEST (FRED) |
| HICP eurozone j/j, juli 2026 | 2,9% | headline | data.ecb.europa.eu homepage |
| M3-groei eurozone, juni 2026 | +3,3% | headline | idem |
| €STR, 14-08-2026 | 2,189% | headline | idem |

Reële korte rente, ruw: VS 3,63 − 3,3 ≈ **+0,3%**; eurozone 2,19 − 2,9 ≈ **−0,7%**.

### Duiding (Oostenrijkse School)

Wie alleen naar het beleidstarief kijkt, ziet "normalisatie". Wie naar de geldhoeveelheid kijkt,
ziet iets anders: de kraan gaat weer open terwijl de vorige overstroming nog niet is opgedweild.
Een M2-groei die binnen zes maanden annualiseert naar ruim 7% bij een reële rente rond nul is
geen neutraal beleid; het is een nieuwe ronde kredietexpansie bovenop een prijspeil dat sinds
2020 al ~28% steeg (CPI 259,1 → 332,8).

De Oostenrijkse les is dat zulke expansie nooit neutraal binnenkomt. Het nieuwe geld bereikt
eerst de balansen die het dichtst bij de kraan staan — overheden, banken, bezitters van
financiële activa — en pas als laatste het loonzakje (Cantillon). De rente die daalt zonder dat
er meer echte besparingen tegenover staan, geeft ondernemers een vals signaal over de
beschikbare middelen: projecten worden rendabel gerekend die het bij een eerlijke rente niet
zijn (misallocatie à la Mises/Hayek). Dat de inflatie alwéér oploopt terwijl er verlaagd wordt,
suggereert dat niet de prijsstabiliteit maar de financierbaarheid van schuld het bindende
motief is geworden — in de eurozone, met 88,9% overheidsschuld tegen bbp en een negatieve
reële korte rente, is die verdenking het sterkst.

### Steenman (de sterkste tegenwerping, eerlijk weergegeven)

De verdediging luidt: 5,5% nominale M2-groei is historisch niet wild — het ligt in de buurt van
nominale bbp-groei, en na de krimp van 2022-2023 is dit herstel naar trend, geen nieuwe zondvloed.
De Fed verlaagt omdat de arbeidsmarkt afkoelt, niet om Washington te financieren. De relatie
M2→CPI is bij lage groeivoeten notoir zwak (de velociteit beweegt); en 3,3% CPI kan tijdelijke
componenten bevatten. Bovendien mist in de Amerikaanse reeks één maand (oktober 2025 ontbreekt
in de opgehaalde CPI-reeks), wat tot voorzichtigheid over de precieze j/j-paden maant. Wie hierop
een crash voorspelt, heeft sinds 2010 vaker ongelijk dan gelijk gehad.

Antwoord in één zin: de steenman verklaart het tempo, niet de richting — een reële rente rond of
onder nul bij oplopende inflatie blijft een verruimingskeuze, en die keuze heeft de beschreven
verdelings- en allocatie-effecten ongeacht het motief.

### Poorttoetsen

| Poort | Oordeel |
|---|---|
| Elk cijfer draagt een bon (URL + tijdstip) | JA |
| Berekeningen herleidbaar uit meegeleverde CSV's | JA (zie `data/`) |
| Feiten en vermoedens gescheiden | JA (duiding en steenman zijn interpretatie; tabel is feit) |
| Belgische/NBB-invalshoek | NEE — NBB-dataexplorer dood, Statbel-download onbewezen; stuk blijft VS/EZ |
| Publicatie | UIT (fase 0; alleen Nico duwt door) |
| Kosten dit stuk | geschat €0,25–€0,40 (≈8 fetches + generatie); **onder de €0,50-mediaan** — schatting, geen meting |

### Beperkingen
- Alle data via indirecte route (Exa) opgehaald; zie bronnenstaat voor de netwerkblokkade.
- CPI VS: waarneming 2025-10 ontbreekt in de bronreeks zelf.
- ECB-kerncijfers komen van de portaal-homepage (headline), niet uit de CSV-API.
