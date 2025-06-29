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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = length === 1 ? cx : cx + radius * Math.cos(-midAngle * RADIAN);
    const y = length === 1 ? cy : cy + radius * Math.sin(-midAngle * RADIAN);
    const text = shortFormat && length >= shortenThreshold ? shortFormat(payload as T) : format(payload as T);
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="var(--text-main)">
        {text}
      </text>
    );
  };
}

export default renderPieLabel;
