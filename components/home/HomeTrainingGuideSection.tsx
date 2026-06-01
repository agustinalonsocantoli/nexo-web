import AnimateOnScroll from '../AnimateOnScroll';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

const linkKeys = ['crossfit', 'hyrox', 'onramp', 'plans', 'contact'] as const;

const guideSections = [
  { key: 'onramp', paragraphs: 1, bullets: 0 },
  { key: 'crossfit', paragraphs: 1, bullets: 5 },
  { key: 'hyrox', paragraphs: 1, bullets: 0 },
  { key: 'whyNexo', paragraphs: 1, bullets: 4 },
  { key: 'schedules', paragraphs: 1, bullets: 0 },
  { key: 'community', paragraphs: 1, bullets: 0 },
  { key: 'events', paragraphs: 1, bullets: 0 },
  { key: 'facilities', paragraphs: 1, bullets: 0 },
] as const;

const links = {
  crossfit: '/class/crossfit',
  hyrox: '/class/hyrox',
  onramp: '/on-ramp',
  plans: '/plans',
  contact: '/contact',
} as const;

export default async function HomeTrainingGuideSection() {
  const t = await getTranslations('home.trainingGuide');

  return (
    <section className="border-t border-nexo-dark/10 bg-[#fbfbfb] py-12 text-nexo-dark lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl min-w-0 gap-10 overflow-hidden px-8 lg:grid-cols-[0.85fr_1.5fr] lg:gap-14 lg:overflow-visible lg:px-[72px]">
        <AnimateOnScroll from="left" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <span className="mb-5 inline-flex rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold tracking-[0.08em] text-nexo-orange uppercase">
            {t('badge')}
          </span>
          <h2 className="max-w-md text-balance break-normal font-heading text-[24px] font-bold leading-[0.95] tracking-[0.01em] uppercase sm:text-[32px] lg:text-[30px] lg:leading-[100%] lg:tracking-[0.02em] xl:text-[32px]">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-md font-body text-base leading-7 text-nexo-gray">
            {t('intro')}
          </p>

          <div className="mt-6 flex min-w-0 flex-wrap gap-2">
            {linkKeys.map((key) => (
              <Link
                key={key}
                href={links[key]}
                className="rounded-full border border-nexo-dark/15 px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark transition-colors hover:border-nexo-orange hover:text-nexo-orange"
              >
                {t(`links.${key}`)}
              </Link>
            ))}
          </div>
        </AnimateOnScroll>

        <div className="grid min-w-0 gap-4 lg:gap-5">
          {guideSections.map((section, index) => (
            <AnimateOnScroll key={section.key} from="up" delay={index * 80} className="min-w-0">
              <article className="min-w-0 rounded-[18px] border border-nexo-dark/10 bg-white p-5 shadow-[0px_10px_20px_0px_rgba(0,0,0,0.04)] lg:p-7">
                <div className="mb-4 flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nexo-orange font-body text-sm font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="min-w-0 text-wrap font-body text-xl font-semibold leading-7 text-nexo-dark lg:text-[24px] lg:leading-8">
                    {t(`sections.${section.key}.title`)}
                  </h3>
                </div>

                <div className="min-w-0 space-y-4 font-body text-sm leading-6 text-nexo-gray lg:text-base lg:leading-7">
                  {Array.from({ length: section.paragraphs }).map((_, paragraphIndex) => (
                    <p key={paragraphIndex}>{t(`sections.${section.key}.paragraphs.${paragraphIndex}`)}</p>
                  ))}

                  {section.bullets > 0 && (
                    <ul className="space-y-2 pl-5 text-nexo-dark marker:text-nexo-orange">
                      {Array.from({ length: section.bullets }).map((_, bulletIndex) => (
                        <li key={bulletIndex}>{t(`sections.${section.key}.bullets.${bulletIndex}`)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
