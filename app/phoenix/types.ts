export type Source = { title: string; url: string };
export type AreaHighlight = { name: string; detail: string; url?: string };
export type PhoenixArea = {
  id: string;
  name: string;
  jurisdiction: string;
  intro: string;
  housing: string;
  schools: string;
  highlights: AreaHighlight[];
  golf?: AreaHighlight[];
  tradeoff: string;
  airport: string;
  sources: Source[];
  schoolLinks?: { name: string; url: string }[];
  sourceUrls?: string[];
  caveats?: string[];
};
