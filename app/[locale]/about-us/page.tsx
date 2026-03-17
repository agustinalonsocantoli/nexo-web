import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutHero from "@/components/about-us/AboutHero";
import AboutBody from "@/components/about-us/AboutBody";

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/about-us`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/about-us`,
      languages: {
        es: `${BASE_URL}/es/about-us`,
        en: `${BASE_URL}/en/about-us`,
        "x-default": `${BASE_URL}/es/about-us`,
      },
    },
  };
}

export default function AboutUs() {
  return (
    <main>
      <AboutHero />
      <AboutBody />
    </main>
  );
}
