export const revalidate = 60;

import { getBookableOnRampSessions } from "@/lib/queries";
import { getLocale } from "next-intl/server";
import OnRampBookingPage from "./OnRampBookingForm";

export default async function BookingPage() {
  const locale = await getLocale();
  const sessions = await getBookableOnRampSessions();
  const isEs = locale === "es";

  const fechasOnRamp = sessions.map((s) => ({
    value: s.slug,
    label: `${isEs ? s.monthEs : s.monthEn} (${isEs ? s.datesEs : s.datesEn})`,
  }));

  return <OnRampBookingPage fechasOnRamp={fechasOnRamp} />;
}
