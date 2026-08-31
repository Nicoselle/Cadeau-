/** Namen waarop de huis-SMC-lens draait. Allocatie plus een paar zware tapes. */
export const SMC_UNIVERSE = [
  "goud",
  "zilver",
  "eur",
  "usd",
  "btc",
  "xmr",
  "ton",
  "aem",
  "nem",
  "aya",
  "yca",
  "pbra",
  "mpcc",
  "pltr",
] as const;

export type SmcUniverseId = (typeof SMC_UNIVERSE)[number];

export function isSmcUniverse(id: string): id is SmcUniverseId {
  return (SMC_UNIVERSE as readonly string[]).includes(id);
}
