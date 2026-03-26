import type { MetadataRoute } from "next";

const BASE_URL = "https://www.nexocrossfit.es";

const locales = ["es", "en"];

const paths = [
  { path: "", changeFrequency: "monthly" as const, priority: 1.0 },
  { path: "/class", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/class/crossfit", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/class/hyrox", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/plans", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/on-ramp", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/about-us", changeFrequency: "yearly" as const, priority: 0.7 },
  { path: "/team", changeFrequency: "yearly" as const, priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, changeFrequency, priority } of paths) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            es: `${BASE_URL}/es${path}`,
            en: `${BASE_URL}/en${path}`,
            "x-default": `${BASE_URL}/es${path}`,
          },
        },
      });
    }
  }

  return entries;
}
