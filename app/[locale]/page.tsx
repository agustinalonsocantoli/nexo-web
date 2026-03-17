import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AffiliatesSection from "@/components/home/AffiliatesSection";
import Hero from "@/components/home/Hero";
import TrainingSection from "@/components/home/TrainingSection";
import TeamSection from "@/components/home/TeamSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: {
      absolute: t("title"),
    },
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/es`,
      },
    },
  };
}

export default function Home() {
  return (
    <main>
      <Hero />
      <TrainingSection />
      <AffiliatesSection />
      <WhyChooseUs />
      <TeamSection />
    </main>
  );
}
