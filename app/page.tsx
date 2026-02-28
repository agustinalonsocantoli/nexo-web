import type { Metadata } from "next";
import AffiliatesSection from "@/components/home/AffiliatesSection";
import Hero from "@/components/home/Hero";
import TrainingSection from "@/components/home/TrainingSection";
import TeamSection from "@/components/home/TeamSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export const metadata: Metadata = {
  title: {
    absolute: "Nexo CrossFit Valencia | Box CrossFit y HYROX en Valencia",
  },
  description:
    "Entrena en el mejor box de CrossFit y HYROX de Valencia. Coaches certificados, clases para todos los niveles, horarios de mañana y tarde. ¡Reserva tu primera clase de prueba gratis!",
  openGraph: {
    title: "Nexo CrossFit Valencia | Box CrossFit y HYROX",
    description:
      "Entrena en el mejor box de CrossFit y HYROX de Valencia. Coaches certificados, clases para todos los niveles, horarios de mañana y tarde.",
    url: "https://nexocrossfit.es/",
  },
  alternates: {
    canonical: "https://nexocrossfit.es/",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <TrainingSection />
      <AffiliatesSection />
      <WhyChooseUs />
      <TeamSection />
    </main>
  );
}
