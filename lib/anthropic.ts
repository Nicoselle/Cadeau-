import Anthropic from "@anthropic-ai/sdk";

// The model is env-overridable; defaults to the current Opus.
export const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-4-8";

let client: Anthropic | null = null;

/**
 * Lazily construct the Anthropic client so that a missing API key surfaces at
 * request time (as a clean 500) rather than crashing the whole server at boot.
 */
export function getAnthropic(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set.");
  }
  if (!client) {
    client = new Anthropic();
  }
  return client;
}
