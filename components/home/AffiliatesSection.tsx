import OptimizedImage from '../OptimizedImage';

export default function AffiliatesSection() {
  return (
    <section className="relative bg-nexo-dark h-[176px] border-b border-[#878787]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 h-[176px]">
        <OptimizedImage
          src="/afiliados-bg.webp"
          alt="Background"
          className="h-full w-full object-cover"
          sizes="100vw"
          width={1920}
          height={176}
        />
        <div className="absolute inset-0 bg-[rgba(30,30,30,0.63)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center py-5">
        <h3
          className="mb-8 w-fit rounded-3xl border border-nexo-orange px-10 py-1 text-center text-xs font-semibold tracking-wider text-white uppercase"
        >
          Afiliados
        </h3>

        <div
          className="flex items-center justify-center gap-4 px-5"
        >
          <OptimizedImage
            src="/logo-crossfit.webp"
            alt="crossfit"
            className="h-full w-[135px]"
            width={135}
            height={60}
          />

          <div className="ml-5">
            <OptimizedImage
              src="/logo-hyrox.webp"
              alt="hyrox"
              className="h-[33px] w-[122px]"
              width={122}
              height={33}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
