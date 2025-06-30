import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { NivelResumen } from "@/types";
import renderPieLabel from "@/components/CustomPieLabel";

const gradientes = {
  "Riesgo muy bajo": { id: "riesgo-muy-bajo", from: "#bfdbfe", to: "#3b82f6" },
  "Riesgo bajo": { id: "riesgo-bajo", from: "#bbf7d0", to: "#22c55e" },
  "Riesgo medio": { id: "riesgo-medio", from: "#fef9c3", to: "#facc15" },
  "Riesgo alto": { id: "riesgo-alto", from: "#fed7aa", to: "#f97316" },
  "Riesgo muy alto": { id: "riesgo-muy-alto", from: "#fecaca", to: "#ef4444" },
} as const;

const baseColores = Object.fromEntries(
  Object.entries(gradientes).map(([nivel, g]) => [nivel, `url(#${g.id})`])
) as Record<keyof typeof gradientes, string>;
const colorPorNivel: Record<string, string> = {
  ...baseColores,
  "Muy bajo": baseColores["Riesgo muy bajo"],
  Bajo: baseColores["Riesgo bajo"],
  Medio: baseColores["Riesgo medio"],
  Alto: baseColores["Riesgo alto"],
  "Muy alto": baseColores["Riesgo muy alto"],
};
const nivelesRiesgo = Object.keys(gradientes);

export default function GraficaBarra({
  resumen,
  titulo,
  chartType,
}: {
  resumen: NivelResumen[];
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
            <Pie
              data={resumen}
              dataKey="indice"
              nameKey="nombre"
              label={renderPieLabel(
                resumen.length,
                (payload) => `${payload.nombre}: ${payload.nivel}`,
                (payload) => payload.nivel,
                undefined,
                (payload) => payload.indice > 0
              )}
              labelLine={false}
            >
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
            <XAxis dataKey="nombre" interval={0} angle={-18} textAnchor="end" height={70} />
            <YAxis type="number" domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} tickFormatter={(v) => nivelesRiesgo[v]} />
            <Tooltip />
            <Legend />
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
