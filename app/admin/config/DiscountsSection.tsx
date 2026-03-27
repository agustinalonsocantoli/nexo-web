"use client";

import { useState } from "react";
import { upsertDiscount, deleteDiscount } from "../actions";
import type { Discount } from "@/generated/prisma/client";
import Modal from "./Modal";

const inputClass =
  "w-full rounded-lg border border-white/[0.06] bg-[#262626] px-3 py-2 font-body text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-[#E94F1D]";
const labelClass = "mb-1 block font-body text-xs text-[#99A1AF]";

export default function DiscountsSection({ discounts }: { discounts: Discount[] }) {
  const [editing, setEditing] = useState<Discount | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <span className="font-body text-xs text-[#99A1AF]">{discounts.length} descuentos</span>
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-[#E94F1D] px-4 py-2 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Agregar descuento
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {discounts.map((d) => (
          <div
            key={d.id}
            className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-[#1E1E1E] p-5 transition-colors hover:border-white/[0.1]"
            onClick={() => setEditing(d)}
          >
            <p className="font-heading text-2xl font-bold leading-none text-[#E94F1D]">{d.percentage}</p>

            <div className="mt-3 flex flex-col gap-1.5">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#99A1AF]">ES</span>
                <p className="font-body text-sm font-semibold text-white">{d.labelEs}</p>
                {d.subtitleEs && <p className="font-body text-xs text-white/40">{d.subtitleEs}</p>}
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#99A1AF]">EN</span>
                <p className="font-body text-sm font-semibold text-white">{d.labelEn}</p>
                {d.subtitleEn && <p className="font-body text-xs text-white/40">{d.subtitleEn}</p>}
              </div>
            </div>
            <div className="mt-4 flex items-center border-t border-white/[0.04] pt-3">
              <span className="font-body text-[10px] uppercase tracking-wider text-white/20">#{d.sortOrder}</span>
              <span className="flex-1" />
              <button
                onClick={(e) => { e.stopPropagation(); setEditing(d); }}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#99A1AF] transition-colors hover:bg-white/[0.05] hover:text-white"
                title="Editar"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); if (confirm("¿Eliminar?")) deleteDiscount(d.id); }}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#99A1AF] transition-colors hover:bg-red-400/10 hover:text-red-400"
                title="Eliminar"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={adding} onClose={() => setAdding(false)} title="Agregar descuento">
        <DiscountForm onDone={() => setAdding(false)} />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Editar descuento">
        {editing && <DiscountForm discount={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  );
}

function DiscountForm({ discount, onDone }: { discount?: Discount; onDone: () => void }) {
  return (
    <form
      action={async (formData) => {
        await upsertDiscount(formData);
        onDone();
      }}
      className="flex flex-col gap-4"
    >
      {discount && <input type="hidden" name="id" value={discount.id} />}
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Key</label><input name="key" defaultValue={discount?.key} required placeholder="quarterly" className={inputClass} /></div>
        <div><label className={labelClass}>Porcentaje</label><input name="percentage" defaultValue={discount?.percentage} required placeholder="-10%" className={inputClass} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Label ES</label><input name="labelEs" defaultValue={discount?.labelEs} required className={inputClass} /></div>
        <div><label className={labelClass}>Label EN</label><input name="labelEn" defaultValue={discount?.labelEn} required className={inputClass} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Subtitle ES</label><input name="subtitleEs" defaultValue={discount?.subtitleEs ?? ""} className={inputClass} /></div>
        <div><label className={labelClass}>Subtitle EN</label><input name="subtitleEn" defaultValue={discount?.subtitleEn ?? ""} className={inputClass} /></div>
      </div>
      <div className="w-1/2">
        <label className={labelClass}>Orden</label><input name="sortOrder" type="number" defaultValue={discount?.sortOrder?.toString() ?? "0"} className={inputClass} />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 rounded-lg bg-[#E94F1D] py-2.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90">Guardar</button>
        <button type="button" onClick={onDone} className="rounded-lg border border-white/[0.06] px-5 py-2.5 font-body text-sm text-[#99A1AF] transition-colors hover:text-white">Cancelar</button>
      </div>
    </form>
  );
}
