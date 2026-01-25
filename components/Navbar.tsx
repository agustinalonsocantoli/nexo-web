import OptimizedImage from "./OptimizedImage";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar-container sticky top-0 z-50 w-full bg-nexo-dark/95 backdrop-blur-sm transition-all duration-300">
            {/* Mobile Menu Toggle (Hidden Checkbox) */}
            <input type="checkbox" id="mobile-menu-toggle" className="hidden" />

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="relative z-50 flex items-center gap-2">
                    <div className='w-[115px] h-[34px]'>
                        <OptimizedImage
                            src="/logo-nexo.webp"
                            alt="Nexo"
                            width={115}
                            height={34}
                            priority={true}
                            className="h-8 w-auto"
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link href="/" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Inicio
                    </Link>
                    <Link href="/horarios-tarifas" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Horarios y Tarifas
                    </Link>
                    <Link href="/quienes-somos" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Quienes somos
                    </Link>
                    <Link href="/coaches" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Nuestros coaches
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <label
                    htmlFor="mobile-menu-toggle"
                    className="relative z-50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line-1 block h-0.5 w-6 bg-white transition-all duration-300"></span>
                    <span className="hamburger-line-2 block h-0.5 w-6 bg-white transition-all duration-300"></span>
                    <span className="hamburger-line-3 block h-0.5 w-6 bg-white transition-all duration-300"></span>
                </label>
            </div>

            {/* Mobile Menu Full Screen */}
            <div className="mobile-menu fixed left-0 right-0 top-[72px] z-40 h-0 overflow-hidden bg-nexo-dark transition-all duration-300 md:hidden">
                <div className="flex flex-col items-start space-y-6 p-6">
                    <label htmlFor="mobile-menu-toggle">
                        <Link
                            href="/"
                            className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                        >
                            Inicio
                        </Link>
                    </label>
                    <label htmlFor="mobile-menu-toggle">
                        <Link
                            href="/horarios-tarifas"
                            className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                        >
                            Horarios y Tarifas
                        </Link>
                    </label>
                    <label htmlFor="mobile-menu-toggle">
                        <Link
                            href="/quienes-somos"
                            className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                        >
                            Quienes somos
                        </Link>
                    </label>
                    <label htmlFor="mobile-menu-toggle">
                        <Link
                            href="/coaches"
                            className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                        >
                            Nuestros coaches
                        </Link>
                    </label>

                    {/* CTA Button */}
                    <label htmlFor="mobile-menu-toggle" className="w-full">
                        <Link
                            href="/clase-prueba"
                            className="mt-4 flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-nexo-orange px-8 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-nexo-orange/90"
                        >
                            Clase de Prueba
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </label>
                </div>
            </div>
        </nav>
    );
}
