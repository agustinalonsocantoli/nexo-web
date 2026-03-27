"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

// ── PRICES ──

export async function upsertPrice(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string | null;
  const data = {
    key: formData.get("key") as string,
    amount: parseFloat(formData.get("amount") as string),
    labelEs: formData.get("labelEs") as string,
    labelEn: formData.get("labelEn") as string,
    subtitleEs: (formData.get("subtitleEs") as string) || null,
    subtitleEn: (formData.get("subtitleEn") as string) || null,
    sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
  };

  if (id) {
    await prisma.price.update({ where: { id }, data });
  } else {
    await prisma.price.create({ data });
  }
  revalidatePath("/admin/config");
  revalidatePath("/[locale]/plans");
}

export async function deletePrice(id: string) {
  await requireAuth();
  await prisma.price.delete({ where: { id } });
  revalidatePath("/admin/config");
  revalidatePath("/[locale]/plans");
}

// ── DISCOUNTS ──

export async function upsertDiscount(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string | null;
  const data = {
    key: formData.get("key") as string,
    percentage: formData.get("percentage") as string,
    labelEs: formData.get("labelEs") as string,
    labelEn: formData.get("labelEn") as string,
    subtitleEs: (formData.get("subtitleEs") as string) || null,
    subtitleEn: (formData.get("subtitleEn") as string) || null,
    sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
  };

  if (id) {
    await prisma.discount.update({ where: { id }, data });
  } else {
    await prisma.discount.create({ data });
  }
  revalidatePath("/admin/config");
  revalidatePath("/[locale]/plans");
}

export async function deleteDiscount(id: string) {
  await requireAuth();
  await prisma.discount.delete({ where: { id } });
  revalidatePath("/admin/config");
  revalidatePath("/[locale]/plans");
}

// ── SCHEDULE ──

export async function upsertScheduleSlot(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string | null;
  const data = {
    time: formData.get("time") as string,
    dayOfWeek: formData.get("dayOfWeek") as string,
    className: formData.get("className") as string,
    classType: formData.get("classType") as string,
  };

  if (id) {
    await prisma.scheduleSlot.update({ where: { id }, data });
  } else {
    await prisma.scheduleSlot.create({ data });
  }
  revalidatePath("/admin/config");
  revalidatePath("/[locale]/plans");
}

export async function deleteScheduleSlot(id: string) {
  await requireAuth();
  await prisma.scheduleSlot.delete({ where: { id } });
  revalidatePath("/admin/config");
  revalidatePath("/[locale]/plans");
}

// ── ON-RAMP SESSIONS ──

export async function upsertOnRampSession(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string | null;
  const data = {
    slug: formData.get("slug") as string,
    monthEs: formData.get("monthEs") as string,
    monthEn: formData.get("monthEn") as string,
    datesEs: formData.get("datesEs") as string,
    datesEn: formData.get("datesEn") as string,
    spots: parseInt(formData.get("spots") as string),
    active: formData.get("active") === "on",
  };

  if (id) {
    await prisma.onRampSession.update({ where: { id }, data });
  } else {
    await prisma.onRampSession.create({ data });
  }
  revalidatePath("/admin/config");
  revalidatePath("/[locale]/on-ramp");
  revalidatePath("/[locale]/class/crossfit");
}

export async function deleteOnRampSession(id: string) {
  await requireAuth();
  await prisma.onRampSession.delete({ where: { id } });
  revalidatePath("/admin/config");
  revalidatePath("/[locale]/on-ramp");
  revalidatePath("/[locale]/class/crossfit");
}
