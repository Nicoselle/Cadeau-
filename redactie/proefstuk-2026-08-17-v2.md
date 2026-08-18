# PROEFSTUK v2 — CONCEPT, NIET PUBLICEREN (fase 0, statuut §5: alleen Nico duwt door)

## De kraan weer open, de rekening rondgepompt

*Tweede proefdraai van de keten, nu met drie blokken — Verenigde Staten, eurozone, België —
in één signaalverhaal. Vervangt proefstuk-2026-08-17.md niet; staat ernaast.*

---

### Signaal

Drie waarnemingen die samen één beweging vormen. In de VS versnelt de geldhoeveelheid weer
(M2 +5,5% j/j) terwijl de Fed verlaagt en de inflatie oploopt naar 3,3%. In de eurozone ligt
de korte rente (2,19%) onder de inflatie (2,9%): wie euro's aanhoudt, verliest reëel. En in
België — inflatiekoploper met 3,6% — is in juni 2026 de spilindex overschreden, waarna de
staat in september zijn uitkeringen en wedden indexeert. Maar niet helemaal: dankzij de
'centenindex' alleen op de eerste schijf. De geldkraan gaat open; de compensatie voor de
gevolgen wordt gerantsoeneerd.

### Cijfers (bonnen: FRED, Statbel bestat-API, ECB Data Portal, Federaal Planbureau; alle
ophalingen 2026-08-17 tussen ±20:58Z en ±21:25Z; reeksen in `data/`)

**Blok 1 — Verenigde Staten**

| Grootheid | Waarde | Bon |
|---|---|---|
| M2-groei j/j (juni 2026) | +5,5% | FRED M2SL |
| M2-groei 6m geannualiseerd | +7,3% | idem |
| CPI j/j (juli 2026) | +3,3% — een jaar eerder 2,7% | FRED CPIAUCSL |
| Fed funds | 4,33% → 3,63% (verlagingen sep/okt/dec 2025) | FRED DFF |
| Reële korte rente, ruw | ≈ +0,3% | berekend |

**Blok 2 — Eurozone**

| Grootheid | Waarde | Bon |
|---|---|---|
| HICP j/j (juli 2026) | 2,9% | ECB Data Portal |
| M3-groei (juni 2026) | +3,3% | idem |
| €STR (14-08-2026) | 2,189% | idem |
| Reële korte rente, ruw | ≈ **−0,7%** | berekend |
| Overheidsschuld (Q1 2026) | 88,9% bbp | idem |

**Blok 3 — België**

| Grootheid | Waarde | Bon |
|---|---|---|
| CPI j/j (juli 2026) | **+3,6%** | Statbel bestat |
| Kerninflatie j/j | +3,7% | idem |
| Energiedragers j/j | +10,6% | idem |
| Gezondheidsindex j/j | +3,2% | idem |
| Afgevlakte gezondheidsindex (juni/juli) | 100,37 / 100,77 | idem |
| Spilindex | 100,28 — **overschreden juni 2026** | Planbureau + Statbel |
| Indexering uitkeringen/wedden | sept 2026, +2%, alleen schijf tot €2.000/€4.000 ('centenindex') | Planbureau |
| Volgende drempels | 102,29 (verwacht dec 2026), 104,34 (verwacht okt 2027) | Planbureau (raming) |

### Duiding (Oostenrijkse School)

Het patroon is klassiek. De reële rente is naar nul (VS) of eronder (eurozone) gebracht terwijl
de geldgroei versnelt: dat is geen neutraal "normaliseren" maar een nieuwe ronde
kredietexpansie, met de bekende gevolgen — het nieuwe geld bereikt eerst de staat en de
activabezitters, als laatste het loonzakje (Cantillon), en de kunstmatig gedrukte rente lokt
investeringen uit die bij een eerlijke prijs van sparen niet rendabel waren (Mises/Hayek).

België maakt zichtbaar wat elders verborgen blijft, omdat het de gevolgen van geldontwaarding
wettelijk heeft geïnstitutionaliseerd. De machinerie is indrukwekkend: een gezondheidsindex,
een afvlakking daarvan, een spilindex als tripwire, en een automatische verhoging drie maanden
later. Maar kijk wat de machine sinds 2025 doet: de wachttijd is verlengd naar drie maanden
(Programmawet), en de 'centenindex' knipt de compensatie af boven €2.000 (uitkeringen) resp.
€4.000 (wedden) bruto. De staat, die via de inflatiebelasting over de héle geldhoeveelheid int
en wiens schuld reëel wegsmelt, compenseert zijn burgers dus vertraagd en gedeeltelijk — en
noemt dat begrotingsdiscipline. Wie buiten elk indexmechanisme valt — de spaarder, de
rentenier, de kleine verhuurder met een verouderd contract — betaalt het gelag volledig. De
indexering wekt de schijn dat inflatie een beheerst probleem is; in werkelijkheid pompt ze de
rekening rond en verankert ze de verwachting dat 3% á 4% per jaar normaal is. Bij 3,6% halveert
de koopkracht van een niet-geïndexeerd vermogen in twintig jaar.

### Steenman (de sterkste tegenwerping, eerlijk weergegeven)

Ten eerste: de Belgische uitschieter is grotendeels een energieschok — het conflict in het
Midden-Oosten joeg de energiedragers +10,6% j/j omhoog (Planbureau rekent met Brent $93 in
2026) — en aanbodschokken zijn geen monetair verschijnsel; het Planbureau ziet de inflatie in
2027 terugvallen naar 2,9%. Ten tweede: 5,5% M2-groei is na de krimp van 2022-2023 herstel
naar trend, geen zondvloed, en de Fed verlaagt om een afkoelende arbeidsmarkt, niet om
Washington. Ten derde: de centenindex is verdedigbaar sociaal beleid — de laagste inkomens
worden volledig gecompenseerd, alleen hogere schijven niet, en dat drukt de loonkosten-
spiraal die volledige indexering juist zou aanjagen. En de datakwaliteit maant tot
bescheidenheid: de VS-reeks mist een maand (okt 2025), en het Planbureau overschatte het
tempo van de afgevlakte index licht.

Antwoord in één zin: dat de vonk (energie) van buiten komt, verklaart niet waarom het kruit
droog ligt — dát is het werk van jaren geldgroei en een reële rente rond nul; en een staat die
zijn eigen compensatiemachine afknipt terwijl de inflatiebelasting volledig doorloopt, bevestigt
eerder de diagnose dan dat hij haar weerlegt.

### Poorttoetsen

| Poort | Oordeel |
|---|---|
| Elk cijfer draagt een bon (URL + tijdstip) | JA |
| Berekeningen herleidbaar uit meegeleverde CSV's | JA (`data/`) |
| Feiten en vermoedens gescheiden | JA — tabellen en spilindexoverschrijding zijn feit; duiding, steenman-antwoord en Planbureau-drempels dec 2026/okt 2027 zijn interpretatie resp. raming |
| Drie blokken (VS/EZ/BE) aanwezig | JA — de Belgische poot nu op officiële Statbel- en Planbureau-cijfers |
| Publicatie | UIT (fase 0; alleen Nico duwt door) |
| Kosten dit stuk (v2, incl. spilindexronde) | geschat €0,30–€0,45 — onder de €0,50-mediaan; schatting, geen meting |

### Beperkingen
- Alle data via indirecte routes (Exa) wegens netwerkblokkade; zie bronnenstaat.
- ECB-cijfers zijn homepage-headlines, geen API-reeksen.
- Planbureau (plan.be) staat nog niet op de bronnenladder — voorstel tot toevoeging staat in
  het spilindex-meetrapport.
