import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GraficaBarraSimple from "@/components/GraficaBarraSimple";
import FichaTecnicaTabs, { CategoriaFicha } from "./FichaTecnicaTabs";

export default function GeneralResultsTabs({
  value,
  onChange,
  tabClass,
  chartType,
  datosA,
  datosB,
  datosExtra,
  datosEstres,
  resumenA,
  resumenB,
  resumenExtra,
  resumenEstres,
  categoriaFicha,
  onCategoriaChange,
  categoriasFicha,
  fichaConteos,
}: {
  value: string;
  onChange: (v: string) => void;
  tabClass: string;
  chartType: "bar" | "histogram" | "pie";
  datosA: any[];
  datosB: any[];
  datosExtra: any[];
  datosEstres: any[];
  resumenA: any[];
  resumenB: any[];
  resumenExtra: any[];
  resumenEstres: any[];
  categoriaFicha: string;
  onCategoriaChange: (v: string) => void;
  categoriasFicha: CategoriaFicha[];
  fichaConteos: Record<string, any[]>;
}) {
  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
      <TabsList className="mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">
        <TabsTrigger className={tabClass} value="resumen">
          Resultados
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="ficha">
          Ficha técnica
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resumen">
        <div className="grid md:grid-cols-2 gap-4">
          {datosA.length > 0 && (
            <GraficaBarraSimple
              resumen={resumenA}
              titulo="Niveles de Forma A"
              chartType={chartType}
            />
          )}
          {datosB.length > 0 && (
            <GraficaBarraSimple
              resumen={resumenB}
              titulo="Niveles de Forma B"
              chartType={chartType}
            />
          )}
          {datosExtra.length > 0 && (
            <GraficaBarraSimple
              resumen={resumenExtra}
              titulo="Niveles Extralaborales"
              chartType={chartType}
            />
          )}
          {datosEstres.length > 0 && (
            <GraficaBarraSimple
              resumen={resumenEstres}
              titulo="Niveles de Estrés"
              chartType={chartType}
            />
          )}
        </div>
      </TabsContent>
      <TabsContent value="ficha">
        <FichaTecnicaTabs
          categorias={categoriasFicha}
          categoria={categoriaFicha}
          onChange={onCategoriaChange}
          conteos={fichaConteos}
          chartType={chartType}
          tabClass={tabClass}
        />
      </TabsContent>
    </Tabs>
  );
}
