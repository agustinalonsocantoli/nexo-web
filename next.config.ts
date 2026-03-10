import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/nutricion",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/fisioterapia",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/precios",
        destination: "/plans",
        permanent: true,
      },
      {
        source: "/horario",
        destination: "/plans",
        permanent: true,
      },
      {
        source: "/quienes-somos",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/onramp",
        destination: "/on-ramp",
        permanent: true,
      },
      {
        source: "/contacto",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/equipo",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/eventos",
        destination: "/",
        permanent: true,
      },
      {
        source: "/clases",
        destination: "/class",
        permanent: true,
      },
      {
        source: "/comunidad",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/reglas",
        destination: "/",
        permanent: true,
      },
      {
        source: "/box",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/clase-de-prueba",
        destination: "/class",
        permanent: true,
      },
      {
        source: "/equipo/:path*",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/team",
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

export default nextConfig;
