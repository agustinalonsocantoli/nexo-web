"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import PhoneField from "@/components/PhoneField";
import FileUploadField from "@/components/FileUploadField";

function createCrossfitSchema(t: (key: string) => string) {
  return z
    .object({
      firstTime: z.enum(["si", "no"], { message: t("firstTimeRequired") }),
      nombre: z.string().min(2, t("nameMin")),
      email: z.string().email(t("emailInvalid")),
      telefono: z.string().min(1, t("phoneRequired")).refine(isValidPhoneNumber, t("phoneInvalid")),
      mensaje: z.string().min(10, t("messageMin")),
      privacidad: z.boolean().refine((v) => v, t("privacyRequired")),
      fechaCurso: z.string().optional(),
      dni: z.string().optional(),
      fechaNacimiento: z.string().optional(),
      comprobante: z.any().optional(),
      boxEntrenado: z.string().optional(),
      tiempoEntrenado: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.firstTime === "si") {
        if (!data.fechaCurso) {
          ctx.addIssue({ code: "custom", path: ["fechaCurso"], message: t("courseDateRequired") });
        }
        if (!data.dni) {
          ctx.addIssue({ code: "custom", path: ["dni"], message: t("dniRequired") });
        }
        if (!data.fechaNacimiento) {
          ctx.addIssue({ code: "custom", path: ["fechaNacimiento"], message: t("birthDateRequired") });
        }
        if (!(data.comprobante instanceof FileList) || data.comprobante.length === 0) {
          ctx.addIssue({ code: "custom", path: ["comprobante"], message: t("proofRequired") });
        }
      }
      if (data.firstTime === "no") {
        if (!data.boxEntrenado) {
          ctx.addIssue({ code: "custom", path: ["boxEntrenado"], message: t("fieldRequired") });
        }
        if (!data.tiempoEntrenado) {
          ctx.addIssue({ code: "custom", path: ["tiempoEntrenado"], message: t("fieldRequired") });
        }
      }
    });
}

type FormData = z.infer<ReturnType<typeof createCrossfitSchema>>;

function getOnRampFaqs(t: (key: string) => string) {
  return [
    { question: t('onrampFaqs.0.question'), answer: t('onrampFaqs.0.answer') },
    { question: t('onrampFaqs.1.question'), answer: t('onrampFaqs.1.answer') },
  ];
}

function getCrossfitFaqs(t: (key: string) => string) {
  return [
    { question: t('crossfitFaqs.0.question'), answer: t('crossfitFaqs.0.answer') },
    { question: t('crossfitFaqs.1.question'), answer: t('crossfitFaqs.1.answer') },
  ];
}

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none";

export default function CrossfitForm({ fechasOnRamp }: { fechasOnRamp: { value: string; label: string }[] }) {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const tf = useTranslations("forms");
  const tv = useTranslations("validation");
  const tc = useTranslations("crossfit");

  const schema = createCrossfitSchema(tv);

  const {
    register,
    control,
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
  const comprobanteFiles = watch("comprobante") as FileList | undefined;
  const fileName = comprobanteFiles?.[0]?.name ?? "";

  function selectFirstTime(val: "si" | "no") {
    setValue("firstTime", val, { shouldValidate: isSubmitted });
    clearErrors(["fechaCurso", "dni", "fechaNacimiento", "comprobante", "boxEntrenado", "tiempoEntrenado"]);
    setOpenFaq(null);
  }

  function toggleFaq(i: number) {
    setOpenFaq((prev) => (prev === i ? null : i));
  }

  async function onSubmit(data: FormData) {
    setApiError(null);
    try {
      let res: Response;

      if (data.firstTime === "si") {
        // Mismo flujo que on-ramp
        let comprobante: { content: string; filename: string } | undefined;
        if (data.comprobante instanceof FileList && data.comprobante.length > 0) {
          const file = data.comprobante[0];
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve((reader.result as string).split(",")[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          comprobante = { content: base64, filename: file.name };
        }
        res = await fetch("/api/send/onramp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fecha: data.fechaCurso,
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono,
            dni: data.dni,
            fechaNacimiento: data.fechaNacimiento,
            mensaje: data.mensaje,
            comprobante,
          }),
        });
      } else {
        res = await fetch("/api/send/class", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: "CrossFit - Clase de prueba",
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono,
            mensaje: data.mensaje,
            boxEntrenado: data.boxEntrenado,
            tiempoEntrenado: data.tiempoEntrenado,
          }),
        });
      }

      if (!res.ok) throw new Error("Error al enviar");
      router.push("/class/crossfit/confirm");
    } catch {
      setApiError(tf("apiError"));
    }
  }

  const activeFaqs = firstTime === "si" ? getOnRampFaqs(tc) : getCrossfitFaqs(tc);

  const card = firstTime != null ? (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-lg bg-[#262626] p-4 lg:p-6">
        <h2 className="font-heading text-[22px] font-bold uppercase tracking-wide text-nexo-orange lg:text-2xl">
          {firstTime === "si" ? tf("onRampTitle") : tf("crossfitClassesTitle")}
        </h2>

        <p className="font-body text-base leading-5 text-[#fbfbfb]">
          {firstTime === "si" ? tf("onRampDescriptionSi") : tf("crossfitDescriptionNo")}
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
                  className={`mt-1 h-6 w-6 shrink-0 text-nexo-orange transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <p className="mt-2 font-body text-base leading-6 text-[#fbfbfb]">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {firstTime === "si" && (
        <div className="hidden lg:flex flex-col gap-4 rounded-lg border border-[#262626] bg-white p-6">
          <h3 className="font-heading text-[22px] font-bold uppercase tracking-wide text-nexo-orange lg:text-2xl">
            {tf("paymentMethod")}
          </h3>
          <p className="font-body text-base leading-5 text-nexo-dark">
            {tf("paymentDescription")}
          </p>
          <div className="flex flex-col gap-2 rounded-lg bg-[#262626] p-3">
            <p className="font-body text-base leading-5 text-[#fbfbfb]">
              <span className="font-semibold">IBAN: </span>ES92 0081 0297 1800 0179 5488
            </p>
            <p className="font-body text-base leading-5 text-[#fbfbfb]">
              <span className="font-semibold">{tf("paymentData.name")}: </span>TURIA BOX SOCIEDAD LIMITADA
            </p>
            <p className="font-body text-base leading-5 text-[#fbfbfb]">
              <span className="font-semibold">Swift: </span>BSAB ESBB
            </p>
            <p className="font-body text-base leading-5 text-[#fbfbfb]">
              <span className="font-semibold">{tf("paymentData.concept")}: </span>{tf("paymentData.conceptValue")}
            </p>
          </div>
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
          <p className="font-body text-sm leading-5 text-nexo-dark">
            {tf.rich("paymentContact", {
              email: (chunks) => <a href="mailto:info@nexocrossfit.es" className="underline decoration-solid">{chunks}</a>,
              phone: (chunks) => <a href="https://wa.me/34661388984" target="_blank" rel="noopener noreferrer" className="underline decoration-solid">{chunks}</a>,
            })}
          </p>
        </div>
      )}
    </div>
  ) : null;

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title={tc('heroTitle')} titlePart2={tc('heroTitlePart2')} imageSrc="/bg-form-des.jpg" />

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-[72px] lg:py-12">
        <h2 className="mb-4 font-heading text-[16px] font-bold uppercase leading-[1.05] tracking-[0.02em] text-nexo-dark sm:text-[20px] lg:text-[24px]">
          {tf("bookingHeading")}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-0 lg:items-start"
        >
          {/* Pregunta Sí / No — col 1, row 1 */}
          <div className="flex flex-col gap-2 lg:col-start-1 lg:row-start-1 lg:pb-4">
            <p className="font-body text-base leading-5 text-nexo-dark">
              {tf("firstTimeQuestion")}
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
                    {val === "si" ? tf("yes") : tf("no")}
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
          </div>

          {/* Card — móvil: flujo normal; desktop: col 2 abarca ambas filas */}
          {card && (
            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              {card}
            </div>
          )}

          {/* Campos del formulario — col 1, row 2 en desktop */}
          <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-2">

            {/* ── SI: fecha inicio (primero, con ícono calendario) ── */}
            {firstTime === "si" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="fechaCurso" className="font-body text-base leading-5 text-nexo-dark">
                  {tf("courseDate")}
                </label>
                <div className="relative w-full">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#878787]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </span>
                  <select
                    id="fechaCurso"
                    {...register("fechaCurso")}
                    className={`w-full appearance-none rounded-lg border bg-white py-2 pl-10 pr-10 font-body text-sm text-nexo-dark focus:border-nexo-orange focus:outline-none ${errors.fechaCurso ? "border-red-500" : "border-[#cac4d0]"}`}
                  >
                    <option value="">{tf("courseDatePlaceholder")}</option>
                    {fechasOnRamp.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
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

            {/* ── NO: campos de experiencia previa ── */}
            {firstTime === "no" && (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="boxEntrenado" className="font-body text-base leading-5 text-nexo-dark">
                    {tf("previousBox")}
                  </label>
                  <input
                    id="boxEntrenado"
                    type="text"
                    placeholder={tf("previousBoxPlaceholder")}
                    {...register("boxEntrenado")}
                    className={`${inputBase} ${errors.boxEntrenado ? "border-red-500" : "border-[#cac4d0]"}`}
                  />
                  {errors.boxEntrenado && <p className="font-body text-sm text-red-500">{errors.boxEntrenado.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="tiempoEntrenado" className="font-body text-base leading-5 text-nexo-dark">
                    {tf("trainingTime")}
                  </label>
                  <input
                    id="tiempoEntrenado"
                    type="text"
                    placeholder={tf("trainingTimePlaceholder")}
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

            {/* Teléfono */}
            <div className="flex flex-col gap-2">
              <label htmlFor="telefono" className="font-body text-base leading-5 text-nexo-dark">
                {tf("phone")}
              </label>
              <PhoneField control={control} name="telefono" error={errors.telefono} id="telefono" />
              {errors.telefono && <p className="font-body text-sm text-red-500">{tf("phoneError")}</p>}
            </div>

            {/* DNI — solo SI */}
            {firstTime === "si" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="dni" className="font-body text-base leading-5 text-nexo-dark">{tf("dni")}</label>
                <input
                  id="dni"
                  type="text"
                  placeholder={tf("dniPlaceholder")}
                  {...register("dni")}
                  className={`${inputBase} ${errors.dni ? "border-red-500" : "border-[#cac4d0]"}`}
                />
                {errors.dni && <p className="font-body text-sm text-red-500">{errors.dni.message}</p>}
              </div>
            )}

            {/* Fecha de nacimiento — solo SI */}
            {firstTime === "si" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="fechaNacimiento" className="font-body text-base leading-5 text-nexo-dark">{tf("birthDate")}</label>
                <input
                  id="fechaNacimiento"
                  type="date"
                  {...register("fechaNacimiento")}
                  className={`appearance-none ${inputBase} ${errors.fechaNacimiento ? "border-red-500" : "border-[#cac4d0]"}`}
                />
                {errors.fechaNacimiento && <p className="font-body text-sm text-red-500">{errors.fechaNacimiento.message}</p>}
              </div>
            )}

            {/* Mensaje */}
            <div className="flex flex-col gap-2">
              <label htmlFor="mensaje" className="font-body text-base leading-5 text-nexo-dark">{tf("message")}</label>
              <textarea
                id="mensaje"
                rows={4}
                placeholder={tf("messagePlaceholder")}
                suppressHydrationWarning
                {...register("mensaje")}
                className={`w-full resize-none rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none ${errors.mensaje ? "border-red-500" : "border-[#cac4d0]"}`}
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
                  className={`relative h-[26px] w-[42px] shrink-0 overflow-hidden rounded-full transition-colors duration-200 ${privacidad ? "bg-nexo-orange" : "bg-[#cac4d0]"}`}
                >
                  <span className={`absolute left-0 top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${privacidad ? "translate-x-[19px]" : "translate-x-[3px]"}`} />
                </button>
                <p className="font-body text-base leading-5 text-nexo-dark">
                  {tf.rich("privacy", {
                    link: (chunks) => <Link href="/privacy" className="underline hover:text-nexo-orange">{chunks}</Link>,
                  })}
                </p>
              </div>
              {errors.privacidad && <p className="font-body text-sm text-red-500">{errors.privacidad.message}</p>}
            </div>

            {/* ── Mobile: sección de pago (solo SI, solo mobile) ── */}
            {firstTime === "si" && (
              <div className="flex flex-col gap-4 lg:hidden">
                <h2 className="font-body text-[20px] font-semibold text-nexo-dark">{tf("paymentMethod")}</h2>
                <p className="font-body text-base leading-5 text-nexo-dark">
                  {tf("paymentDescription")}
                </p>
                <div className="flex flex-col gap-2 rounded-lg bg-[#262626] p-[10px]">
                  <p className="font-body text-base leading-5 text-[#fbfbfb]"><span className="font-semibold">IBAN: </span>ES92 0081 0297 1800 0179 5488</p>
                  <p className="font-body text-base leading-5 text-[#fbfbfb]"><span className="font-semibold">{tf("paymentData.name")}: </span>TURIA BOX SOCIEDAD LIMITADA</p>
                  <p className="font-body text-base leading-5 text-[#fbfbfb]"><span className="font-semibold">Swift: </span>BSAB ESBB</p>
                  <p className="font-body text-base leading-5 text-[#fbfbfb]"><span className="font-semibold">{tf("paymentData.concept")}: </span>{tf("paymentData.conceptValue")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-body text-base leading-5 text-nexo-dark">{tf("uploadProof")}</p>
                  <FileUploadField
                    fileName={fileName}
                    onFileSelect={(files) => setValue("comprobante", files, { shouldValidate: isSubmitted })}
                    onFileClear={() => setValue("comprobante", undefined, { shouldValidate: isSubmitted })}
                    hasError={!!errors.comprobante}
                  />
                  {errors.comprobante && <p className="font-body text-sm text-red-500">{errors.comprobante.message as string}</p>}
                </div>
                <p className="font-body text-sm leading-5 text-nexo-dark">
                  {tf.rich("paymentContact", {
                    email: (chunks) => <a href="mailto:info@nexocrossfit.es" className="underline decoration-solid">{chunks}</a>,
                    phone: (chunks) => <a href="https://wa.me/34661388984" target="_blank" rel="noopener noreferrer" className="underline decoration-solid">{chunks}</a>,
                  })}
                </p>
              </div>
            )}

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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
