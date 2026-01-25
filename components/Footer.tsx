import OptimizedImage from './OptimizedImage';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-nexo-dark">
            <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
                {/* Logo y descripción */}
                <div className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-4">
                        <div className='w-[115px] h-[34px]'>
                            <OptimizedImage
                                src="/logo-nexo.webp"
                                alt="Nexo"
                                width={115}
                                height={34}
                                className="h-8 w-auto"
                            />
                        </div>
                        <p className="max-w-md font-body text-sm text-nexo-gray">
                            Transformando vidas a través del deporte desde 2017.
                        </p>
                    </div>
                </div>

                {/* Grid de contenido */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Enlaces Rápidos */}
                    <div>
                        <h3 className="mb-4 font-body text-base font-semibold text-white">
                            Enlaces Rápidos
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="font-body text-sm text-nexo-gray transition-colors hover:text-nexo-orange"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/horarios-tarifas"
                                    className="font-body text-sm text-nexo-gray transition-colors hover:text-nexo-orange"
                                >
                                    Horarios y Tarifas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/quienes-somos"
                                    className="font-body text-sm text-nexo-gray transition-colors hover:text-nexo-orange"
                                >
                                    Quiénes Somos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/coaches"
                                    className="font-body text-sm text-nexo-gray transition-colors hover:text-nexo-orange"
                                >
                                    Nuestros Coaches
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/clase-prueba"
                                    className="font-body text-sm text-nexo-gray transition-colors hover:text-nexo-orange"
                                >
                                    Clase de Prueba
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h3 className="mb-4 font-body text-base font-semibold text-white">
                            Contacto
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:info@nexocrossfit.com"
                                    className="font-body text-sm text-nexo-gray transition-colors hover:text-nexo-orange"
                                >
                                    info@nexocrossfit.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+34123456789"
                                    className="font-body text-sm text-nexo-gray transition-colors hover:text-nexo-orange"
                                >
                                    +34 123 456 789
                                </a>
                            </li>
                            <li>
                                <p className="font-body text-sm text-nexo-gray">
                                    Dirección del Box<br />
                                    Ciudad, CP
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div>
                        <h3 className="mb-4 font-body text-base font-semibold text-white">
                            Síguenos
                        </h3>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com/nexocrossfit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-nexo-orange transition-all hover:bg-nexo-orange/80"
                                aria-label="Instagram"
                            >
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://youtube.com/@nexocrossfit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-nexo-orange transition-all hover:bg-nexo-orange/80"
                                aria-label="YouTube"
                            >
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-nexo-gray/30 pt-8 text-center">
                    <p className="font-body text-sm text-nexo-gray">
                        © 2025 NEXO CrossFit. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
