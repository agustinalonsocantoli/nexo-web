import type { Metadata } from "next";
import AboutHero from "@/components/about-us/AboutHero";
import AboutBody from "@/components/about-us/AboutBody";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description:
    "Conoce la historia de Nexo CrossFit Valencia. Desde 2017 somos un box afiliado a CrossFit con coaches apasionados, instalaciones de primer nivel y una comunidad que te empuja a superarte cada día.",
  openGraph: {
    title: "Quiénes Somos | Nexo CrossFit Valencia",
    description:
      "Conoce la historia de Nexo CrossFit Valencia. Desde 2017 somos un box afiliado con coaches apasionados y una comunidad única.",
    url: "https://nexocrossfit.es/about-us",
  },
  alternates: {
    canonical: "https://nexocrossfit.es/about-us",
  },
};

export default function AboutUs() {
  return (
    <main>
      <AboutHero />
      <AboutBody />
    </main>
  );
}
