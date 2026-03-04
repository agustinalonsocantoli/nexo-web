import type { Metadata } from "next";
import { Zalando_Sans_Expanded, Public_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CloseDetailsOnOutsideClick from "@/components/CloseDetailsOnOutsideClick";
import Image from "next/image";

const zalandoSans = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-zalando",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

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
    <html lang="es" className={`${zalandoSans.variable} ${publicSans.variable}`}>
      <body className="font-body antialiased flex min-h-screen flex-col">
        <CloseDetailsOnOutsideClick />
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <a
          href="https://wa.me/34661388984"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 drop-shadow-lg transition-transform hover:scale-110"
        >
          <Image src="/whatsapp.svg" alt="WhatsApp" width={28} height={28} className="w-[28px] md:w-[36px] h-[28px] md:h-[36px]" />
        </a>
      </body>
    </html>
  );
}
