import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function ContactConfirmPage() {
  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title="Contacta con nosotros" />

      {/* Confirmación */}
      <div className="flex flex-col items-center gap-5 px-6 py-10 text-center">
        <p className="font-body text-[32px] leading-tight text-nexo-dark">
          ¡Hemos recibido tu mensaje!
        </p>
        <p className="font-body text-base leading-5 text-nexo-dark max-w-xs">
          Muy pronto te responderemos por mail o nos pondremos en contacto
          contigo para ayudarte.
        </p>
        <Link
          href="/"
          className="flex items-center justify-center rounded-lg bg-nexo-orange px-8 py-2.5 font-body text-sm text-white transition-opacity hover:opacity-90"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
