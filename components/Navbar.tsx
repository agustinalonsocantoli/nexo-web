"use client";

import { useRef } from "react";
import OptimizedImage from "./OptimizedImage";
import Link from "next/link";

export default function Navbar() {
    const menuRef = useRef<HTMLInputElement>(null);

    function closeMenu() {
        if (menuRef.current) menuRef.current.checked = false;
    }

    return (
        <nav className="navbar-container sticky top-0 z-50 w-full bg-nexo-dark/95 backdrop-blur-sm transition-all duration-300">
            {/* Mobile Menu Toggle (Hidden Checkbox) */}
            <input ref={menuRef} type="checkbox" id="mobile-menu-toggle" className="hidden" />

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" onClick={closeMenu} className="relative z-50 flex items-center gap-2">
                    <div className="w-[115px] h-[34px]">
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
                <div className="hidden items-center gap-6 md:flex">
                    <Link href="/" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Inicio
                    </Link>
                    <Link href="/class" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Clases
                    </Link>
                    <Link href="/on-ramp" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        On Ramp
                    </Link>
                    <Link href="/plans" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Horarios y Tarifas
                    </Link>
                    <Link href="/about-us" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Quiénes somos
                    </Link>
                    <Link href="/team" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Nuestros coaches
                    </Link>
                    <Link href="/contact" className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange">
                        Contacto
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

            {/* Mobile Menu */}
            <div className="mobile-menu fixed left-0 right-0 top-[72px] z-40 h-0 overflow-hidden bg-nexo-dark transition-all duration-300 md:hidden">
                <div className="flex flex-col items-start space-y-6 p-6">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                    >
                        Inicio
                    </Link>
                    <Link
                        href="/class"
                        onClick={closeMenu}
                        className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                    >
                        Clases
                    </Link>
                    <Link
                        href="/on-ramp"
                        onClick={closeMenu}
                        className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                    >
                        On Ramp
                    </Link>
                    <Link
                        href="/plans"
                        onClick={closeMenu}
                        className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                    >
                        Horarios y Tarifas
                    </Link>
                    <Link
                        href="/about-us"
                        onClick={closeMenu}
                        className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                    >
                        Quiénes somos
                    </Link>
                    <Link
                        href="/team"
                        onClick={closeMenu}
                        className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                    >
                        Nuestros coaches
                    </Link>
                    <Link
                        href="/contact"
                        onClick={closeMenu}
                        className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                    >
                        Contacto
                    </Link>

                    {/* CTA */}
                    <Link
                        href="/class"
                        onClick={closeMenu}
                        className="mt-4 flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-nexo-orange px-8 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-nexo-orange/90"
                    >
                        Clase de Prueba
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
