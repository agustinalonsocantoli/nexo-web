import { Resend } from "resend";
import { ContactEmailTemplate } from "@/components/templates/ContactEmailTemplate";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, mensaje } = body as {
      nombre: string;
      email: string;
      telefono: string;
      mensaje: string;
    };

    const { data, error } = await resend.emails.send({
      from: `${nombre} <${process.env.NEXT_PUBLIC_EMAIL_FROM}>`,
      to: [process.env.NEXT_PUBLIC_EMAIL_TO!],
      replyTo: email,
      subject: `Nuevo mensaje de contacto - ${nombre}`,
      react: ContactEmailTemplate({ nombre, email, telefono, mensaje }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
