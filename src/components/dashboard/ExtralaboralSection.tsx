import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GraficaBarra from "@/components/GraficaBarra";
import GraficaBarraSimple from "@/components/GraficaBarraSimple";
import TablaDimensiones from "@/components/TablaDimensiones";
import TablaIndividual from "@/components/TablaIndividual";
import { dimensionesExtralaboral } from "@/data/esquemaExtralaboral";
import { ResultRow } from "@/types";

interface ResumenItem {
  nombre: string;
  nivel: string;
  indice: number;
  cantidad: number;
}

interface PromedioItem {
  nombre: string;
  promedio: number;
  nivel: string;
  indice: number;
}

interface Props {
  datosExtra: ResultRow[];
  resumenExtra: ResumenItem[];
  promediosDimensionesExtra: PromedioItem[];
  chartType: "bar" | "histogram" | "pie";
  soloGenerales?: boolean;
}

const ExtralaboralSection: React.FC<Props> = ({
  datosExtra,
  resumenExtra,
  promediosDimensionesExtra,
  chartType,
  soloGenerales,
}) => {
  const [tab, setTab] = useState("global");
  const tabPill =
    "px-5 py-2 rounded-full font-semibold border border-[#B2E2FF] text-[#172349] shrink-0 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#38BDF8] data-[state=active]:to-[#265FF2]";
  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">
        <TabsTrigger className={tabPill} value="global">
          Global
        </TabsTrigger>
        <TabsTrigger className={tabPill} value="dimensiones">
          Por Dimensión
        </TabsTrigger>
      </TabsList>
      <TabsContent value="global">
        {datosExtra.length === 0 ? (
          <div className="text-[var(--gray-medium)] py-4">
            No hay resultados Extralaborales.
          </div>
        ) : (
          <>
            <GraficaBarraSimple
              resumen={resumenExtra}
              titulo="Niveles Extralaborales"
              chartType={chartType}
            />
            {!soloGenerales && (
              <TablaIndividual datos={datosExtra} tipo="extralaboral" />
            )}
          </>
        )}
      </TabsContent>
      <TabsContent value="dimensiones">
        {datosExtra.length === 0 ? (
          <div className="text-[var(--gray-medium)] py-4">
            No hay datos para dimensiones.
          </div>
        ) : (
          <>
            <GraficaBarra
              resumen={promediosDimensionesExtra}
              titulo="Promedio de Puntaje Transformado por Dimensión"
              chartType={chartType}
            />
            {!soloGenerales && (
              <TablaDimensiones
                datos={datosExtra}
                dimensiones={dimensionesExtralaboral.map((d) => d.nombre)}
                keyResultado="resultadoExtralaboral"
              />
            )}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default React.memo(ExtralaboralSection);
