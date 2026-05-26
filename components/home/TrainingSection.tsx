"use client";

import { useRef } from 'react';
import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';
import AnimateOnScroll from '../AnimateOnScroll';
import { useTranslations } from 'next-intl';

export interface TrainingCardType {
  title: string;
  bullets: string[];
  desktopDescription?: string;
  image: string;
  href?: string;
  verMasHref?: string;
  id: number;
}

export default function TrainingSection() {
  const t = useTranslations('home.training');
  const tc = useTranslations('common');

  const trainings: TrainingCardType[] = [
    {
      title: 'ON RAMP',
      bullets: [
        t('onramp.bullet0'),
        t('onramp.bullet1'),
        t('onramp.bullet2'),
      ],
      desktopDescription: t('onramp.desktopDescription'),
      image: '/onramp-img.jpg',
      href: '/on-ramp',
      verMasHref: '/on-ramp',
      id: 1,
    },
    {
      title: 'CROSSFIT',
      bullets: [
        t('crossfit.bullet0'),
        t('crossfit.bullet1'),
        t('crossfit.bullet2'),
      ],
      desktopDescription: t('crossfit.desktopDescription'),
      image: "/crossfit-new.png",
      href: '/class/crossfit',
      id: 2,
    },
    {
      title: 'HYROX',
      bullets: [
        t('hyrox.bullet0'),
        t('hyrox.bullet1'),
      ],
      desktopDescription: t('hyrox.desktopDescription'),
      image: "/new-hyrox.jpg",
      href: '/class/hyrox',
      id: 3,
    },
  ];

  return (
    <section className="bg-[#fbfbfb] py-8 text-nexo-dark lg:py-16">
      <div className="mx-auto max-w-7xl px-8 lg:px-[72px]">
        <div className="mb-6 flex flex-col items-center gap-4 text-center lg:mb-10 lg:gap-6">
          <AnimateOnScroll from="fade">
            <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
              {t('badge')}
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll from="up" delay={100}>
            <h2 className="font-heading text-[24px] font-bold leading-[100%] tracking-[0.03em] text-nexo-orange uppercase lg:text-[36px] lg:tracking-[1.08px]">
              {t('title')}
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll from="up" delay={200}>
            <p className="font-body text-[14px] leading-5 text-nexo-dark lg:text-[16px] lg:max-w-260">
              {t('description')}
            </p>
          </AnimateOnScroll>
        </div>

        {/* Mobile: accordion cards */}
        <div className="flex flex-col gap-4 lg:hidden">
          {trainings.map((training, index) => (
            <TrainingCard key={index} training={training} />
          ))}
        </div>

        {/* Desktop: always-open cards */}
        <div className="hidden lg:flex lg:items-stretch lg:justify-between lg:gap-6">
          {trainings.map((training, index) => (
            <AnimateOnScroll key={index} from="up" delay={index * 120} className="flex flex-1">
              <TrainingCardDesktop training={training} />
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll from="up" delay={200} className="mt-6 lg:mt-8 lg:flex lg:justify-center">
          <Link
            href="/plans"
            className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange py-2 font-body text-sm text-white transition-opacity hover:opacity-90 lg:w-[261px]"
          >
            {tc('checkPrices')}
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

export function TrainingCard({
  training,
  groupName = "training-accordion",
  testClass = false,
}: {
  training: TrainingCardType;
  groupName?: string;
  testClass?: boolean;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const tc = useTranslations('common');

  function handleToggle(e: React.SyntheticEvent<HTMLDetailsElement>) {
    if (e.currentTarget.open) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }

  return (
    <details
      ref={ref}
      name={groupName}
      onToggle={handleToggle}
      style={{ scrollMarginTop: '100px' }}
      className="group open:rounded-2xl open:border open:border-nexo-dark open:bg-[#fbfbfb]"
    >
      {/* SUMMARY (solo mobile) */}
      <summary className="list-none cursor-pointer select-none">

        {/* Estado cerrado: imagen oscura con título encima */}
        <div className="group-open:hidden relative h-[112px] w-full overflow-hidden rounded-2xl">
          <OptimizedImage
            src={training.image}
            alt={training.title}
            className={`h-full w-full object-cover object-[center_37%] ${training.id === 1 ? 'object-[center_37%]' : training.id === 2 ? 'object-[center_60%]' : 'object-[center_40%]'}`}
            sizes="100vw"
            width={600}
            height={112}
          />
          <div className="absolute inset-0 bg-nexo-dark/60" />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <h3 className="font-body text-[28px] font-normal leading-none text-white uppercase">
              {training.title}
            </h3>
            <svg
              className="h-6 w-6 shrink-0 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Estado abierto (en summary): imagen → título + chevron arriba */}
        <div className="hidden group-open:flex flex-col gap-4 px-4 pt-6">
          <div className="relative h-[131px] w-full overflow-hidden rounded-lg">
            <OptimizedImage
              src={training.image}
              alt={training.title}
              className={`h-full w-full object-cover object-[center_37%] ${training.id === 1 ? 'object-[center_37%]' : training.id === 2 ? 'object-[center_60%]' : 'object-[center_40%]'}`}
              width={600}
              height={131}
            />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-body text-[36px] font-normal leading-none text-nexo-dark uppercase">
              {training.title}
            </h3>
            <svg
              className="h-6 w-6 shrink-0 text-nexo-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </div>
      </summary>

      {/* CONTENIDO */}
      <div className="hidden group-open:flex flex-col gap-4 px-4 pt-4 pb-6">
        {/* Bullets */}
        <ul className="list-disc space-y-1 pl-5 font-body text-sm leading-5 text-black">
          {training.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={training.href ?? "/class"}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
        >
          {testClass ? tc('bookClass') : tc('viewMore')}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </details>
  );
}

export function TrainingCardDesktop({ training }: { training: TrainingCardType }) {
  return (
    <a href={training.href ?? "/class"}>
      <div className="flex flex-1 flex-col gap-4 overflow-hidden rounded-2xl border border-nexo-dark bg-[#fbfbfb] px-4 py-6 transition-all duration-200 hover:shadow-lg hover:border-nexo-orange/80 h-full">
        {/* Imagen */}
        <div className="relative h-[131px] w-full overflow-hidden rounded-lg">
          <OptimizedImage
            src={training.image}
            alt={training.title}
            className={`h-full w-full object-cover object-[center_37%] ${training.id === 1 ? 'object-[center_37%]' : training.id === 2 ? 'object-[center_65%]' : 'object-[center_40%]'}`}
            sizes="33vw"
            width={600}
            height={131}
          />
        </div>

        {/* Título + Ver más */}
        <div className="flex items-center justify-between">
          <h3 className="font-body text-[36px] font-normal leading-none text-nexo-dark uppercase">
            {training.title}
          </h3>
        </div>

        {/* Descripción */}
        {training.desktopDescription ? (
          <p className="font-body text-sm leading-5 text-black whitespace-pre-line">
            {training.desktopDescription}
          </p>
        ) : (
          <ul className="list-disc space-y-1 pl-5 font-body text-sm leading-5 text-black">
            {training.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </a>
  );
}
