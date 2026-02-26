"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";

export default function OnRampPaymentPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/on-ramp/booking/confirm");
  }

  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title="Reserva plaza curso On Ramp" />

      {/* Contenido */}
      <div className="px-6 py-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Título */}
          <p className="font-body text-[20px] font-semibold leading-5 text-nexo-dark">
            Método de pago
          </p>

          {/* Descripción */}
          <p className="font-body text-base leading-5 text-nexo-dark">
            Para confirmar tu plaza en el curso, el pago se realiza mediante{" "}
            <span className="font-semibold">transferencia bancaria</span> al
            siguiente número de cuenta. Después deberás adjuntar el{" "}
            <span className="font-semibold">justificante de pago</span> para
            que tu inscripción quede confirmada.
          </p>

          {/* Tarjeta con datos bancarios */}
          <div className="rounded-lg bg-[#262626] p-4 flex flex-col gap-2">
            <p className="font-body text-base leading-6 text-[#fbfbfb]">
              <span className="font-semibold">IBAN: </span>
              ES92 0081 0297 1800 0179 5488
            </p>
            <p className="font-body text-base leading-6 text-[#fbfbfb]">
              <span className="font-semibold">Nombre: </span>
              TURIA BOX SOCIEDAD LIMITADA
            </p>
            <p className="font-body text-base leading-6 text-[#fbfbfb]">
              <span className="font-semibold">Swift: </span>
              BSAB ESBB
            </p>
            <p className="font-body text-base leading-6 text-[#fbfbfb]">
              <span className="font-semibold">Concepto: </span>
              On Ramp – mes elegido
            </p>
          </div>

          {/* Subida de comprobante */}
          <div className="flex flex-col gap-2">
            <label className="font-body text-base leading-5 text-nexo-dark">
              Adjunta el comprobante de pago
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center gap-3 rounded-lg border border-[#cac4d0] bg-white px-4 py-2 text-left transition-colors hover:border-nexo-orange"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0 text-nexo-orange"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                />
              </svg>
              <span className="font-body text-sm text-[#878787]">
                {fileName ?? "JPG o PNG"}
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Texto de soporte */}
          <p className="font-body text-base leading-5 text-nexo-dark">
            Si tienes cualquier duda durante el proceso, escríbenos a{" "}
            <a
              href="mailto:info@nexocrossfit.es"
              className="underline hover:text-nexo-orange"
            >
              info@nexocrossfit.es
            </a>{" "}
            o hablanos por Whatsapp{" "}
            <a
              href="https://wa.me/34661388984"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-nexo-orange"
            >
              661 388 984
            </a>{" "}
            y te ayudaremos lo antes posible.
          </p>

          {/* Botón enviar */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
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
