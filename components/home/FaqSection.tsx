import AnimateOnScroll from '../AnimateOnScroll';
import { getTranslations } from 'next-intl/server';

const faqKeys = ['0', '1', '2', '3', '4'] as const;

export default async function FaqSection() {
  const t = await getTranslations('home.faq');

  const faqs = faqKeys.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-12 text-nexo-dark lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-8 lg:grid-cols-[1fr_1.35fr] lg:gap-14 lg:px-[72px]">
        <AnimateOnScroll from="left" className="lg:sticky lg:top-24 lg:self-start">
          <span className="mb-5 inline-flex rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold tracking-[0.08em] text-nexo-orange uppercase">
            {t('badge')}
          </span>
          <h2 className="max-w-xl font-heading text-[28px] font-bold leading-[100%] tracking-[0.03em] uppercase sm:text-[34px] lg:text-[40px] lg:tracking-[1.08px] xl:text-[44px]">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-md font-body text-base leading-7 text-nexo-gray">
            {t('description')}
          </p>
        </AnimateOnScroll>

        <div className="border-t border-nexo-dark/15">
          {faqs.map((faq, index) => (
            <AnimateOnScroll key={faq.question} from="up" delay={index * 80}>
              <article
                className="group grid gap-3 border-b border-nexo-dark/15 py-6 md:grid-cols-[1fr_auto] md:gap-5 lg:py-7"
              >
                <div>
                  <h3 className="font-body text-lg font-semibold leading-7 text-nexo-dark lg:text-[22px] lg:leading-8">
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
  );
}
