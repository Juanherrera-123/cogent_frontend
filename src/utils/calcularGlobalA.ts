// src/utils/calcularGlobalA.ts

// Baremos para el global A + extralaboral
interface Baremo {
  nivel: string;
  min: number;
  max: number;
}

export const baremoGlobalAExtrala: Baremo[] = [
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
  const baremo = baremoGlobalAExtrala.find(
    (b: Baremo) => global >= b.min && global <= b.max
  );
  return {
    puntajeGlobal: global,
    nivelGlobal: baremo?.nivel ?? "No clasificado"
  };
}

// Calcula el puntaje global intralaboral (forma B) + extralaboral
// utilizando los factores y baremos propios de la Forma B
import { factoresFormaB } from "../data/factoresFormaB";
import { baremosFormaB } from "../data/baremosFormaB";

export function calcularGlobalBExtrala(
  puntajeBrutoB: number,
  puntajeBrutoExtralaboral: number
) {
  const FACTOR = factoresFormaB.global;
  let global = (puntajeBrutoB + puntajeBrutoExtralaboral) * 100 / FACTOR;
  global = Math.round(global * 10) / 10;
  if (global < 0) global = 0;
  if (global > 100) global = 100;
  const baremosGlobal: Baremo[] = baremosFormaB.global;
  const baremo = baremosGlobal.find(
    (b: Baremo) => global >= b.min && global <= b.max
  );
  return {
    puntajeGlobal: global,
    nivelGlobal: baremo?.nivel ?? "No clasificado"
  };
}
