import OptimizedImage from "./OptimizedImage";

interface PageHeroProps {
  title: string;
}

export default function PageHero({ title }: PageHeroProps) {
  return (
    <section className="relative flex h-[251px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src="/hero-general.webp"
          alt={title}
          priority={true}
          sizes="100vw"
          width={393}
          height={590}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-nexo-dark/70" />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center px-8 pt-14 pb-6 text-center">
        <h1 className="font-heading text-[26px] font-bold leading-[100%] uppercase text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
