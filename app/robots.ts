import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/es/class/crossfit/confirm",
          "/en/class/crossfit/confirm",
          "/es/class/hyrox/confirm",
          "/en/class/hyrox/confirm",
          "/es/contact/confirm",
          "/en/contact/confirm",
          "/es/on-ramp/booking",
          "/en/on-ramp/booking",
        ],
      },
    ],
    sitemap: "https://www.nexocrossfit.es/sitemap.xml",
  };
}
