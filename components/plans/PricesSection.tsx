import AnimateOnScroll from "@/components/AnimateOnScroll";
import { getPrices } from "@/lib/queries";
import { getLocale, getTranslations } from "next-intl/server";

export default async function PricesSection() {
  const [prices, locale, t] = await Promise.all([
    getPrices(),
    getLocale(),
    getTranslations("plans"),
  ]);
  const isEs = locale === "es";

  return (
    <AnimateOnScroll>
      <section className="flex flex-col items-center gap-4">
        <span className="rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
          {t("ratesBadge")}
        </span>

        <div className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-3">
          {prices.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-base text-white">
                    {isEs ? p.labelEs : p.labelEn}
                  </p>
                  {(isEs ? p.subtitleEs : p.subtitleEn) && (
                    <p className="font-body text-[11px] text-white/70">
                      {isEs ? p.subtitleEs : p.subtitleEn}
                    </p>
                  )}
                </div>
                <p className="shrink-0 font-heading text-[28px] font-bold leading-none text-white">
                  {p.amount} &euro;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AnimateOnScroll>
  );
}
