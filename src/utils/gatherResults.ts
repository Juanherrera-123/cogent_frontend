export interface FlatResult {
  [key: string]: any;
}

/**
 * Obtiene los resultados almacenados y los convierte en un arreglo
 * de objetos planos (una fila por empleado).
 */
export function gatherFlatResults(): FlatResult[] {
  const almacenados: any[] = JSON.parse(
    localStorage.getItem("resultadosCogent") || "[]"
  );

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
        const v = domA[k];
        fila[`A ${k}`] = v.transformado ?? v.puntajeTransformado ?? "";
      });
      const dimA = d.resultadoFormaA.dimensiones || {};
      Object.keys(dimA).forEach((k) => {
        const v = dimA[k];
        fila[`A ${k}`] = v.transformado ?? v.puntajeTransformado ?? "";
      });
    }

    if (d.resultadoFormaB) {
      fila["Puntaje Forma B"] =
        d.resultadoFormaB.total?.transformado ??
        d.resultadoFormaB.puntajeTransformadoTotal ??
        d.resultadoFormaB.puntajeTransformado ??
        d.resultadoFormaB.puntajeTotalTransformado ??
        "";
      fila["Nivel Forma B"] =
        d.resultadoFormaB.total?.nivel ??
        d.resultadoFormaB.nivelTotal ??
        d.resultadoFormaB.nivel ??
        "";
      const domB = d.resultadoFormaB.dominios || {};
      Object.keys(domB).forEach((k) => {
        const v = domB[k];
        fila[`B ${k}`] = v.transformado ?? v.puntajeTransformado ?? "";
      });
      const dimB = d.resultadoFormaB.dimensiones || {};
      Object.keys(dimB).forEach((k) => {
        const v = dimB[k];
        fila[`B ${k}`] = v.transformado ?? v.puntajeTransformado ?? "";
      });
    }

    if (d.resultadoExtralaboral) {
      fila["Puntaje Extralaboral"] =
        d.resultadoExtralaboral.puntajeTransformadoTotal ?? "";
      fila["Nivel Extralaboral"] = d.resultadoExtralaboral.nivelGlobal ?? "";
      const dims = d.resultadoExtralaboral.dimensiones || [];
      dims.forEach((dim: any) => {
        fila[`Extra ${dim.nombre}`] = dim.puntajeTransformado ?? "";
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
