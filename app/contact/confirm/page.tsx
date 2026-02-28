import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ContactConfirmPage() {
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

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-[72px] lg:py-20">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="font-body text-[32px] leading-tight text-nexo-dark">
            ¡Hemos recibido tu mensaje!
          </p>
          <p className="max-w-sm font-body text-base leading-5 text-nexo-dark lg:max-w-xl">
            Gracias por ponerte en contacto con nosotros. Hemos recibido tu
            mensaje y pronto te responderemos por mail o nos pondremos en
            contacto contigo para ayudarte.
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
