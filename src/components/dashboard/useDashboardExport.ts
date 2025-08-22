import { useCallback } from "react";
import * as XLSX from "xlsx";
import { ResultRow } from "@/types";
import { FlatResult } from "@/utils/gatherResults";
import { exportElementToPDF } from "@/utils/pdfExport";

interface Params {
  tab: string;
  datosMostrados: ResultRow[];
  datosA: ResultRow[];
  datosB: ResultRow[];
  datosExtra: ResultRow[];
  datosEstres: ResultRow[];
  datosInforme: FlatResult[];
  allHeaders: string[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useDashboardExport({
  tab,
  datosMostrados,
  datosA,
  datosB,
  datosExtra,
  datosEstres,
  datosInforme,
  allHeaders,
  containerRef,
}: Params) {
  const handleExportar = useCallback(() => {
    let datosExportar: ResultRow[] | FlatResult[] = [];
    if (tab === "general") datosExportar = datosMostrados;
    else if (tab === "formaA") datosExportar = datosA;
    else if (tab === "formaB") datosExportar = datosB;
    else if (tab === "extralaboral") datosExportar = datosExtra;
    else if (tab === "estres") datosExportar = datosEstres;
    else if (tab === "informe" || tab === "informeCompleto")
      datosExportar = datosInforme;

    const filas =
      tab === "informe" || tab === "informeCompleto"
        ? datosInforme
        : (datosExportar as ResultRow[]).map((d, i) => {
            const row = d as ResultRow;
            return {
              Nro: i + 1,
              Empresa: row.ficha?.empresa || "",
              Nombre: row.ficha?.nombre || "",
              Sexo: row.ficha?.sexo || "",
              Cargo: row.ficha?.cargo || "",
              Fecha: row.fecha ? new Date(row.fecha).toLocaleString() : "",
            };
          });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filas, { header: allHeaders });
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    XLSX.writeFile(wb, "resultados.xlsx");
  }, [
    tab,
    datosMostrados,
    datosA,
    datosB,
    datosExtra,
    datosEstres,
    datosInforme,
    allHeaders,
  ]);

  const handleExportPDF = useCallback(async () => {
    if (!containerRef.current) return;
    const active = containerRef.current.querySelector('[data-state="active"]');
    if (active) {
      await exportElementToPDF(active as HTMLElement, "resultados.pdf");
    }
  }, [containerRef]);

  return { handleExportar, handleExportPDF };
}

export default useDashboardExport;
