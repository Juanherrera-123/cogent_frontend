import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GraficaBarraSimple from "@/components/GraficaBarraSimple";
import GraficaBarra from "@/components/GraficaBarra";
import TablaIndividual from "@/components/TablaIndividual";
import TablaDominios from "@/components/TablaDominios";
import TablaDimensiones from "@/components/TablaDimensiones";
import { ResultRow, NivelResumenCantidad, PromedioDato } from "@/types";

export default function FormaTabs({
  value,
  onChange,
  datos,
  resumen,
  promediosDominios,
  promediosDimensiones,
  dominios,
  dimensiones,
  chartType,
  tabClass,
  soloGenerales,
  tipo,
  keyResultado,
}: {
  value: string;
  onChange: (v: string) => void;
  datos: ResultRow[];
  resumen: NivelResumenCantidad[];
  promediosDominios: PromedioDato[];
  promediosDimensiones: PromedioDato[];
  dominios: string[];
  dimensiones: string[];
  chartType: "bar" | "histogram" | "pie";
  tabClass: string;
  soloGenerales?: boolean;
  tipo: "formaA" | "formaB";
  keyResultado: string;
}) {
  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
      <TabsList className="mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">
        <TabsTrigger className={tabClass} value="global">
          Global
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="dominios">
          Por Dominio
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="dimensiones">
          Por Dimensión
        </TabsTrigger>
      </TabsList>
      <TabsContent value="global">
        {datos.length === 0 ? (
          <div className="text-[var(--gray-medium)] py-4">
            No hay resultados de {tipo === "formaA" ? "Forma A" : "Forma B"}.
          </div>
        ) : (
          <>
            <GraficaBarraSimple
              resumen={resumen}
              titulo={`Niveles de ${tipo === "formaA" ? "Forma A" : "Forma B"}`}
              chartType={chartType}
            />
            {!soloGenerales && <TablaIndividual datos={datos} tipo={tipo} />}
          </>
        )}
      </TabsContent>
      <TabsContent value="dominios">
        {datos.length === 0 ? (
          <div className="text-[var(--gray-medium)] py-4">No hay datos para dominios.</div>
        ) : (
          <>
            <GraficaBarra
              resumen={promediosDominios}
              titulo="Promedio de Puntaje Transformado por Dominio"
              chartType={chartType}
            />
            {!soloGenerales && (
              <TablaDominios datos={datos} dominios={dominios} keyResultado={keyResultado} />
            )}
          </>
        )}
      </TabsContent>
      <TabsContent value="dimensiones">
        {datos.length === 0 ? (
          <div className="text-[var(--gray-medium)] py-4">No hay datos para dimensiones.</div>
        ) : (
          <>
            <GraficaBarra
              resumen={promediosDimensiones}
              titulo="Promedio de Puntaje Transformado por Dimensión"
              chartType={chartType}
            />
            {!soloGenerales && (
              <TablaDimensiones
                datos={datos}
                dimensiones={dimensiones}
                keyResultado={keyResultado}
              />
            )}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}
