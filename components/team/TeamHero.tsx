import OptimizedImage from '../OptimizedImage';

export default function TeamHero() {
  return (
    <section className="relative h-[179px] overflow-hidden lg:h-[341px]">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/equipo-home.webp"
          alt="Equipo Nexo"
          className="h-full w-full object-cover object-center lg:object-[center_35%]"
          priority={true}
          sizes="100vw"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 py-6 text-center lg:justify-center lg:gap-16 lg:py-0">
        <h1 className="font-heading text-[24px] font-bold leading-[100%] tracking-[0.72px] text-white uppercase lg:text-[48px] lg:tracking-[1.44px]">
          <div className='hidden lg:block'>Conoce a<br />nuestro equipo</div>
          <div className='block lg:hidden'>Conoce <br />a nuestro <br />equipo</div>
        </h1>
      </div>
    </section>
  );
}
