import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';

interface TrainingCardType {
  title: string;
  description: string;
  image: string;
}

const trainings: TrainingCardType[] = [
  {
    title: 'ON RAMP',
    description:
      'Tu base antes de despegar. En nuestro curso de iniciación aprendes los fundamentos del CrossFit sin prisa. Gimnásticos, halterofilia, cardio y fuerza. Cada movimiento desglosado hasta que lo sientas natural. Al terminar, entras a clases regulares sabiendo exactamente qué haces y por qué lo haces.',
    image: '/onramp-img.webp'
  },
  {
    title: 'CROSSFIT',
    description:
      'Clases de 60 minutos donde cada sesión tiene un propósito. Calentamiento técnico, desarrollo de fuerza y wods escalables a tu nivel. En Nexo llevamos una programación diseñada para que progreses semana a semana, priorizando la técnica y evitando lesiones.',
    image: '/crossfit-img.webp'
  },
  {
    title: 'HYROX',
    description:
      'Entrenamientos específicos para la competición más exigente. Trabajamos resistencia, potencia y transiciones entre estaciones. Simulamos condiciones de carrera, optimizamos tu estrategia y te preparamos física y mentalmente para la competición.',
    image: '/hyrox-img.webp'
  }
];

export default function TrainingSection() {
  return (
    <section className="bg-white py-12 text-nexo-dark">
      <div className="mx-auto max-w-7xl px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <h3
            className="mx-auto mb-6 w-fit rounded-3xl border border-nexo-orange px-4 py-2 text-center text-sm font-semibold tracking-wider text-black uppercase"
          >
            Nuestras Clases
          </h3>

          <h2 className="mb-4 font-heading text-[20px] font-bold leading-[100%] tracking-[0.03em] text-nexo-orange uppercase">
            Entrenamientos pensados para ti
          </h2>
          
          <p className="max-w-2xl font-body text-[14px] font-normal text-black">
            Amplia variedad de clases y entrenamientos adaptados a tu nivel para que progreses en cada clase y alcances tus objetivos.
          </p>
        </div>

        {/* Training Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {trainings.map((training, index) => (
            <TrainingCard
              key={index}
              training={training}
              index={index}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-6 text-center">
          <Link
            href="/tarifas"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-nexo-orange py-2 font-body text-sm font-normal tracking-wide text-white transition-all hover:bg-nexo-orange/90"
          >
            Conoce nuestras tarifas
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrainingCard({ training, index }: { training: TrainingCardType; index: number }) {
  return (
    <div className="training-card">
      <input
        type="checkbox"
        id={`training-toggle-${index}`}
        className="hidden"
      />

      {/* Collapsed State - Solo visible en mobile */}
      <label htmlFor={`training-toggle-${index}`} className="collapsed-state cursor-pointer md:cursor-default">
        <div className="relative h-28 w-full overflow-hidden rounded-2xl shadow-lg">
          <OptimizedImage
            src={training.image}
            alt={training.title}
            className="h-full w-full object-cover object-[center_37%]"
            width={600}
            height={112}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Title and Arrow */}
          <div className="absolute inset-0 flex items-center justify-between px-6 py-4">
            <h3 className="font-body text-3xl font-normal tracking-wide text-white uppercase">
              {training.title}
            </h3>

            <svg
              className="h-8 w-8 text-white md:hidden"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </label>

      {/* Expanded State - Toggle en mobile, siempre visible en desktop */}
      <div className="expanded-state">
        <div className="flex flex-col gap-4 rounded-2xl border border-nexo-dark bg-white px-4 py-6 shadow-sm md:border md:px-4 md:py-6 md:shadow-sm">
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden rounded-2xl">
            <OptimizedImage
              src={training.image}
              alt={training.title}
              className="h-full w-full object-cover object-[center_37%]"
              width={600}
              height={300}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <h3 className="font-body text-2xl font-normal tracking-wide text-nexo-dark uppercase md:text-3xl">
                {training.title}
              </h3>

              {/* Desktop: icono decorativo */}
              <svg
                className="hidden h-6 w-6 rotate-180 text-nexo-orange md:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>

              {/* Mobile: botón para cerrar card */}
              <label
                htmlFor={`training-toggle-${index}`}
                className="flex cursor-pointer items-center justify-center bg-transparent md:hidden"
                aria-label="Cerrar"
              >
                <svg
                  className="h-6 w-6 rotate-180 text-nexo-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>
            </div>

            <p className="font-body text-sm font-normal leading-relaxed text-black">
              {training.description}
            </p>

            <div className="text-center md:text-left">
              <Link
                href="/tarifas"
                className="inline-flex items-center gap-2 rounded-lg bg-nexo-orange px-8 py-3 font-body text-sm font-normal tracking-wide text-white transition-all hover:bg-nexo-orange/90"
              >
                Ver más
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
