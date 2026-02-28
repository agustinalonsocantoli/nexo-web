import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CloseDetailsOnOutsideClick from "@/components/CloseDetailsOnOutsideClick";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexocrossfit.es/"),
  title: {
    default: "Nexo CrossFit Valencia | Box CrossFit y HYROX",
    template: "%s | Nexo CrossFit Valencia",
  },
  description:
    "Box de CrossFit y HYROX en Valencia. Coaches certificados, clases para todos los niveles, horarios flexibles y comunidad. Desde 2017 transformando vidas.",
  keywords: [
    "CrossFit Valencia",
    "box CrossFit Valencia",
    "HYROX Valencia",
    "gym Valencia",
    "entrenamiento funcional Valencia",
    "clases CrossFit Valencia",
    "On Ramp CrossFit",
    "box CrossFit",
  ],
  authors: [{ name: "Nexo CrossFit Valencia" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Nexo CrossFit Valencia",
    images: [
      {
        url: "/hero-home.webp",
        width: 1200,
        height: 630,
        alt: "Nexo CrossFit Valencia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
