import React from "react";
import type { Nivel } from "@/types/report";

interface AreaItem {
  dominio: string;
  dimension: string;
  nivelRiesgo: Nivel;
  porcentaje?: number;
  conteo?: number;
}

interface Props {
  data: AreaItem[];
  compact?: boolean;
  exportMode?: boolean;
  onRowClick?: (row: AreaItem) => void;
}

const RISK_COLORS: Record<"Medio" | "Alto" | "Muy alto", { bg: string; text: string }> = {
  Medio: { bg: "#FDE68A", text: "#0F172A" },
  Alto: { bg: "#F87171", text: "#FFFFFF" },
  "Muy alto": { bg: "#DC2626", text: "#FFFFFF" },
};

const INTERVENTION: Record<"Medio" | "Alto" | "Muy alto", string> = {
  Medio: "Secundario",
  Alto: "Terciario",
  "Muy alto": "Terciario",
};

export default function CuadroAreasDeMejora({
  data,
  compact = false,
  exportMode = false,
  onRowClick,
}: Props) {
  const filtered = data
    .filter((d) => ["Medio", "Alto", "Muy alto"].includes(d.nivelRiesgo))
    .sort((a, b) => {
      const sev: Record<string, number> = { "Muy alto": 0, Alto: 1, Medio: 2 };
      const diff = sev[a.nivelRiesgo] - sev[b.nivelRiesgo];
      if (diff !== 0) return diff;
      const dom = a.dominio.localeCompare(b.dominio);
      if (dom !== 0) return dom;
      return a.dimension.localeCompare(b.dimension);
    });

  const containerClasses = `rounded-2xl bg-white ${exportMode ? "shadow-none" : "shadow-sm"} p-4 md:p-6 font-montserrat text-text-main`;

  if (filtered.length === 0) {
    return (
      <div className={containerClasses}>
        <h3 className="text-lg font-semibold mb-4">Áreas de Mejora Identificadas</h3>
        <p className="text-sm text-center text-gray-500">
          No se identificaron áreas de mejora (no hay dimensiones en riesgo medio o superior).
        </p>
      </div>
    );
  }

  const renderRiskCell = (item: AreaItem) => {
    const color = RISK_COLORS[item.nivelRiesgo as "Medio" | "Alto" | "Muy alto"];
    const tooltipParts: string[] = [];
    if (typeof item.porcentaje === "number") {
      tooltipParts.push(`${item.porcentaje}%`);
    }
    if (typeof item.conteo === "number") {
      tooltipParts.push(`${item.conteo} personas`);
    }
    const tooltip = tooltipParts.join(" · ");
    return (
      <span
        className="px-2 py-1 rounded-md text-xs font-semibold block text-center"
        style={{ backgroundColor: color.bg, color: color.text }}
        aria-label={`Nivel de riesgo: ${item.nivelRiesgo}`}
        title={tooltip}
      >
        {item.nivelRiesgo}
      </span>
    );
  };

  const renderDesktop = () => (
    <div className="hidden md:block">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to text-white font-semibold">
          <tr className="text-left">
            <th scope="col" className="py-2 px-3">Dominio</th>
            <th scope="col" className="py-2 px-3">Dimensión</th>
            <th scope="col" className="py-2 px-3 text-center">Nivel de Riesgo</th>
            <th scope="col" className="py-2 px-3">Tipo de Intervención</th>
          </tr>
        </thead>
        <tbody className="text-text-main">
          {filtered.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(item)}
              className={`border-t odd:bg-primary-light even:bg-white text-text-main ${!exportMode && onRowClick ? "cursor-pointer hover:bg-primary-light" : ""}`}
            >
              <td className="py-2 px-3">{item.dominio}</td>
              <th scope="row" className="py-2 px-3 text-left font-medium">
                {item.dimension}
              </th>
              <td className="py-2 px-3">{renderRiskCell(item)}</td>
              <td className="py-2 px-3">{INTERVENTION[item.nivelRiesgo as "Medio" | "Alto" | "Muy alto"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMobile = () => (
    <div className="md:hidden divide-y text-text-main">
      {filtered.map((item, idx) => {
        const levelChip = renderRiskCell(item);
        const intervention = INTERVENTION[item.nivelRiesgo as "Medio" | "Alto" | "Muy alto"];
        return (
          <div
            key={idx}
            onClick={() => onRowClick?.(item)}
            className={`flex items-center justify-between py-3 odd:bg-primary-light even:bg-white text-text-main ${!exportMode && onRowClick ? "cursor-pointer hover:bg-primary-light" : ""}`}
          >
            <div className="flex flex-col">
              <span className="font-semibold">{item.dimension}</span>
              <span className="text-text-main text-sm">{item.dominio}</span>
            </div>
            <div className="flex gap-2 items-center">
              {levelChip}
              <span className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-200 text-slate-700">
                {intervention}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={containerClasses}>
      <h3 className="text-lg font-semibold mb-4">Áreas de Mejora Identificadas</h3>
      {!compact && renderDesktop()}
      {renderMobile()}
    </div>
  );
}

