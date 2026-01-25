import OptimizedImage from '../OptimizedImage';

export default function AboutHero() {
  return (
    <section className="relative h-[50vh] pt-16 md:h-[60vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/hero-about-us.webp"
          alt="Sobre Nosotros - Nexo CrossFit"
          className="h-full w-full object-cover opacity-60"
          width={1920}
          height={1080}
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-transparent via-nexo-dark/40 to-nexo-dark"
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1
          className="mb-4 font-heading text-4xl leading-tight font-bold tracking-[0.03em] text-white uppercase md:text-6xl"
        >
          Sobre Nosotros
        </h1>
        <p className="max-w-lg font-body text-lg leading-relaxed font-normal text-white">
          Tu lugar para crecer con dedicación y en comunidad.
        </p>
      </div>
    </section>
  );
}
