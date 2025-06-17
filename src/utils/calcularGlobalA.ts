// src/utils/calcularGlobalA.ts

// Baremos para el global A + extralaboral
export const baremoGlobalAExtrala = [
  { nivel: "Sin riesgo", min: 0.0, max: 18.8 },
  { nivel: "Riesgo bajo", min: 18.9, max: 24.4 },
  { nivel: "Riesgo medio", min: 24.5, max: 29.5 },
  { nivel: "Riesgo alto", min: 29.6, max: 35.4 },
  { nivel: "Riesgo muy alto", min: 35.5, max: 100 }
];

// Calcula el puntaje global intralaboral (forma A) + extralaboral
export function calcularGlobalAExtrala(
  puntajeBrutoA: number,
  puntajeBrutoExtralaboral: number
) {
  const FACTOR = 616;
  let global = (puntajeBrutoA + puntajeBrutoExtralaboral) * 100 / FACTOR;
  global = Math.round(global * 10) / 10;
  if (global < 0) global = 0;
  if (global > 100) global = 100;
  const baremo = baremoGlobalAExtrala.find(b => global >= b.min && global <= b.max);
  return {
    puntajeGlobal: global,
    nivelGlobal: baremo?.nivel ?? "No clasificado"
  };
}
