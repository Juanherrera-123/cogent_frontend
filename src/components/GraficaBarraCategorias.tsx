import React from "react";
import { CategoriaConteo } from "@/types";
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
import renderPieLabel from "@/components/CustomPieLabel";

// Blue palette used for chart segments
const coloresAzulFicha = [
  "#BBDEFB", // light blue
  "#90CAF9",
  "#64B5F6",
  "#42A5F5",
  "#2196F3",
  "#1976D2", // dark blue
];

export default function GraficaBarraCategorias({
  datos,
  titulo,
  chartType,
}: {
  datos: CategoriaConteo[];
  titulo: string;
  chartType: "bar" | "histogram" | "pie";
}) {
  const total = datos.reduce(
    (acc, d) => acc + (typeof d.cantidad === "number" ? d.cantidad : 0),
    0
  );
  const datosConPorcentaje = datos.map((d) => ({
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
            <Pie
              data={datosConPorcentaje}
              dataKey="cantidad"
              nameKey="nombre"
              label={renderPieLabel(
                datosConPorcentaje.length,
                (payload) =>
                  `${payload.nombre}: ${payload.cantidad} (${payload.porcentaje.toFixed(0)}%)`,
                (payload) => `${payload.porcentaje.toFixed(0)}%`,
                undefined,
                (payload) => payload.porcentaje > 0
              )}
              labelLine={false}
            >
              {datosConPorcentaje.map((_, i) => (
                <Cell key={i} fill={coloresAzulFicha[i % coloresAzulFicha.length]} />
              ))}
            </Pie>
            <Tooltip labelStyle={{ color: "var(--text-main)" }} itemStyle={{ color: "var(--text-main)" }} />
            <Legend wrapperStyle={{ color: "var(--text-main)" }} />
          </PieChart>
        ) : (
          <BarChart data={datosConPorcentaje} barCategoryGap={chartType === "histogram" ? 0 : undefined}>
            <XAxis
              dataKey="nombre"
              interval={0}
              angle={-18}
              textAnchor="end"
              height={70}
              tick={{ fill: "var(--text-main)", fontSize: 12 }}
            />
            <YAxis allowDecimals={false} tick={{ fill: "var(--text-main)", fontSize: 12 }} />
            <Tooltip labelStyle={{ color: "var(--text-main)" }} itemStyle={{ color: "var(--text-main)" }} />
            <Legend wrapperStyle={{ color: "var(--text-main)" }} />
            <Bar dataKey="cantidad" name="Cantidad">
              <LabelList dataKey="label" position="top" />
              {datosConPorcentaje.map((_, i) => (
                <Cell key={i} fill={coloresAzulFicha[i % coloresAzulFicha.length]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
