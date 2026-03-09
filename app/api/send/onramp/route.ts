import { Resend } from "resend";
import { OnRampEmailTemplate } from "@/components/templates/OnRampEmailTemplate";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fecha, nombre, email, telefono, dni, fechaNacimiento, mensaje, comprobante } = body as {
      fecha: string;
      nombre: string;
      email: string;
      telefono: string;
      dni: string;
      fechaNacimiento: string;
      mensaje: string;
      comprobante?: { content: string; filename: string };
    };

    const attachments = comprobante
      ? [{ filename: comprobante.filename, content: comprobante.content }]
      : [];

    const { data, error } = await resend.emails.send({
      from: `${nombre} <${process.env.NEXT_PUBLIC_EMAIL_FROM}>`,
      to: [process.env.NEXT_PUBLIC_EMAIL_TO!],
      replyTo: email,
      subject: `Reserva On Ramp - ${nombre}`,
      react: OnRampEmailTemplate({ fecha, nombre, email, telefono, dni, fechaNacimiento, mensaje }),
      attachments,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
