"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  const router = useRouter();
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
    router.push("/contact/confirm");
  }

  return (
    <main className="bg-[#fbfbfb]">
      <div
        className="block md:hidden"
      >
        <PageHero title="Contacta con nosotros" />
      </div>

      <div className="hidden md:block">
        <PageHero title="Contacta con nosotros" imageSrc="/bg-contacto-des.webp" />
      </div>

      {/* Main content — mobile: columna | desktop: dos columnas (form izq, info der) */}
      <div className="flex flex-col gap-6 px-6 py-6 lg:flex-row lg:items-start lg:gap-12 lg:px-[118px] lg:py-16">

        {/* Columna derecha en desktop (intro + info card) — en mobile aparece primero */}
        <div className="flex flex-col gap-4 lg:order-last lg:flex-1">
          {/* Intro */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-[20px] font-semibold leading-5 text-nexo-dark lg:hidden">
              ¿Necesitas ayuda?
            </p>
            <p className="font-body text-base leading-5 text-nexo-dark">
              <span className="lg:hidden">
                Escríbenos por formulario, email o WhatsApp y te contestamos lo antes posible.
              </span>
              <span className="hidden lg:inline">
                ¿Necesitas ayuda? Puedes escribirnos a través de nuestro formulario, enviarnos un email o hablarnos directamente por WhatsApp. Elige la opción que te resulte más cómoda y te contestaremos lo antes posible.
              </span>
            </p>
          </div>

          {/* Info card */}
          <div className="flex flex-col gap-2 rounded-lg bg-[#262626] p-6 lg:rounded-[16px] lg:gap-3">
            {/* Título — solo desktop */}
            <p className="hidden font-heading text-[24px] font-bold uppercase tracking-[0.72px] text-nexo-orange lg:block">
              CONTACTO
            </p>

            {/* Email */}
            <a
              href="mailto:info@nexocrossfit.es"
              className="font-body text-sm leading-5 text-[#fbfbfb] lg:text-base lg:underline"
            >
              info@nexocrossfit.es
            </a>

            {/* WhatsApp */}
            <div className="flex items-center gap-1.5">
              {/* Icono WhatsApp — solo desktop */}
              <svg
                className="hidden h-5 w-5 shrink-0 lg:block"
                viewBox="0 0 24 24"
                fill="#25D366"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <p className="font-body text-sm leading-5 text-[#fbfbfb] lg:text-base">
                <span className="font-semibold">WhatsApp:</span> 661 388 984
              </p>
            </div>

            {/* Dirección */}
            <p className="font-body text-sm leading-5 text-[#fbfbfb] lg:text-base">
              Dirección: Arzobispo Fabián y Fuero, 21. Valencia, 46009.
            </p>
          </div>
        </div>

        {/* Formulario — en desktop aparece a la izquierda */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:order-first lg:flex-1">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="font-body text-base leading-5 text-nexo-dark">
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
            <label htmlFor="telefono" className="font-body text-base leading-5 text-nexo-dark">
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="(+34) 000 000 000"
              value={form.telefono}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-body text-base leading-5 text-nexo-dark">
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

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label htmlFor="mensaje" className="font-body text-base leading-5 text-nexo-dark">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              placeholder="Escribe tu mensaje aquí..."
              value={form.mensaje}
              onChange={handleChange}
              required
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
              className={`relative mt-0.5 h-[26px] w-[42px] shrink-0 overflow-hidden rounded-full transition-colors duration-200 ${privacyAccepted ? "bg-nexo-orange" : "bg-[#cac4d0]"
                }`}
            >
              <span
                className={`absolute left-0 top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${privacyAccepted ? "translate-x-[19px]" : "translate-x-[3px]"
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
            disabled={!privacyAccepted}
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
        </form>
      </div>
    </main>
  );
}
