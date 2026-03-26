import { Link } from "@/i18n/navigation";
import OptimizedImage from "./OptimizedImage";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const NAV_LINKS = [
    { label: tNav("home"), href: "/" as const },
    { label: tNav("classes"), href: "/class" as const },
    { label: tNav("onramp"), href: "/on-ramp" as const },
    { label: tNav("plans"), href: "/plans" as const },
    { label: tNav("about"), href: "/about-us" as const },
    { label: tNav("team"), href: "/team" as const },
    { label: tNav("contact"), href: "/contact" as const },
  ];

  return (
    <footer className="bg-nexo-dark px-4 pt-12 pb-8 lg:px-[118px] lg:pt-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-0">

        {/* Col 1: Logo + tagline + CrossFit Journal (desktop) */}
        <div className="flex flex-col gap-4">
          <OptimizedImage
            src="/logo-nexo.webp"
            alt="Nexo CrossFit"
            width={115}
            height={34}
            className="h-[34px] w-[115px] object-contain"
          />
          <p className="font-body text-sm leading-5 text-[#878787]">
            {t("tagline")}
          </p>
          {/* CrossFit Journal — solo desktop */}
          <a
            href="https://journal.crossfit.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CrossFit Journal"
            className="hidden lg:block"
          >
            <OptimizedImage
              src="/crossfit-journal.webp"
              alt="CrossFit Journal"
              width={89}
              height={50}
              className="h-[50px] w-[89px] object-contain"
            />
          </a>
        </div>

        {/* Col 2: Enlaces Rápidos */}
        <div className="flex flex-col gap-4">
          <h3 className="font-body text-base leading-6 text-white">
            {t("quickLinks")}
          </h3>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm leading-5 text-[#99a1af] transition-colors hover:text-nexo-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Síguenos + CrossFit Journal (móvil) */}
        <div className="flex w-full items-center justify-between lg:w-auto lg:flex-col lg:items-start lg:gap-4">
          <div className="flex flex-col gap-4">
            <h3 className="font-body text-base leading-6 text-white">
              {t("followUs")}
            </h3>
            <a
              href="https://instagram.com/nexocrossfit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("instagramLabel")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-nexo-orange transition-opacity hover:opacity-80"
            >
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          {/* CrossFit Journal — solo móvil */}
          <a
            href="https://journal.crossfit.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CrossFit Journal"
            className="lg:hidden"
          >
            <OptimizedImage
              src="/crossfit-journal.webp"
              alt="CrossFit Journal"
              width={89}
              height={50}
              className="h-[50px] w-[89px] object-contain"
            />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-[#878787] pt-8 text-center">
        <div>
          <p className="font-body text-sm leading-5 text-[#99a1af]">
            © 2026 NEXO CrossFit. Todos los derechos reservados.
          </p>
          <p className="font-body text-[12px] leading-5 text-[#99a1af]">
            SEO <Link href="https://snwebsolution.com/es/">SN websolution</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
