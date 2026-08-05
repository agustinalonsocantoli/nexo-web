/**
 * Validación de documentos de identidad.
 *
 * DNI y NIE tienen letra de control calculable, así que se validan de verdad.
 * El pasaporte se valida sólo por formato: no existe un checksum universal en
 * el número (el dígito de control vive en el MRZ, que el usuario no escribe) y
 * cada país usa su propia longitud, así que cualquier regla más estricta
 * rechazaría documentos extranjeros válidos.
 */

const CONTROL_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

export const DOCUMENT_TYPES = ["dni", "nie", "pasaporte"] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];

const DOCUMENT_LABELS: Record<DocumentType, string> = {
  dni: "DNI",
  nie: "NIE",
  pasaporte: "Pasaporte",
};

/** Etiqueta legible del tipo de documento, para los emails al box. */
export function documentLabel(type?: string) {
  return DOCUMENT_LABELS[type as DocumentType] ?? "Documento";
}

function controlLetter(numero: number) {
  return CONTROL_LETTERS[numero % 23];
}

/**
 * Mayúsculas y sin separadores de formato (espacios, puntos, guiones), que es
 * como la gente escribe el DNI. No se limpia nada más: cualquier otro carácter
 * debe seguir invalidando el documento.
 */
export function normalizeDocument(value: string) {
  return value.trim().toUpperCase().replace(/[\s.-]/g, "");
}

export function isValidDocument(type: DocumentType, value: string) {
  const doc = normalizeDocument(value);

  if (type === "dni") {
    const match = /^(\d{8})([A-Z])$/.exec(doc);
    return !!match && controlLetter(Number(match[1])) === match[2];
  }

  if (type === "nie") {
    const match = /^([XYZ])(\d{7})([A-Z])$/.exec(doc);
    if (!match) return false;
    const prefix = "XYZ".indexOf(match[1]);
    return controlLetter(Number(`${prefix}${match[2]}`)) === match[3];
  }

  return /^[A-Z0-9]{5,20}$/.test(doc);
}

/** Acepta el formato yyyy-mm-dd de <input type="date">: fecha real, pasada y de menos de 100 años. */
export function isValidBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;

  const today = new Date();
  if (date > today) return false;

  const oldest = new Date();
  oldest.setFullYear(oldest.getFullYear() - 100);
  return date >= oldest;
}
