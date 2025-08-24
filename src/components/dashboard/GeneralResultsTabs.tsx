import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FichaTecnicaTabs, { CategoriaFicha } from "./FichaTecnicaTabs";
import {
  ResultRow,
  CategoriaConteo,
  NivelResumenCantidad,
  PromedioDato,
} from "@/types";
import FormaTabs from "./FormaTabs";
import ExtralaboralSection from "./ExtralaboralSection";
import EstresSection from "./EstresSection";

export default function GeneralResultsTabs({
  value,
  onChange,
  tabClass,
  chartType,
  datosA,
  resumenA,
  promediosDominiosA,
  promediosDimensionesA,
  dominiosA,
  dimensionesA,
  datosB,
  resumenB,
  promediosDominiosB,
  promediosDimensionesB,
  dominiosB,
  dimensionesB,
  datosExtra,
  resumenExtra,
  promediosDimensionesExtra,
  dimensionesExtra,
  datosEstres,
  resumenEstres,
  categoriaFicha,
  onCategoriaChange,
  categoriasFicha,
  fichaConteos,
  soloGenerales,
}: {
  value: string;
  onChange: (v: string) => void;
  tabClass: string;
  chartType: "bar" | "histogram" | "pie";
  datosA: ResultRow[];
  resumenA: NivelResumenCantidad[];
  promediosDominiosA: PromedioDato[];
  promediosDimensionesA: PromedioDato[];
  dominiosA: string[];
  dimensionesA: string[];
  datosB: ResultRow[];
  resumenB: NivelResumenCantidad[];
  promediosDominiosB: PromedioDato[];
  promediosDimensionesB: PromedioDato[];
  dominiosB: string[];
  dimensionesB: string[];
  datosExtra: ResultRow[];
  resumenExtra: NivelResumenCantidad[];
  promediosDimensionesExtra: PromedioDato[];
  dimensionesExtra: string[];
  datosEstres: ResultRow[];
  resumenEstres: NivelResumenCantidad[];
  categoriaFicha: string;
  onCategoriaChange: (v: string) => void;
  categoriasFicha: readonly CategoriaFicha[];
  fichaConteos: Record<string, CategoriaConteo[]>;
  soloGenerales?: boolean;
}) {
  const [tabA, setTabA] = useState("global");
  const [tabB, setTabB] = useState("global");

  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
      <TabsList className="mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">
        <TabsTrigger className={tabClass} value="formaA">
          Forma A (Intralaboral)
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="formaB">
          Forma B (Intralaboral)
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="extralaboral">
          Extralaboral
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="estres">
          Estrés
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="ficha">
          Ficha técnica
        </TabsTrigger>
      </TabsList>

      <TabsContent value="formaA">
        <FormaTabs
          value={tabA}
          onChange={setTabA}
          datos={datosA}
          resumen={resumenA}
          promediosDominios={promediosDominiosA}
          promediosDimensiones={promediosDimensionesA}
          dominios={dominiosA}
          dimensiones={dimensionesA}
          chartType={chartType}
          tabClass={tabClass}
          soloGenerales={soloGenerales}
          tipo="formaA"
          keyResultado="resultadoFormaA"
        />
      </TabsContent>

      <TabsContent value="formaB">
        <FormaTabs
          value={tabB}
          onChange={setTabB}
          datos={datosB}
          resumen={resumenB}
          promediosDominios={promediosDominiosB}
          promediosDimensiones={promediosDimensionesB}
          dominios={dominiosB}
          dimensiones={dimensionesB}
          chartType={chartType}
          tabClass={tabClass}
          soloGenerales={soloGenerales}
          tipo="formaB"
          keyResultado="resultadoFormaB"
        />
      </TabsContent>

      <TabsContent value="extralaboral">
        <ExtralaboralSection
          datosExtra={datosExtra}
          resumenExtra={resumenExtra}
          promediosDimensionesExtra={promediosDimensionesExtra}
          chartType={chartType}
          soloGenerales={soloGenerales}
        />
      </TabsContent>

      <TabsContent value="estres">
        <EstresSection
          datosEstres={datosEstres}
          resumenEstres={resumenEstres}
          chartType={chartType}
          soloGenerales={soloGenerales}
        />
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

