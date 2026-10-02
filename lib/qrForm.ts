export const QR_FORM_HASH = process.env.QR_FORM_HASH ?? "nx-recepcion-7f3a9c2d";

export function isValidQrHash(h: string): boolean {
  return h === QR_FORM_HASH;
}

export type Modalidad = "crossfit" | "strength-hyrox" | "hyrox";
export type SiNo = "si" | "no";
export type Objetivo = "condicion" | "fuerza" | "grasa" | "resistencia" | "competicion" | "otro";

export interface WelcomeFormPayload {
  locale: string;
  hash: string;
  nombre: string;
  whatsapp: string;
  modalidad: Modalidad;
  experiencia?: SiNo;
  expDetalle?: string;
  disponibilidad?: string;
  deporte: string;
  lesion: SiNo;
  lesionDetalle?: string;
  objetivos: Objetivo[];
  objetivoOtro?: string;
  extra?: string;
}
