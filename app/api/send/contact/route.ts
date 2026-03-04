import { Resend } from "resend";
import { ContactEmailTemplate } from "@/components/templates/ContactEmailTemplate";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const FROM = `Nexo CrossFit <${process.env.NEXT_PUBLIC_EMAIL_FROM}>`;
const TO = process.env.NEXT_PUBLIC_EMAIL_TO ?? 'agustinalonsocantoli@gmail.com';

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
      from: FROM,
      to: [TO],
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
