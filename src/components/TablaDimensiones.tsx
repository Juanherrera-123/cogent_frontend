import React, { useMemo } from "react";
import { baremosFormaA } from "@/data/baremosFormaA";
import { baremosFormaB } from "@/data/baremosFormaB";
import { ResultRow } from "@/types";

export default function TablaDimensiones({ datos, dimensiones, keyResultado }: { datos: ResultRow[]; dimensiones: string[]; keyResultado: string }) {

  const promedios = useMemo(() => {
    const origen = keyResultado.toLowerCase().includes("formab") ? "formaB" : "formaA";
    return dimensiones.map((dim) => {
      const valores = datos
        .map((d) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const res = (d as any)[keyResultado];
          let seccion = res?.dimensiones?.[dim];
          if (Array.isArray(res?.dimensiones)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            seccion = res.dimensiones.find((x: any) => x.nombre === dim);
          }
          if (typeof seccion === "object") {
            return seccion.transformado ?? seccion.puntajeTransformado;
          }
          return res?.puntajesDimension?.[dim];
        })
        .filter((v) => typeof v === "number");
      if (valores.length === 0) {
        return { promedio: undefined, nivel: "Sin datos" };
      }
      const prom = valores.reduce((a, b) => a + b, 0) / valores.length;
      const promedio = Math.round(prom * 10) / 10;
      const baremos =
        origen === "formaA"
          ? baremosFormaA.dimensiones[dim] || []
          : baremosFormaB.dimension[dim] || [];
      const nivel =
        baremos.find((b) => promedio >= b.min && promedio <= b.max)?.nivel || "No clasificado";
      return {
        promedio,
        nivel: nivel === "Sin riesgo" ? "Riesgo muy bajo" : nivel,
      };
    });
  }, [datos, dimensiones, keyResultado]);
  if (datos.length === 0) {
    return <div className="py-6 text-gray-400">No hay resultados de dimensiones para mostrar.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]">
        <thead className="bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold">
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const res = (d as any)[keyResultado];
                let seccion = res?.dimensiones?.[dim];
                if (Array.isArray(res?.dimensiones)) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const item = res.dimensiones.find((x: any) => x.nombre === dim);
                  seccion = item;
                }
                const valor =
                  typeof seccion === "object"
                    ? seccion.transformado ?? seccion.puntajeTransformado
                    : res?.puntajesDimension?.[dim];
                return <td key={idx}>{valor ?? ""}</td>;
              })}
            </tr>
          ))}
          <tr className="font-semibold bg-gray-100">
            <td></td>
            <td>Promedio</td>
            <td></td>
            {promedios.map((p, idx) => (
              <td key={idx}>{p.promedio ?? "—"}</td>
            ))}
          </tr>
          <tr className="font-semibold bg-gray-100">
            <td></td>
            <td>Nivel</td>
            <td></td>
            {promedios.map((p, idx) => (
              <td key={idx}>{p.promedio === undefined ? "Sin datos" : p.nivel}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
