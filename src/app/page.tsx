import { IntakeForm } from "@/components/intake-form";
import { SITE } from "@/lib/site";

const LAYERS = [
  {
    code: "01",
    title: "Cohort & risico",
    body: "Relative Age Effect: schoolpeildatum × geboortemaand → risicobereidheid, schuldcapaciteit, leiderschapsbias.",
  },
  {
    code: "02",
    title: "Sector",
    body: "BaZi-elementen mappen op industrieën: hout, vuur, aarde, metaal, water.",
  },
  {
    code: "03",
    title: "Drijfveer & timing",
    body: "Levenspad, expressie en de negenjarige jaarcyclus. Het waarom, en wanneer je opent of sluit.",
  },
  {
    code: "04",
    title: "Organisatie",
    body: "BG5-mechanica: rol, besluitvorming, schaal (solo / penta / grote groep) en ontbrekende skills.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="container grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="space-y-8">
          <p className="type-kicker">{SITE.name}</p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Geen horoscoop. Een bedrijfsblauwdruk.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Vier datalagen. Eén besluit. Azimut vertaalt geboortedata naar sector,
            schaal, risicoprofiel en de eerste aanname die je moet doen.
          </p>
          <dl className="grid max-w-lg grid-cols-3 gap-4 border-y border-border py-5">
            <div>
              <dt className="type-kicker">Lagen</dt>
              <dd className="mt-2 text-2xl font-semibold">4</dd>
            </div>
            <div>
              <dt className="type-kicker">Output</dt>
              <dd className="mt-2 text-2xl font-semibold">1 dossier</dd>
            </div>
            <div>
              <dt className="type-kicker">Jargon</dt>
              <dd className="mt-2 text-2xl font-semibold">0</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="type-kicker">Intake</p>
          <h2 className="mt-2 text-xl font-semibold">Bereken het kompas</h2>
          <p className="mb-6 mt-2 text-sm text-muted-foreground">
            Geboortedatum, tijd en plaats. Optioneel de geboortedatum van het bedrijf.
          </p>
          <IntakeForm />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container grid gap-8 py-16 md:grid-cols-2 lg:grid-cols-4">
          {LAYERS.map((layer) => (
            <article key={layer.code} className="space-y-3">
              <p className="type-kicker">{layer.code}</p>
              <h2 className="text-lg font-semibold">{layer.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
