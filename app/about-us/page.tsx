import type { Metadata } from "next";
import AboutHero from "@/components/about-us/AboutHero";
import AboutBody from "@/components/about-us/AboutBody";

export const metadata: Metadata = {
  title: "Sobre Nosotros - Nexo CrossFit",
  description: "Conoce nuestra historia, filosofía y espacio. Desde 2017 transformando vidas en Valencia a través del CrossFit y el deporte en comunidad.",
};

export default function AboutUs() {
  return (
    <main>
      <AboutHero />
      <AboutBody />
    </main>
  );
}
