import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ClassConfirmPage() {
  return (
    <main className="bg-[#fbfbfb]">
      <div
        className="block md:hidden"
      >
        <PageHero title="Reserva tu clase de prueba" />
      </div>

      <div className="hidden md:block">
        <PageHero title="Reserva tu clase de prueba" imageSrc="/bg-form-des.webp" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-[72px] lg:py-20">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="font-body text-[32px] leading-tight text-nexo-dark">
            ¡Hemos recibido tu formulario!
          </p>
          <p className="max-w-sm font-body text-base leading-5 text-nexo-dark lg:max-w-xl">
            Gracias por enviar tu formulario. En breve nos pondremos en contacto
            contigo mediante WhatsApp para confirmar los detalles de tu clase de
            prueba.
          </p>
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
