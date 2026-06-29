import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import ClassBookingForm from "@/components/class/ClassBookingForm";
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
  const t = await getTranslations({ locale, namespace: "metadata.hyrox" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/class/hyrox`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/class/hyrox`,
      languages: {
        es: `${BASE_URL}/es/class/hyrox`,
        en: `${BASE_URL}/en/class/hyrox`,
        "x-default": `${BASE_URL}/es/class/hyrox`,
      },
    },
  };
}

export default async function HyroxPage() {
  const t = await getTranslations('hyrox');

  const FAQS = [
    {
      question: t('faqs.0.question'),
      answer: (
        <>
          <span className="font-semibold">{t('faqs.0.answerPrice1')}</span> {t('faqs.0.answerPrice2')}{" "}
          <span className="font-semibold">{t('faqs.0.answerAccess')}</span>{t('faqs.0.answerText')}
        </>
      ),
    },
    {
      question: t('faqs.1.question'),
      answer: (
        <>
          {t('faqs.1.answerIntro')}<span className="font-semibold">{t('faqs.1.answerDuration')}</span>{t('faqs.1.answerMiddle')}{" "}
          <span className="font-semibold">
            {t('faqs.1.answerBenefit')}
          </span>
          {t('faqs.1.answerEnd')}
        </>
      ),
    },
    {
      question: t('faqs.2.question'),
      answer:
        <span>{t('faqs.2.answer')}</span>
    },
  ];
  const hyroxFaqs = hyroxFaqKeys.map((key) => ({
    question: t(`hyroxFaq.items.${key}.question`),
    answer: t(`hyroxFaq.items.${key}.answer`),
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t('faqs.0.question'),
        acceptedAnswer: {
          "@type": "Answer",
          text: `${t('faqs.0.answerPrice1')} ${t('faqs.0.answerPrice2')} ${t('faqs.0.answerAccess')}${t('faqs.0.answerText')}`,
        },
      },
      {
        "@type": "Question",
        name: t('faqs.1.question'),
        acceptedAnswer: {
          "@type": "Answer",
          text: `${t('faqs.1.answerIntro')}${t('faqs.1.answerDuration')}${t('faqs.1.answerMiddle')} ${t('faqs.1.answerBenefit')}${t('faqs.1.answerEnd')}`,
        },
      },
      {
        "@type": "Question",
        name: t('faqs.2.question'),
        acceptedAnswer: {
          "@type": "Answer",
          text: t('faqs.2.answer'),
        },
      },
      ...hyroxFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    ],
  };

  return (
    <main className="bg-[#fbfbfb]">
      <JsonLd data={faqSchema} />
      <PageHero title={t('heroTitle')} titlePart2={t('heroTitlePart2')} imageSrc="/bg-hyrox-des.jpg" />

      {/* Info + formulario */}
      <ClassBookingForm
        title={t('title')}
        description={t('description')}
        faqs={FAQS}
        redirectTo="/class/hyrox/confirm"
        tipo={t('tipo')}
      />

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
