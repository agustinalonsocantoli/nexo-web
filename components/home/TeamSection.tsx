import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';

export default function TeamSection() {
  return (
    <section className="bg-nexo-dark">
      <div className="relative w-full h-[179px] overflow-hidden">
        <OptimizedImage
          src="/equipo-home.webp"
          alt="Equipo Nexo"
          className="h-full w-full object-cover max-h-[179px]"
          width={1920}
          height={179}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-nexo-dark/60"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h2
            className="mb-3 font-heading text-[28px] font-bold uppercase leading-[100%] tracking-[0.03em] text-white md:text-[32px] lg:text-[40px]"
          >
            <span className="block">Conoce</span>
            <span className="block">al equipo</span>
          </h2>
          
          <div className="text-center">
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
    </section>
  );
}
