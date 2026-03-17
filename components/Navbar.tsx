"use client";

import { useRef } from "react";
import OptimizedImage from "./OptimizedImage";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function Navbar() {
    const menuRef = useRef<HTMLInputElement>(null);
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    function closeMenu() {
        if (menuRef.current) menuRef.current.checked = false;
    }

    function switchLocale(newLocale: "es" | "en") {
        router.replace(pathname, { locale: newLocale });
    }

    const navLinks = [
        { label: t("home"), href: "/" as const },
        { label: t("classes"), href: "/class" as const },
        { label: t("onramp"), href: "/on-ramp" as const },
        { label: t("plans"), href: "/plans" as const },
        { label: t("about"), href: "/about-us" as const },
        { label: t("team"), href: "/team" as const },
        { label: t("contact"), href: "/contact" as const },
    ];

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
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-body text-sm font-medium text-white transition-colors hover:text-nexo-orange"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Language Switcher */}
                    <div className="flex items-center gap-1 font-body text-sm">
                        <button
                            onClick={() => switchLocale("es")}
                            className={`px-1 transition-colors ${locale === "es" ? "font-semibold text-nexo-orange" : "text-white/60 hover:text-white"}`}
                        >
                            ES
                        </button>
                        <span className="text-white/40">|</span>
                        <button
                            onClick={() => switchLocale("en")}
                            className={`px-1 transition-colors ${locale === "en" ? "font-semibold text-nexo-orange" : "text-white/60 hover:text-white"}`}
                        >
                            EN
                        </button>
                    </div>
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
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className="font-body text-base font-normal text-white transition-colors hover:text-nexo-orange"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* CTA */}
                    <Link
                        href="/class"
                        onClick={closeMenu}
                        className="mt-4 flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-nexo-orange px-8 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-nexo-orange/90"
                    >
                        {t("trialClass")}
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>

                    {/* Language Switcher - Mobile */}
                    <div className="flex items-center gap-2 font-body text-sm">
                        <button
                            onClick={() => { switchLocale("es"); closeMenu(); }}
                            className={`px-1 transition-colors ${locale === "es" ? "font-semibold text-nexo-orange" : "text-white/60 hover:text-white"}`}
                        >
                            ES
                        </button>
                        <span className="text-white/40">|</span>
                        <button
                            onClick={() => { switchLocale("en"); closeMenu(); }}
                            className={`px-1 transition-colors ${locale === "en" ? "font-semibold text-nexo-orange" : "text-white/60 hover:text-white"}`}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
