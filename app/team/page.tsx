import type { Metadata } from "next";
import TeamBody from "@/components/team/TeamBody";
import TeamHero from "@/components/team/TeamHero";

export const metadata: Metadata = {
  title: "Nuestro Equipo - Nexo CrossFit",
  description: "Conoce a nuestros coaches certificados. Un equipo apasionado dedicado a guiarte en cada WOD con seguridad, técnica y motivación.",
};

export default function Team() {
  return (
    <main>
      <TeamHero />
      <TeamBody />
    </main>
  );
}
