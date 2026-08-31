import type {
  BaziResult,
  BriefingExample,
  BriefingStep,
  CareerType,
  DesignResult,
  Element,
  NumerologyResult,
  RaeResult,
} from "@/types/briefing";

const FIRST_NAME = (fullName: string) => fullName.trim().split(/\s+/)[0] || "je";

const ROLE_STORY: Record<CareerType, string> = {
  initiator:
    "Jij bent degene die de eerste beweging maakt. Een product, een merk, een onderhandeling — het start bij jou. Daarna moet het werk uit je handen. Als je blijft uitvoeren, brandt de motor door en wordt het bedrijf een eenmansdienst in plaats van een initiatief.",
  "classic-builder":
    "Jij houdt het tempo vast. Waar anderen pieken en crashen, kun jij maandenlang dezelfde kwaliteit leveren — op voorwaarde dat je reageert op echte vraag, niet op een plan dat je jezelf oplegt. Een bedrijf dat van jouw handenwerk leeft, is geen straf; het is de juiste machine.",
  "express-builder":
    "Jij bouwt niet in een rechte lijn. Twee sporen tegelijk, een snelle pivot, een tweede product naast het eerste: dat is geen chaos als de kern vaststaat. Forceer één tunnel en je wordt ongeduldig. Geef jezelf een portefeuille met harde stopregels.",
  advisor:
    "Jij ziet het systeem sneller dan de mensen die erin werken. Dat is een zeldzame rol, en een gevaarlijke als je hem verkeerd inzet. Een uitvoerend bureau met lange dagen is voor jou een val. Jouw waarde zit in korte, scherpe vensters: diagnose, richting, de juiste vraag. Daarna moet iemand anders bouwen.",
  evaluator:
    "Jij leest de temperatuur van een markt, een team of een deal. Dat is geen zachte gave — het is een commercieel product als je het verpakt. Blijf je in de waan dat je zelf de operatie moet trekken, dan verdwijnt het signaal. Jouw bedrijf observeert, keurt en waarschuwt. Het hakt niet zelf het hout.",
};

const SECTOR_EXAMPLES: Record<Element, BriefingExample[]> = {
  wood: [
    {
      title: "Leiderschapsatelier voor scale-ups",
      story:
        "Een praktijk van drie tot vijf mensen die één ding verkoopt: een 90-dagenprogramma waarin een oprichter leert delegeren. Geen losse coachingsuurtjes. Een product met begin, midden en einde, gefactureerd vooraf.",
    },
    {
      title: "Fractional people-officer",
      story:
        "Twee dagen per maand bij drie groeibedrijven. Jij zet de hiring-scorecard en het ritme; een interne HR-coördinator voert uit. Omzet uit retainers, niet uit projectchaos.",
    },
    {
      title: "Opleidingsproduct, geen school",
      story:
        "Eén curriculum voor een smalle doelgroep — bijvoorbeeld eerste-lijn managers in maakbedrijven. Film het één keer, begeleid een cohort per kwartaal, schaal via partners in plaats van extra lesgevers.",
    },
  ],
  fire: [
    {
      title: "Merkstudio met een vast lanceringsscript",
      story:
        "Geen full-service agency. Eén belofte: in zes weken een zichtbare categorieclaim plus het eerste campagneblok. Daarna onderhoud op retainer of je stapt eruit.",
    },
    {
      title: "Niche-mediakanaal dat deals voedt",
      story:
        "Een wekelijkse brief of show voor één industrie. Het mediakanaal is de lokker; de omzet zit in events, introducties of een betaalde desk. Jij bent het gezicht, iemand anders produceert.",
    },
    {
      title: "AI-tool met een luide go-to-market",
      story:
        "Een smalle workflow automatiseren — offertes, claims, roosters — en die luid in één vakgroep zetten. Snelle marktpenetratie, geen platformfantasie in jaar één.",
    },
  ],
  earth: [
    {
      title: "Kleine vastgoed- of projectvennootschap",
      story:
        "Eén tot drie activa, lange horizon, conservatieve leverage. Jij bewaakt de onderwriting; een projectleider en een boekhouder houden de machine draaiende.",
    },
    {
      title: "Kwaliteitsaudit voor bouwers en ontwikkelaars",
      story:
        "Een productized inspectie vóór aankoop of oplevering. Vaste prijs, vast rapport, geen eindeloze consultancy. Schaal via een netwerk van specialisten, niet via een eigen aannemersploeg.",
    },
    {
      title: "Verzekerings- of risicopraktijk",
      story:
        "Niches dekken die banken laten liggen: aannemers, horeca, collectieve polissen. Groei zit in herhaling en relaties, niet in een app die de sector gaat ontwrichten.",
    },
  ],
  metal: [
    {
      title: "CFO-as-a-service voor vijf klanten",
      story:
        "Maandelijkse close, cashforecast, bankgesprek. Geen boekhoudkantoor dat honderd microklanten jaagt. Vijf serieuze bedrijven, één standaardpakket, één implementatiepartner.",
    },
    {
      title: "Fintech-wig, geen bank",
      story:
        "Eén pijn: facturen innen, BTW-voorschotten, escrow tussen aannemer en bouwheer. Regelgeving is het moat. Jij ontwerpt de regels; engineers bouwen.",
    },
    {
      title: "Gespecialiseerd hardware- of engineeringbureau",
      story:
        "Een meetbaar component of proto-lijn, niet een ‘innovatielab’. Contracten met duidelijke milestones. Jouw scherpte zit in spec en tolerantie, niet in salesavonden.",
    },
  ],
  water: [
    {
      title: "Nichdistributie of wholesale-brug",
      story:
        "Eén productfamilie, één corridor — bijvoorbeeld Belgische specialiteiten naar Duitse horeca, of onderdelen naar installateurs. Winst zit in voorraaddiscipline en relaties, niet in een marktplaats voor iedereen.",
    },
    {
      title: "E-commerce met eigen logistieke afspraak",
      story:
        "Geen dropship-casino. Een SKU-set die je begrijpt, een 3PL-contract, en wekelijkse cashcontrole. Jij ontwerpt de flow; fulfilment ligt buiten huis.",
    },
    {
      title: "B2B-connectiviteit of data-pijp",
      story:
        "Systemen laten praten: ERP naar shop, shop naar magazijn. Projecten met een vast integratieplaybook. Jij verkoopt de architectuur, een builder legt de leidingen.",
    },
  ],
};

const RISK_STORY: Record<RaeResult["fundingBias"], string> = {
  "aggressive-debt":
    "In je formatieve jaren was je vaak de oudste in de groep. Dat kweekt een vroege gewoonte om ruimte in te nemen — nuttig bij onderhandelen, gevaarlijk als het zich vertaalt in te vroege schuld. Gebruik tempo, maar schrijf vooraf op bij welk cashcijfer je stopt.",
  balanced:
    "Je zat in het midden van het cohort: noch de natuurlijke aanvoerder, noch de eeuwige inhaler. Dat is een bruikbaar temperament. Groei in stappen die een klant al heeft betaald. Geen heldhaftige kapitaalronde om een gat in het ego te dichten.",
  "conservative-margin":
    "Als relatief jongste leerde je winnen zonder de luidste stem. Dat geeft later minder overmoed — en dat is een voordeel, geen gebrek. Start met marges die een slechte maand overleven. Laat een VC-verhaal links liggen tot de unit economics saai en herhaalbaar zijn.",
};

const DECISION_STORY: Record<DesignResult["authority"], { protocol: string; example: string }> = {
  emotional: {
    protocol:
      "Jouw eerste ja is zelden het ware ja. Enthousiasme en paniek liegen allebei. Een nacht later — beter: twee — zie je de deal zonder de chemie.",
    example:
      "Voorbeeld: een mede-oprichter belt vrijdagavond. Je wilt tekenen. Zeg: ‘Maandag 10 uur, zelfde tafel, zonder wijn.’ Als de deal dan nog rechtop staat, is hij van jou.",
  },
  sacral: {
    protocol:
      "Jouw lichaam antwoordt sneller dan je argument. Een heldere ja voelt als beweging naar voren. Twijfel die je moet praten is bijna altijd een nee.",
    example:
      "Voorbeeld: een klant vraagt om een custom project buiten je product. Als je buik zakt, verkoop je het standaardpakket of je loopt weg. Geen ‘misschien later uitwerken’.",
  },
  splenic: {
    protocol:
      "Het eerste weten is het juiste. Heroverwegen is geen zorgvuldigheid, het is ruis. Beslis in de kamer, niet in de auto naar huis.",
    example:
      "Voorbeeld: je hoort een kandidaat praten en je weet binnen twee minuten dat het niet past. Beëindig het gesprek beleefd. Geen tweede ronde ‘om zeker te zijn’.",
  },
  ego: {
    protocol:
      "Jouw ja is een belofte van wil en middelen. Zeg het hardop, of zeg het niet. Een stilzwijgende toezegging is voor jou een valstrik.",
    example:
      "Voorbeeld: ‘Ik committeer 40.000 euro en zes maanden, en ik zeg dit tegen de boekhouder.’ Klinkt het hol, dan is het geen ja.",
  },
  "self-projected": {
    protocol:
      "Jij hoort de waarheid pas als je ze uitspreekt. Eén sparringpartner, geen commissie. Luister naar je eigen zin, niet naar hun advies.",
    example:
      "Voorbeeld: wandel 30 minuten en vertel hardop waarom je deze vennootschap zou starten. De zin die je twee keer herhaalt, is de lijn. De rest is versiering.",
  },
  mental: {
    protocol:
      "Jij hebt geen intern kompas voor dit soort keuzes. Dat is geen zwakte. Het betekent dat je mensen nodig hebt die in de operatie staan, en dat je hun gewicht groter maakt dan je model.",
    example:
      "Voorbeeld: vóór je een lease tekent, laat twee operators die dit werk doen de aannames afschieten. Als beiden hetzelfde gat zien, bestaat het gat.",
  },
  lunar: {
    protocol:
      "Jouw helderheid komt in golven van ongeveer een maand. Structurele keuzes — vennootschap, huur, partner — horen die cyclus uit. Impuls is hier geen durf, het is ruis.",
    example:
      "Voorbeeld: noteer de deal op dag 1, herlees op dag 14 en dag 28. Alleen wat op alle drie de dagen overeind blijft, mag naar de notaris.",
  },
};

const YEAR_MOVES: Record<number, { story: string; move: string }> = {
  1: {
    story: "Dit is een openingsjaar. Wat je nu niet start, start je dit decennium waarschijnlijk niet.",
    move: "Kies één voertuig, registreer het, en zeg nee tegen het tweede idee tot er omzet is.",
  },
  2: {
    story: "Dit jaar beloont geduld en de juiste alliantie, niet de solo-sprint.",
    move: "Zoek één partner of ankerklant. Teken niets in week één van de flirt.",
  },
  3: {
    story: "Zichtbaarheid is dit jaar goedkoop. Stilte is duur.",
    move: "Publiceer wekelijks één scherpe observatie in jouw sector. Pitch daarna, niet ervoor.",
  },
  4: {
    story: "Fundamenten. Saaie systemen winnen van charisma.",
    move: "Zet facturatie, contracten en een maandelijkse close vóór je een tweede product bedenkt.",
  },
  5: {
    story: "Beweging is toegestaan, zwerven niet.",
    move: "Draai één gecontroleerde pilot naast de kern. Kill-datum in de kalender, geen eeuwig experiment.",
  },
  6: {
    story: "Verantwoordelijkheid wordt zichtbaar: team, klanten, verplichtingen.",
    move: "Formaliseer wie wat beslist. Mondelinge afspraken horen dit jaar op papier.",
  },
  7: {
    story: "Een jaar om te meten en te snijden, niet om te pronken.",
    move: "Schrap het zwakste aanbod. Publiceer geen rebrand, publiceer een schonere P&L.",
  },
  8: {
    story: "Kapitaal en macht liggen op tafel — voor wie cijfers heeft, niet verhalen.",
    move: "Heronderhandel je grootste contract. Vraag de prijs die de data draagt.",
  },
  9: {
    story: "Afronden is dit jaar winst. Vasthouden uit gewoonte is verlies.",
    move: "Sluit of verkoop wat geen kern is. Maak ruimte; het volgende voertuig komt daarna.",
  },
};

function sectorNoun(bazi: BaziResult): string {
  return bazi.sectors.slice(0, 2).join(" of ");
}

export function buildLede(
  name: string,
  headline: string,
  careerType: CareerType,
  bazi: BaziResult,
): string {
  const first = FIRST_NAME(name);
  const opener: Record<CareerType, string> = {
    initiator: `${first}, jij moet iets in beweging zetten dat anderen afmaken.`,
    "classic-builder": `${first}, jij moet iets bouwen dat je wekenlang kunt volhouden.`,
    "express-builder": `${first}, jij moet een wendbare portefeuille bouwen, geen enkele tunnel.`,
    advisor: `${first}, jij moet gidsen — niet sleuren.`,
    evaluator: `${first}, jij moet de markt lezen, niet de ploeg aanvoeren.`,
  };
  return `${opener[careerType]} Het passende voertuig is een ${headline.toLowerCase()}, geworteld in ${sectorNoun(bazi)}. Geen daghoroscoop: een werkafspraak met jezelf.`;
}

export function buildNarrative(
  name: string,
  rae: RaeResult,
  bazi: BaziResult,
  numerology: NumerologyResult,
  design: DesignResult,
  headline: string,
): string {
  const first = FIRST_NAME(name);
  const year = YEAR_MOVES[numerology.personalYear] ?? YEAR_MOVES[1];
  const decision = DECISION_STORY[design.authority];
  const parts = [
    `${first}, het patroon is consistent. ${ROLE_STORY[design.careerType]} In jouw geval wijst de industriële laag naar ${sectorNoun(bazi)} — niet omdat het ‘spiritueel past’, maar omdat die markten dezelfde spier vragen als jouw profiel.`,
    RISK_STORY[rae.fundingBias],
    `Onder de motorkap zit een drijfveer die draait om ${lifePathPlain(numerology.lifePath)}. ${year.story} ${decision.protocol}`,
    `Concreet: richt het bedrijf in als ${headline.toLowerCase()}. Houd de eerste versie kleiner dan je ego. Als het werkt, schaal je de machine — niet jouw agenda.`,
  ];
  return parts.join("\n\n");
}

function lifePathPlain(n: number): string {
  const map: Record<number, string> = {
    1: "zelfstandig commando",
    2: "diplomatie en de juiste dyade",
    3: "stem, merk en publiek",
    4: "orde, systemen en tastbare output",
    5: "bewegingsvrijheid en commerciële iteratie",
    6: "verantwoordelijkheid voor mensen",
    7: "onderzoek, privacy en analyse achter de schermen",
    8: "kapitaal, onderhandeling en schaal",
    9: "afronden, overdragen en een bredere cirkel",
    11: "richting geven via een scherpe visie",
    22: "grote, bouwbare structuren",
    33: "anderen tillen zonder zelf het werk te doen",
  };
  return map[n] ?? "een herkenbare, eigen lijn";
}

export function pickExamples(careerType: CareerType, bazi: BaziResult): BriefingExample[] {
  const base = SECTOR_EXAMPLES[bazi.dominant];
  if (careerType === "advisor" || careerType === "evaluator") {
    return base.map((item) => ({
      ...item,
      story: `${item.story} Jij blijft de architect; uitvoering zit bij een builder of een vast netwerk.`,
    }));
  }
  if (careerType === "initiator") {
    return base.map((item) => ({
      ...item,
      story: `${item.story} Jij opent de deur en verdwijnt uit de dagelijkse stand-up.`,
    }));
  }
  return base;
}

export function buildSteps(
  design: DesignResult,
  bazi: BaziResult,
  numerology: NumerologyResult,
  rae: RaeResult,
  company: string,
): BriefingStep[] {
  const year = YEAR_MOVES[numerology.personalYear] ?? YEAR_MOVES[1];
  const decision = DECISION_STORY[design.authority];
  const sector = sectorNoun(bazi);
  const firstHire =
    design.missingSkills[0]
      ? `Iemand die ${design.missingSkills[0].toLowerCase()} als vak meeneemt — geen tweede visionair.`
      : "Een specialist, geen tweede generaal.";

  const steps: BriefingStep[] = [
    {
      window: "Dag 1–7",
      title: "Schrijf het voertuig op één blad",
      detail: `Eén zin: welk probleem, voor wie, in ${sector}. Eén zin: wat je nooit zult doen. Eén zin: hoe het geld binnenkomt. Noem het een ${company.toLowerCase()}, niet ‘een start-up’. Als je het niet in zes zinnen kunt zeggen, is het nog geen bedrijf.`,
    },
    {
      window: "Week 2–3",
      title: "Acht gesprekken, geen pitch",
      detail: `Bel acht mensen die al in ${bazi.sectors[0]} werken. Vraag waar ze geld verliezen. Bied niets aan. Noteer de zin die drie keer terugkomt — dat is je eerste aanbod.`,
    },
    {
      window: "Week 4–6",
      title: "Verkoop één vast product",
      detail: `Geen maatwerk. Een diagnose, een audit, een sprint of een retainer met een vast resultaat en een vaste prijs. Factureer 50% vooraf. Twee betalende klanten slaan een website.`,
    },
    {
      window: "Maand 2",
      title: `Beslis volgens je protocol`,
      detail: `${decision.example} Zet deze regel in je agenda als een afspraak met jezelf, niet als een voornemen.`,
    },
    {
      window: "Maand 2–3",
      title: "Vul het gat dat jij niet bent",
      detail: `Jouw eerste aanname of freelancer is ${firstHire} Laat die persoon de kalender, de levering of de cijfers trekken. Jij blijft op de rol die het dossier je toekent.`,
    },
    {
      window: "Dit jaar",
      title: year.move.split(".")[0] ?? "Houd het jaar groots en het voertuig klein",
      detail: `${year.story} ${year.move} Financiering: ${fundingStep(rae)}.`,
    },
  ];

  if (design.careerType === "advisor" || design.careerType === "evaluator") {
    steps.splice(3, 0, {
      window: "Elke werkdag",
      title: "Twee tot vier uur diep werk, daarna stoppen",
      detail:
        "Blokkeer ochtenden. Geen Slack-avond. De waarde zit in de scherpte van die uren, niet in aanwezigheid. Wat daarna nog moet, is werk voor de builder.",
    });
  }

  return steps;
}

function fundingStep(rae: RaeResult): string {
  if (rae.fundingBias === "aggressive-debt") {
    return "schuld mag, als de kill-switch op papier staat (cash-runway in weken, niet in hoop)";
  }
  if (rae.fundingBias === "conservative-margin") {
    return "geen VC, geen persoonlijke lening voor groei; herinvesteren uit marge";
  }
  return "groei die een klant al betaalde; vreemd vermogen alleen tegen een getekende order";
}

export function buildAvoid(
  design: DesignResult,
  rae: RaeResult,
  bazi: BaziResult,
): string[] {
  const items = [
    `Geen algemeen bureau ‘dat alles doet’. Blijf bij ${bazi.sectors[0]}.`,
    "Geen mede-oprichter die hetzelfde profiel heeft als jij. Dat verdubbelt het ego en laat het gat open.",
  ];
  if (design.careerType === "advisor" || design.careerType === "evaluator") {
    items.push("Geen arbeidsintensieve operatie, geen magazijn, geen 9-tot-5-dienstverlening die jij zelf draait.");
  }
  if (design.careerType === "initiator") {
    items.push("Geen rol waarin jij de dagelijkse stand-up leidt. Dat is andermans werk.");
  }
  if (rae.fundingBias === "conservative-margin") {
    items.push("Geen groeiverhaal dat alleen werkt als een fonds je runtweet.");
  }
  if (rae.fundingBias === "aggressive-debt") {
    items.push("Geen tweede lening omdat de eerste ‘bijna’ werkte. Eerst de kill-switch, dan pas gas.");
  }
  return items;
}

export function decisionBlock(design: DesignResult): string {
  const item = DECISION_STORY[design.authority];
  return `${item.protocol}\n\n${item.example}`;
}

export function timingBlock(numerology: NumerologyResult): string {
  const year = YEAR_MOVES[numerology.personalYear] ?? YEAR_MOVES[1];
  const extra = numerology.companyYear
    ? ` Het bedrijf zelf zit in jaar ${numerology.companyYear}: behandel die cyclus als de kalender van de vennootschap, niet als de jouwe.`
    : "";
  return `Persoonlijk jaar ${numerology.personalYear}. ${year.story} ${year.move}${extra}`;
}
