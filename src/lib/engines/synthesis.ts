import type {
  BaziResult,
  Briefing,
  CareerType,
  DesignResult,
  Element,
  NumerologyResult,
  Paradox,
  RaeResult,
} from "@/types/briefing";
import {
  buildAvoid,
  buildLede,
  buildNarrative,
  buildSteps,
  decisionBlock,
  pickExamples,
  timingBlock,
} from "@/lib/engines/narrative";

const CAREER_ROLE: Record<CareerType, string> = {
  initiator: "Jij zet dingen in gang. De dagelijkse uitvoering laat je aan iemand anders.",
  "classic-builder": "Jij voert uit en houdt tempo. De zaak leeft van jouw werkritme.",
  "express-builder": "Jij houdt twee lijnen tegelijk. Eén tunnel maakt je ongeduldig.",
  advisor: "Jij geeft richting. Jij sleept de zaak niet zelf.",
  evaluator: "Jij leest de markt en de ploeg. Jij voert niet zelf uit.",
};

const LIFE_PATH_MISSION: Record<number, string> = {
  1: "zelfstandig commando, zonder gedeelde eindbeslissing",
  2: "diplomatie, tandem en stille invloed",
  3: "stem, merk en een zichtbaar publiek",
  4: "orde, systemen en tastbaar werk",
  5: "bewegingsvrijheid en commerciële wendbaarheid",
  6: "verantwoordelijkheid voor mensen en verplichtingen",
  7: "onderzoek, cijfers en werk achter de schermen",
  8: "kapitaal, onderhandeling en schaal",
  9: "afronden, overdragen en een bredere cirkel",
  11: "richting geven via een scherpe visie",
  22: "grote, bouwbare structuren",
  33: "andere zaakvoerders tillen zonder zelf het werk te doen",
};

const ELEMENT_LABEL: Record<Element, string> = {
  wood: "groei en mensen",
  fire: "zichtbaarheid en tempo",
  earth: "stabiliteit en vastgoed",
  metal: "precisie en geldstromen",
  water: "distributie en relaties",
};

const EXTRAVERT_PATHS = new Set([1, 3, 5, 8]);

function structureLine(environment: DesignResult["environment"], careerType: CareerType): string {
  if (environment === "solo") {
    return "Alleen of met één vaste hulp. Een zaak van tientallen mensen past niet.";
  }
  if (environment === "partnership") {
    return "Eén vennoot of een keten van duo's. Geen organisatie met lagen.";
  }
  if (environment === "small-group") {
    return "Een kern van drie tot vijf mensen. Boven de vijf begin je te sturen in plaats van te leveren.";
  }
  if (careerType === "evaluator") {
    return "Een grotere groep als werkveld, niet als ploeg die jij elke dag leidt.";
  }
  return "Een grotere organisatie kan, als de eerste laag het dagelijkse werk al draait.";
}

function riskLine(rae: RaeResult): string {
  if (rae.fundingBias === "aggressive-debt") {
    return "Op school was je vaak de oudste. Dat geeft later meer risico-appetijt en meer ruimte voor schuld. Bruikbaar, als de stopregel op papier staat.";
  }
  if (rae.fundingBias === "conservative-margin") {
    return "Als jongste in de klas: onderneem met berekend risico, veilige marges, geen zware lening en geen durfkapitaal dat tempo eist.";
  }
  return "Midden van de klas: tempo én voorzichtigheid. Groei in stappen. Financier met winst die je al hebt bewezen.";
}

function hiringFrom(design: DesignResult): string[] {
  const mandate: string[] = [];
  if (design.careerType === "initiator" || design.careerType === "advisor" || design.careerType === "evaluator") {
    mandate.push("Haal minstens één uitvoerder binnen voor de implementatie.");
  }
  for (const skill of design.missingSkills.slice(0, 3)) {
    mandate.push(`De eerste aanwerving of vennoot moet ${skill.toLowerCase()} in huis hebben.`);
  }
  if (mandate.length === 0) {
    mandate.push("De kern zit bij jou. Huur specialisten, geen tweede baas.");
  }
  return mandate;
}

function detectParadoxes(
  rae: RaeResult,
  numerology: NumerologyResult,
  design: DesignResult,
): Paradox[] {
  const paradoxes: Paradox[] = [];
  if (EXTRAVERT_PATHS.has(numerology.lifePath) && design.careerType === "evaluator") {
    paradoxes.push({
      title: "Zichtbaar bereik, stille werkplek",
      explanation:
        "Je wilt een breed publiek, maar permanente druk put je uit. Werk op afspraak. Schrijf en analyseer in stilte. Geen open kantoor de hele week.",
    });
  }
  if (design.careerType === "advisor" && rae.cohortPosition === "oldest") {
    paradoxes.push({
      title: "Zichtbaar leiderschap, geen zware uitvoering",
      explanation:
        "De klaspositie duwt naar de voorgrond. Jouw energie verbiedt lange dagen op de werkvloer. Bestuur via een holding of een kantoor dat anderen laat werken.",
    });
  }
  if (numerology.lifePath === 1 && rae.cohortPosition === "oldest") {
    paradoxes.push({
      title: "Solo-commando dat klopt",
      explanation:
        "Zelfstandig commando en oudste in de klas versterken elkaar. Start alleen. Deel de eindbeslissing niet.",
    });
  }
  if (design.environment === "solo" && design.careerType === "classic-builder") {
    paradoxes.push({
      title: "Sterk tempo, kleine kamer",
      explanation:
        "Je houdt wekenlang hetzelfde ritme, maar grote groepen kosten je scherpte. Bouw diep, niet breed.",
    });
  }
  return paradoxes;
}

function archetype(
  careerType: CareerType,
  dominant: Element,
  lifePath: number,
): { headline: string; company: string; sector: string } {
  const sectorFocus = ELEMENT_LABEL[dominant];

  if (careerType === "advisor" && (dominant === "wood" || lifePath === 8 || lifePath === 4)) {
    return {
      headline: "Leiderschapsconsultancy in een klein kantoor",
      company: "klein advieskantoor of managementvennootschap",
      sector: `Leiderschapstrajecten en personeelsbeleid — ${sectorFocus}.`,
    };
  }
  if (careerType === "advisor") {
    return {
      headline: "Gespecialiseerd advieskantoor met korte, scherpe blokken",
      company: "advieskantoor of kwaliteitsfonds",
      sector: `Begeleiding op ${sectorFocus}.`,
    };
  }
  if (careerType === "initiator" && dominant === "fire") {
    return {
      headline: "Merk dat jij start, met een ploeg die uitvoert",
      company: "studio met een uitvoerende ploeg",
      sector: `Snelle zichtbaarheid: ${sectorFocus}.`,
    };
  }
  if (careerType === "initiator") {
    return {
      headline: "Zelfstandig initiatief waarvan anderen de zaak draaien",
      company: "holding of initiatiefvennootschap",
      sector: `Nieuwe lijnen in ${sectorFocus}.`,
    };
  }
  if (careerType === "express-builder") {
    return {
      headline: "Zaak met twee of drie lijnen, geen enkele tunnel",
      company: "wendbare onderneming met een kleine portefeuille",
      sector: `Meer dan één aanbod in ${sectorFocus}.`,
    };
  }
  if (careerType === "evaluator") {
    return {
      headline: "Onafhankelijk kantoor dat markten en kwaliteit leest",
      company: "analyse-, audit- of onderzoekskantoor",
      sector: `Kwaliteit en marktlezing binnen ${sectorFocus}.`,
    };
  }
  if (dominant === "earth" || lifePath === 4 || lifePath === 22) {
    return {
      headline: "Vennootschap met tastbare activa en een lang ritme",
      company: "operationele vennootschap met tastbaar werk",
      sector: `Lange lijnen in ${sectorFocus}.`,
    };
  }
  if (dominant === "metal" || lifePath === 8) {
    return {
      headline: "Financieel kantoor met harde controles",
      company: "kantoor, bureau of kapitaalvennootschap",
      sector: `Precisie en kapitaal in ${sectorFocus}.`,
    };
  }
  return {
    headline: "Operationele vennootschap met een vast ritme",
    company: "operationele vennootschap",
    sector: `Uitvoering en schaal in ${sectorFocus}.`,
  };
}

function confidenceOf(
  rae: RaeResult,
  bazi: BaziResult,
  numerology: NumerologyResult,
  design: DesignResult,
  paradoxes: Paradox[],
): number {
  let score = 62;
  if (design.careerType === "advisor" && (bazi.dominant === "wood" || numerology.lifePath === 7)) score += 10;
  if (design.careerType === "classic-builder" && rae.cohortPosition !== "youngest") score += 6;
  if (numerology.lifePath === 1 && rae.cohortPosition === "oldest") score += 8;
  if (numerology.lifePath === 8 && (bazi.dominant === "metal" || bazi.dominant === "earth")) score += 8;
  if (design.missingSkills.length <= 2) score += 4;
  if (paradoxes.length > 0) score -= 4;
  if (bazi.missing.length >= 2) score -= 3;
  return Math.max(48, Math.min(92, score));
}

export function synthesize(
  rae: RaeResult,
  bazi: BaziResult,
  numerology: NumerologyResult,
  design: DesignResult,
  fullName = "Ondernemer",
): Briefing {
  const paradoxes = detectParadoxes(rae, numerology, design);
  const shape = archetype(design.careerType, bazi.dominant, numerology.lifePath);
  const mission = LIFE_PATH_MISSION[numerology.lifePath] ?? "een eigen, herkenbare lijn";
  const steps = buildSteps(design, bazi, numerology, rae, shape.company);
  const examples = pickExamples(design.careerType, bazi);
  const avoid = buildAvoid(design, rae, bazi);

  return {
    headline: shape.headline,
    lede: buildLede(fullName, shape.headline, design.careerType, bazi),
    narrative: buildNarrative(fullName, rae, bazi, numerology, design, shape.company),
    companyArchetype: shape.company,
    sector: shape.sector,
    structure: structureLine(design.environment, design.careerType),
    role: CAREER_ROLE[design.careerType],
    riskStrategy: riskLine(rae),
    decisionProtocol: decisionBlock(design),
    timing: timingBlock(numerology),
    examples,
    steps,
    avoid,
    hiringMandate: hiringFrom(design),
    actionPlan: steps.map((step) => `${step.window}: ${step.title}`),
    paradoxes,
    confidence: confidenceOf(rae, bazi, numerology, design, paradoxes),
    evidence: {
      rae: `${rae.cutoffLabel}. Positie in het cohort: ${rae.cohortPosition}. Risicobereidheid ${rae.riskAppetite}/100.`,
      bazi: `Dominant kanaal wijst naar ${bazi.sectors[0]}.`,
      numerology: `Levenspad ${numerology.lifePath} (${mission}). Expressie ${numerology.expression}. Persoonlijk jaar ${numerology.personalYear}.`,
      design: `Rol ${design.careerType}, profiel ${design.profile}, besluitvorming ${design.authority}, schaal ${design.environment}.`,
    },
  };
}
