interface OnRampEmailTemplateProps {
  fecha: string;
  nombre: string;
  email: string;
  telefono: string;
  dni: string;
  fechaNacimiento: string;
  mensaje: string;
}

export function OnRampEmailTemplate({
  fecha,
  nombre,
  email,
  telefono,
  dni,
  fechaNacimiento,
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
            <td style={{ padding: "8px 0" }}>{telefono}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold" }}>DNI:</td>
            <td style={{ padding: "8px 0" }}>{dni}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold" }}>Fecha de nacimiento:</td>
            <td style={{ padding: "8px 0" }}>{fechaNacimiento}</td>
          </tr>
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
