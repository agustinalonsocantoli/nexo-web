import { z } from "zod";
import type { Path } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import type { WelcomeFormPayload } from "@/lib/qrForm";
import {
  EMPTY_DISPONIBILIDAD,
  MODALIDADES,
  OBJETIVOS,
  SI_NO,
  isDisponibilidadValid,
  serializeDisponibilidad,
} from "@/lib/welcomeForm";

type Translate = (key: string) => string;

const NAME_MIN = 2;
const EXP_DETALLE_MIN = 3;
const LESION_DETALLE_MIN = 5;

const disponibilidadSchema = z.object({
  dias: z.array(z.string()),
  franjas: z.array(z.string()),
  texto: z.string(),
});

export function createWelcomeSchema(tv: Translate, tw: Translate) {
  return z
    .object({
      nombre: z.string().trim().min(NAME_MIN, tv("nameMin")),
      whatsapp: z.string().min(1, tv("phoneRequired")).refine(isValidPhoneNumber, tv("phoneInvalid")),
      modalidad: z.enum(MODALIDADES).optional(),
      experiencia: z.enum(SI_NO).optional(),
      expDetalle: z.string(),
      disponibilidad: disponibilidadSchema,
      deporte: z.string(),
      lesion: z.enum(SI_NO).optional(),
      lesionDetalle: z.string(),
      objetivos: z.array(z.enum(OBJETIVOS)),
      objetivoOtro: z.string(),
      extra: z.string(),
      privacidad: z.boolean().refine((v) => v, tv("privacyRequired")),
    })
    .superRefine((d, ctx) => {
      const issue = (path: string, key: string) =>
        ctx.addIssue({ code: "custom", path: [path], message: tw(key) });

      if (!d.modalidad) issue("modalidad", "modalidadRequired");

      const needsDisponibilidad = d.modalidad === "crossfit" ? Boolean(d.experiencia) : Boolean(d.modalidad);

      if (d.modalidad === "crossfit" && !d.experiencia) issue("experiencia", "experienciaRequired");
      if (d.modalidad === "crossfit" && d.experiencia === "si" && d.expDetalle.trim().length < EXP_DETALLE_MIN) {
        issue("expDetalle", "expDetalleMin");
      }
      if (needsDisponibilidad && !isDisponibilidadValid(d.disponibilidad)) {
        ctx.addIssue({ code: "custom", path: ["disponibilidad", "texto"], message: tw("disponibilidadRequired") });
      }

      if (d.deporte.trim().length === 0) issue("deporte", "deporteRequired");
      if (!d.lesion) issue("lesion", "lesionRequired");
      if (d.lesion === "si" && d.lesionDetalle.trim().length < LESION_DETALLE_MIN) {
        issue("lesionDetalle", "lesionDetalleMin");
      }

      if (d.objetivos.length === 0) issue("objetivos", "objetivosRequired");
      if (d.objetivos.includes("otro") && d.objetivoOtro.trim().length === 0) {
        issue("objetivoOtro", "objetivoOtroRequired");
      }
    });
}

export type WelcomeFormValues = z.infer<ReturnType<typeof createWelcomeSchema>>;
export type WelcomeFieldPath = Path<WelcomeFormValues>;

export const WELCOME_DEFAULT_VALUES: WelcomeFormValues = {
  nombre: "",
  whatsapp: "",
  modalidad: undefined,
  experiencia: undefined,
  expDetalle: "",
  disponibilidad: EMPTY_DISPONIBILIDAD,
  deporte: "",
  lesion: undefined,
  lesionDetalle: "",
  objetivos: [],
  objetivoOtro: "",
  extra: "",
  privacidad: false,
};

export function buildWelcomePayload(
  values: WelcomeFormValues,
  locale: string,
  hash: string,
): WelcomeFormPayload | null {
  if (!values.modalidad || !values.lesion) return null;

  const isCrossfit = values.modalidad === "crossfit";
  const hasExperience = isCrossfit && values.experiencia === "si";
  const hasOtro = values.objetivos.includes("otro");

  return {
    locale,
    hash,
    nombre: values.nombre.trim(),
    whatsapp: values.whatsapp,
    modalidad: values.modalidad,
    experiencia: isCrossfit ? values.experiencia : undefined,
    expDetalle: hasExperience ? values.expDetalle.trim() : undefined,
    disponibilidad: serializeDisponibilidad(values.disponibilidad),
    deporte: values.deporte.trim(),
    lesion: values.lesion,
    lesionDetalle: values.lesion === "si" ? values.lesionDetalle.trim() : undefined,
    objetivos: values.objetivos,
    objetivoOtro: hasOtro ? values.objetivoOtro.trim() : undefined,
    extra: values.extra.trim() || undefined,
  };
}
