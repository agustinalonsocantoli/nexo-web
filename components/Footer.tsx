import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Clases", href: "/class" },
  { label: "On Ramp", href: "/on-ramp" },
  { label: "Horarios y Tarifas", href: "/plans" },
  { label: "Sobre nosotros", href: "/about-us" },
  { label: "Nuestro Equipo", href: "/team" },
  { label: "Contacto", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-nexo-dark px-4 pt-12 pb-8">
      <div className="flex flex-col gap-6">

        {/* Logo + tagline */}
        <div className="flex flex-col gap-4">
          <OptimizedImage
            src="/logo-nexo.webp"
            alt="Nexo CrossFit"
            width={115}
            height={34}
            className="h-[34px] w-[115px] object-contain"
          />
          <p className="font-body text-sm leading-5 text-[#878787]">
            Transformando vidas a través del deporte desde 2017.
          </p>
        </div>

        {/* Enlaces Rápidos */}
        <div className="flex flex-col gap-4">
          <h3 className="font-body text-base leading-6 text-white">
            Enlaces Rápidos
          </h3>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
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

        {/* Síguenos + CrossFit Journal */}
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-4">
            <h3 className="font-body text-base leading-6 text-white">
              Síguenos
            </h3>
            <a
              href="https://instagram.com/nexocrossfit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Nexo CrossFit"
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

          {/* CrossFit Journal logo */}
          <OptimizedImage
            src="/crossfit-journal.webp"
            alt="CrossFit Journal"
            width={89}
            height={50}
            className="h-[50px] w-[89px] object-contain"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-[#878787] pt-8 text-center">
        <p className="font-body text-sm leading-5 text-[#99a1af]">
          © 2025 NEXO CrossFit. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
