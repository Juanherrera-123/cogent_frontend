import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  buildIntroduccion,
  type IntroduccionData,
} from "@/report/introduccion";
import TablaSociodemo from "@/components/TablaSociodemo";
import RiskDistributionChart, {
  type RiskDistributionData,
} from "@/components/RiskDistributionChart";
import { ReportPayload } from "@/types/report";
import Generalidades from "./Generalidades";
import Metodologia from "./Metodologia";
import { buildRiskSentence } from "@/utils/riskSentence";
import SemaphoreDial from "@/components/SemaphoreDial";

interface Props {
  tabClass: string;
  introduccionData: IntroduccionData;
  narrativaSociodemo?: string;
  recomendacionesSociodemo?: string;
  payload: ReportPayload;
  liderazgoDominioData: RiskDistributionData;
  liderazgoData: RiskDistributionData;
}

export default function InformeTabs({
  tabClass,
  introduccionData,
  narrativaSociodemo,
  recomendacionesSociodemo,
  payload,
  liderazgoDominioData,
  liderazgoData,
}: Props) {
  const [value, setValue] = useState("introduccion");
  const intro = buildIntroduccion(introduccionData);
  const dominioSentence = buildRiskSentence({
    levelsOrder: liderazgoDominioData.levelsOrder,
    countsA: liderazgoDominioData.countsA || {},
    countsB: liderazgoDominioData.countsB || {},
    totalA: liderazgoDominioData.totalA || 0,
    totalB: liderazgoDominioData.totalB || 0,
  });

  const counts = liderazgoDominioData.counts;
  const modalLevel = Object.keys(counts).reduce((max, key) =>
    counts[key] > (counts[max] || 0) ? key : max,
  "");
  let stage: "primario" | "secundario" | "terciario" = "primario";
  if (modalLevel === "Medio") stage = "secundario";
  else if (modalLevel === "Alto" || modalLevel === "Muy alto")
    stage = "terciario";
  return (
    <Tabs value={value} onValueChange={setValue} className="w-full">
      <TabsList className="mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">
        <TabsTrigger className={tabClass} value="introduccion">
          Introducción
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="generalidades">
          Generalidades
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="metodologia">
          Metodología
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="sociodemografia">
          Sociodemografía
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="graficas">
          Gráficas
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="estrategias">
          Estrategias
        </TabsTrigger>
      </TabsList>
        <TabsContent value="introduccion">
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed space-y-4">
            {intro.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="generalidades">
          <Generalidades />
        </TabsContent>
        <TabsContent value="metodologia">
          <Metodologia />
        </TabsContent>
        <TabsContent value="sociodemografia">
          {narrativaSociodemo && (
            <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed space-y-4 mb-6">
              <h3 className="text-lg font-semibold">Descripción sociodemográfica</h3>
              <p>{narrativaSociodemo}</p>
              {recomendacionesSociodemo && <p>{recomendacionesSociodemo}</p>}
            </div>
          )}
          <TablaSociodemo payload={payload} />
        </TabsContent>
        <TabsContent value="graficas">
        <RiskDistributionChart
          title="DOMINIO LIDERAZGO Y RELACIONES SOCIALES EN EL TRABAJO FORMA A Y FORMA B"
          data={liderazgoDominioData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Este dominio evalúa la calidad de la interacción con los superiores y compañeros, así como el apoyo social percibido en el entorno laboral. Un liderazgo deficiente y relaciones sociales conflictivas pueden ser fuentes importantes de riesgo psicosocial.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {dominioSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <SemaphoreDial stage={stage} />
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {stage === "primario" ? (
              <p>
                El dominio evaluado se encuentra en un nivel óptimo, sin presencia significativa de riesgo. No se requieren acciones adicionales ni planes de mejora inmediatos; sin embargo, es importante continuar fortaleciendo las prácticas actuales para mantener estos resultados. ¡Felicitaciones por destacar en esta área y seguir siendo un ejemplo de excelencia!
              </p>
            ) : (
              <>
                <p>
                  El  Dominio Liderazgo y Relaciones Sociales en el Trabajo:  refiere la Calidad de las interacciones entre compañeros, cohesión del equipo y disponibilidad de apoyo social.<br />
                  Ejemplo: Conflictos interpersonales, falta de apoyo entre compañeros, aislamiento social, acoso laboral.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Actividades de Integración y Construcción de Equipo (Team Building): Organizar eventos y actividades que fomenten la cohesión, el compañerismo y la integración entre los miembros del equipo.
                  </li>
                  <li>
                    Mediación de Conflictos: Contar con un proceso formal de mediación para resolver conflictos interpersonales de manera constructiva.
                  </li>
                  <li>
                    Fomentar la Colaboración y el Apoyo Mutuo: Crear un ambiente que valore la colaboración, el intercambio de conocimientos y el apoyo entre compañeros.
                  </li>
                  <li>
                    Políticas de Cero Tolerancia al Acoso: Implementar y comunicar claramente políticas de prevención e intervención del acoso laboral.
                  </li>
                </ol>
              </>
            )}
          </div>
        </div>
        <RiskDistributionChart
          title="Caracteristicas del liderazgo Forma A y B"
          data={liderazgoData}
        />
      </TabsContent>
        <TabsContent value="estrategias" />
      </Tabs>
    );
  }

