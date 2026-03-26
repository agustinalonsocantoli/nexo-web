"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PhoneField from "@/components/PhoneField";

function createClassBookingSchema(t: (key: string) => string) {
  return z.object({
    nombre: z.string().min(2, t("nameMin")),
    email: z.string().email(t("emailInvalid")),
    telefono: z.string().min(1, t("phoneRequired")).refine(isValidPhoneNumber, t("phoneInvalid")),
    mensaje: z.string().min(10, t("messageMin")),
    privacidad: z.boolean().refine((v) => v, t("privacyRequired")),
  });
}

type FormData = z.infer<ReturnType<typeof createClassBookingSchema>>;

interface Faq {
  question: string;
  answer: React.ReactNode;
}

interface ClassBookingFormProps {
  title: string;
  description: string;
  faqs: Faq[];
  redirectTo: string;
  tipo: string;
}

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none";

export default function ClassBookingForm({
  title,
  description,
  faqs,
  redirectTo,
  tipo,
}: ClassBookingFormProps) {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const tf = useTranslations("forms");
  const tv = useTranslations("validation");

  const schema = createClassBookingSchema(tv);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { privacidad: false },
  });

  const privacidad = watch("privacidad");

  async function onSubmit(data: FormData) {
    setApiError(null);
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
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      router.push(redirectTo);
    } catch {
      setApiError(tf("apiError"));
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-[72px] lg:py-12">
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-start lg:gap-12">

        {/* ── Columna izquierda (desktop): formulario ── */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-4">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="font-body text-base leading-5 text-nexo-dark">
              {tf("name")}
            </label>
            <input
              id="nombre"
              type="text"
              placeholder={tf("namePlaceholder")}
              {...register("nombre")}
              className={`${inputBase} ${errors.nombre ? "border-red-500" : "border-[#cac4d0]"}`}
            />
            {errors.nombre && <p className="font-body text-sm text-red-500">{errors.nombre.message}</p>}
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-2">
            <label htmlFor="telefono" className="font-body text-base leading-5 text-nexo-dark">
              {tf("phone")}
            </label>
            <PhoneField control={control} name="telefono" error={errors.telefono} id="telefono" />
            {errors.telefono && <p className="font-body text-sm text-red-500">{tf("phoneError")}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-body text-base leading-5 text-nexo-dark">
              {tf("email")}
            </label>
            <input
              id="email"
              type="email"
              placeholder={tf("emailPlaceholder")}
              {...register("email")}
              className={`${inputBase} ${errors.email ? "border-red-500" : "border-[#cac4d0]"}`}
            />
            {errors.email && <p className="font-body text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label htmlFor="mensaje" className="font-body text-base leading-5 text-nexo-dark">
              {tf("message")}
            </label>
            <textarea
              id="mensaje"
              rows={4}
              placeholder={tf("messagePlaceholder")}
              suppressHydrationWarning
              {...register("mensaje")}
              className={`w-full resize-none rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none ${
                errors.mensaje ? "border-red-500" : "border-[#cac4d0]"
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
                className={`relative mt-0.5 h-[26px] w-[42px] shrink-0 overflow-hidden rounded-full transition-colors duration-200 ${
                  privacidad ? "bg-nexo-orange" : "bg-[#cac4d0]"
                }`}
              >
                <span
                  className={`absolute left-0 top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    privacidad ? "translate-x-[19px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
              <p className="font-body text-base leading-5 text-nexo-dark">
                {tf.rich("privacy", {
                  link: (chunks) => <Link href="/privacy" className="underline hover:text-nexo-orange">{chunks}</Link>,
                })}
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
            {isSubmitting ? tf("submitting") : tf("submit")}
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
        </form>

        {/* ── Columna derecha (desktop): info card ── */}
        <div className="flex flex-col gap-4 rounded-lg bg-[#262626] p-6 lg:w-[480px] lg:shrink-0">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-[24px] font-bold uppercase tracking-[0.72px] text-nexo-orange">
              {title}
            </h2>
            <p className="font-body text-base leading-5 text-[#fbfbfb]">
              {description}
            </p>
          </div>

          {/* FAQ accordion */}
          <div className="flex flex-col divide-y divide-white/10">
            {faqs.map((faq, i) => (
              <div key={i} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-start justify-between gap-3 text-left"
                >
                  <span className="font-body text-[20px] font-semibold leading-6 text-[#fbfbfb]">
                    {faq.question}
                  </span>
                  <svg
                    className={`mt-0.5 h-6 w-6 shrink-0 text-nexo-orange transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="mt-2 font-body text-base leading-6 text-[#fbfbfb]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
