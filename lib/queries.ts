import { prisma } from "@/lib/prisma";

export async function getPrices() {
  return prisma.price.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getDiscounts() {
  return prisma.discount.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getScheduleSlots() {
  const slots = await prisma.scheduleSlot.findMany();
  return slots.sort((a, b) => {
    const [ah, am] = a.time.split(":").map(Number);
    const [bh, bm] = b.time.split(":").map(Number);
    return ah * 60 + am - (bh * 60 + bm);
  });
}

export async function getActiveOnRampSessions() {
  return prisma.onRampSession.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
}
