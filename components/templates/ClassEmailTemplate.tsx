interface ClassEmailTemplateProps {
  tipo: string;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  fechaCurso?: string;
  boxEntrenado?: string;
  tiempoEntrenado?: string;
}

function waLink(telefono: string) {
  const digits = telefono.replace(/\D/g, "");
  const number = digits.startsWith("34") ? digits : `34${digits}`;
  return `https://wa.me/${number}`;
}

export function ClassEmailTemplate({
  tipo,
  nombre,
  email,
  telefono,
  mensaje,
  fechaCurso,
  boxEntrenado,
  tiempoEntrenado,
}: ClassEmailTemplateProps) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#232a34", maxWidth: 600 }}>
      <h2 style={{ color: "#e95826" }}>Solicitud {tipo}</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold", width: 160 }}>Tipo:</td>
            <td style={{ padding: "8px 0" }}>{tipo}</td>
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
          {fechaCurso && (
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold" }}>Fecha curso:</td>
              <td style={{ padding: "8px 0" }}>{fechaCurso}</td>
            </tr>
          )}
          {boxEntrenado && (
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold" }}>Box entrenado:</td>
              <td style={{ padding: "8px 0" }}>{boxEntrenado}</td>
            </tr>
          )}
          {tiempoEntrenado && (
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold" }}>Tiempo entrenado:</td>
              <td style={{ padding: "8px 0" }}>{tiempoEntrenado}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: "8px 0", fontWeight: "bold", verticalAlign: "top" }}>Mensaje:</td>
            <td style={{ padding: "8px 0", whiteSpace: "pre-wrap" }}>{mensaje}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
