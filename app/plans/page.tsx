import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Tarifas y Horarios",
  description:
    "Tarifas de CrossFit y HYROX en Valencia: cuota mensual 110€, HYROX 75€, bono 20 clases 180€ y descuentos por trimestre, semestre y anual. Consulta nuestros horarios de lunes a sábado.",
  openGraph: {
    title: "Tarifas y Horarios | Nexo CrossFit Valencia",
    description:
      "Cuota mensual CrossFit 110€, HYROX 75€, bonos y descuentos. Horarios de lunes a sábado en Valencia.",
    url: "https://nexocrossfit.es/plans",
  },
  alternates: {
    canonical: "https://nexocrossfit.es/plans",
  },
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
  S: ScheduleCell | null;
}

const scheduleData: ScheduleRow[] = [
  {
    time: "7:00",
    L: { name: "HYROX", type: "hyrox" },
    M: null,
    X: { name: "HYROX", type: "hyrox" },
    J: null,
    V: { name: "HYROX", type: "hyrox" },
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
    time: "",
    L: null,
    M: null,
    X: null,
    J: null,
    V: null,
    S: { name: "CROSSFIT 9:30", type: "crossfit" },
  },
  {
    time: "11:00",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "CROSSFIT", type: "crossfit" },
    V: { name: "CROSSFIT", type: "crossfit" },
    S: { name: "CROSSFIT 10:30", type: "crossfit" },
  },
  {
    time: "",
    L: null,
    M: null,
    X: null,
    J: { name: "WL / GYM", type: "wlgym" },
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
    time: "",
    L: null,
    M: null,
    X: null,
    J: null,
    V: null,
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
    J: { name: "WL / GYM", type: "wlgym" },
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
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "STRENGTH", type: "strength" },
    V: { name: "CROSSFIT", type: "crossfit" },
    S: null,
  },
  {
    time: "19:15",
    L: { name: "HYROX", type: "hyrox" },
    M: null,
    X: { name: "HYROX", type: "hyrox" },
    J: null,
    V: null,
    S: null,
  },
  {
    time: "19:30",
    L: { name: "CROSSFIT", type: "crossfit" },
    M: { name: "CROSSFIT", type: "crossfit" },
    X: { name: "CROSSFIT", type: "crossfit" },
    J: { name: "CROSSFIT", type: "crossfit" },
    V: null,
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
      return "bg-[#ffbe96] text-[#1e1e1e]";
    case "crossfit":
      return "bg-[#ff731c] text-[#1e1e1e]";
    case "strength":
      return "bg-[#903700] text-white";
    case "wlgym":
      return "bg-[#262626] text-white";
    default:
      return "";
  }
}

function ScheduleCell({ cell }: { cell: ScheduleCell | null }) {
  if (!cell)
    return <td className="h-7 border border-black bg-white lg:h-9" />;
  return (
    <td
      className={`h-7 border border-black px-1 text-center font-body text-[7px] font-semibold leading-tight lg:h-9 lg:px-2 lg:text-[11px] ${cellStyle(cell.type)}`}
    >
      {cell.name}
    </td>
  );
}

export default function PlansPage() {
  return (
    <main className="bg-[#fbfbfb]">
      {/* Hero */}
      <section className="relative h-[179px] overflow-hidden lg:h-[341px]">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/hero-sn-desktop.jpg"
            alt="Tarifas y Horarios - Nexo CrossFit"
            className="h-full w-full object-cover object-[center_60%] md:object-[center_50%] lg:object-[center_35%]"
            priority={true}
            sizes="100vw"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-nexo-dark/60" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
          <h1 className="font-heading text-[26px] font-bold leading-tight tracking-[0.03em] text-white uppercase lg:text-[48px]">
            Encuentra la tarifa ideal para ti
          </h1>
        </div>
      </section>

      {/* Main content */}
      <div className="flex flex-col gap-8 px-8 py-8 lg:mx-auto lg:max-w-7xl lg:gap-12 lg:px-30 lg:py-16">

        {/* ── TARIFAS ── */}
        <AnimateOnScroll>
          <section className="flex flex-col items-center gap-4">
            <span className="rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
              TARIFAS
            </span>

            <div className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-3">
              {/* Cuota mensual */}
              <div className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <p className="font-body text-base text-white">CUOTA MENSUAL</p>
                  <p className="font-heading text-[28px] font-bold leading-none text-white">110 €</p>
                </div>
                <p className="mt-1 font-body text-[11px] text-white/70">
                  | ACCESO ILIMITADO A TODAS LAS ACTIVIDADES |
                </p>
              </div>

              {/* Hyrox */}
              <div className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <p className="font-body text-base text-white">HYROX</p>
                  <p className="font-heading text-[28px] font-bold leading-none text-white">75 €</p>
                </div>
                <p className="mt-1 font-body text-[11px] text-white/70 whitespace-nowrap">
                  | ACCESO ILIMITADO A TODAS LAS CLASES DE HYROX |
                </p>
              </div>

              {/* Bono 20 clases */}
              <div className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-body text-[15px] font-semibold text-white">BONO DE 20 CLASES</p>
                    <p className="font-body text-[12px] text-white/70">| VÁLIDO PARA 2 MESES |</p>
                  </div>
                  <p className="shrink-0 font-heading text-[28px] font-bold leading-none text-white">180 €</p>
                </div>
                <p className="mt-1 font-body text-[12px] text-white font-bold">
                  Ideal si quieres venir{" "}
                  <span>2 o 3 veces por semana</span>.
                </p>
              </div>

              {/* Bono 10 clases */}
              <div className="flex items-center justify-between rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                <div>
                  <p className="font-body text-base text-white">BONO DE 10 CLASES</p>
                  <p className="font-body text-[12px] text-white/70">| 3 MESES |</p>
                </div>
                <p className="font-heading text-[28px] font-bold leading-none text-white">120 €</p>
              </div>

              {/* On Ramp */}
              <div className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-base text-white">ON RAMP</p>
                    <p className="font-body text-[11px] text-white/70">| CURSO DE INICIACIÓN |</p>
                  </div>
                  <p className="font-heading text-[28px] font-bold leading-none text-white">165 €</p>
                </div>
              </div>

              {/* Drop In */}
              <div className="flex items-center justify-between rounded-2xl bg-nexo-dark px-6 py-4 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                <p className="font-body text-base text-white">DROP IN</p>
                <p className="font-heading text-[28px] font-bold leading-none text-white">15 €</p>
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── DESCUENTOS ── */}
        <AnimateOnScroll delay={100}>
          <section className="flex flex-col items-center gap-4">
            <span className="rounded-full border-[1.5px] border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
              DESCUENTOS
            </span>

            <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
              {/* Cuota trimestral */}
              <div className="rounded-lg border border-nexo-orange p-2 shadow-md lg:p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                  CUOTA TRIMESTRAL
                </p>
                <p className="font-heading text-2xl font-bold leading-none text-[#262626] lg:text-3xl">10%</p>
                <p className="mt-1 font-body text-[9px] text-[#878787]">
                  3 MESES ADELANTADO{" "}
                  <span className="font-semibold">297 €</span>
                </p>
              </div>

              {/* Cuota semestral */}
              <div className="rounded-lg border border-nexo-orange p-2 shadow-md lg:p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                  CUOTA SEMESTRAL
                </p>
                <p className="font-heading text-2xl font-bold leading-none text-[#262626] lg:text-3xl">15%</p>
                <p className="mt-1 font-body text-[9px] text-[#878787]">
                  6 MESES ADELANTADO{" "}
                  <span className="font-semibold">561 €</span>
                </p>
              </div>

              {/* Cuota anual */}
              <div className="rounded-lg border border-nexo-orange p-2 shadow-md lg:p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                  CUOTA ANUAL
                </p>
                <p className="font-heading text-2xl font-bold leading-none text-[#262626] lg:text-3xl">20%</p>
                <p className="mt-1 font-body text-[9px] text-[#878787]">
                  1 AÑO ADELANTADO{" "}
                  <span className="font-semibold">1056 €</span>
                </p>
              </div>

              {/* Cuota mensual pareja */}
              <div className="rounded-lg border border-nexo-orange p-2 shadow-md lg:p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <p className="font-body text-[12px] font-semibold leading-tight text-[#262626]">
                  CUOTA MENSUAL
                </p>
                <p className="font-heading text-2xl font-bold leading-none text-[#262626] lg:text-3xl">10%</p>
                <p className="mt-1 font-body text-[9px] font-semibold uppercase text-[#878787]">
                  Parejas o Familiares
                </p>
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── HORARIOS ── */}
        <AnimateOnScroll delay={100}>
          <section className="flex flex-col items-center gap-3">
            <span className="rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
              HORARIOS
            </span>

            <div className="w-full overflow-x-auto">
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <col key={i} style={{ width: '14.285%' }} />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    {/* Celda top-left: vacía, sin borde ni fondo */}
                    <th className="border-0 bg-transparent p-0" />
                    {["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"].map((day) => (
                      <th
                        key={day}
                        className="h-7 border border-black bg-[#757575] px-1 text-center font-body text-[7px] font-semibold text-white lg:h-9 lg:px-3 lg:text-[11px]"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((row, i) => (
                    <tr key={i}>
                      <td className="h-7 whitespace-nowrap border border-black bg-[#757575] px-1 text-center font-body text-[7px] font-semibold text-white lg:h-9 lg:px-3 lg:text-[11px]">
                        {row.time}
                      </td>
                      <ScheduleCell cell={row.L} />
                      <ScheduleCell cell={row.M} />
                      <ScheduleCell cell={row.X} />
                      <ScheduleCell cell={row.J} />
                      <ScheduleCell cell={row.V} />
                      <ScheduleCell cell={row.S} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Leyenda */}
            <div className="flex w-full items-center gap-3 pt-1">
              <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-nexo-dark mb-0.5" />
              <p className="font-body text-[12px] text-nexo-dark">
                WL / GYM: Entrenamientos específicos de técnica de halterofilia y
                gimnásticos, alternando una disciplina cada semana.
              </p>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── CTA ── */}
        <AnimateOnScroll delay={100}>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/class"
              className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90 lg:w-fit lg:self-center lg:px-12"
            >
              Clase de prueba
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
        </AnimateOnScroll>
      </div>
    </main>
  );
}
