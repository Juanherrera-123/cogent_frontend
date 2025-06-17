import { esquemaPuntajeEstres, mapaPreguntaEsquema } from "../data/esquemaEstres";

// Baremos de estrés por tipo de forma (puedes ponerlo en otro archivo si prefieres)
export const baremosEstresA = [
  { nivel: "Muy bajo", min: 0.0, max: 7.8 },
  { nivel: "Bajo", min: 7.9, max: 12.6 },
  { nivel: "Medio", min: 12.7, max: 17.7 },
  { nivel: "Alto", min: 17.8, max: 25.0 },
  { nivel: "Muy alto", min: 25.1, max: 100 }
];

export const baremosEstresB = [
  { nivel: "Muy bajo", min: 0.0, max: 6.5 },
  { nivel: "Bajo", min: 6.6, max: 11.8 },
  { nivel: "Medio", min: 11.9, max: 17.0 },
  { nivel: "Alto", min: 17.1, max: 23.4 },
  { nivel: "Muy alto", min: 23.5, max: 100 }
];

// Traduce la respuesta de cada pregunta al puntaje según su esquema
function respuestaAPuntaje(preguntaIdx: number, respuesta: string) {
  const esquema = mapaPreguntaEsquema[preguntaIdx + 1]; // preguntaIdx base 0, esquema base 1
  if (!esquema) return 0;
  return esquemaPuntajeEstres[esquema].valores[respuesta] ?? 0;
}

/**
 * Calcula el puntaje bruto, transformado y nivel de riesgo de estrés.
 * @param respuestas Array de respuestas (de 31 preguntas, texto: siempre, casi siempre, a veces, nunca)
 * @param tipoForma "A" o "B"
 * @returns {valido, puntajeBruto, puntajeTransformado, nivel}
 */
export function calcularEstres(
  respuestas: string[],
  tipoForma: "A" | "B"
) {
  if (respuestas.length !== 31 || respuestas.some(r => !r)) {
    return { valido: false, error: "Debe responder todas las preguntas de estrés" };
  }

  // Grupos y ponderaciones
  const grupos = [
    { desde: 0, hasta: 7, pondera: 4 },    // 1-8
    { desde: 8, hasta: 11, pondera: 3 },   // 9-12
    { desde: 12, hasta: 21, pondera: 2 },  // 13-22
    { desde: 22, hasta: 30, pondera: 1 },  // 23-31
  ];

  let puntajeBruto = 0;
  for (const grupo of grupos) {
    const arr = respuestas.slice(grupo.desde, grupo.hasta + 1);
    const sum = arr.reduce((acc, resp, i) => acc + respuestaAPuntaje(grupo.desde + i, resp), 0);
    const prom = sum / arr.length;
    puntajeBruto += prom * grupo.pondera;
  }

  let puntajeTransformado = Math.round((puntajeBruto * 100 / 61.16) * 10) / 10;
  if (puntajeTransformado < 0) puntajeTransformado = 0;
  if (puntajeTransformado > 100) puntajeTransformado = 100;

  const baremos = tipoForma === "A" ? baremosEstresA : baremosEstresB;
  const baremo = baremos.find(b => puntajeTransformado >= b.min && puntajeTransformado <= b.max);

  return {
    valido: true,
    puntajeBruto,
    puntajeTransformado,
    nivel: baremo?.nivel || "No clasificado",
  };
}
