import React, { useMemo } from "react";
import { ResultRow } from "@/types";

export default function TablaIndividual({ datos, tipo }: { datos: ResultRow[]; tipo: string }) {
  const promedios = useMemo(() => {
    const nivelesRiesgo = [
      "Riesgo muy bajo",
      "Riesgo bajo",
      "Riesgo medio",
      "Riesgo alto",
      "Riesgo muy alto",
    ];
    const nivelesEstres = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"];
    const usarEstres = tipo === "estres";
    const listaNiveles = usarEstres ? nivelesEstres : nivelesRiesgo;
    let suma = 0;
    let cuenta = 0;
    const indices: number[] = [];
    datos.forEach((d) => {
      let puntaje: number | undefined;
      let nivel: string | undefined;
      if (tipo === "formaA") {
        puntaje = d.resultadoFormaA?.total?.transformado;
        nivel = d.resultadoFormaA?.total?.nivel;
      } else if (tipo === "formaB") {
        puntaje =
          d.resultadoFormaB?.total?.transformado ??
          d.resultadoFormaB?.puntajeTransformadoTotal ??
          d.resultadoFormaB?.puntajeTransformado ??
          d.resultadoFormaB?.puntajeTotalTransformado;
        nivel =
          d.resultadoFormaB?.total?.nivel ??
          d.resultadoFormaB?.nivelTotal ??
          d.resultadoFormaB?.nivel;
      } else if (tipo === "extralaboral") {
        puntaje = d.resultadoExtralaboral?.puntajeTransformadoTotal;
        nivel = d.resultadoExtralaboral?.nivelGlobal;
      } else if (tipo === "globalExtra") {
        puntaje =
          d.resultadoGlobalAExtralaboral?.puntajeGlobal ??
          d.resultadoGlobalBExtralaboral?.puntajeGlobal;
        nivel =
          d.resultadoGlobalAExtralaboral?.nivelGlobal ??
          d.resultadoGlobalBExtralaboral?.nivelGlobal;
      } else if (tipo === "estres") {
        puntaje = d.resultadoEstres?.puntajeTransformado;
        nivel = d.resultadoEstres?.nivel;
      }
      if (typeof puntaje === "number") {
        suma += puntaje;
        cuenta += 1;
      }
      if (nivel) {
        const n = nivel === "Sin riesgo" ? "Riesgo muy bajo" : nivel;
        const idx = listaNiveles.indexOf(n);
        if (idx >= 0) indices.push(idx);
      }
    });
    const promPuntaje = cuenta ? Math.round((suma / cuenta) * 10) / 10 : "";
    const promNivel =
      indices.length > 0
        ? listaNiveles[
            Math.round(indices.reduce((a, b) => a + b, 0) / indices.length)
          ]
        : "";
    return { puntaje: promPuntaje, nivel: promNivel };
  }, [datos, tipo]);
  if (datos.length === 0) {
    return <div className="py-6 text-gray-400">No hay resultados individuales para mostrar.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]">
        <thead className="bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold">
          <tr>
            <th>#</th>
            <th>Empresa</th>
            <th>Nombre</th>
            <th>Sexo</th>
            <th>Cargo</th>
            {tipo === "formaA" && (
              <>
                <th>Puntaje Forma A</th>
                <th>Nivel Forma A</th>
              </>
            )}
            {tipo === "formaB" && (
              <>
                <th>Puntaje Forma B</th>
                <th>Nivel Forma B</th>
              </>
            )}
            {tipo === "extralaboral" && (
              <>
                <th>Puntaje Extralaboral</th>
                <th>Nivel Extra</th>
              </>
            )}
            {tipo === "globalExtra" && (
              <>
                <th>Puntaje Global A+Extra</th>
                <th>Nivel Global</th>
              </>
            )}
            {tipo === "estres" && (
              <>
                <th>Puntaje Estrés</th>
                <th>Nivel Estrés</th>
              </>
            )}
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i} className="border-b">
              <td>{i + 1}</td>
              <td>{d.ficha?.empresa}</td>
              <td>{d.ficha?.nombre}</td>
              <td>{d.ficha?.sexo}</td>
              <td>{d.ficha?.cargo}</td>
              {tipo === "formaA" && (
                <>
                  <td>{d.resultadoFormaA?.total?.transformado ?? ""}</td>
                  <td>{d.resultadoFormaA?.total?.nivel ?? ""}</td>
                </>
              )}
              {tipo === "formaB" && (
                <>
                  <td>
                    {d.resultadoFormaB?.total?.transformado ??
                      d.resultadoFormaB?.puntajeTransformadoTotal ??
                      d.resultadoFormaB?.puntajeTransformado ??
                      d.resultadoFormaB?.puntajeTotalTransformado ??
                      ""}
                  </td>
                  <td>
                    {d.resultadoFormaB?.total?.nivel ??
                      d.resultadoFormaB?.nivelTotal ??
                      d.resultadoFormaB?.nivel ??
                      ""}
                  </td>
                </>
              )}
              {tipo === "extralaboral" && (
                <>
                  <td>{d.resultadoExtralaboral?.puntajeTransformadoTotal ?? ""}</td>
                  <td>{d.resultadoExtralaboral?.nivelGlobal ?? ""}</td>
                </>
              )}
              {tipo === "globalExtra" && (
                <>
                  <td>
                    {d.resultadoGlobalAExtralaboral?.puntajeGlobal ??
                      d.resultadoGlobalBExtralaboral?.puntajeGlobal ?? ""}
                  </td>
                  <td>
                    {d.resultadoGlobalAExtralaboral?.nivelGlobal ??
                      d.resultadoGlobalBExtralaboral?.nivelGlobal ?? ""}
                  </td>
                </>
              )}
              {tipo === "estres" && (
                <>
                  <td>{d.resultadoEstres?.puntajeTransformado ?? ""}</td>
                  <td>{d.resultadoEstres?.nivel ?? ""}</td>
                </>
              )}
              <td>{d.fecha ? new Date(d.fecha).toLocaleString() : ""}</td>
            </tr>
          ))}
          <tr className="font-semibold bg-gray-100">
            <td></td>
            <td>Promedio</td>
            <td></td>
            <td></td>
            <td></td>
            {tipo === "formaA" && (
              <>
                <td>{promedios.puntaje}</td>
                <td>{promedios.nivel}</td>
              </>
            )}
            {tipo === "formaB" && (
              <>
                <td>{promedios.puntaje}</td>
                <td>{promedios.nivel}</td>
              </>
            )}
            {tipo === "extralaboral" && (
              <>
                <td>{promedios.puntaje}</td>
                <td>{promedios.nivel}</td>
              </>
            )}
            {tipo === "globalExtra" && (
              <>
                <td>{promedios.puntaje}</td>
                <td>{promedios.nivel}</td>
              </>
            )}
            {tipo === "estres" && (
              <>
                <td>{promedios.puntaje}</td>
                <td>{promedios.nivel}</td>
              </>
            )}
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
