import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://adtrealtyaz.com/",
      lastModified: new Date("2026-09-11"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://adtrealtyaz.com/heroes",
      lastModified: new Date("2026-09-11"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://adtrealtyaz.com/east-valley",
      lastModified: new Date("2026-09-11"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://adtrealtyaz.com/leaders",
      lastModified: new Date("2026-09-11"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
