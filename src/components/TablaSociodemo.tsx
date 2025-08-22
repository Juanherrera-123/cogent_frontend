import React from "react";
import { ReportPayload, SociodemoDistribucion } from "@/types/report";

interface Props {
  payload: ReportPayload;
  exportMode?: boolean;
}

interface GrupoDef {
  key: keyof ReportPayload["sociodemo"];
  titulo: string;
}

const grupos: GrupoDef[] = [
  { key: "genero", titulo: "GÉNERO" },
  { key: "estadoCivil", titulo: "ESTADO CIVIL" },
  { key: "escolaridad", titulo: "GRADO DE ESCOLARIDAD" },
  { key: "estrato", titulo: "ESTRATO S.E." },
  { key: "vivienda", titulo: "TIPO DE VIVIENDA" },
  { key: "personasACargo", titulo: "NÚMERO DE PERSONAS A CARGO" },
  { key: "antiguedad", titulo: "ANTIGÜEDAD EN LA EMPRESA" },
  { key: "tipoContrato", titulo: "TIPO DE CONTRATACIÓN" },
  { key: "horasDiarias", titulo: "HORAS DE TRABAJO ESTABLECIDAS" },
  { key: "salario", titulo: "TIPO DE SALARIO" },
];

const formatter = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function TablaSociodemo({ payload, exportMode = false }: Props) {
  const total = payload.muestra?.total || 0;

  function filasDesde(dist?: SociodemoDistribucion) {
    if (!dist) return [] as [string, number][];
    const entries = Object.entries(dist).filter(([, c]) => c > 0);
    return entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  return (
    <div className="rounded-2xl shadow-sm bg-white p-4 md:p-6 font-montserrat text-[#172349] avoid-break">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Ficha sociodemográfica</h3>
        <p className="text-sm text-gray-500">N = {total}</p>
      </div>
      <div className="space-y-6">
        {grupos.map(({ key, titulo }) => {
          const filas = filasDesde(payload.sociodemo?.[key]);
          if (filas.length === 0) return null;
          return (
            <div key={key}>
              <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold uppercase rounded-xl px-3 py-1 mb-2">
                {titulo}
              </div>
              <table className="w-full text-sm avoid-break">
                <thead className="hidden lg:table-header-group text-gray-500">
                  <tr className="border-b">
                    <th className="text-left py-2">Detalle</th>
                    <th className="text-right py-2">Nº Trabajadores</th>
                    <th className="text-right py-2">%</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map(([label, count]) => {
                    const percent = total > 0 ? (count / total) * 100 : 0;
                    const porcentaje = formatter.format(percent);
                    const rowClass = `border-b ${!exportMode ? "hover:bg-slate-50" : ""}`;
                    return (
                      <tr key={label} className={`${rowClass} avoid-break`}>
                        <td className="py-2">{label}</td>
                        <td className="py-2 text-right align-top">
                          <span className="hidden lg:inline">{total > 0 ? count : "—"}</span>
                          <div className="lg:hidden flex flex-col items-end">
                            <span>{total > 0 ? count : "—"}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs">{porcentaje}%</span>
                              <div className="w-20 bg-blue-50 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="bg-blue-600 h-full"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell py-2 text-right w-40">
                          <div className="flex items-center justify-end gap-2">
                            <span>{porcentaje}%</span>
                            <div className="w-24 bg-blue-50 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-blue-600 h-full"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

