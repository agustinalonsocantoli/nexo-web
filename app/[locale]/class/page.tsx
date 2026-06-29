import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import OptimizedImage from "@/components/OptimizedImage";
import PageHero from "@/components/PageHero";
import { TrainingCard, TrainingCardType } from "@/components/home/TrainingSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.class" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/class`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/class`,
      languages: {
        es: `${BASE_URL}/es/class`,
        en: `${BASE_URL}/en/class`,
        "x-default": `${BASE_URL}/es/class`,
      },
    },
  };
}

export default async function ClassPage() {
  const t = await getTranslations('class');
  const tc = await getTranslations('common');

  const classes: TrainingCardType[] = [
    {
      title: "CROSSFIT",
      bullets: [
        t('crossfitBullet'),
      ],
      image: "/crossfit-new.png",
      href: "/class/crossfit",
      id: 2,
    },
    {
      title: "HYROX",
      bullets: [
        t('hyroxBullet'),
      ],
      image: "/new-hyrox.jpg",
      href: "/class/hyrox",
      id: 3,
    },
  ];

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title={t('heroTitle')} titlePart2={t('heroTitlePart2')} imageSrc="/clase-prueba-bg.png" imageClass="object-[center_25%]" />

      {/* Contenido */}
      <div className="flex flex-col gap-4 px-6 py-6 lg:mx-auto lg:max-w-7xl lg:gap-10 lg:px-30 lg:py-16">

        {/* Título de sección — solo desktop */}
        <AnimateOnScroll>
          <h2 className="hidden font-heading text-[28px] font-bold uppercase leading-tight tracking-[0.03em] text-nexo-dark lg:block lg:text-[32px]">
            {t('sectionTitle')}
          </h2>
        </AnimateOnScroll>

        {/* Párrafo intro */}
        <AnimateOnScroll delay={100}>
          <p className="font-body text-sm leading-5 text-nexo-dark lg:text-base lg:leading-6">
            <span className="lg:hidden">
              {t('introMobile')}
            </span>
            <span className="hidden lg:inline">
              {t('introDesktop')}
            </span>
          </p>
        </AnimateOnScroll>

        {/* Mobile: accordion cards */}
        <div className="flex flex-col gap-4 lg:hidden">
          {classes.map((c) => (
            <TrainingCard key={c.title} training={c} testClass={true} />
          ))}
        </div>

        {/* Desktop: horizontal cards en grid 2 columnas */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
          {classes.map((c) => (
            <AnimateOnScroll key={c.title} delay={100}>
            <div
              className="flex overflow-hidden rounded-2xl border border-nexo-dark transition-all duration-200 hover:shadow-lg hover:scale-[1.01] h-full"
            >
              {/* Imagen izquierda */}
              <div className="relative w-[210px] shrink-0">
                <OptimizedImage
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover object-[center_37%]"
                  sizes="210px"
                  width={210}
                  height={220}
                />
              </div>

              {/* Contenido derecha */}
              <div className="flex flex-col gap-4 px-5 py-6 h-full">
                <h3 className="font-body text-[36px] font-normal leading-none text-nexo-dark uppercase">
                  {c.title}
                </h3>
                <ul className="list-disc space-y-1.5 pl-5 font-body text-sm leading-5 text-black">
                  {c.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                <Link
                  href={c.href ?? "/class"}
                  className="mt-auto flex w-fit items-center gap-3 rounded-lg bg-nexo-orange px-6 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
                >
                  {tc('bookClass')}
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
            </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </main>
  );
}
