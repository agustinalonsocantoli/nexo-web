"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";

const FECHAS = [
  { value: "enero", label: "Enero (12/01 - 04/02)" },
  { value: "febrero", label: "Febrero (16/02 - 11/03)" },
];

export default function OnRampBookingPage() {
  const router = useRouter();
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!privacyAccepted) return;
    router.push("/on-ramp/booking/confirm");
  }

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title="Reserva plaza curso On Ramp" />

      {/* Formulario */}
      <div className="px-6 py-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Fecha inicio */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fecha"
              className="font-body text-base leading-5 text-nexo-dark"
            >
              Fecha inicio curso On Ramp
            </label>
            <div className="relative w-full">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#878787]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
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
                <option value="" disabled>
                  Selecciona una fecha
                </option>
                {FECHAS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#878787]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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

          {/* Mail */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-body text-base leading-5 text-nexo-dark"
            >
              Mail
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

          {/* DNI */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="dni"
              className="font-body text-base leading-5 text-nexo-dark"
            >
              DNI
            </label>
            <input
              id="dni"
              name="dni"
              type="text"
              placeholder="00000000X"
              value={form.dni}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fechaNacimiento"
              className="font-body text-base leading-5 text-nexo-dark"
            >
              Fecha de nacimiento
            </label>
            <input
              id="fechaNacimiento"
              name="fechaNacimiento"
              type="date"
              value={form.fechaNacimiento}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#cac4d0] bg-white px-4 py-2 font-body text-sm text-nexo-dark focus:border-nexo-orange focus:outline-none"
            />
          </div>

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
              className={`relative mt-0.5 h-[26px] w-[42px] shrink-0 rounded-full transition-colors duration-200 ${
                privacyAccepted ? "bg-nexo-orange" : "bg-[#cac4d0]"
              }`}
            >
              <span
                className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  privacyAccepted ? "translate-x-[18px]" : "translate-x-[3px]"
                }`}
              />
            </button>
            <p className="font-body text-base leading-5 text-nexo-dark">
              Al hacer clic, acepto las condiciones de privacidad
            </p>
          </div>

          {/* Botón siguiente */}
          <button
            type="submit"
            disabled={!privacyAccepted}
            className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
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
