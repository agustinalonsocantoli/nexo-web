"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface DateMark {
  /** Mes 1-based (julio = 7) */
  month: number;
  /** Día del mes */
  day: number;
}

interface SeasonalBannerProps {
  imageSrc: string;
  alt: string;
  /** Inicio de la ventana activa (incluido) */
  start: DateMark;
  /** Fin de la ventana activa (incluido) */
  end: DateMark;
  /** Clave de sesión para no reabrirlo tras cerrarlo */
  storageKey: string;
}

function isWithinWindow(start: DateMark, end: DateMark): boolean {
  const now = new Date();
  const year = now.getFullYear();
  const startDate = new Date(year, start.month - 1, start.day, 0, 0, 0, 0);
  const endDate = new Date(year, end.month - 1, end.day, 23, 59, 59, 999);
  return now >= startDate && now <= endDate;
}

/** Píxeles de scroll necesarios para disparar el banner */
const SCROLL_THRESHOLD = 120;

export default function SeasonalBanner({
  imageSrc,
  alt,
  start,
  end,
  storageKey,
}: SeasonalBannerProps) {
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);

  // La comprobación de fecha se hace en cliente para reflejar la fecha real
  // del visitante y evitar que quede congelada en el render estático.
  useEffect(() => {
    if (!isWithinWindow(start, end)) return;
    try {
      if (sessionStorage.getItem(storageKey) === "1") return;
    } catch {
      // sessionStorage no disponible: mostramos igualmente
    }
    setArmed(true);
  }, [start, end, storageKey]);

  // Una vez "armado" (fecha válida + no descartado), se abre al hacer scroll.
  useEffect(() => {
    if (!armed) return;
    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setOpen(true);
        setArmed(false);
      }
    };
    onScroll(); // por si la página ya está scrolleada al cargar
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [armed]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // ignoramos si no hay sessionStorage
    }
  }, [storageKey]);

  // Cerrar con Escape. NO bloqueamos el scroll: es un banner sticky,
  // la página debe poder seguir scrolleándose con el banner visible.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={close}
      className="coach-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="coach-scale-in relative"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-nexo-orange text-white shadow-lg transition-transform duration-200 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <Image
          src={imageSrc}
          alt={alt}
          width={842}
          height={1190}
          priority
          sizes="(max-width: 480px) 90vw, 420px"
          className="block h-auto w-[90vw] max-w-[420px] max-h-[88vh] rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
}
