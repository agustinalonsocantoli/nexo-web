"use client";

import { useState } from "react";
import { upsertScheduleSlot, deleteScheduleSlot } from "../actions";
import type { ScheduleSlot } from "@/generated/prisma/client";
import Modal from "./Modal";

const DAYS = ["L", "M", "X", "J", "V", "S"] as const;
const CLASS_TYPES = ["crossfit", "hyrox", "strength", "wlgym"] as const;

const typeStyles: Record<string, { bg: string; text: string; dot: string }> = {
  crossfit: { bg: "bg-[#ff731c]/15", text: "text-[#ff731c]", dot: "bg-[#ff731c]" },
  hyrox: { bg: "bg-[#ffbe96]/15", text: "text-[#ffbe96]", dot: "bg-[#ffbe96]" },
  strength: { bg: "bg-[#903700]/20", text: "text-[#c47a3f]", dot: "bg-[#903700]" },
  wlgym: { bg: "bg-white/[0.08]", text: "text-white/60", dot: "bg-white/40" },
};

const inputClass =
  "w-full rounded-lg border border-white/[0.06] bg-[#262626] px-3 py-2 font-body text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-[#E94F1D]";
const labelClass = "mb-1 block font-body text-xs text-[#99A1AF]";

export default function ScheduleSection({ slots }: { slots: ScheduleSlot[] }) {
  const [editing, setEditing] = useState<ScheduleSlot | null>(null);
  const [adding, setAdding] = useState(false);

  // Build rows with sub-rows for multi-slot cells
  const gridRows = (() => {
    const timeOrder: string[] = [];
    const grid = new Map<string, Map<string, ScheduleSlot[]>>();

    for (const slot of slots) {
      if (!grid.has(slot.time)) {
        timeOrder.push(slot.time);
        grid.set(slot.time, new Map());
      }
      const dayMap = grid.get(slot.time)!;
      const existing = dayMap.get(slot.dayOfWeek) ?? [];
      existing.push(slot);
      dayMap.set(slot.dayOfWeek, existing);
    }

    const rows: { time: string; days: Record<string, ScheduleSlot | null> }[] = [];
    for (const time of timeOrder) {
      const dayMap = grid.get(time)!;
      let maxLayers = 1;
      for (const day of DAYS) {
        const cells = dayMap.get(day);
        if (cells && cells.length > maxLayers) maxLayers = cells.length;
      }
      for (let layer = 0; layer < maxLayers; layer++) {
        const row: Record<string, ScheduleSlot | null> = {};
        for (const day of DAYS) {
          const cells = dayMap.get(day);
          row[day] = cells?.[layer] ?? null;
        }
        rows.push({ time: layer === 0 ? time : "", days: row });
      }
    }
    return rows;
  })();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-[#99A1AF]">{slots.length} clases</span>
          <span className="font-body text-[10px] text-white/20">Click en una clase para editarla</span>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-[#E94F1D] px-4 py-2 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Agregar horario
        </button>
      </div>

      {/* Interactive grid */}
      <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] bg-[#1E1E1E]">
              <th className="w-16 px-4 py-3 text-left font-body text-[10px] font-semibold uppercase tracking-wider text-[#99A1AF]">Hora</th>
              {DAYS.map((d) => (
                <th key={d} className="px-2 py-3 text-center font-body text-[10px] font-semibold uppercase tracking-wider text-[#99A1AF]">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gridRows.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.03]">
                <td className="px-4 py-2 font-mono text-xs text-white/60">{row.time}</td>
                {DAYS.map((day) => {
                  const slot = row.days[day];
                  const style = slot ? typeStyles[slot.classType] : null;
                  return (
                    <td key={day} className="px-1 py-1 text-center">
                      {slot && style ? (
                        <button
                          onClick={() => setEditing(slot)}
                          className={`w-full rounded-md px-1 py-1.5 text-[10px] font-semibold transition-all hover:ring-1 hover:ring-[#E94F1D]/40 ${style.bg} ${style.text}`}
                        >
                          {slot.className}
                        </button>
                      ) : (
                        <span className="block h-8" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4">
        {CLASS_TYPES.map((t) => {
          const s = typeStyles[t];
          return (
            <div key={t} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${s.dot}`} />
              <span className="font-body text-xs text-[#99A1AF]">{t}</span>
            </div>
          );
        })}
      </div>

      {/* Create modal */}
      <Modal open={adding} onClose={() => setAdding(false)} title="Agregar horario">
        <SlotForm onDone={() => setAdding(false)} />
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Editar horario">
        {editing && <SlotForm slot={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  );
}

function SlotForm({ slot, onDone }: { slot?: ScheduleSlot; onDone: () => void }) {
  return (
    <form
      action={async (formData) => {
        await upsertScheduleSlot(formData);
        onDone();
      }}
      className="flex flex-col gap-4"
    >
      {slot && <input type="hidden" name="id" value={slot.id} />}
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Hora</label><input name="time" defaultValue={slot?.time} required placeholder="7:00" className={inputClass} /></div>
        <div>
          <label className={labelClass}>Día</label>
          <select name="dayOfWeek" defaultValue={slot?.dayOfWeek ?? "L"} className={inputClass}>
            {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Nombre clase</label><input name="className" defaultValue={slot?.className} required placeholder="CROSSFIT" className={inputClass} /></div>
        <div>
          <label className={labelClass}>Tipo</label>
          <select name="classType" defaultValue={slot?.classType ?? "crossfit"} className={inputClass}>
            {CLASS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 rounded-lg bg-[#E94F1D] py-2.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90">Guardar</button>
        {slot && (
          <button
            type="button"
            onClick={() => { if (confirm("¿Eliminar este horario?")) { deleteScheduleSlot(slot.id); onDone(); } }}
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
