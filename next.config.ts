import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/**": ["./generated/prisma/**/*"],
  },
  async redirects() {
    return [
      // =============================================
      // 1. Old Spanish URLs (no locale prefix) → /es/
      //    These run BEFORE middleware, so redirect
      //    directly to /es/ to avoid double redirects.
      // =============================================
      {
        source: "/home",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/nutricion",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/fisioterapia",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/precios",
        destination: "/es/plans",
        permanent: true,
      },
      {
        source: "/horario",
        destination: "/es/plans",
        permanent: true,
      },
      {
        source: "/quienes-somos",
        destination: "/es/about-us",
        permanent: true,
      },
      {
        source: "/onramp",
        destination: "/es/on-ramp",
        permanent: true,
      },
      {
        source: "/contacto",
        destination: "/es/contact",
        permanent: true,
      },
      {
        source: "/equipo",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/eventos",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/clases",
        destination: "/es/class",
        permanent: true,
      },
      {
        source: "/comunidad",
        destination: "/es/about-us",
        permanent: true,
      },
      {
        source: "/reglas",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/box",
        destination: "/es/about-us",
        permanent: true,
      },
      {
        source: "/clase-de-prueba",
        destination: "/es/class",
        permanent: true,
      },
      {
        source: "/que-es-crossfit",
        destination: "/es/class/crossfit",
        permanent: true,
      },
      {
        source: "/empezar",
        destination: "/es/on-ramp",
        permanent: true,
      },
      {
        source: "/entrenadores",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/entrenadores/:path*",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/equipo/:slug",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/es/team",
        permanent: true,
      },

      // =============================================
      // 2. Old URLs with /es/ prefix → correct /es/ path
      //    Google already crawled these, avoid 404s.
      // =============================================
      {
        source: "/es/clases",
        destination: "/es/class",
        permanent: true,
      },
      {
        source: "/es/precios",
        destination: "/es/plans",
        permanent: true,
      },
      {
        source: "/es/horario",
        destination: "/es/plans",
        permanent: true,
      },
      {
        source: "/es/quienes-somos",
        destination: "/es/about-us",
        permanent: true,
      },
      {
        source: "/es/contacto",
        destination: "/es/contact",
        permanent: true,
      },
      {
        source: "/es/onramp",
        destination: "/es/on-ramp",
        permanent: true,
      },
      {
        source: "/es/empezar",
        destination: "/es/on-ramp",
        permanent: true,
      },
      {
        source: "/es/equipo",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/es/equipo/:slug",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/es/entrenadores",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/es/entrenadores/:path*",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/es/nutricion",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/es/fisioterapia",
        destination: "/es/team",
        permanent: true,
      },
      {
        source: "/es/box",
        destination: "/es/about-us",
        permanent: true,
      },
      {
        source: "/es/comunidad",
        destination: "/es/about-us",
        permanent: true,
      },
      {
        source: "/es/reglas",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/es/eventos",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/es/clase-de-prueba",
        destination: "/es/class",
        permanent: true,
      },
      {
        source: "/es/que-es-crossfit",
        destination: "/es/class/crossfit",
        permanent: true,
      },
      {
        source: "/es/blog/:path*",
        destination: "/es/team",
        permanent: true,
      },

      // =============================================
      // 3. Old/wrong URLs with /en/ prefix → correct /en/ path
      //    Google crawled these English URLs, avoid 404s.
      // =============================================
      {
        source: "/en/trial-class",
        destination: "/en/class",
        permanent: true,
      },
      {
        source: "/en/pricing",
        destination: "/en/plans",
        permanent: true,
      },
      {
        source: "/en/schedule",
        destination: "/en/plans",
        permanent: true,
      },
      {
        source: "/en/classes",
        destination: "/en/class",
        permanent: true,
      },
      {
        source: "/en/contact-us",
        destination: "/en/contact",
        permanent: true,
      },
      {
        source: "/en/onramp",
        destination: "/en/on-ramp",
        permanent: true,
      },
      {
        source: "/en/coaches",
        destination: "/en/team",
        permanent: true,
      },
      {
        source: "/en/coaches/:path*",
        destination: "/en/team",
        permanent: true,
      },
      {
        source: "/en/team/:slug",
        destination: "/en/team",
        permanent: true,
      },
      {
        source: "/en/box",
        destination: "/en/about-us",
        permanent: true,
      },
    ];
  },
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
