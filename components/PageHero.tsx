import OptimizedImage from "./OptimizedImage";

interface PageHeroProps {
  title: string;
  titlePart2?: string;
  subtitle?: string;
  imageSrc?: string;
  lgHeightClass?: string;
  lgTitleClass?: string;
  imageClass?: string;
}

export default function PageHero({
  title,
  titlePart2,
  subtitle,
  imageSrc = '/hero-general.png',
  lgHeightClass = 'lg:h-[341px]',
  lgTitleClass = 'lg:text-[36px]',
  imageClass = '',
}: PageHeroProps) {
  return (
    <section className={`relative flex h-[179px] md:h-[251px] items-center justify-center overflow-hidden ${lgHeightClass}`}>
      <div className="absolute inset-0">
        <OptimizedImage
          src={imageSrc}
          alt={titlePart2 ? `${title} ${titlePart2}` : title}
          priority={true}
          sizes="100vw"
          width={1920}
          height={1080}
          className={`h-full w-full object-cover ${imageClass || 'object-center'}`}
        />
        <div className="absolute inset-0 bg-nexo-dark/40" />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center gap-3 px-8 pt-14 pb-6 text-center lg:gap-5 lg:pt-0 lg:pb-0">
        <h1 className={`font-heading text-[26px] font-bold leading-[100%] uppercase text-white ${lgTitleClass}`}>
          {title}
          {titlePart2 && <><br className="hidden md:block" />{" "}{titlePart2}</>}
        </h1>
        {subtitle && (
          <p className="hidden font-body text-base leading-6 text-white/90 lg:block">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
