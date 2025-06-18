import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const colores = [
  "#48C774", // success
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#FF3B30", // error
];

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
            <Pie data={resumen} dataKey="cantidad" nameKey="nivel" label>
              {resumen.map((_, i) => (
                <Cell key={i} fill={colores[i % colores.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <BarChart data={resumen} barCategoryGap={chartType === "histogram" ? 0 : undefined}>
            <XAxis dataKey="nivel" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" name="Cantidad">
              {resumen.map((_, i) => (
                <Cell key={i} fill={colores[i % colores.length]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
