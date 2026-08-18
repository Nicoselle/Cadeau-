# Voorstel tot reparatie van de rolprompt — Zetter

Zetter, 2026-08-17, zesde werkronde. Dit is het artefacttype uit mijn klussenlijst dat ik nog
niet had geleverd. Het is een **voorstel**, geen wijziging: Nico beslist wat er in de rolprompt
komt. Grondslag is uitsluitend wat zes werkrondes feitelijk hebben uitgewezen — geen
verbeteringen op gevoel.

Voorbehoud vooraf: **ik heb het pack en dus de bestaande rolprompt nooit gezien.** Ik repareer
hier de rolprompt zoals die mij bij aanvang werd meegegeven. Als de pack-versie afwijkt, gelden
deze punten als aanvullingen, niet als vervangingen.

---

## 1. De bronnenladder klopt niet met de werkelijkheid — herzie hem

**Bevinding.** Van de vijf genoemde bronnen leverden er in de praktijk twee bruikbare data
(FRED volledig; Statbel via een niet-genoemde route), één alleen headline-cijfers (ECB) en
twee niets (NBB-dataexplorer, Stooq — elk drie- resp. tweemaal getest, alle routes dood).
Ondertussen bleek de enige vindplaats van de spilindex — plan.be — helemaal niet op de ladder
te staan, terwijl de spilindex het scharnier is van elk Belgisch inflatiestuk.

**Voorstel.** Vervang de opsomming door een ladder met rangorde en route:
1. FRED — hoofdbron voor alle macroreeksen, inclusief de spiegelreeksen van Eurostat
   (eurozone- én Belgische HICP). Route: `fredgraph.csv?id=<SERIE>&cosd=<datum>`.
2. Statbel — officiële Belgische cijfers. **Route: de bestat-API, JSON-export**
   (`bestat.statbel.fgov.be/bestat/api/views/<id>/result/JSON`). De datasetpagina zet een
   CAPTCHA en de CSV-export weigert; wie de rolprompt letterlijk volgt, loopt vast.
3. **Federaal Planbureau (plan.be)** — nieuw: spilindex, indexvooruitzichten. Let op de
   vintagedatum in de paginatitel.
4. ECB Data Portal — alleen homepage-headlines; de API is vanaf deze omgeving onbereikbaar.
5. NBB-dataexplorer en Stooq — als dood markeren tot het tegendeel blijkt, met de instructie
   dat een nieuwe poging alleen zin heeft na een wijziging in het netwerkbeleid.

## 2. Voeg een harde meetregel toe: seizoensgecorrigeerd nooit alleen

**Bevinding.** Mijn M2-signaal steunde op M2SL. De Fed wijzigde per 28-07-2026 de
M2-methodologie, met revisies in precies die gecorrigeerde reeks. Het signaal hield stand bij
toetsing tegen M2NS (+5,55% vs +5,53%) — maar dat wist ik pas ná de toets, en ik was er bij
toeval op gestuit via een releasekalender, niet via de rolprompt.

**Voorstel.** Regel opnemen: *elke seizoensgecorrigeerde reeks wordt vóór duiding naast zijn
ongecorrigeerde tegenhanger gelegd; wijkt het beeld af, dan is dat het verhaal.*

## 3. Voeg een etiketregel toe voor samengestelde maten

**Bevinding.** Ik noemde 3,67% "kerninflatie". Correct berekend, verkeerd geëtiketteerd:
Statbels officiële kerninflatie (excl. energie en onbewerkte voeding) bedroeg 3,13%; mijn
cijfer hoorde bij de eurozone-stijl maat. Twee legitieme maten, één verkeerd woord — precies
het soort fout dat een publicatie haar geloofwaardigheid kost.

**Voorstel.** Regel opnemen: *bij kerninflatie, kernindex, onderliggende inflatie e.d. altijd de
uitsluitingen expliciet noemen; het woord alleen gebruiken zoals de publicerende instelling het
gebruikt.*

## 4. Maak "af" strenger op één punt: de bon moet reproduceerbaar zijn

**Bevinding.** De regel "URL plus tijdstip" werkte, maar bleek onvoldoende bij bronnen met
vintages (plan.be serveerde mij een oudere versie dan het zoekresultaat) en bij herziene reeksen
(M2SL). Een URL plus tijdstip identificeert het ophaalmoment, niet de datastand.

**Voorstel.** Bon uitbreiden tot: *URL, tijdstip, én — waar de bron die publiceert — de
vintage-/releasedatum van de data zelf.*

## 5. Erken de omgeving in de rolprompt

**Bevinding.** De rolprompt gaat uit van `/workspace/redactie/` en van een pack als upload of
map. In de praktijk bestond `/workspace` niet, was de werkruimte een git-repository, en is de
container vluchtig: alleen wat gecommit en gepusht is, overleeft.

**Voorstel.** Opnemen: *werk in de aangewezen map; is die er niet, maak hem aan binnen de
repository en commit elke klus — een bestand dat niet gepusht is, bestaat morgen niet.* Dat is
geen detail: het is het verschil tussen "geen bestand, geen klus" en werk dat verdampt.

## 6. Geef de klussenlijst een terugkeermechanisme

**Bevinding.** De lijst is een volgorde voor één sessie; wat er daarna gebeurt, hangt af van of
iemand "ga door" zegt. Ik heb dat zelf opgelost met wekkers (send_later) op de geverifieerde
releasedata, plus een kalender die per reeks zegt wanneer hij vers is.

**Voorstel.** Punt 5 van de klussenlijst ("daarna: wat je eigen laatste verslag aanwees")
uitbreiden met: *zet aan het eind van elke ronde een wekker op de eerstvolgende releasedatum uit
de kalender, zodat het werk doorloopt zonder aansporing.*

## 7. Eén punt dat ik uitdrukkelijk **niet** wil wijzigen

De regel dat publicatie uit blijft en dat alleen Nico een stuk doorduwt (statuut §5), en het
verbod op uitgaven en verbintenissen. Die hebben in zes rondes geen enkele keer in de weg
gezeten en zijn precies wat een doorwerkende bot veilig maakt. Ongewijzigd laten.

---

## Wat dit voorstel níét kan beoordelen
Of de pack-rolprompt deze punten al bevat; of de andere rollen (Heraut, e.a.) dezelfde
reparaties nodig hebben; en of de bronnenladder in `00-BRONNEN.md` afwijkt van de vijf die ik
kreeg. **Dit kon ik niet zien.**

## Aanbeveling over rolsplitsing (ongewijzigd)
Nog steeds geen aparte specialist nodig. Wel merk ik op dat het onderhoud van de
releasekalender en de registers inmiddels een eigen ritme heeft dat losstaat van het schrijven.
Groeit dat verder, dan is een vaste "Kalenderwacht" eerder een kandidaat voor afsplitsing dan
een Heraut voor socialemediaconcepten — maar nog niet nu, en ik werk zelf door.
