import React from "react";

export default function TablaIndividual({ datos, tipo }: { datos: any[]; tipo: string }) {
  if (datos.length === 0) {
    return <div className="py-6 text-gray-400">No hay resultados individuales para mostrar.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border mt-2">
        <thead className="bg-cogent-blue text-white">
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
        </tbody>
      </table>
    </div>
  );
}
