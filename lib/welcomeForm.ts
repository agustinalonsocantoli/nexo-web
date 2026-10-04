import type { Modalidad, Objetivo, SiNo } from "./qrForm";

export const MODALIDADES: readonly Modalidad[] = ["crossfit", "strength-hyrox", "hyrox"];
export const SI_NO: readonly SiNo[] = ["si", "no"];
export const OBJETIVOS: readonly Objetivo[] = ["condicion", "fuerza", "grasa", "resistencia", "competicion", "otro"];
export const DIAS = ["L", "M", "X", "J", "V"] as const;
export const FRANJAS = ["manana", "tarde"] as const;

export type Dia = (typeof DIAS)[number];
export type Franja = (typeof FRANJAS)[number];

export const MODALIDAD_LABELS: Record<Modalidad, string> = {
  crossfit: "CrossFit",
  "strength-hyrox": "Strength-Hyrox",
  hyrox: "Hyrox",
};

export const OBJETIVO_LABELS_ES: Record<Objetivo, string> = {
  condicion: "Mejorar condición física",
  fuerza: "Ganar fuerza",
  grasa: "Perder grasa",
  resistencia: "Mejorar resistencia",
  competicion: "Preparar una competición",
  otro: "Otro",
};

export const FRANJA_LABELS_ES: Record<Franja, string> = {
  manana: "Mañana (9-14)",
  tarde: "Tarde (17-21:30)",
};

export interface Disponibilidad {
  dias: string[];
  franjas: string[];
  texto: string;
}

export const EMPTY_DISPONIBILIDAD: Disponibilidad = { dias: [], franjas: [], texto: "" };

export function isModalidad(value: unknown): value is Modalidad {
  return typeof value === "string" && (MODALIDADES as readonly string[]).includes(value);
}

export function isObjetivo(value: unknown): value is Objetivo {
  return typeof value === "string" && (OBJETIVOS as readonly string[]).includes(value);
}

export function isSiNo(value: unknown): value is SiNo {
  return typeof value === "string" && (SI_NO as readonly string[]).includes(value);
}

export function isDisponibilidadValid(d: Disponibilidad): boolean {
  const hasSlots = d.dias.length > 0 && d.franjas.length > 0;
  return hasSlots || d.texto.trim().length > 0;
}

export function serializeDisponibilidad(d: Disponibilidad): string {
  const dias = DIAS.filter((dia) => d.dias.includes(dia)).join(", ");
  const franjas = FRANJAS.filter((f) => d.franjas.includes(f))
    .map((f) => FRANJA_LABELS_ES[f])
    .join(", ");
  return [dias, franjas, d.texto.trim()].filter(Boolean).join(" · ");
}
