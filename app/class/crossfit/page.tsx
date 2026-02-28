"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";

type FirstTime = "si" | "no" | null;

const ON_RAMP_FAQS = [
  {
    question: "¿Cuando comienza el próximo curso?",
    answer:
      "El próximo curso On Ramp comienza en enero (12/01 al 04/02) y en febrero (16/02 al 11/03). Son 8 clases en 4 semanas, 2 por semana.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El precio del curso On Ramp es de 165 euros. Incluye todas las sesiones con atención personalizada de nuestros coaches.",
  },
  {
    question: "¿No puedes asistir al horario establecido?",
    answer:
      "No te preocupes. Ofrecemos la opción de realizarlo de forma semiprivada (2 personas, 190 € por persona) o totalmente personalizada (1 persona, 250 €), en el horario que mejor te venga.",
  },
];

const CROSSFIT_FAQS = [
  {
    question: "¿Cuánto duran las clases?",
    answer:
      "Clases diarias de 60 minutos. Se repite cada hora a lo largo del día y varía diariamente. Alternamos entre entrenamientos de fuerza y trabajo metabólico (cardio) para un entrenamiento equilibrado y efectivo.",
  },
  {
    question: "¿La clase de prueba es gratis?",
    answer:
      "Ofrecemos una clase de prueba para quienes ya tienen experiencia en CrossFit y quieren unirse a nuestra familia. El coste de la clase es de 10 €, que se descontarán de tu primera cuota si decides apuntarte.",
  },
];

const FECHAS_ON_RAMP = [
  { value: "enero", label: "Enero (12/01 - 04/02)" },
  { value: "febrero", label: "Febrero (16/02 - 11/03)" },
];

export default function CrossfitPage() {
  const router = useRouter();
  const [firstTime, setFirstTime] = useState<FirstTime>(null);
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaCurso: "",
    boxEntrenado: "",
    tiempoEntrenado: "",
    mensaje: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function selectFirstTime(val: FirstTime) {
    setFirstTime(val);
    if (val === "no") {
      setOpenFaqs(new Set([0, 1]));
    } else {
      setOpenFaqs(new Set());
    }
  }

  function toggleFaq(i: number) {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!privacyAccepted || !firstTime) return;
    router.push("/class/crossfit/confirm");
  }

  const activeFaqs = firstTime === "si" ? ON_RAMP_FAQS : CROSSFIT_FAQS;

  const card = firstTime !== null ? (
    <div className="flex flex-col gap-4 rounded-lg bg-[#262626] p-4 lg:p-6">
      {/* Título */}
      <h2 className="font-heading text-[22px] font-bold uppercase tracking-wide text-nexo-orange lg:text-2xl">
        {firstTime === "si" ? "Curso On Ramp" : "Clases CrossFit"}
      </h2>

      {/* Descripción */}
      <p className="font-body text-base leading-5 text-[#fbfbfb]">
        {firstTime === "si" ? (
          <>
            En Nexo siempre damos prioridad a la técnica y el cuidado,
            por eso si nunca has hecho CrossFit, empezarás con nuestro
            curso de iniciación. El ON RAMP es para que aprendas los
            fundamentos del CrossFit sin prisa. Al terminar el curso
            podrás empezar a hacer clases regulares sabiendo exactamente
            qué haces y por qué lo haces.
          </>
        ) : (
          <>
            Si ya{" "}
            <span className="font-semibold">tienes experiencia </span>
            en CrossFit, este es tu sitio para seguir superándote.
            Nuestros entrenamientos están{" "}
            <span className="font-semibold">
              diseñados para desafiarte, mejorar tu técnica y llevar tu
              rendimiento al siguiente nivel.{" "}
            </span>
            Sé parte de nuestro box y convierte cada sesión en un
            desafío que te lleva más lejos.
          </>
        )}
      </p>

      {/* FAQ accordion */}
      <div className="flex flex-col divide-y divide-white/10">
        {activeFaqs.map((faq, i) => (
          <div key={i} className="py-3">
            <button
              type="button"
              onClick={() => toggleFaq(i)}
              className="flex w-full items-start justify-between gap-3 text-left"
            >
              <span className="font-body text-[20px] font-semibold leading-6 text-[#fbfbfb]">
                {faq.question}
              </span>
              <svg
                className={`mt-1 h-6 w-6 shrink-0 text-nexo-orange transition-transform duration-200 ${
                  openFaqs.has(i) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaqs.has(i) && (
              <p className="mt-2 font-body text-base leading-6 text-[#fbfbfb]">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <main className="bg-[#fbfbfb]">
      <div
        className="block md:hidden"
      >
        <PageHero title="Reserva tu clase de prueba" />
      </div>

      <div className="hidden md:block">
        <PageHero title="Reserva tu clase de prueba" imageSrc="/bg-form-des.webp" />
      </div>

      <div className="px-6 py-6 lg:px-16 lg:py-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-0 lg:items-start"
        >
          {/* Pregunta Sí / No — col 1, row 1 */}
          <div className="flex flex-col gap-2 lg:col-start-1 lg:row-start-1 lg:pb-4">
            <p className="font-body text-base leading-5 text-nexo-dark">
              ¿Es la primera vez que haces CrossFit?
            </p>
            <div className="flex items-center gap-6">
              {(["si", "no"] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => selectFirstTime(val)}
                  className="flex items-center gap-2"
                >
                  <span className="font-body text-[17px] leading-none text-[#232a34]">
                    {val === "si" ? "Si" : "No"}
                  </span>
                  <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-nexo-orange">
                    {firstTime === val && (
                      <span className="h-[14px] w-[14px] rounded-full bg-nexo-orange" />
                    )}
                  </span>
                </button>
              ))}
            </div>
            {firstTime === "no" && (
              <p className="font-body text-base leading-5 text-nexo-dark">
                Rellena el siguiente formulario y solicita tu clase de prueba:
              </p>
            )}
          </div>

          {/* Card — móvil: flujo normal; desktop: col 2 abarca ambas filas */}
          {card && (
            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              {card}
            </div>
          )}

          {/* Campos del formulario — col 1, row 2 en desktop */}
          <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-2">
            {/* Campos extra cuando ya tiene experiencia (No) */}
            {firstTime === "no" && (
              <>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="boxEntrenado"
                    className="font-body text-base leading-5 text-nexo-dark"
                  >
                    ¿En qué box has entrenado?
                  </label>
                  <input
                    id="boxEntrenado"
                    name="boxEntrenado"
                    type="text"
                    placeholder="Pedor Perez"
                    value={form.boxEntrenado}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="tiempoEntrenado"
                    className="font-body text-base leading-5 text-nexo-dark"
                  >
                    ¿Durante cuánto tiempo?
                  </label>
                  <input
                    id="tiempoEntrenado"
                    name="tiempoEntrenado"
                    type="text"
                    placeholder="Pedor Perez"
                    value={form.tiempoEntrenado}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none"
                  />
                </div>
              </>
            )}

            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="nombre"
                className="font-body text-base leading-5 text-nexo-dark"
              >
                Nombre Completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Pedro Pérez"
                value={form.nombre}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none"
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="telefono"
                className="font-body text-base leading-5 text-nexo-dark"
              >
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="(+34) 000 000 000"
                value={form.telefono}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-body text-base leading-5 text-nexo-dark"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="pedorperez@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none"
              />
            </div>

            {/* Fecha del curso — sólo si es primera vez */}
            {firstTime === "si" && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fechaCurso"
                  className="font-body text-base leading-5 text-nexo-dark"
                >
                  ¿En qué fechas vas a empezar el curso?
                </label>
                <div className="relative w-full">
                  <select
                    id="fechaCurso"
                    name="fechaCurso"
                    value={form.fechaCurso}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none rounded-lg border border-[#cfc9c4] bg-white px-4 py-2 pr-10 font-body text-sm text-nexo-dark focus:border-nexo-orange focus:outline-none"
                  >
                    <option value="" disabled>
                      Selecciona fecha inicio curso
                    </option>
                    {FECHAS_ON_RAMP.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#878787]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            )}

            {/* Mensaje */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="mensaje"
                className="font-body text-base leading-5 text-nexo-dark"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Escribe tu mensaje aquí..."
                value={form.mensaje}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none"
              />
            </div>

            {/* Toggle privacidad */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={privacyAccepted}
                onClick={() => setPrivacyAccepted(!privacyAccepted)}
                className={`relative mt-0.5 h-[26px] w-[42px] shrink-0 overflow-hidden rounded-full transition-colors duration-200 ${
                  privacyAccepted ? "bg-nexo-orange" : "bg-[#cac4d0]"
                }`}
              >
                <span
                  className={`absolute left-0 top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    privacyAccepted ? "translate-x-[19px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
              <p className="font-body text-base leading-5 text-nexo-dark">
                Al hacer clic, acepto las condiciones de privacidad
              </p>
            </div>

            {/* Botón enviar */}
            <button
              type="submit"
              disabled={!privacyAccepted || !firstTime}
              className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Enviar
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
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
