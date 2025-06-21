import { ResultRow, DimensionResultado, IntralaboralResultado } from "@/types";

type IntralaboralResultadoCompat = IntralaboralResultado & {
  puntajeTransformadoTotal?: number;
  puntajeTransformado?: number;
  puntajeTotalTransformado?: number;
  nivelTotal?: string;
  nivel?: string;
};

export type FlatResult = Record<string, string | number | undefined>;

interface ResultadoExtraDimension {
  nombre: string;
  puntajeTransformado?: number;
  transformado?: number;
  nivel?: string;
}

/**
 * Obtiene los resultados almacenados y los convierte en un arreglo
 * de objetos planos (una fila por empleado).
 */

export function gatherFlatResults(almacenados: ResultRow[]): FlatResult[] {

  return almacenados.map((d, idx) => {
    const fila: FlatResult = {
      Nro: idx + 1,
      Empresa: d.ficha?.empresa || "",
      Nombre: d.ficha?.nombre || "",
      Sexo: d.ficha?.sexo || "",
      Cargo: d.ficha?.cargo || "",
    };

    if (d.resultadoFormaA) {
      fila["Puntaje Forma A"] =
        d.resultadoFormaA.total?.transformado ?? "";
      fila["Nivel Forma A"] = d.resultadoFormaA.total?.nivel ?? "";
      const domA = d.resultadoFormaA.dominios || {};
      Object.keys(domA).forEach((k) => {
        const v = domA[k] as DimensionResultado & { puntajeTransformado?: number };
        fila[`A ${k}`] = v.transformado ?? v.puntajeTransformado ?? "";
        fila[`Nivel A ${k}`] = v.nivel ?? "";
      });
      const dimA = d.resultadoFormaA.dimensiones || {};
      Object.keys(dimA).forEach((k) => {
        const v = dimA[k] as DimensionResultado & { puntajeTransformado?: number };
        fila[`A ${k}`] = v.transformado ?? v.puntajeTransformado ?? "";
        fila[`Nivel A ${k}`] = v.nivel ?? "";
      });
    }

    if (d.resultadoFormaB) {
      const resB = d.resultadoFormaB as IntralaboralResultadoCompat;
      fila["Puntaje Forma B"] =
        resB.total?.transformado ??
        resB.puntajeTransformadoTotal ??
        resB.puntajeTransformado ??
        resB.puntajeTotalTransformado ??
        "";
      fila["Nivel Forma B"] =
        resB.total?.nivel ??
        resB.nivelTotal ??
        resB.nivel ??
        "";
      const domB = resB.dominios || {};
      Object.keys(domB).forEach((k) => {
        const v = domB[k] as DimensionResultado & { puntajeTransformado?: number };
        fila[`B ${k}`] = v.transformado ?? v.puntajeTransformado ?? "";
        fila[`Nivel B ${k}`] = v.nivel ?? "";
      });
      const dimB = resB.dimensiones || {};
      Object.keys(dimB).forEach((k) => {
        const v = dimB[k] as DimensionResultado & { puntajeTransformado?: number };
        fila[`B ${k}`] = v.transformado ?? v.puntajeTransformado ?? "";
        fila[`Nivel B ${k}`] = v.nivel ?? "";
      });
    }

    if (d.resultadoExtralaboral) {
      fila["Puntaje Extralaboral"] =
        d.resultadoExtralaboral.puntajeTransformadoTotal ?? "";
      fila["Nivel Extralaboral"] = d.resultadoExtralaboral.nivelGlobal ?? "";
      const dims: ResultadoExtraDimension[] =
        d.resultadoExtralaboral.dimensiones || [];
      dims.forEach((dim) => {
        const valor = dim.puntajeTransformado ?? dim.transformado ?? "";
        fila[`Extra ${dim.nombre}`] = valor;
        fila[`Nivel Extra ${dim.nombre}`] = dim.nivel ?? "";
      });
    }

    if (d.resultadoGlobalAExtralaboral) {
      fila["Puntaje Global A+Extra"] =
        d.resultadoGlobalAExtralaboral.puntajeGlobal ?? "";
      fila["Nivel Global"] = d.resultadoGlobalAExtralaboral.nivelGlobal ?? "";
    }

    if (d.resultadoEstres) {
      fila["Puntaje Estrés"] = d.resultadoEstres.puntajeTransformado ?? "";
      fila["Nivel Estrés"] = d.resultadoEstres.nivel ?? "";
    }

    fila["Fecha"] = d.fecha ? new Date(d.fecha).toLocaleString() : "";

    return fila;
  });
}
