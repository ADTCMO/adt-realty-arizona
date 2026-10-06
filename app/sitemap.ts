import type { MetadataRoute } from "next";

const baseUrl = "https://www.adtrealtyaz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Keep this list aligned with the stable, indexable public pages. Property
  // pages are generated from the listing system and are intentionally omitted
  // until the public-listings API can provide a complete, current URL list.
  return [
    { url: `${baseUrl}/join`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/east-valley`, changeFrequency: "monthly", priority: 0.9 },
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
