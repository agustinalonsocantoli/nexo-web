import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import PageHero from "@/components/PageHero";
import { TrainingCard, TrainingCardType } from "@/components/home/TrainingSection";

export const metadata: Metadata = {
  title: "Reserva tu Clase de Prueba",
  description:
    "Reserva tu clase de prueba de CrossFit o HYROX en Valencia. Coaches certificados te guían desde el primer día, sin importar tu nivel. Ven y descubre la comunidad Nexo.",
  openGraph: {
    title: "Reserva tu Clase de Prueba | Nexo CrossFit Valencia",
    description:
      "Prueba CrossFit o HYROX en Valencia con coaches certificados. Sin compromiso, adaptado a tu nivel.",
    url: "https://nexocrossfit.es//class",
  },
  alternates: {
    canonical: "https://nexocrossfit.es//class",
  },
};

const classes: TrainingCardType[] = [
  {
    title: "CROSSFIT",
    bullets: [
      "Entrena con coaches que te empujan a lograr tus objetivos.",
      "Clases de 60 minutos con enfoque en tu progreso semanal, cuidando la técnica y evitando lesiones.",
      "Comunidad, energía y un box preparado para cada WOD.",
    ],
    image: "/crossfit-img.webp",
    href: "/class/crossfit",
  },
  {
    title: "HYROX",
    bullets: [
      "Entrena con coaches que te empujan a lograr tus objetivos.",
      "Clases de 45 minutos para fortalecer tu resistencia, aumentar tu potencia y poner a prueba tu cuerpo y mente.",
      "Comunidad, energía y un box preparado superar tus límites.",
    ],
    image: "/hyrox-img.webp",
    href: "/class/hyrox",
  },
];

export default function ClassPage() {
  return (
    <main className="bg-[#fbfbfb]">
      <div
        className="block md:hidden"
      >
        <PageHero title="Reserva tu clase de prueba" />
      </div>

      <div className="hidden md:block">
        <PageHero title="Reserva tu clase de prueba" imageSrc="/bg-contacto-des.webp" />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-4 px-6 py-6 lg:mx-auto lg:max-w-7xl lg:gap-10 lg:px-30 lg:py-16">

        {/* Título de sección — solo desktop */}
        <h2 className="hidden font-heading text-[28px] font-bold uppercase leading-tight tracking-[0.03em] text-nexo-dark lg:block lg:text-[32px]">
          A un paso de empezar tu nuevo estilo de vida
        </h2>

        {/* Párrafo intro */}
        <p className="font-body text-sm leading-5 text-nexo-dark lg:text-base lg:leading-6">
          <span className="lg:hidden">
            Reserva tu clase de prueba y vive una sesión real de CrossFit o
            HYROX. Nos adaptamos a tu nivel y entrenarás en un ambiente
            motivador, junto a coaches que cuidan tu técnica y tu progreso.
          </span>
          <span className="hidden lg:inline">
            Reserva tu clase de prueba y experimenta una auténtica sesión de
            CrossFit o HYROX en nuestro box. Sea cual sea tu nivel, nos
            adaptamos a ti. Entrenarás en un ambiente que motiva, conecta y
            empuja a dar lo mejor de ti, siempre acompañado por nuestros
            coaches, atentos a tu técnica y a tu progreso.
          </span>
        </p>

        {/* Mobile: accordion cards */}
        <div className="flex flex-col gap-4 lg:hidden">
          {classes.map((c) => (
            <TrainingCard key={c.title} training={c} />
          ))}
        </div>

        {/* Desktop: horizontal cards en grid 2 columnas */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
          {classes.map((c) => (
            <div
              key={c.title}
              className="flex overflow-hidden rounded-2xl border border-nexo-dark"
            >
              {/* Imagen izquierda */}
              <div className="relative w-[210px] shrink-0">
                <OptimizedImage
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover object-[center_37%]"
                  sizes="210px"
                  width={210}
                  height={220}
                />
              </div>

              {/* Contenido derecha */}
              <div className="flex flex-col gap-4 px-5 py-6">
                <h3 className="font-body text-[36px] font-normal leading-none text-nexo-dark uppercase">
                  {c.title}
                </h3>
                <ul className="list-disc space-y-1.5 pl-5 font-body text-sm leading-5 text-black">
                  {c.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                <Link
                  href={c.href ?? "/class"}
                  className="mt-auto flex w-fit items-center gap-3 rounded-lg bg-nexo-orange px-6 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
                >
                  Clase de prueba
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
