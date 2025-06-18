import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

const colorPorNivel = {
  "Riesgo muy bajo": "#538DD4",
  "Riesgo bajo": "#91CF50",
  "Riesgo medio": "#FFFF00",
  "Riesgo alto": "#FFA400",
  "Riesgo muy alto": "#FF0000",
} as const;
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
      <h4 className="font-bold mb-2 text-cogent-blue">{titulo}</h4>
      <ResponsiveContainer width="100%" height={450}>
        {chartType === "pie" ? (
          <PieChart>
            <Pie data={resumen} dataKey="indice" nameKey="nombre" label>
              {resumen.map((d, i) => (
                <Cell key={i} fill={colorPorNivel[d.nivel as keyof typeof colorPorNivel]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <BarChart data={resumen} barCategoryGap={chartType === "histogram" ? 0 : undefined}>
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
