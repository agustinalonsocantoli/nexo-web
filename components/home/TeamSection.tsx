import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';

export default function TeamSection() {
  return (
    <section className="bg-nexo-dark">
      <div className="relative w-full h-[179px] overflow-hidden lg:h-[469px]">
        <OptimizedImage
          src="/equipo-home.webp"
          alt="Equipo Nexo"
          className="h-full w-full object-cover object-center lg:object-[center_35%]"
          sizes="100vw"
          width={1920}
          height={369}
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-end gap-2 px-6 py-6 text-center lg:justify-end lg:mb-14  lg:gap-4 lg:py-0">
          <h2 className="font-heading text-[24px] font-bold leading-[100%] tracking-[0.72px] text-[#fbfbfb] uppercase lg:text-[48px] lg:tracking-[1.44px]">
            <span className="block">Conoce</span>
            <span className="block">al equipo</span>
          </h2>

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
      </div>
    </section>
  );
}
