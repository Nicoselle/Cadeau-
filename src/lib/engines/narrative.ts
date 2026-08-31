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

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || "Je";
}

const ROLE_STORY: Record<CareerType, string> = {
  initiator:
    "Jij zet dingen in gang. Een aanbod, een onderhandeling, een eerste klant: dat begint bij jou. Daarna mag het werk van je bord. Blijf je alles zelf doen, dan hou je een eenmanszaak over — en daar word je moe van.",
  "classic-builder":
    "Jij kunt tempo houden. Waar anderen opveren en weer inzaken, lever jij wekenlang dezelfde kwaliteit. Op voorwaarde dat je reageert op echte vraag, niet op een plan dat je jezelf oplegt. Een zaak die van jouw handen leeft, past bij je.",
  "express-builder":
    "Jij werkt zelden op één spoor. Twee lijnen tegelijk, een tweede product naast het eerste: dat is geen wanorde als de kern vaststaat. Dwing je jezelf in één tunnel, dan word je ongeduldig. Houd het klein, met een harde stopdatum per proef.",
  advisor:
    "Jij ziet het systeem sneller dan de mensen die erin werken. Dat is een cadeau, en een val als je het verkeerd inzet. Lange dagen in een uitvoerend kantoor putten je uit. Jouw werk zit in korte, scherpe blokken: kijken, richting geven, de juiste vraag. Daarna mag iemand anders uitvoeren.",
  evaluator:
    "Jij voelt hoe een markt, een ploeg of een deal erbij zit. Dat is geen zachte eigenschap. Het is verkoopbaar als je het in een vast rapport of een vaste opdracht giet. Probeer je zelf de zaak te trekken, dan verdwijnt net dat scherpe oog. Jouw zaak kijkt, keurt en waarschuwt. Zij voert niet zelf uit.",
};

const SECTOR_EXAMPLES: Record<Element, BriefingExample[]> = {
  wood: [
    {
      title: "Leiderschapsprogramma voor groeibedrijven",
      story:
        "Een kantoor van drie tot vijf mensen dat één ding verkoopt: een traject van negentig dagen waarin een oprichter leert delegeren. Geen losse coachingsuren. Een aanbod met begin, midden en einde, vooraf gefactureerd.",
    },
    {
      title: "HR-verantwoordelijke voor een paar dagen per maand",
      story:
        "Twee dagen per maand bij drie groeibedrijven. Jij zet de aanwervingslijst en het ritme. Een interne coördinator voert uit. Omzet uit een maandelijkse overeenkomst, niet uit losse projecten.",
    },
    {
      title: "Opleiding voor één doelgroep, geen school",
      story:
        "Eén leerlijn voor een smalle groep, bijvoorbeeld eerstelijnschefs in maakbedrijven. Neem het één keer op, begeleid elk kwartaal een groep, groei via partners in plaats van extra lesgevers.",
    },
  ],
  fire: [
    {
      title: "Merkstudio met een vast lanceringsscript",
      story:
        "Geen bureau dat alles doet. Eén belofte: in zes weken een zichtbare plaats in de markt plus de eerste campagne. Daarna een maandelijkse onderhoudsovereenkomst, of je stapt eruit.",
    },
    {
      title: "Vakblad of brief die opdrachten oplevert",
      story:
        "Elke week één scherpe brief voor één sector. Het kanaal trekt aandacht. De omzet zit in studiedagen, introducties of een betaald bureau. Jij bent het gezicht. Iemand anders maakt het af.",
    },
    {
      title: "Smal softwarehulpmiddel, luid in één vakgroep",
      story:
        "Automatiseer één vervelende stap — offertes, schadeclaims, roosters — en zet dat hard in één beroepsgroep. Snel zichtbaar. Geen platform dat in jaar één de hele keten wil vervangen.",
    },
  ],
  earth: [
    {
      title: "Kleine vastgoed- of projectvennootschap",
      story:
        "Eén tot drie panden of projecten, lange horizon, voorzichtige lening. Jij bewaakt de cijfers voor aankoop. Een projectleider en een boekhouder houden de zaak draaiende.",
    },
    {
      title: "Kwaliteitscontrole voor bouwers en ontwikkelaars",
      story:
        "Een vaste inspectie vóór aankoop of oplevering. Vaste prijs, vast rapport, geen eindeloos advies. Groei via een netwerk van specialisten, niet via een eigen aannemersploeg.",
    },
    {
      title: "Verzekerings- of risicokantoor",
      story:
        "Niches die banken laten liggen: aannemers, horeca, collectieve polissen. Groei zit in herhaling en relaties, niet in een toepassing die de sector zou moeten omgooien.",
    },
  ],
  metal: [
    {
      title: "Financieel directeur voor vijf klanten",
      story:
        "Maandelijkse afsluiting, kasprognose, bankgesprek. Geen boekhoudkantoor dat honderd kleine dossiers jaagt. Vijf serieuze bedrijven, één standaardpakket, één partner voor de uitvoering.",
    },
    {
      title: "Financiële schakel, geen bank",
      story:
        "Eén pijn: facturen innen, btw-voorschotten, waarborg tussen aannemer en bouwheer. De regelgeving is je bescherming. Jij ontwerpt de afspraken. Technici bouwen het systeem.",
    },
    {
      title: "Gespecialiseerd ingenieurskantoor",
      story:
        "Een meetbaar onderdeel of een prototype met duidelijke mijlpalen, geen ‘innovatielab’. Jouw scherpte zit in specificatie en tolerantie, niet in netwerkavonden.",
    },
  ],
  water: [
    {
      title: "Distributie in één niche",
      story:
        "Eén productfamilie, één corridor. Bijvoorbeeld Belgische specialiteiten naar Duitse horeca, of onderdelen naar installateurs. Winst zit in voorraaddiscipline en relaties, niet in een marktplaats voor iedereen.",
    },
    {
      title: "Webwinkel met een vaste logistieke afspraak",
      story:
        "Geen winkel zonder eigen voorraad. Een beperkte catalogus die je begrijpt, een contract met een magazijn, wekelijkse kascontrole. Jij ontwerpt de keten. De verzending ligt buiten huis.",
    },
    {
      title: "Koppeling tussen bedrijfssystemen",
      story:
        "Systemen laten praten: boekhouding naar webwinkel, webwinkel naar magazijn. Projecten met een vast stappenplan. Jij verkoopt de architectuur. Een uitvoerder legt de verbindingen.",
    },
  ],
};

const RISK_STORY: Record<RaeResult["fundingBias"], string> = {
  "aggressive-debt":
    "Op school was je vaak de oudste in de klas. Dat kweekt de gewoonte om ruimte in te nemen. Handig aan de onderhandelingstafel. Gevaarlijk als het zich vertaalt in te vroege schulden. Tempo mag, als je vooraf opschrijft bij welk kascijfer je stopt.",
  balanced:
    "Je zat in het midden van de klas: niet de natuurlijke aanvoerder, niet wie altijd moest inhalen. Dat is een bruikbaar temperament. Groei in stappen die een klant al heeft betaald. Geen kapitaalronde om indruk te maken.",
  "conservative-margin":
    "Als jongste in de klas leerde je winnen zonder de luidste stem. Dat geeft later minder overmoed, en dat is een voordeel. Begin met marges die een slechte maand overleven. Laat durfkapitaal links liggen tot de winst per klant saai en herhaalbaar is.",
};

const DECISION_STORY: Record<DesignResult["authority"], { protocol: string; example: string }> = {
  emotional: {
    protocol:
      "Je eerste ja is zelden het juiste ja. Enthousiasme en paniek liegen allebei. Een nacht later, beter twee, zie je de afspraak zonder de opwinding.",
    example:
      "Een mede-oprichter belt vrijdagavond. Je wilt tekenen. Zeg: maandag om tien uur, dezelfde tafel, nuchter. Als de afspraak dan nog overeind staat, is ze van jou.",
  },
  sacral: {
    protocol:
      "Je lijf antwoordt sneller dan je redenering. Een echte ja voelt als beweging naar voren. Twijfel die je moet uitpraten, is bijna altijd een nee.",
    example:
      "Een klant vraagt maatwerk naast je vaste aanbod. Zakt je buik, dan verkoop je het standaardpakket of je zegt nee. Geen ‘we kijken later wel’.",
  },
  splenic: {
    protocol:
      "Het eerste weten is het juiste. Opnieuw overwegen is geen zorgvuldigheid, het is ruis. Beslis in de kamer, niet in de auto naar huis.",
    example:
      "Je hoort een kandidaat praten en je weet binnen twee minuten dat het niet past. Beëindig het gesprek beleefd. Geen tweede ronde om zeker te zijn.",
  },
  ego: {
    protocol:
      "Jouw ja is een belofte van wil en middelen. Zeg het hardop, of zeg het niet. Een stilzwijgende toezegging is voor jou een valstrik.",
    example:
      "Zeg: ik zet veertigduizend euro en zes maanden in, en ik zeg dat tegen de boekhouder. Klinkt het hol, dan is het geen ja.",
  },
  "self-projected": {
    protocol:
      "Jij hoort de waarheid pas als je ze uitspreekt. Eén gesprekspartner, geen commissie. Luister naar je eigen zin, niet naar hun advies.",
    example:
      "Loop een halfuur en zeg hardop waarom je deze vennootschap zou starten. De zin die je twee keer herhaalt, is de lijn. De rest is versiering.",
  },
  mental: {
    protocol:
      "Voor dit soort keuzes heb je geen innerlijk kompas. Dat is geen zwakte. Het betekent dat je mensen nodig hebt die het werk doen, en dat hun oordeel zwaarder weegt dan jouw model.",
    example:
      "Voor je een huurcontract tekent, laat twee mensen die dit werk kennen de aannames onderuithalen. Zien ze allebei hetzelfde gat, dan bestaat het gat.",
  },
  lunar: {
    protocol:
      "Jouw helderheid komt in golven van ongeveer een maand. Grote keuzes — vennootschap, huur, vennoot — horen die periode uit. Impuls is hier geen durf. Het is ruis.",
    example:
      "Schrijf de afspraak op dag één op. Lees ze opnieuw op dag veertien en dag achtentwintig. Alleen wat op alle drie de dagen overeind blijft, mag naar de notaris.",
  },
};

const YEAR_MOVES: Record<number, { story: string; move: string }> = {
  1: {
    story: "Dit is een jaar om te beginnen. Wat je nu laat liggen, begin je dit decennium waarschijnlijk niet meer.",
    move: "Kies één formule, schrijf ze in, en zeg nee tegen het tweede idee tot er omzet is.",
  },
  2: {
    story: "Dit jaar beloont geduld en de juiste tandem, niet de eenzame sprint.",
    move: "Zoek één vennoot of ankerklant. Teken niets in de eerste week van het gesprek.",
  },
  3: {
    story: "Dit jaar is het goedkoop om gezien te worden. Stilzitten kost je klanten.",
    move: "Schrijf wekelijks één scherpe observatie in jouw sector. Stel daarna pas een opdracht voor.",
  },
  4: {
    story: "Dit jaar winnen saaie systemen van charisma. Dat is goed nieuws als je van orde houdt.",
    move: "Zet facturatie, contracten en een maandelijkse afsluiting vóór je een tweede product bedenkt.",
  },
  5: {
    story: "Beweging mag. Rondzwerven niet.",
    move: "Draai één gecontroleerde proef naast de kern. Zet de stopdatum in de agenda.",
  },
  6: {
    story: "Verantwoordelijkheid wordt zichtbaar: ploeg, klanten, verplichtingen.",
    move: "Zet op papier wie wat beslist. Mondelinge afspraken horen dit jaar in een overeenkomst.",
  },
  7: {
    story: "Een jaar om te meten en te schrappen, niet om te pronken.",
    move: "Schrap het zwakste aanbod. Geen nieuwe huisstijl. Wel een schonere resultatenrekening.",
  },
  8: {
    story: "Kapitaal ligt op tafel voor wie cijfers heeft, niet voor wie een mooi verhaal vertelt.",
    move: "Heronderhandel je grootste contract. Vraag de prijs die de cijfers dragen.",
  },
  9: {
    story: "Afronden is dit jaar winst. Vasthouden uit gewoonte is verlies.",
    move: "Sluit of verkoop wat geen kern is. Maak ruimte. Het volgende bedrijf komt daarna.",
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
  const first = firstName(name);
  const opener: Record<CareerType, string> = {
    initiator: `${first}, jij komt het verst als je iets in beweging zet dat anderen afmaken.`,
    "classic-builder": `${first}, jij komt het verst als je iets bouwt dat je wekenlang kunt volhouden.`,
    "express-builder": `${first}, jij komt het verst met twee of drie lijnen, niet met één tunnel.`,
    advisor: `${first}, jij komt het verst als je richting geeft — niet als je zelf sleept.`,
    evaluator: `${first}, jij komt het verst als je de markt leest, niet als je de ploeg zelf aanvoert.`,
  };
  return `${opener[careerType]} Wat daarbij past: een ${headline.toLowerCase()}, in ${sectorNoun(bazi)}. Geen horoscoop. Gewoon een werkrichting.`;
}

export function buildNarrative(
  name: string,
  rae: RaeResult,
  bazi: BaziResult,
  numerology: NumerologyResult,
  design: DesignResult,
  company: string,
): string {
  const first = firstName(name);
  const year = YEAR_MOVES[numerology.personalYear] ?? YEAR_MOVES[1];
  const decision = DECISION_STORY[design.authority];
  return [
    `${first}, ik hou het eenvoudig. ${ROLE_STORY[design.careerType]} In jouw geval wijst dat naar ${sectorNoun(bazi)}. Niet omdat het zweverig past, maar omdat die markten dezelfde inzet vragen als jij van nature levert.`,
    RISK_STORY[rae.fundingBias],
    `Daaronder zit een drijfveer die draait om ${lifePathPlain(numerology.lifePath)}. ${year.story} ${decision.protocol}`,
    `Concreet: richt de zaak in als ${company.toLowerCase()}. Houd de eerste versie kleiner dan je ambitie. Als het werkt, maak je de organisatie groter — niet je agenda.`,
  ].join("\n\n");
}

function lifePathPlain(n: number): string {
  const map: Record<number, string> = {
    1: "zelfstandig commando",
    2: "diplomatie en de juiste tandem",
    3: "stem, merk en publiek",
    4: "orde, systemen en tastbare output",
    5: "bewegingsvrijheid en commerciële herhaling",
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
      story: `${item.story} Jij blijft de architect. De uitvoering zit bij een uitvoerder of een vast netwerk.`,
    }));
  }
  if (careerType === "initiator") {
    return base.map((item) => ({
      ...item,
      story: `${item.story} Jij opent de deur en verdwijnt uit het dagelijkse overleg.`,
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
  const firstHire = design.missingSkills[0]
    ? `iemand die ${design.missingSkills[0].toLowerCase()} als vak meeneemt. Geen tweede strateeg.`
    : "een specialist. Geen tweede baas.";

  const steps: BriefingStep[] = [
    {
      window: "Dag 1 tot 7",
      title: "Schrijf de formule op één blad",
      detail: `Eén zin: welk probleem, voor wie, in ${sector}. Eén zin: wat je nooit zult doen. Eén zin: hoe het geld binnenkomt. Noem het een ${company.toLowerCase()}, niet ‘een start-up’. Als je het niet in zes zinnen kunt zeggen, is het nog geen bedrijf.`,
    },
    {
      window: "Week 2 en 3",
      title: "Acht gesprekken, geen verkoop",
      detail: `Bel acht mensen die al in ${bazi.sectors[0]} werken. Vraag waar ze geld verliezen. Bied niets aan. Noteer de zin die drie keer terugkomt. Dat is je eerste aanbod.`,
    },
    {
      window: "Week 4 tot 6",
      title: "Verkoop één vast product",
      detail:
        "Geen maatwerk. Een diagnose, een audit, een korte opdracht of een maandelijkse overeenkomst met een vast resultaat en een vaste prijs. Factureer de helft vooraf. Twee betalende klanten slaan een website.",
    },
    {
      window: "Maand 2",
      title: "Beslis zoals jij moet beslissen",
      detail: `${decision.example} Zet deze regel in je agenda als een afspraak, niet als een voornemen.`,
    },
    {
      window: "Maand 2 en 3",
      title: "Vul het gat dat jij niet bent",
      detail: `Je eerste medewerker of zelfstandige is ${firstHire} Laat die persoon de kalender, de levering of de cijfers trekken. Jij blijft bij wat hierboven over jou staat.`,
    },
    {
      window: "Dit jaar",
      title: year.move.split(".")[0] ?? "Houd het jaar groots en het bedrijf klein",
      detail: `${year.story} ${year.move} Financiering: ${fundingStep(rae)}.`,
    },
  ];

  if (design.careerType === "advisor" || design.careerType === "evaluator") {
    steps.splice(3, 0, {
      window: "Elke werkdag",
      title: "Twee tot vier uur geconcentreerd werk, daarna stoppen",
      detail:
        "Blokkeer de ochtenden. Geen berichten ’s avonds. De waarde zit in de scherpte van die uren, niet in aanwezigheid. Wat daarna nog moet, is werk voor de uitvoerder.",
    });
  }

  return steps;
}

function fundingStep(rae: RaeResult): string {
  if (rae.fundingBias === "aggressive-debt") {
    return "schuld mag, als de stopregel op papier staat: kas in weken, niet in hoop";
  }
  if (rae.fundingBias === "conservative-margin") {
    return "geen durfkapitaal, geen persoonlijke lening voor groei; herinvesteren uit de marge";
  }
  return "groei die een klant al betaalde; vreemd vermogen alleen tegen een getekende order";
}

export function buildAvoid(
  design: DesignResult,
  rae: RaeResult,
  bazi: BaziResult,
): string[] {
  const items = [
    `Laat een algemeen bureau dat alles doet liggen. Blijf bij ${bazi.sectors[0]}.`,
    "Neem geen vennoot die hetzelfde is als jij. Dan zit je met twee ego’s en hetzelfde gat.",
  ];
  if (design.careerType === "advisor" || design.careerType === "evaluator") {
    items.push("Trek geen zaak met magazijn of lange kantoordagen die jij zelf moet draaien.");
  }
  if (design.careerType === "initiator") {
    items.push("Leid het dagelijkse overleg niet zelf. Dat is andermans werk, en jij wordt er moe van.");
  }
  if (rae.fundingBias === "conservative-margin") {
    items.push("Ga niet mee in een groeiverhaal dat alleen werkt als een fonds je deelt.");
  }
  if (rae.fundingBias === "aggressive-debt") {
    items.push("Neem geen tweede lening omdat de eerste bijna werkte. Eerst de stopregel, dan pas gas.");
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
    ? ` De vennootschap zelf zit in jaar ${numerology.companyYear}. Behandel die cyclus als de kalender van het bedrijf, niet als de jouwe.`
    : "";
  return `${year.story} ${year.move}${extra}`;
}
