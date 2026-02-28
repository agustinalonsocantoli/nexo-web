"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Faq {
  question: string;
  answer: React.ReactNode;
}

interface ClassBookingFormProps {
  title: string;
  description: string;
  faqs: Faq[];
  redirectTo: string;
}

const inputClass =
  "w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none";

export default function ClassBookingForm({
  title,
  description,
  faqs,
  redirectTo,
}: ClassBookingFormProps) {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!privacyAccepted) return;
    router.push(redirectTo);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-[72px] lg:py-12">
      {/*
        Mobile:  flex-col-reverse → info card on top, form below
        Desktop: flex-row         → form on left, info card on right
      */}
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-start lg:gap-12">

        {/* ── Columna izquierda (desktop): formulario ── */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="font-body text-base leading-5 text-nexo-dark">
              Nombre Completo
            </label>
            <input id="nombre" name="nombre" type="text" placeholder="Pedro Pérez" value={form.nombre} onChange={handleChange} required className={inputClass} />
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-2">
            <label htmlFor="telefono" className="font-body text-base leading-5 text-nexo-dark">
              Teléfono
            </label>
            <input id="telefono" name="telefono" type="tel" placeholder="(+34) 000 000 000" value={form.telefono} onChange={handleChange} required className={inputClass} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-body text-base leading-5 text-nexo-dark">
              Correo electrónico
            </label>
            <input id="email" name="email" type="email" placeholder="pedropérez@gmail.com" value={form.email} onChange={handleChange} required className={inputClass} />
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label htmlFor="mensaje" className="font-body text-base leading-5 text-nexo-dark">
              Mensaje
            </label>
            <textarea id="mensaje" name="mensaje" rows={4} placeholder="Escribe tu mensaje aquí..." value={form.mensaje} onChange={handleChange} className="w-full resize-none rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none" />
          </div>

          {/* Toggle privacidad */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={privacyAccepted}
              onClick={() => setPrivacyAccepted(!privacyAccepted)}
              className={`relative mt-0.5 h-[26px] w-[42px] shrink-0 overflow-hidden rounded-full transition-colors duration-200 ${privacyAccepted ? "bg-nexo-orange" : "bg-[#cac4d0]"}`}
            >
              <span className={`absolute left-0 top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${privacyAccepted ? "translate-x-[19px]" : "translate-x-[3px]"}`} />
            </button>
            <p className="font-body text-base leading-5 text-nexo-dark">
              Al hacer clic, acepto las condiciones de privacidad
            </p>
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            disabled={!privacyAccepted}
            className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Enviar
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
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
