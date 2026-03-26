import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("title"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy`,
      languages: {
        es: `${BASE_URL}/es/privacy`,
        en: `${BASE_URL}/en/privacy`,
        "x-default": `${BASE_URL}/es/privacy`,
      },
    },
  };
}

const dataCollectedKeys = ["0", "1", "2", "3", "4", "5"] as const;
const purposeKeys = ["0", "1", "2", "3"] as const;
const rightsKeys = ["0", "1", "2", "3", "4", "5"] as const;

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <main className="bg-[#fbfbfb]">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-nexo-dark lg:text-4xl">
          {t("title")}
        </h1>

        <div className="mt-8 flex flex-col gap-8 font-body text-base leading-7 text-nexo-dark">
          <p>{t("intro")}</p>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-nexo-dark">
              {t("responsibleTitle")}
            </h2>
            <p>{t("responsibleText")}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-nexo-dark">
              {t("dataCollectedTitle")}
            </h2>
            <p>{t("dataCollectedText")}</p>
            <ul className="list-disc space-y-1 pl-5">
              {dataCollectedKeys.map((key) => (
                <li key={key}>{t(`dataCollectedItems.${key}`)}</li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-nexo-dark">
              {t("purposeTitle")}
            </h2>
            <p>{t("purposeText")}</p>
            <ul className="list-disc space-y-1 pl-5">
              {purposeKeys.map((key) => (
                <li key={key}>{t(`purposeItems.${key}`)}</li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-nexo-dark">
              {t("legalBasisTitle")}
            </h2>
            <p>{t("legalBasisText")}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-nexo-dark">
              {t("retentionTitle")}
            </h2>
            <p>{t("retentionText")}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-nexo-dark">
              {t("rightsTitle")}
            </h2>
            <p>{t("rightsText")}</p>
            <ul className="list-disc space-y-1 pl-5">
              {rightsKeys.map((key) => (
                <li key={key}>{t(`rightsItems.${key}`)}</li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-nexo-dark">
              {t("securityTitle")}
            </h2>
            <p>{t("securityText")}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-nexo-dark">
              {t("cookiesTitle")}
            </h2>
            <p>{t("cookiesText")}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-nexo-dark">
              {t("changesTitle")}
            </h2>
            <p>{t("changesText")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
