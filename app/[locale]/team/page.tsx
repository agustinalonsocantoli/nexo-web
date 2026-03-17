import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TeamBody from "@/components/team/TeamBody";
import TeamHero from "@/components/team/TeamHero";

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.team" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/team`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/team`,
      languages: {
        es: `${BASE_URL}/es/team`,
        en: `${BASE_URL}/en/team`,
        "x-default": `${BASE_URL}/es/team`,
      },
    },
  };
}

export default function Team() {
  return (
    <main>
      <TeamHero />
      <TeamBody />
    </main>
  );
}
