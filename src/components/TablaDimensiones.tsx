import React from "react";

export default function TablaDimensiones({ datos, dimensiones, keyResultado }: { datos: any[]; dimensiones: string[]; keyResultado: string }) {
  if (datos.length === 0) {
    return <div className="py-6 text-gray-400">No hay resultados de dimensiones para mostrar.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border mt-2">
        <thead className="bg-cogent-blue text-white">
          <tr>
            <th>#</th>
            <th>Empresa</th>
            <th>Nombre</th>
            {dimensiones.map((dim, idx) => (
              <th key={idx}>{dim}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i} className="border-b">
              <td>{i + 1}</td>
              <td>{d.ficha?.empresa}</td>
              <td>{d.ficha?.nombre}</td>
              {dimensiones.map((dim, idx) => {
                let seccion = d[keyResultado]?.dimensiones?.[dim];
                if (Array.isArray(d[keyResultado]?.dimensiones)) {
                  const item = d[keyResultado].dimensiones.find((x: any) => x.nombre === dim);
                  seccion = item;
                }
                const valor =
                  typeof seccion === "object"
                    ? seccion.transformado ?? seccion.puntajeTransformado
                    : d[keyResultado]?.puntajesDimension?.[dim];
                return <td key={idx}>{valor ?? ""}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
