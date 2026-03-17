import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/contact`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        es: `${BASE_URL}/es/contact`,
        en: `${BASE_URL}/en/contact`,
        "x-default": `${BASE_URL}/es/contact`,
      },
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
