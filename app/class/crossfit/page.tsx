"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PageHero from "@/components/PageHero";

const schema = z
  .object({
    firstTime: z.enum(["si", "no"], { message: "Selecciona una opción" }),
    nombre: z.string().min(2, "Nombre demasiado corto"),
    email: z.string().email("Email inválido"),
    telefono: z.string().min(9, "Teléfono inválido"),
    mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
    privacidad: z.boolean().refine((v) => v, "Debes aceptar la política de privacidad"),
    fechaCurso: z.string().optional(),
    boxEntrenado: z.string().optional(),
    tiempoEntrenado: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.firstTime === "si" && !data.fechaCurso) {
      ctx.addIssue({ code: "custom", path: ["fechaCurso"], message: "Selecciona una fecha" });
    }
    if (data.firstTime === "no") {
      if (!data.boxEntrenado) {
        ctx.addIssue({ code: "custom", path: ["boxEntrenado"], message: "Campo requerido" });
      }
      if (!data.tiempoEntrenado) {
        ctx.addIssue({ code: "custom", path: ["tiempoEntrenado"], message: "Campo requerido" });
      }
    }
  });

type FormData = z.infer<typeof schema>;

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

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none";

export default function CrossfitPage() {
  const router = useRouter();
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { privacidad: false },
  });

  const firstTime = watch("firstTime");
  const privacidad = watch("privacidad");

  function selectFirstTime(val: "si" | "no") {
    setValue("firstTime", val, { shouldValidate: isSubmitted });
    clearErrors(["fechaCurso", "boxEntrenado", "tiempoEntrenado"]);
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

  async function onSubmit(data: FormData) {
    setApiError(null);
    const tipo = data.firstTime === "si" ? "CrossFit – On Ramp" : "CrossFit – Clase de prueba";
    try {
      const res = await fetch("/api/send/class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          mensaje: data.mensaje,
          fechaCurso: data.fechaCurso,
          boxEntrenado: data.boxEntrenado,
          tiempoEntrenado: data.tiempoEntrenado,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      router.push("/class/crossfit/confirm");
    } catch {
      setApiError("Ha ocurrido un error al enviar el formulario. Inténtalo de nuevo.");
    }
  }

  const activeFaqs = firstTime === "si" ? ON_RAMP_FAQS : CROSSFIT_FAQS;

  const card = firstTime != null ? (
    <div className="flex flex-col gap-4 rounded-lg bg-[#262626] p-4 lg:p-6">
      <h2 className="font-heading text-[22px] font-bold uppercase tracking-wide text-nexo-orange lg:text-2xl">
        {firstTime === "si" ? "Curso On Ramp" : "Clases CrossFit"}
      </h2>

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
                className={`mt-1 h-6 w-6 shrink-0 text-nexo-orange transition-transform duration-200 ${openFaqs.has(i) ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
      <PageHero title="Reserva tu" titlePart2="clase de prueba" imageSrc="/bg-form-des.webp" />

      <div className="px-6 py-6 lg:px-16 lg:py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
            {errors.firstTime && (
              <p className="font-body text-sm text-red-500">{errors.firstTime.message}</p>
            )}
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
                  <label htmlFor="boxEntrenado" className="font-body text-base leading-5 text-nexo-dark">
                    ¿En qué box has entrenado?
                  </label>
                  <input
                    id="boxEntrenado"
                    type="text"
                    placeholder="Nombre del box"
                    {...register("boxEntrenado")}
                    className={`${inputBase} ${errors.boxEntrenado ? "border-red-500" : "border-[#cac4d0]"}`}
                  />
                  {errors.boxEntrenado && <p className="font-body text-sm text-red-500">{errors.boxEntrenado.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="tiempoEntrenado" className="font-body text-base leading-5 text-nexo-dark">
                    ¿Durante cuánto tiempo?
                  </label>
                  <input
                    id="tiempoEntrenado"
                    type="text"
                    placeholder="Ej: 2 años"
                    {...register("tiempoEntrenado")}
                    className={`${inputBase} ${errors.tiempoEntrenado ? "border-red-500" : "border-[#cac4d0]"}`}
                  />
                  {errors.tiempoEntrenado && <p className="font-body text-sm text-red-500">{errors.tiempoEntrenado.message}</p>}
                </div>
              </>
            )}

            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label htmlFor="nombre" className="font-body text-base leading-5 text-nexo-dark">
                Nombre Completo
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Pedro Pérez"
                {...register("nombre")}
                className={`${inputBase} ${errors.nombre ? "border-red-500" : "border-[#cac4d0]"}`}
              />
              {errors.nombre && <p className="font-body text-sm text-red-500">{errors.nombre.message}</p>}
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-2">
              <label htmlFor="telefono" className="font-body text-base leading-5 text-nexo-dark">
                Teléfono
              </label>
              <input
                id="telefono"
                type="tel"
                placeholder="(+34) 000 000 000"
                {...register("telefono")}
                className={`${inputBase} ${errors.telefono ? "border-red-500" : "border-[#cac4d0]"}`}
              />
              {errors.telefono && <p className="font-body text-sm text-red-500">{errors.telefono.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-body text-base leading-5 text-nexo-dark">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="pedropérez@gmail.com"
                {...register("email")}
                className={`${inputBase} ${errors.email ? "border-red-500" : "border-[#cac4d0]"}`}
              />
              {errors.email && <p className="font-body text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Fecha del curso — sólo si es primera vez */}
            {firstTime === "si" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="fechaCurso" className="font-body text-base leading-5 text-nexo-dark">
                  ¿En qué fechas vas a empezar el curso?
                </label>
                <div className="relative w-full">
                  <select
                    id="fechaCurso"
                    {...register("fechaCurso")}
                    className={`w-full appearance-none rounded-lg border bg-white px-4 py-2 pr-10 font-body text-sm text-nexo-dark focus:border-nexo-orange focus:outline-none ${errors.fechaCurso ? "border-red-500" : "border-[#cfc9c4]"
                      }`}
                  >
                    <option value="">Selecciona fecha inicio curso</option>
                    {FECHAS_ON_RAMP.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#878787]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
                {errors.fechaCurso && <p className="font-body text-sm text-red-500">{errors.fechaCurso.message}</p>}
              </div>
            )}

            {/* Mensaje */}
            <div className="flex flex-col gap-2">
              <label htmlFor="mensaje" className="font-body text-base leading-5 text-nexo-dark">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                rows={4}
                placeholder="Escribe tu mensaje aquí..."
                {...register("mensaje")}
                className={`w-full resize-none rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none ${errors.mensaje ? "border-red-500" : "border-[#cac4d0]"
                  }`}
              />
              {errors.mensaje && <p className="font-body text-sm text-red-500">{errors.mensaje.message}</p>}
            </div>

            {/* Toggle privacidad */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={privacidad}
                  onClick={() => setValue("privacidad", !privacidad, { shouldValidate: isSubmitted })}
                  className={`relative mt-0.5 h-[26px] w-[42px] shrink-0 overflow-hidden rounded-full transition-colors duration-200 ${privacidad ? "bg-nexo-orange" : "bg-[#cac4d0]"
                    }`}
                >
                  <span
                    className={`absolute left-0 top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${privacidad ? "translate-x-[19px]" : "translate-x-[3px]"
                      }`}
                  />
                </button>
                <p className="font-body text-base leading-5 text-nexo-dark">
                  Al hacer clic, acepto las condiciones de privacidad
                </p>
              </div>
              {errors.privacidad && <p className="font-body text-sm text-red-500">{errors.privacidad.message}</p>}
            </div>

            {/* Error global */}
            {apiError && <p className="font-body text-sm text-red-500">{apiError}</p>}

            {/* Botón enviar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
              {!isSubmitting && (
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
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
