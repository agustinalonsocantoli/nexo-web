import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import PricesSection from "@/components/plans/PricesSection";
import DiscountsSection from "@/components/plans/DiscountsSection";
import ScheduleSection from "@/components/plans/ScheduleSection";
import PricesSkeleton from "@/components/plans/PricesSkeleton";
import DiscountsSkeleton from "@/components/plans/DiscountsSkeleton";
import ScheduleSkeleton from "@/components/plans/ScheduleSkeleton";

export const revalidate = 60;

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.plans" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/plans`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/plans`,
      languages: {
        es: `${BASE_URL}/es/plans`,
        en: `${BASE_URL}/en/plans`,
        "x-default": `${BASE_URL}/es/plans`,
      },
    },
  };
}

export default async function PlansPage() {
  const tc = await getTranslations("common");

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero
        title={(await getTranslations("plans"))("heroTitle")}
        titlePart2={(await getTranslations("plans"))("heroTitlePart2")}
        imageSrc="/hero-sn-desktop.jpg"
        imageClass="object-[center_60%] md:object-[center_50%] lg:object-[center_35%]"
      />

      <div className="flex flex-col gap-8 px-8 py-8 lg:mx-auto lg:max-w-7xl lg:gap-12 lg:px-30 lg:py-16">
        <Suspense fallback={<PricesSkeleton />}>
          <PricesSection />
        </Suspense>

        <Suspense fallback={<DiscountsSkeleton />}>
          <DiscountsSection />
        </Suspense>

        <Suspense fallback={<ScheduleSkeleton />}>
          <ScheduleSection />
        </Suspense>

        <AnimateOnScroll delay={100}>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/class"
              className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90 lg:w-fit lg:self-center lg:px-12"
            >
              {tc("bookClass")}
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
        </AnimateOnScroll>
      </div>
    </main>
  );
}
