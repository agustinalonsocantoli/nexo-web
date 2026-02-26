import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CloseDetailsOnOutsideClick from "@/components/CloseDetailsOnOutsideClick";

export const metadata: Metadata = {
  title: "Nexo CrossFit - Transformando vidas a través del deporte",
  description: "Transforma tu estilo de vida con entrenamientos de CrossFit y Hyrox en Nexo. Clases para todos los niveles desde 2017.",
  keywords: "CrossFit, Hyrox, entrenamiento funcional, fitness, gym, box",
  authors: [{ name: "Nexo CrossFit" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-body antialiased flex min-h-screen flex-col">
        <CloseDetailsOnOutsideClick />
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
