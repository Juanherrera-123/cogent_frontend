import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const gradientes = {
  "Riesgo muy bajo": { id: "riesgo-muy-bajo", from: "#a3e3b9", to: "#48C774" },
  "Riesgo bajo": { id: "riesgo-bajo", from: "#92b0f4", to: "#2563EB" },
  "Riesgo medio": { id: "riesgo-medio", from: "#9dc0fa", to: "#3B82F6" },
  "Riesgo alto": { id: "riesgo-alto", from: "#afd2fc", to: "#60A5FA" },
  "Riesgo muy alto": { id: "riesgo-muy-alto", from: "#ff9d97", to: "#FF3B30" },
} as const;

const colores = Object.fromEntries(
  Object.entries(gradientes).map(([k, v]) => [k, `url(#${v.id})`])
) as Record<keyof typeof gradientes, string>;

export default function GraficaBarraSimple({
  resumen,
  titulo,
  chartType,
}: {
  resumen: any[];
  titulo: string;
  chartType: "bar" | "histogram" | "pie";
}) {
  return (
    <div className="flex-1 min-h-[450px]">
      <h4 className="font-bold mb-2 text-primary-main">{titulo}</h4>
      <ResponsiveContainer width="100%" height={450}>
        {chartType === "pie" ? (
          <PieChart>
            <defs>
              {Object.values(gradientes).map((g) => (
                <linearGradient id={g.id} key={g.id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={g.from} />
                  <stop offset="100%" stopColor={g.to} />
                </linearGradient>
              ))}
            </defs>
            <Pie data={resumen} dataKey="cantidad" nameKey="nivel" label>
              {resumen.map((d, i) => (
                <Cell key={i} fill={colores[d.nivel as keyof typeof colores]} />
              ))}
            </Pie>
            <Tooltip labelStyle={{ color: "var(--text-main)" }} itemStyle={{ color: "var(--text-main)" }} />
            <Legend wrapperStyle={{ color: "var(--text-main)" }} />
          </PieChart>
        ) : (
          <BarChart data={resumen} barCategoryGap={chartType === "histogram" ? 0 : undefined}>
            <defs>
              {Object.values(gradientes).map((g) => (
                <linearGradient id={g.id} key={g.id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={g.from} />
                  <stop offset="100%" stopColor={g.to} />
                </linearGradient>
              ))}
            </defs>
            <XAxis dataKey="nivel" tick={{ fill: "var(--text-main)", fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fill: "var(--text-main)", fontSize: 12 }} />
            <Tooltip labelStyle={{ color: "var(--text-main)" }} itemStyle={{ color: "var(--text-main)" }} />
            <Legend wrapperStyle={{ color: "var(--text-main)" }} />
            <Bar dataKey="cantidad" name="Cantidad">
              {resumen.map((d, i) => (
                <Cell key={i} fill={colores[d.nivel as keyof typeof colores]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
