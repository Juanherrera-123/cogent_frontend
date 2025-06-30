import React from "react";
import type { PieLabelRenderProps } from "recharts";

const RADIAN = Math.PI / 180;

export function renderPieLabel<T extends Record<string, any>>(
  length: number,
  format: (payload: T) => string,
  shortFormat?: (payload: T) => string,
  shortenThreshold = 6,
  showCondition?: (payload: T) => boolean
) {
  return ({ cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, payload }: PieLabelRenderProps): React.ReactNode => {
    if (showCondition && !showCondition(payload as T)) {
      return null;
    }
    const inner = Number(innerRadius) || 0;
    const outer = Number(outerRadius) || 0;
    const centerX = Number(cx) || 0;
    const centerY = Number(cy) || 0;
    const angle = Number(midAngle) || 0;

    const radius = inner + (outer - inner) * 0.5;
    const x = length === 1 ? centerX : centerX + radius * Math.cos(-angle * RADIAN);
    const y = length === 1 ? centerY : centerY + radius * Math.sin(-angle * RADIAN);
    const text = shortFormat && length >= shortenThreshold ? shortFormat(payload as T) : format(payload as T);
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="var(--text-main)">
        {text}
      </text>
    );
  };
}

export default renderPieLabel;
