import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';

export interface TrainingCardType {
  title: string;
  bullets: string[];
  desktopDescription?: string;
  image: string;
  href?: string;
  verMasHref?: string;
}

const trainings: TrainingCardType[] = [
  {
    title: 'ON RAMP',
    bullets: [
      'Tu base antes de despegar en CrossFit.',
      'Aprende los fundamentos: gimnásticos, halterofilia, cardio y fuerza.',
      'Al terminar, entras a clases regulares sabiendo exactamente qué haces y por qué.',
    ],
    desktopDescription:
      'Tu base antes de despegar.\nEn nuestro curso de iniciación aprendes los fundamentos del CrossFit sin prisa. Gimnásticos, halterofilia, cardio y fuerza. Cada movimiento desglosado hasta que lo sientas natural.\nAl terminar, entras a clases regulares sabiendo exactamente qué haces y por qué lo haces.',
    image: '/onramp-img.webp',
    href: '/on-ramp',
    verMasHref: '/on-ramp',
  },
  {
    title: 'CROSSFIT',
    bullets: [
      'Entrena con coaches que te empujan a lograr tus objetivos.',
      'Clases de 60 minutos con enfoque en tu progreso semanal, cuidando la técnica y evitando lesiones.',
      'Comunidad, energía y un box preparado para cada WOD.',
    ],
    desktopDescription:
      'Clases de 60 minutos donde cada sesión tiene un propósito.\nCalentamiento técnico, desarrollo de fuerza y wods escalables a tu nivel.\n\nEn Nexo llevamos una programación diseñada para que progreses semana a semana, priorizando la técnica y evitando lesiones.',
    image: '/crossfit-img.webp',
    href: '/class/crossfit',
  },
  {
    title: 'HYROX',
    bullets: [
      'Entrenamientos específicos para la competición más exigente.',
      'Trabajamos resistencia, potencia y transiciones entre estaciones.',
      'Preparación física y mental para rendir al máximo el día de la carrera.',
    ],
    desktopDescription:
      'Entrenamientos específicos para la competición más exigente.\n\nTrabajamos resistencia, potencia y transiciones entre estaciones. Simulamos condiciones de carrera, optimizamos tu estrategia y te preparamos física y mentalmente para la competición.',
    image: '/hyrox-img.webp',
    href: '/class/hyrox',
  },
];

export default function TrainingSection() {
  return (
    <section className="bg-[#fbfbfb] py-8 text-nexo-dark lg:py-16">
      <div className="mx-auto max-w-7xl px-8 lg:px-[72px]">
        <div className="mb-6 flex flex-col items-center gap-4 text-center lg:mb-10 lg:gap-6">
          <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
            NUESTRAS CLASES
          </span>

          <h2 className="font-heading text-[20px] font-bold leading-[100%] tracking-[0.03em] text-nexo-orange uppercase lg:text-[36px] lg:tracking-[1.08px]">
            ENTRENAMIENTOS PENSADOS PARA TI
          </h2>

          <p className="font-body text-[14px] leading-[20px] text-nexo-dark lg:text-[16px] lg:max-w-[1040px]">
            En nuestro box encontrarás una gran variedad de clases y entrenamientos adaptados a tu nivel, para que superes tus límites, progreses paso a paso y consigas tus metas.
          </p>
        </div>

        {/* Mobile: accordion cards */}
        <div className="flex flex-col gap-4 lg:hidden">
          {trainings.map((training, index) => (
            <TrainingCard key={index} training={training} />
          ))}
        </div>

        {/* Desktop: always-open cards */}
        <div className="hidden lg:flex lg:items-stretch lg:justify-between lg:gap-6">
          {trainings.map((training, index) => (
            <TrainingCardDesktop key={index} training={training} />
          ))}
        </div>

        <div className="mt-6 lg:mt-8 lg:flex lg:justify-center">
          <Link
            href="/class"
            className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange py-2 font-body text-sm text-white transition-opacity hover:opacity-90 lg:w-[261px]"
          >
            Clase de Prueba
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TrainingCard({
  training,
  groupName = "training-accordion",
}: {
  training: TrainingCardType;
  groupName?: string;
}) {
  return (
    <details
      name={groupName}
      className="group open:rounded-2xl open:border open:border-nexo-dark open:bg-[#fbfbfb]"
    >
      {/* SUMMARY (solo mobile) */}
      <summary className="list-none cursor-pointer select-none">

        {/* Estado cerrado: imagen oscura con título encima */}
        <div className="group-open:hidden relative h-[112px] w-full overflow-hidden rounded-2xl">
          <OptimizedImage
            src={training.image}
            alt={training.title}
            className="h-full w-full object-cover object-[center_37%]"
            sizes="100vw"
            width={600}
            height={112}
          />
          <div className="absolute inset-0 bg-nexo-dark/60" />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <h3 className="font-body text-[36px] font-normal leading-none text-white uppercase">
              {training.title}
            </h3>
            <svg
              className="h-6 w-6 shrink-0 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Estado abierto (en summary): imagen → título + chevron arriba */}
        <div className="hidden group-open:flex flex-col gap-4 px-4 pt-6">
          <div className="relative h-[131px] w-full overflow-hidden rounded-lg">
            <OptimizedImage
              src={training.image}
              alt={training.title}
              className="h-full w-full object-cover object-[center_37%]"
              width={600}
              height={131}
            />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-body text-[36px] font-normal leading-none text-nexo-dark uppercase">
              {training.title}
            </h3>
            <svg
              className="h-6 w-6 shrink-0 text-nexo-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </div>
      </summary>

      {/* CONTENIDO */}
      <div className="hidden group-open:flex flex-col gap-4 px-4 pt-4 pb-6">
        {/* Bullets */}
        <ul className="list-disc space-y-1 pl-5 font-body text-sm leading-5 text-black">
          {training.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={training.href ?? "/class"}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
        >
          Clase de prueba
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </details>
  );
}

export function TrainingCardDesktop({ training }: { training: TrainingCardType }) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden rounded-2xl border border-nexo-dark bg-[#fbfbfb] px-4 py-6">
      {/* Imagen */}
      <div className="relative h-[131px] w-full overflow-hidden rounded-lg">
        <OptimizedImage
          src={training.image}
          alt={training.title}
          className="h-full w-full object-cover object-[center_37%]"
          sizes="33vw"
          width={600}
          height={131}
        />
      </div>

      {/* Título + Ver más */}
      <div className="flex items-center justify-between">
        <h3 className="font-body text-[36px] font-normal leading-none text-nexo-dark uppercase">
          {training.title}
        </h3>
        {training.verMasHref && (
          <Link
            href={training.verMasHref}
            className="font-body text-base text-nexo-orange underline decoration-solid whitespace-nowrap"
          >
            Ver más
          </Link>
        )}
      </div>

      {/* Descripción */}
      {training.desktopDescription ? (
        <p className="font-body text-sm leading-5 text-black whitespace-pre-line">
          {training.desktopDescription}
        </p>
      ) : (
        <ul className="list-disc space-y-1 pl-5 font-body text-sm leading-5 text-black">
          {training.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
