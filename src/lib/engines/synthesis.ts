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

const CAREER_ROLE: Record<CareerType, string> = {
  initiator: "Visionair die processen in gang zet en de dagelijkse operatie delegeert",
  "classic-builder": "Operationele bouwer met duurzame uitvoeringskracht",
  "express-builder": "Multi-track bouwer die floreert bij snelle pivots",
  advisor: "Systeemarchitect en gids — geen uitvoerende 9-tot-5-operator",
  evaluator: "Onafhankelijke waarnemer van cultuur, kwaliteit en marktsentiment",
};

const AUTHORITY_PROTOCOL: Record<DesignResult["authority"], string> = {
  emotional:
    "Geen contracten of partnerships tekenen op een golf van enthousiasme of paniek. Rij de golf uit en slaap er een nacht over.",
  sacral:
    "Beslis via een onmiddellijke lichamelijke ja/nee. Forceer geen kansen die dood aanvoelen.",
  splenic:
    "Vertrouw het bliksemsnelle instinct in het moment. Heroverwegen verzwakt de beslissing.",
  ego:
    "Zeg alleen ja wanneer je de wil en de middelen hardop kunt committeren.",
  "self-projected":
    "Praat de beslissing hardop uit met één vertrouwde sparringpartner. Luister naar je eigen formulering.",
  mental:
    "Je hebt geen interne autoriteit. Win advies in bij mensen die de operatie leven, en weeg hun input — niet je mentale model.",
  lunar:
    "Wacht een volle maancyclus (~28 dagen) voor structurele beslissingen. Jouw helderheid is cyclisch.",
};

const LIFE_PATH_MISSION: Record<number, string> = {
  1: "solo-pionierschap zonder gedeelde autoriteit",
  2: "diplomatieke partnerships en stille invloed",
  3: "zichtbare communicatie, merk en publiek",
  4: "systemen, orde en tastbare structuren",
  5: "vrijheid, iteratie en commerciële wendbaarheid",
  6: "verantwoordelijkheid, zorgstructuren en community",
  7: "onderzoek, data en werk achter de schermen",
  8: "materiële macht, kapitaalallocatie en schaal",
  9: "afronding, portfolio's en maatschappelijke reikwijdte",
  11: "visionair leiderschap via inspiratie",
  22: "grote, bouwbare systemen op maatschappelijke schaal",
  33: "mentorschap en het tillen van andere leiders",
};

const YEAR_TIMING: Record<number, string> = {
  1: "Jaar 1: start of herstart. Richt op, lanceer, claim territorium.",
  2: "Jaar 2: relaties, allianties en geduld. Forceer geen solo-expansie.",
  3: "Jaar 3: zichtbaarheid. Publiceer, pitch, bouw het merk.",
  4: "Jaar 4: fundamenten. Processen, compliance, operationele discipline.",
  5: "Jaar 5: beweging. Pilot, pivot, test nieuwe kanalen.",
  6: "Jaar 6: verantwoordelijkheid. Team, klanten, verplichtingen formaliseren.",
  7: "Jaar 7: analyse. Meet, snijd, specialiseer. Geen ijdelheidsexpansie.",
  8: "Jaar 8: macht en kapitaal. Onderhandel hard, schaal wat bewezen is.",
  9: "Jaar 9: consolidatie. Verkoop onderdelen, sluit cycli, maak ruimte.",
};

const ELEMENT_LABEL: Record<Element, string> = {
  wood: "groei en menselijk kapitaal",
  fire: "zichtbaarheid en snelle marktpenetratie",
  earth: "stabiliteit en activa",
  metal: "precisie en financiële systemen",
  water: "distributie en connectiviteit",
};

const EXTRAVERT_PATHS = new Set([1, 3, 5, 8]);

function structureLine(environment: DesignResult["environment"], careerType: CareerType): string {
  if (environment === "solo") {
    return "Solo-praktijk of een ultrakleine staf. Hiërarchie van honderden mensen is een structurele mismatch.";
  }
  if (environment === "partnership") {
    return "Een-op-een dynamiek: één mede-oprichter of een keten van dyades, geen matrixorganisatie.";
  }
  if (environment === "small-group") {
    return "Penta-schaal: drie tot vijf mensen. Boven vijf personen daalt de signaalkwaliteit hard.";
  }
  if (careerType === "evaluator") {
    return "Grote groep als observatieveld, niet als hiërarchie die jij dagelijks managet.";
  }
  return "Grote groep / OC16: hiërarchische schaal is mogelijk, mits de eerste laag operationeel is ingevuld.";
}

function riskLine(rae: RaeResult): string {
  if (rae.fundingBias === "aggressive-debt") {
    return "Statistisch profiel van de relatief oudste in het schoolcohort: hogere risicobereidheid en schuldcapaciteit. Bruikbaar voor snelle kapitaalverbranding — alleen met een expliciete kill-switch.";
  }
  if (rae.fundingBias === "conservative-margin") {
    return "Relatief jongste in het cohort: onderneem met berekend risico, veilige marges, geen overmatige schuldfinanciering en geen agressieve VC-druk.";
  }
  return "Midden-cohort: mix van tempo en voorzichtigheid. Groei in stappen, financier met bewezen unit economics.";
}

function hiringFrom(design: DesignResult): string[] {
  const mandate: string[] = [];
  if (design.careerType === "initiator" || design.careerType === "advisor" || design.careerType === "evaluator") {
    mandate.push("Neem minstens één Classic of Express Builder aan voor back-office implementatie.");
  }
  for (const skill of design.missingSkills.slice(0, 3)) {
    mandate.push(`Eerste strategische aanname of mede-oprichter moet ${skill.toLowerCase()} in het team brengen.`);
  }
  if (mandate.length === 0) {
    mandate.push("Kernvaardigheden zitten in jouw kaart. Huur specialisten, geen tweede generaal.");
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
      title: "Zichtbaar bereik, verborgen operatie",
      explanation:
        "Je drijfveer trekt naar een breed publiek, terwijl je mechanica uitputting geeft in permanente sociale druk. Fungeer als asynchrone content creator of analist vanuit een beveiligde, stille omgeving.",
    });
  }
  if (design.careerType === "advisor" && rae.cohortPosition === "oldest") {
    paradoxes.push({
      title: "Hoge statusdrang, lage uitvoeringsenergie",
      explanation:
        "Het cohortprofiel duwt naar zichtbaar leiderschap; de mechanica verbiedt arbeidsintensieve operaties. Bestuur via een management-BV of fonds, niet via een uitvoerend bedrijf.",
    });
  }
  if (numerology.lifePath === 1 && rae.cohortPosition === "oldest") {
    paradoxes.push({
      title: "Gevalideerd solo-commando",
      explanation:
        "Levenspad 1 en relatief-oudste status versterken elkaar. Start als solo-oprichter. Deel geen eindbeslissing.",
    });
  }
  if (design.environment === "solo" && design.careerType === "classic-builder") {
    paradoxes.push({
      title: "Krachtige motor, kleine kamer",
      explanation:
        "Je hebt duurzame energie maar geen genetische voorkeur voor grote groepen. Bouw diep, niet breed.",
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
      headline: "Boutique management- en leiderschapsconsultancy",
      company: "Boutique consultancy / management-BV",
      sector: `Leiderschapsontwikkeling, executive coaching of HR-innovatie — ${sectorFocus}.`,
    };
  }
  if (careerType === "advisor") {
    return {
      headline: "Gespecialiseerd advieskantoor met geconcentreerde werkvensters",
      company: "Adviesbureau, venture-adviseur of kwaliteitsfonds",
      sector: `Kennisintensieve begeleiding in ${sectorFocus}.`,
    };
  }
  if (careerType === "initiator" && dominant === "fire") {
    return {
      headline: "Visionair merk- of technologieplatform",
      company: "Initiatief-gedreven studio met uitvoerend team",
      sector: `Snelle zichtbaarheid: ${sectorFocus}.`,
    };
  }
  if (careerType === "initiator") {
    return {
      headline: "Onafhankelijk initiatief met gedelegeerde operatie",
      company: "Holding of initiatief-studio",
      sector: `Nieuwe categorieën in ${sectorFocus}.`,
    };
  }
  if (careerType === "express-builder") {
    return {
      headline: "Multi-track onderneming met iteratieve pivots",
      company: "Wendbare multi-product onderneming",
      sector: `Niet-lineaire portefeuille in ${sectorFocus}.`,
    };
  }
  if (careerType === "evaluator") {
    return {
      headline: "Onafhankelijke kwaliteits- of marktobservatiepraktijk",
      company: "Analyse-, audit- of researchpraktijk",
      sector: `Macro-observatie en kwaliteitsbewaking binnen ${sectorFocus}.`,
    };
  }
  if (dominant === "earth" || lifePath === 4 || lifePath === 22) {
    return {
      headline: "Robuuste activa- of systeemonderneming",
      company: "Operationeel bouwbedrijf met tastbare output",
      sector: `Lange-termijn structuren in ${sectorFocus}.`,
    };
  }
  if (dominant === "metal" || lifePath === 8) {
    return {
      headline: "Financieel-operationele onderneming met harde controles",
      company: "Fintech, bureau of kapitaalvehikel",
      sector: `Precisie en kapitaal in ${sectorFocus}.`,
    };
  }
  return {
    headline: "Duurzaam operationeel bedrijf met bewezen ritme",
    company: "Classic operating company",
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
): Briefing {
  const paradoxes = detectParadoxes(rae, numerology, design);
  const shape = archetype(design.careerType, bazi.dominant, numerology.lifePath);
  const mission = LIFE_PATH_MISSION[numerology.lifePath] ?? "een eigen, herkenbare lijn";

  const actionPlan = [
    `Richt het bedrijf in als ${shape.company.toLowerCase()}.`,
    `Houd de industriële focus op ${bazi.sectors.slice(0, 2).join(" en ")}.`,
    riskLine(rae),
    AUTHORITY_PROTOCOL[design.authority],
    YEAR_TIMING[numerology.personalYear] ?? YEAR_TIMING[1],
  ];

  if (design.careerType === "advisor" || design.careerType === "evaluator") {
    actionPlan.splice(2, 0, "Beperk intensieve arbeid tot vensters van twee tot vier uur. Delegeer uitvoering.");
  }

  return {
    headline: shape.headline,
    companyArchetype: shape.company,
    sector: shape.sector,
    structure: structureLine(design.environment, design.careerType),
    role: CAREER_ROLE[design.careerType],
    riskStrategy: riskLine(rae),
    decisionProtocol: AUTHORITY_PROTOCOL[design.authority],
    timing: YEAR_TIMING[numerology.personalYear] ?? YEAR_TIMING[1],
    hiringMandate: hiringFrom(design),
    actionPlan,
    paradoxes,
    confidence: confidenceOf(rae, bazi, numerology, design, paradoxes),
    evidence: {
      rae: `${rae.cutoffLabel}. Positie in het cohort: ${rae.cohortPosition}. Risicobereidheid ${rae.riskAppetite}/100.`,
      bazi: `Dominant element wijst naar ${bazi.sectors[0]}. Dagmeester: ${bazi.day.stemLabel}.`,
      numerology: `Levenspad ${numerology.lifePath} (${mission}). Expressie ${numerology.expression}. Persoonlijk jaar ${numerology.personalYear}.`,
      design: `Career type ${design.careerType}, profiel ${design.profile}, autoriteit ${design.authority}, schaal ${design.environment}.`,
    },
  };
}
