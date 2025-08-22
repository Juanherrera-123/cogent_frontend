import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  buildIntroduccion,
  type IntroduccionData,
} from "@/report/introduccion";
import TablaSociodemo from "@/components/TablaSociodemo";
import RiskDistributionChart, {
  type RiskDistributionData,
} from "@/components/RiskDistributionChart";
import { ReportPayload, type Nivel } from "@/types/report";
import Generalidades from "./Generalidades";
import Metodologia from "./Metodologia";
import { buildRiskSentence } from "@/utils/riskSentence";
import SemaphoreDial from "@/components/SemaphoreDial";
import ResultadosGeneralesCards, {
  type ResultadosGeneralesItem,
} from "@/components/ResultadosGeneralesCards";
import CuadroAreasDeMejora from "@/components/CuadroAreasDeMejora";
import AccordionItem from "@/components/AccordionItem";
import TablaInformativa from "@/components/TablaInformativa";
import { esquemaFormaA } from "@/data/esquemaFormaA";
import { esquemaFormaB } from "@/data/esquemaFormaB";
import { shortNivelRiesgo } from "@/utils/shortNivelRiesgo";

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
  autonomiaData: RiskDistributionData;
  claridadData: RiskDistributionData;
  capacitacionData: RiskDistributionData;
  participacionData: RiskDistributionData;
  oportunidadesData: RiskDistributionData;
  controlDominioData: RiskDistributionData;
  demandasDominioData: RiskDistributionData;
  demandasAmbientalesData: RiskDistributionData;
  demandasEmocionalesData: RiskDistributionData;
  demandasCuantitativasData: RiskDistributionData;
  influenciaTrabajoData: RiskDistributionData;
  exigenciasResponsabilidadData: RiskDistributionData;
  demandasCargaMentalData: RiskDistributionData;
  demandasJornadaData: RiskDistributionData;
  consistenciaRolData: RiskDistributionData;
  recompensasDominioData: RiskDistributionData;
  recompensasPertenenciaData: RiskDistributionData;
  reconocimientoCompensacionData: RiskDistributionData;
  intralaboralTotalData: RiskDistributionData;
  extralaboralData: RiskDistributionData;
  tiempoFueraTrabajoData: RiskDistributionData;
  relacionesFamiliaresData: RiskDistributionData;
  comunicacionRelacionesData: RiskDistributionData;
  situacionEconomicaData: RiskDistributionData;
  caracteristicasViviendaData: RiskDistributionData;
  influenciaEntornoTrabajoData: RiskDistributionData;
  desplazamientoViviendaTrabajoData: RiskDistributionData;
  factorEstresData: RiskDistributionData;
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
  autonomiaData,
  claridadData,
  capacitacionData,
  participacionData,
  oportunidadesData,
  controlDominioData,
  demandasDominioData,
  demandasAmbientalesData,
  demandasEmocionalesData,
  demandasCuantitativasData,
  influenciaTrabajoData,
  exigenciasResponsabilidadData,
  demandasCargaMentalData,
  demandasJornadaData,
  consistenciaRolData,
    recompensasDominioData,
    recompensasPertenenciaData,
    reconocimientoCompensacionData,
    intralaboralTotalData,
    extralaboralData,
    tiempoFueraTrabajoData,
  relacionesFamiliaresData,
  comunicacionRelacionesData,
  situacionEconomicaData,
  caracteristicasViviendaData,
  influenciaEntornoTrabajoData,
  desplazamientoViviendaTrabajoData,
  factorEstresData,
}: Props) {
  const [value, setValue] = useState("introduccion");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handleToggle = (id: string) =>
    setActiveItem((prev) => (prev === id ? null : id));
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
  const autonomiaSentence = buildRiskSentence({
    levelsOrder: autonomiaData.levelsOrder,
    countsA: autonomiaData.countsA || {},
    countsB: autonomiaData.countsB || {},
    totalA: autonomiaData.totalA || 0,
    totalB: autonomiaData.totalB || 0,
  });
  const claridadSentence = buildRiskSentence({
    levelsOrder: claridadData.levelsOrder,
    countsA: claridadData.countsA || {},
    countsB: claridadData.countsB || {},
    totalA: claridadData.totalA || 0,
    totalB: claridadData.totalB || 0,
  });
  const capacitacionSentence = buildRiskSentence({
    levelsOrder: capacitacionData.levelsOrder,
    countsA: capacitacionData.countsA || {},
    countsB: capacitacionData.countsB || {},
    totalA: capacitacionData.totalA || 0,
    totalB: capacitacionData.totalB || 0,
  });
  const participacionSentence = buildRiskSentence({
    levelsOrder: participacionData.levelsOrder,
    countsA: participacionData.countsA || {},
    countsB: participacionData.countsB || {},
    totalA: participacionData.totalA || 0,
    totalB: participacionData.totalB || 0,
  });
  const oportunidadesSentence = buildRiskSentence({
    levelsOrder: oportunidadesData.levelsOrder,
    countsA: oportunidadesData.countsA || {},
    countsB: oportunidadesData.countsB || {},
    totalA: oportunidadesData.totalA || 0,
    totalB: oportunidadesData.totalB || 0,
  });
  const controlSentence = buildRiskSentence({
    levelsOrder: controlDominioData.levelsOrder,
    countsA: controlDominioData.countsA || {},
    countsB: controlDominioData.countsB || {},
    totalA: controlDominioData.totalA || 0,
    totalB: controlDominioData.totalB || 0,
  });
  const demandasSentence = buildRiskSentence({
    levelsOrder: demandasDominioData.levelsOrder,
    countsA: demandasDominioData.countsA || {},
    countsB: demandasDominioData.countsB || {},
    totalA: demandasDominioData.totalA || 0,
    totalB: demandasDominioData.totalB || 0,
  });
  const demandasAmbientalesSentence = buildRiskSentence({
    levelsOrder: demandasAmbientalesData.levelsOrder,
    countsA: demandasAmbientalesData.countsA || {},
    countsB: demandasAmbientalesData.countsB || {},
    totalA: demandasAmbientalesData.totalA || 0,
    totalB: demandasAmbientalesData.totalB || 0,
  });
  const demandasEmocionalesSentence = buildRiskSentence({
    levelsOrder: demandasEmocionalesData.levelsOrder,
    countsA: demandasEmocionalesData.countsA || {},
    countsB: demandasEmocionalesData.countsB || {},
    totalA: demandasEmocionalesData.totalA || 0,
    totalB: demandasEmocionalesData.totalB || 0,
  });
  const influenciaTrabajoSentence = buildRiskSentence({
    levelsOrder: influenciaTrabajoData.levelsOrder,
    countsA: influenciaTrabajoData.countsA || {},
    countsB: influenciaTrabajoData.countsB || {},
    totalA: influenciaTrabajoData.totalA || 0,
    totalB: influenciaTrabajoData.totalB || 0,
  });
  const exigenciasResponsabilidadSentence = buildRiskSentence({
    levelsOrder: exigenciasResponsabilidadData.levelsOrder,
    countsA: exigenciasResponsabilidadData.countsA || {},
    countsB: exigenciasResponsabilidadData.countsB || {},
    totalA: exigenciasResponsabilidadData.totalA || 0,
    totalB: exigenciasResponsabilidadData.totalB || 0,
  });
  const demandasCuantitativasSentence = buildRiskSentence({
    levelsOrder: demandasCuantitativasData.levelsOrder,
    countsA: demandasCuantitativasData.countsA || {},
    countsB: demandasCuantitativasData.countsB || {},
    totalA: demandasCuantitativasData.totalA || 0,
    totalB: demandasCuantitativasData.totalB || 0,
  });
  const demandasCargaMentalSentence = buildRiskSentence({
    levelsOrder: demandasCargaMentalData.levelsOrder,
    countsA: demandasCargaMentalData.countsA || {},
    countsB: demandasCargaMentalData.countsB || {},
    totalA: demandasCargaMentalData.totalA || 0,
    totalB: demandasCargaMentalData.totalB || 0,
  });
  const demandasJornadaSentence = buildRiskSentence({
    levelsOrder: demandasJornadaData.levelsOrder,
    countsA: demandasJornadaData.countsA || {},
    countsB: demandasJornadaData.countsB || {},
    totalA: demandasJornadaData.totalA || 0,
    totalB: demandasJornadaData.totalB || 0,
  });
  const consistenciaRolSentence = buildRiskSentence({
    levelsOrder: consistenciaRolData.levelsOrder,
    countsA: consistenciaRolData.countsA || {},
    countsB: consistenciaRolData.countsB || {},
    totalA: consistenciaRolData.totalA || 0,
    totalB: consistenciaRolData.totalB || 0,
  });
  const recompensasSentence = buildRiskSentence({
    levelsOrder: recompensasDominioData.levelsOrder,
    countsA: recompensasDominioData.countsA || {},
    countsB: recompensasDominioData.countsB || {},
    totalA: recompensasDominioData.totalA || 0,
    totalB: recompensasDominioData.totalB || 0,
  });
  const recompensasPertenenciaSentence = buildRiskSentence({
    levelsOrder: recompensasPertenenciaData.levelsOrder,
    countsA: recompensasPertenenciaData.countsA || {},
    countsB: recompensasPertenenciaData.countsB || {},
    totalA: recompensasPertenenciaData.totalA || 0,
    totalB: recompensasPertenenciaData.totalB || 0,
  });
  const reconocimientoCompensacionSentence = buildRiskSentence({
    levelsOrder: reconocimientoCompensacionData.levelsOrder,
    countsA: reconocimientoCompensacionData.countsA || {},
    countsB: reconocimientoCompensacionData.countsB || {},
    totalA: reconocimientoCompensacionData.totalA || 0,
    totalB: reconocimientoCompensacionData.totalB || 0,
  });
  const extralaboralSentence = buildRiskSentence({
    levelsOrder: extralaboralData.levelsOrder,
    countsA: extralaboralData.countsA || {},
    countsB: extralaboralData.countsB || {},
    totalA: extralaboralData.totalA || 0,
    totalB: extralaboralData.totalB || 0,
  });
  const tiempoFueraTrabajoSentence = buildRiskSentence({
    levelsOrder: tiempoFueraTrabajoData.levelsOrder,
    countsA: tiempoFueraTrabajoData.countsA || {},
    countsB: tiempoFueraTrabajoData.countsB || {},
    totalA: tiempoFueraTrabajoData.totalA || 0,
    totalB: tiempoFueraTrabajoData.totalB || 0,
  });
  const relacionesFamiliaresSentence = buildRiskSentence({
    levelsOrder: relacionesFamiliaresData.levelsOrder,
    countsA: relacionesFamiliaresData.countsA || {},
    countsB: relacionesFamiliaresData.countsB || {},
    totalA: relacionesFamiliaresData.totalA || 0,
    totalB: relacionesFamiliaresData.totalB || 0,
  });
  const comunicacionRelacionesSentence = buildRiskSentence({
    levelsOrder: comunicacionRelacionesData.levelsOrder,
    countsA: comunicacionRelacionesData.countsA || {},
    countsB: comunicacionRelacionesData.countsB || {},
    totalA: comunicacionRelacionesData.totalA || 0,
    totalB: comunicacionRelacionesData.totalB || 0,
  });
  const situacionEconomicaSentence = buildRiskSentence({
    levelsOrder: situacionEconomicaData.levelsOrder,
    countsA: situacionEconomicaData.countsA || {},
    countsB: situacionEconomicaData.countsB || {},
    totalA: situacionEconomicaData.totalA || 0,
    totalB: situacionEconomicaData.totalB || 0,
  });
  const caracteristicasViviendaSentence = buildRiskSentence({
    levelsOrder: caracteristicasViviendaData.levelsOrder,
    countsA: caracteristicasViviendaData.countsA || {},
    countsB: caracteristicasViviendaData.countsB || {},
    totalA: caracteristicasViviendaData.totalA || 0,
    totalB: caracteristicasViviendaData.totalB || 0,
  });
  const influenciaEntornoTrabajoSentence = buildRiskSentence({
    levelsOrder: influenciaEntornoTrabajoData.levelsOrder,
    countsA: influenciaEntornoTrabajoData.countsA || {},
    countsB: influenciaEntornoTrabajoData.countsB || {},
    totalA: influenciaEntornoTrabajoData.totalA || 0,
    totalB: influenciaEntornoTrabajoData.totalB || 0,
  });
  const desplazamientoViviendaTrabajoSentence = buildRiskSentence({
    levelsOrder: desplazamientoViviendaTrabajoData.levelsOrder,
    countsA: desplazamientoViviendaTrabajoData.countsA || {},
    countsB: desplazamientoViviendaTrabajoData.countsB || {},
    totalA: desplazamientoViviendaTrabajoData.totalA || 0,
    totalB: desplazamientoViviendaTrabajoData.totalB || 0,
  });
    const factorEstresSentence = buildRiskSentence({
      levelsOrder: factorEstresData.levelsOrder,
      countsA: factorEstresData.countsA || {},
      countsB: factorEstresData.countsB || {},
      totalA: factorEstresData.totalA || 0,
      totalB: factorEstresData.totalB || 0,
    });
    const intralaboralTotalSentence = (() => {
      const counts = intralaboralTotalData.countsA || {};
      const total = intralaboralTotalData.totalA || 0;
      let modal = intralaboralTotalData.levelsOrder[0] || "";
      let max = counts[modal] ?? 0;
      for (const lvl of intralaboralTotalData.levelsOrder) {
        const value = counts[lvl] ?? 0;
        if (value > max) {
          max = value;
          modal = lvl;
        }
      }
      const pct = total ? (max / total) * 100 : 0;
      const pctStr =
        pct.toLocaleString("es-CO", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + "%";
      return `Esta gráfica refiere mayor incidencia en el riesgo "${modal}" para el "${pctStr}" de la población de la forma A.`;
    })();
    const intralaboralTotalSentenceB = (() => {
      const counts = intralaboralTotalData.countsB || {};
      const total = intralaboralTotalData.totalB || 0;
      let modal = intralaboralTotalData.levelsOrder[0] || "";
      let max = counts[modal] ?? 0;
      for (const lvl of intralaboralTotalData.levelsOrder) {
        const value = counts[lvl] ?? 0;
        if (value > max) {
          max = value;
          modal = lvl;
        }
      }
      const pct = total ? (max / total) * 100 : 0;
      const pctStr =
        pct.toLocaleString("es-CO", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + "%";
      return `Esta gráfica refiere mayor incidencia en el riesgo "${modal}" para el "${pctStr}" de la población de la forma B.`;
    })();

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
  const stageAutonomiaA = autonomiaData.totalA
    ? calcStage(autonomiaData.countsA || {})
    : "primario";
  const stageAutonomiaB = autonomiaData.totalB
    ? calcStage(autonomiaData.countsB || {})
    : "primario";
  const showSuggestionsAutonomia =
    stageAutonomiaA !== "primario" || stageAutonomiaB !== "primario";
  const stageClaridadA = claridadData.totalA
    ? calcStage(claridadData.countsA || {})
    : "primario";
  const stageClaridadB = claridadData.totalB
    ? calcStage(claridadData.countsB || {})
    : "primario";
  const showSuggestionsClaridad =
    stageClaridadA !== "primario" || stageClaridadB !== "primario";
  const stageCapacitacionA = capacitacionData.totalA
    ? calcStage(capacitacionData.countsA || {})
    : "primario";
  const stageCapacitacionB = capacitacionData.totalB
    ? calcStage(capacitacionData.countsB || {})
    : "primario";
  const showSuggestionsCapacitacion =
    stageCapacitacionA !== "primario" || stageCapacitacionB !== "primario";
  const stageParticipacionA = participacionData.totalA
    ? calcStage(participacionData.countsA || {})
    : "primario";
  const stageParticipacionB = participacionData.totalB
    ? calcStage(participacionData.countsB || {})
    : "primario";
  const showSuggestionsParticipacion =
    stageParticipacionA !== "primario" || stageParticipacionB !== "primario";
  const stageOportunidadesA = oportunidadesData.totalA
    ? calcStage(oportunidadesData.countsA || {})
    : "primario";
  const stageOportunidadesB = oportunidadesData.totalB
    ? calcStage(oportunidadesData.countsB || {})
    : "primario";
  const showSuggestionsOportunidades =
    stageOportunidadesA !== "primario" || stageOportunidadesB !== "primario";
  const stageControlA = controlDominioData.totalA
    ? calcStage(controlDominioData.countsA || {})
    : "primario";
  const stageControlB = controlDominioData.totalB
    ? calcStage(controlDominioData.countsB || {})
    : "primario";
  const showSuggestionsControl =
    stageControlA !== "primario" || stageControlB !== "primario";
  const stageDemandasA = demandasDominioData.totalA
    ? calcStage(demandasDominioData.countsA || {})
    : "primario";
  const stageDemandasB = demandasDominioData.totalB
    ? calcStage(demandasDominioData.countsB || {})
    : "primario";
  const showSuggestionsDemandas =
    stageDemandasA !== "primario" || stageDemandasB !== "primario";
  const stageDemandasAmbientalesA = demandasAmbientalesData.totalA
    ? calcStage(demandasAmbientalesData.countsA || {})
    : "primario";
  const stageDemandasAmbientalesB = demandasAmbientalesData.totalB
    ? calcStage(demandasAmbientalesData.countsB || {})
    : "primario";
  const showSuggestionsDemandasAmbientales =
    stageDemandasAmbientalesA !== "primario" ||
    stageDemandasAmbientalesB !== "primario";
  const stageDemandasEmocionalesA = demandasEmocionalesData.totalA
    ? calcStage(demandasEmocionalesData.countsA || {})
    : "primario";
  const stageDemandasEmocionalesB = demandasEmocionalesData.totalB
    ? calcStage(demandasEmocionalesData.countsB || {})
    : "primario";
  const showSuggestionsDemandasEmocionales =
    stageDemandasEmocionalesA !== "primario" ||
    stageDemandasEmocionalesB !== "primario";
  const stageInfluenciaTrabajoA = influenciaTrabajoData.totalA
    ? calcStage(influenciaTrabajoData.countsA || {})
    : "primario";
  const stageInfluenciaTrabajoB = influenciaTrabajoData.totalB
    ? calcStage(influenciaTrabajoData.countsB || {})
    : "primario";
  const showSuggestionsInfluenciaTrabajo =
    stageInfluenciaTrabajoA !== "primario" ||
    stageInfluenciaTrabajoB !== "primario";
  const stageDemandasCargaMentalA = demandasCargaMentalData.totalA
    ? calcStage(demandasCargaMentalData.countsA || {})
    : "primario";
  const stageDemandasCargaMentalB = demandasCargaMentalData.totalB
    ? calcStage(demandasCargaMentalData.countsB || {})
    : "primario";
  const showSuggestionsDemandasCargaMental =
    stageDemandasCargaMentalA !== "primario" ||
    stageDemandasCargaMentalB !== "primario";
  const stageDemandasJornadaA = demandasJornadaData.totalA
    ? calcStage(demandasJornadaData.countsA || {})
    : "primario";
  const stageDemandasJornadaB = demandasJornadaData.totalB
    ? calcStage(demandasJornadaData.countsB || {})
    : "primario";
  const showSuggestionsDemandasJornada =
    stageDemandasJornadaA !== "primario" ||
    stageDemandasJornadaB !== "primario";
  const stageConsistenciaRolA = consistenciaRolData.totalA
    ? calcStage(consistenciaRolData.countsA || {})
    : "primario";
  const stageConsistenciaRolB = consistenciaRolData.totalB
    ? calcStage(consistenciaRolData.countsB || {})
    : "primario";
  const showSuggestionsConsistenciaRol =
    stageConsistenciaRolA !== "primario" ||
    stageConsistenciaRolB !== "primario";
  const stageExigenciasResponsabilidadA =
    exigenciasResponsabilidadData.totalA
      ? calcStage(exigenciasResponsabilidadData.countsA || {})
      : "primario";
  const stageExigenciasResponsabilidadB =
    exigenciasResponsabilidadData.totalB
      ? calcStage(exigenciasResponsabilidadData.countsB || {})
      : "primario";
  const showSuggestionsExigenciasResponsabilidad =
    stageExigenciasResponsabilidadA !== "primario" ||
    stageExigenciasResponsabilidadB !== "primario";
  const stageDemandasCuantitativasA = demandasCuantitativasData.totalA
    ? calcStage(demandasCuantitativasData.countsA || {})
    : "primario";
  const stageDemandasCuantitativasB = demandasCuantitativasData.totalB
    ? calcStage(demandasCuantitativasData.countsB || {})
    : "primario";
  const showSuggestionsDemandasCuantitativas =
    stageDemandasCuantitativasA !== "primario" ||
    stageDemandasCuantitativasB !== "primario";
  const stageRecompensasA = recompensasDominioData.totalA
    ? calcStage(recompensasDominioData.countsA || {})
    : "primario";
  const stageRecompensasB = recompensasDominioData.totalB
    ? calcStage(recompensasDominioData.countsB || {})
    : "primario";
  const showSuggestionsRecompensas =
    stageRecompensasA !== "primario" || stageRecompensasB !== "primario";
  const stageRecompensasPertenenciaA = recompensasPertenenciaData.totalA
    ? calcStage(recompensasPertenenciaData.countsA || {})
    : "primario";
  const stageRecompensasPertenenciaB = recompensasPertenenciaData.totalB
    ? calcStage(recompensasPertenenciaData.countsB || {})
    : "primario";
  const showSuggestionsRecompensasPertenencia =
    stageRecompensasPertenenciaA !== "primario" ||
    stageRecompensasPertenenciaB !== "primario";
  const stageReconocimientoCompensacionA =
    reconocimientoCompensacionData.totalA
      ? calcStage(reconocimientoCompensacionData.countsA || {})
      : "primario";
  const stageReconocimientoCompensacionB =
    reconocimientoCompensacionData.totalB
      ? calcStage(reconocimientoCompensacionData.countsB || {})
      : "primario";
  const showSuggestionsReconocimientoCompensacion =
    stageReconocimientoCompensacionA !== "primario" ||
    stageReconocimientoCompensacionB !== "primario";
  const stageExtralaboralA = extralaboralData.totalA
    ? calcStage(extralaboralData.countsA || {})
    : "primario";
  const stageExtralaboralB = extralaboralData.totalB
    ? calcStage(extralaboralData.countsB || {})
    : "primario";
  const showSuggestionsExtralaboral =
    stageExtralaboralA !== "primario" || stageExtralaboralB !== "primario";
  const stageTiempoFueraTrabajoA = tiempoFueraTrabajoData.totalA
    ? calcStage(tiempoFueraTrabajoData.countsA || {})
    : "primario";
  const stageTiempoFueraTrabajoB = tiempoFueraTrabajoData.totalB
    ? calcStage(tiempoFueraTrabajoData.countsB || {})
    : "primario";
  const showSuggestionsTiempoFueraTrabajo =
    stageTiempoFueraTrabajoA !== "primario" ||
    stageTiempoFueraTrabajoB !== "primario";
  const stageRelacionesFamiliaresA = relacionesFamiliaresData.totalA
    ? calcStage(relacionesFamiliaresData.countsA || {})
    : "primario";
  const stageRelacionesFamiliaresB = relacionesFamiliaresData.totalB
    ? calcStage(relacionesFamiliaresData.countsB || {})
    : "primario";
  const showSuggestionsRelacionesFamiliares =
    stageRelacionesFamiliaresA !== "primario" ||
    stageRelacionesFamiliaresB !== "primario";
  const stageComunicacionRelacionesA = comunicacionRelacionesData.totalA
    ? calcStage(comunicacionRelacionesData.countsA || {})
    : "primario";
  const stageComunicacionRelacionesB = comunicacionRelacionesData.totalB
    ? calcStage(comunicacionRelacionesData.countsB || {})
    : "primario";
  const showSuggestionsComunicacionRelaciones =
    stageComunicacionRelacionesA !== "primario" ||
    stageComunicacionRelacionesB !== "primario";
  const stageSituacionEconomicaA = situacionEconomicaData.totalA
    ? calcStage(situacionEconomicaData.countsA || {})
    : "primario";
  const stageSituacionEconomicaB = situacionEconomicaData.totalB
    ? calcStage(situacionEconomicaData.countsB || {})
    : "primario";
  const showSuggestionsSituacionEconomica =
    stageSituacionEconomicaA !== "primario" ||
    stageSituacionEconomicaB !== "primario";
  const stageCaracteristicasViviendaA = caracteristicasViviendaData.totalA
    ? calcStage(caracteristicasViviendaData.countsA || {})
    : "primario";
  const stageCaracteristicasViviendaB = caracteristicasViviendaData.totalB
    ? calcStage(caracteristicasViviendaData.countsB || {})
    : "primario";
  const showSuggestionsCaracteristicasVivienda =
    stageCaracteristicasViviendaA !== "primario" ||
    stageCaracteristicasViviendaB !== "primario";
  const stageInfluenciaEntornoTrabajoA = influenciaEntornoTrabajoData.totalA
    ? calcStage(influenciaEntornoTrabajoData.countsA || {})
    : "primario";
  const stageInfluenciaEntornoTrabajoB = influenciaEntornoTrabajoData.totalB
    ? calcStage(influenciaEntornoTrabajoData.countsB || {})
    : "primario";
  const showSuggestionsInfluenciaEntornoTrabajo =
    stageInfluenciaEntornoTrabajoA !== "primario" ||
    stageInfluenciaEntornoTrabajoB !== "primario";
  const stageDesplazamientoViviendaTrabajoA = desplazamientoViviendaTrabajoData.totalA
    ? calcStage(desplazamientoViviendaTrabajoData.countsA || {})
    : "primario";
  const stageDesplazamientoViviendaTrabajoB = desplazamientoViviendaTrabajoData.totalB
    ? calcStage(desplazamientoViviendaTrabajoData.countsB || {})
    : "primario";
  const showSuggestionsDesplazamientoViviendaTrabajo =
    stageDesplazamientoViviendaTrabajoA !== "primario" ||
    stageDesplazamientoViviendaTrabajoB !== "primario";
    const stageFactorEstresA = factorEstresData.totalA
      ? calcStage(factorEstresData.countsA || {})
      : "primario";
    const stageFactorEstresB = factorEstresData.totalB
      ? calcStage(factorEstresData.countsB || {})
      : "primario";
    const stageIntralaboralTotalA = intralaboralTotalData.totalA
      ? calcStage(intralaboralTotalData.countsA || {})
      : "primario";
    const stageIntralaboralTotalB = intralaboralTotalData.totalB
      ? calcStage(intralaboralTotalData.countsB || {})
      : "primario";
    const stageFactorEstres = factorEstresData.total
      ? calcStage(factorEstresData.counts || {})
      : "primario";
    const stageExtralaboral = extralaboralData.total
      ? calcStage(extralaboralData.counts || {})
      : "primario";
    const isSecTer = (s: Stage) => s === "secundario" || s === "terciario";
    const factorsAtRisk: string[] = [];
    if (isSecTer(stageIntralaboralTotalA) || isSecTer(stageIntralaboralTotalB)) {
      factorsAtRisk.push('Intralaboral');
    }
    if (isSecTer(stageFactorEstres)) {
      factorsAtRisk.push('Estrés');
    }
    if (isSecTer(stageExtralaboral)) {
      factorsAtRisk.push('Extralaboral');
    }
    const factorText =
      factorsAtRisk.length > 1
        ? `${factorsAtRisk.slice(0, -1).join(', ')} y ${factorsAtRisk[factorsAtRisk.length - 1]}`
        : factorsAtRisk[0] || 'Intralaboral';
    const nivelRiesgo = (() => {
      const stages: Stage[] = [];
      if (factorsAtRisk.includes('Intralaboral')) {
        stages.push(stageIntralaboralTotalA, stageIntralaboralTotalB);
      }
      if (factorsAtRisk.includes('Estrés')) {
        stages.push(stageFactorEstres);
      }
      if (factorsAtRisk.includes('Extralaboral')) {
        stages.push(stageExtralaboral);
      }
      const maxStage = stages.includes('terciario')
        ? 'terciario'
        : stages.includes('secundario')
        ? 'secundario'
        : 'primario';
      if (maxStage === 'terciario') return 'riesgo alto';
      if (maxStage === 'secundario') return 'riesgo medio';
      return 'riesgo bajo';
    })();
    const periodoAplicacion =
      factorsAtRisk.includes('Intralaboral') ? '(1) año' : '(2) años';
    const generalItems: ResultadosGeneralesItem[] = [];
    if (intralaboralTotalData.totalA) {
      generalItems.push({
        key: "formaA",
        label: "Forma A",
        level: stageIntralaboralTotalA.toUpperCase() as ResultadosGeneralesItem["level"],
      });
    }
    if (intralaboralTotalData.totalB) {
      generalItems.push({
        key: "formaB",
        label: "Forma B",
        level: stageIntralaboralTotalB.toUpperCase() as ResultadosGeneralesItem["level"],
      });
    }
    if (factorEstresData.total) {
      generalItems.push({
        key: "estres",
        label: "Estrés",
        level: stageFactorEstres.toUpperCase() as ResultadosGeneralesItem["level"],
      });
    }
    if (extralaboralData.total) {
      generalItems.push({
        key: "extra",
        label: "Extralaboral",
        level: stageExtralaboral.toUpperCase() as ResultadosGeneralesItem["level"],
      });
    }

    const dimensionDomainMap = useMemo(() => {
      const map: Record<string, string> = {};
      [...esquemaFormaA, ...esquemaFormaB].forEach((q) => {
        if (q.dimension && !map[q.dimension]) {
          map[q.dimension] = q.dominio;
        }
      });
      return map;
    }, []);

    const areasMejoraData = useMemo(() => {
      const sevOrder = ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"];
      const map = new Map<
        string,
        { dominio: string; nivel: Nivel }
      >();
      const fuentes: Array<keyof ReportPayload["dimensiones"]> = [
        "formaA",
        "formaB",
        "extralaboral",
      ];
      fuentes.forEach((key) => {
        const dims = payload.dimensiones[key];
        if (!dims) return;
        Object.entries(dims).forEach(([dimension, indicador]) => {
          const nivelRaw = (indicador as { nivel?: string }).nivel;
          if (!nivelRaw) return;
          const nivel = shortNivelRiesgo(nivelRaw) as Nivel;
          const dominio =
            dimensionDomainMap[dimension] || (key === "extralaboral" ? "Extralaboral" : "");
          const prev = map.get(dimension);
          if (
            !prev ||
            sevOrder.indexOf(nivel) < sevOrder.indexOf(prev.nivel)
          ) {
            map.set(dimension, { dominio, nivel });
          }
        });
      });
      const result: { dominio: string; dimension: string; nivelRiesgo: Nivel }[] = [];
      map.forEach(({ dominio, nivel }, dimension) => {
        if (["Medio", "Alto", "Muy alto"].includes(nivel)) {
          result.push({ dominio, dimension, nivelRiesgo: nivel });
        }
      });
      return result;
    }, [payload, dimensionDomainMap]);

    const showSuggestionsFactorEstres =
      stageFactorEstresA !== "primario" || stageFactorEstresB !== "primario";
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
        <TabsTrigger className={tabClass} value="graficas-intralaboral">
          Gráficas Intralaboral
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="graficas-extralaboral">
          Gráficas Extralaboral
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="graficas-estres">
          Gráficas Estrés
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="graficas-total">
          Gráficas Total
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="estrategias">
          Estrategias
        </TabsTrigger>
        <TabsTrigger className={tabClass} value="anexos">
          Anexos
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
        <TabsContent value="graficas-intralaboral">
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
          title="Control y autonomía sobre el trabajo Forma A y B"
          data={autonomiaData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere el margen de decisión y autonomía sobre la cantidad, ritmo y orden del trabajo.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {autonomiaSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageAutonomiaA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageAutonomiaB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsAutonomia ? (
              <>
                <p>
                  La Dimensión Control y autonomía sobre el trabajo: Refiere el margen de decisión y autonomía sobre la cantidad, ritmo y orden del trabajo.<br />
                  Ejemplo: Escasa autonomía para organizar las tareas, ritmo impuesto sin posibilidad de ajuste.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <p className="mt-1 font-semibold">Capacitación para la autogestión</p>

                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Formación en organización del tiempo, resolución de problemas y toma de decisiones. Coaching o mentoría para fortalecer la autonomía.
                  </li>
                  <li>Inclusión en la planificación del trabajo.</li>
                  <li>
                    Involucrar a los colaboradores en la definición de objetivos, tiempos y prioridades.
                  </li>
                  <li>
                    Permitir que propongan mejoras o ajustes a su forma de trabajar.
                  </li>
                </ol>
                <p className="mt-2 font-semibold">Cultura Organizacional</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Fomento de una cultura de confianza y responsabilidad.</li>
                  <li>Reconocer la autonomía como un valor organizacional.</li>
                  <li>Premiar la iniciativa y la toma de decisiones acertadas.</li>
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
          title="Claridad de rol Forma A y B"
          data={claridadData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere al grado en que las funciones, responsabilidades y objetivos del
          puesto están claramente definidos y comunicados.
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
                  La Dimensión Claridad de rol: refiere al grado en que las
                  responsabilidades y funciones están definidas y comunicadas.<br />
                  Ejemplo: Falta de información sobre las tareas y expectativas,
                  roles ambiguos o conflictivos.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Definición Clara de Roles y Responsabilidades: Establecer y
                    documentar funciones, tareas y autoridad para cada puesto.
                  </li>
                  <li>
                    Comunicación de Expectativas: Informar de manera permanente sobre
                    objetivos, cambios en las funciones y criterios de desempeño.
                  </li>
                  <li>
                    Retroalimentación y Acompañamiento: Brindar orientación y
                    feedback para resolver dudas sobre el rol y mejorar el
                    desempeño.
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
          title="Capacitación Forma A y B"
          data={capacitacionData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere las oportunidades de formación para adquirir nuevas habilidades o
          mejorar las existentes, necesarias para el desempeño del trabajo.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {capacitacionSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageCapacitacionA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageCapacitacionB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsCapacitacion ? (
              <>
                <p>
                  La Dimensión Capacitación: refiere las oportunidades de formación
                  para adquirir nuevas habilidades o mejorar las existentes,
                  necesarias para el desempeño del trabajo.<br />
                  Ejemplo: Falta de formación para desempeñar nuevas tareas,
                  tecnología o procesos, lo que genera inseguridad y estrés.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Diagnóstico de Necesidades de Capacitación: Realizar un
                    diagnóstico sistemático de las necesidades de capacitación de
                    los empleados.
                  </li>
                  <li>
                    Plan de Capacitación Anual: Desarrollar un plan de capacitación
                    anual que incluya temas relevantes para el desarrollo
                    profesional y las necesidades del puesto.
                  </li>
                  <li>
                    Diversificación de Métodos de Capacitación: Ofrecer diferentes
                    modalidades de capacitación (presencial, virtual, talleres,
                    e-learning) para adaptarse a las preferencias y
                    disponibilidades de los empleados.
                  </li>
                </ol>
              </>
            ) : (
              <p>
                El dominio evaluado se encuentra en un nivel óptimo, sin presencia
                significativa de riesgo. No se requieren acciones adicionales ni
                planes de mejora inmediatos; sin embargo, es importante continuar
                fortaleciendo las prácticas actuales para mantener estos
                resultados. ¡Felicitaciones por destacar en esta área y seguir
                siendo un ejemplo de excelencia!
              </p>
            )}
          </div>
        </div>
        <RiskDistributionChart
          title="Participación y manejo del cambio Forma A y B"
          data={participacionData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Genera la posibilidad de influir en los cambios organizacionales y en la
          forma en que se implementan.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {participacionSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageParticipacionA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageParticipacionB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsParticipacion ? (
              <>
                <p>
                  La Dimensión Participación y manejo del cambio: Genera la
                  posibilidad de influir en los cambios organizacionales y en la
                  forma en que se implementan.
                  <br />
                  Ejemplo: Cambios organizacionales implementados sin consulta o
                  explicación adecuada, generando incertidumbre y resistencia.
                </p>
                <p className="font-semibold mt-2">
                  Acciones de Intervención Sugeridas:
                </p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Comunicación Transparente: Comunicar de forma clara y
                    oportuna los motivos y el impacto de los cambios
                    organizacionales.
                  </li>
                  <li>
                    Canales de Participación: Establecer canales para que los
                    empleados puedan expresar sus opiniones y sugerencias
                    respecto a los cambios.
                  </li>
                  <li>
                    Gestión del Cambio Participativa: Involucrar a los
                    trabajadores en el diseño e implementación de los cambios,
                    donde sea posible.
                  </li>
                </ol>
              </>
            ) : (
              <p>
                El dominio evaluado se encuentra en un nivel óptimo, sin
                presencia significativa de riesgo. No se requieren acciones
                adicionales ni planes de mejora inmediatos; sin embargo, es
                importante continuar fortaleciendo las prácticas actuales para
                mantener estos resultados. ¡Felicitaciones por destacar en esta
                área y seguir siendo un ejemplo de excelencia!
              </p>
            )}
          </div>
        </div>
        <RiskDistributionChart
          title="Oportunidades para el uso y desarrollo de habilidades Forma A y B"
          data={oportunidadesData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere todas las Oportunidades que ofrece el puesto para utilizar y
          desarrollar las habilidades existentes y adquirir nuevos
          conocimientos.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {oportunidadesSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageOportunidadesA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageOportunidadesB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsOportunidades ? (
              <>
                <p>
                  La Dimensión Oportunidades para el uso y desarrollo de
                  habilidades: Refiere todas las Oportunidades que ofrece el
                  puesto para utilizar y desarrollar las habilidades existentes
                  y adquirir nuevos conocimientos.
                  <br />
                  Ejemplo: Realización de tareas repetitivas que no exigen el
                  uso de habilidades complejas, falta de oportunidades de
                  aprendizaje o crecimiento.
                </p>
                <p className="font-semibold mt-2">
                  Acciones de Intervención Sugeridas:
                </p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Planes de Desarrollo Profesional: Diseñar planes de carrera
                    y ofrecer oportunidades de capacitación y desarrollo que
                    permitan a los trabajadores ampliar sus habilidades.
                  </li>
                  <li>
                    Asignación de Proyectos Desafiantes: Asignar proyectos que
                    requieran el uso y desarrollo de nuevas habilidades.
                  </li>
                  <li>
                    Mentorías y Coaching: Implementar programas de mentoría o
                    coaching para facilitar el aprendizaje y la transferencia de
                    conocimientos.
                  </li>
                </ol>
              </>
            ) : (
              <p>
                El dominio evaluado se encuentra en un nivel óptimo, sin
                presencia significativa de riesgo. No se requieren acciones
                adicionales ni planes de mejora inmediatos; sin embargo, es
                importante continuar fortaleciendo las prácticas actuales para
                mantener estos resultados. ¡Felicitaciones por destacar en esta
                área y seguir siendo un ejemplo de excelencia!
              </p>
            )}
          </div>
        </div>
        <RiskDistributionChart
          title="DOMINIO DEMANDAS DEL TRABAJO FORMA A Y FORMA B"
          data={demandasDominioData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere las exigencias que el trabajo impone al individuo. Pueden ser de diversa naturaleza, cuantitativas, cognitivas, mentales, emocionales, de responsabilidad, del ambiente físico laboral y de la jornada de trabajo. Cuando las demandas exceden los recursos o la capacidad del trabajador, pueden generar estrés y afectar su salud.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {demandasSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageDemandasA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageDemandasB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsDemandas ? (
              <>
                <p>
                  Se sugiere generar una revisión y distribución de cargas laborales:
                </p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Analice tareas y responsabilidades para evitar sobrecarga.</li>
                  <li>
                    Establezca prioridades claras y elimine actividades
                    innecesarias.
                  </li>
                  <li>Ajuste metas y plazos según recursos disponibles.</li>
                  <li>
                    Evite tareas de último minuto como norma de trabajo.
                  </li>
                  <li>Promueva las pausas y los microdescansos.</li>
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
          title="Demandas ambientales y de esfuerzo físico Forma A y B"
          data={demandasAmbientalesData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere, las Exigencias impuestas por las condiciones físicas del lugar de trabajo, como ruido, temperatura, iluminación, ergonomía.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {demandasAmbientalesSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageDemandasAmbientalesA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageDemandasAmbientalesB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsDemandasAmbientales ? (
              <>
                <p>
                  Ejemplo: Exposición a ambientes ruidosos, temperaturas extremas, mala iluminación, diseño ergonómico deficiente, riesgos de seguridad física.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Mejoras Ergonómicas: Realizar evaluaciones ergonómicas de los puestos de trabajo y realizar los ajustes necesarios (sillas, escritorios, herramientas en todas las áreas)
                  </li>
                  <li>
                    Control de Agentes Físicos: Implementar medidas para controlar el ruido, la temperatura, la iluminación y la calidad del aire.
                  </li>
                  <li>
                    Mantenimiento de Instalaciones: Asegurar el mantenimiento adecuado de las instalaciones y equipos para garantizar un ambiente seguro y funcional.
                  </li>
                  <li>
                    Programas de Seguridad y Salud en el Trabajo: Reforzar los programas de seguridad industrial y salud ocupacional para prevenir accidentes y enfermedades laborales.
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
          title="Demandas de la jornada de trabajo Forma A y B"
          data={demandasJornadaData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere la extensión, flexibilidad y distribución de la jornada laboral, incluyendo turnos y horas extras.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {demandasJornadaSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageDemandasJornadaA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageDemandasJornadaB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsDemandasJornada ? (
              <>
                <p>
                  Ejemplo: Jornadas laborales excesivamente largas, trabajo por turnos que afecta el ciclo circadiano, falta de flexibilidad en los horarios, trabajo nocturno.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Políticas de Horarios Flexibles: Explorar la implementación de horarios flexibles o modalidades de teletrabajo cuando sea posible y adecuado.
                  </li>
                  <li>
                    Gestión de Horas Extras: Monitorear y limitar las horas extras, asegurando que sean voluntarias y compensadas adecuadamente.
                  </li>
                  <li>
                    Diseño de Turnos Equitativos: Optimizar los sistemas de turnos para minimizar el impacto en la salud y vida personal de los trabajadores.
                  </li>
                  <li>
                    Fomento del Equilibrio Vida-Trabajo: Promover una cultura organizacional que valore el equilibrio entre la vida laboral y personal, desincentivando la "cultura del presentismo".
                  </li>
                  <li>
                    Verifique los problemas de salud mental que puedan exacerbar síntomas y empeorar la salud de los colaboradores.
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
          title="Consistencia del rol Forma A y B"
          data={consistenciaRolData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Esta dimension establece que tan coherente, estable y clara es la
          informacion que el trabajador recibe sobre sus funciones, metas,
          prioridades y expectativas.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {consistenciaRolSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageConsistenciaRolA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageConsistenciaRolB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsConsistenciaRol ? (
              <>
                <p>
                  Se sugiere revisar cambios que no sean frecuentes y
                  contradictorios, además de ser claros y no dejar instrucciones
                  que se superpongan.
                </p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Actualice y entregue las definiciones del cargo.</li>
                  <li>
                    Asegure que cada trabajador tenga claridad sobre qué se
                    espera de él y qué no le corresponde.
                  </li>
                  <li>
                    Establezca canales de comunicación, use medios oficiales
                    como correos, intranet u otros.
                  </li>
                  <li>
                    Evite dar instrucciones críticas de manera improvisada o
                    por terceros.
                  </li>
                </ol>
              </>
            ) : (
              <p>
                El dominio evaluado se encuentra en un nivel óptimo, sin
                presencia significativa de riesgo. No se requieren acciones
                adicionales ni planes de mejora inmediatos; sin embargo, es
                importante continuar fortaleciendo las prácticas actuales para
                mantener estos resultados. ¡Felicitaciones por destacar en esta
                área y seguir siendo un ejemplo de excelencia!
              </p>
            )}
          </div>
        </div>
        <RiskDistributionChart
          title="Demandas de carga mental Forma A y B"
          data={demandasCargaMentalData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Son las Exigencias de procesamiento cognitivo que implica la tarea, como la minuciosidad, concentración, complejidad y variedad.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {demandasCargaMentalSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageDemandasCargaMentalA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageDemandasCargaMentalB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsDemandasCargaMental ? (
              <>
                <p>
                  Ejemplo: Tareas que requieren alta concentración, resolución de problemas complejos, toma de decisiones rápidas, multitarea constante o trabajo monótono que genera fatiga mental.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Rotación de Tareas: Implementar la rotación de tareas para reducir la monotonía y la fatiga mental en trabajos repetitivos.
                  </li>
                  <li>
                    Pausas Activas y Cognitivas: Fomentar y estructurar pausas regulares que permitan a los trabajadores desconectarse brevemente de sus tareas y recargar energías.
                  </li>
                  <li>
                    Diseño de Puestos de Trabajo: Rediseñar tareas o procesos para simplificar su complejidad o proporcionar herramientas que faciliten el trabajo cognitivo.
                  </li>
                  <li>
                    Capacitación en Manejo del Estrés: Ofrecer talleres sobre técnicas de relajación, mindfulness y afrontamiento del estrés para mejorar la resiliencia mental.
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
          title="Exigencias de responsabilidad del cargo Forma A y B"
          data={exigenciasResponsabilidadData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere el nivel de responsabilidad asociado al cargo, incluyendo la seguridad de otros, el manejo de recursos o la toma de decisiones críticas
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {exigenciasResponsabilidadSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageExigenciasResponsabilidadA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageExigenciasResponsabilidadB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsExigenciasResponsabilidad ? (
              <>
                <p>
                  Ejemplo: Puestos que conllevan una alta responsabilidad por la vida o seguridad de otros, por grandes cantidades de dinero, o por decisiones que tienen un impacto significativo en la organización.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Claridad en las Funciones y Límites de Responsabilidad: Asegurar una descripción clara del puesto y los límites de la responsabilidad.
                  </li>
                  <li>
                    Sistemas de Apoyo y Consulta: Establecer mecanismos para que los trabajadores puedan consultar y recibir apoyo en la toma de decisiones críticas.
                  </li>
                  <li>
                    Capacitación en Liderazgo y Toma de Decisiones: Desarrollar habilidades de liderazgo y toma de decisiones para manejar eficazmente la responsabilidad.
                  </li>
                  <li>
                    Reconocimiento y Valoración: Implementar sistemas de reconocimiento para el manejo exitoso de responsabilidades, validando el esfuerzo y la presión.
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
          title="Influencia del trabajo sobre el entorno extralaboral Forma A y B"
          data={influenciaTrabajoData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Esta dimensión mide hasta qué punto las exigencias laborales afectan la vida personal, familiar y social del trabajador.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {influenciaTrabajoSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageInfluenciaTrabajoA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageInfluenciaTrabajoB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsInfluenciaTrabajo ? (
              <>
                <p>Tenga en cuenta las políticas de conciliación laboral-familiar.</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Ajuste cargas y jornadas para facilitar tiempo con familia y actividades.</li>
                  <li>Flexibilice horarios o implemente trabajo remoto en casa.</li>
                  <li>Evite llamadas, mensajes o correos fuera del horario laboral salvo emergencias.</li>
                  <li>Establezca políticas claras de desconexión digital.</li>
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
          title="Demandas cuantitativas Forma A y B"
          data={demandasCuantitativasData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refieren la cantidad de trabajo que se debe realizar en relación con el tiempo disponible. Una alta demanda cuantitativa puede llevar a sobrecarga de trabajo y jornadas laborales extensas.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {demandasCuantitativasSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageDemandasCuantitativasA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageDemandasCuantitativasB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsDemandasCuantitativas ? (
              <>
                <p>
                  Ejemplo: Presión por cumplir plazos ajustados, gran volumen de tareas, necesidad de trabajar horas extras.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Optimización de Cargas de Trabajo: Realizar estudios de carga laboral para asegurar una distribución equitativa y realista de las tareas.
                  </li>
                  <li>
                    Gestión del Tiempo: Ofrecer capacitaciones en técnicas de gestión del tiempo y priorización de tareas.
                  </li>
                  <li>
                    Dotación de Personal Suficiente: Evaluar la necesidad de contratar más personal o redistribuir responsabilidades para evitar la sobrecarga crónica.
                  </li>
                  <li>
                    Definición Clara de Expectativas: Asegurar que los colaboradores comprendan las expectativas de desempeño y los plazos, fomentando la comunicación bidireccional.
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
          title="Demandas emocionales Forma A y B"
          data={demandasEmocionalesData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere la exposición a situaciones emocionalmente exigentes, como el contacto con personas en crisis, violencia, o la necesidad de ocultar emociones.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {demandasEmocionalesSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageDemandasEmocionalesA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageDemandasEmocionalesB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsDemandasEmocionales ? (
              <>
                <p>
                  Ejemplo: Trabajos que implican interacción con el público (clientes enojados, pacientes sufriendo), exposición a eventos traumáticos, o la necesidad de mantener una "fachada" emocional.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Apoyo Psicológico y Consulta: Establecer programas de apoyo psicológico o acceso a consulta para trabajadores expuestos a situaciones emocionalmente difíciles.
                  </li>
                  <li>
                    Entrenamiento en Habilidades de Comunicación y Manejo de Conflictos: Capacitar al personal en el manejo de interacciones difíciles y resolución de conflictos.
                  </li>
                  <li>
                    Debriefing Psicológico: Implementar sesiones de debriefing post-incidente para trabajadores expuestos a eventos traumáticos.
                  </li>
                  <li>
                    Políticas de Respeto y No Violencia: Reforzar políticas internas que promuevan un ambiente de respeto y cero tolerancia a la violencia o el acoso
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
          title="DOMINIO RECOMPENSAS FORMA A Y FORMA B"
          data={recompensasDominioData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          RRefiere la retribución que un trabajador obtiene a cambio de sus esfuerzos y contribuciones laborales. Incluye tanto la recompensa económica como el reconocimiento, la promoción y la satisfacción personal derivada del trabajo
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {recompensasSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageRecompensasA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageRecompensasB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsRecompensas ? (
              <>
                <p>
                  Recompensa Financiera: Compensación económica por el trabajo realizado (salario, bonificaciones, beneficios).<br />Ejemplo: Salarios bajos, falta de bonificaciones o incentivos, percepción de inequidad salarial.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Revisión y Ajuste de Estructuras Salariales: Realizar estudios de mercado salarial para asegurar que la compensación sea competitiva y justa.
                  </li>
                  <li>
                    Sistemas de Incentivos y Bonificaciones: Implementar programas de incentivos y bonificaciones basados en el desempeño y los resultados.
                  </li>
                  <li>
                    Transparencia en la Política Salarial: Comunicar claramente los criterios de compensación y los procesos de revisión salarial.
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
            title="Reconocimiento y compensación Forma A y B"
            data={reconocimientoCompensacionData}
          />
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            Que se hace de la contribución del trabajador corresponde con sus esfuerzos y logros. El salario se da teniendo en cuenta los acuerdos entre el trabajador y la organización. Sin embargo, se deben tener en cuenta las posibilidades de Promoción y Seguridad en el Trabajo: Oportunidades de ascenso, desarrollo de carrera y estabilidad laboral.
          </p>
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {reconocimientoCompensacionSentence}
          </p>
          <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Forma A</p>
                <SemaphoreDial stage={stageReconocimientoCompensacionA} />
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Forma B</p>
                <SemaphoreDial stage={stageReconocimientoCompensacionB} />
              </div>
            </div>
            <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
              {showSuggestionsReconocimientoCompensacion ? (
                <>
                  <p>
                    Ejemplo: Falta de oportunidades de ascenso, estancamiento profesional, percepción de inestabilidad laboral, despidos injustificados.
                  </p>
                  <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>
                      Planes de Carrera y Promoción Interna: Diseñar planes de carrera claros y promover la movilidad interna y las oportunidades de ascenso.
                    </li>
                    <li>
                      Programas de Retención de Talento: Implementar estrategias para retener a los empleados valiosos, ofreciéndoles perspectivas de crecimiento.
                    </li>
                    <li>
                      Comunicación sobre Estabilidad Laboral: Proporcionar información clara y transparente sobre la situación de la empresa y la seguridad en el empleo.
                    </li>
                    <li>
                      Desarrollo de Habilidades Transversales: Ofrecer capacitaciones en habilidades transferibles que aumenten la empleabilidad de los trabajadores.
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
          title="Recompensas derivadas de la pertenencia a la organización Forma A y B"
          data={recompensasPertenenciaData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          La compensación psicológica, que comprende el reconocimiento del grupo social y el trato justo en el trabajo
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {recompensasPertenenciaSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageRecompensasPertenenciaA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageRecompensasPertenenciaB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsRecompensasPertenencia ? (
              <>
                <p>
                  Ejemplo: Falta de reconocimiento por el esfuerzo o los logros, trato injusto o discriminación, falta de valoración por parte de superiores o compañeros.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Programas de Reconocimiento: Implementar programas formales e informales de reconocimiento de logros y buen desempeño (ej. empleado del mes, menciones en reuniones, cartas de agradecimiento).
                  </li>
                  <li>
                    Fomentar una Cultura de Agradecimiento: Promover que los líderes y compañeros expresen aprecio por el trabajo de los demás.
                  </li>
                  <li>
                    Políticas de Equidad y Trato Justo: Establecer políticas claras contra la discriminación y el trato injusto, y asegurar su cumplimiento.
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
        <TabsContent value="graficas-extralaboral">
          <RiskDistributionChart
            title="RESULTADO GENERAL FACTOR EXTRALABORAL FORMA A Y B"
            data={extralaboralData}
          />
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            Los resultados de los factores de riesgo psicosocial Extralaboral se presentan en esta sección, utilizando el instrumento específico diseñado para esta evaluación. Se abarcan diversos aspectos del entorno del trabajador, que incluyen elementos familiares, sociales y económicos. Además, se consideran las condiciones de vivienda, ya que estas pueden ejercer influencia sobre el bienestar y la salud del individuo.
          </p>
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {extralaboralSentence}
          </p>
          <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Forma A</p>
                <SemaphoreDial stage={stageExtralaboralA} />
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Forma B</p>
                <SemaphoreDial stage={stageExtralaboralB} />
              </div>
            </div>
            <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
              {showSuggestionsExtralaboral ? (
                <>
                  <p>
                    Ejemplo: dificultades familiares, sociales o económicas que impactan el bienestar del trabajador.
                  </p>
                  <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>Programas que promuevan el equilibrio vida-trabajo y horarios flexibles.</li>
                    <li>Fortalecimiento de redes de apoyo familiar y comunitario.</li>
                    <li>Asesoría financiera y facilidades para mejorar condiciones de vivienda.</li>
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
            title="Tiempo fuera del trabajo Forma A y B"
            data={tiempoFueraTrabajoData}
          />
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            Refiere la disponibilidad y calidad del tiempo libre y de descanso del trabajador, considerando la extensión de la jornada laboral y los desplazamientos.
          </p>
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {tiempoFueraTrabajoSentence}
          </p>
          <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Forma A</p>
                <SemaphoreDial stage={stageTiempoFueraTrabajoA} />
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Forma B</p>
                <SemaphoreDial stage={stageTiempoFueraTrabajoB} />
              </div>
            </div>
            <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
              {showSuggestionsTiempoFueraTrabajo ? (
                <>
                  <p>
                    Ejemplo: Jornadas laborales extenuantes que no dejan tiempo para actividades personales, familiares o de ocio. Largos tiempos de desplazamiento al trabajo o a casa que reducen el tiempo de descanso.
                  </p>
                  <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>
                      Fomento de la Desconexión Laboral: Establecer y comunicar políticas claras sobre el derecho a la desconexión laboral, desincentivando correos o llamadas fuera del horario de trabajo.
                    </li>
                    <li>
                      Gestión de Horas Extras: Monitorear y limitar la cantidad de horas extras para asegurar que los empleados tengan tiempo suficiente para el descanso y la recuperación.
                    </li>
                    <li>
                      Flexibilidad Laboral: Explorar opciones como horarios flexibles, trabajo híbrido o teletrabajo que puedan reducir tiempos de desplazamiento y mejorar la gestión del tiempo personal.
                    </li>
                    <li>
                      Promoción de un Equilibrio Vida-Trabajo: Fomentar una cultura organizacional que valore el tiempo personal y familiar, no solo la productividad.
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
          title="Relaciones familiares Forma A y B"
          data={relacionesFamiliaresData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere la Calidad del apoyo y las interacciones dentro del entorno familiar del trabajador.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {relacionesFamiliaresSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageRelacionesFamiliaresA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageRelacionesFamiliaresB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsRelacionesFamiliares ? (
              <>
                <p>
                  Ejemplo: Conflictos familiares, falta de apoyo de la pareja o hijos, responsabilidades de cuidado de familiares que generan carga adicional.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Programas de Conciliación Familiar: Ofrecer beneficios o programas que faciliten la conciliación, como permisos especiales para eventos familiares o apoyo para el cuidado de niños o adultos mayores.
                  </li>
                  <li>
                    Espacios de Sensibilización: Realizar talleres o charlas sobre manejo del estrés familiar, comunicación efectiva en el hogar o crianza positiva, para equipar a los empleados con herramientas.
                  </li>
                  <li>
                    Canales de Apoyo Confidencial: Brindar acceso a orientación psicológica o comunicacional que pueda abordar situaciones de conflicto o dificultad en el ámbito familiar.
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
          title="Comunicación y relaciones interpersonales Forma A y B"
          data={comunicacionRelacionesData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Calidad de las redes de apoyo social y las interacciones con amigos y otras personas fuera del ámbito familiar.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {comunicacionRelacionesSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageComunicacionRelacionesA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageComunicacionRelacionesB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsComunicacionRelaciones ? (
              <>
                <p>
                  Ejemplo: Aislamiento social, falta de amigos o redes de apoyo fuera del trabajo, dificultades para establecer relaciones interpersonales.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Promoción de Actividades Extralaborales: Fomentar la participación en actividades recreativas o deportivas fuera del trabajo, o incluso eventos sociales patrocinados por la empresa (fiestas, encuentros deportivos).
                  </li>
                  <li>
                    Grupos de Interés o Hobbies: Facilitar la creación de grupos de interés o hobbies dentro de la empresa para que los empleados con intereses similares puedan conectarse y construir relaciones.
                  </li>
                  <li>
                    Información sobre Recursos Comunitarios: Proporcionar información sobre recursos o actividades comunitarias que puedan facilitar la socialización y la construcción de redes de apoyo.
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
          title="Situación económica del grupo familiar Forma A y B"
          data={situacionEconomicaData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere Percepción de estabilidad económica y suficiencia de ingresos para cubrir las necesidades básicas de la familia.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {situacionEconomicaSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageSituacionEconomicaA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageSituacionEconomicaB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsSituacionEconomica ? (
              <>
                <p>
                  Ejemplo: Preocupaciones financieras, deudas, inseguridad económica que generan estrés y ansiedad.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Programas de Educación Financiera: Ofrecer talleres sobre manejo de finanzas personales, presupuesto, ahorro e inversión para empoderar a los empleados en la gestión de su economía.
                  </li>
                  <li>
                    Acceso a Beneficios y Asesorías: Informar sobre beneficios corporativos (planes de ahorro, auxilios) o convenios con entidades financieras que puedan ofrecer condiciones ventajosas.
                  </li>
                  <li>
                    Políticas Salariales Justas: Asegurar que la política de remuneración sea competitiva y justa, revisando periódicamente las estructuras salariales.
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
          title="Características de la vivienda y de su entorno Forma A y B"
          data={caracteristicasViviendaData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere la calidad de la vivienda, seguridad del contexto, acceso a servicios básicos y a espacios de esparcimiento
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {caracteristicasViviendaSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageCaracteristicasViviendaA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageCaracteristicasViviendaB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsCaracteristicasVivienda ? (
              <>
                <p>
                  Ejemplo: Problemas de vivienda, inseguridad en el barrio, falta de acceso a servicios esenciales o a espacios de recreación.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Información sobre Programas de Vivienda: Orientar a los empleados sobre programas gubernamentales o iniciativas que faciliten el acceso a vivienda digna.
                  </li>
                  <li>
                    Programas de Transporte: Evaluar y, si es posible, implementar o mejorar programas de transporte para los empleados que residan en zonas con dificultades de acceso.
                  </li>
                  <li>
                    Promoción de la Salud Comunitaria: Si aplica, colaborar con iniciativas comunitarias que busquen mejorar la seguridad o el acceso a servicios en las zonas donde residen los empleados.
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
          title="Influencia del entorno extralaboral sobre el trabajo Forma A y B"
          data={influenciaEntornoTrabajoData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Refiere los problemas que se generarse por condiciones fuera del trabajo pueden ser  de diversa naturaleza dentro de las más destacadas encontramos la falta de Acceso a Servicios de Salud física y mental.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {influenciaEntornoTrabajoSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageInfluenciaEntornoTrabajoA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageInfluenciaEntornoTrabajoB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsInfluenciaEntornoTrabajo ? (
              <>
                <p>
                  Ejemplo: Dificultades para acceder a citas médicas, barreras económicas o geográficas para recibir atención, desconocimiento de los servicios disponibles.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Información sobre el Sistema de Salud: Educar a los empleados sobre cómo funciona el sistema de salud, sus derechos y los canales para acceder a servicios.
                  </li>
                  <li>
                    Programas de Promoción y Prevención de la Salud: Impulsar campañas de vacunación, exámenes médicos preventivos y charlas sobre hábitos de vida saludable.
                  </li>
                  <li>
                    Apoyo para Acceso a Salud Mental: Facilitar el acceso a servicios de salud mental, ya sea a través de la EPS, convenios con psicólogos o programas de apoyo al empleado.
                  </li>
                  <li>
                    Flexibilidad para Citas Médicas: Establecer políticas que permitan a los empleados asistir a sus citas médicas sin que esto genere un impacto negativo en su trabajo o remuneración.
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
          title="Desplazamiento vivienda trabajo vivienda Forma A y B"
          data={desplazamientoViviendaTrabajoData}
        />
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          Se refiere a la facilidad y tiempo que toma trasladarse del hogar al trabajo y viceversa.
        </p>
        <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
          {desplazamientoViviendaTrabajoSentence}
        </p>
        <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageDesplazamientoViviendaTrabajoA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageDesplazamientoViviendaTrabajoB} />
            </div>
          </div>
          <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {showSuggestionsDesplazamientoViviendaTrabajo ? (
              <>
                <p>
                  Ejemplo: Largos tiempos de desplazamiento, congestión vehicular, dificultades en el transporte público, inseguridad en las rutas.
                </p>
                <p className="font-semibold mt-2">Acciones de Intervención Sugeridas:</p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>
                    Opciones de Transporte Colaborativo: Fomentar o facilitar el uso de vehículos compartidos o rutas de transporte empresarial.
                  </li>
                  <li>
                    Incentivos al Uso de Medios Alternativos: Promover el uso de la bicicleta o caminar si las distancias y condiciones lo permiten, con incentivos o facilidades (parqueaderos seguros, duchas).
                  </li>
                  <li>
                    Negociación con Empresas de Transporte: Si es posible, establecer convenios con empresas de transporte para mejorar el acceso y la seguridad de las rutas para los empleados.
                  </li>
                  <li>
                    Evaluación de Ubicación de Puestos de Trabajo: Para futuras expansiones o reubicaciones, considerar la facilidad de acceso y tiempos de desplazamiento para los empleados.
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
        <TabsContent value="graficas-estres">
          <RiskDistributionChart
            title="RESULTADO GENERAL FACTOR ESTRÉS FORMA A Y B"
            data={factorEstresData}
          />
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            El cuestionario diseñado para evaluar los síntomas relacionados con el estrés es una herramienta creada con el propósito de identificar indicios de reacciones de estrés. Estos síntomas se encuentran clasificados en cuatro categorías principales, cada una vinculada a un tipo específico de manifestación del estrés: a) síntomas fisiológicos, b) síntomas de comportamiento social, c) síntomas intelectuales y laborales, y d) síntomas psico-emocionales. Aunque el cuestionario se organiza en grupos de síntomas, los resultados válidos solo pueden ser presentados en su conjunto, considerando la totalidad del cuestionario. Se considera de gran importancia llevar a cabo una evaluación exhaustiva de la sintomatología relacionada con el estrés, dado que esta sintomatología constituye la consecuencia más inmediata de la exposición a los riesgos psicosociales.
          </p>
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {factorEstresSentence}
          </p>
          <div className="mt-4 flex flex-col md:flex-row items-start gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Forma A</p>
                <SemaphoreDial stage={stageFactorEstresA} />
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Forma B</p>
                <SemaphoreDial stage={stageFactorEstresB} />
              </div>
            </div>
            <div className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
              {showSuggestionsFactorEstres ? (
                <>
                  <p className="font-semibold">
                    Estrategias para el Manejo del Estrés Laboral
                  </p>
                  <p>Se recomienda trabajar en las siguientes recomendaciones:</p>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>
                      <p className="font-semibold">
                        Sugerencias a Nivel Organizacional (Prevención y Mitigación)
                      </p>
                      <p>
                        Estas acciones se centran en el diseño del trabajo y la cultura organizacional para reducir las fuentes de estrés.
                      </p>
                      <p className="font-semibold">Identificación y Evaluación Continua:</p>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>
                          Monitoreo Constante: No te quedes solo con la Batería de Riesgo Psicosocial. Implementa encuestas de clima laboral, buzones de sugerencias o reuniones periódicas para identificar fuentes emergentes de estrés.
                        </li>
                        <li>
                          Análisis de Datos: Utiliza los resultados de las evaluaciones para identificar los departamentos o roles con mayores niveles de estrés y entender las causas específicas.
                        </li>
                      </ul>
                      <p className="font-semibold">Diseño de Puestos de Trabajo Saludables:</p>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>
                          Claridad de Roles y Expectativas: Asegura que cada empleado conozca sus funciones, responsabilidades y las expectativas de desempeño.
                        </li>
                        <li>
                          Cargas de Trabajo Razonables: Realiza estudios de carga laboral para garantizar que las tareas sean equitativas y realistas. Evita la sobrecarga crónica.
                        </li>
                        <li>
                          Fomento del Control y la Autonomía: Siempre que sea posible, da a los empleados control sobre cómo, cuándo y dónde realizan su trabajo. La autonomía reduce la sensación de impotencia y el estrés.
                        </li>
                        <li>
                          Oportunidades de Desarrollo: Proporciona oportunidades para el uso y desarrollo de habilidades. Sentirse estancado profesionalmente es frustrante y estresante.
                        </li>
                      </ul>
                      <p className="font-semibold">Liderazgo Consciente y Formación de Líderes:</p>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>
                          Capacitación en Habilidades Blandas: Entrena a los líderes en comunicación efectiva, manejo de conflictos, empatía y retroalimentación constructiva. Un buen líder es un amortiguador del estrés.
                        </li>
                        <li>
                          Liderazgo de Apoyo: Fomenta un estilo de liderazgo que brinde apoyo, reconocimiento y guíe a los equipos, en lugar de uno puramente directivo o microgestor.
                        </li>
                        <li>
                          Delegación Efectiva: Enseña a los líderes a delegar adecuadamente, distribuyendo las responsabilidades y empoderando a sus equipos.
                        </li>
                      </ul>
                      <p className="font-semibold">Fomento de un Clima Laboral Positivo:</p>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>
                          Comunicación Abierta y Transparente: Mantén a los empleados informados sobre decisiones que les afectan, especialmente durante periodos de cambio. La incertidumbre genera estrés.
                        </li>
                        <li>
                          Promoción del Apoyo Social: Crea espacios y fomenta actividades que mejoren las relaciones entre compañeros y entre equipos. Un fuerte apoyo social actúa como un colchón contra el estrés.
                        </li>
                        <li>
                          Reconocimiento y Recompensa: Implementa sistemas justos de reconocimiento y recompensa. Sentirse valorado reduce la percepción de desequilibrio esfuerzo-recompensa.
                        </li>
                        <li>
                          Políticas de Conciliación: Ofrece flexibilidad horaria, teletrabajo (si aplica), o permisos para facilitar el equilibrio entre la vida laboral y personal.
                        </li>
                      </ul>
                      <p className="font-semibold">Salud y Bienestar Integrales:</p>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>
                          Programas de Bienestar: Implementa programas que promuevan la salud física y mental: pausas activas, talleres de nutrición, jornadas de actividad física, etc.
                        </li>
                        <li>
                          Acceso a Apoyo Psicológico: Facilita el acceso a servicios de orientación psicológica o counselling confidencial para los empleados que lo necesiten. Esto puede ser a través de un convenio o un programa interno.
                        </li>
                        <li>
                          Gestión de Conflictos y Acoso: Establece procedimientos claros y efectivos para la prevención y el manejo de conflictos y acoso laboral. Un ambiente seguro es fundamental para reducir el estrés.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-semibold">
                        Sugerencias a Nivel Individual (Herramientas para los Empleados)
                      </p>
                      <p>
                        Estas recomendaciones buscan empoderar a los empleados con técnicas y hábitos para gestionar su propio estrés. La organización puede facilitar el acceso a estas herramientas.
                      </p>
                      <p className="font-semibold">Técnicas de Relajación y Mindfulness:</p>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>
                          Respiración Profunda: Enseña ejercicios sencillos de respiración diafragmática para momentos de alta tensión.
                        </li>
                        <li>
                          Meditación Guiada: Ofrece acceso a aplicaciones o talleres de mindfulness para practicar la atención plena y reducir la rumiación mental.
                        </li>
                        <li>
                          Relajación Muscular Progresiva: Una técnica efectiva para liberar la tensión física acumulada.
                        </li>
                      </ul>
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
        <TabsContent value="graficas-total">
          <p className="text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            Aquí se mostrarán las gráficas totales.
          </p>
          <RiskDistributionChart
            title="Intralaboral forma A"
            data={intralaboralTotalData}
          />
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {intralaboralTotalSentence}
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageIntralaboralTotalA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageIntralaboralTotalB} />
            </div>
          </div>
          <RiskDistributionChart
            title="Intralaboral forma B"
            data={intralaboralTotalData}
          />
          <p className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            {intralaboralTotalSentenceB}
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma A</p>
              <SemaphoreDial stage={stageIntralaboralTotalA} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Forma B</p>
              <SemaphoreDial stage={stageIntralaboralTotalB} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="estrategias">
          <ResultadosGeneralesCards
            items={generalItems}
            onSelect={(item) => console.log(item)}
          />
          <div className="mt-6 space-y-2">
            <p className="font-semibold">CONCLUSIONES:</p>
            <p>
              De acuerdo a resultados analizados se evidencian riesgos ALTOS Y MUY
              ALTOS, en las siguientes dimensiones por lo que se sugiere Realizar un
              programa de Vigilancia epidemiológico por Riesgo psicosocial y tener en
              cuenta las recomendaciones y sugerencias establecidas en este diagnóstico
              para las siguientes categorías:
            </p>
          </div>
          <div className="mt-6">
            <CuadroAreasDeMejora data={areasMejoraData} />
          </div>
          <div className="mt-6 space-y-4">
            <AccordionItem
              id="dominio-demandas-del-trabajo-cont"
              title="Cont. Dominio demandas del trabajo"
              isOpen={activeItem === "dominio-demandas-del-trabajo-cont"}
              onToggle={() => handleToggle("dominio-demandas-del-trabajo-cont")}
            >
              <TablaInformativa
                headers={[
                  "Dimensión psicosocial",
                  "Acciones de promoción e intervención",
                ]}
                rows={[
                  {
                    dimension: "Consistencia de rol",
                    acciones: [
                      "Inducción y reinducción.",
                      "Claridad de rol como pilar del desempeño.",
                      "Servicio de asistencia al trabajador.",
                      "Mejoramiento participativo de las condiciones psicosociales de trabajo.",
                    ],
                  },
                  {
                    dimension: "Demandas de la jornada de trabajo",
                    acciones: [
                      "Gestión del trabajo por turnos.",
                      "Gestión de las pausas en el trabajo.",
                      "Mejoramiento participativo de las condiciones psicosociales de trabajo.",
                    ],
                  },
                ]}
                exportMode={false}
              />
            </AccordionItem>
            <AccordionItem
              id="dominio-recompensas-cont"
              title="Cont. Dominio recompensas"
              isOpen={activeItem === "dominio-recompensas-cont"}
              onToggle={() => handleToggle("dominio-recompensas-cont")}
            >
              <TablaInformativa
                headers={[
                  "Dimensión psicosocial",
                  "Acciones de promoción e intervención",
                ]}
                rows={[
                  {
                    dimension:
                      "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza",
                    acciones: [
                      "Inducción y reinducción.",
                      "Aprovechamiento integral de habilidades y destrezas individuales.",
                      "Fomento de la calidad de las relaciones familiares.",
                    ],
                  },
                  {
                    dimension: "Reconocimiento y compensación",
                    acciones: [
                      "Construcción del ajuste persona – trabajo.",
                      "Seguimiento y retroalimentación de la gestión.",
                      "Servicio de asistencia al trabajador.",
                      "Información sobre temas de salud, pensión, vivienda, educación, finanzas familiares y cajas de compensación familiar.",
                      "Fomento de la calidad de las relaciones familiares.",
                      "Fomento de actividades educativas, deportivas, recreativas y culturales.",
                    ],
                  },
                ]}
                exportMode={false}
              />
            </AccordionItem>

            <AccordionItem
              id="dominio-liderazgo-relaciones-cont"
              title="Cont. Dominio características de liderazgo y relaciones sociales"
              isOpen={activeItem === "dominio-liderazgo-relaciones-cont"}
              onToggle={() => handleToggle("dominio-liderazgo-relaciones-cont")}
            >
              <TablaInformativa
                headers={[
                  "Dimensión psicosocial",
                  "Acciones de promoción e intervención",
                ]}
                rows={[
                  {
                    dimension: "Características del liderazgo",
                    acciones: [
                      "Gestión del cambio.",
                      "Optimización de competencias de relación y comunicación.",
                      "Participación efectiva en los grupos de trabajo.",
                      "Seguimiento y retroalimentación de la gestión.",
                      "Servicio de asistencia al trabajador.",
                      "Rol de los jefes en la prevención y manejo del estrés.",
                    ],
                  },
                  {
                    dimension: "Relaciones sociales en el trabajo",
                    acciones: [
                      "Inducción y reinducción.",
                      "Promoción del apoyo social en la organización.",
                      "Claridad de rol como pilar del desempeño.",
                      "Optimización de competencias de relación y comunicación.",
                      "Participación efectiva en los grupos de trabajo.",
                      "Seguimiento y retroalimentación de la gestión.",
                      "Servicio de asistencia al trabajador.",
                      "Fomento de actividades educativas, deportivas, recreativas y culturales.",
                    ],
                  },
                  {
                    dimension: "Retroalimentación del desempeño",
                    acciones: [
                      "Claridad de rol como pilar del desempeño.",
                      "Seguimiento y retroalimentación de la gestión.",
                    ],
                  },
                  {
                    dimension: "Relación con los colaboradores",
                    acciones: [
                      "Fomento de mecanismos formales de comunicación.",
                      "Optimización de competencias de relación y comunicación.",
                      "Participación efectiva en los grupos de trabajo.",
                      "Seguimiento y retroalimentación de la gestión.",
                      "Servicio de asistencia al trabajador.",
                      "Rol de los jefes en la prevención y manejo del estrés.",
                    ],
                  },
                ]}
                exportMode={false}
              />
            </AccordionItem>
            <AccordionItem
              id="factores-extralaborales-cont"
              title="Cont. Factores psicosociales extralaborales"
              isOpen={activeItem === "factores-extralaborales-cont"}
              onToggle={() => handleToggle("factores-extralaborales-cont")}
            >
              <TablaInformativa
                headers={[
                  "Dimensión psicosocial",
                  "Acciones de promoción e intervención",
                ]}
                rows={[
                  {
                    dimension: "Uso del tiempo fuera del trabajo",
                    acciones: [
                      "Conciliación de entornos intra y extralaboral.",
                      "Servicio de asistencia al trabajador.",
                      "Implementación de la modalidad de teletrabajo.",
                      "Información sobre temas de salud, pensión, vivienda, educación, finanzas familiares y cajas de compensación familiar.",
                      "Fomento de la calidad de las relaciones familiares.",
                      "Actividades de preparación para la pensión.",
                      "Fomento de actividades educativas, deportivas, recreativas y culturales.",
                    ],
                  },
                  {
                    dimension: "Relaciones familiares",
                    acciones: [
                      "Optimización de competencias de relación y comunicación.",
                      "Servicio de asistencia al trabajador.",
                      "Fomento de la calidad de las relaciones familiares.",
                      "Actividades de preparación para la pensión.",
                      "Conciliación de entornos intra y extralaboral.",
                    ],
                  },
                  {
                    dimension: "Comunicación y relaciones interpersonales",
                    acciones: [
                      "Optimización de competencias de relación y comunicación.",
                      "Servicio de asistencia al trabajador.",
                    ],
                  },
                  {
                    dimension: "Situación económica del grupo familiar",
                    acciones: [
                      "Servicio de asistencia al trabajador.",
                      "Información sobre temas de salud, pensión, vivienda, educación, finanzas familiares y cajas de compensación familiar.",
                      "Actividades de preparación para la pensión.",
                    ],
                  },
                  {
                    dimension: "Características de la vivienda y de su entorno",
                    acciones: [
                      "Información sobre temas de salud, pensión, vivienda, educación, finanzas familiares y cajas de compensación familiar.",
                    ],
                  },
                  {
                    dimension: "Influencia del entorno extralaboral sobre el trabajo",
                    acciones: [
                      "Servicio de asistencia al trabajador.",
                      "Información sobre temas de salud, pensión, vivienda, educación, finanzas familiares y cajas de compensación familiar.",
                    ],
                  },
                  {
                    dimension: "Desplazamiento vivienda – trabajo – vivienda",
                    acciones: [
                      "Conciliación de entornos intra y extralaboral.",
                      "Implementación de la modalidad de teletrabajo.",
                    ],
                  },
                ]}
                exportMode={false}
              />
            </AccordionItem>
            <AccordionItem
              id="efectos-riesgo-psicosocial-cont"
              title="Cont. Efectos de los factores de riesgo psicosocial"
              isOpen={activeItem === "efectos-riesgo-psicosocial-cont"}
              onToggle={() => handleToggle("efectos-riesgo-psicosocial-cont")}
            >
              <TablaInformativa
                headers={[
                  "Efectos de los factores de riesgo psicosocial",
                  "Acciones de promoción e intervención",
                ]}
                rows={[
                  {
                    dimension: "Estrés / estrés agudo",
                    acciones: [
                      "Fomento de estilos de vida saludables.",
                      "Manejo eficaz del tiempo.",
                      "Mejoramiento participativo de las condiciones psicosociales de trabajo.",
                      "Rol de los jefes en la prevención y manejo del estrés.",
                      "Entrenamiento en el manejo de la ansiedad y el estrés.",
                      "Promoción de la salud mental y prevención del trastorno mental en el trabajo.",
                      "Atención en crisis y primeros auxilios psicológicos.",
                      "Desarrollo y fortalecimiento de la resiliencia en el ambiente laboral.",
                    ],
                  },
                  {
                    dimension: "Síndrome de agotamiento laboral o burnout",
                    acciones: [
                      "Fomento de estilos de vida saludables.",
                      "Técnicas para la desensibilización sistemática ante situaciones de ansiedad.",
                      "Manejo eficaz del tiempo.",
                      "Mejoramiento participativo de las condiciones psicosociales de trabajo.",
                      "Promoción de la salud mental y prevención del trastorno mental en el trabajo.",
                      "Desarrollo y fortalecimiento de la resiliencia en el ambiente laboral.",
                    ],
                  },
                  {
                    dimension: "Trastorno de estrés postraumático",
                    acciones: [
                      "Fomento de estilos de vida saludables.",
                      "Técnicas para la desensibilización sistemática ante situaciones de ansiedad.",
                      "Mejoramiento participativo de las condiciones psicosociales de trabajo.",
                      "Promoción de la salud mental y prevención del trastorno mental en el trabajo.",
                    ],
                  },
                  {
                    dimension: "Duelo",
                    acciones: [
                      "Fomento de estilos de vida saludables.",
                      "Técnicas para la desensibilización sistemática ante situaciones de ansiedad.",
                      "Atención en crisis y primeros auxilios psicológicos.",
                      "Desarrollo y fortalecimiento de la resiliencia en el ambiente laboral.",
                    ],
                  },
                ]}
                exportMode={false}
              />
            </AccordionItem>
            <AccordionItem
              id="efectos-riesgo-psicosocial-cont-2"
              title="Cont. Efectos de los factores de riesgo psicosocial"
              isOpen={activeItem === "efectos-riesgo-psicosocial-cont-2"}
              onToggle={() => handleToggle("efectos-riesgo-psicosocial-cont-2")}
            >
              <TablaInformativa
                headers={[
                  "Efectos de los factores de riesgo psicosocial",
                  "Acciones de promoción e intervención",
                ]}
                rows={[
                  {
                    dimension: "Trastornos del sueño",
                    acciones: [
                      "Fomento de estilos de vida saludables.",
                      "Técnicas para la desensibilización sistemática ante situaciones de ansiedad.",
                      "Mejoramiento participativo de las condiciones psicosociales de trabajo.",
                      "Promoción de la salud mental y prevención del trastorno mental en el trabajo.",
                    ],
                  },
                  {
                    dimension: "Trastornos de ansiedad y otros asociados",
                    acciones: [
                      "Fomento de estilos de vida saludables.",
                      "Técnicas para la desensibilización sistemática ante situaciones de ansiedad.",
                      "Manejo eficaz del tiempo.",
                      "Mejoramiento participativo de las condiciones psicosociales de trabajo.",
                      "Entrenamiento en el manejo de la ansiedad y el estrés.",
                      "Promoción de la salud mental y prevención del trastorno mental en el trabajo.",
                    ],
                  },
                  {
                    dimension: "Depresión",
                    acciones: [
                      "Fomento de estilos de vida saludables.",
                      "Promoción de la salud mental y prevención del trastorno mental en el trabajo.",
                    ],
                  },
                  {
                    dimension: "Consumo de sustancias psicoactivas",
                    acciones: [
                      "Prevención del consumo de sustancias psicoactivas.",
                      "Promoción de la salud mental y prevención del trastorno mental en el trabajo.",
                    ],
                  },
                ]}
                exportMode={false}
              />
            </AccordionItem>
          </div>
          <div className="mt-6 space-y-2 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            <p className="font-semibold">Recomendaciones:</p>
            <p>
              Tenga en cuenta La Guía Técnica General contempla acciones de
              intervención y control frente a cada uno de sus dominios y
              dimensiones presentados en la Batería de Instrumento de Evaluación
              de los factores de riesgo psicosocial y sus efectos, al igual que
              las específicas de actuación frente al “Burn out” o síndrome del
              agotamiento laboral, acoso laboral, manejo en situaciones de duelo,
              estrés postraumático, estrés agudo y depresión, y guías por
              actividades económicas prioritarias, las cuales establecen
              estrategias de intervención de factores psicosociales en los
              diferentes sectores económicos.
            </p>
          </div>
          <div className="mt-4 text-[#313B4A] text-justify font-montserrat text-base leading-relaxed">
            <p>
              {`Teniendo en cuenta lo anterior y de acuerdo a resultados se evidencia un "${nivelRiesgo}" en el factor "${factorText}", por lo cual su aplicación se realizará dentro de ${periodoAplicacion}. Lo anterior dando cumplimiento a la resolución 2764 de 2022.`}
            </p>
          </div>
          <div className="mt-8 text-center text-[#313B4A] font-montserrat text-base leading-relaxed">
            <p>Cordialmente,</p>
            <div className="flex justify-center py-2">
              <img src="/signature.png" alt="Firma" className="w-40 h-auto" />
            </div>
            <p>Psicóloga Especialista En SST Licencia No. 823</p>
            <p>Cel 320-4006809</p>
          </div>
        </TabsContent>
        <TabsContent value="anexos">
          <div className="space-y-4">
            <AccordionItem
              id="custodia-historia-clinica"
              title="Custodia de Historia Clinica"
              isOpen={activeItem === "custodia-historia-clinica"}
              onToggle={() => handleToggle("custodia-historia-clinica")}
            >
              <p>Contenido pendiente</p>
            </AccordionItem>
            <AccordionItem
              id="tabla-condiciones-sociodemograficas"
              title="Tabla Condiciones Sociodemograficas"
              isOpen={activeItem === "tabla-condiciones-sociodemograficas"}
              onToggle={() => handleToggle("tabla-condiciones-sociodemograficas")}
            >
              <p>Contenido pendiente</p>
            </AccordionItem>
            <AccordionItem
              id="tabla-dimensiones-factores-extralaborales"
              title="Tabla Dimensiones de los Factores Extralaborales"
              isOpen={
                activeItem === "tabla-dimensiones-factores-extralaborales"
              }
              onToggle={() =>
                handleToggle("tabla-dimensiones-factores-extralaborales")
              }
            >
              <p>Contenido pendiente</p>
            </AccordionItem>
            <AccordionItem
              id="tabla-cuestionario-estres"
              title="Tabla Cuestionario de Estres"
              isOpen={activeItem === "tabla-cuestionario-estres"}
              onToggle={() => handleToggle("tabla-cuestionario-estres")}
            >
              <p>Contenido pendiente</p>
            </AccordionItem>
            <AccordionItem
              id="como-interpretar-graficas"
              title="Como interpretar las graficas"
              isOpen={activeItem === "como-interpretar-graficas"}
              onToggle={() => handleToggle("como-interpretar-graficas")}
            >
              <p>Contenido pendiente</p>
            </AccordionItem>
            <AccordionItem
              id="como-interpretar-niveles-riesgo"
              title="Como interpretar los niveles de riesgo"
              isOpen={activeItem === "como-interpretar-niveles-riesgo"}
              onToggle={() => handleToggle("como-interpretar-niveles-riesgo")}
            >
              <p>Contenido pendiente</p>
            </AccordionItem>
          </div>
        </TabsContent>
        </Tabs>
      );
  }

