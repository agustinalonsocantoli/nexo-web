import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import OptimizedImage from "@/components/OptimizedImage";
import PageHero from "@/components/PageHero";
import { TrainingCard, TrainingCardType } from "@/components/home/TrainingSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://www.nexocrossfit.es";
const hyroxGuideSectionKeys = ["0", "1"] as const;
const hyroxFaqKeys = ["0", "1", "2", "3", "4", "5"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.class" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/class`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/class`,
      languages: {
        es: `${BASE_URL}/es/class`,
        en: `${BASE_URL}/en/class`,
        "x-default": `${BASE_URL}/es/class`,
      },
    },
  };
}

export default async function ClassPage() {
  const t = await getTranslations('class');
  const tc = await getTranslations('common');

  const classes: TrainingCardType[] = [
    {
      title: "CROSSFIT",
      bullets: [
        t('crossfitBullet'),
      ],
      image: "/crossfit-new.png",
      href: "/class/crossfit",
      id: 2,
    },
    {
      title: "HYROX",
      bullets: [
        t('hyroxBullet'),
      ],
      image: "/new-hyrox.jpg",
      href: "/class/hyrox",
      id: 3,
    },
  ];

  const hyroxFaqs = hyroxFaqKeys.map((key) => ({
    question: t(`hyroxFaq.items.${key}.question`),
    answer: t(`hyroxFaq.items.${key}.answer`),
  }));

  const hyroxFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hyroxFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title={t('heroTitle')} titlePart2={t('heroTitlePart2')} imageSrc="/clase-prueba-bg.png" imageClass="object-[center_25%]" />

      {/* Contenido */}
      <div className="flex flex-col gap-4 px-6 py-6 lg:mx-auto lg:max-w-7xl lg:gap-10 lg:px-30 lg:py-16">

        {/* Título de sección — solo desktop */}
        <AnimateOnScroll>
          <h2 className="hidden font-heading text-[28px] font-bold uppercase leading-tight tracking-[0.03em] text-nexo-dark lg:block lg:text-[32px]">
            {t('sectionTitle')}
          </h2>
        </AnimateOnScroll>

        {/* Párrafo intro */}
        <AnimateOnScroll delay={100}>
          <p className="font-body text-sm leading-5 text-nexo-dark lg:text-base lg:leading-6">
            <span className="lg:hidden">
              {t('introMobile')}
            </span>
            <span className="hidden lg:inline">
              {t('introDesktop')}
            </span>
          </p>
        </AnimateOnScroll>

        {/* Mobile: accordion cards */}
        <div className="flex flex-col gap-4 lg:hidden">
          {classes.map((c) => (
            <TrainingCard key={c.title} training={c} testClass={true} />
          ))}
        </div>

        {/* Desktop: horizontal cards en grid 2 columnas */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
          {classes.map((c) => (
            <AnimateOnScroll key={c.title} delay={100}>
            <div
              className="flex overflow-hidden rounded-2xl border border-nexo-dark transition-all duration-200 hover:shadow-lg hover:scale-[1.01] h-full"
            >
              {/* Imagen izquierda */}
              <div className="relative w-[210px] shrink-0">
                <OptimizedImage
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover object-[center_37%]"
                  sizes="210px"
                  width={210}
                  height={220}
                />
              </div>

              {/* Contenido derecha */}
              <div className="flex flex-col gap-4 px-5 py-6 h-full">
                <h3 className="font-body text-[36px] font-normal leading-none text-nexo-dark uppercase">
                  {c.title}
                </h3>
                <ul className="list-disc space-y-1.5 pl-5 font-body text-sm leading-5 text-black">
                  {c.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                <Link
                  href={c.href ?? "/class"}
                  className="mt-auto flex w-fit items-center gap-3 rounded-lg bg-nexo-orange px-6 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
                >
                  {tc('bookClass')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <section className="border-t border-nexo-dark/10 bg-[#fbfbfb] py-10 text-nexo-dark lg:py-16">
        <div className="mx-auto grid w-full max-w-7xl min-w-0 gap-8 overflow-hidden px-6 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12 lg:overflow-visible lg:px-[72px]">
          <AnimateOnScroll from="left" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <span className="mb-5 inline-flex rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold tracking-[0.08em] text-nexo-orange uppercase">
              {t('hyroxGuide.badge')}
            </span>
            <h2 className="max-w-md text-balance font-heading text-[24px] font-bold leading-[0.95] tracking-[0.01em] uppercase sm:text-[32px] lg:text-[32px] lg:leading-[100%] lg:tracking-[0.02em]">
              {t('hyroxGuide.title')}
            </h2>
            <p className="mt-5 max-w-md font-body text-base leading-7 text-nexo-gray">
              {t('hyroxGuide.intro')}
            </p>
          </AnimateOnScroll>

          <div className="grid min-w-0 gap-4 lg:gap-5">
            {hyroxGuideSectionKeys.map((key, index) => (
              <AnimateOnScroll key={key} from="up" delay={index * 80} className="min-w-0">
                <article className="min-w-0 rounded-[18px] border border-nexo-dark/10 bg-white p-5 shadow-[0px_10px_20px_0px_rgba(0,0,0,0.04)] lg:p-7">
                  <div className="mb-4 flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nexo-orange font-body text-sm font-bold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="min-w-0 text-wrap font-body text-xl font-semibold leading-7 text-nexo-dark lg:text-[24px] lg:leading-8">
                      {t(`hyroxGuide.sections.${key}.title`)}
                    </h3>
                  </div>
                  <p className="font-body text-sm leading-6 text-nexo-gray lg:text-base lg:leading-7">
                    {t(`hyroxGuide.sections.${key}.text`)}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 text-nexo-dark lg:py-16">
        <JsonLd data={hyroxFaqSchema} />

        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12 lg:px-[72px]">
          <AnimateOnScroll from="left">
            <span className="mb-5 inline-flex rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold tracking-[0.08em] text-nexo-orange uppercase">
              {t('hyroxFaq.badge')}
            </span>
            <h2 className="max-w-xl text-balance font-heading text-[24px] font-bold leading-[100%] tracking-[0.03em] uppercase sm:text-[34px] lg:text-[36px] lg:tracking-[1.08px]">
              {t('hyroxFaq.title')}
            </h2>
            <p className="mt-5 max-w-md font-body text-base leading-7 text-nexo-gray">
              {t('hyroxFaq.description')}
            </p>
          </AnimateOnScroll>

          <div className="min-w-0 border-t border-nexo-dark/15">
            {hyroxFaqs.map((faq, index) => (
              <AnimateOnScroll key={faq.question} from="up" delay={index * 80} className="min-w-0">
                <article className="group grid grid-cols-[1fr_auto] gap-3 border-b border-nexo-dark/15 py-5 md:gap-5 lg:py-6">
                  <div className="min-w-0">
                    <h3 className="font-body text-base font-semibold leading-6 text-nexo-dark lg:text-xl lg:leading-7">
                      {faq.question}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-6 text-nexo-gray lg:text-base lg:leading-7">
                      {faq.answer}
                    </p>
                  </div>
                  <svg
                    className={`mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 md:h-6 md:w-6 ${
                      index === 0 ? 'text-nexo-orange' : 'text-nexo-dark/35 group-hover:text-nexo-orange'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z" />
                  </svg>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
