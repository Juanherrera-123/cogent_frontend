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
  retroalimentacionData: RiskDistributionData;
  colaboradoresData: RiskDistributionData;
  controlDominioData: RiskDistributionData;
  claridadData: RiskDistributionData;
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
  retroalimentacionData,
  colaboradoresData,
  controlDominioData,
  claridadData,
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
  const retroalimentacionSentence = buildRiskSentence({
    levelsOrder: retroalimentacionData.levelsOrder,
    countsA: retroalimentacionData.countsA || {},
    countsB: retroalimentacionData.countsB || {},
    totalA: retroalimentacionData.totalA || 0,
    totalB: retroalimentacionData.totalB || 0,
  });
  const colaboradoresSentence = buildRiskSentence({
    levelsOrder: colaboradoresData.levelsOrder,
    countsA: colaboradoresData.countsA || {},
    countsB: colaboradoresData.countsB || {},
    totalA: colaboradoresData.totalA || 0,
    totalB: colaboradoresData.totalB || 0,
  });
  const claridadSentence = buildRiskSentence({
    levelsOrder: claridadData.levelsOrder,
    countsA: claridadData.countsA || {},
    countsB: claridadData.countsB || {},
    totalA: claridadData.totalA || 0,
    totalB: claridadData.totalB || 0,
  });
  const controlSentence = buildRiskSentence({
    levelsOrder: controlDominioData.levelsOrder,
    countsA: controlDominioData.countsA || {},
    countsB: controlDominioData.countsB || {},
    totalA: controlDominioData.totalA || 0,
    totalB: controlDominioData.totalB || 0,
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
  const stageRetroalimentacionA = calcStage(
    retroalimentacionData.countsA || {}
  );
  const stageRetroalimentacionB = calcStage(
    retroalimentacionData.countsB || {}
  );
  const showSuggestionsRetroalimentacion =
    stageRetroalimentacionA !== "primario" || stageRetroalimentacionB !== "primario";
  const stageColaboradoresA = colaboradoresData.totalA
    ? calcStage(colaboradoresData.countsA || {})
    : "primario";
  const stageColaboradoresB = colaboradoresData.totalB
    ? calcStage(colaboradoresData.countsB || {})
    : "primario";
  const showSuggestionsColaboradores =
    stageColaboradoresA !== "primario" || stageColaboradoresB !== "primario";
  const stageControlA = controlDominioData.totalA
    ? calcStage(controlDominioData.countsA || {})
    : "primario";
  const stageControlB = controlDominioData.totalB
    ? calcStage(controlDominioData.countsB || {})
    : "primario";
  const showSuggestionsControl =
    stageControlA !== "primario" || stageControlB !== "primario";
  const stageClaridadA = claridadData.totalA
    ? calcStage(claridadData.countsA || {})
    : "primario";
  const stageClaridadB = claridadData.totalB
    ? calcStage(claridadData.countsB || {})
    : "primario";
  const showSuggestionsClaridad =
    stageClaridadA !== "primario" || stageClaridadB !== "primario";
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
        <RiskDistributionChart
          title="Retroalimentación del desempeño Forma A y B"
          data={retroalimentacionData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Esta Dimension, refiere la Frecuencia, claridad y utilidad de la información que los trabajadores reciben sobre su rendimiento.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {retroalimentacionSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageRetroalimentacionA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageRetroalimentacionB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsRetroalimentacion ? (
              <>
                <p>
                  La Dimensión Retroalimentación del Desempeño: refiere la Frecuencia, claridad y utilidad de la información que los trabajadores reciben sobre su rendimiento.<br />
                  Ejemplo: Falta de feedback sobre el desempeño, feedback poco claro o inconsistente, feedback centrado solo en lo negativo.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Cultura de Feedback Constante: Promover una cultura de feedback continuo y constructivo, no solo durante las evaluaciones formales.
                  </li>
                  <li>
                    Capacitación en Habilidades de Feedback: Capacitar a líderes y empleados en cómo dar y recibir feedback de manera efectiva.
                  </li>
                  <li>
                    Sistemas de Evaluación de Desempeño Claros: Implementar sistemas de evaluación de desempeño que sean transparentes, justos y orientados al desarrollo.
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
          title="Relación con los colaboradores Forma A y B"
          data={colaboradoresData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Esta Dimensión refiere a la forma en que se gestionan las interacciones y
          conexiones entre los empleados dentro de una organización. Implica aspectos
          como la comunicación, la colaboración, el apoyo mutuo, el liderazgo y la
          creación de un ambiente de trabajo positivo.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {colaboradoresSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageColaboradoresA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageColaboradoresB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsColaboradores ? (
              <>
                <p>
                  La Dimensión Relación con los Colaboradores: Refiere a la forma en
                  que se gestionan las interacciones y conexiones entre los empleados
                  dentro de una organización.<br />
                  Ejemplo: Falta de colaboración, problemas de comunicación, ausencia
                  de apoyo mutuo, liderazgo poco participativo, ambiente laboral tenso.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Comunicación abierta y transparente: La comunicación efectiva y
                    honesta fomenta la confianza y la comprensión entre los
                    empleados y la dirección.
                  </li>
                  <li>
                    Colaboración y trabajo en equipo: Promover la colaboración y el
                    trabajo en equipo facilita el intercambio de ideas, el apoyo
                    mutuo y la resolución de problemas.
                  </li>
                  <li>
                    Apoyo y reconocimiento: Brindar apoyo emocional y reconocer los
                    logros de los empleados fortalece su sentido de pertenencia y
                    motivación.
                  </li>
                  <li>
                    Estilo de liderazgo: Un liderazgo eficaz que inspire, motive y
                    brinde orientación es fundamental para las relaciones positivas
                    entre líderes y colaboradores.
                  </li>
                  <li>
                    Bienestar laboral: Crear un entorno de trabajo saludable y
                    seguro, que promueva el bienestar físico y mental de los
                    empleados, es esencial para su satisfacción y productividad.
                  </li>
                  <li>
                    Resolución de conflictos: Contar con mecanismos efectivos para la
                    resolución de conflictos evita que las tensiones escalen y
                    perjudiquen las relaciones laborales.
                  </li>
                  <li>
                    Sentido de pertenencia: Fomentar un sentido de pertenencia a la
                    organización, donde los empleados se sientan valorados y parte de
                    un equipo, es crucial para su compromiso y lealtad.
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
          title="DOMINIO CONTROL SOBRE EL TRABAJO FORMA A Y FORMA B"
          data={controlDominioData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Posibilidad que el trabajo ofrece al individuo para influir y tomar decisiones sobre los diversos aspectos que intervienen en su realización. La iniciativa y autonomía, el uso y desarrollo de habilidades y conocimientos, la participación y manejo del cambio, la claridad de rol y la capacitación son aspectos que le dan al individuo la posibilidad de influir sobre su trabajo (Ministerio de la Protección Social y Pontificia Universidad Javeriana, 2010). Un mayor control suele asociarse con menor estrés y mayor satisfacción.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {controlSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageControlA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageControlB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsControl ? (
              <>
                <p>
                  Genere mayor Iniciativa y Autonomía: Grado de libertad y capacidad del trabajador para tomar decisiones sobre cómo realizar su trabajo, el orden de las tareas y el ritmo.<br />
                  Ejemplo: Escasa participación en la planificación del trabajo, poca libertad para tomar decisiones, tareas estrictamente supervisadas.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Empoderamiento y Delegación: Delegar responsabilidades y permitir a los empleados tomar decisiones sobre aspectos de su trabajo, dentro de marcos definidos.
                  </li>
                  <li>
                    Participación en la Toma de Decisiones: Involucrar a los trabajadores en la toma de decisiones que les afectan directamente.
                  </li>
                  <li>
                    Fomentar la Proactividad: Crear un ambiente que valore la iniciativa y la propuesta de mejoras por parte de los empleados.
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
          title="Claridad del rol Forma A y B"
          data={claridadData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          La organización ha proporcionado al trabajador información clara y suficiente sobre los objetivos, las funciones, el margen de autonomía, los resultados y el impacto que tiene el ejercicio del cargo en la empresa.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {claridadSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageClaridadA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageClaridadB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsClaridad ? (
              <>
                <p>
                  La Dimensión Claridad del Rol: Refiere a la información clara y suficiente que la organización brinda sobre objetivos, funciones, margen de autonomía, resultados e impacto del cargo.<br />
                  Ejemplo: Ambigüedad en las funciones, roles poco definidos, expectativas contradictorias o falta de información sobre las responsabilidades.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Descripciones de Puesto Claras y Actualizadas: Asegurar que las descripciones de puesto sean precisas, claras y estén actualizadas.
                  </li>
                  <li>
                    Inducción y Capacitación: Proporcionar una inducción completa y capacitaciones regulares para asegurar que los empleados comprendan sus roles.
                  </li>
                  <li>
                    Revisión Periódica de Roles: Realizar revisiones periódicas de los roles y responsabilidades para ajustarlos a las necesidades cambiantes.
                  </li>
                  <li>
                    Establecer Metas y Objetivos Claros: Definir objetivos claros y medibles para cada puesto, en línea con los objetivos de la organización.
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

