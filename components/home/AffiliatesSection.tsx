import OptimizedImage from '../OptimizedImage';
import AnimateOnScroll from '../AnimateOnScroll';

export default function AffiliatesSection() {
  return (
    <section className="relative bg-nexo-dark h-[176px] lg:h-[258px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/afiliates-bg.jpg"
          alt="Background"
          className="h-full w-full object-cover opacity-20  object-center lg:object-[center_55%]"
          sizes="100vw"
          width={1920}
          height={258}
        />
        <div className="absolute inset-0 bg-[rgba(30,30,30,0.2)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 py-4 lg:gap-[51px] lg:py-4">
        <AnimateOnScroll from="fade">
          <span className="w-fit rounded-full border border-nexo-orange px-4 py-1.5 font-body text-xs font-semibold text-white uppercase">
            AFILIADOS
          </span>
        </AnimateOnScroll>

        <AnimateOnScroll from="fade" delay={100}>
          <div className="flex items-center justify-center gap-8 lg:gap-14">
            <OptimizedImage
              src="/logo-crossfit.webp"
              alt="CrossFit"
              className="h-auto w-[140px] lg:w-[382px]"
              width={382}
              height={84}
            />
            <OptimizedImage
              src="/logo-hyrox.webp"
              alt="Hyrox Gym Oficial"
              className="h-[35px] w-auto lg:h-[88px] lg:w-[326px]"
              width={326}
              height={88}
            />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
