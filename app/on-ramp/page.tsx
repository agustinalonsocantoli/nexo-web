import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Curso On Ramp CrossFit en Valencia",
  description:
    "Empieza CrossFit desde cero con el curso On Ramp de Nexo en Valencia. 8 sesiones en 4 semanas, grupos reducidos (2-6 personas), atención personalizada y precio de 165€. ¡Plazas limitadas!",
  openGraph: {
    title: "Curso On Ramp CrossFit en Valencia | Nexo CrossFit",
    description:
      "Inicia en CrossFit con nuestro curso On Ramp. 8 sesiones, grupos reducidos y coaches que cuidan tu técnica desde el primer día. 165€.",
    url: "https://nexocrossfit.es//on-ramp",
  },
  alternates: {
    canonical: "https://nexocrossfit.es//on-ramp",
  },
};

const sessions = [
  { month: "FEBRERO", dates: "16/02 al 11/03 del 2026", spots: 6 },
  { month: "MARZO", dates: "23/03 al 16/04 del 2026", spots: 6 },
  { month: "ABRIL", dates: "20/04 al 13/05 del 2026", spots: 6 },
];

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PersonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 shrink-0 text-[#1e1e1e]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const ChevronLeft = () => (
  <svg className="h-8 w-8 text-nexo-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="h-8 w-8 text-nexo-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

function SessionCard({ session, className = "" }: { session: typeof sessions[0]; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-nexo-orange bg-white px-5 py-4 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] flex flex-col items-center gap-3 ${className}`}
    >
      <p className="font-heading text-[28px] font-bold leading-[100%] text-[#262626] text-center">
        {session.month}
      </p>
      <p className="font-body text-base leading-5 text-[#262626] text-center">
        {session.dates}
      </p>
      <div className="flex items-center gap-1.5 justify-center">
        <PersonIcon />
        <p className="font-body text-base leading-5 text-[#1e1e1e] text-center">
          {session.spots} plazas disponibles
        </p>
      </div>
      <Link
        href="/on-ramp/booking"
        className="mt-1 flex w-full items-center justify-center gap-3 rounded-lg bg-nexo-orange px-8 py-2 font-body text-sm text-white transition-opacity hover:opacity-90"
      >
        Reserva tu plaza
        <ArrowIcon />
      </Link>
    </div>
  );
}

export default function OnRampPage() {
  return (
    <main className="bg-[#fbfbfb]">
      <div
        className="block md:hidden"
      >
        <PageHero title="¡Empieza hoy tu nuevo estilo de vida!" />
      </div>

      <div className="hidden md:block">
        <PageHero
          title="¡Empieza hoy tu nuevo estilo de vida!"
          imageSrc="/bg-or-des.webp"
          imageClass="object-[center_45%]"
        />
      </div>

      <div className="mx-auto max-w-7xl flex flex-col gap-10 px-6 py-8 lg:gap-12 lg:px-[72px] lg:py-12">

        {/* ── PRÓXIMAS FECHAS DE INICIO ── */}
        <section className="flex flex-col gap-4 lg:gap-6">
          <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%] tracking-[0.6px]">
            Próximas fechas<br className="md:hidden" /> On Ramp
          </h2>

          {/* Mobile: CSS-only carousel */}
          <div className="sessions-carousel md:hidden">
            <input type="radio" name="sessions" id="ses-1" className="carousel-radio" defaultChecked />
            <input type="radio" name="sessions" id="ses-2" className="carousel-radio" />
            <input type="radio" name="sessions" id="ses-3" className="carousel-radio" />

            <div className="sessions-carousel-wrapper">
              <div className="sessions-carousel-slide">
                <SessionCard session={sessions[0]} className="w-[270px]" />
              </div>
              <div className="sessions-carousel-slide">
                <SessionCard session={sessions[1]} className="w-[270px]" />
              </div>
              <div className="sessions-carousel-slide">
                <SessionCard session={sessions[2]} className="w-[270px]" />
              </div>
            </div>

            {/* Prev arrows (wrap: 1→3, 2→1, 3→2) */}
            <label htmlFor="ses-3" className="sessions-nav sessions-nav-prev sessions-prev-1"><ChevronLeft /></label>
            <label htmlFor="ses-1" className="sessions-nav sessions-nav-prev sessions-prev-2"><ChevronLeft /></label>
            <label htmlFor="ses-2" className="sessions-nav sessions-nav-prev sessions-prev-3"><ChevronLeft /></label>

            {/* Next arrows (wrap: 1→2, 2→3, 3→1) */}
            <label htmlFor="ses-2" className="sessions-nav sessions-nav-next sessions-next-1"><ChevronRight /></label>
            <label htmlFor="ses-3" className="sessions-nav sessions-nav-next sessions-next-2"><ChevronRight /></label>
            <label htmlFor="ses-1" className="sessions-nav sessions-nav-next sessions-next-3"><ChevronRight /></label>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-2 gap-4 lg:grid-cols-3">
            {sessions.map((session) => (
              <SessionCard key={session.month} session={session} />
            ))}
          </div>
        </section>

        {/* ── ¿CUÁNTO CUESTA? ── */}
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%] tracking-[0.6px]">
            ¿Cuánto cuesta?
          </h2>
          <p className="font-body text-base leading-5 text-nexo-dark">
            El precio del curso es de{" "}
            <span className="font-semibold">165 euros</span>.
          </p>
        </section>

        {/* ── DETALLES ADICIONALES ── */}
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%] tracking-[0.6px]">
            Detalles adicionales
          </h2>
          <ul className="list-disc space-y-1 pl-5 font-body text-base leading-5 text-nexo-dark">
            <li>4 semanas, 2 días por semana (lunes y miércoles) de 20:15 a 21:15.</li>
            <li>
              Curso de 2 a 6 personas, con una duración de 4 semanas. En total
              son 8 clases, 2 por semana.
            </li>
            <li>Sin restricciones de edad, todos son bienvenidos.</li>
            <li>
              Atención personalizada de nuestros entrenadores para garantizar
              seguridad y aprendizaje efectivo.
            </li>
            <li>
              Asistencia obligatoria a todas las clases, ya que no son
              recuperables.
            </li>
          </ul>
        </section>

        {/* ── HORARIO ALTERNATIVO ── */}
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%] tracking-[0.6px] lg:max-w-[860px]">
            ¿No puedes asistir al horario establecido para el próximo curso de iniciación?
          </h2>
          <p className="font-body text-base leading-5 text-nexo-dark">
            No te preocupes, te ofrecemos la opción de realizar el curso de
            forma semiprivada o totalmente personalizada: consiste en 8 sesiones
            de 1 hora, programadas según tu disponibilidad y conveniencia.
          </p>
          <ul className="list-disc space-y-1 pl-5 font-body text-base leading-5 text-nexo-dark">
            <li>
              El semiprivado (2 personas) tiene un coste de 190 euros por
              persona.
            </li>
            <li>El privado (1 persona) de 250 euros.</li>
          </ul>
        </section>

      </div>
    </main>
  );
}
