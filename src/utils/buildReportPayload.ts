import { ReportPayload, EmpresaInfo, Sociodemo } from "@/types/report";
import { FlatResult } from "@/utils/gatherResults";

// Field names used to detect the presence of results for each questionnaire.
const TOTAL_FORMA_A =
  "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma A (puntaje transformado)" as keyof FlatResult;
const TOTAL_FORMA_B =
  "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma B (puntaje transformado)" as keyof FlatResult;
const TOTAL_EXTRALABORAL =
  "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial extralaboral (puntaje transformado)" as keyof FlatResult;

function distribucion<T extends keyof FlatResult>(
  data: FlatResult[],
  key: T
): Record<string, number> {
  const out: Record<string, number> = {};
  data.forEach((r) => {
    const valAny = (r[key] ?? "") as unknown as string;
    const val = (typeof valAny === "string" ? valAny : String(valAny)).trim();
    if (!val) return;
    out[val] = (out[val] || 0) + 1;
  });
  return out;
}

type IndicadorSrc = {
  transformado?: number;
  puntajeTransformado?: number;
  nivel?: string;
};

function mapIndicadores(
  obj?: Record<string, IndicadorSrc>
): Record<string, { transformado?: number; nivel?: string }> {
  if (!obj) return {};
  const out: Record<string, { transformado?: number; nivel?: string }> = {};
  Object.keys(obj).forEach((k) => {
    const v = obj[k] ?? {};
    out[k] = {
      transformado: v.transformado ?? v.puntajeTransformado,
      nivel: v.nivel,
    };
  });
  return out;
}

/**
 * Construye la estructura de datos consumida por los reportes.
 * La cantidad de respuestas por formulario se calcula verificando la
 * presencia de los campos totales de cada cuestionario dentro de cada fila
 * plana.
 */
export function buildReportPayload(params: {
  empresa: EmpresaInfo;
  flat: FlatResult[];
  resumenA?: {
    global?: { puntajeGlobal?: number; nivelGlobal?: string };
    dominios?: Record<string, IndicadorSrc>;
    dimensiones?: Record<string, IndicadorSrc>;
  };
  resumenB?: {
    global?: { puntajeGlobal?: number; nivelGlobal?: string };
    dominios?: Record<string, IndicadorSrc>;
    dimensiones?: Record<string, IndicadorSrc>;
  };
  resumenExtra?: {
    global?: { puntajeGlobal?: number; nivelGlobal?: string };
    dimensiones?: Record<string, IndicadorSrc>;
  };
  estresGlobal?: { puntajeGlobal?: number; nivelGlobal?: string } | null;
}): ReportPayload {
  const { empresa, flat, resumenA, resumenB, resumenExtra, estresGlobal } = params;

  // ⚠️ Ajusta las llaves de FlatResult si son diferentes (genero, estadoCivil, estudio, estrato, vivienda, antiguedad, cargo, contrato, salario, horasDiarias).
  const sociodemo: Sociodemo = {
    genero: distribucion(flat, "Sexo" as keyof FlatResult),
    estadoCivil: distribucion(flat, "Estado civil" as keyof FlatResult),
    escolaridad: distribucion(flat, "Estudios" as keyof FlatResult),
    estrato: distribucion(flat, "Estrato" as keyof FlatResult),
    vivienda: distribucion(flat, "Vivienda" as keyof FlatResult),
    antiguedad: distribucion(flat, "Años empresa" as keyof FlatResult),
    tipoCargo: distribucion(flat, "Tipo cargo" as keyof FlatResult),
    tipoContrato: distribucion(flat, "Tipo contrato" as keyof FlatResult),
    salario: distribucion(flat, "Tipo salario" as keyof FlatResult),
    horasDiarias: distribucion(flat, "Horas diarias" as keyof FlatResult),
  };

  return {
    empresa,
    fechaInformeISO: new Date().toISOString(),
    muestra: {
      total: flat.length,
      formaA: flat.filter((r) => r[TOTAL_FORMA_A] !== undefined && r[TOTAL_FORMA_A] !== "").length,
      formaB: flat.filter((r) => r[TOTAL_FORMA_B] !== undefined && r[TOTAL_FORMA_B] !== "").length,
      extralaboral: flat.filter(
        (r) => r[TOTAL_EXTRALABORAL] !== undefined && r[TOTAL_EXTRALABORAL] !== ""
      ).length,
    },
    global: {
      formaA:
        resumenA?.global?.puntajeGlobal !== undefined
          ? { puntaje: resumenA!.global!.puntajeGlobal!, nivel: resumenA!.global!.nivelGlobal || "" }
          : undefined,
      formaB:
        resumenB?.global?.puntajeGlobal !== undefined
          ? { puntaje: resumenB!.global!.puntajeGlobal!, nivel: resumenB!.global!.nivelGlobal || "" }
          : undefined,
      extralaboral:
        resumenExtra?.global?.puntajeGlobal !== undefined
          ? { puntaje: resumenExtra!.global!.puntajeGlobal!, nivel: resumenExtra!.global!.nivelGlobal || "" }
          : undefined,
      estres: estresGlobal
        ? { puntaje: estresGlobal.puntajeGlobal ?? 0, nivel: estresGlobal.nivelGlobal ?? "" }
        : undefined,
    },
    dominios: {
      formaA: mapIndicadores(resumenA?.dominios),
      formaB: mapIndicadores(resumenB?.dominios),
    },
    dimensiones: {
      formaA: mapIndicadores(resumenA?.dimensiones),
      formaB: mapIndicadores(resumenB?.dimensiones),
      extralaboral: mapIndicadores(resumenExtra?.dimensiones),
    },
    sociodemo,
  };
}
