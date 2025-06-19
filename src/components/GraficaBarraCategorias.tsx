import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
  datos: any[];
  titulo: string;
  chartType: "bar" | "histogram" | "pie";
}) {
  return (
    <div className="flex-1 min-h-[450px]">
      <h4 className="font-bold mb-2 text-primary-main">{titulo}</h4>
      <ResponsiveContainer width="100%" height={450}>
        {chartType === "pie" ? (
          <PieChart>
            <Pie data={datos} dataKey="cantidad" nameKey="nombre" label>
              {datos.map((_, i) => (
                <Cell key={i} fill={coloresAzulFicha[i % coloresAzulFicha.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <BarChart data={datos} barCategoryGap={chartType === "histogram" ? 0 : undefined}>
            <XAxis dataKey="nombre" interval={0} angle={-18} textAnchor="end" height={70} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" name="Cantidad">
              {datos.map((_, i) => (
                <Cell key={i} fill={coloresAzulFicha[i % coloresAzulFicha.length]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
