import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/class/confirm",
          "/contact/confirm",
          "/on-ramp/booking",
        ],
      },
    ],
    sitemap: "https://nexocrossfit.es//sitemap.xml",
  };
}
