import { z } from "zod";
import { DOCUMENT_TYPES, DocumentType, isValidBirthDate, isValidDocument } from "./identity";

type Translate = (key: string) => string;

/**
 * Campos de identidad y salud comunes a los formularios de reserva.
 * Se combinan con los campos propios de cada formulario en su z.object().
 */
export function identityFields(t: Translate) {
  return {
    tipoDocumento: z.enum(DOCUMENT_TYPES, { message: t("documentTypeRequired") }),
    documento: z.string().min(1, t("documentRequired")),
    fechaNacimiento: z
      .string()
      .min(1, t("birthDateRequired"))
      .refine(isValidBirthDate, t("birthDateInvalid")),
    lesion: z.enum(["si", "no"], { message: t("injuryRequired") }),
    lesionDetalle: z.string().optional(),
  };
}

interface IdentityData {
  tipoDocumento?: DocumentType;
  documento?: string;
  lesion?: "si" | "no";
  lesionDetalle?: string;
}

/**
 * Validaciones que dependen de más de un campo, para usar dentro del
 * .superRefine() de cada formulario.
 */
export function refineIdentity(data: IdentityData, ctx: z.RefinementCtx, t: Translate) {
  if (data.tipoDocumento && data.documento && !isValidDocument(data.tipoDocumento, data.documento)) {
    ctx.addIssue({
      code: "custom",
      path: ["documento"],
      message: t(`documentInvalid.${data.tipoDocumento}`),
    });
  }

  if (data.lesion === "si" && (data.lesionDetalle ?? "").trim().length < 5) {
    ctx.addIssue({ code: "custom", path: ["lesionDetalle"], message: t("injuryDetailMin") });
  }
}
