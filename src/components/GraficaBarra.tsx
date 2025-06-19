import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

const gradientes = {
  "Riesgo muy bajo": { id: "riesgo-muy-bajo", from: "#a3e3b9", to: "#48C774" },
  "Riesgo bajo": { id: "riesgo-bajo", from: "#92b0f4", to: "#2563EB" },
  "Riesgo medio": { id: "riesgo-medio", from: "#9dc0fa", to: "#3B82F6" },
  "Riesgo alto": { id: "riesgo-alto", from: "#afd2fc", to: "#60A5FA" },
  "Riesgo muy alto": { id: "riesgo-muy-alto", from: "#ff9d97", to: "#FF3B30" },
} as const;

const colorPorNivel = Object.fromEntries(
  Object.entries(gradientes).map(([nivel, g]) => [nivel, `url(#${g.id})`])
) as Record<keyof typeof gradientes, string>;
const nivelesRiesgo = Object.keys(colorPorNivel);

export default function GraficaBarra({
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
            <Pie data={resumen} dataKey="indice" nameKey="nombre" label>
              {resumen.map((d, i) => (
                <Cell key={i} fill={colorPorNivel[d.nivel as keyof typeof colorPorNivel]} />
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
            <XAxis
              dataKey="nombre"
              interval={0}
              angle={-18}
              textAnchor="end"
              height={70}
              tick={{ fill: "var(--text-main)", fontSize: 12 }}
            />
            <YAxis
              type="number"
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              tickFormatter={(v) => nivelesRiesgo[v]}
              tick={{ fill: "var(--text-main)", fontSize: 12 }}
            />
            <Tooltip labelStyle={{ color: "var(--text-main)" }} itemStyle={{ color: "var(--text-main)" }} />
            <Legend wrapperStyle={{ color: "var(--text-main)" }} />
            <Bar dataKey="indice" name="Nivel">
              <LabelList dataKey="nivel" position="top" />
              {resumen.map((d, i) => (
                <Cell key={i} fill={colorPorNivel[d.nivel as keyof typeof colorPorNivel]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
