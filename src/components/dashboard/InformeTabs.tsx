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
  relacionesData: RiskDistributionData;
}

export default function InformeTabs({
  tabClass,
  introduccionData,
  narrativaSociodemo,
  recomendacionesSociodemo,
  payload,
  liderazgoDominioData,
  liderazgoData,
  relacionesData,
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
  const liderazgoSentence = buildRiskSentence({
    levelsOrder: liderazgoData.levelsOrder,
    countsA: liderazgoData.countsA || {},
    countsB: liderazgoData.countsB || {},
    totalA: liderazgoData.totalA || 0,
    totalB: liderazgoData.totalB || 0,
  });
  const relacionesSentence = buildRiskSentence({
    levelsOrder: relacionesData.levelsOrder,
    countsA: relacionesData.countsA || {},
    countsB: relacionesData.countsB || {},
    totalA: relacionesData.totalA || 0,
    totalB: relacionesData.totalB || 0,
  });

  type Stage = "primario" | "secundario" | "terciario";

  const calcStage = (counts: Record<string, number>): Stage => {
    const stageCounts = { primario: 0, secundario: 0, terciario: 0 };
    Object.entries(counts).forEach(([level, count]) => {
      if (level === "Muy bajo" || level === "Bajo") stageCounts.primario += count;
      else if (level === "Medio") stageCounts.secundario += count;
      else if (level === "Alto" || level === "Muy alto") stageCounts.terciario += count;
    });
    if (
      stageCounts.terciario >= stageCounts.secundario &&
      stageCounts.terciario >= stageCounts.primario
    )
      return "terciario";
    if (stageCounts.secundario >= stageCounts.primario) return "secundario";
    return "primario";
  };

  const stageA = calcStage(liderazgoDominioData.countsA || {});
  const stageB = calcStage(liderazgoDominioData.countsB || {});
  const showSuggestions = stageA !== "primario" || stageB !== "primario";
  const stageLiderazgoA = calcStage(liderazgoData.countsA || {});
  const stageLiderazgoB = calcStage(liderazgoData.countsB || {});
  const showSuggestionsLiderazgo =
    stageLiderazgoA !== "primario" || stageLiderazgoB !== "primario";
  const stageRelacionesA = calcStage(relacionesData.countsA || {});
  const stageRelacionesB = calcStage(relacionesData.countsB || {});
  const showSuggestionsRelaciones =
    stageRelacionesA !== "primario" || stageRelacionesB !== "primario";
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
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestions ? (
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
            ) : (
              <p>
                El dominio evaluado se encuentra en un nivel óptimo, sin presencia significativa de riesgo. No se requieren acciones adicionales ni planes de mejora inmediatos; sin embargo, es importante continuar fortaleciendo las prácticas actuales para mantener estos resultados. ¡Felicitaciones por destacar en esta área y seguir siendo un ejemplo de excelencia!
              </p>
            )}
          </div>
        </div>
        <RiskDistributionChart
          title="Caracteristicas del liderazgo Forma A y B"
          data={liderazgoData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Esta dimensión refiere los atributos de la gestión de los jefes inmediatos en
          relación con la planificación, asignación del trabajo, consecución de
          resultados, solución de conflictos, motivación, apoyo y comunicación.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {liderazgoSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageLiderazgoA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageLiderazgoB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsLiderazgo ? (
              <>
                <p>
                  La Dimensión Características del Liderazgo: refiere los atributos de la
                  gestión de los jefes inmediatos en relación con la planificación,
                  asignación del trabajo, consecución de resultados, solución de
                  conflictos, motivación, apoyo y comunicación.<br />
                  Ejemplo: Liderazgo autoritario, falta de apoyo, comunicación
                  deficiente, favoritismos, micro gestión, falta de reconocimiento
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Programas de Desarrollo de Liderazgo: Implementar programas de
                    capacitación para líderes y gerentes en habilidades como
                    comunicación efectiva, feedback constructivo, inteligencia
                    emocional, manejo de equipos y resolución de conflictos.
                  </li>
                  <li>
                    Evaluación 360° de Liderazgo: Realizar evaluaciones periódicas del
                    desempeño de los líderes, incluyendo feedback de sus equipos.
                  </li>
                  <li>
                    Fomentar el Liderazgo Transformacional: Promover un estilo de
                    liderazgo que inspire, motive y desarrolle el potencial de los
                    empleados.
                  </li>
                  <li>
                    Canales de Comunicación Abierta: Establecer canales para que los
                    empleados puedan expresar inquietudes sobre el liderazgo de manera
                    confidencial.
                  </li>
                </ol>
              </>
            ) : (
              <p>
                El dominio evaluado se encuentra en un nivel óptimo, sin presencia
                significativa de riesgo. No se requieren acciones adicionales ni
                planes de mejora inmediatos; sin embargo, es importante continuar
                fortaleciendo las prácticas actuales para mantener estos resultados.
                ¡Felicitaciones por destacar en esta área y seguir siendo un ejemplo
                de excelencia!
              </p>
            )}
          </div>
        </div>
        <RiskDistributionChart
          title="Relaciones sociales en el trabajo Forma A y B"
          data={relacionesData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Esta Dimension, refiere la Calidad de interacciones entre compañeros, cohesión del equipo y disponibilidad de apoyo social
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {relacionesSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageRelacionesA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageRelacionesB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsRelaciones ? (
              <>
                <p>
                  La Dimensión Relaciones Sociales en el Trabajo: refiere la Calidad de interacciones entre compañeros, cohesión del equipo y disponibilidad de apoyo social.<br />
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
            ) : (
              <p>
                El dominio evaluado se encuentra en un nivel óptimo, sin presencia significativa de riesgo. No se requieren acciones adicionales ni planes de mejora inmediatos; sin embargo, es importante continuar fortaleciendo las prácticas actuales para mantener estos resultados. ¡Felicitaciones por destacar en esta área y seguir siendo un ejemplo de excelencia!
              </p>
            )}
          </div>
        </div>
      </TabsContent>
        <TabsContent value="estrategias" />
      </Tabs>
    );
  }

