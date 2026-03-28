import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ConfigDashboard from "./ConfigDashboard";

export default async function ConfigPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const [prices, discounts, schedule, onRampSessions] = await Promise.all([
    prisma.price.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.discount.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.scheduleSlot.findMany(),
    prisma.onRampSession.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  // Sort schedule by time numerically
  schedule.sort((a, b) => {
    const [ah, am] = a.time.split(":").map(Number);
    const [bh, bm] = b.time.split(":").map(Number);
    return ah * 60 + am - (bh * 60 + bm);
  });

  return (
    <ConfigDashboard
      prices={prices}
      discounts={discounts}
      schedule={schedule}
      onRampSessions={onRampSessions}
    />
  );
}
