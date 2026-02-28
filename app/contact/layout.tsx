import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Nexo CrossFit Valencia. Estamos en Arzobispo Fabián y Fuero 21, Valencia 46009. Escríbenos por WhatsApp al 661 388 984, por email o a través del formulario.",
  openGraph: {
    title: "Contacto | Nexo CrossFit Valencia",
    description:
      "Contacta con Nexo CrossFit. C/ Arzobispo Fabián y Fuero 21, Valencia. WhatsApp: 661 388 984.",
    url: "https://nexocrossfit.es//contact",
  },
  alternates: {
    canonical: "https://nexocrossfit.es//contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
