export default function shortNivelRiesgo(nivel: string): string {
  const withoutPrefix = nivel.replace(/^riesgo\s+/i, "");
  return withoutPrefix.charAt(0).toUpperCase() + withoutPrefix.slice(1);
}

export { shortNivelRiesgo };
