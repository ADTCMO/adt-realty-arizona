import type { MetadataRoute } from "next";

const baseUrl = "https://www.adtrealtyaz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-14");
  return [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/east-valley`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/chandler`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/hero`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/leaders`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/leaders/career-guides`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/join/newly-licensed`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/join/developing-agent`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/join/productive-agent`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/join/leadership`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
