"use client";

import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import PricesSection from "./PricesSection";
import DiscountsSection from "./DiscountsSection";
import ScheduleSection from "./ScheduleSection";
import OnRampSection from "./OnRampSection";
import type { Price, Discount, ScheduleSlot, OnRampSession } from "@prisma/client";

const TABS = [
  { id: "precios", label: "Precios" },
  { id: "descuentos", label: "Descuentos" },
  { id: "horarios", label: "Horarios" },
  { id: "onramp", label: "On Ramp" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ConfigDashboard({
  prices,
  discounts,
  schedule,
  onRampSessions,
}: {
  prices: Price[];
  discounts: Discount[];
  schedule: ScheduleSlot[];
  onRampSessions: OnRampSession[];
}) {
  const [activeTab, setActiveTab] = useState<TabId>("precios");

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-nexo.webp"
              alt="Nexo CrossFit"
              width={90}
              height={30}
              className="opacity-80"
            />
            <span className="rounded-full border border-[#E94F1D] px-2.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider text-[#E94F1D]">
              Admin
            </span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="font-body text-sm text-[#99A1AF] transition-colors hover:text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="font-heading text-[28px] font-bold uppercase leading-none tracking-wide text-white">
            Configuración
          </h1>
          <p className="mt-2 font-body text-sm text-[#99A1AF]">
            Gestiona precios, descuentos, horarios y sesiones On Ramp.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-white/[0.06]">
          <nav className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-3 font-body text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-[#99A1AF] hover:text-white/70"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E94F1D]" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        {activeTab === "precios" && <PricesSection prices={prices} />}
        {activeTab === "descuentos" && <DiscountsSection discounts={discounts} />}
        {activeTab === "horarios" && <ScheduleSection slots={schedule} />}
        {activeTab === "onramp" && <OnRampSection sessions={onRampSessions} />}
      </main>
    </div>
  );
}
