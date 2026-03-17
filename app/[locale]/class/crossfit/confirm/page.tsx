import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ClassConfirmPage() {
  const t = await getTranslations('crossfit.confirm');
  const tc = await getTranslations('common');

  return (
    <main className="bg-[#fbfbfb]">

      <PageHero title={t('heroTitle')} titlePart2={t('heroTitlePart2')} imageSrc="/bg-form-des.jpg" />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-[72px] lg:py-20">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="font-body text-[32px] leading-tight text-nexo-dark">
            {t('title')}
          </p>
          <p className="max-w-sm font-body text-base leading-5 text-nexo-dark lg:max-w-xl">
            {t('message')}
          </p>
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
          >
            {tc('backHome')}
          </Link>
        </div>
      </div>
    </main>
  );
}
