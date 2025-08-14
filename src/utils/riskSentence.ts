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
  const findModal = (counts: Record<string, number>): string => {
    let modal = levelsOrder[0];
    let max = counts[modal] ?? 0;
    for (const lvl of levelsOrder) {
      const value = counts[lvl] ?? 0;
      if (value > max) {
        max = value;
        modal = lvl;
      }
    }
    return modal;
  };

  const fmt = (count: number, total: number) => {
    if (!total || total <= 0) return "0,00%";
    const pct = (count / total) * 100;
    return (
      pct.toLocaleString("es-CO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + "%"
    );
  };

  const modalA = findModal(countsA);
  const modalB = findModal(countsB);
  const pctA = fmt(countsA[modalA] ?? 0, totalA);
  const pctB = fmt(countsB[modalB] ?? 0, totalB);

  return `Esta gráfica refiere mayor incidencia en el riesgo ${modalA} para el ${pctA} de la población de la forma A y mayor incidencia en el riesgo ${modalB} para el ${pctB} de la forma B.`;
}
