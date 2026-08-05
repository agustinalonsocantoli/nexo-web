import { documentLabel } from "@/lib/identity";

interface OnRampEmailTemplateProps {
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
}

function waLink(telefono: string) {
  const digits = telefono.replace(/\D/g, "");
  const number = digits.startsWith("34") ? digits : `34${digits}`;
  return `https://wa.me/${number}`;
}

export function OnRampEmailTemplate({
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
}: OnRampEmailTemplateProps) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#232a34", maxWidth: 600 }}>
      <h2 style={{ color: "#e95826" }}>Reserva On Ramp – {nombre}</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold", width: 180 }}>Fecha inicio curso:</td>
            <td style={{ padding: "8px 0" }}>{fecha}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold" }}>Nombre:</td>
            <td style={{ padding: "8px 0" }}>{nombre}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold" }}>Email:</td>
            <td style={{ padding: "8px 0" }}>{email}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold" }}>Teléfono:</td>
            <td style={{ padding: "8px 0" }}>
              <a href={waLink(telefono)} style={{ color: "#1255cc" }}>{telefono}</a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold" }}>{documentLabel(tipoDocumento)}:</td>
            <td style={{ padding: "8px 0" }}>{documento}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold" }}>Fecha de nacimiento:</td>
            <td style={{ padding: "8px 0" }}>{fechaNacimiento}</td>
          </tr>
          {lesion && (
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", verticalAlign: "top" }}>Lesiones:</td>
              <td style={{ padding: "8px 0", whiteSpace: "pre-wrap" }}>
                {lesion === "si" ? (
                  <strong style={{ color: "#e95826" }}>Sí</strong>
                ) : (
                  "No"
                )}
                {lesion === "si" && lesionDetalle ? ` — ${lesionDetalle}` : ""}
              </td>
            </tr>
          )}
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold", verticalAlign: "top" }}>Mensaje:</td>
            <td style={{ padding: "8px 0", whiteSpace: "pre-wrap" }}>{mensaje}</td>
          </tr>
        </tbody>
      </table>
      <p style={{ marginTop: 16, color: "#555" }}>
        <em>El comprobante de pago se adjunta a este correo.</em>
      </p>
    </div>
  );
}
