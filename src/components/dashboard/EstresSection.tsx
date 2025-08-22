import React from "react";
import GraficaBarraSimple from "@/components/GraficaBarraSimple";
import TablaIndividual from "@/components/TablaIndividual";
import { ResultRow } from "@/types";

interface ResumenItem {
  nombre: string;
  nivel: string;
  indice: number;
  cantidad: number;
}

type Props = {
  datosEstres: ResultRow[];
  resumenEstres: ResumenItem[];
  chartType: "bar" | "histogram" | "pie";
  soloGenerales?: boolean;
};

const EstresSection: React.FC<Props> = ({
  datosEstres,
  resumenEstres,
  chartType,
  soloGenerales,
}) => {
  return datosEstres.length === 0 ? (
    <div className="text-[var(--gray-medium)] py-4">
      No hay resultados de Estrés.
    </div>
  ) : (
    <>
      <GraficaBarraSimple
        resumen={resumenEstres}
        titulo="Niveles de Estrés"
        chartType={chartType}
      />
      {!soloGenerales && <TablaIndividual datos={datosEstres} tipo="estres" />}
    </>
  );
};

export default React.memo(EstresSection);
