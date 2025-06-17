import { esquemaFormaA } from "../data/esquemaFormaA";
import { factoresFormaA } from "../data/factoresFormaA";
import { baremosFormaA } from "../data/baremosFormaA";

type Respuestas = string[];

// Preguntas con esquema directo e inverso
const directas = new Set(
  esquemaFormaA.filter(q => q.esquema === "directo").map(q => q.numero)
);
const inversas = new Set(
  esquemaFormaA.filter(q => q.esquema === "inverso").map(q => q.numero)
);

// Traduce la respuesta a puntaje según su esquema
function respuestaAPuntaje(pregunta: number, respuesta: string) {
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
  return 0;
}

// Agrupa preguntas por la clave indicada
function agruparPor(arr: typeof esquemaFormaA, clave: "dimension" | "dominio") {
  const grupos: { [key: string]: number[] } = {};
  arr.forEach(q => {
    const key = q[clave];
    if (!key) return;
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(q.numero);
  });
  return grupos;
}

export function calcularFormaA(respuestas: Respuestas) {
  const mapRespuestas: { [num: number]: string } = {};
  respuestas.forEach((resp, idx) => {
    mapRespuestas[idx + 1] = resp;
  });

  const porDimension = agruparPor(esquemaFormaA, "dimension");
  const porDominio = agruparPor(esquemaFormaA, "dominio");

  const resultadoDimensiones: Record<string, { suma: number; transformado: number; nivel: string }> = {};
  Object.entries(porDimension).forEach(([dimension, preguntas]) => {
    const suma = preguntas.reduce(
      (acc, num) => acc + respuestaAPuntaje(num, mapRespuestas[num] || ""),
      0
    );
    const factor = factoresFormaA.dimensiones[dimension] ?? preguntas.length;
    const transformado = Math.round(((suma * 100) / factor) * 10) / 10;
    const baremo = baremosFormaA.dimensiones[dimension] || [];
    const nivel =
      baremo.find(b => transformado >= b.min && transformado <= b.max)?.nivel ||
      "No clasificado";
    resultadoDimensiones[dimension] = { suma, transformado, nivel };
  });

  const resultadoDominios: Record<string, { suma: number; transformado: number; nivel: string }> = {};
  Object.entries(porDominio).forEach(([dominio, preguntas]) => {
    const suma = preguntas.reduce(
      (acc, num) => acc + respuestaAPuntaje(num, mapRespuestas[num] || ""),
      0
    );
    const factor = factoresFormaA.dominios[dominio] ?? preguntas.length;
    const transformado = Math.round(((suma * 100) / factor) * 10) / 10;
    const baremo = baremosFormaA.dominios[dominio] || [];
    const nivel =
      baremo.find(b => transformado >= b.min && transformado <= b.max)?.nivel ||
      "No clasificado";
    resultadoDominios[dominio] = { suma, transformado, nivel };
  });

  const sumaTotal = Object.keys(mapRespuestas).reduce(
    (acc, numStr) => acc + respuestaAPuntaje(Number(numStr), mapRespuestas[Number(numStr)] || ""),
    0
  );
  const totalTransformado = Math.round((sumaTotal * 100 / factoresFormaA.total) * 10) / 10;
  const baremoTotal = baremosFormaA.total.find(
    b => totalTransformado >= b.min && totalTransformado <= b.max
  );

  return {
    dimensiones: resultadoDimensiones,
    dominios: resultadoDominios,
    total: {
      suma: sumaTotal,
      transformado: totalTransformado,
      nivel: baremoTotal?.nivel || "No clasificado"
    }
  };
}
