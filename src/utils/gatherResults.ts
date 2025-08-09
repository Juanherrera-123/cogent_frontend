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
      Nombre: d.ficha?.nombre || "",
      Nro: idx + 1,
      Empresa: d.ficha?.empresa || "",
      Sexo: d.ficha?.sexo || "",
      Cargo: d.ficha?.cargo || "",
      "Fecha ficha": d.ficha?.fecha || "",
      Cédula: d.ficha?.cedula || "",
      Nacimiento: d.ficha?.nacimiento || "",
      "Estado civil": d.ficha?.estadoCivil || "",
      Estudios: d.ficha?.estudios || "",
      Ocupación: d.ficha?.ocupacion || "",
      "Ciudad residencia": d.ficha?.residenciaCiudad || "",
      "Departamento residencia": d.ficha?.residenciaDepto || "",
      Estrato: d.ficha?.estrato || "",
      Vivienda: d.ficha?.vivienda || "",
      Dependientes: d.ficha?.dependientes || "",
      "Ciudad trabajo": d.ficha?.trabajoCiudad || "",
      "Departamento trabajo": d.ficha?.trabajoDepto || "",
      "Años empresa": d.ficha
        ? d.ficha.menosAnioEmpresa
          ? "Menos de un año"
          : d.ficha.aniosEmpresa
        : "",
      "Tipo cargo": d.ficha?.tipoCargo || "",
      "Años cargo": d.ficha
        ? d.ficha.menosAnioCargo
          ? "Menos de un año"
          : d.ficha.aniosCargo
        : "",
      Área: d.ficha?.area || "",
      "Tipo contrato": d.ficha?.tipoContrato || "",
      "Horas diarias": d.ficha?.horasDiarias || "",
      "Tipo salario": d.ficha?.tipoSalario || "",
    };

    if (d.resultadoFormaA) {
      fila[
        "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma A (puntaje transformado)"
      ] = d.resultadoFormaA.total?.transformado ?? "";
      fila[
        "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma A (nivel de riesgo)"
      ] = d.resultadoFormaA.total?.nivel ?? "";
      const domA = d.resultadoFormaA.dominios || {};
      Object.keys(domA).forEach((k) => {
        const v = domA[k] as DimensionResultado & { puntajeTransformado?: number };
        fila[`DOMINIO: ${k} - Forma A (puntaje transformado)`] =
          v.transformado ?? v.puntajeTransformado ?? "";
        fila[`DOMINIO: ${k} - Forma A (nivel de riesgo)`] = v.nivel ?? "";
      });
      const dimA = d.resultadoFormaA.dimensiones || {};
      Object.keys(dimA).forEach((k) => {
        const v = dimA[k] as DimensionResultado & { puntajeTransformado?: number };
        fila[`Dimensión: ${k} - Forma A (puntaje transformado)`] =
          v.transformado ?? v.puntajeTransformado ?? "";
        fila[`Dimensión: ${k} - Forma A (nivel de riesgo)`] = v.nivel ?? "";
      });
    }

    if (d.resultadoFormaB) {
      const resB = d.resultadoFormaB as IntralaboralResultadoCompat;
      fila[
        "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma B (puntaje transformado)"
      ] =
        resB.total?.transformado ??
        resB.puntajeTransformadoTotal ??
        resB.puntajeTransformado ??
        resB.puntajeTotalTransformado ??
        "";
      fila[
        "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma B (nivel de riesgo)"
      ] =
        resB.total?.nivel ??
        resB.nivelTotal ??
        resB.nivel ??
        "";
      const domB = resB.dominios || {};
      Object.keys(domB).forEach((k) => {
        const v = domB[k] as DimensionResultado & { puntajeTransformado?: number };
        fila[`DOMINIO: ${k} - Forma B (puntaje transformado)`] =
          v.transformado ?? v.puntajeTransformado ?? "";
        fila[`DOMINIO: ${k} - Forma B (nivel de riesgo)`] = v.nivel ?? "";
      });
      const dimB = resB.dimensiones || {};
      Object.keys(dimB).forEach((k) => {
        const v = dimB[k] as DimensionResultado & { puntajeTransformado?: number };
        fila[`Dimensión: ${k} - Forma B (puntaje transformado)`] =
          v.transformado ?? v.puntajeTransformado ?? "";
        fila[`Dimensión: ${k} - Forma B (nivel de riesgo)`] = v.nivel ?? "";
      });
    }

    if (d.resultadoExtralaboral) {
      fila[
        "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial extralaboral (puntaje transformado)"
      ] = d.resultadoExtralaboral.puntajeTransformadoTotal ?? "";
      fila[
        "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial extralaboral (nivel de riesgo)"
      ] = d.resultadoExtralaboral.nivelGlobal ?? "";
      const dims: ResultadoExtraDimension[] =
        d.resultadoExtralaboral.dimensiones || [];
      dims.forEach((dim) => {
        const valor = dim.puntajeTransformado ?? dim.transformado ?? "";
        fila[`Dimensión: ${dim.nombre} - Extralaboral (puntaje transformado)`] =
          valor;
        fila[`Dimensión: ${dim.nombre} - Extralaboral (nivel de riesgo)`] =
          dim.nivel ?? "";
      });
    }

    if (d.resultadoEstres) {
      fila["Puntaje total evaluación de estrés (puntaje transformado)"] =
        d.resultadoEstres.puntajeTransformado ?? "";
      fila["Puntaje total evaluación de estrés (nivel de riesgo)"] =
        d.resultadoEstres.nivel ?? "";
    }

    return fila;
  });
}
