import React from "react";
import {
  ComposedChart,
  Bar,
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


export default function RiskDistributionChart({ title, data }: Props) {
  const {
    countsA = {},
    countsB = {},
    levelsOrder,
    invalid,
    totalA = 0,
    totalB = 0,
  } = data;
  const formatter = new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const total = totalA + totalB;
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
    const countA = level === invalidLabel ? 0 : countsA[level] || 0;
    const countB = level === invalidLabel ? 0 : countsB[level] || 0;
    const percentageA = totalA ? (countA / totalA) * 100 : 0;
    const percentageB = totalB ? (countB / totalB) * 100 : 0;
    return {
      level,
      countA,
      countLabelA: `${countA}`,
      percentageA,
      pctLabelA: `${formatter.format(percentageA)} %`,
      countB,
      countLabelB: `${countB}`,
      percentageB,
      pctLabelB: `${formatter.format(percentageB)} %`,
    };
  });

  const colorA = "#2563eb"; // blue
  const colorB = "#f97316"; // orange

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
              if (typeof name === "string" && name.includes("%")) {
                return [`${formatter.format(value as number)} %`, name];
              }
              if (typeof name === "string" && name.includes("#")) {
                return [value, name];
              }
              return [value, name];
            }}
          />
          <Legend />
          <Bar
            dataKey="percentageA"
            name="% Forma A"
            yAxisId="right"
            barSize={20}
            fill={colorA}
          >
            <LabelList dataKey="pctLabelA" position="top" />
          </Bar>
          <Bar
            dataKey="percentageB"
            name="% Forma B"
            yAxisId="right"
            barSize={20}
            fill={colorB}
          >
            <LabelList dataKey="pctLabelB" position="top" />
          </Bar>
          <Line
            type="linear"
            dataKey="countA"
            name="# Forma A"
            yAxisId="left"
            stroke={colorA}
          >
            <LabelList dataKey="countLabelA" position="top" />
          </Line>
          <Line
            type="linear"
            dataKey="countB"
            name="# Forma B"
            yAxisId="left"
            stroke={colorB}
          >
            <LabelList dataKey="countLabelB" position="top" />
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
              <td className="font-semibold text-left"># A</td>
              {chartData.map((d) => (
                <td key={d.level} className="text-center">
                  {d.countA}
                </td>
              ))}
            </tr>
            <tr>
              <td className="font-semibold text-left">% A</td>
              {chartData.map((d) => (
                <td key={d.level} className="text-center">
                  {`${formatter.format(d.percentageA)}%`}
                </td>
              ))}
            </tr>
            <tr>
              <td className="font-semibold text-left"># B</td>
              {chartData.map((d) => (
                <td key={d.level} className="text-center">
                  {d.countB}
                </td>
              ))}
            </tr>
            <tr>
              <td className="font-semibold text-left">% B</td>
              {chartData.map((d) => (
                <td key={d.level} className="text-center">
                  {`${formatter.format(d.percentageB)}%`}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

