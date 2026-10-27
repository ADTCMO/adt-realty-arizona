import type { MetadataRoute } from "next";
import { countyCities } from "./moving-to-arizona/data";
import { phoenixAreas } from "./phoenix/data";

const baseUrl = "https://www.adtrealtyaz.com";
const regionalImages = (region: string) => countyCities.filter(city => city.region === region && city.photo).map(city => `${baseUrl}${city.photo!.src}`);

export default function sitemap(): MetadataRoute.Sitemap {
  // Keep this list aligned with the stable, indexable public pages. Property
  // pages are generated from the listing system and are intentionally omitted
  // until the public-listings API can provide a complete, current URL list.
  // Fixed content-update dates, not a new timestamp on every build.
  return [
    { url: `${baseUrl}/join`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/`, lastModified: "2026-10-27", changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/phoenix`, lastModified: "2026-10-27", changeFrequency: "monthly", priority: 0.9, images: [...new Set([...regionalImages("Phoenix area"), ...phoenixAreas.flatMap(area => area.image ? [`${baseUrl}${area.image.src}`] : [])])] },
    { url: `${baseUrl}/moving-to-arizona`, lastModified: "2026-10-27", changeFrequency: "monthly", priority: 0.9, images: [`${baseUrl}/images/phoenix/downtown-midtown.jpg`, `${baseUrl}/images/east-valley/scottsdale.jpg`, `${baseUrl}/images/maricopa/goodyear.jpg`] },
    { url: `${baseUrl}/west-valley`, lastModified: "2026-10-27", changeFrequency: "monthly", priority: 0.9, images: [...new Set(regionalImages("West Valley"))] },
    { url: `${baseUrl}/east-valley`, lastModified: "2026-10-27", changeFrequency: "monthly", priority: 0.9, images: [...new Set([...regionalImages("East Valley"), `${baseUrl}/images/east-valley/san-tan-valley.jpg`])] },
    { url: `${baseUrl}/chandler`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/gilbert`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/queen-creek`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/san-tan-valley`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/mesa`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/scottsdale`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/tempe`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/fountain-hills`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/hero`, changeFrequency: "monthly", priority: 0.8 },
  ];
}


