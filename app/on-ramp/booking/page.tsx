"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";

const FECHAS = [
  { value: "febrero", label: "Febrero (16/02 - 11/03)" },
  { value: "marzo", label: "Marzo (23/03 - 16/04)" },
  { value: "abril", label: "Abril (20/04 - 13/05)" },
];

const inputClass =
  "w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none";

const labelClass = "font-body text-base leading-5 text-nexo-dark";

export default function OnRampBookingPage() {
  const router = useRouter();
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [form, setForm] = useState({
    fecha: "",
    nombre: "",
    email: "",
    telefono: "",
    dni: "",
    fechaNacimiento: "",
    mensaje: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.files?.[0]?.name ?? "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!privacyAccepted) return;
    router.push("/on-ramp/booking/confirm");
  }

  return (
    <main className="bg-[#fbfbfb]">
      <div
        className="block md:hidden"
      >
        <PageHero title="Formulario reserva plaza curso On Ramp" />
      </div>

      <div className="hidden md:block">
        <PageHero title="Formulario reserva plaza curso On Ramp" imageSrc="/bg-form-des.webp" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-[72px] lg:py-12">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">

            {/* ── Columna izquierda: campos del formulario ── */}
            <div className="flex flex-1 flex-col gap-4">

              {/* Fecha inicio */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fecha" className={labelClass}>
                  Fecha inicio curso On Ramp
                </label>
                <div className="relative w-full">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#878787]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </span>
                  <select
                    id="fecha"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none rounded-lg border border-[#cac4d0] bg-white py-2 pl-10 pr-10 font-body text-sm text-nexo-dark focus:border-nexo-orange focus:outline-none"
                  >
                    <option value="" disabled>Selecciona una fecha</option>
                    {FECHAS.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#878787]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Nombre */}
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className={labelClass}>Nombre Completo</label>
                <input id="nombre" name="nombre" type="text" placeholder="Pedro Pérez" value={form.nombre} onChange={handleChange} required className={inputClass} />
              </div>

              {/* Mail */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClass}>Mail</label>
                <input id="email" name="email" type="email" placeholder="pedropérez@gmail.com" value={form.email} onChange={handleChange} required className={inputClass} />
              </div>

              {/* Teléfono */}
              <div className="flex flex-col gap-2">
                <label htmlFor="telefono" className={labelClass}>Teléfono</label>
                <input id="telefono" name="telefono" type="tel" placeholder="(+34) 000 000 000" value={form.telefono} onChange={handleChange} required className={inputClass} />
              </div>

              {/* DNI */}
              <div className="flex flex-col gap-2">
                <label htmlFor="dni" className={labelClass}>DNI</label>
                <input id="dni" name="dni" type="text" placeholder="00000000X" value={form.dni} onChange={handleChange} required className={inputClass} />
              </div>

              {/* Fecha de nacimiento */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fechaNacimiento" className={labelClass}>Fecha de nacimiento</label>
                <input id="fechaNacimiento" name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} required className={inputClass} />
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-2">
                <label htmlFor="mensaje" className={labelClass}>Mensaje</label>
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
            </div>

            {/* ── Columna derecha: método de pago ── */}
            <div className="flex flex-col gap-4 rounded-lg bg-[#262626] p-6 lg:w-[480px] lg:shrink-0">
              <div className="flex flex-col gap-4">
                <h2 className="font-heading text-[24px] font-bold uppercase tracking-[0.72px] text-nexo-orange">
                  Método de pago
                </h2>

                <p className="font-body text-base leading-5 text-[#fbfbfb]">
                  Para confirmar tu plaza en el curso, el pago se realiza mediante transferencia bancaria al siguiente número de cuenta. Después deberás adjuntar el justificante de pago para que tu inscripción quede confirmada.
                </p>

                <div className="flex flex-col gap-2">
                  <p className="font-body text-base leading-5 text-[#fbfbfb]">
                    <span className="font-semibold">IBAN: </span>
                    ES92 0081 0297 1800 0179 5488
                  </p>
                  <p className="font-body text-base leading-5 text-[#fbfbfb]">
                    <span className="font-semibold">Nombre: </span>
                    TURIA BOX SOCIEDAD LIMITADA
                  </p>
                  <p className="font-body text-base leading-5 text-[#fbfbfb]">
                    <span className="font-semibold">Swift: </span>
                    BSAB ESBB
                  </p>
                  <p className="font-body text-base leading-5 text-[#fbfbfb]">
                    <span className="font-semibold">Concepto: </span>
                    On Ramp – mes elegido
                  </p>
                </div>

                {/* Upload comprobante */}
                <div className="flex flex-col gap-2">
                  <p className="font-body text-base font-semibold leading-6 text-[#fbfbfb]">
                    Adjunta el comprobante de pago
                  </p>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#fbfbfb] px-4 py-2 transition-colors hover:border-nexo-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-[#878787]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className="font-body text-sm text-[#878787] truncate">
                      {fileName || "JPG o PNG"}
                    </span>
                    <input type="file" accept=".jpg,.jpeg,.png" className="sr-only" onChange={handleFileChange} />
                  </label>
                </div>

                <p className="font-body text-base leading-5 text-[#fbfbfb]">
                  Si tienes cualquier duda durante el proceso, escríbenos a{" "}
                  <a href="mailto:info@nexocrossfit.es" className="underline decoration-solid">
                    info@nexocrossfit.es
                  </a>{" "}
                  o háblanos por WhatsApp{" "}
                  <a href="tel:+34661388984" className="underline decoration-solid">
                    661 388 984
                  </a>{" "}
                  y te ayudaremos lo antes posible.
                </p>
              </div>

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
            </div>

          </div>
        </form>
      </div>
    </main>
  );
}
