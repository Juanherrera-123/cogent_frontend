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

const coloresBase = Object.fromEntries(
  Object.entries(gradientes).map(([k, v]) => [k, `url(#${v.id})`])
) as Record<keyof typeof gradientes, string>;
const colores: Record<string, string> = {
  ...coloresBase,
  "Muy bajo": coloresBase["Riesgo muy bajo"],
  Bajo: coloresBase["Riesgo bajo"],
  Medio: coloresBase["Riesgo medio"],
  Alto: coloresBase["Riesgo alto"],
  "Muy alto": coloresBase["Riesgo muy alto"],
};

export default function GraficaBarraSimple({
  resumen,
  titulo,
  chartType,
}: {
  resumen: (NivelResumen & { cantidad: number })[];
  titulo: string;
  chartType: "bar" | "histogram" | "pie";
}) {
  const total = resumen.reduce(
    (acc, d) => acc + (typeof d.cantidad === "number" ? d.cantidad : 0),
    0
  );
  const datos = resumen.map((d) => ({
    ...d,
    porcentaje: total ? (d.cantidad / total) * 100 : 0,
    label: `${d.cantidad} (${total ? ((d.cantidad / total) * 100).toFixed(0) : 0}%)`,
  }));
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
              data={datos}
              dataKey="cantidad"
              nameKey="nivel"
              label={renderPieLabel(
                datos.length,
                (payload) =>
                  `${payload.nivel}: ${payload.cantidad} (${payload.porcentaje.toFixed(0)}%)`,
                (payload) => `${payload.porcentaje.toFixed(0)}%`,
                undefined,
                (payload) => payload.porcentaje > 0
              )}
              labelLine={false}
            >
              {datos.map((d, i) => (
                <Cell key={i} fill={colores[d.nivel as keyof typeof colores]} />
              ))}
            </Pie>
            <Tooltip labelStyle={{ color: "var(--text-main)" }} itemStyle={{ color: "var(--text-main)" }} />
            <Legend wrapperStyle={{ color: "var(--text-main)" }} />
          </PieChart>
        ) : (
          <BarChart data={datos} barCategoryGap={chartType === "histogram" ? 0 : undefined}>
            <defs>
              {Object.values(gradientes).map((g) => (
                <linearGradient id={g.id} key={g.id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={g.from} />
                  <stop offset="100%" stopColor={g.to} />
                </linearGradient>
              ))}
            </defs>
            <XAxis dataKey="nivel" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" name="Cantidad">
              <LabelList dataKey="label" position="top" />
              {datos.map((d, i) => (
                <Cell key={i} fill={colores[d.nivel as keyof typeof colores]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
