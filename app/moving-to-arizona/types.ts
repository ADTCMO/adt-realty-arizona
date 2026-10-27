export type CountyCity = {
  slug: string;
  name: string;
  lat: number;
  lon: number;
  region: string;
  summary: string;
  housing: string;
  commute: string;
  schools: string;
  considerations: string[];
  highlights: string[];
  price?: { value: string; label: string; period: string; sourceUrl: string };
  photo?: { src: string; alt: string; credit: string; creditUrl?: string; license?: string; licenseUrl?: string };
  guideHref?: string;
  sources?: { title: string; url: string }[];
};
