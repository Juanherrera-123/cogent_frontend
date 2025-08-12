import { Sociodemo } from "@/types/report";

/**
 * Genera texto de recomendaciones laborales a partir de datos sociodemográficos.
 */
export function getRecomendacionSociodemo(s: Sociodemo): string {
  const base =
    "Se puede evidenciar que la empresa presenta una población estable que cumple con procesos y procedimientos normativos, sin embargo, se recomienda revisar lo siguiente: ";
  const recomendaciones: string[] = [];

  // Vivienda: porcentaje de viviendas arrendadas
  const vivienda = s.vivienda || {};
  const totalVivienda = Object.values(vivienda).reduce((a, b) => a + b, 0);
  const arrendada = Object.entries(vivienda)
    .filter(([k]) => k.toLowerCase().includes("arrend"))
    .reduce((sum, [, c]) => sum + c, 0);
  if (totalVivienda && arrendada / totalVivienda > 0.5) {
    recomendaciones.push(
      "implementar o fortalecer programas de apoyo para adquisición de vivienda propia mediante beneficios de la caja de compensación familiar."
    );
  }

  // Promedio de horas diarias trabajadas
  const horas = s.horasDiarias || {};
  let horasTotal = 0;
  let personasHoras = 0;
  Object.entries(horas).forEach(([k, c]) => {
    const num = parseFloat(k.replace(",", "."));
    if (!isNaN(num)) {
      horasTotal += num * c;
      personasHoras += c;
    }
  });
  const promedioHoras = personasHoras ? horasTotal / personasHoras : 0;
  if (promedioHoras > 8.8) {
    recomendaciones.push(
      "ajustar la jornada laboral para cumplir con la Ley 2101 de 2021 sobre reducción progresiva de horas laborales."
    );
  }

  // Tipos de contrato temporales o no definidos
  const contratos = s.tipoContrato || {};
  const totalContratos = Object.values(contratos).reduce((a, b) => a + b, 0);
  const temporales = Object.entries(contratos)
    .filter(([k]) => {
      const l = k.toLowerCase();
      const esTemporal = l.includes("temporal");
      const esMenorAno =
        l.includes("menos") || l.includes("<") || (l.includes("1") && l.includes("año"));
      const noClasificado = !l.includes("fijo") && !l.includes("indef");
      return esTemporal || esMenorAno || noClasificado;
    })
    .reduce((sum, [, c]) => sum + c, 0);
  if (totalContratos && temporales / totalContratos > 0.5) {
    recomendaciones.push(
      "revisar y optimizar el sistema de contratación para fomentar la estabilidad laboral."
    );
  }

  return recomendaciones.length ? base + recomendaciones.join("; ") : base;
}
