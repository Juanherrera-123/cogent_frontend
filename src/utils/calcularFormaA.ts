import { esquemaFormaA } from "../data/esquemaFormaA";
import { factoresFormaA } from "../data/factoresFormaA";
import { baremosFormaA } from "../data/baremosFormaA";

type Respuestas = string[]; // ["Siempre", "Casi siempre", ...] con el orden correcto

// Esquema de puntaje
const PUNTAJE_DIRECTO = { "Siempre": 0, "Casi siempre": 1, "Algunas veces": 2, "Casi nunca": 3, "Nunca": 4 };
const PUNTAJE_INVERSO = { "Siempre": 4, "Casi siempre": 3, "Algunas veces": 2, "Casi nunca": 1, "Nunca": 0 };

// Función robusta de calificación
export function calcularFormaA(respuestas: Respuestas) {
  // 1. Mapea cada respuesta con su pregunta correspondiente en el esquema
  //    El esquema debe estar en orden: [ {numero, dominio, dimension, esquema}, ... ]
  let puntajes: { num: number, valor: number, dominio: string, dimension: string }[] = [];

  for (let i = 0; i < respuestas.length; i++) {
    const pregunta = esquemaFormaA[i];
    if (!pregunta || !pregunta.dominio || !pregunta.dimension || !pregunta.esquema) {
      // Omite preguntas no calificables (como las de filtro)
      continue;
    }
    const resp = respuestas[i];
    let valor = 0;
    if (pregunta.esquema === "directo") {
      valor = PUNTAJE_DIRECTO[resp] ?? 0;
    } else if (pregunta.esquema === "inverso") {
      valor = PUNTAJE_INVERSO[resp] ?? 0;
    } else {
      console.warn(`Pregunta ${pregunta.numero} no tiene esquema válido`);
    }
    puntajes.push({ num: pregunta.numero, valor, dominio: pregunta.dominio, dimension: pregunta.dimension });
  }

  // 2. Agrupa y calcula por dimensión
  let resultadoDimensiones: Record<string, any> = {};
  Object.entries(factoresFormaA.dimensiones).forEach(([dimension, { preguntas, factor }]) => {
    const puntos = puntajes.filter(p => preguntas.includes(p.num)).map(p => p.valor);
    const suma = puntos.reduce((a, b) => a + b, 0);
    const transformado = (suma * 100) / factor;
    const baremo = baremosFormaA.dimensiones[dimension]?.find(b => transformado >= b.min && transformado <= b.max);
    resultadoDimensiones[dimension] = {
      suma,
      transformado: Number(transformado.toFixed(1)),
      nivel: baremo?.nivel || "No clasificado"
    };
  });

  // 3. Agrupa y calcula por dominio
  let resultadoDominios: Record<string, any> = {};
  Object.entries(factoresFormaA.dominios).forEach(([dominio, { preguntas, factor }]) => {
    const puntos = puntajes.filter(p => preguntas.includes(p.num)).map(p => p.valor);
    const suma = puntos.reduce((a, b) => a + b, 0);
    const transformado = (suma * 100) / factor;
    const baremo = baremosFormaA.dominios[dominio]?.find(b => transformado >= b.min && transformado <= b.max);
    resultadoDominios[dominio] = {
      suma,
      transformado: Number(transformado.toFixed(1)),
      nivel: baremo?.nivel || "No clasificado"
    };
  });

  // 4. Total global
  const total = puntajes.reduce((a, b) => a + b.valor, 0);
  const totalTransformado = (total * 100) / factoresFormaA.total;
  const baremoTotal = baremosFormaA.total.find(b => totalTransformado >= b.min && totalTransformado <= b.max);

  return {
    dimensiones: resultadoDimensiones,
    dominios: resultadoDominios,
    total: {
      suma: total,
      transformado: Number(totalTransformado.toFixed(1)),
      nivel: baremoTotal?.nivel || "No clasificado"
    }
  };
}
