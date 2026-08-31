import Link from "next/link";
import { KeuzeNav } from "@/components/keuze/keuze-nav";

export default function ArchitectuurPage() {
  return (
    <article className="container py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-accent">Onderzoeksrapport + bouwplan</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            De architectuur van keuzes
          </h1>
          <p className="mt-3 text-muted-foreground">
            Marktanalyse van Decision Intelligence Platforms en het gelaagde
            bouwplan dat Keuze implementeert. De volledige tekst staat ook in{" "}
            <code className="text-xs">docs/architectuur-van-keuzes.md</code>.
          </p>
        </header>
        <KeuzeNav current="/keuze/architectuur" />
      </div>

      <div className="prose-keuze mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Waarom BI niet meer volstaat</h2>
          <p>
            Traditionele Business Intelligence ontsluit historische datastromen
            via dashboards. Dat is retrospectief: het zegt wat er gebeurde, niet
            wat we nu moeten doen, waarom, en onder wiens autoriteit. Decision
            Intelligence Platforms (DIP&apos;s) verschuiven het zwaartepunt naar
            het expliciet modelleren, optimaliseren en — waar veilig —
            automatiseren van de beslissing zelf.
          </p>
          <p>
            Gartner definieert DIP&apos;s als software die beslissingsgerichte
            oplossingen ontwerpt om besluitvorming te ondersteunen, te
            augmenteren of te automatiseren via data, analytics, kennismodellen
            en AI. In januari 2026 verscheen het eerste Magic Quadrant voor dit
            domein, plus Critical Capabilities op vier use cases: analysis,
            engineering, science en stewardship.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1.1 Drie dominante architecturen</h2>
          <p>
            De markt splitst zich langs de plaats van de mens in de lus.
            Domeinspecifieke autonomie (Aera, o9) integreert rechtstreeks met
            ERP en supply chain en optimaliseert hoge transactievolumes.
            Mens-AI-collaboratie (Palantir Foundry, Faculty) verenigt
            gefragmenteerde ontologieën en houdt de analist centraal bij hoge
            inzet. Geïndustrialiseerd modelbeheer (SAS Viya, IBM watsonx, FICO,
            ACTICO) combineert voorspellende modellen met deterministische
            regels, audit trails en governance voor gereguleerde sectoren.
          </p>
          <p>
            Daarbovenop is DMN (OMG) de gouden standaard om logica tot een
            zelfstandig, testbaar bedrijfsmiddel te maken: het Decision
            Requirements Diagram toont de semantische kaart, beslissingstabellen
            en FEEL evalueren het &quot;hoe&quot;, terwijl BPMN het &quot;wanneer&quot; blijft.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1.2 Structurele tekortkomingen</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Beslissingsamnesie.</strong> Uitvoeringslogs vertellen welke
              stap liep, niet wat werd beslist, waarom, door wie, en wat het
              resultaat was. Elke volgende beslissing start opnieuw bij nul.
            </li>
            <li>
              <strong>Correlatie zonder oorzaak.</strong> Scorekaarten en ML
              voorspellen samenhang. Ze zeggen niet wat er verandert als je
              ingrijpt. Omzet &quot;voorspelt&quot; limiet; achterstallig betalen
              veroorzaakt risico.
            </li>
            <li>
              <strong>DMN is stateless en zeker.</strong> FEEL is zuiver en
              daardoor auditeerbaar, maar kent geen onzekerheid, geen constraints
              en geen geheugen. cDMN en epistemische extensies blijven onderzoek.
            </li>
            <li>
              <strong>Governance vóór intelligentie.</strong> Veel platforms
              verkopen stewardship terwijl de organisatie nog geen formele
              beslissingslogica of causale modellen heeft.
            </li>
            <li>
              <strong>Geen outcome-lus.</strong> Zonder terugkoppeling van wat er
              écht gebeurde, is monitoring drift-detectie op features — geen
              leren van beslissingen.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1.3 Magic Quadrant 2026, in het kort</h2>
          <p>
            Zeventien vendors. Leaders: ACTICO, Aera, FICO, IBM, Quantexa, SAS.
            Challengers: Decisions, Pegasystems. Visionaries: Faculty, Sapiens.
            Niche: CRIF, FlexRule, InRule, o9, Oracle, RelationalAI, Rulex.
            Palantir staat buiten dit kwadrant — het is een ontologie- en
            collaboratieplatform, geen klassieke DIP — maar het paradigma
            &quot;mens centraal bij hoge inzet&quot; blijft architecturaal relevant.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Deel 2 — Bouwplan</h2>
          <p>
            Keuze behandelt een beslissing als first-class asset, onafhankelijk
            van het proces dat haar aanroept. Zes lagen, van signaal tot geheugen:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong>Signalen</strong> — getypeerde inputs met eenheid, herkomst
              en versheid.
            </li>
            <li>
              <strong>Kennis</strong> — DMN-tabellen, beleid, wet en
              domeinmodellen als citeerbare bronnen.
            </li>
            <li>
              <strong>Oorzaak</strong> — een causale graaf naast de DRD;
              counterfactuals tonen wat een interventie verandert; confounders
              worden expliciet gewaarschuwd.
            </li>
            <li>
              <strong>Uitvoering</strong> — topologische evaluatie, hit policies
              (UNIQUE, FIRST, COLLECT, PRIORITY), near-misses.
            </li>
            <li>
              <strong>Contract</strong> — support / augment / automate, met een
              reviewregel die escalatie afdwingt.
            </li>
            <li>
              <strong>Ledger</strong> — elk spoor bewaart inputs, vuurende regels,
              actor, autoriteit en later de werkelijke uitkomst.
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Implementatiestrategie</h2>
          <p>
            Niet het platform eerst, de beslissing eerst. Inventariseer de tien
            keuzes met de hoogste inzet of het hoogste volume. Modelleer er één
            volledig — DRD, tabel, causale pijl, reviewregel, ledger. Sluit de
            outcome-lus. Schaal pas daarna. Agents komen ná het contract, niet
            ervoor: een agent zonder ledger is een amnesiemachine.
          </p>
          <p>
            De referentie-implementatie in deze repo bevat drie beslissingen die
            de drie marktparadigma&apos;s dekken: operationele autonomie
            (herbevoorrading), gereguleerde augmentatie (kredietlimiet) en
            kennisgedreven support (spilindex).
          </p>
        </section>

        <p>
          <Link href="/keuze" className="font-medium text-primary hover:underline">
            Naar de catalogus →
          </Link>
        </p>
      </div>
    </article>
  );
}
