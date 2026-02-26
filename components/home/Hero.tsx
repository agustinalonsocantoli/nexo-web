import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';

interface HeroProps {
  backgroundImage?: string;
}

export default function Hero({ backgroundImage = '/hero-home.webp' }: HeroProps) {
  return (
    <section className="relative h-[691px]">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={backgroundImage}
          alt="Nexo Gym"
          className="h-full w-full object-cover"
          priority={true}
          sizes="100vw"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-nexo-dark/70" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-heading text-[36px] font-bold leading-[100%] tracking-[0.03em] text-white uppercase">
            SUPÉRATE en Nexo.
          </h1>
          <p className="font-body text-base leading-[20px] text-[#e5e7eb]">
            Donde el deporte se convierte en diversión y el esfuerzo en bienestar.<br />
            Mejora tu salud física y mental rodeado de una comunidad que te impulsa.<br />
            ¡Únete a nosotros!
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <Link
            href="/registrate"
            className="flex items-center justify-center rounded-lg bg-nexo-orange px-8 py-2 font-body text-sm text-white transition-opacity hover:opacity-90"
          >
            Apúntate
          </Link>
          <Link
            href="/plans"
            className="flex items-center justify-center rounded-lg border border-white px-8 py-2 font-body text-sm text-white transition-all hover:bg-white hover:text-nexo-dark"
          >
            ¡Conoce nuestras Tarifas!
          </Link>
        </div>
      </div>
    </section>
  );
}
