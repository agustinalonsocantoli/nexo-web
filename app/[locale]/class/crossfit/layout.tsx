import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.crossfit" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/class/crossfit`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/class/crossfit`,
      languages: {
        es: `${BASE_URL}/es/class/crossfit`,
        en: `${BASE_URL}/en/class/crossfit`,
        "x-default": `${BASE_URL}/es/class/crossfit`,
      },
    },
  };
}

export default function CrossfitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
