export type CountryCode = "BE" | "NL";

export type Place = {
  slug: string;
  name: string;
  country: CountryCode;
  province: string;
};

export type LocalStoryKind = "gevonden" | "verhaal";

export type LocalStoryStatus = "gepubliceerd" | "wachtkamer" | "geweigerd";

export type FoundStory = {
  id: string;
  kind: "gevonden";
  status: "gepubliceerd";
  plaatsSlug: string;
  plaatsName: string;
  title: string;
  dek: string;
  source: string;
  url: string;
  published: string;
  retrieved: string;
  score: number;
};

export type EntrepreneurStory = {
  id: string;
  kind: "verhaal";
  status: LocalStoryStatus;
  plaatsSlug: string;
  plaatsName: string;
  title: string;
  dek: string;
  body: string;
  author: string;
  company: string;
  website?: string;
  published: string;
  refusal?: string;
};

export type LocalStory = FoundStory | EntrepreneurStory;

export type StoryIntake = {
  author: string;
  company: string;
  plaats: string;
  title?: string;
  body: string;
  website?: string;
};

export type Subscription = {
  plaatsen: string[];
  email?: string;
  updated: string;
};

export type PlaceEdition = {
  plaats: Place;
  vraag: number;
  gevonden: FoundStory[];
  verhalen: EntrepreneurStory[];
  wachtkamer: EntrepreneurStory[];
  searchError?: string;
};
