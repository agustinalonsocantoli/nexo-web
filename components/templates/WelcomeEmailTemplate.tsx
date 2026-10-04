import type { ReactNode } from "react";
import type { WelcomeFormPayload } from "@/lib/qrForm";
import { MODALIDAD_LABELS, OBJETIVO_LABELS_ES } from "@/lib/welcomeForm";
import { waLink } from "@/lib/waLink";

type EmailRow = { kind: "group"; label: string } | { kind: "row"; label: string; value: ReactNode };

const EMPTY = "—";
const LOCALE_LABELS: Record<string, string> = { es: "Español", en: "Inglés" };

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Europe/Madrid",
});

function group(label: string): EmailRow {
  return { kind: "group", label };
}

function row(label: string, value: ReactNode): EmailRow {
  return { kind: "row", label, value };
}

function formatObjetivos(p: WelcomeFormPayload): string {
  const labels = p.objetivos
    .filter((o) => o !== "otro")
    .map((o) => OBJETIVO_LABELS_ES[o]);
  if (p.objetivos.includes("otro")) labels.push(`Otro: ${p.objetivoOtro?.trim() || EMPTY}`);
  return labels.join(", ") || EMPTY;
}

function trainingRows(p: WelcomeFormPayload): EmailRow[] {
  const rows = [group("Entrenamiento"), row("Modalidad", MODALIDAD_LABELS[p.modalidad])];

  if (p.modalidad !== "crossfit") {
    rows.push(row("Disponibilidad clase de prueba", p.disponibilidad || EMPTY));
    return rows;
  }

  rows.push(row("Experiencia previa", p.experiencia === "si" ? "Sí" : "No"));
  if (p.experiencia === "si") {
    rows.push(row("Tiempo y box", p.expDetalle?.trim() || EMPTY));
    rows.push(row("Disponibilidad clase de prueba", p.disponibilidad || EMPTY));
  } else {
    rows.push(row("Disponibilidad curso de iniciación", p.disponibilidad || EMPTY));
  }
  return rows;
}

function buildRows(p: WelcomeFormPayload): EmailRow[] {
  const lesion = p.lesion === "si" ? `Sí — ${p.lesionDetalle?.trim() || EMPTY}` : "No";

  return [
    group("Contacto"),
    row("Nombre", p.nombre),
    row(
      "WhatsApp",
      <a href={waLink(p.whatsapp)} style={{ color: "#1255cc" }}>
        {p.whatsapp}
      </a>,
    ),
    ...trainingRows(p),
    group("Sobre ti"),
    row("Deporte", p.deporte.trim() || EMPTY),
    row("Lesión", lesion),
    row("Objetivo", formatObjetivos(p)),
    row("Algo más", p.extra?.trim() || EMPTY),
    group("Meta"),
    row("Enviado", dateFormatter.format(new Date())),
    row("Idioma", LOCALE_LABELS[p.locale] ?? p.locale),
  ];
}

export function WelcomeEmailTemplate(payload: WelcomeFormPayload) {
  const rows = buildRows(payload);

  return (
    <div style={{ fontFamily: "sans-serif", color: "#232a34", maxWidth: 600 }}>
      <h2 style={{ color: "#e95826" }}>Nuevo formulario de bienvenida — {payload.nombre}</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {rows.map((r, i) =>
            r.kind === "group" ? (
              <tr key={i}>
                <td colSpan={2} style={{ padding: "10px 8px", fontWeight: "bold", backgroundColor: "#f3f4f6" }}>
                  {r.label}
                </td>
              </tr>
            ) : (
              <tr key={i}>
                <td style={{ padding: "8px", fontWeight: "bold", width: 180, verticalAlign: "top" }}>{r.label}:</td>
                <td style={{ padding: "8px", whiteSpace: "pre-wrap" }}>{r.value}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
