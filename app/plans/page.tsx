import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

export const metadata: Metadata = {
  title: "Tarifas y Horarios - Nexo CrossFit",
  description: "Encuentra la tarifa ideal para ti: cuota mensual, bonos, HYROX y más. Consulta también nuestros horarios de clases.",
};

type ClassType = "crossfit" | "hyrox" | "strength" | "wlgym" | null;

interface ScheduleCell {
  name: string;
  type: ClassType;
}

interface ScheduleRow {
  time: string;
  L: ScheduleCell | null;
  M: ScheduleCell | null;
  X: ScheduleCell | null;
  J: ScheduleCell | null;
  V: ScheduleCell | null;
  S: ScheduleCell | string | null;
}

const scheduleData: ScheduleRow[] = [
  {
    time: "7:00",
    L: { name: "HYROX", type: "hyrox" },
    M: null,
    X: { name: "HYROX", type: "hyrox" },
    J: null,
    V: null,
    S: null,
  },
  {
    time: "7:45",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "STRENGTH", type: "strength" },
    V: { name: "CROSSFIT", type: "crossfit" },
    S: null,
  },
  {
    time: "11:00",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "CROSSFIT", type: "crossfit" },
    V: { name: "CROSSFIT", type: "crossfit" },
    S: "9:30 / 10:30",
  },
  {
    time: "",
    L: null,
    M: null,
    X: null,
    J: { name: "WL/GYM", type: "wlgym" },
    V: null,
    S: null,
  },
  {
    time: "12:00",
    L: null,
    M: { name: "CROSSFIT", type: "crossfit" },
    X: null,
    J: { name: "STRENGTH", type: "strength" },
    V: null,
    S: null,
  },
  {
    time: "12:15",
    L: { name: "HYROX", type: "hyrox" },
    M: null,
    X: { name: "HYROX", type: "hyrox" },
    J: null,
    V: { name: "HYROX", type: "hyrox" },
    S: null,
  },
  {
    time: "13:00",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "CROSSFIT", type: "crossfit" },
    V: { name: "CROSSFIT", type: "crossfit" },
    S: null,
  },
  {
    time: "17:00",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: null,
    X: { name: "CROSSFIT", type: "crossfit" },
    J: null,
    V: { name: "CROSSFIT", type: "crossfit" },
    S: null,
  },
  {
    time: "17:30",
    L: null,
    M: { name: "CROSSFIT", type: "crossfit" },
    X: null,
    J: { name: "CROSSFIT", type: "crossfit" },
    V: null,
    S: null,
  },
  {
    time: "18:00",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "STRENGTH", type: "strength" },
    V: { name: "CROSSFIT", type: "crossfit" },
    S: null,
  },
  {
    time: "18:15",
    L: { name: "HYROX", type: "hyrox" },
    M: null,
    X: { name: "HYROX", type: "hyrox" },
    J: { name: "WL/GYM", type: "wlgym" },
    V: null,
    S: null,
  },
  {
    time: "18:30",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "CROSSFIT", type: "crossfit" },
    V: null,
    S: null,
  },
  {
    time: "19:00",
    L: null,
    M: { name: "HYROX", type: "hyrox" },
    X: null,
    J: { name: "HYROX", type: "hyrox" },
    V: { name: "CROSSFIT", type: "crossfit" },
    S: null,
  },
  {
    time: "19:15",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "STRENGTH", type: "strength" },
    V: null,
    S: null,
  },
  {
    time: "19:30",
    L: { name: "HYROX", type: "hyrox" },
    M: null,
    X: { name: "HYROX", type: "hyrox" },
    J: null,
    V: { name: "CROSSFIT", type: "crossfit" },
    S: null,
  },
  {
    time: "20:30",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "STRENGTH", type: "strength" },
    V: null,
    S: null,
  },
];

function cellStyle(type: ClassType): string {
  switch (type) {
    case "hyrox":
      return "bg-nexo-orange text-white";
    case "crossfit":
      return "bg-nexo-dark text-white";
    case "strength":
      return "bg-[#262626] text-white";
    case "wlgym":
      return "bg-[#3a3a3a] text-white";
    default:
      return "";
  }
}

function ScheduleCell({ cell }: { cell: ScheduleCell | null }) {
  if (!cell) return <td className="border border-gray-200 p-[3px]" />;
  return (
    <td className="border border-gray-200 p-[3px]">
      <div
        className={`rounded-[3px] px-[3px] py-[2px] text-center text-[7px] font-semibold leading-tight ${cellStyle(cell.type)}`}
      >
        {cell.name}
      </div>
    </td>
  );
}

export default function PlansPage() {
  return (
    <main className="bg-[#fbfbfb]">
      {/* Hero */}
      <section className="relative h-[50vh] pt-16 md:h-[60vh]">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/hero-plans.webp"
            alt="Tarifas y Horarios - Nexo CrossFit"
            className="h-full w-full object-cover opacity-60"
            priority={true}
            sizes="100vw"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-nexo-dark/40 to-nexo-dark" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 font-heading text-4xl font-bold leading-tight tracking-[0.03em] text-white uppercase md:text-6xl">
            Tarifas y Horarios
          </h1>
          <p className="max-w-lg font-body text-lg font-normal leading-relaxed text-white">
            Encuentra la tarifa ideal para ti.
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="flex flex-col gap-8 px-8 py-8">

        {/* ── TARIFAS ── */}
        <section className="flex flex-col items-center gap-4">
          <span className="rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
            TARIFAS
          </span>

          <div className="flex w-full flex-col gap-4">
            {/* Cuota mensual */}
            <div className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="font-body text-base text-white">CUOTA MENSUAL</p>
                <p className="font-heading text-[28px] font-bold leading-none text-white">110 €</p>
              </div>
              <p className="mt-1 font-body text-[11px] text-white/70">
                | ACCESO ILIMITADO A TODAS LAS ACTIVIDADES |
              </p>
            </div>

            {/* Hyrox */}
            <div className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="font-body text-base text-white">HYROX</p>
                <p className="font-heading text-[28px] font-bold leading-none text-white">75 €</p>
              </div>
              <p className="mt-1 font-body text-[11px] text-white/70">
                | ACCESO ILIMITADO A TODAS LAS CLASES DE HYROX |
              </p>
            </div>

            {/* Bono 20 clases */}
            <div className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-body text-[15px] font-semibold text-white">BONO DE 20 CLASES</p>
                  <p className="font-body text-[12px] text-white/70">| VÁLIDO PARA 2 MESES |</p>
                </div>
                <p className="font-heading text-[28px] font-bold leading-none text-white shrink-0">180 €</p>
              </div>
              <p className="mt-1 font-body text-[10px] text-white/60">
                Perfecto si tienes pensado venir{" "}
                <span className="font-semibold">2/3 veces por semana</span>.
              </p>
            </div>

            {/* Bono 10 clases */}
            <div className="flex items-center justify-between rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg">
              <div>
                <p className="font-body text-base text-white">BONO DE 10 CLASES</p>
                <p className="font-body text-[12px] text-white/70">| 3 MESES |</p>
              </div>
              <p className="font-heading text-[28px] font-bold leading-none text-white">120 €</p>
            </div>

            {/* On Ramp */}
            <div className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-base text-white">ON RAMP</p>
                  <p className="font-body text-[11px] text-white/70">| CURSO DE INICIACIÓN |</p>
                </div>
                <p className="font-heading text-[28px] font-bold leading-none text-white">165 €</p>
              </div>
            </div>

            {/* Drop In */}
            <div className="flex items-center justify-between rounded-2xl bg-nexo-dark px-6 py-4 shadow-lg">
              <p className="font-body text-base text-white">DROP IN</p>
              <p className="font-heading text-[28px] font-bold leading-none text-white">15 €</p>
            </div>
          </div>
        </section>

        {/* ── DESCUENTOS ── */}
        <section className="flex flex-col items-center gap-4">
          <span className="rounded-full border-[1.5px] border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
            DESCUENTOS
          </span>

          <div className="grid w-full grid-cols-2 gap-2">
            {/* Cuota trimestral */}
            <div className="rounded-lg border border-nexo-orange p-2 shadow-md">
              <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                CUOTA TRIMESTRAL
              </p>
              <p className="font-heading text-2xl font-bold leading-none text-[#262626]">10%</p>
              <p className="mt-1 font-body text-[9px] text-[#878787]">
                3 MESES ADELANTADO{" "}
                <span className="font-semibold">297 €</span>
              </p>
            </div>

            {/* Cuota semestral */}
            <div className="rounded-lg border border-nexo-orange p-2 shadow-md">
              <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                CUOTA SEMESTRAL
              </p>
              <p className="font-heading text-2xl font-bold leading-none text-[#262626]">15%</p>
              <p className="mt-1 font-body text-[9px] text-[#878787]">
                6 MESES ADELANTADO{" "}
                <span className="font-semibold">561 €</span>
              </p>
            </div>

            {/* Cuota anual */}
            <div className="rounded-lg border border-nexo-orange p-2 shadow-md">
              <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                CUOTA ANUAL
              </p>
              <p className="font-heading text-2xl font-bold leading-none text-[#262626]">20%</p>
              <p className="mt-1 font-body text-[9px] text-[#878787]">
                1 AÑO ADELANTADO{" "}
                <span className="font-semibold">1056 €</span>
              </p>
            </div>

            {/* Cuota mensual pareja */}
            <div className="rounded-lg border border-nexo-orange p-2 shadow-md">
              <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                CUOTA MENSUAL
              </p>
              <p className="font-heading text-2xl font-bold leading-none text-[#262626]">10%</p>
              <p className="mt-1 font-body text-[9px] font-semibold uppercase text-[#878787]">
                Parejas o Familias
              </p>
            </div>
          </div>
        </section>

        {/* ── HORARIOS ── */}
        <section className="flex flex-col items-center gap-3">
          <span className="rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
            HORARIOS
          </span>

          <div className="w-full overflow-x-auto rounded-lg">
            <table className="w-full border-collapse text-[7px]">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-white px-1 py-[3px] text-center font-semibold text-[#262626]" />
                  {["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"].map((day) => (
                    <th
                      key={day}
                      className="border border-gray-300 bg-white px-1 py-[3px] text-center font-semibold text-[#262626]"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 bg-white px-1 py-[3px] text-center font-semibold text-[#262626] whitespace-nowrap">
                      {row.time}
                    </td>
                    <ScheduleCell cell={row.L} />
                    <ScheduleCell cell={row.M} />
                    <ScheduleCell cell={row.X} />
                    <ScheduleCell cell={row.J} />
                    <ScheduleCell cell={row.V} />
                    {/* Sábado */}
                    {typeof row.S === "string" ? (
                      <td className="border border-gray-200 p-[3px]">
                        <div className="rounded-[3px] px-[3px] py-[2px] text-center text-[7px] font-semibold leading-tight bg-nexo-dark text-white">
                          CF {row.S}
                        </div>
                      </td>
                    ) : (
                      <ScheduleCell cell={row.S as ScheduleCell | null} />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Leyenda */}
          <div className="flex w-full items-start gap-3 pt-1">
            <div className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full bg-nexo-dark" />
            <p className="font-body text-[12px] text-nexo-dark">
              WL / GYM: Entrenamientos específicos de técnica de halterofilia y
              gimnásticos, alternando una disciplina cada semana.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <Link
          href="/clase-prueba"
          className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
        >
          Clase de Prueba
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
