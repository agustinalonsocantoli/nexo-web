"use client";

import { useState } from "react";
import { upsertPrice, deletePrice } from "../actions";
import type { Price } from "@prisma/client";
import Modal from "./Modal";

const inputClass =
  "w-full rounded-lg border border-white/[0.06] bg-[#262626] px-3 py-2 font-body text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-[#E94F1D]";
const labelClass = "mb-1 block font-body text-xs text-[#99A1AF]";

export default function PricesSection({ prices }: { prices: Price[] }) {
  const [editing, setEditing] = useState<Price | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-[#99A1AF]">{prices.length} tarifas</span>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-[#E94F1D] px-4 py-2 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Agregar precio
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-[#1E1E1E]">
              <th className="py-3 pl-4 pr-2 text-left font-body text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">Precio</th>
              <th className="px-2 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">Detalle</th>
              <th className="px-2 py-3 text-right font-body text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((p) => (
              <tr key={p.id} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                <td className="py-3 pl-4 pr-2">
                  <span className="font-heading text-base font-bold text-white">{p.amount} €</span>
                  <span className="ml-2 font-mono text-[10px] text-white/20">{p.key}</span>
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-col gap-1.5">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#99A1AF]">ES</span>
                      <p className="font-body text-sm font-semibold text-white">{p.labelEs}</p>
                      {p.subtitleEs && <p className="font-body text-xs text-white/40">{p.subtitleEs}</p>}
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#99A1AF]">EN</span>
                      <p className="font-body text-sm font-semibold text-white">{p.labelEn}</p>
                      {p.subtitleEn && <p className="font-body text-xs text-white/40">{p.subtitleEn}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setEditing(p)} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#99A1AF] transition-colors hover:bg-white/[0.05] hover:text-white" title="Editar">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>
                    <button onClick={() => { if (confirm("¿Eliminar este precio?")) deletePrice(p.id); }} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#99A1AF] transition-colors hover:bg-red-400/10 hover:text-red-400" title="Eliminar">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create modal */}
      <Modal open={adding} onClose={() => setAdding(false)} title="Agregar precio">
        <PriceForm onDone={() => setAdding(false)} />
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Editar precio">
        {editing && <PriceForm price={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  );
}

function PriceForm({ price, onDone }: { price?: Price; onDone: () => void }) {
  return (
    <form
      action={async (formData) => {
        await upsertPrice(formData);
        onDone();
      }}
      className="flex flex-col gap-4"
    >
      {price && <input type="hidden" name="id" value={price.id} />}
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Key</label><input name="key" defaultValue={price?.key} required placeholder="monthly" className={inputClass} /></div>
        <div><label className={labelClass}>Precio (€)</label><input name="amount" type="number" step="0.01" defaultValue={price?.amount?.toString()} required className={inputClass} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Label ES</label><input name="labelEs" defaultValue={price?.labelEs} required className={inputClass} /></div>
        <div><label className={labelClass}>Label EN</label><input name="labelEn" defaultValue={price?.labelEn} required className={inputClass} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Subtitle ES</label><input name="subtitleEs" defaultValue={price?.subtitleEs ?? ""} className={inputClass} /></div>
        <div><label className={labelClass}>Subtitle EN</label><input name="subtitleEn" defaultValue={price?.subtitleEn ?? ""} className={inputClass} /></div>
      </div>
      <div className="w-1/2">
        <label className={labelClass}>Orden</label><input name="sortOrder" type="number" defaultValue={price?.sortOrder?.toString() ?? "0"} className={inputClass} />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 rounded-lg bg-[#E94F1D] py-2.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90">Guardar</button>
        <button type="button" onClick={onDone} className="rounded-lg border border-white/[0.06] px-5 py-2.5 font-body text-sm text-[#99A1AF] transition-colors hover:text-white">Cancelar</button>
      </div>
    </form>
  );
}
