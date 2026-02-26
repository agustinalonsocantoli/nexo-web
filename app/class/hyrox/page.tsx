import PageHero from "@/components/PageHero";
import ClassBookingForm from "@/components/class/ClassBookingForm";

const FAQS = [
  {
    question: "¿Cuánto cuestan las clases?",
    answer:
      "Las clases de HYROX están incluidas en la cuota mensual de 75 €, con acceso ilimitado a todas las sesiones.",
  },
  {
    question: "¿Cuánto duran las clases?",
    answer:
      "Cada sesión tiene una duración de 60 minutos, con calentamiento, trabajo principal y vuelta a la calma.",
  },
];

export default function HyroxPage() {
  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title="Reserva tu clase de prueba" />

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
