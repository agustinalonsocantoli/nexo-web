import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { TrainingCard, TrainingCardType } from "@/components/home/TrainingSection";

export const metadata: Metadata = {
  title: "Clase de Prueba - Nexo CrossFit",
  description: "Reserva tu clase de prueba gratuita de CrossFit o HYROX. Entrena con coaches certificados y descubre tu nueva comunidad.",
};

const classes: TrainingCardType[] = [
  {
    title: "CROSSFIT",
    bullets: [
      "Entrena con coaches que te empujan a lograr tus objetivos.",
      "Clases de 60 minutos con enfoque en tu progreso semanal, cuidando la técnica y evitando lesiones.",
      "Comunidad, energía y un box preparado para cada WOD.",
    ],
    image: "/crossfit-img.webp",
    href: "/class/crossfit",
  },
  {
    title: "HYROX",
    bullets: [
      "Entrena con coaches que te empujan a lograr tus objetivos.",
      "Clases de 45 minutos para fortalecer tu resistencia, aumentar tu potencia y poner a prueba tu cuerpo y mente.",
      "Comunidad, energía y un box preparado para superar tus límites.",
    ],
    image: "/hyrox-img.webp",
    href: "/class/hyrox",
  },
];

export default function ClassPage() {
  return (
    <main className="bg-[#fbfbfb]">
      <PageHero title="Reserva tu clase de prueba" />

      {/* Contenido */}
      <div className="flex flex-col gap-4 px-6 py-6">
        <p className="font-body text-sm leading-5 text-nexo-dark">
          Reserva tu clase de prueba y vive una sesión real de CrossFit o
          HYROX. Nos adaptamos a tu nivel y entrenarás en un ambiente
          motivador, junto a coaches que cuidan tu técnica y tu progreso.
        </p>

        <div className="flex flex-col gap-4">
          {classes.map((c) => (
            <TrainingCard key={c.title} training={c} />
          ))}
        </div>
      </div>
    </main>
  );
}
