import type { Metadata } from "next";
import { Zalando_Sans_Expanded, Public_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CloseDetailsOnOutsideClick from "@/components/CloseDetailsOnOutsideClick";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

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

const BASE_URL = "https://www.nexocrossfit.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.default" });

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
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
      icon: "/icon.png",
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      siteName: "Nexo CrossFit Valencia",
      images: [
        {
          url: "/og-image-old.png",
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
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const businessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ExerciseGym"],
        "@id": `${BASE_URL}/#business`,
        name: "Nexo CrossFit Valencia",
        url: BASE_URL,
        logo: `${BASE_URL}/logo-nexo.webp`,
        image: `${BASE_URL}/og-image-old.png`,
        telephone: "+34661388984",
        email: "info@nexocrossfit.es",
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Arzobispo Fabián y Fuero, 21",
          addressLocality: "Valencia",
          postalCode: "46009",
          addressCountry: "ES",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:00",
            closes: "21:30",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:30",
            closes: "11:30",
          },
        ],
        sameAs: ["https://instagram.com/nexocrossfit"],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        name: "Nexo CrossFit Valencia",
        url: BASE_URL,
        inLanguage: locale === "es" ? "es-ES" : "en",
        publisher: { "@id": `${BASE_URL}/#business` },
      },
    ],
  };

  return (
    <html lang={locale} className={`${zalandoSans.variable} ${publicSans.variable}`}>
      <body className="font-body antialiased flex min-h-screen flex-col">
        <JsonLd data={businessSchema} />
        <NextIntlClientProvider messages={messages}>
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
            className="fixed bottom-6 right-6 z-50 drop-shadow-lg transition-transform hover:scale-110"
          >
            <Image src="/whatsapp.svg" alt="WhatsApp" width={28} height={28} className="w-[42px] md:w-[48px] h-[42px] md:h-[48px]" />
          </a>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
