import clsx from "clsx";

// COGENT: Props definition
export type TablaTiposRiesgoProps = {
  className?: string; // márgenes externos opcionales
  title?: string; // default: "Tipo de riesgo y definición"
  exportMode?: boolean; // default: false (true = sin animaciones/hover)
};

// COGENT: static data for risk levels
const rows = [
  {
    type: "Riesgo Muy alto",
    definition:
      "Nivel de riesgo con importante posibilidad de asociarse a respuestas muy altas de estrés. Requiere intervención inmediata en el marco de un Sistema de Vigilancia Epidemiológica.",
    badge: "bg-red-600 text-white",
  },
  {
    type: "Riesgo Alto",
    definition:
      "Nivel de riesgo con importante posibilidad de asociarse a respuestas altas de estrés. Requiere intervención inmediata en el marco de un SVE.",
    badge: "bg-orange-500 text-white",
  },
  {
    type: "Riesgo Medio",
    definition:
      "Nivel de riesgo en el que se esperaría una respuesta de estrés moderada. Amerita observación y acciones sistemáticas de intervención para prevenir efectos perjudiciales en la salud.",
    badge: "bg-yellow-400 text-slate-900",
  },
  {
    type: "Riesgo Bajo",
    definition:
      "No se espera que estos factores de riesgo estén relacionados con respuestas de estrés significativas. Requieren realizar programa de promoción y Prevención.",
    badge: "bg-green-500 text-white",
  },
  {
    type: "Riesgo Despreciable",
    definition:
      "Ausencia de riesgo o riesgo tan bajo que no amerita desarrollar actividades de intervención. Requieren realizar programa de promoción y Prevención.",
    badge: "bg-sky-500 text-white",
  },
];

export default function TablaTiposRiesgo({
  className,
  title = "Tipo de riesgo y definición",
  exportMode = false,
}: TablaTiposRiesgoProps) {
  // COGENT: container styles
  const containerClass = clsx(
    "rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-6 print:bg-white print:shadow-none print:border-0 print:p-0 print:m-0",
    className,
  );
  if (exportMode) {
    // COGENT: export mode disables interactive styles (no-op)
  }

  return (
    <div className={containerClass}>
      {title && (
        <h2 className="text-base md:text-lg font-semibold text-slate-800 mb-3">{title}</h2>
      )}
      {/* COGENT: desktop table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr className="bg-gradient-to-r from-sky-700 to-cyan-500 text-white font-semibold">
              <th scope="col" className="p-4 text-left align-top">
                TIPO DE RIESGO
              </th>
              <th scope="col" className="p-4 text-left align-top">
                DEFINICIÓN
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.type}
                className="odd:bg-white even:bg-slate-50/70 border-b border-slate-100"
              >
                <td
                  role="rowheader"
                  className="p-4 font-semibold text-slate-900 md:w-[28%]"
                >
                  <span
                    className={clsx(
                      "inline-block rounded px-2 py-1 text-xs font-semibold",
                      row.badge,
                    )}
                  >
                    {row.type}
                  </span>
                </td>
                <td className="p-4 align-top text-slate-700">{row.definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* COGENT: mobile stacked cards */}
      <div className="md:hidden space-y-3">
        {rows.map((row) => (
          <div
            key={row.type}
            className="rounded-lg border border-slate-200 bg-white p-4"
            aria-label={row.type}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Tipo de riesgo
              </span>
              <div className="mt-1">
                <span
                  className={clsx(
                    "inline-block rounded px-2 py-1 text-sm font-semibold",
                    row.badge,
                  )}
                >
                  {row.type}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Definición
              </span>
              <p className="mt-1 text-slate-700">{row.definition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

