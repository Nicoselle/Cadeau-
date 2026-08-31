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
          Hoe de vier lagen tot één advies convergeren
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Azimut is geen orakel. Het is een weegschaal. Elke laag produceert
          een onafhankelijke variabele. De synthese zoekt overlap, markeert
          paradoxen, en schrijft directeurstaal. De berekening gebeurt in de
          browser — zonder AI en zonder server.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Relative Age Effect</h2>
        <p className="leading-relaxed text-muted-foreground">
          De schoolpeildatum van het land waarin je opgroeide bepaalt of je de
          relatief oudste of jongste in het cohort was. Empirisch werk op S&amp;P-CEO&apos;s
          en 17 miljoen Taobao-verkopers koppelt die positie aan risicobereidheid,
          schuldfinanciering en de kans om te ondernemen. België gebruikt het
          kalenderjaar; Nederland de oktober-peildatum; VS, VK en China 1 september.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">BaZi → industrie</h2>
        <p className="leading-relaxed text-muted-foreground">
          De vier pilaren worden gereduceerd tot een dominant en ontbrekend
          element. Hout wijst naar groei en menselijk kapitaal, vuur naar
          zichtbaarheid, aarde naar activa, metaal naar financiële systemen,
          water naar distributie. De interface noemt die elementen niet.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Numerologie → waarom en wanneer</h2>
        <p className="leading-relaxed text-muted-foreground">
          Levenspad, expressie, zielewens en persoonlijkheid komen uit naam en
          datum. De persoonlijke jaarcyclus (1–9) scandeert start, alliantie,
          zichtbaarheid, fundament, pivot, verantwoordelijkheid, analyse,
          kapitaal of consolidatie.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Human Design / BG5 → mechanica</h2>
        <p className="leading-relaxed text-muted-foreground">
          Tropische planetaire lengtes, I Tjing-poorten en kanalen bepalen type,
          autoriteit en profiel. Initiators starten en delegeren. Builders voeren
          uit. Advisors optimaliseren in korte vensters. Evaluators spiegelen
          systemen. De omgevingsstijl (solo / penta / grote groep) is in deze
          MVP een gedocumenteerde heuristiek tot een gelicentieerde Penta-engine
          beschikbaar is.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Wat dit niet is</h2>
        <p className="leading-relaxed text-muted-foreground">
          Geen voorspelling van omzet, geen vervanging van due diligence, geen
          Swiss Ephemeris-productie-engine. Een fout van vijftien minuten in de
          geboortetijd kan een poort verschuiven. Productie vereist Nominatim +
          historische tijdzones. De sociologische laag is empirisch; de andere
          drie zijn gestructureerde systemen die we als heuristiek wegen.
        </p>
      </section>

      <p>
        <Link href="/#intake" className="text-primary hover:underline">
          Bereken een briefing
        </Link>
      </p>
    </article>
  );
}
