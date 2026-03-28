"use client";

import { useState } from "react";
import { upsertOnRampSession, deleteOnRampSession } from "../actions";
import type { OnRampSession } from "@prisma/client";
import Modal from "./Modal";

const inputClass =
  "w-full rounded-lg border border-white/[0.06] bg-[#262626] px-3 py-2 font-body text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-[#E94F1D]";
const labelClass = "mb-1 block font-body text-xs text-[#99A1AF]";

export default function OnRampSection({ sessions }: { sessions: OnRampSession[] }) {
  const [editing, setEditing] = useState<OnRampSession | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <span className="font-body text-xs text-[#99A1AF]">{sessions.length} sesiones</span>
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-[#E94F1D] px-4 py-2 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Agregar sesión
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.map((s) => (
          <div
            key={s.id}
            onClick={() => setEditing(s)}
            className={`group cursor-pointer rounded-2xl border bg-[#1E1E1E] p-5 transition-colors ${s.active ? "border-[#E94F1D]/20 hover:border-[#E94F1D]/40" : "border-white/[0.06] opacity-60 hover:opacity-80"}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading text-xl font-bold leading-none text-white">{s.monthEs}</p>
                <p className="mt-1 font-body text-xs text-white/40">{s.monthEn}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.active ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                {s.active ? "Activa" : "Inactiva"}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-[#99A1AF]">Fechas</span>
                <span className="font-body text-sm text-white/80">{s.datesEs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-[#99A1AF]">Plazas</span>
                <span className="font-heading text-lg font-bold text-[#E94F1D]">{s.spots}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-[#99A1AF]">Orden</span>
                <span className="font-heading text-sm font-bold text-white/60">{s.sortOrder}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-[#99A1AF]">Slug</span>
                <span className="font-mono text-xs text-white/40">{s.slug}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center border-t border-white/[0.04] pt-3">
              <span className="flex-1" />
              <button
                onClick={(e) => { e.stopPropagation(); setEditing(s); }}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#99A1AF] transition-colors hover:bg-white/[0.05] hover:text-white"
                title="Editar"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); if (confirm("¿Eliminar sesión?")) deleteOnRampSession(s.id); }}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#99A1AF] transition-colors hover:bg-red-400/10 hover:text-red-400"
                title="Eliminar"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={adding} onClose={() => setAdding(false)} title="Agregar sesión">
        <SessionForm onDone={() => setAdding(false)} />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Editar sesión">
        {editing && <SessionForm session={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  );
}

function SessionForm({ session, onDone }: { session?: OnRampSession; onDone: () => void }) {
  return (
    <form
      action={async (formData) => {
        await upsertOnRampSession(formData);
        onDone();
      }}
      className="flex flex-col gap-4"
    >
      {session && <input type="hidden" name="id" value={session.id} />}
      <div>
        <label className={labelClass}>Slug</label>
        <input name="slug" defaultValue={session?.slug} required placeholder="abril-2026" className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Mes (ES)</label><input name="monthEs" defaultValue={session?.monthEs} required placeholder="Abril" className={inputClass} /></div>
        <div><label className={labelClass}>Mes (EN)</label><input name="monthEn" defaultValue={session?.monthEn} required placeholder="April" className={inputClass} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Fechas (ES)</label><input name="datesEs" defaultValue={session?.datesEs} required placeholder="30/03 - 22/04" className={inputClass} /></div>
        <div><label className={labelClass}>Fechas (EN)</label><input name="datesEn" defaultValue={session?.datesEn} required placeholder="03/30 - 04/22" className={inputClass} /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><label className={labelClass}>Plazas</label><input name="spots" type="number" defaultValue={session?.spots?.toString() ?? "8"} required className={inputClass} /></div>
        <div><label className={labelClass}>Orden</label><input name="sortOrder" type="number" defaultValue={session?.sortOrder?.toString() ?? "0"} required className={inputClass} /></div>
        <div className="flex items-end pb-0.5">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" name="active" defaultChecked={session?.active ?? true} className="sr-only peer" />
            <span className="relative h-[22px] w-[38px] rounded-full bg-white/10 transition-colors after:absolute after:left-[3px] after:top-[3px] after:h-4 after:w-4 after:rounded-full after:bg-white/40 after:transition-all peer-checked:bg-[#E94F1D] peer-checked:after:translate-x-[16px] peer-checked:after:bg-white" />
            <span className="font-body text-sm text-[#99A1AF]">Activa</span>
          </label>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 rounded-lg bg-[#E94F1D] py-2.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90">Guardar</button>
        {session && (
          <button
            type="button"
            onClick={() => { if (confirm("¿Eliminar sesión?")) { deleteOnRampSession(session.id); onDone(); } }}
            className="rounded-lg border border-red-400/20 px-5 py-2.5 font-body text-sm text-red-400 transition-colors hover:bg-red-400/10"
          >
            Eliminar
          </button>
        )}
        <button type="button" onClick={onDone} className="rounded-lg border border-white/[0.06] px-5 py-2.5 font-body text-sm text-[#99A1AF] transition-colors hover:text-white">Cancelar</button>
      </div>
    </form>
  );
}
