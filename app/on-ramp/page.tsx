import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "On Ramp - Nexo CrossFit",
  description: "Curso de iniciación al CrossFit de 4 semanas. Aprende los fundamentos con atención personalizada antes de unirte a las clases regulares.",
};

export default function OnRampPage() {
  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title="¡Empieza hoy tu nuevo estilo de vida!" />

      {/* Main content */}
      <div className="flex flex-col gap-10 px-6 py-6">

        {/* ── PRÓXIMAS FECHAS ON RAMP ── */}
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%]">
            Próximas fechas{"\n"}On Ramp
          </h2>

          {/* Card de fecha — sin carrusel por ahora */}
          <div className="flex justify-center">
            <div className="w-full max-w-[300px] rounded-2xl border border-nexo-orange bg-white px-5 py-4 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] flex flex-col items-center gap-3">
              {/* Mes */}
              <p className="font-heading text-[28px] font-bold leading-[100%] text-[#262626] text-center">
                ENERO
              </p>
              {/* Fecha */}
              <p className="font-body text-base leading-5 text-[#262626] text-center">
                12/01 al 4/02 del 2026
              </p>
              {/* Disponibilidad */}
              <div className="flex items-center gap-1.5 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0 text-[#1e1e1e]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p className="font-body text-base leading-5 text-[#1e1e1e] text-center">
                  2 plazas disponibles
                </p>
              </div>
              {/* CTA */}
              <Link
                href="/booking"
                className="mt-1 flex items-center gap-3 rounded-lg bg-nexo-orange px-8 py-2 font-body text-sm text-white transition-opacity hover:opacity-90"
              >
                Clase de Prueba
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
              </Link>
            </div>
          </div>
        </section>

        {/* ── ¿CUÁNTO CUESTA? ── */}
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%]">
            ¿Cuánto cuesta?
          </h2>
          <p className="font-body text-base leading-5 text-nexo-dark">
            El precio del curso es de{" "}
            <span className="font-semibold">165 euros</span>.
          </p>
        </section>

        {/* ── DETALLES ADICIONALES ── */}
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%]">
            Detalles adicionales
          </h2>
          <ul className="list-disc space-y-1 pl-5 font-body text-base leading-5 text-nexo-dark">
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
          <h2 className="font-heading text-[20px] font-bold uppercase text-nexo-dark leading-[100%]">
            ¿No puedes asistir al horario para el próximo curso de iniciación?
          </h2>
          <p className="font-body text-base leading-5 text-nexo-dark">
            No te preocupes, te ofrecemos la opción de realizar el curso de
            forma semiprivada o totalmente personalizada:
          </p>
          <ul className="list-disc space-y-1 pl-5 font-body text-base leading-5 text-nexo-dark">
            <li>
              8 sesiones de 1 hora, programadas según tu disponibilidad y
              conveniencia.
            </li>
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
