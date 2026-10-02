import { Resend } from "resend";
import { z } from "zod";
import { isValidQrHash, type WelcomeFormPayload } from "@/lib/qrForm";
import { MODALIDADES, MODALIDAD_LABELS, OBJETIVOS, SI_NO } from "@/lib/welcomeForm";
import { WelcomeEmailTemplate } from "@/components/templates/WelcomeEmailTemplate";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const SHORT_MAX = 200;
const LONG_MAX = 1000;

const bodySchema = z.object({
  locale: z.string().max(5).optional(),
  hash: z.string().min(1).max(100),
  nombre: z.string().trim().min(2).max(80),
  whatsapp: z.string().trim().min(5).max(30),
  modalidad: z.enum(MODALIDADES),
  experiencia: z.enum(SI_NO).optional(),
  expDetalle: z.string().max(LONG_MAX).optional(),
  disponibilidad: z.string().max(SHORT_MAX * 2).optional(),
  deporte: z.string().trim().min(1).max(SHORT_MAX),
  lesion: z.enum(SI_NO),
  lesionDetalle: z.string().max(LONG_MAX).optional(),
  objetivos: z.array(z.enum(OBJETIVOS)).min(1).max(OBJETIVOS.length),
  objetivoOtro: z.string().max(SHORT_MAX).optional(),
  extra: z.string().max(LONG_MAX).optional(),
});

function toPayload(data: z.infer<typeof bodySchema>): WelcomeFormPayload {
  return { ...data, locale: data.locale ?? "es" };
}

function safeFromName(nombre: string): string {
  return nombre.replace(/[<>"\r\n]/g, "").trim() || "Nexo Web";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!isValidQrHash(parsed.data.hash)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const payload = toPayload(parsed.data);
  const modalidadLabel = MODALIDAD_LABELS[payload.modalidad].toUpperCase();

  try {
    const { data, error } = await resend.emails.send({
      from: `${safeFromName(payload.nombre)} <${process.env.NEXT_PUBLIC_EMAIL_FROM}>`,
      to: [process.env.NEXT_PUBLIC_EMAIL_TO!],
      subject: `[Bienvenida] ${payload.nombre} · ${modalidadLabel}`,
      react: WelcomeEmailTemplate(payload),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
