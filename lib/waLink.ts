export function waLink(telefono: string): string {
  const digits = telefono.replace(/\D/g, "");
  const isInternational = telefono.trim().startsWith("+");
  const number = isInternational || digits.startsWith("34") ? digits : `34${digits}`;
  return `https://wa.me/${number}`;
}
