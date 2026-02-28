import type { Metadata } from "next";
import TeamBody from "@/components/team/TeamBody";
import TeamHero from "@/components/team/TeamHero";

export const metadata: Metadata = {
  title: "Nuestros Coaches",
  description:
    "Conoce al equipo de coaches certificados de Nexo CrossFit Valencia. Profesionales apasionados con formación en CrossFit y HYROX que te guían con técnica, seguridad y motivación en cada sesión.",
  openGraph: {
    title: "Nuestros Coaches | Nexo CrossFit Valencia",
    description:
      "Coaches certificados en CrossFit y HYROX. Profesionales apasionados que te guían con técnica y seguridad.",
    url: "https://nexocrossfit.es/team",
  },
  alternates: {
    canonical: "https://nexocrossfit.es/team",
  },
};

export default function Team() {
  return (
    <main>
      <TeamHero />
      <TeamBody />
    </main>
  );
}
