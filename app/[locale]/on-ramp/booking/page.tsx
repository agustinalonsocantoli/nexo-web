"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import PhoneField from "@/components/PhoneField";
import FileUploadField from "@/components/FileUploadField";

function createOnRampSchema(t: (key: string) => string) {
  return z.object({
    fecha: z.string().min(1, t("courseDateRequired")),
    nombre: z.string().min(2, t("nameMin")),
    email: z.string().email(t("emailInvalid")),
    telefono: z.string().min(1, t("phoneRequired")).refine(isValidPhoneNumber, t("phoneInvalid")),
    dni: z.string().min(8, t("dniInvalid")),
    fechaNacimiento: z.string().min(1, t("birthDateRequired")),
    mensaje: z.string().min(10, t("messageMin")),
    privacidad: z.boolean().refine((v) => v, t("privacyRequired")),
    comprobante: z
      .any()
      .refine(
        (files) => files instanceof FileList && files.length > 0,
        t("proofRequired")
      ),
  });
}

type FormData = z.infer<ReturnType<typeof createOnRampSchema>>;

const FECHAS_VALUES = ["abril", "mayo"];

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none";

const labelClass = "font-body text-base leading-5 text-nexo-dark";

function OnRampBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fechaParam = searchParams.get("fecha") ?? "";
  const [apiError, setApiError] = useState<string | null>(null);
  const tf = useTranslations("forms");
  const tv = useTranslations("validation");
  const to = useTranslations("onramp");

  const schema = createOnRampSchema(tv);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { privacidad: false, fecha: fechaParam },
  });

  const privacidad = watch("privacidad");
  const comprobanteFiles = watch("comprobante") as FileList | undefined;
  const fileName = comprobanteFiles?.[0]?.name ?? "";

  async function onSubmit(data: FormData) {
    setApiError(null);
    try {
      const file = (data.comprobante as FileList)[0];
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/send/onramp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha: data.fecha,
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          dni: data.dni,
          fechaNacimiento: data.fechaNacimiento,
          mensaje: data.mensaje,
          comprobante: { content: base64, filename: file.name },
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      router.push("/on-ramp/booking/confirm");
    } catch {
      setApiError(tf("apiError"));
    }
  }

  const paymentContactRich = tf.rich("paymentContact", {
    email: (chunks) => <a href="mailto:info@nexocrossfit.es" className="font-semibold text-nexo-orange underline underline-offset-2 transition-opacity hover:opacity-75">{chunks}</a>,
    phone: (chunks) => <a href="https://wa.me/34661388984" target="_blank" rel="noopener noreferrer" className="font-semibold text-nexo-orange underline underline-offset-2 transition-opacity hover:opacity-75">{chunks}</a>,
  });

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title={to('booking.heroTitle')} titlePart2={to('booking.heroTitlePart2')} imageSrc="/reserva-onramp.webp" />

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-[72px] lg:py-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">

            {/* ── Columna izquierda: campos del formulario ── */}
            <div className="flex flex-1 flex-col gap-4">

              {/* Fecha inicio */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fecha" className={labelClass}>
                  {tf("courseDate")}
                </label>
                <div className="relative w-full">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#878787]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </span>
                  <select
                    id="fecha"
                    {...register("fecha")}
                    suppressHydrationWarning
                    className={`w-full appearance-none rounded-lg border bg-white py-2 pl-10 pr-10 font-body text-sm text-nexo-dark focus:border-nexo-orange focus:outline-none ${errors.fecha ? "border-red-500" : "border-[#cac4d0]"
                      }`}
                  >
                    <option value="">{tf("courseDatePlaceholder")}</option>
                    {FECHAS_VALUES.map((value, i) => (
                      <option key={value} value={value}>{to(`sessions.${i}.label`)}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#878787]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
                {errors.fecha && <p className="font-body text-sm text-red-500">{errors.fecha.message}</p>}
              </div>

              {/* Nombre */}
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className={labelClass}>{tf("name")}</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder={tf("namePlaceholder")}
                  {...register("nombre")}
                  className={`${inputBase} ${errors.nombre ? "border-red-500" : "border-[#cac4d0]"}`}
                />
                {errors.nombre && <p className="font-body text-sm text-red-500">{errors.nombre.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClass}>{tf("email")}</label>
                <input
                  id="email"
                  type="email"
                  placeholder={tf("emailPlaceholder")}
                  {...register("email")}
                  className={`${inputBase} ${errors.email ? "border-red-500" : "border-[#cac4d0]"}`}
                />
                {errors.email && <p className="font-body text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Teléfono */}
              <div className="flex flex-col gap-2">
                <label htmlFor="telefono" className={labelClass}>{tf("phone")}</label>
                <PhoneField control={control} name="telefono" error={errors.telefono} id="telefono" />
                {errors.telefono && <p className="font-body text-sm text-red-500">{tf("phoneError")}</p>}
              </div>

              {/* DNI */}
              <div className="flex flex-col gap-2">
                <label htmlFor="dni" className={labelClass}>{tf("dni")}</label>
                <input
                  id="dni"
                  type="text"
                  placeholder={tf("dniPlaceholder")}
                  {...register("dni")}
                  className={`${inputBase} ${errors.dni ? "border-red-500" : "border-[#cac4d0]"}`}
                />
                {errors.dni && <p className="font-body text-sm text-red-500">{errors.dni.message}</p>}
              </div>

              {/* Fecha de nacimiento */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fechaNacimiento" className={labelClass}>{tf("birthDate")}</label>
                <input
                  id="fechaNacimiento"
                  type="date"
                  {...register("fechaNacimiento")}
                  className={`appearance-none ${inputBase} ${errors.fechaNacimiento ? "border-red-500" : "border-[#cac4d0]"}`}
                />
                {errors.fechaNacimiento && <p className="font-body text-sm text-red-500">{errors.fechaNacimiento.message}</p>}
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-2">
                <label htmlFor="mensaje" className={labelClass}>{tf("message")}</label>
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
                    {tf.rich("privacy", {
                      link: (chunks) => <Link href="/privacy" className="underline hover:text-nexo-orange">{chunks}</Link>,
                    })}
                  </p>
                </div>
                {errors.privacidad && <p className="font-body text-sm text-red-500">{errors.privacidad.message}</p>}
              </div>

              {/* Error global */}
              {apiError && <p className="font-body text-sm text-red-500">{apiError}</p>}
            </div>

            {/* ── Mobile: método de pago ── */}
            <div className="flex flex-col gap-4 lg:hidden">
              <h2 className="font-heading text-[22px] font-bold uppercase tracking-wide text-nexo-orange lg:text-2xl">
                {tf("paymentMethod")}
              </h2>
              <p className="font-body text-base leading-5 text-nexo-dark">
                {tf("paymentDescription")}
              </p>

              {/* Bloque oscuro solo con datos bancarios */}
              <div className="flex flex-col gap-2 rounded-lg bg-[#262626] p-[10px]">
                <p className="font-body text-base leading-5 text-[#fbfbfb]">
                  <span className="font-semibold">IBAN: </span>
                  ES92 0081 0297 1800 0179 5488
                </p>
                <p className="font-body text-base leading-5 text-[#fbfbfb]">
                  <span className="font-semibold">{tf("paymentData.name")}: </span>
                  TURIA BOX SOCIEDAD LIMITADA
                </p>
                <p className="font-body text-base leading-5 text-[#fbfbfb]">
                  <span className="font-semibold">Swift: </span>
                  BSAB ESBB
                </p>
                <p className="font-body text-base leading-5 text-[#fbfbfb]">
                  <span className="font-semibold">{tf("paymentData.concept")}: </span>
                  {tf("paymentData.conceptValue")}
                </p>
              </div>

              {/* Upload comprobante */}
              <div className="flex flex-col gap-2">
                <p className="font-body text-base leading-5 text-nexo-dark">
                  {tf("uploadProof")}
                </p>
                <FileUploadField
                  fileName={fileName}
                  onFileSelect={(files) => setValue("comprobante", files, { shouldValidate: isSubmitted })}
                  onFileClear={() => setValue("comprobante", undefined, { shouldValidate: isSubmitted })}
                  hasError={!!errors.comprobante}
                />
                {errors.comprobante && (
                  <p className="font-body text-sm text-red-500">
                    {errors.comprobante.message as string}
                  </p>
                )}
              </div>

              <p className="font-body text-sm leading-5 text-nexo-dark">
                {paymentContactRich}
              </p>
            </div>

            {/* ── Desktop: método de pago (dark card) ── */}
            <div className="hidden lg:flex flex-col gap-4 rounded-lg border border-[#262626] bg-white p-6 lg:w-[480px] lg:shrink-0">
              <div className="flex flex-col gap-4">
                <h2 className="font-heading text-[22px] font-bold uppercase tracking-wide text-nexo-orange lg:text-2xl">
                  {tf("paymentMethod")}
                </h2>
                <p className="font-body text-base leading-5 text-nexo-dark">
                  {tf("paymentDescription")}
                </p>
                <div className="flex flex-col gap-2 rounded-lg bg-[#262626] p-[10px]">
                  <p className="font-body text-base leading-5 text-[#fbfbfb]">
                    <span className="font-semibold">IBAN: </span>
                    ES92 0081 0297 1800 0179 5488
                  </p>
                  <p className="font-body text-base leading-5 text-[#fbfbfb]">
                    <span className="font-semibold">{tf("paymentData.name")}: </span>
                    TURIA BOX SOCIEDAD LIMITADA
                  </p>
                  <p className="font-body text-base leading-5 text-[#fbfbfb]">
                    <span className="font-semibold">Swift: </span>
                    BSAB ESBB
                  </p>
                  <p className="font-body text-base leading-5 text-[#fbfbfb]">
                    <span className="font-semibold">{tf("paymentData.concept")}: </span>
                    {tf("paymentData.conceptValue")}
                  </p>
                </div>

                {/* Upload comprobante */}
                <div className="flex flex-col gap-2">
                  <p className="font-body text-base font-semibold leading-6 text-nexo-dark">
                    {tf("uploadProof")}
                  </p>
                  <FileUploadField
                    fileName={fileName}
                    onFileSelect={(files) => setValue("comprobante", files, { shouldValidate: isSubmitted })}
                    onFileClear={() => setValue("comprobante", undefined, { shouldValidate: isSubmitted })}
                    hasError={!!errors.comprobante}
                  />
                  {errors.comprobante && (
                    <p className="font-body text-sm text-red-500">
                      {errors.comprobante.message as string}
                    </p>
                  )}
                </div>

                <p className="font-body text-base leading-5 text-nexo-dark">
                  {paymentContactRich}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? tf("submitting") : tf("submit")}
                {!isSubmitting && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>

          </div>

          {/* ── Mobile: botón submit ── */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="lg:hidden mt-6 flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? tf("submitting") : tf("submit")}
            {!isSubmitting && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function OnRampBookingPage() {
  return (
    <Suspense>
      <OnRampBookingContent />
    </Suspense>
  );
}
