import { Resend } from "resend";
import { ClassEmailTemplate } from "@/components/templates/ClassEmailTemplate";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tipo, nombre, email, telefono, mensaje, fechaCurso, boxEntrenado, tiempoEntrenado } = body as {
      tipo: string;
      nombre: string;
      email: string;
      telefono: string;
      mensaje: string;
      fechaCurso?: string;
      boxEntrenado?: string;
      tiempoEntrenado?: string;
    };

    const { data, error } = await resend.emails.send({
      from: `${nombre} <${process.env.NEXT_PUBLIC_EMAIL_FROM}>`,
      to: [process.env.NEXT_PUBLIC_EMAIL_TO!],
      replyTo: email,
      subject: `Solicitud ${tipo} - ${nombre}`,
      react: ClassEmailTemplate({ tipo, nombre, email, telefono, mensaje, fechaCurso, boxEntrenado, tiempoEntrenado }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    // Decrement on-ramp spots if a course date was selected (first-timer)
    if (fechaCurso) {
      const session = await prisma.onRampSession.findUnique({ where: { slug: fechaCurso } });
      if (session && session.spots > 0) {
        const newSpots = session.spots - 1;
        await prisma.onRampSession.update({
          where: { slug: fechaCurso },
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
