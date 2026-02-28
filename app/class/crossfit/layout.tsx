import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clases de CrossFit en Valencia",
  description:
    "Clases de CrossFit en Valencia para todos los niveles. WODs diarios programados, coaches certificados que cuidan tu técnica, y curso On Ramp para principiantes. Únete al box Nexo.",
  openGraph: {
    title: "Clases de CrossFit en Valencia | Nexo CrossFit",
    description:
      "CrossFit en Valencia con coaches certificados. WODs diarios, atención personalizada y curso On Ramp para empezar desde cero.",
    url: "https://nexocrossfit.es//class/crossfit",
  },
  alternates: {
    canonical: "https://nexocrossfit.es//class/crossfit",
  },
};

export default function CrossfitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
