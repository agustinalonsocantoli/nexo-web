import { Zalando_Sans_Expanded, Public_Sans } from "next/font/google";
import "../globals.css";

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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${zalandoSans.variable} ${publicSans.variable}`}>
      <body className="min-h-screen bg-[#1a1a1a] font-body text-white antialiased">
        {children}
      </body>
    </html>
  );
}
