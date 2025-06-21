import React, { useMemo } from "react";
import { baremosFormaA } from "@/data/baremosFormaA";
import { baremosFormaB } from "@/data/baremosFormaB";
import { ResultRow } from "@/types";

export default function TablaDominios({ datos, dominios, keyResultado }: { datos: ResultRow[]; dominios: string[]; keyResultado: string }) {
  const nivelesRiesgo = [
    "Riesgo muy bajo",
    "Riesgo bajo",
    "Riesgo medio",
    "Riesgo alto",
    "Riesgo muy alto",
  ];

  const promedios = useMemo(() => {
    const origen = keyResultado.toLowerCase().includes("formab") ? "formaB" : "formaA";
    return dominios.map((dom) => {
      const valores = datos
        .map((d) => {
          let seccion = d[keyResultado]?.dominios?.[dom];
          if (Array.isArray(d[keyResultado]?.dominios)) {
            seccion = d[keyResultado].dominios.find((x) => x.nombre === dom);
          }
          if (typeof seccion === "object") {
            return seccion.transformado ?? seccion.puntajeTransformado;
          }
          return d[keyResultado]?.puntajesDominio?.[dom];
        })
        .filter((v) => typeof v === "number");
      const prom = valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
      const promedio = Math.round(prom * 10) / 10;
      const baremos =
        origen === "formaA"
          ? baremosFormaA.dominios[dom] || []
          : baremosFormaB.dominio[dom] || [];
      const nivel =
        baremos.find((b) => promedio >= b.min && promedio <= b.max)?.nivel || "No clasificado";
      return {
        promedio,
        nivel: nivel === "Sin riesgo" ? "Riesgo muy bajo" : nivel,
      };
    });
  }, [datos, dominios, keyResultado]);
  if (datos.length === 0) {
    return <div className="py-6 text-gray-400">No hay resultados de dominios para mostrar.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]">
        <thead className="bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold">
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
                  const item = d[keyResultado].dominios.find((x) => x.nombre === dom);
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
          <tr className="font-semibold bg-gray-100">
            <td></td>
            <td>Promedio</td>
            <td></td>
            {promedios.map((p, idx) => (
              <td key={idx}>{p.promedio || ""}</td>
            ))}
          </tr>
          <tr className="font-semibold bg-gray-100">
            <td></td>
            <td>Nivel</td>
            <td></td>
            {promedios.map((p, idx) => (
              <td key={idx}>{p.nivel || ""}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
