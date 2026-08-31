import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methode",
  description:
    "Hoe de Kapitaalkrant werkt: bronnenladder, bonnen, steenman, en waarom publicatie een menselijke beslissing blijft.",
};

export default function MethodPage() {
  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Huisregels
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Methode
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Deze krant is zelfstandig: geen socialefeed, geen paywall-aggregator,
        geen live-koersen van een broker. Wat u leest, staat hier, met de reeks
        ernaast.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-semibold">Wat wij wel doen</h2>
          <ul className="mt-4 space-y-3 font-serif leading-relaxed">
            <li>Elk cijfer draagt een bon: URL, ophaaldatum, en waar mogelijk de vintage.</li>
            <li>Berekeningen zijn herleidbaar uit de CSV’s in de datavloer.</li>
            <li>Feiten, duiding en ramingen blijven gescheiden — in de tekst en in de kantlijn.</li>
            <li>Elke seizoensgecorrigeerde reeks wordt naast de ongecorrigeerde gelegd.</li>
            <li>Etiketten volgen de publicerende instelling. «Kerninflatie» is wat Statbel zo noemt.</li>
            <li>Elk stuk krijgt een steenman: de sterkste tegenwerping, eerlijk weergegeven.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold">Wat wij niet doen</h2>
          <ul className="mt-4 space-y-3 font-serif leading-relaxed">
            <li>Geen beleggingsadvies, geen koop- of verkooporders, geen modelportefeuille.</li>
            <li>Geen accounts bij databronnen. Publieke routes of het staat er niet.</li>
            <li>Geen headlines als reeks verkopen. Een ECB-homepagecijfer blijft een headline.</li>
            <li>Geen stille revisies. Correcties — zoals het etiket kerninflatie — blijven zichtbaar.</li>
          </ul>
        </section>
      </div>

      <section className="mt-12 border-t-2 border-foreground pt-8">
        <h2 className="font-display text-2xl font-semibold">Bronnenladder</h2>
        <ol className="mt-4 max-w-3xl list-decimal space-y-3 pl-5 font-serif leading-relaxed">
          <li>
            <strong>FRED</strong> — hoofdbron voor macroreeksen, inclusief
            Eurostat-spiegelreeksen. Route: fredgraph.csv.
          </li>
          <li>
            <strong>Statbel bestat-API</strong> — officiële Belgische CPI,
            gezondheidsindex, afgevlakte index. JSON-export, niet de
            CAPTCHA-datasetpagina.
          </li>
          <li>
            <strong>Federaal Planbureau</strong> — spilindex en
            indexvooruitzichten. Controleer de vintagedatum in de titel.
          </li>
          <li>
            <strong>Treasury FiscalData</strong> — Amerikaanse staatsschuld en
            rentelast.
          </li>
          <li>
            <strong>ECB Data Portal</strong> — alleen homepage-headlines tot de
            API bereikbaar is.
          </li>
        </ol>
      </section>

      <section className="mt-12 max-w-3xl font-serif leading-relaxed">
        <h2 className="font-display text-2xl font-semibold">Statuut</h2>
        <p className="mt-4">
          De Kapitaalkrant is een zelfstandige publicatie. De redactie schrijft
          en rekent; publicatie van een nieuwe editie is een bewuste
          beslissing, geen automatische feed. Deze eerste editie sluit op de
          vloer van 18 augustus 2026.
        </p>
        <p className="mt-4">
          Het orakelboek is de geloofwaardigheidsstaat. Op de toetsdatum wordt
          de betrokken reeks opnieuw opgehaald en de uitkomst bijgeschreven:
          goed, fout of deels. Niets wordt weggewist.
        </p>
        <p className="mt-4">
          Lees ook{" "}
          <Link href="/orakelboek" className="underline hover:text-accent">
            het orakelboek
          </Link>{" "}
          en de{" "}
          <Link href="/markten" className="underline hover:text-accent">
            datavloer
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
