import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import ClassBookingForm from "@/components/class/ClassBookingForm";

const BASE_URL = "https://www.nexocrossfit.es";

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
          <span className="font-semibold">{t('faqs.0.answerPrice')}</span> con{" "}
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

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title={t('heroTitle')} titlePart2={t('heroTitlePart2')} imageSrc="/bg-hyrox-des.jpg" />

      {/* Info + formulario */}
      <ClassBookingForm
        title={t('title')}
        description={t('description')}
        faqs={FAQS}
        redirectTo="/class/hyrox/confirm"
        tipo={t('tipo')}
      />
    </main>
  );
}
