import React from "react";

// COGENT: Props for the stress symptoms table component
export type TablaSintomasEstresProps = {
  className?: string; // márgenes externos opcionales
  title?: string; // default: "Síntomas reveladores de reacciones de estrés"
  showIntro?: boolean; // default: true (muestra el párrafo introductorio)
  showFooterNote?: boolean; // default: true (muestra la fuente)
  exportMode?: boolean; // default: false (true = sin animaciones/hover)
};

// COGENT: Tabla de síntomas de estrés reutilizable y adaptable a impresión
export default function TablaSintomasEstres({
  className = "",
  title = "Síntomas reveladores de reacciones de estrés",
  showIntro = true,
  showFooterNote = true,
  exportMode = false,
}: TablaSintomasEstresProps) {
  // COGENT: Datos de la tabla
  const rows = [
    {
      constructo: "Síntomas fisiológicos",
      definicion: "Presencia de síntomas físicos como dolores y trastornos del sueño.",
    },
    {
      constructo: "Síntomas de comportamiento",
      definicion:
        "Presencia de síntomas de conducta agresiva, incapacidad para realizar las tareas corrientes de la vida diaria, abuso de sustancias.",
    },
    {
      constructo: "Síntomas intelectuales y laborales",
      definicion:
        "Presencia de dificultad para pensar con claridad, creencias anormales, alteraciones de la memoria.",
    },
    {
      constructo: "Síntomas psicoemocionales",
      definicion: "Presencia de síntomas afectivos como: tristeza, miedo, ansiedad.",
    },
  ];

  const containerClasses = `rounded-2xl border border-slate-200 bg-white ${exportMode ? "shadow-none transition-none" : "shadow-sm"} p-4 md:p-6 print:bg-white print:shadow-none print:border-0 print:p-0 print:m-0 ${className}`;

  return (
    <div className={containerClasses}>
      <h2 className="text-base md:text-lg font-semibold text-slate-800 mb-3">{title}</h2>
      {showIntro && (
        <p className="text-sm text-slate-700 mb-4">
          Se evalúan síntomas reveladores de la presencia de reacciones de estrés, entendido este como un estado de cansancio mental provocado por la exigencia de un rendimiento muy superior al normal; suele provocar diversos trastornos físicos y mentales.
        </p>
      )}

      {/* COGENT: Vista de tabla para escritorio */}
      <div className="hidden md:block">
        <table className="w-full text-left border-collapse text-sm">
          <caption className="sr-only">
            Síntomas reveladores de reacciones de estrés — constructo y definición
          </caption>
          <thead className="bg-gradient-to-r from-sky-700 to-cyan-500 text-white font-semibold">
            <tr>
              <th scope="col" className="p-4 align-top text-left md:w-[36%]">
                CONSTRUCTO
              </th>
              <th scope="col" className="p-4 align-top text-left">
                DEFINICIÓN
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="odd:bg-white even:bg-slate-50/70 border-b border-slate-100 last:border-0"
              >
                <th
                  scope="row"
                  className="p-4 align-top font-semibold text-slate-800 md:w-[36%]"
                >
                  {row.constructo}
                </th>
                <td className="p-4 align-top text-slate-700">{row.definicion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COGENT: Vista de tarjetas para móviles */}
      <div className="md:hidden space-y-4">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="p-4 border border-slate-100 rounded-lg"
          >
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                CONSTRUCTO
              </p>
              <p className="font-semibold text-slate-800">{row.constructo}</p>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                DEFINICIÓN
              </p>
              <p className="text-slate-700">{row.definicion}</p>
            </div>
          </div>
        ))}
      </div>

      {showFooterNote && (
        <p className="mt-4 text-xs text-slate-500">
          (Fuente: Batería de instrumentos para la evaluación de factores de riesgo psicosocial).
        </p>
      )}
    </div>
  );
}

