# De Architectuur van Keuzes

Een diepgaande marktanalyse en bouwplan voor de volgende generatie besluitvormingssoftware.

**Status:** geldende versie · 31 augustus 2026
**Referentie-implementatie:** `/keuze` in deze repository (engine, catalogus, ledger, API)

---

## Aanleiding

De transitie van traditionele, retrospectieve Business Intelligence (BI) naar adaptieve, beslissingsgedreven Decision Intelligence Platforms (DIP’s) markeert een van de meest fundamentele verschuivingen in de hedendaagse enterprise-architectuur. Waar eerdere generaties analytische software zich uitsluitend richtten op het ontsluiten en visualiseren van historische datastromen via statische dashboards, verschuift het architecturale zwaartepunt thans naar het expliciet modelleren, optimaliseren en automatiseren van de beslissingen zelf.

Deze evolutie wordt gekatalyseerd door de toenemende complexiteit van zakelijke omgevingen, de exponentiële groei van datavolumes, gefragmenteerde systeemlandschappen en de stijgende verwachtingen rondom latentie, transparantie en verantwoording in besluitvormingsprocessen.

Onderzoeksbureau Gartner definieert Decision Intelligence Platforms als software die beslissingsgerichte oplossingen ontwerpt om besluitvorming te ondersteunen, te vergroten (augmenteren) of volledig te automatiseren via een gelaagde compositie van data, analytics, kennismodellen en kunstmatige intelligentie. De markt is een kritieke volwassenheidsfase ingegaan. Wat begon als een verzameling opkomende technologieën in Market Guides, is uitgegroeid tot een geconsolideerd domein met een eigen Magic Quadrant (26 januari 2026) en meetbare Critical Capabilities (27 januari 2026) voor beslissingsanalyse, low-code engineering, beslissingswetenschap en stewardship.

Dit rapport deconstrueert de bestaande paradigma’s — wat excellert, wat structureel faalt — en synthetiseert die inzichten in een gelaagd bouwplan. De referentie-implementatie **Keuze** in deze repository is dat bouwplan in werkende code, niet als slide.

---

## Deel 1 — Analyse van de huidige markt

### 1.1 Operationele successen en dominante architecturen

De huidige generatie DIP’s heeft de kloof tussen ruwe data-extractie en operationele actie deels gedicht. Drie architecturale benaderingen domineren, aangevuld met één industriestandaard voor het modelleren van logica.

**Domeinspecifieke, autonome automatisering.** Platforms zoals Aera Technology (Decision Cloud) en, in planning, o9 Solutions positioneren zich rond ‘self-driving enterprise decisions’. De architectuur is ontworpen om — vaak zonder menselijke tussenkomst op het moment zelf — te integreren met ERP en supply-chaintools. Pre-gebouwde “business skills” operationaliseren domeinkennis zonder een omvangrijk intern data-scienceteam. Dit werkt in domeinen met hoge transactievolumes: voorraad, ordercompletion, inkoop. Gartner plaatst Aera in 2026 als Leader; o9 als Niche Player. De waarschuwing bij Aera is concentratie (manufacturing, olie & gas) en kostbeheersing van het platform.

**Mens-AI-collaboratie in gefragmenteerde omgevingen.** Palantir Foundry illustreert het tegenovergestelde zwaartepunt: heterogene data-ontologieën verenigen en de menselijke analist centraal zetten. Voor beslissingen met hoge inzet — defensie, energie, maakindustrie, finance — zijn Decision Support en Decision Augmentation veiliger en wenselijker dan blinde automatisering. Faculty (Frontier; Visionary, met voorgenomen overname door Accenture) volgt een verwant pad met computational twins en een aangekondigd Return-on-Decision-raamwerk. Palantir zelf staat *buiten* het DIP-kwadrant: het is een ontologie- en collaboratieplatform, geen klassieke decision-service-engine. Architecturaal blijft het paradigma onmisbaar.

**Geïndustrialiseerd modelbeheer en governance.** SAS Viya, IBM watsonx / decisioning, FICO Platform, ACTICO en Oracle leveren de blauwdruk voor gereguleerde sectoren: de volledige levenscyclus van ML-modellen, gecombineerd met deterministische bedrijfsregels, audit trails, versiebeheer en AI-governance. Het marktsucces in fraude en kredietrisico toont dat deze elementen geen ‘enterprise nice-to-have’ zijn maar acceptatievoorwaarden. In het 2026-kwadrant zijn FICO, SAS, IBM en ACTICO Leaders; Oracle is Niche Player.

**DMN als gouden standaard voor logica.** De Decision Model and Notation (OMG) maakt besluitvormingslogica tot een zelfstandig, herbruikbaar bedrijfsmiddel, onafhankelijk van proces of codebase. Het Decision Requirements Diagram (DRD) is de semantische kaart: inputs, subbeslissingen, kennisbronnen. De gedetailleerde logica leeft in beslissingstabellen en FEEL (Friendly Enough Expression Language). FEEL is bewust zij-effectvrij: dezelfde expressie betekent overal hetzelfde, wat audit en replay mogelijk maakt. DMN werkt samen met BPMN: BPMN is het *wanneer*, DMN het *hoe*. Adoptie is het verst in zorg (klinische richtlijnen) en verzekeringen.

### 1.2 Wat de marktleiders structureel niet oplossen

De successen hierboven dichten de kloof tussen data en actie. Ze dichten níet de kloof tussen actie en *leren*, noch die tussen voorspelling en *interventie*.

**Beslissingsamnesie.** Orkestratieframeworks en zelfs veel DIP-uitvoeringslagen loggen stappen voor debugging. Ze produceren geen institutioneel geheugen: wat werd beslist, op welke evidence, onder wiens autoriteit, welke alternatieven zijn overwogen, en wat was de werkelijke uitkomst. Elke volgende beslissing start bij nul. In agentische systemen is dit fataal: een agent zonder ledger is een amnesiemachine. Gartner raamt dat 25% van de onbeheerste LLM-beslissingen tegen 2027 financieel of reputatieschade veroorzaakt door bias, gebrek aan kritisch denken en AI-sycophancy.

**Correlatie zonder oorzaak.** Scorekaarten, gradient boosting en de meeste “AI-aanbevelingen” modelleren samenhang. Ze beantwoorden niet de enige vraag die een beslisser heeft: *wat verandert er als we ingrijpen?* Omzet correleert met kredietlimiet; betalingsachterstand veroorzaakt risico. Zonder een causale graaf — en zonder counterfactuals — blijft het systeem een veredelde correlatiemotor. Dat is precies de beperking die dit bouwplan wil overstijgen.

**DMN is stateless, deterministisch en epistemisch naïef.** De zuiverheid van FEEL is een deugd voor audit. Het is een tekort voor onzekerheid, constraint-optimalisatie en onvolledige kennis. Onderzoek (cDMN, epistemische DMN) bestaat; productisering in de MQ-vendors is dun. Wie alleen DMN implementeert, automatiseert het zekere en blijft stom over het onzekere.

**Governance vóór intelligentie.** Het 2026-kwadrant benadrukt stewardship, traceerbaarheid en execution control. Veel organisaties hebben nog geen geformaliseerde beslissingslogica, geen causale modellen, geen outcome-lus. Een governance-laag op een leeg beslissingslandschap produceert compliance-theater.

**Geen gesloten outcome-lus.** Monitoring in de meeste platforms is feature-drift en model-performance. Dat is nodig en onvoldoende. Leren van beslissingen vereist dat de *werkelijke* uitkomst wordt teruggelegd op het spoor — niet op het model.

**Context rot, pollution, confusion.** Verse, gefilterde, ondubbelzinnige context op het moment van beslissen is zeldzaam. Stale signalen, irrelevante features en botsende identiteiten zijn geen data-engineeringdetails; het zijn beslissingsfouten.

### 1.3 Methodologieën die wél excelleren — en behouden moeten blijven

Niet alles moet opnieuw. Het bouwplan erft:

- **Beslissing als asset** (DMN) — logica los van proces en code.
- **Mens in de lus naar inzet** (Palantir/Faculty) — support / augment / automate als contract, niet als marketing.
- **Audit, versie, stewardship** (FICO/SAS/IBM/ACTICO) — acceptatievoorwaarde, geen fase twee.
- **Domein-skills** (Aera) — herbruikbare, geteste beslissingsdiensten in plaats van greenfield per use case.
- **Composeerbaarheid** — Gartners verplichte features: modeling, collaboration, service composition, execution, monitoring; governance als gemeenschappelijke laag.

### 1.4 Marktkartering 2026

Zeventien vendors in het inaugurale Magic Quadrant (Pidsley, Idoine e.a., 26 januari 2026).

| Kwadrant | Vendors |
|---|---|
| Leaders | ACTICO, Aera Technology, FICO, IBM, Quantexa, SAS |
| Challengers | Decisions, Pegasystems |
| Visionaries | Faculty, Sapiens |
| Niche Players | CRIF, FlexRule, InRule, o9 Solutions, Oracle, RelationalAI, Rulex |

Critical Capabilities (27 januari 2026) scoren vier use cases — Decision Analysis, Engineering, Science, Stewardship — op zes fundamenten: modeling, collaboration, composition, execution, monitoring, governance. FICO claimt een tweede plaats over alle use cases; Aera de hoogste score op twee ervan. Deze ranglijsten meten *platformcapaciteit*, niet of een organisatie überhaupt beslissingen als objecten behandelt.

Gartners eigen planning-assumpties zijn het ontwerpconstraint van dit bouwplan: in 2028 is 25% van de CDAO-visies “decision-centric”; in 2030 zijn expliciet gemodelleerde beslissingen vijfmaal vertrouwder en 80% sneller dan onbeheerste.

---

## Deel 2 — Bouwplan voor de volgende generatie

### 2.1 Ontwerpprincipes

1. **De beslissing is het aggregaat**, niet het dashboard, niet het model, niet de workflow.
2. **Oorzaak boven correlatie.** Elke aanbeveling draagt een causale pijl of een expliciete waarschuwing dat die pijl ontbreekt.
3. **Geen amnesie.** Geen uitvoering zonder spoor; geen spoor zonder latere outcome-haak.
4. **Contract vóór agent.** Support, augment of automate wordt per beslissing vastgelegd, met een reviewregel die escalatie afdwingt. Agents komen ná dit contract.
5. **Stateless evaluatie, stateful geheugen.** De engine is zuiver (DMN-erfgoed). Het ledger is het enige geheugen.
6. **Drie gelijke lijnen voordat je extraheert.** Geen platformplatform. Eerst één beslissing volledig.

### 2.2 Zes lagen

```
L6  Ledger & leren        spoor → outcome → hit-rate → herkalibratie
L5  Mens-AI-contract      support | augment | automate + escalatie
L4  Beslissingsdiensten   tabellen, hit policies, compositie
L3  Causale laag          graaf, confounders, counterfactuals
L2  Kennis                beleid, wet, domeinmodel, DMN
L1  Signalen              getypeerde inputs, eenheid, versheid, herkomst
```

**L1 Signalen.** Elke input heeft type, eenheid, beschrijving en optionele versheid. Stale data is een beslissingsfout, geen cache-detail.

**L2 Kennis.** Tabellen en kennisbronnen zijn citeerbaar (policy, regulation, domain-model, expert). De DRD maakt de afhankelijkheid zichtbaar.

**L3 Oorzaak.** Een causale graaf leeft *naast* de DRD, niet als synoniem ervan. Richting (`increases` / `decreases`) is een hypothese met mechanisme. `confounds` is een eerste-klas waarschuwing: dit pad is geen ingreep. Counterfactuals her-evalueren de zuivere engine onder één interventie.

**L4 Uitvoering.** Topologische evaluatie van de DRD. Hit policies UNIQUE, FIRST, COLLECT, PRIORITY. Near-misses (één voorwaarde faalde) maken de grens van de gekozen regel inspecteerbaar. FEEL-subset: vergelijkingen, intervallen, lijsten, `$referenties` naar andere inputs.

**L5 Contract.** Drie modi. Reviewregel in dezelfde expressietaal (`limiet_eur >= 50000`, `prijsdruk = duur`). Actor op het spoor: `system`, `human`, `human-override`.

**L6 Ledger.** Elk spoor bevat snapshot van inputs, outputs, vuurende regels, near-misses, causale duiding, counterfactuals, actor, autoriteit, status. Outcome sluit de lus. Hit-rate is geen modelmetric; het is een beslissingsmetric.

### 2.3 Wat expres níet in v1 zit

- Een volledige FEEL-interpreter (boxed expressions, context functions). De subset dekt tabellen; de rest is later.
- Een constraint-solver (cDMN). Optimalisatie is een laag-3-uitbreiding, geen voorwaarde om te starten.
- Persistente multi-tenant opslag. De demo-ledger is zaadsporen plus `localStorage`. De *vorm* van het spoor is het ontwerp; de store is vervangbaar.
- Autonome agents. Die komen pas wanneer L5 en L6 in productie staan. Anders schaal je amnesie.

### 2.4 Implementatiestrategie

**Fase 0 — Inventaris.** De tien beslissingen met de hoogste inzet of het hoogste volume. Eigenaar, modus, bronnen, of er al een stille regel in code of spreadsheet leeft.

**Fase 1 — Eén beslissing volledig.** DRD, tabellen, één causale pijl, één reviewregel, ledger. Geen platformkeuze vóór dit klaar is.

**Fase 2 — Outcome-lus.** Dertig dagen lang de werkelijke uitkomst terugleggen. Hit-rate zichtbaar maken. Eerst dan herkalibreren.

**Fase 3 — Causale discipline.** Confounders benoemen. Counterfactuals in de review-UI. Verbied “het model zegt” als enige zin.

**Fase 4 — Compositie en pas daarna agents.** Herbruikbare diensten. Agents mogen L4 aanroepen onder L5, en móeten L6 schrijven.

### 2.5 Referentie-implementatie: Keuze

Drie beslissingen dekken de drie marktparadigma’s.

| Id | Paradigma | Modus | Review |
|---|---|---|---|
| `noodvoedsel-herbevoorrading` | operationele autonomie (Aera-achtig) | automate | bij `prijsdruk = duur` |
| `kredietlimiet-mkb` | gereguleerde augmentatie (FICO/SAS-achtig) | augment | bij limiet ≥ €50.000 |
| `spilindex-loonindexering` | kennisgedreven support (Palantir-achtig) | support | bij elke positieve indexering |

Codekaart:

| Laag | Pad |
|---|---|
| Types + FEEL + engine + causaal + ledger | `src/lib/keuze/` |
| Catalogus + zaadsporen | `src/data/keuze/` |
| UI | `src/app/keuze/`, `src/components/keuze/` |
| API | `GET /api/v1/keuze/decisions`, `GET /api/v1/keuze/decisions/{id}`, `POST /api/v1/keuze/evaluate` |
| Tests | `tests/keuze/` |

Evaluatie is zuiver en daardoor identiek in UI en API. Het ledger is het enige geheugen. Dat is geen beperking van de demo; het is het architecturale contract.

### 2.6 Acceptatiecriteria voor “klaar”

Een volgende-generatie DIP is niet klaar wanneer het een dashboard heeft of een agent. Het is klaar wanneer:

1. Elke in-productie-beslissing een versie, eigenaar en modus heeft.
2. Elke uitvoering een spoor schrijft dat een outsider kan herhalen.
3. Elke aanbeveling een causale zin of een confounder-waarschuwing draagt.
4. Elke geautomatiseerde tak een reviewregel heeft die écht kan vuren.
5. Outcomes terugkomen, en de hit-rate een stuurgetal is.

Keuze voldoet daaraan voor drie beslissingen. De rest van een onderneming is herhaling van fase 1–3, niet van een nieuw platform.

---

## Bronnen (selectie)

- Gartner, *Magic Quadrant for Decision Intelligence Platforms*, David Pidsley, Carlie Idoine, Kevin R. Quinn, Gareth Herschel, Kjell Carlsson, 26 januari 2026, ID G00827619.
- Gartner, *Critical Capabilities for Decision Intelligence Platforms*, Idoine, Pidsley e.a., 27 januari 2026.
- OMG, *Decision Model and Notation* (DMN), inclusief FEEL.
- Vandevelde & Vennekens e.a., cDMN / constraint extensions op DMN.
- Dataiku/Harris Poll 2026: 85% van CIO’s meldt vertraging of stopzetting van AI-projecten door gaten in traceerbaarheid of uitlegbaarheid.
- Interne dossiers in `redactie/` (spilindex, centenindex) als kennisbron voor de Belgische referentiebeslissing.
