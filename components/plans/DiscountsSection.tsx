import AnimateOnScroll from "@/components/AnimateOnScroll";
import { getDiscounts } from "@/lib/queries";
import { getLocale, getTranslations } from "next-intl/server";

export default async function DiscountsSection() {
  const [discounts, locale, t] = await Promise.all([
    getDiscounts(),
    getLocale(),
    getTranslations("plans"),
  ]);
  const isEs = locale === "es";

  return (
    <AnimateOnScroll delay={100}>
      <section className="flex flex-col items-center gap-4">
        <span className="rounded-full border-[1.5px] border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
          {t("discountsBadge")}
        </span>

        <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
          {discounts.map((d) => (
            <div
              key={d.id}
              className="rounded-lg border border-nexo-orange p-2 shadow-md lg:p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                {isEs ? d.labelEs : d.labelEn}
              </p>
              <p className="font-heading text-2xl font-bold leading-none text-[#262626] lg:text-3xl">
                {d.percentage}
              </p>
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
  );
}
