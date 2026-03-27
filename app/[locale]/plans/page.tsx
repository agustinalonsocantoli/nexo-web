import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { getPrices, getDiscounts, getScheduleSlots } from "@/lib/queries";

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

type ClassType = "crossfit" | "hyrox" | "strength" | "wlgym" | null;

interface ScheduleCell {
  name: string;
  type: ClassType;
}

function cellStyle(type: ClassType): string {
  switch (type) {
    case "hyrox":
      return "bg-[#ffbe96] text-[#1e1e1e]";
    case "crossfit":
      return "bg-[#ff731c] text-[#1e1e1e]";
    case "strength":
      return "bg-[#903700] text-white";
    case "wlgym":
      return "bg-[#262626] text-white";
    default:
      return "";
  }
}

function ScheduleCellComponent({ cell }: { cell: ScheduleCell | null }) {
  if (!cell)
    return <td className="h-7 border border-black bg-white lg:h-9" />;
  return (
    <td
      className={`h-7 border border-black px-1 text-center font-body text-[7px] font-semibold leading-tight lg:h-9 lg:px-2 lg:text-[11px] ${cellStyle(cell.type)}`}
    >
      {cell.name}
    </td>
  );
}

interface ScheduleRow {
  time: string;
  L: ScheduleCell | null;
  M: ScheduleCell | null;
  X: ScheduleCell | null;
  J: ScheduleCell | null;
  V: ScheduleCell | null;
  S: ScheduleCell | null;
}

// Build schedule grid — multiple classes at same time+day produce sub-rows with empty time
function buildScheduleGrid(slots: { time: string; dayOfWeek: string; className: string; classType: string }[]): ScheduleRow[] {
  const DAYS = ["L", "M", "X", "J", "V", "S"] as const;
  const timeOrder: string[] = [];
  const grid = new Map<string, Map<string, ScheduleCell[]>>();

  for (const slot of slots) {
    if (!grid.has(slot.time)) {
      timeOrder.push(slot.time);
      grid.set(slot.time, new Map());
    }
    const dayMap = grid.get(slot.time)!;
    const existing = dayMap.get(slot.dayOfWeek) ?? [];
    existing.push({ name: slot.className, type: slot.classType as ClassType });
    dayMap.set(slot.dayOfWeek, existing);
  }

  const rows: ScheduleRow[] = [];

  for (const time of timeOrder) {
    const dayMap = grid.get(time)!;
    // How many rows does this time slot need?
    let maxLayers = 1;
    for (const day of DAYS) {
      const cells = dayMap.get(day);
      if (cells && cells.length > maxLayers) maxLayers = cells.length;
    }

    for (let layer = 0; layer < maxLayers; layer++) {
      const row: ScheduleRow = {
        time: layer === 0 ? time : "",
        L: null, M: null, X: null, J: null, V: null, S: null,
      };
      for (const day of DAYS) {
        const cells = dayMap.get(day);
        if (cells && cells[layer]) {
          row[day] = cells[layer];
        }
      }
      rows.push(row);
    }
  }

  return rows;
}

export default async function PlansPage() {
  const locale = await getLocale();
  const t = await getTranslations('plans');
  const tc = await getTranslations('common');

  const [prices, discounts, scheduleSlots] = await Promise.all([
    getPrices(),
    getDiscounts(),
    getScheduleSlots(),
  ]);

  const scheduleData = buildScheduleGrid(scheduleSlots);

  const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
  const days = dayKeys.map((k) => t(`days.${k}`));

  const isEs = locale === "es";

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero
        title={t('heroTitle')}
        titlePart2={t('heroTitlePart2')}
        imageSrc="/hero-sn-desktop.jpg"
        imageClass="object-[center_60%] md:object-[center_50%] lg:object-[center_35%]"
      />

      {/* Main content */}
      <div className="flex flex-col gap-8 px-8 py-8 lg:mx-auto lg:max-w-7xl lg:gap-12 lg:px-30 lg:py-16">

        {/* ── TARIFAS ── */}
        <AnimateOnScroll>
          <section className="flex flex-col items-center gap-4">
            <span className="rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
              {t('ratesBadge')}
            </span>

            <div className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-3">
              {prices.map((p) => (
                <div key={p.id} className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-base text-white">{isEs ? p.labelEs : p.labelEn}</p>
                      {(isEs ? p.subtitleEs : p.subtitleEn) && (
                        <p className="font-body text-[11px] text-white/70">
                          {isEs ? p.subtitleEs : p.subtitleEn}
                        </p>
                      )}
                    </div>
                    <p className="shrink-0 font-heading text-[28px] font-bold leading-none text-white">
                      {p.amount} €
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── DESCUENTOS ── */}
        <AnimateOnScroll delay={100}>
          <section className="flex flex-col items-center gap-4">
            <span className="rounded-full border-[1.5px] border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
              {t('discountsBadge')}
            </span>

            <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
              {discounts.map((d) => (
                <div key={d.id} className="rounded-lg border border-nexo-orange p-2 shadow-md lg:p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                  <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                    {isEs ? d.labelEs : d.labelEn}
                  </p>
                  <p className="font-heading text-2xl font-bold leading-none text-[#262626] lg:text-3xl">{d.percentage}</p>
                  {(isEs ? d.subtitleEs : d.subtitleEn) && (
                    <p className="mt-1 font-body text-[9px] text-[#878787]">
                      {isEs ? d.subtitleEs : d.subtitleEn}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── HORARIOS ── */}
        <AnimateOnScroll delay={100}>
          <section className="flex flex-col items-center gap-3">
            <span className="rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
              {t('scheduleBadge')}
            </span>

            <div className="w-full overflow-x-auto">
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <col key={i} style={{ width: '14.285%' }} />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    {/* Celda top-left: vacía, sin borde ni fondo */}
                    <th className="border-0 bg-transparent p-0" />
                    {days.map((day) => (
                      <th
                        key={day}
                        className="h-7 border border-black bg-[#757575] px-0.5 text-center font-body text-[5px] font-semibold text-white sm:text-[7px] lg:h-9 lg:px-3 lg:text-[11px]"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((row, i) => (
                    <tr key={i}>
                      <td className="h-7 whitespace-nowrap border border-black bg-[#757575] px-1 text-center font-body text-[7px] font-semibold text-white lg:h-9 lg:px-3 lg:text-[11px]">
                        {row.time}
                      </td>
                      <ScheduleCellComponent cell={row.L} />
                      <ScheduleCellComponent cell={row.M} />
                      <ScheduleCellComponent cell={row.X} />
                      <ScheduleCellComponent cell={row.J} />
                      <ScheduleCellComponent cell={row.V} />
                      <ScheduleCellComponent cell={row.S} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Leyenda */}
            <div className="flex w-full items-center gap-3 pt-1">
              <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-nexo-dark mb-0.5" />
              <p className="font-body text-[12px] text-nexo-dark">
                {t('legend')}
              </p>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── CTA ── */}
        <AnimateOnScroll delay={100}>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/class"
              className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90 lg:w-fit lg:self-center lg:px-12"
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
        </AnimateOnScroll>
      </div>
    </main>
  );
}
