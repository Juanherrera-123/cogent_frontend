import { esquemaFormaB } from "../data/esquemaFormaB";
import { factoresFormaB } from "../data/factoresFormaB";
import { baremosFormaB } from "../data/baremosFormaB";

// Mapeo para esquema de puntaje directo e inverso
const directas = new Set(esquemaFormaB.filter(q => q.esquema === "directo").map(q => q.numero));
const inversas = new Set(esquemaFormaB.filter(q => q.esquema === "inverso").map(q => q.numero));

// Función que traduce respuesta a puntaje según esquema
function respuestaAPuntaje(pregunta: number, respuesta: string) {
  // Esquema Directo: Siempre: 0, Casi siempre: 1, Algunas veces: 2, Casi nunca: 3, Nunca: 4
  // Esquema Inverso: Siempre: 4, Casi siempre: 3, Algunas veces: 2, Casi nunca: 1, Nunca: 0
  const resp = respuesta.toLowerCase().trim();
  if (directas.has(pregunta)) {
    if (resp === "siempre") return 0;
    if (resp === "casi siempre") return 1;
    if (resp === "algunas veces") return 2;
    if (resp === "casi nunca") return 3;
    if (resp === "nunca") return 4;
  }
  if (inversas.has(pregunta)) {
    if (resp === "siempre") return 4;
    if (resp === "casi siempre") return 3;
    if (resp === "algunas veces") return 2;
    if (resp === "casi nunca") return 1;
    if (resp === "nunca") return 0;
  }
  return 0; // por defecto
}

// Utilidad para agrupar preguntas por dimensión/dominio
function agruparPor(arr: typeof esquemaFormaB, clave: "dimension" | "dominio") {
  const grupos: { [key: string]: number[] } = {};
  arr.forEach(q => {
    if (!grupos[q[clave]]) grupos[q[clave]] = [];
    grupos[q[clave]].push(q.numero);
  });
  return grupos;
}

// Función principal
export function calcularFormaB(respuestas: string[]) {
  if (respuestas.length !== 98) {
    return { valido: false, error: "El número de respuestas no coincide con la Forma B (98 preguntas)." };
  }
  // Mapeo: número de pregunta => respuesta
  const mapRespuestas: { [num: number]: string } = {};
  respuestas.forEach((resp, idx) => {
    mapRespuestas[idx + 1] = resp;
  });

  // Agrupaciones por dimensión y dominio
  const porDimension = agruparPor(esquemaFormaB, "dimension");
  const porDominio = agruparPor(esquemaFormaB, "dominio");

  // Calcular puntajes por dimensión
  const resultadosDimension: Record<string, { suma: number; transformado: number; nivel: string }> = {};
  Object.entries(porDimension).forEach(([dimension, preguntas]) => {
    const suma = preguntas.reduce(
      (acc, num) => acc + respuestaAPuntaje(num, mapRespuestas[num] || ""),
      0
    );
    const factor = factoresFormaB.dimension[dimension] ?? preguntas.length;
    const transformado = Math.round(((suma * 100) / factor) * 10) / 10;
    const baremo = baremosFormaB.dimension[dimension] || [];
    const nivel = baremo.find(b => transformado >= b.min && transformado <= b.max)?.nivel || "No clasificado";
    resultadosDimension[dimension] = { suma, transformado, nivel };
  });

  // Calcular puntajes por dominio
  const resultadosDominio: Record<string, { suma: number; transformado: number; nivel: string }> = {};
  Object.entries(porDominio).forEach(([dominio, preguntas]) => {
    const suma = preguntas.reduce(
      (acc, num) => acc + respuestaAPuntaje(num, mapRespuestas[num] || ""),
      0
    );
    const factor = factoresFormaB.dominio[dominio] ?? preguntas.length;
    const transformado = Math.round(((suma * 100) / factor) * 10) / 10;
    const baremo = baremosFormaB.dominio[dominio] || [];
    const nivel = baremo.find(b => transformado >= b.min && transformado <= b.max)?.nivel || "No clasificado";
    resultadosDominio[dominio] = { suma, transformado, nivel };
  });

  // Puntaje total
  const sumaTotal = Object.keys(mapRespuestas).reduce(
    (acc, numStr) => acc + respuestaAPuntaje(Number(numStr), mapRespuestas[Number(numStr)] || ""),
    0
  );
  const puntajeTotal = Math.round((sumaTotal * 100 / factoresFormaB.total) * 10) / 10;

  // Nivel total
  const baremoTotal = baremosFormaB.total || [];
  const nivelTotal = baremoTotal.find(b => puntajeTotal >= b.min && puntajeTotal <= b.max)?.nivel || "No clasificado";

  return {
    dimensiones: resultadosDimension,
    dominios: resultadosDominio,
    total: {
      suma: sumaTotal,
      transformado: puntajeTotal,
      nivel: nivelTotal,
    },
  };
}
