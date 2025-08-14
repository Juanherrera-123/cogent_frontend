import React from "react";
import {
  ComposedChart,
  Bar,
  Cell,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

export type RiskDistributionData = {
  total: number;
  counts: Record<string, number>;
  levelsOrder: string[];
  invalid?: number;
  countsA?: Record<string, number>;
  countsB?: Record<string, number>;
  totalA?: number;
  totalB?: number;
};

interface Props {
  title: string;
  data: RiskDistributionData;
}

const levelColors: Record<string, string> = {
  "Muy bajo": "#16a34a", // green
  "Bajo": "#86efac", // light green
  "Medio": "#facc15", // yellow
  "Alto": "#fb923c", // orange
  "Muy alto": "#dc2626", // red
  Invalid: "#9ca3af", // gray
};

export default function RiskDistributionChart({ title, data }: Props) {
  const { total, counts, levelsOrder, invalid } = data;
  const formatter = new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (!total) {
    return (
      <div className="rounded-2xl shadow-sm bg-white p-4 md:p-6 font-montserrat text-[#172349]">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p>Sin datos para este dominio</p>
      </div>
    );
  }

  const levels = [...levelsOrder];
  const invalidLabel = "Inválido/Omitido";
  if (typeof invalid === "number") {
    levels.push(invalidLabel);
  }

  const chartData = levels.map((level) => {
    const count = level === invalidLabel ? invalid || 0 : counts[level] || 0;
    const percentage = total ? (count / total) * 100 : 0;
    return {
      level,
      count,
      countLabel: `${count}`,
      percentage,
      pctLabel: `${formatter.format(percentage)} %`,
      fill: levelColors[level] || levelColors.Invalid,
    };
  });

  return (
    <div className="rounded-2xl shadow-sm bg-white p-4 md:p-6 font-montserrat text-[#172349] mt-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" interval={0} tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            orientation="left"
            allowDecimals={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tickFormatter={(v) => `${formatter.format(v as number)}%`}
          />
          <Tooltip
            labelFormatter={(label) => `Nivel: ${label}`}
            formatter={(value: any, name: any) => {
              if (name === "% (Barras)") {
                return [`${formatter.format(value as number)} %`, "%"];
              }
              if (name === "# (Línea)") {
                return [value, "#"];
              }
              return [value, name];
            }}
          />
          <Legend />
          <Bar
            dataKey="percentage"
            name="% (Barras)"
            yAxisId="right"
            barSize={40}
          >
            <LabelList dataKey="pctLabel" position="top" />
            {chartData.map((d) => (
              <Cell key={d.level} fill={d.fill} />
            ))}
          </Bar>
          <Line
            type="linear"
            dataKey="count"
            name="# (Línea)"
            yAxisId="left"
            stroke="#172349"
          >
            <LabelList dataKey="countLabel" position="top" />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
      <div className="overflow-x-auto">
        <table className="w-full text-sm mt-4">
          <thead>
            <tr>
              <th className="text-left">Nivel</th>
              {chartData.map((d) => (
                <th key={d.level} className="text-center">
                  {d.level}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-left">#</td>
              {chartData.map((d) => (
                <td key={d.level} className="text-center">
                  {d.count}
                </td>
              ))}
            </tr>
            <tr>
              <td className="font-semibold text-left">%</td>
              {chartData.map((d) => (
                <td key={d.level} className="text-center">
                  {`${formatter.format(d.percentage)}%`}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

