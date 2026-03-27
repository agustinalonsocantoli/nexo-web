import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SessionsSection from "@/components/on-ramp/SessionsSection";
import SessionsSkeleton from "@/components/on-ramp/SessionsSkeleton";

export const revalidate = 60;

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.onramp" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/on-ramp`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/on-ramp`,
      languages: {
        es: `${BASE_URL}/es/on-ramp`,
        en: `${BASE_URL}/en/on-ramp`,
        "x-default": `${BASE_URL}/es/on-ramp`,
      },
    },
  };
}

export default async function OnRampPage() {
  const t = await getTranslations("onramp");

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero
        title={t("heroTitle")}
        titlePart2={t("heroTitlePart2")}
        imageSrc="/new-or-edit.jpg"
        imageClass="object-[center_45%]"
      />

      <div className="mx-auto max-w-7xl flex flex-col gap-10 px-6 py-8 lg:gap-12 lg:px-[72px] lg:py-12">
        {/* What is On Ramp + Upcoming Dates */}
        <section className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-2 mb-4">
            <AnimateOnScroll from="left">
              <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%] tracking-[0.6px]">
                {t("whatIsTitle")}
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll from="up" delay={100}>
              <p className="font-body text-base leading-6 text-nexo-dark">
                {t("whatIsDescription1")}
              </p>
              <p className="font-body text-base leading-6 text-nexo-dark mt-2 md:mt-0">
                {t("whatIsDescription2")}
              </p>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll from="left">
            <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%] tracking-[0.6px]">
              {t("upcomingDatesTitle")}
            </h2>
          </AnimateOnScroll>

          <Suspense fallback={<SessionsSkeleton />}>
            <SessionsSection />
          </Suspense>
        </section>

        {/* Cost */}
        <section className="flex flex-col gap-2">
          <AnimateOnScroll from="left">
            <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%] tracking-[0.6px]">
              {t("costTitle")}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll from="up" delay={100}>
            <p className="font-body text-base leading-5 text-nexo-dark">
              {t("costDescription")}{" "}
              <span className="font-semibold">{t("costAmount")}</span>.
            </p>
          </AnimateOnScroll>
        </section>

        {/* Details */}
        <section className="flex flex-col gap-2">
          <AnimateOnScroll from="left">
            <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%] tracking-[0.6px]">
              {t("detailsTitle")}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll from="up" delay={100}>
            <ul className="list-disc space-y-1 pl-5 font-body text-base leading-5 text-nexo-dark">
              <li>{t("detail0")}</li>
              <li>{t("detail1")}</li>
              <li>{t("detail2")}</li>
              <li>{t("detail3")}</li>
              <li>{t("detail4")}</li>
              <li>{t("detail5")}</li>
            </ul>
          </AnimateOnScroll>
        </section>

        {/* Alternative schedule */}
        <section className="flex flex-col gap-2">
          <AnimateOnScroll from="left">
            <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%] tracking-[0.6px] lg:max-w-[860px]">
              {t("alternativeTitle")}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll from="up" delay={100}>
            <p className="font-body text-base leading-5 text-nexo-dark">
              {t("alternativeDescription")}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 font-body text-base leading-5 text-nexo-dark">
              <li>{t("alternativeSemiprivate")}</li>
              <li>{t("alternativePrivate")}</li>
            </ul>
          </AnimateOnScroll>
        </section>
      </div>
    </main>
  );
}
