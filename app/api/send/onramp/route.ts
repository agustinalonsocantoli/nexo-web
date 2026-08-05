import { Resend } from "resend";
import { OnRampEmailTemplate } from "@/components/templates/OnRampEmailTemplate";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fecha,
      nombre,
      email,
      telefono,
      tipoDocumento,
      documento,
      fechaNacimiento,
      lesion,
      lesionDetalle,
      mensaje,
      comprobante,
    } = body as {
      fecha: string;
      nombre: string;
      email: string;
      telefono: string;
      tipoDocumento?: string;
      documento?: string;
      fechaNacimiento: string;
      lesion?: "si" | "no";
      lesionDetalle?: string;
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
      react: OnRampEmailTemplate({
        fecha,
        nombre,
        email,
        telefono,
        tipoDocumento,
        documento,
        fechaNacimiento,
        lesion,
        lesionDetalle,
        mensaje,
      }),
      attachments,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    // Decrement spots for the selected session
    if (fecha) {
      const session = await prisma.onRampSession.findUnique({ where: { slug: fecha } });
      if (session && session.spots > 0) {
        const newSpots = session.spots - 1;
        await prisma.onRampSession.update({
          where: { slug: fecha },
          data: {
            spots: newSpots,
            active: newSpots > 0,
          },
        });
      }
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
