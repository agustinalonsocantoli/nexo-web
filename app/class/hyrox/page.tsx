import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ClassBookingForm from "@/components/class/ClassBookingForm";

export const metadata: Metadata = {
  title: "Clases de HYROX en Valencia",
  description:
    "Clases de HYROX en Valencia para todos los niveles. Entrena resistencia y fuerza con coaches especializados. Sin experiencia previa necesaria. Cuota mensual desde 75€.",
  openGraph: {
    title: "Clases de HYROX en Valencia | Nexo CrossFit",
    description:
      "HYROX en Valencia para todos los niveles. Coaches especializados, clases adaptadas y comunidad motivadora. Desde 75€/mes.",
    url: "https://nexocrossfit.es//class/hyrox",
  },
  alternates: {
    canonical: "https://nexocrossfit.es//class/hyrox",
  },
};

const FAQS = [
  {
    question: "¿Cuánto cuestan las clases?",
    answer: (
      <>
        <span className="font-semibold">75€/mes</span> con{" "}
        <span className="font-semibold">acceso ilimitado</span> únicamente a las
        clases de HYROX.
      </>
    ),
  },
  {
    question: "¿Cuánto duran las clases?",
    answer: (
      <>
        Clase de cardio de <span className="font-semibold">45 minutos</span> que
        utiliza principalmente máquinas, movimientos básicos y ocasionalmente
        carrera. Diseñada para{" "}
        <span className="font-semibold">
          mejorar la capacidad aeróbica y la resistencia cardiovascular
        </span>
        . Ideal también para quienes desean mejorar su condición física general
        sin adentrarse aún en el CrossFit.
      </>
    ),
  },
];

export default function HyroxPage() {
  return (
    <main className="bg-[#fbfbfb]">
      <div
        className="block md:hidden"
      >
        <PageHero title="Reserva tu clase de prueba" />
      </div>

      <div className="hidden md:block">
        <PageHero title="Reserva tu clase de prueba" imageSrc="/bg-hyrox-des.webp" />
      </div>

      {/* Info + formulario */}
      <ClassBookingForm
        title="Clases HYROX"
        description="No hace falta tener experiencia previa para unirte a las clases de HYROX. Nuestros entrenamientos se adaptan a todos los niveles, desde principiantes hasta los más avanzados. Cada sesión está diseñada para que disfrutes, avances y te superes a tu propio ritmo."
        faqs={FAQS}
        redirectTo="/booking/confirm"
      />
    </main>
  );
}
