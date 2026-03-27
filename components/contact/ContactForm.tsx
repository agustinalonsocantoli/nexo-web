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

function createContactSchema(t: (key: string) => string) {
  return z.object({
    nombre: z.string().min(2, t("nameMin")),
    email: z.string().email(t("emailInvalid")),
    telefono: z.string().min(1, t("phoneRequired")).refine(isValidPhoneNumber, t("phoneInvalid")),
    mensaje: z.string().min(10, t("messageMin")),
    privacidad: z.boolean().refine((v) => v, t("privacyRequired")),
  });
}

type FormData = z.infer<ReturnType<typeof createContactSchema>>;

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none";

export default function ContactForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const tf = useTranslations("forms");
  const tv = useTranslations("validation");

  const schema = createContactSchema(tv);

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
      const res = await fetch("/api/send/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          mensaje: data.mensaje,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      router.push("/contact/confirm");
    } catch {
      setApiError(tf("apiError"));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:order-first lg:flex-1">
      {/* Nombre */}
      <div className="flex flex-col gap-2">
        <label htmlFor="nombre" className="font-body text-base leading-5 text-nexo-dark">
          {tf("name")}
        </label>
        <input
          id="nombre"
          type="text"
          placeholder={tf("namePlaceholder")}
          suppressHydrationWarning
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
          suppressHydrationWarning
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
          className={`w-full resize-none rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none ${errors.mensaje ? "border-red-500" : "border-[#cac4d0]"
            }`}
        />
        {errors.mensaje && <p className="font-body text-sm text-red-500">{errors.mensaje.message}</p>}
      </div>

      {/* Toggle privacidad */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={privacidad}
            onClick={() => setValue("privacidad", !privacidad, { shouldValidate: isSubmitted })}
            className={`relative h-[26px] w-[42px] shrink-0 overflow-hidden rounded-full transition-colors duration-200 ${privacidad ? "bg-nexo-orange" : "bg-[#cac4d0]"
              }`}
          >
            <span
              className={`absolute left-0 top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${privacidad ? "translate-x-[19px]" : "translate-x-[3px]"
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
        suppressHydrationWarning
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
  );
}
