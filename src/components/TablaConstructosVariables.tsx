import React from "react";
import { cn } from "@/lib/utils";

// COGENT: props definition
export type TablaConstructosVariablesProps = {
  className?: string; // opcional para márgenes externos
  title?: string; // opcional (default: "Constructos y variables")
  showFooterNote?: boolean; // default: true
  exportMode?: boolean; // default: false (si true, desactiva hovers/animaciones)
};

// COGENT: contenido fijo de la tabla
const datos = [
  {
    constructo: "Información sociodemográfica",
    variables: [
      "Tipo de cuestionario.",
      "Sexo.",
      "Edad (calculada a partir del año de nacimiento).",
      "Estado civil.",
      "Estrato socioeconómico de la vivienda.",
      "Grado de escolaridad (último nivel de estudios alcanzado).",
      "Tipo de vivienda (propia, familiar o en arriendo).",
      "Número de personas a cargo (se refiere al número de personas que de forma directa dependen económicamente del trabajador).",
    ],
  },
  {
    constructo: "Información ocupacional",
    variables: [
      "Tipo de vinculación.",
      "Tipo de cargo (jefatura, profesional, auxiliar y operativo).",
      "Tipo de salario.",
      "Antigüedad en la entidad.",
      "Antigüedad en el cargo.",
      "Horas trabajadas.",
    ],
  },
];

export default function TablaConstructosVariables({
  className,
  title = "Constructos y variables",
  showFooterNote = true,
  exportMode = false,
}: TablaConstructosVariablesProps) {
  const containerClass = cn(
    "rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-6 print:bg-white print:shadow-none print:border-0 print:p-0 print:m-0",
    className,
  );

  const rowBase =
    "block md:table-row border-b border-slate-100 odd:bg-white even:bg-slate-50/70";
  const rowInteractive = !exportMode ? "md:hover:bg-slate-50 transition-colors" : "";

  return (
    <div className={containerClass}>
      {title && (
        <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3">
          {title}
        </h3>
      )}
      <table className="w-full text-left border-collapse">
        <caption className="sr-only">Constructos y variables</caption>
        <thead className="hidden md:table-header-group">
          <tr className="bg-gradient-to-r from-sky-700 to-cyan-500 text-white font-semibold">
            <th scope="col" className="p-4 align-top">
              CONSTRUCTO
            </th>
            <th scope="col" className="p-4 align-top">
              VARIABLES
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group text-slate-700">
          {datos.map((row, idx) => (
            <tr key={idx} className={cn(rowBase, rowInteractive)}>
              <th
                scope="row"
                className="block md:table-cell font-semibold text-slate-800 p-4 align-top md:w-[38%]"
              >
                <span className="md:hidden text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">
                  Constructo
                </span>
                {row.constructo}
              </th>
              <td className="block md:table-cell p-4 align-top">
                <span className="md:hidden text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">
                  Variables
                </span>
                <ul role="list" className="list-disc pl-5 space-y-1">
                  {row.variables.map((variable, i) => (
                    <li key={i}>{variable}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showFooterNote && (
        <p className="mt-4 text-xs text-slate-500">
          (Fuente: Batería de instrumentos para la evaluación de factores de riesgo psicosocial).
        </p>
      )}
    </div>
  );
}

