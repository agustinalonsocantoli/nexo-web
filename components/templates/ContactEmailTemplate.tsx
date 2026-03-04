interface ContactEmailTemplateProps {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export function ContactEmailTemplate({ nombre, email, telefono, mensaje }: ContactEmailTemplateProps) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#232a34", maxWidth: 600 }}>
      <h2 style={{ color: "#e95826" }}>Nuevo mensaje de contacto</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold", width: 140 }}>Nombre:</td>
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
            <td style={{ padding: "8px 0", fontWeight: "bold", verticalAlign: "top" }}>Mensaje:</td>
            <td style={{ padding: "8px 0", whiteSpace: "pre-wrap" }}>{mensaje}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
