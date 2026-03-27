import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { getActiveOnRampSessions } from "@/lib/queries";
import { getLocale, getTranslations } from "next-intl/server";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PersonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 shrink-0 text-[#1e1e1e]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);

const ChevronLeft = () => (
  <svg
    className="h-8 w-8 text-nexo-dark"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRight = () => (
  <svg
    className="h-8 w-8 text-nexo-dark"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    />
  </svg>
);

function SessionCard({
  slug,
  month,
  dates,
  spots,
  spotsLabel,
  bookText,
  className = "",
}: {
  slug: string;
  month: string;
  dates: string;
  spots: number;
  spotsLabel: string;
  bookText: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-nexo-orange bg-white px-5 py-4 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] flex flex-col items-center gap-3 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${className}`}
    >
      <p className="font-heading text-[28px] font-bold leading-[100%] text-[#262626] text-center">
        {month}
      </p>
      <p className="font-body text-base leading-5 text-[#262626] text-center">
        {dates}
      </p>
      <div className="flex items-center gap-1.5 justify-center">
        <PersonIcon />
        <p className="font-body text-base leading-5 text-[#1e1e1e] text-center">
          {spotsLabel}
        </p>
      </div>
      <Link
        href={`/on-ramp/booking?fecha=${slug}`}
        className="mt-1 flex w-full items-center justify-center gap-3 rounded-lg bg-nexo-orange px-8 py-2 font-body text-sm text-white transition-opacity hover:opacity-90"
      >
        {bookText}
        <ArrowIcon />
      </Link>
    </div>
  );
}

export default async function SessionsSection() {
  const [sessions, locale, t, tc] = await Promise.all([
    getActiveOnRampSessions(),
    getLocale(),
    getTranslations("onramp"),
    getTranslations("common"),
  ]);
  const isEs = locale === "es";

  return (
    <>
      {/* Mobile: CSS-only carousel */}
      <div className="sessions-carousel md:hidden">
        {sessions.map((_, i) => (
          <input
            key={i}
            type="radio"
            name="sessions"
            id={`ses-${i + 1}`}
            className="carousel-radio"
            defaultChecked={i === 0}
          />
        ))}

        <div
          className="sessions-carousel-wrapper"
          style={{ width: `${sessions.length * 100}%` }}
        >
          {sessions.map((s) => (
            <div
              key={s.id}
              className="sessions-carousel-slide"
              style={{ width: `${100 / sessions.length}%` }}
            >
              <SessionCard
                slug={s.slug}
                month={isEs ? s.monthEs : s.monthEn}
                dates={isEs ? s.datesEs : s.datesEn}
                spots={s.spots}
                spotsLabel={t("spotsAvailable", { spots: s.spots })}
                bookText={tc("bookSpot")}
                className="w-[270px]"
              />
            </div>
          ))}
        </div>

        {sessions.map((_, i) => (
          <span key={`nav-${i}`}>
            {i > 0 && (
              <label
                htmlFor={`ses-${i}`}
                className={`sessions-nav sessions-nav-prev sessions-prev-${i + 1}`}
              >
                <ChevronLeft />
              </label>
            )}
            {i < sessions.length - 1 && (
              <label
                htmlFor={`ses-${i + 2}`}
                className={`sessions-nav sessions-nav-next sessions-next-${i + 1}`}
              >
                <ChevronRight />
              </label>
            )}
          </span>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 gap-4 lg:grid-cols-2">
        {sessions.map((s, i) => (
          <AnimateOnScroll key={s.id} from="up" delay={i * 100}>
            <SessionCard
              slug={s.slug}
              month={isEs ? s.monthEs : s.monthEn}
              dates={isEs ? s.datesEs : s.datesEn}
              spots={s.spots}
              spotsLabel={t("spotsAvailable", { spots: s.spots })}
              bookText={tc("bookSpot")}
            />
          </AnimateOnScroll>
        ))}
      </div>
    </>
  );
}
