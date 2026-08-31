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
      <p className="kicker">
        Huisregels
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        Methode
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Deze krant is zelfstandig: geen stroom berichten van elders, geen
        verzamelplaats achter een betaalmuur, geen loket met een koopknop. Wat
        u leest, staat hier, met de reeks ernaast. De volglijst toont de
        laatste openbare notering — dat is geen datavloer.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-semibold">Wat wij wel doen</h2>
          <ul className="mt-4 space-y-3 font-serif leading-relaxed">
            <li>Elk cijfer draagt een bon: URL, ophaaldatum, en waar mogelijk de vintage.</li>
            <li>Berekeningen zijn herleidbaar uit de CSV’s in de datavloer.</li>
            <li>
              Peildatum publicatie is 31 augustus 2026. Elke reeks houdt haar
              eigen laatste waarneming. Een afgeleid cijfer — reële rente,
              spread — gebruikt alleen de laatste datum die in alle gebruikte
              reeksen voorkomt.
            </li>
            <li>Feiten, duiding en ramingen blijven gescheiden — in de tekst en in de kantlijn.</li>
            <li>Elke seizoensgecorrigeerde reeks wordt naast de ongecorrigeerde gelegd.</li>
            <li>Etiketten volgen de publicerende instelling. «Kerninflatie» is wat Statbel zo noemt.</li>
            <li>Elk stuk krijgt een steenman: de sterkste tegenwerping, eerlijk weergegeven.</li>
            <li>
              Loon-, belasting- en pensioenmaatregelen: tijdelijk in de
              regel is niet tijdelijk in de portemonnee. Vraag of het
              gemiste bedrag later nominaal wordt ingehaald — ja, nee, of
              onbekend — en reken één voorbeeld. De centenindex stopt na
              2 procent; het niveauverschil blijft.
            </li>
            <li>
              Rubrieken zijn meer dan landen. Geld, rente, grondstoffen en
              titels hebben een eigen plank. De inhoudsopgave staat op{" "}
              <Link href="/rubrieken">rubrieken</Link>.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold">Wat wij niet doen</h2>
          <ul className="mt-4 space-y-3 font-serif leading-relaxed">
            <li>
              Geen erkende adviesrelatie, geen koopknop. De piramide dient ter
              lering; ieder blijft verantwoordelijk voor eigen beslissingen.
            </li>
            <li>Geen accounts bij databronnen. Een openbare weg, of het staat er niet.</li>
            <li>Geen kopcijfer als reeks verkopen. Een cijfer van de ECB-startpagina blijft een bekendmaking.</li>
            <li>Geen stille revisies. Correcties — zoals het etiket kerninflatie — blijven zichtbaar.</li>
          </ul>
        </section>
      </div>

      <section className="mt-12 border-t-2 border-foreground pt-8">
        <h2 className="font-display text-2xl font-semibold">Bronnenladder</h2>
        <ol className="mt-4 max-w-3xl list-decimal space-y-3 pl-5 font-serif leading-relaxed">
          <li>
            <strong>FRED</strong> — hoofdbron voor conjunctuurreeksen, inclusief
            Eurostat-spiegelreeksen, Brent, WTI, koper en uranium. Route:
            fredgraph.csv.
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
            <strong>ECB Data Portal</strong> — alleen bekendmakingen op de
            startpagina, tot de programmatuur bereikbaar is.
          </li>
        </ol>
      </section>

      <section className="mt-12 max-w-3xl font-serif leading-relaxed">
        <h2 className="font-display text-2xl font-semibold">
          Piramide
        </h2>
        <p className="mt-4">
          De investeringspiramide is de methode van SafeCapital om kapitaal
          veilig te stellen: 40 procent edelmetalen, 30 procent liquide
          middelen (50 procent euro, 40 procent dollar, 5 procent frank,
          5 procent kroon), 20 procent beursgenoteerde aandelen, 10 procent
          crypto (Bitcoin, Monero, Gram — Ton is Gram). Winst nemen verstevigt
          eerst de basis. Nooit in één keer in of uit een aandeel. Nooit met
          het laatste geld. De inhoud dient ter lering; SafeCapital is geen
          erkende beleggingsadviseur. Koersen komen van de openbare notering.
          De datavloer blijft het rekenblad.
        </p>
        <p className="mt-4">
          Op dezelfde pagina staan de dossiers per gevolgde naam, conjunctuur
          alleen waar die die namen raakt (titel, bron, verwijzing), en de
          koerslezing van de zwaardere titels: zwaai, breuk, karakterwissel,
          onevenwicht. Dat is raming, geen order. Standen hebben een datum en
          een herzieningsregel — geen koersdoel.
        </p>
        <p className="mt-4">
          <Link href="/piramide" className="underline hover:text-accent">
            Naar de piramide
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 max-w-3xl font-serif leading-relaxed">
        <h2 className="font-display text-2xl font-semibold">Andere uitgaven</h2>
        <p className="mt-4">
          Lokaal en Vesting horen niet bij de kop van deze krant. De adressen
          blijven: abonnees kiezen gemeenten; alleen die plaatsen worden
          afgezocht. Vesting is de lijst noodvoedsel. Geen redacteur die een
          stad «belangrijk» verklaart.
        </p>
        <p className="mt-4">
          <Link href="/lokaal" className="underline hover:text-accent">
            Lokaal
          </Link>
          {" · "}
          <Link href="/cadeau" className="underline hover:text-accent">
            Vesting
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 max-w-3xl font-serif leading-relaxed">
        <h2 className="font-display text-2xl font-semibold">Statuut</h2>
        <p className="mt-4">
          De Kapitaalkrant is een zelfstandige uitgave. De redactie schrijft
          en rekent; een nieuwe editie is een bewuste beslissing, geen
          automatische stroom. Editie 2 sluit op 31 augustus 2026; de vloer is
          dezelfde als die van editie 1. Alle nummers blijven leesbaar in het{" "}
          <Link href="/archief" className="underline hover:text-accent">
            archief
          </Link>
          .
        </p>
        <p className="mt-4">
          De dagelijkse klok, Brussels tijd: om 13 uur ligt de briefing, om
          14 uur neemt de uitgever de beslissingen, om 15 uur staat het stuk
          klaar. Standaard is dat De mening — één stelling, in de adem van
          de vroegere Knack, geen lijstje. Een nieuwe genummerde editie is
          extra. Een bot mag zetten, niet uitgeven.{" "}
          <Link href="/briefing" className="underline hover:text-accent">
            Naar de briefing
          </Link>
          .
        </p>
        <p className="mt-4">
          Het orakelboek is de geloofwaardigheidsstaat. Op de toetsdatum wordt
          de betrokken reeks opnieuw opgehaald en de uitkomst bijgeschreven:
          goed, fout of deels. Niets wordt weggewist.
        </p>
        <p className="mt-4">
          Augustus 2026 is terugwerkend uitgewerkt: elke weekdag een mening,
          met alleen de laatste waarneming op of vóór die dag. De H.6 van 25
          augustus zet juli-M2 in een vintage naast de editievloer; juni in
          de editie blijft 23.155,2. Controleer datum, bestand en getal op{" "}
          <Link href="/nazien" className="underline hover:text-accent">
            nazien
          </Link>
          .
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
