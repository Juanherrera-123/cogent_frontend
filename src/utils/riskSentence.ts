export interface RiskSentenceInput {
  levelsOrder: string[];
  countsA: Record<string, number>;
  countsB: Record<string, number>;
  totalA: number;
  totalB: number;
}

export function buildRiskSentence({
  levelsOrder,
  countsA,
  countsB,
  totalA,
  totalB,
}: RiskSentenceInput): string {
  const combined: Record<string, number> = {};
  levelsOrder.forEach((lvl) => {
    combined[lvl] = (countsA[lvl] || 0) + (countsB[lvl] || 0);
  });
  let modal = levelsOrder[0];
  let max = combined[modal] || 0;
  for (const lvl of levelsOrder) {
    const value = combined[lvl] || 0;
    if (value > max) {
      max = value;
      modal = lvl;
    }
  }
  const fmt = (count: number, total: number) => {
    if (!total || total <= 0) return "0,00%";
    const pct = (count / total) * 100;
    return pct.toLocaleString("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%";
  };
  const pctA = fmt(countsA[modal] || 0, totalA);
  const pctB = fmt(countsB[modal] || 0, totalB);
  return `Esta gráfica refiere mayor incidencia en el riesgo ${modal} para el ${pctA} de la población de la forma A y ${pctB} de la forma B.`;
}
