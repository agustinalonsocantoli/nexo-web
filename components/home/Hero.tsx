import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';

interface HeroProps {
  backgroundImage?: string;
}

export default function Hero({ backgroundImage = '/hero-home.webp' }: HeroProps) {
  return (
    <section className="relative h-[691px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={backgroundImage}
          alt="Nexo Gym"
          className="h-full w-full object-cover opacity-60"
          priority={true}
          width={1920}
          height={1080}
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-transparent via-nexo-dark/40 to-nexo-dark"
        ></div>
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <h1
          className="mb-4 font-heading text-4xl leading-[100%] font-bold tracking-[0.03em] text-white uppercase md:text-6xl lg:text-7xl"
        >
          SUPERATE en Nexo
        </h1>

        <p className="mb-10 max-w-lg font-body text-lg leading-relaxed font-normal text-white">
          Donde el deporte se convierte en diversión y el esfuerzo en bienestar. Mejora tu salud física y mental rodeado de una comunidad que te impulsa. ¡Únete a nosotros!
        </p>

        {/* CTA Buttons */}
        <div className="flex w-[90%] max-w-sm flex-col gap-4">
          <Link
            href="/registrate"
            className="flex items-center justify-center gap-2 rounded-lg bg-nexo-orange px-5 py-3 font-body text-sm font-normal tracking-wide text-white transition-all hover:bg-nexo-orange/90"
          >
            Apúntate
          </Link>

          <Link
            href="/tarifas"
            className="rounded-lg border-2 border-white px-5 py-3 font-body text-sm font-normal tracking-wide text-white transition-all hover:bg-white hover:text-nexo-dark"
          >
            ¡Conoce nuestras tarifas!
          </Link>
        </div>
      </div>
    </section>
  );
}
