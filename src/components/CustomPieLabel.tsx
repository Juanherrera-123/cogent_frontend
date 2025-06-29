import React from "react";
import type { PieLabelRenderProps } from "recharts";

const RADIAN = Math.PI / 180;

export function renderPieLabel<T extends Record<string, any>>(
  length: number,
  format: (payload: T) => string,
  shortFormat?: (payload: T) => string,
  shortenThreshold = 6
) {
  return ({ cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, payload }: PieLabelRenderProps): React.ReactNode => {
    const cxNum = Number(cx);
    const cyNum = Number(cy);
    const inner = Number(innerRadius);
    const outer = Number(outerRadius);

    const radius = inner + (outer - inner) * 0.5;
    const x = length === 1 ? cxNum : cxNum + radius * Math.cos(-midAngle * RADIAN);
    const y = length === 1 ? cyNum : cyNum + radius * Math.sin(-midAngle * RADIAN);
    const text = shortFormat && length >= shortenThreshold ? shortFormat(payload as T) : format(payload as T);
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="var(--text-main)">
        {text}
      </text>
    );
  };
}

export default renderPieLabel;
