import React from "react";

export default function TablaDominios({ datos, dominios, keyResultado }: { datos: any[]; dominios: string[]; keyResultado: string }) {
  if (datos.length === 0) {
    return <div className="py-6 text-gray-400">No hay resultados de dominios para mostrar.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border mt-2">
        <thead className="bg-primary-main text-white">
          <tr>
            <th>#</th>
            <th>Empresa</th>
            <th>Nombre</th>
            {dominios.map((dom, idx) => (
              <th key={idx}>{dom}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i} className="border-b">
              <td>{i + 1}</td>
              <td>{d.ficha?.empresa}</td>
              <td>{d.ficha?.nombre}</td>
              {dominios.map((dom, idx) => {
                let seccion = d[keyResultado]?.dominios?.[dom];
                if (Array.isArray(d[keyResultado]?.dominios)) {
                  const item = d[keyResultado].dominios.find((x: any) => x.nombre === dom);
                  seccion = item;
                }
                const valor =
                  typeof seccion === "object"
                    ? seccion.transformado ?? seccion.puntajeTransformado
                    : d[keyResultado]?.puntajesDominio?.[dom];
                return <td key={idx}>{valor ?? ""}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
