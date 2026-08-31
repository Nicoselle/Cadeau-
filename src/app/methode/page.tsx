import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methode",
};

export default function MethodePage() {
  return (
    <article className="container max-w-3xl space-y-10 py-16">
      <header className="space-y-4">
        <p className="type-kicker">Methode</p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Hoe vier bronnen tot één advies komen
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Azimut is geen orakel. Het weegt vier onafhankelijke bronnen tegen
          elkaar. Waar ze overlappen, schrijven we een dossier. Waar ze bijten,
          markeren we de spanning. De berekening gebeurt in je browser. Geen
          artificiële intelligentie, geen server, geen account.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Klaspositie en risico</h2>
        <p className="leading-relaxed text-muted-foreground">
          De schoolpeildatum van het land waarin je opgroeide bepaalt of je de
          relatief oudste of jongste in de klas was. Onderzoek op topbestuurders
          en miljoenen verkopers koppelt die positie aan risicobereidheid,
          schuldfinanciering en de kans om te ondernemen. België gebruikt het
          kalenderjaar. Nederland de oktober-peildatum. De Verenigde Staten, het
          Verenigd Koninkrijk en China 1 september.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Sector</h2>
        <p className="leading-relaxed text-muted-foreground">
          Uit geboortedatum en -uur volgt een hoofdlijn: groei en mensen,
          zichtbaarheid, vastgoed, cijfers of distributie. De interface noemt
          geen elementen en geen Chinese labels. Je ziet sectoren waarin
          diezelfde inzet van pas komt.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Drijfveer en timing</h2>
        <p className="leading-relaxed text-muted-foreground">
          Naam en geboortedatum geven een drijfveer: solo-commando, tandem,
          merk, orde, beweging, verantwoordelijkheid, onderzoek, kapitaal of
          afronden. Het persoonlijke jaar (1 tot 9) zegt of dit jaar eerder
          openen, een vennoot zoeken, zichtbaar worden of sluiten vraagt.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Rol, besluit en schaal</h2>
        <p className="leading-relaxed text-muted-foreground">
          Geboortetijd en plaats bepalen hoe je werkt. Aanjagers starten en
          laten het werk los. Uitvoerders houden tempo. Gidsen zien het systeem
          en mogen het niet zelf sleuren. Waarnemers lezen de markt en de ploeg.
          De schaal — alleen, een duo, drie tot vijf, of een grotere
          organisatie — is hier een werkhypothese, geen wet.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Wat dit niet is</h2>
        <p className="leading-relaxed text-muted-foreground">
          Geen voorspelling van omzet. Geen vervanging van een boekhouder of advocaat. Een
          fout van een kwartier in de geboortetijd kan de rol verschuiven.
          De klaspositie rust op empirisch werk. De andere drie bronnen zijn
          gestructureerde systemen die we als hypothese wegen, niet als
          oorzakelijke wet.
        </p>
      </section>

      <p>
        <Link href="/#intake" className="text-primary hover:underline">
          Maak een dossier
        </Link>
      </p>
    </article>
  );
}
