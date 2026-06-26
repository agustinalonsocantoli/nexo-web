import OptimizedImage from '../OptimizedImage';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

interface HeroProps {
  backgroundImage?: string;
}

export default async function Hero({ backgroundImage = '/hero-home.jpg' }: HeroProps) {
  const t = await getTranslations('home');
  const tc = await getTranslations('common');

  return (
    <section className="relative h-[691px] lg:h-[564px]">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={backgroundImage}
          alt="Nexo Gym"
          className="h-full w-full object-cover object-center lg:object-[center_70%]"
          priority={true}
          sizes="100vw"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-nexo-dark/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="flex flex-col items-center font-heading font-bold tracking-[0.03em] text-white uppercase lg:tracking-[1.92px]">
            <span className="text-balance text-[32px] leading-[0.95] sm:text-[36px] lg:text-[64px]">
              {t('hero.title1')}
            </span>
            <span className="mt-2 text-[20px] leading-[1.1] tracking-[0.02em] sm:text-[24px] lg:mt-3 lg:text-[36px]">
              {t('hero.title2')}
            </span>
          </h1>
          <p className="font-body text-base leading-[20px] text-[#e5e7eb] lg:text-2xl lg:leading-8">
            {t('hero.subtitle1')}<br />
            {t('hero.subtitle2')}<br />
            {t('hero.subtitle3')}
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row">
          <Link
            href="/plans"
            className="order-2 flex items-center justify-center rounded-lg border border-white px-8 py-2 font-body text-sm text-white transition-all hover:bg-white hover:text-nexo-dark lg:order-1 lg:px-10"
          >
            {tc('checkPrices')}
          </Link>
          <Link
            href="/class"
            className="order-1 flex items-center justify-center rounded-lg bg-nexo-orange px-8 py-2 font-body text-sm text-white transition-opacity hover:opacity-90 lg:order-2 lg:px-10"
          >
            {tc('signUp')}
          </Link>
        </div>
      </div>
    </section>
  );
}
