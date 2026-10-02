import { getBookableOnRampSessions } from "@/lib/queries";
import { getLocale } from "next-intl/server";
import CrossfitForm from "./CrossfitForm";

export default async function CrossfitPage() {
  const locale = await getLocale();
  const sessions = await getBookableOnRampSessions();
  const isEs = locale === "es";

  const fechasOnRamp = sessions.map((s) => ({
    value: s.slug,
    label: `${isEs ? s.monthEs : s.monthEn} (${isEs ? s.datesEs : s.datesEn})`,
  }));

  return <CrossfitForm fechasOnRamp={fechasOnRamp} />;
}
