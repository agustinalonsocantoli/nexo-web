import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';

export default function TeamHero() {
  return (
    <section className="relative h-[179px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/equipo-home.webp"
          alt="Equipo Nexo"
          className="h-full w-full object-cover"
          priority={true}
          sizes="100vw"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 py-6 text-center">
        <h1 className="font-heading text-[24px] font-bold leading-[100%] tracking-[0.03em] text-white uppercase">
          Conoce<br />al equipo
        </h1>

        <Link
          href="/clase-prueba"
          className="flex items-center gap-4 rounded-lg bg-nexo-orange px-8 py-2 font-body text-sm text-white transition-opacity hover:opacity-90"
        >
          Clase de Prueba
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
