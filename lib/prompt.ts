import type Anthropic from "@anthropic-ai/sdk";

export const SYSTEM_PROMPT = `You are Preuve AI, a skeptical startup-idea validation engine. A founder gives you an idea in a sentence or two, and you return a rigorous, honest assessment of whether it is worth building.

Your job is to tell the founder the uncomfortable truth while it is still cheap to change their mind — not to flatter the idea. Most ideas are not launch-ready; the median idea scores around 54/100 and only ~18% earn a "Go".

Be concrete and specific to THIS idea — never generic. Ground competitor names, funding, pricing, and market sizes in realistic, plausible figures for the space. When you name a source (Crunchbase, G2, Reddit, Product Hunt, Google Trends, Statista, etc.), pick the one a real analyst would actually cite for that claim.

Scoring rubric (0-100 composite from six weighted factors):
- Market size & growth
- Real demand signals
- Competitive density (crowded = lower)
- Moat durability
- Business-model viability
- Regulatory & execution risk

Verdict thresholds: 70+ = "Go", 45-69 = "Caution", below 45 = "No-Go".

Calibrate honestly. Reserve high scores for ideas with clear demand, a defensible wedge, and a workable business model. Crowded, undifferentiated, or demand-light ideas should score below 50.

Return your assessment by calling the emit_validation_report tool exactly once. Do not write any prose outside the tool call.`;

/**
 * A single tool whose input schema mirrors the ValidationReport type.
 * Forcing tool_choice to this tool guarantees a validated structured object
 * back — no fragile JSON-in-text parsing.
 */
export const REPORT_TOOL: Anthropic.Tool = {
  name: "emit_validation_report",
  description:
    "Emit the structured startup-idea validation report. Call this exactly once with the full assessment.",
  input_schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      ideaSummary: {
        type: "string",
        description: "The idea restated crisply in one sentence.",
      },
      viabilityScore: {
        type: "integer",
        description: "Composite viability score from 0 to 100.",
      },
      verdict: {
        type: "string",
        enum: ["Go", "Caution", "No-Go"],
      },
      verdictRationale: {
        type: "string",
        description: "One or two sentences explaining the verdict.",
      },
      subFactors: {
        type: "array",
        description: "The six scored sub-factors behind the composite score.",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: "string" },
            score: { type: "integer", description: "0-100" },
            note: { type: "string", description: "One-line justification." },
          },
          required: ["name", "score", "note"],
        },
      },
      competitors: {
        type: "array",
        description: "Up to 8 real or realistic competitors.",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: "string" },
            positioning: { type: "string" },
            funding: {
              type: "string",
              description: 'e.g. "$12M Series A", "Bootstrapped", "Unknown".',
            },
            pricing: {
              type: "string",
              description: 'e.g. "$29/mo", "Freemium", "Enterprise".',
            },
            weakness: {
              type: "string",
              description: "The gap a new entrant could exploit.",
            },
            source: {
              type: "string",
              description: 'Plausible source, e.g. "Crunchbase".',
            },
          },
          required: [
            "name",
            "positioning",
            "funding",
            "pricing",
            "weakness",
            "source",
          ],
        },
      },
      market: {
        type: "object",
        additionalProperties: false,
        description: "Bottom-up market sizing.",
        properties: {
          tam: { $ref: "#/$defs/sizing" },
          sam: { $ref: "#/$defs/sizing" },
          som: { $ref: "#/$defs/sizing" },
        },
        required: ["tam", "sam", "som"],
      },
      demandSignals: {
        type: "array",
        description: "Concrete demand signals with their channel and strength.",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            channel: { type: "string" },
            signal: { type: "string" },
            strength: {
              type: "string",
              enum: ["strong", "moderate", "weak"],
            },
          },
          required: ["channel", "signal", "strength"],
        },
      },
      risks: {
        type: "array",
        description: "The blind spots and risks most likely to kill the idea.",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            detail: { type: "string" },
            severity: {
              type: "string",
              enum: ["high", "medium", "low"],
            },
          },
          required: ["title", "detail", "severity"],
        },
      },
      pivots: {
        type: "array",
        description: "Exactly 3 concrete pivots that would improve the score.",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            detail: { type: "string" },
            scoreLift: {
              type: "string",
              description: 'Estimated score lift, e.g. "+8".',
            },
          },
          required: ["title", "detail", "scoreLift"],
        },
      },
    },
    required: [
      "ideaSummary",
      "viabilityScore",
      "verdict",
      "verdictRationale",
      "subFactors",
      "competitors",
      "market",
      "demandSignals",
      "risks",
      "pivots",
    ],
    $defs: {
      sizing: {
        type: "object",
        additionalProperties: false,
        properties: {
          value: {
            type: "string",
            description: 'Sized value, e.g. "$4.2B".',
          },
          methodology: {
            type: "string",
            description: "One-line note on how it was derived.",
          },
        },
        required: ["value", "methodology"],
      },
    },
  },
};
