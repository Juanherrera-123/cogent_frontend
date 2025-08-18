import React, { useState, useEffect, useMemo, useRef } from "react";

import * as XLSX from "xlsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { gatherFlatResults, FlatResult } from "@/utils/gatherResults";
import { exportElementToPDF } from "@/utils/pdfExport";
import { shortNivelRiesgo } from "@/utils/shortNivelRiesgo";
import { usePdfExport } from "@/hooks/usePdfExport";
import { dimensionesExtralaboral } from "@/data/esquemaExtralaboral";
import { baremosFormaA } from "@/data/baremosFormaA";
import { baremosFormaB } from "@/data/baremosFormaB";
import TablaIndividual from "@/components/TablaIndividual";
import TablaDimensiones from "@/components/TablaDimensiones";
import GraficaBarra from "@/components/GraficaBarra";
import GraficaBarraSimple from "@/components/GraficaBarraSimple";
import GraficaBarraCategorias from "@/components/GraficaBarraCategorias";
import TablaDominios from "@/components/TablaDominios";
import ReportePDF from "@/components/ReportePDF";
import AdminEmpresas from "@/components/AdminEmpresas";
import { CredencialEmpresa, ResultRow, CategoriaConteo } from "@/types";
import GeneralResultsTabs from "@/components/dashboard/GeneralResultsTabs";
import FormaTabs from "@/components/dashboard/FormaTabs";
import InformeTabs from "@/components/dashboard/InformeTabs";
import type { IntroduccionData } from "@/report/introduccion";
import LogoCogent from "/logo_forma.png";
import { FileDown, FileText, Home as HomeIcon } from "lucide-react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { calcularFormaA } from "@/utils/calcularFormaA";
import { buildReportPayload } from "@/utils/buildReportPayload";
import { ReportPayload } from "@/types/report";
import type { ReportOptions } from "@/types/report";
import { recomendacionesPorResultados, conclusionesSinteticas } from "@/utils/recomendaciones";
import { buildNarrativaContext } from "@/utils/narrativeMapper";
import { getNarrativaSociodemo } from "@/services/narrativa";
import { getRecomendacionSociodemo } from "@/services/recomendacionSociodemo";
import type { RiskDistributionData } from "@/components/RiskDistributionChart";

const nivelesRiesgo = [
  "Riesgo muy bajo",
  "Riesgo bajo",
  "Riesgo medio",
  "Riesgo alto",
  "Riesgo muy alto",
];

type Props = {
  rol: "psicologa" | "dueno";
  empresaNombre?: string;
  soloGenerales?: boolean;
  empresaFiltro?: string;
  credenciales?: CredencialEmpresa[];
  onAgregarEmpresa?: (
    nombre: string,
    usuario: string,
    password: string
  ) => Promise<boolean>;
  onEliminarEmpresa?: (usuario: string) => Promise<boolean>;
  onEditarEmpresa?: (
    originalUsuario: string,
    nombre: string,
    usuario: string,
    password: string
  ) => Promise<boolean>;
  onBack?: () => void;
};

const STORAGE_KEY = (empresaId: string) => `cogent_report_options_${empresaId}`;
function loadOptions(empresaId: string): ReportOptions | null {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY(empresaId)) || "") as ReportOptions;
  } catch {
    return null;
  }
}
function saveOptions(empresaId: string, opts: ReportOptions) {
  localStorage.setItem(STORAGE_KEY(empresaId), JSON.stringify(opts));
}

// Dominios y dimensiones (adapta los nombres si cambian)
const dominiosA = [
  "Liderazgo y relaciones sociales en el trabajo",
  "Control sobre el trabajo",
  "Demandas del trabajo",
  "Recompensas",
];
const dimensionesA = [
  "Características del liderazgo",
  "Relaciones sociales en el trabajo",
  "Retroalimentación del desempeño",
  "Relación con los colaboradores",
  "Claridad de rol",
  "Capacitación",
  "Participación y manejo del cambio",
  "Oportunidades para el uso y desarrollo de habilidades y conocimientos",
  "Control y autonomía sobre el trabajo",
  "Demandas ambientales y de esfuerzo físico",
  "Demandas emocionales",
  "Demandas cuantitativas",
  "Influencia del trabajo sobre el entorno extralaboral",
  "Exigencias de responsabilidad del cargo",
  "Demandas de carga mental",
  "Consistencia del rol",
  "Demandas de la jornada de trabajo",
  "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza",
  "Reconocimiento y compensación",
];

// Puedes definir dominios/dimensiones para B igual, si quieres personalizar más.
const dominiosB = [
  "Liderazgo y relaciones sociales en el trabajo",
  "Control sobre el trabajo",
  "Demandas del trabajo",
  "Recompensas",
];
const dimensionesB = [
  "Características del liderazgo",
  "Relaciones sociales en el trabajo",
  "Retroalimentación del desempeño",
  "Claridad de rol",
  "Capacitación",
  "Participación y manejo del cambio",
  "Oportunidades para el uso y desarrollo de habilidades y conocimientos",
  "Control y autonomía sobre el trabajo",
  "Demandas ambientales y de esfuerzo físico",
  "Demandas emocionales",
  "Demandas cuantitativas",
  "Influencia del trabajo sobre el entorno extralaboral",
  "Demandas de carga mental",
  "Demandas de la jornada de trabajo",
  "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza",
  "Reconocimiento y compensación",
];
const dimensionesExtra = dimensionesExtralaboral.map((d) => d.nombre);

const formaAOrden = [
  {
    dominio: "Liderazgo y relaciones sociales en el trabajo",
    dimensiones: [
      "Características del liderazgo",
      "Relaciones sociales en el trabajo",
      "Retroalimentación del desempeño",
      "Relación con los colaboradores",
    ],
  },
  {
    dominio: "Control sobre el trabajo",
    dimensiones: [
      "Claridad de rol",
      "Capacitación",
      "Participación y manejo del cambio",
      "Oportunidades para el uso y desarrollo de habilidades y conocimientos",
      "Control y autonomía sobre el trabajo",
    ],
  },
  {
    dominio: "Demandas del trabajo",
    dimensiones: [
      "Demandas ambientales y de esfuerzo físico",
      "Demandas emocionales",
      "Demandas cuantitativas",
      "Influencia del trabajo sobre el entorno extralaboral",
      "Exigencias de responsabilidad del cargo",
      "Demandas de carga mental",
      "Consistencia del rol",
      "Demandas de la jornada de trabajo",
    ],
  },
  {
    dominio: "Recompensas",
    dimensiones: [
      "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza",
      "Reconocimiento y compensación",
    ],
  },
];

const formaBOrden = [
  {
    dominio: "Liderazgo y relaciones sociales en el trabajo",
    dimensiones: [
      "Características del liderazgo",
      "Relaciones sociales en el trabajo",
      "Retroalimentación del desempeño",
    ],
  },
  {
    dominio: "Control sobre el trabajo",
    dimensiones: [
      "Claridad de rol",
      "Capacitación",
      "Participación y manejo del cambio",
      "Oportunidades para el uso y desarrollo de habilidades y conocimientos",
      "Control y autonomía sobre el trabajo",
    ],
  },
  {
    dominio: "Demandas del trabajo",
    dimensiones: [
      "Demandas ambientales y de esfuerzo físico",
      "Demandas emocionales",
      "Demandas cuantitativas",
      "Influencia del trabajo sobre el entorno extralaboral",
      "Demandas de carga mental",
      "Demandas de la jornada de trabajo",
    ],
  },
  {
    dominio: "Recompensas",
    dimensiones: [
      "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza",
      "Reconocimiento y compensación",
    ],
  },
];

const extralaboralOrden = [
  "Tiempo fuera del trabajo",
  "Relaciones familiares",
  "Comunicación y relaciones interpersonales",
  "Situación económica del grupo familiar",
  "Características de la vivienda y de su entorno",
  "Influencia del entorno extralaboral sobre el trabajo",
  "Desplazamiento vivienda – trabajo – vivienda",
];

const nivelesEstres = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"];
const nivelesExtra = nivelesRiesgo;
const nivelesForma = nivelesRiesgo;

const fichaTecnicaHeaders = [
  "Nro",
  "Empresa",
  "Sexo",
  "Cargo",
  "Fecha ficha",
  "Cédula",
  "Nacimiento",
  "Estado civil",
  "Estudios",
  "Ocupación",
  "Ciudad residencia",
  "Departamento residencia",
  "Estrato",
  "Vivienda",
  "Dependientes",
  "Ciudad trabajo",
  "Departamento trabajo",
  "Años empresa",
  "Tipo cargo",
  "Años cargo",
  "Área",
  "Tipo contrato",
  "Horas diarias",
  "Tipo salario",
];

const formaAHeaders = formaAOrden.flatMap(({ dominio, dimensiones }) => [
  `DOMINIO: ${dominio} - Forma A (puntaje transformado)`,
  `DOMINIO: ${dominio} - Forma A (nivel de riesgo)`,
  ...dimensiones.flatMap((k) => [
    `Dimensión: ${k} - Forma A (puntaje transformado)`,
    `Dimensión: ${k} - Forma A (nivel de riesgo)`,
  ]),
]);

const formaBHeaders = formaBOrden.flatMap(({ dominio, dimensiones }) => [
  `DOMINIO: ${dominio} - Forma B (puntaje transformado)`,
  `DOMINIO: ${dominio} - Forma B (nivel de riesgo)`,
  ...dimensiones.flatMap((k) => [
    `Dimensión: ${k} - Forma B (puntaje transformado)`,
    `Dimensión: ${k} - Forma B (nivel de riesgo)`,
  ]),
]);

const extralaboralHeaders = extralaboralOrden.flatMap((k) => [
  `Dimensión: ${k} - Extralaboral (puntaje transformado)`,
  `Dimensión: ${k} - Extralaboral (nivel de riesgo)`,
]);

const informeHeaderOrder = [
  "Nombre",
  ...fichaTecnicaHeaders,
  ...formaAHeaders,
  "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma A (puntaje transformado)",
  "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma A (nivel de riesgo)",
  ...formaBHeaders,
  "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma B (puntaje transformado)",
  "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial intralaboral - Forma B (nivel de riesgo)",
  ...extralaboralHeaders,
  "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial extralaboral (puntaje transformado)",
  "PUNTAJE TOTAL del cuestionario de factores de riesgo psicosocial extralaboral (nivel de riesgo)",
  "Puntaje total evaluación de estrés (puntaje transformado)",
  "Puntaje total evaluación de estrés (nivel de riesgo)",
];

const categoriasFicha = [
  { key: "sexo", label: "Género" },
  { key: "estadoCivil", label: "Estado civil" },
  { key: "estudios", label: "Estudio" },
  { key: "estrato", label: "Estrato" },
  { key: "vivienda", label: "Vivienda" },
  { key: "antiguedad", label: "Antiguedad" },
  { key: "tipoCargo", label: "Cargo" },
  { key: "tipoContrato", label: "Contrato" },
  { key: "tipoSalario", label: "Salario" },
  { key: "horasDiarias", label: "Horas diarias" },
] as const;


export default function DashboardResultados({
  rol,
  empresaNombre,
  soloGenerales,
  empresaFiltro,
  credenciales = [],
  onAgregarEmpresa,
  onEliminarEmpresa,
  onEditarEmpresa,
  onBack
}: Props) {
  const [datos, setDatos] = useState<(ResultRow & { id: string })[]>([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresaFiltro || "todas");
  const [empresaEliminar, setEmpresaEliminar] = useState("todas");
  const [tab, setTab] = useState("general");
  const [tabGeneral, setTabGeneral] = useState("resumen");
  const [categoriaFicha, setCategoriaFicha] = useState<string>(
    categoriasFicha[0].key
  );
  const [tabIntra, setTabIntra] = useState("global"); // Para sub-tabs de formaA/B

  const [tabExtra, setTabExtra] = useState("global");

  const [chartType, setChartType] = useState<"bar" | "histogram" | "pie">("bar");
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: offscreenRef, rendering, progress, exportNow } = usePdfExport();

  const saludo = rol === "psicologa" ? "Hola Lilian Navas" : empresaNombre || "";
  const cargo = rol === "psicologa" ? "Psicologist" : "Empresa";

  const tabPill =
    "px-5 py-2 rounded-full font-semibold border border-[#B2E2FF] text-[#172349] shrink-0 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#38BDF8] data-[state=active]:to-[#265FF2]";
  
  useEffect(() => {
    const cargar = async () => {
      const snap = await getDocs(collection(db, "resultadosCogent"));
      const arr = snap.docs.map((d) => {
        const data = { id: d.id, ...(d.data() as ResultRow) };
        if (
          data.tipo === "A" &&
          data.respuestas?.bloques &&
          !data.resultadoFormaA?.dimensiones?.["Retroalimentación del desempeño"]
        ) {
          data.resultadoFormaA = calcularFormaA(data.respuestas.bloques);
        }
        return data;
      });
      setDatos(arr);
    };
    cargar();
  }, []);

  // Empresas únicas (para filtro manual, psicóloga)
  const empresasResultados = Array.from(new Set(datos.map((d) => d.ficha?.empresa || "Sin empresa")));

  // Aplica el filtro según el rol
  const datosMostrados = datos.filter(
    (d) =>
      (empresaSeleccionada === "todas" || d.ficha?.empresa === empresaSeleccionada)
  );

  const datosEliminar = useMemo(
    () =>
      datos.filter(
        (d) => empresaEliminar === "todas" || d.ficha?.empresa === empresaEliminar
      ),
    [datos, empresaEliminar]
  );

  // ---- Agrupación por tipo de resultado ----
  const datosA = datosMostrados.filter(
    (d) => d.tipo === "A" && d.resultadoFormaA && d.resultadoFormaA.valido !== false
  );
  const datosB = datosMostrados.filter(
    (d) => d.tipo === "B" && d.resultadoFormaB && d.resultadoFormaB.valido !== false
  );
  const datosExtra = datosMostrados.filter(
    (d) => d.resultadoExtralaboral && d.resultadoExtralaboral.valido !== false
  );
  const datosEstres = datosMostrados.filter(
    (d) => d.resultadoEstres && d.resultadoEstres.valido !== false
  );

  const levelsOrder = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"];
  const liderazgoDominioData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Liderazgo y relaciones sociales en el trabajo";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dominios?.[nombre] ||
        d.resultadoFormaB?.dominios?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dominios)) {
        seccion = (d.resultadoFormaA.dominios as any).find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dominios)) {
        seccion = (d.resultadoFormaB.dominios as any).find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);
  const liderazgoData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Características del liderazgo";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const relacionesData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Relaciones sociales en el trabajo";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const retroalimentacionData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Retroalimentación del desempeño";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const colaboradoresData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Relación con los colaboradores";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const autonomiaData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Control y autonomía sobre el trabajo";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const claridadData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Claridad de rol";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const capacitacionData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Capacitación";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const participacionData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Participación y manejo del cambio";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const oportunidadesData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre =
      "Oportunidades para el uso y desarrollo de habilidades y conocimientos";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const controlDominioData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Control sobre el trabajo";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dominios?.[nombre] ||
        d.resultadoFormaB?.dominios?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dominios)) {
        seccion = (d.resultadoFormaA.dominios as any).find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dominios)) {
        seccion = (d.resultadoFormaB.dominios as any).find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const demandasAmbientalesData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Demandas ambientales y de esfuerzo físico";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const demandasEmocionalesData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Demandas emocionales";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const demandasCuantitativasData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Demandas cuantitativas";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const influenciaTrabajoData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Influencia del trabajo sobre el entorno extralaboral";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const exigenciasResponsabilidadData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Exigencias de responsabilidad del cargo";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const demandasCargaMentalData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Demandas de carga mental";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const demandasJornadaData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Demandas de la jornada de trabajo";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const consistenciaRolData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Consistencia del rol";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);

  const demandasDominioData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Demandas del trabajo";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dominios?.[nombre] ||
        d.resultadoFormaB?.dominios?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dominios)) {
        seccion = (d.resultadoFormaA.dominios as any).find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dominios)) {
        seccion = (d.resultadoFormaB.dominios as any).find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);
  const recompensasDominioData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Recompensas";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dominios?.[nombre] ||
        d.resultadoFormaB?.dominios?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dominios)) {
        seccion = (d.resultadoFormaA.dominios as any).find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dominios)) {
        seccion = (d.resultadoFormaB.dominios as any).find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);
  const recompensasPertenenciaData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre =
      "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);
  const reconocimientoCompensacionData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Reconocimiento y compensación";
    [...datosA, ...datosB].forEach((d) => {
      let seccion: any =
        d.resultadoFormaA?.dimensiones?.[nombre] ||
        d.resultadoFormaB?.dimensiones?.[nombre];
      if (!seccion && Array.isArray(d.resultadoFormaA?.dimensiones)) {
        seccion = d.resultadoFormaA.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      if (!seccion && Array.isArray(d.resultadoFormaB?.dimensiones)) {
        seccion = d.resultadoFormaB.dimensiones.find(
          (x: any) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base = nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosA, datosB]);
  const extralaboralData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    datosExtra.forEach((d) => {
      const nivel = d.resultadoExtralaboral?.nivelGlobal;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosExtra]);
  const tiempoFueraTrabajoData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Tiempo fuera del trabajo";
    datosExtra.forEach((d) => {
      let seccion: any = (d.resultadoExtralaboral as any)?.dimensiones?.[
        nombre as any
      ];
      if (Array.isArray(d.resultadoExtralaboral?.dimensiones)) {
        seccion = d.resultadoExtralaboral.dimensiones.find(
          (x) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosExtra]);
  const relacionesFamiliaresData: RiskDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const countsA: Record<string, number> = {};
    const countsB: Record<string, number> = {};
    levelsOrder.forEach((lvl) => {
      counts[lvl] = 0;
      countsA[lvl] = 0;
      countsB[lvl] = 0;
    });
    let invalid = 0;
    let total = 0;
    let totalA = 0;
    let totalB = 0;
    const nombre = "Relaciones familiares";
    datosExtra.forEach((d) => {
      let seccion: any = (d.resultadoExtralaboral as any)?.dimensiones?.[
        nombre as any
      ];
      if (Array.isArray(d.resultadoExtralaboral?.dimensiones)) {
        seccion = d.resultadoExtralaboral.dimensiones.find(
          (x) => x.nombre === nombre
        );
      }
      const nivel = seccion?.nivel;
      if (nivel) {
        const base =
          nivel === "Sin riesgo" ? "Muy bajo" : shortNivelRiesgo(nivel);
        if (counts[base] !== undefined) {
          counts[base] += 1;
          if (d.tipo === "A") {
            countsA[base] += 1;
            totalA++;
          } else {
            countsB[base] += 1;
            totalB++;
          }
          total++;
        } else {
          invalid++;
        }
      }
    });
    const data: RiskDistributionData = {
      total,
      counts,
      levelsOrder: [...levelsOrder],
      countsA,
      countsB,
      totalA,
      totalB,
    };
    if (invalid > 0) data.invalid = invalid;
    return data;
  }, [datosExtra]);
  const ciudadInforme =
    datosMostrados.find((d) => d.ficha?.trabajoCiudad)?.ficha?.trabajoCiudad || "";

  // ---- Resúmenes para gráficos ----
  const resumenNivel = (datos: ResultRow[], key: string, niveles: string[]) =>
    niveles.map((nivel, idx) => ({
      nombre: nivel,
      nivel,
      indice: idx,
      cantidad: datos.filter((d) => {
        const r = (d as any)[key];
        const nivelRes =
          r?.total?.nivel ?? r?.nivelTotal ?? r?.nivelGlobal ?? r?.nivel;
        return (
          nivelRes === nivel ||
          (nivelRes === "Sin riesgo" && nivel === "Riesgo muy bajo")
        );
      }).length,
    }));

  const resumenA = resumenNivel(datosA, "resultadoFormaA", nivelesForma);
  const resumenB = resumenNivel(datosB, "resultadoFormaB", nivelesForma);
  const resumenExtra = resumenNivel(datosExtra, "resultadoExtralaboral", nivelesExtra);
  const resumenEstres = resumenNivel(datosEstres, "resultadoEstres", nivelesEstres);

  // ---- Promedios por dominio/dimensión ----

  function nivelPromedio(
    nombre: string,
    valor: number,
    origen: "formaA" | "formaB" | "extra",
    tipo: "dimensiones" | "dominios",
    datos?: ResultRow[]
  ) {
    let baremo: { nivel: string; min: number; max: number }[] = [];
    if (origen === "formaA") {
      if (tipo === "dimensiones") {
        baremo = baremosFormaA.dimensiones[nombre] || [];
      } else {
        baremo = baremosFormaA.dominios[nombre] || [];
      }
    } else if (origen === "formaB") {
      if (tipo === "dimensiones") {
        baremo = baremosFormaB.dimension[nombre] || [];
      } else {
        baremo = baremosFormaB.dominio[nombre] || [];
      }
    } else if (origen === "extra") {
      if (datos && datos.length) {
        const dim = dimensionesExtralaboral.find((d) => d.nombre === nombre);
        if (dim) {
          const indices = datos
            .map((d) => {
              const form = d.tipo;
              let seccion = (d.resultadoExtralaboral as any)?.dimensiones?.[
                nombre as any
              ];
              if (Array.isArray(d.resultadoExtralaboral?.dimensiones)) {
                seccion = d.resultadoExtralaboral.dimensiones.find(
                  (x) => x.nombre === nombre
                );
              }
              const puntaje = seccion?.transformado ?? seccion?.puntajeTransformado;
              if (typeof puntaje !== "number") return undefined;
              const lista = form === "B" ? dim.baremosB : dim.baremosA;
              const b = lista.find((x) => puntaje >= x.min && puntaje <= x.max);
              const nivel = b?.nivel ? (b.nivel === "Sin riesgo" ? "Riesgo muy bajo" : b.nivel) : undefined;
              return nivel ? nivelesRiesgo.indexOf(nivel) : undefined;
            })
            .filter((x) => typeof x === "number") as number[];
          if (indices.length) {
            const idx = Math.round(indices.reduce((a, b) => a + b, 0) / indices.length);
            return nivelesRiesgo[idx] || "No clasificado";
          }
        }
      }
      const dim = dimensionesExtralaboral.find((d) => d.nombre === nombre);
      baremo = dim?.baremosA || [];
    }
    const nivel =
      baremo.find((b) => valor >= b.min && valor <= b.max)?.nivel ||
      "No clasificado";
    return nivel === "Sin riesgo" ? "Riesgo muy bajo" : nivel;
  }

  function calcularPromedios(
    datos: ResultRow[],
    key: string,
    campos: string[],
    subkey: "dominios" | "dimensiones",
    origen: "formaA" | "formaB" | "extra"
  ) {
    // datos: array de usuarios, cada uno con resultadoFormaA/B.dimensiones/dominios[dim]
    // = { transformado | puntajeTransformado | valor }
    const resultado: {
      nombre: string;
      promedio: number;
      nivel: string;
      indice: number;
    }[] = [];
    campos.forEach((nombre) => {
      const valores = datos
        .map((d) => {
          const res = (d as any)[key];
          let seccion = res?.[subkey]?.[nombre];
          if (Array.isArray(res?.[subkey])) {
            const item = res[subkey].find((x: any) => x.nombre === nombre);
            seccion = item;
          }
          if (typeof seccion === "object") {
            return seccion.transformado ?? seccion.puntajeTransformado;
          }
          // Compatibilidad con estructura de Forma B (puntajesDimension/puntajesDominio)
          if (subkey === "dimensiones") {
            return res?.puntajesDimension?.[nombre];
          }
          if (subkey === "dominios") {
            return res?.puntajesDominio?.[nombre];
          }
          return undefined;
        })
        .filter((x) => typeof x === "number");
      const promedio = valores.length
        ? valores.reduce((a, b) => a + b, 0) / valores.length
        : 0;
      const promedioRedondeado = Math.round(promedio * 10) / 10;
      const nivel = nivelPromedio(nombre, promedioRedondeado, origen, subkey, datos);
      const indice = nivelesRiesgo.indexOf(nivel);
      resultado.push({ nombre, promedio: promedioRedondeado, nivel, indice });
    });
    return resultado;
  }
  const promediosDominiosA = calcularPromedios(
    datosA,
    "resultadoFormaA",
    dominiosA,
    "dominios",
    "formaA"
  );
  const promediosDimensionesA = calcularPromedios(
    datosA,
    "resultadoFormaA",
    dimensionesA,
    "dimensiones",
    "formaA"
  );
  const promediosDominiosB = calcularPromedios(
    datosB,
    "resultadoFormaB",
    dominiosB,
    "dominios",
    "formaB"
  );
  const promediosDimensionesB = calcularPromedios(
    datosB,
    "resultadoFormaB",
    dimensionesB,
    "dimensiones",
    "formaB"
  );

  const promediosDimensionesExtra = calcularPromedios(
    datosExtra,
    "resultadoExtralaboral",
    dimensionesExtra,
    "dimensiones",
    "extra"
  );

  const resumenAReport = useMemo(
    () => ({
      dominios: Object.fromEntries(
        promediosDominiosA.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])
      ),
      dimensiones: Object.fromEntries(
        promediosDimensionesA.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])
      ),
    }),
    [promediosDominiosA, promediosDimensionesA]
  );

  const resumenBReport = useMemo(
    () => ({
      dominios: Object.fromEntries(
        promediosDominiosB.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])
      ),
      dimensiones: Object.fromEntries(
        promediosDimensionesB.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])
      ),
    }),
    [promediosDominiosB, promediosDimensionesB]
  );

  const resumenExtraReport = useMemo(
    () => ({
      dimensiones: Object.fromEntries(
        promediosDimensionesExtra.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])
      ),
    }),
    [promediosDimensionesExtra]
  );



  function conteosPorFicha(datos: ResultRow[], keyFicha: string) {
    if (keyFicha === "antiguedad") {
      const grupos = Array.from(
        new Set(
          datos.map((d) =>
            d.ficha
              ? d.ficha.menosAnioEmpresa
                ? "Menos de un año"
                : "Más de un año"
              : "Sin dato"
          )
        )
      );
      return grupos.map((valor) => ({
        nombre: valor,
        cantidad: datos.filter((d) => {
          const v = d.ficha
            ? d.ficha.menosAnioEmpresa
              ? "Menos de un año"
              : "Más de un año"
            : "Sin dato";
          return v === valor;
        }).length,
      }));
    }
    const grupos = Array.from(
      new Set(datos.map((d) => (d.ficha as any)?.[keyFicha] ?? "Sin dato"))
    );
    return grupos.map((valor) => ({
      nombre: valor,
      cantidad: datos.filter((d) => ((d.ficha as any)?.[keyFicha] ?? "Sin dato") === valor).length,
    }));
  }

  const fichaConteosA: Record<string, CategoriaConteo[]> = {};
  const fichaConteosB: Record<string, CategoriaConteo[]> = {};
  const fichaConteosExtra: Record<string, CategoriaConteo[]> = {};
  const fichaConteosEstres: Record<string, CategoriaConteo[]> = {};
  const fichaConteosGlobal: Record<string, CategoriaConteo[]> = {};

  categoriasFicha.forEach((cat) => {
    fichaConteosA[cat.key] = conteosPorFicha(datosA, cat.key);
    fichaConteosB[cat.key] = conteosPorFicha(datosB, cat.key);
    fichaConteosExtra[cat.key] = conteosPorFicha(datosExtra, cat.key);
    fichaConteosEstres[cat.key] = conteosPorFicha(datosEstres, cat.key);
    fichaConteosGlobal[cat.key] = conteosPorFicha(datosMostrados, cat.key);
  });

  const datosInforme = useMemo(() => {
    const todos = gatherFlatResults(datos);
    return todos.filter(
      (f) => empresaSeleccionada === "todas" || f.Empresa === empresaSeleccionada
    );
  }, [empresaSeleccionada]);

  const allHeaders = useMemo(() => {
    const base = informeHeaderOrder.filter((h) =>
      datosInforme.some((fila) => h in fila)
    );
    const remaining = Array.from(
      new Set(datosInforme.flatMap((fila) => Object.keys(fila)))
    ).filter((h) => !base.includes(h));
    return [...base, ...remaining];
  }, [datosInforme]);

  const promedioInforme = useMemo(() => {
    const nivelesMap: Record<string, number> = {};
    nivelesRiesgo.forEach((n, i) => {
      nivelesMap[n] = i;
    });
    nivelesMap["Sin riesgo"] = 0;

    const nivelesEstresMap: Record<string, number> = {};
    nivelesEstres.forEach((n, i) => {
      nivelesEstresMap[n] = i;
    });

    const row: Record<string, string | number | undefined> = {};
    allHeaders.forEach((h) => {
      const valores = datosInforme
        .map((f) => f[h])
        .filter((v) => v !== undefined && v !== "");
      const nums = valores
        .map((v) => Number(v))
        .filter((v) => !isNaN(v));
      if (nums.length) {
        const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
        row[h] = Math.round(avg * 10) / 10;
        return;
      }
      const mapa = h.toLowerCase().includes("estrés")
        ? nivelesEstresMap
        : nivelesMap;
      const niveles = valores
        .map((v) => mapa[v as string])
        .filter((v) => typeof v === "number");
      if (niveles.length) {
        const idx = Math.round(niveles.reduce((a, b) => a + b, 0) / niveles.length);
        const lista = h.toLowerCase().includes("estrés") ? nivelesEstres : nivelesRiesgo;
        row[h] = lista[idx] || "";
      } else {
        row[h] = "";
      }
    });
    if (allHeaders.length) {
      row[allHeaders[0]] = "Promedio";
    }
    return row;
  }, [datosInforme, allHeaders]);

  const flat: FlatResult[] = datosInforme;

  type EmpresaSel =
    | { id?: string; nombre?: string; nit?: string; logoUrl?: string }
    | string
    | undefined;

  const empresaSel = empresaSeleccionada as EmpresaSel;

  const empresaInfo = {
    id:
      typeof empresaSel === "object" && empresaSel && "id" in empresaSel
        ? empresaSel.id ?? "empresa-actual"
        : "empresa-actual",
    nombre:
      typeof empresaSel === "object" && empresaSel && "nombre" in empresaSel
        ? empresaSel.nombre ?? "Empresa"
        : typeof empresaSel === "string"
        ? empresaSel
        : "Empresa",
    nit:
      typeof empresaSel === "object" && empresaSel && "nit" in empresaSel
        ? empresaSel.nit ?? ""
        : "",
    logoUrl:
      typeof empresaSel === "object" && empresaSel && "logoUrl" in empresaSel
        ? empresaSel.logoUrl ?? ""
        : "",
  };

  const reportPayload: ReportPayload = buildReportPayload({
    empresa: empresaInfo,
    flat,
    resumenA: resumenAReport,
    resumenB: resumenBReport,
    resumenExtra: resumenExtraReport,
    estresGlobal: undefined,
  });

  const introData: IntroduccionData = {
    empresa: reportPayload.empresa.nombre,
    total: datosMostrados.length,
    formaA: datosA.length,
    formaB: datosB.length,
    ciudad: ciudadInforme,
  };

  const narrativaCtx = buildNarrativaContext(reportPayload);
  const narrativaSociodemo = getNarrativaSociodemo(narrativaCtx);
  const recomendacionesSociodemo = getRecomendacionSociodemo(reportPayload.sociodemo);

  const empresaId = reportPayload.empresa?.id || "empresa-actual";

  const [reportOptions, setReportOptions] = useState<ReportOptions>(() => (
    loadOptions(empresaId) || {
      sections: {
        portada: true,
        resumenGlobal: true,
        intralaboral: true,
        extralaboral: true,
        sociodemografia: true,
        metodologia: true,
        normativa: true,
        recomendaciones: true,
        conclusiones: true,
      },
      theme: {
        primary: "#0F172A",
        accent: "#475569",
        logoUrl: reportPayload.empresa.logoUrl || "",
      },
      tituloPortada: "",
    }
  ));

  useEffect(() => {
    const loaded = loadOptions(empresaId);
    if (loaded) setReportOptions(loaded);
  }, [empresaId]);

  useEffect(() => {
    saveOptions(empresaId, reportOptions);
  }, [empresaId, reportOptions]);

  // Reglas automáticas para recomendaciones y conclusiones
  const dimA = reportPayload.dimensiones.formaA ?? {};
  const dimB = reportPayload.dimensiones.formaB ?? {};
  const dimExtra = reportPayload.dimensiones.extralaboral ?? {};
  const domA = reportPayload.dominios.formaA ?? {};
  const domB = reportPayload.dominios.formaB ?? {};

  const recomendaciones = [
    ...recomendacionesPorResultados(dimA, domA),
    ...recomendacionesPorResultados(dimB, domB),
    ...recomendacionesPorResultados(dimExtra),
  ];

  function topHallazgos(
    dims: Record<string, { transformado?: number; nivel?: string }>,
    n = 3
  ) {
    return Object.entries(dims)
      .sort((a, b) => (b[1].transformado ?? 0) - (a[1].transformado ?? 0))
      .slice(0, n)
      .map(([k]) => k);
  }
  const hallazgos = [...topHallazgos(dimA, 2), ...topHallazgos(dimB, 1)];

  const conclusiones = conclusionesSinteticas({
    globalA: reportPayload.global.formaA,
    globalB: reportPayload.global.formaB,
    globalExtra: reportPayload.global.extralaboral,
    hallazgosClave: hallazgos,
  });

  useEffect(() => {
    console.log("ReportPayload", reportPayload);
    console.log("Recomendaciones →", recomendaciones);
    console.log("Conclusiones →", conclusiones);
  }, [reportPayload, recomendaciones, conclusiones]);

  async function onGenerarInformePDF() {
    const fn = `Informe_${reportPayload.empresa.nombre}_${new Date(
      reportPayload.fechaInformeISO
    ).toISOString().slice(0, 10)}.pdf`;
    await exportNow(fn);
  }

  // ---- Exportar a Excel ----
  const handleExportar = () => {
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
            ...(tab === "formaA" && {
              "Puntaje Forma A": d.resultadoFormaA?.total?.transformado ?? "",
              "Nivel Forma A": d.resultadoFormaA?.total?.nivel ?? "",
            }),
            ...(tab === "formaB" && {
              "Puntaje Forma B":
                d.resultadoFormaB?.total?.transformado ??
                d.resultadoFormaB?.puntajeTransformadoTotal ??
                d.resultadoFormaB?.puntajeTransformado ??
                d.resultadoFormaB?.puntajeTotalTransformado ??
                "",
              "Nivel Forma B":
                d.resultadoFormaB?.total?.nivel ??
                d.resultadoFormaB?.nivelTotal ??
                d.resultadoFormaB?.nivel ??
                "",
            }),
            ...(tab === "extralaboral" && {
              "Puntaje Extralaboral":
                d.resultadoExtralaboral?.puntajeTransformadoTotal ?? "",
              "Nivel Extralaboral": d.resultadoExtralaboral?.nivelGlobal ?? "",
            }),
            ...(tab === "estres" && {
              "Puntaje Estrés": d.resultadoEstres?.puntajeTransformado ?? "",
              "Nivel Estrés": d.resultadoEstres?.nivel ?? "",
            }),
              Fecha: row.fecha ? new Date(row.fecha).toLocaleString() : "",
              };
            });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filas, { header: allHeaders });
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    XLSX.writeFile(wb, "resultados.xlsx");
  };

  // ---- Exportar a PDF ----
  const handleExportPDF = async () => {
    if (!containerRef.current) return;
    const active = containerRef.current.querySelector('[data-state="active"]');
    if (active) {
      await exportElementToPDF(active as HTMLElement, "resultados.pdf");
    }
  };

  const toggleSeleccion = (index: number) => {
    setSeleccionados((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const eliminarSeleccionados = async () => {
    if (seleccionados.length === 0) return;
    const eliminados = datos.filter((_, i) => seleccionados.includes(i));
    const restantes = datos.filter((_, i) => !seleccionados.includes(i));
    await Promise.all(
      eliminados.map((d) => deleteDoc(doc(db, "resultadosCogent", d.id)))
    );
    setDatos(restantes);
    setSeleccionados([]);
  };

  const eliminarPorEmpresa = async () => {
    const eliminados =
      empresaEliminar === "todas"
        ? datos
        : datos.filter((d) => d.ficha?.empresa === empresaEliminar);
    const restantes =
      empresaEliminar === "todas"
        ? []
        : datos.filter((d) => d.ficha?.empresa !== empresaEliminar);
    await Promise.all(
      eliminados.map((d) => deleteDoc(doc(db, "resultadosCogent", d.id)))
    );
    setDatos(restantes);
    setSeleccionados([]);
  };

  // ---- Render tablas individuales (solo para psicóloga) ----
  // ---- Pestañas ----
  return (

    <div className="min-h-screen flex flex-col items-center py-10 px-2">
      <div className="background-shapes">
        <div className="shape rhombus rhombus-1"></div>
        <div className="shape rhombus rhombus-2"></div>
      </div>
      <div
        ref={containerRef}
        className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-8 md:p-10 flex flex-col gap-8 mx-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={LogoCogent} alt="COGENT logo" className="w-10 h-10 mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#172349] font-montserrat">Dashboard de Resultados</h2>
          </div>
          <div className="text-right">
            <div className="font-bold text-[#172349] font-montserrat">{saludo}</div>
            <div className="text-sm text-[#6C7A89] font-montserrat">{cargo}</div>
          </div>
        </div>
        <div className="h-px bg-[#E5EAF6]" />


        {/* Filtro empresa, solo para psicóloga */}
        {!empresaFiltro && (
          <div className="flex gap-2 items-center mb-2">
          <label className="font-semibold mr-2">Filtrar por empresa:</label>
          <select
            value={empresaSeleccionada}
            onChange={(e) => setEmpresaSeleccionada(e.target.value)}
            className="rounded-xl border border-[#B2E2FF] p-2 text-[#265FF2] font-semibold"
          >
            <option value="todas">Todas</option>
            {empresasResultados.map((e, idx) => (
              <option key={idx} value={e}>{e}</option>
            ))}
          </select>
        </div>
      )}

      {/* Selector tipo de gráfico */}
      <div className="flex gap-2 items-center mb-4">
        <label className="font-semibold mr-2">Tipo de gráfico:</label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as "bar" | "histogram" | "pie")}
          className="rounded-xl border border-[#B2E2FF] p-2 text-[#265FF2] font-semibold"
        >
          <option value="bar">Barras</option>
          <option value="histogram">Histograma</option>
          <option value="pie">Pastel</option>
        </select>
      </div>

      {/* Tabs/Pestañas */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">

      <TabsList className="mt-8 mb-2 py-2 px-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">
        {!soloGenerales && (
          <TabsTrigger className={tabPill} value="admin">Eliminar encuestas</TabsTrigger>
        )}
        {!soloGenerales && (
          <TabsTrigger className={tabPill} value="empresas">Empresas</TabsTrigger>
        )}
      </TabsList>

      <TabsList className="mb-6 py-2 px-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">
        <TabsTrigger className={tabPill} value="general">General</TabsTrigger>
        <TabsTrigger className={tabPill} value="formaA">Forma A (Intralaboral)</TabsTrigger>
        <TabsTrigger className={tabPill} value="formaB">Forma B (Intralaboral)</TabsTrigger>
        <TabsTrigger className={tabPill} value="extralaboral">Extralaboral</TabsTrigger>
        <TabsTrigger className={tabPill} value="estres">Estrés</TabsTrigger>
        {rol === "psicologa" && (
          <>
            <TabsTrigger className={tabPill} value="informeCompleto">
              Informe completo
            </TabsTrigger>
            <TabsTrigger className={tabPill} value="informe">
              Informe
            </TabsTrigger>
          </>
        )}
      </TabsList>

        {/* ---- GENERAL ---- */}
        <TabsContent value="general">
          <GeneralResultsTabs
            value={tabGeneral}
            onChange={setTabGeneral}
            tabClass={tabPill}
            chartType={chartType}
            datosA={datosA}
            datosB={datosB}
            datosExtra={datosExtra}
            datosEstres={datosEstres}
            resumenA={resumenA}
            resumenB={resumenB}
            resumenExtra={resumenExtra}
            resumenEstres={resumenEstres}
            categoriaFicha={categoriaFicha}
            onCategoriaChange={(v) => setCategoriaFicha(v)}
            categoriasFicha={categoriasFicha}
            fichaConteos={fichaConteosGlobal}
          />

        </TabsContent>

        {/* ---- FORMA A ---- */}
        <TabsContent value="formaA">
          <FormaTabs
            value={tabIntra}
            onChange={setTabIntra}
            datos={datosA}
            resumen={resumenA}
            promediosDominios={promediosDominiosA}
            promediosDimensiones={promediosDimensionesA}
            dominios={dominiosA}
            dimensiones={dimensionesA}
            chartType={chartType}
            tabClass={tabPill}
            soloGenerales={soloGenerales}
            tipo="formaA"
            keyResultado="resultadoFormaA"
          />
        </TabsContent>

        {/* ---- FORMA B ---- */}
        <TabsContent value="formaB">
          <FormaTabs
            value={tabIntra}
            onChange={setTabIntra}
            datos={datosB}
            resumen={resumenB}
            promediosDominios={promediosDominiosB}
            promediosDimensiones={promediosDimensionesB}
            dominios={dominiosB}
            dimensiones={dimensionesB}
            chartType={chartType}
            tabClass={tabPill}
            soloGenerales={soloGenerales}
            tipo="formaB"
            keyResultado="resultadoFormaB"
          />
        </TabsContent>

        {/* ---- EXTRALABORAL ---- */}
        <TabsContent value="extralaboral">
          <Tabs value={tabExtra} onValueChange={setTabExtra} className="w-full">

            <TabsList className="mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">

              <TabsTrigger className={tabPill} value="global">Global</TabsTrigger>
              <TabsTrigger className={tabPill} value="dimensiones">Por Dimensión</TabsTrigger>
            </TabsList>
            <TabsContent value="global">
              {datosExtra.length === 0
                ? <div className="text-[var(--gray-medium)] py-4">No hay resultados Extralaborales.</div>
                : (
                  <>
                    <GraficaBarraSimple resumen={resumenExtra} titulo="Niveles Extralaborales" chartType={chartType} />
                    {!soloGenerales && <TablaIndividual datos={datosExtra} tipo="extralaboral" />}
                  </>
                )
              }
            </TabsContent>
            <TabsContent value="dimensiones">
              {datosExtra.length === 0
                ? <div className="text-[var(--gray-medium)] py-4">No hay datos para dimensiones.</div>
                : (
                  <>
                    <GraficaBarra
                      resumen={promediosDimensionesExtra}
                      titulo="Promedio de Puntaje Transformado por Dimensión"
                      chartType={chartType}
                    />
                    {!soloGenerales && (
                      <TablaDimensiones
                        datos={datosExtra}
                        dimensiones={dimensionesExtra}
                        keyResultado="resultadoExtralaboral"
                      />
                    )}
                  </>
                )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ---- ESTRÉS ---- */}
        <TabsContent value="estres">
          {datosEstres.length === 0
            ? <div className="text-[var(--gray-medium)] py-4">No hay resultados de Estrés.</div>
            : (
              <>
                <GraficaBarraSimple resumen={resumenEstres} titulo="Niveles de Estrés" chartType={chartType} />
                {!soloGenerales && <TablaIndividual datos={datosEstres} tipo="estres" />}
              </>
            )
          }
        </TabsContent>
        {/* ---- INFORME COMPLETO ---- */}
        {rol === "psicologa" && (
          <TabsContent value="informeCompleto">
            {datosInforme.length === 0 ? (
              <div className="text-[var(--gray-medium)] py-4">
                No hay resultados para mostrar.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]">
                  <thead className="bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold">
                    <tr>
                      {allHeaders.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {datosInforme.map((fila, i) => (
                      <tr key={i} className="border-b">
                        {allHeaders.map((h) => (
                          <td key={h}>{fila[h] ?? ""}</td>
                        ))}
                      </tr>
                    ))}
                    <tr className="font-semibold bg-gray-100">
                      {allHeaders.map((h) => (
                        <td key={h}>{promedioInforme[h] ?? ""}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        )}
        {/* ---- INFORME ---- */}
        {rol === "psicologa" && (
          <TabsContent value="informe">
            <div className="max-w-4xl mx-auto">
              <section className="bg-white rounded-xl shadow p-6 space-y-6">
                <div className="text-center">
                  <button
                    onClick={onGenerarInformePDF}
                    className="px-4 py-2 rounded-md bg-black text-white"
                  >
                    Generar PDF
                  </button>
                  {rendering && (
                    <p className="text-xs text-gray-500 mt-2">{progress}</p>
                  )}
                </div>
                <InformeTabs
                  tabClass={tabPill}
                  introduccionData={introData}
                  narrativaSociodemo={narrativaSociodemo}
                  recomendacionesSociodemo={recomendacionesSociodemo}
                  payload={reportPayload}
                  liderazgoDominioData={liderazgoDominioData}
                  liderazgoData={liderazgoData}
                  relacionesData={relacionesData}
                  retroalimentacionData={retroalimentacionData}
                  colaboradoresData={colaboradoresData}
                  autonomiaData={autonomiaData}
                  claridadData={claridadData}
                  capacitacionData={capacitacionData}
                  participacionData={participacionData}
                  oportunidadesData={oportunidadesData}
                  controlDominioData={controlDominioData}
                  demandasDominioData={demandasDominioData}
                  demandasAmbientalesData={demandasAmbientalesData}
                  demandasEmocionalesData={demandasEmocionalesData}
                  demandasCuantitativasData={demandasCuantitativasData}
                  influenciaTrabajoData={influenciaTrabajoData}
                  exigenciasResponsabilidadData={exigenciasResponsabilidadData}
                  demandasCargaMentalData={demandasCargaMentalData}
                    demandasJornadaData={demandasJornadaData}
                    consistenciaRolData={consistenciaRolData}
                    recompensasDominioData={recompensasDominioData}
                    recompensasPertenenciaData={recompensasPertenenciaData}
                    reconocimientoCompensacionData={reconocimientoCompensacionData}
                    extralaboralData={extralaboralData}
                    tiempoFueraTrabajoData={tiempoFueraTrabajoData}
                    relacionesFamiliaresData={relacionesFamiliaresData}
                  />
            </section>
          </div>

          {rendering && (
            <div style={{ position: "absolute", left: "-99999px", top: 0, width: "794pt" }}>
              <ReportePDF
                ref={offscreenRef}
                empresa={{
                  nombre: reportPayload.empresa.nombre,
                  nit: reportPayload.empresa.nit,
                  logoUrl: reportPayload.empresa.logoUrl,
                }}
                fechaInformeISO={reportPayload.fechaInformeISO}
                global={reportPayload.global}
                tablas={{
                  sociodemo: <TablaIndividual datos={datosMostrados} tipo="formaA" />,
                  intralaboral: (
                    <div className="space-y-6">
                      <TablaDominios datos={datosA} dominios={dominiosA} keyResultado="resultadoFormaA" />
                      <TablaDimensiones datos={datosA} dimensiones={dimensionesA} keyResultado="resultadoFormaA" />
                    </div>
                  ),
                  extralaboral: (
                    <TablaDimensiones
                      datos={datosExtra}
                      dimensiones={dimensionesExtra}
                      keyResultado="resultadoExtralaboral"
                    />
                  ),
                }}
                graficos={{
                  formaA: (
                    <GraficaBarraSimple
                      resumen={resumenA}
                      titulo="Niveles de Forma A"
                      chartType={chartType}
                    />
                  ),
                  formaB: (
                    <GraficaBarraSimple
                      resumen={resumenB}
                      titulo="Niveles de Forma B"
                      chartType={chartType}
                    />
                  ),
                  extralaboral: (
                    <GraficaBarraCategorias
                      datos={resumenExtra.map((r) => ({ nombre: r.nombre, cantidad: r.cantidad })) as CategoriaConteo[]}
                      titulo="Niveles Extralaborales"
                      chartType={chartType}
                    />
                  ),
                }}
                recomendaciones={recomendaciones}
                conclusiones={conclusiones}
                options={reportOptions}
                narrativaSociodemo={narrativaSociodemo}
                recomendacionesSociodemo={recomendacionesSociodemo}
              />
            </div>
          )}
        </TabsContent>
        )}
        {!soloGenerales && (
          <TabsContent value="admin">
            {datos.length === 0 ? (
              <div className="text-[var(--gray-medium)] py-4">No hay encuestas almacenadas.</div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <label className="font-semibold mr-2">Empresa:</label>
                  <select
                    value={empresaEliminar}
                    onChange={(e) => setEmpresaEliminar(e.target.value)}
                    className="rounded-xl border border-[#B2E2FF] p-2 text-[#265FF2] font-semibold"
                  >
                    <option value="todas">Todas</option>
                    {empresasResultados.map((e, idx) => (
                      <option key={idx} value={e}>{e}</option>
                    ))}
                  </select>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700"
                    onClick={eliminarPorEmpresa}
                  >
                    Eliminar todo(s)
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]">
                    <thead className="bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold">
                      <tr>
                        <th></th>
                        <th>#</th>
                        <th>Empresa</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datosEliminar.map((d, i) => {
                        const idxOriginal = datos.indexOf(d);
                        return (
                          <tr key={idxOriginal} className="border-b">
                            <td className="px-2 py-1 text-center">
                              <input
                                type="checkbox"
                                checked={seleccionados.includes(idxOriginal)}
                                onChange={() => toggleSeleccion(idxOriginal)}
                              />
                            </td>
                            <td className="px-2 py-1">{i + 1}</td>
                            <td className="px-2 py-1">{d.ficha?.empresa}</td>
                            <td className="px-2 py-1">{d.ficha?.nombre}</td>
                            <td className="px-2 py-1">
                              {d.fecha ? new Date(d.fecha).toLocaleString() : ""}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700 mt-4 disabled:opacity-50"
                  disabled={seleccionados.length === 0}
                  onClick={eliminarSeleccionados}
                >
                  Eliminar seleccionados
                </button>
              </>
            )}
          </TabsContent>
        )}
        {!soloGenerales && (
          <TabsContent value="empresas">
            <AdminEmpresas
              credenciales={credenciales}
              onAgregar={
                onAgregarEmpresa || (async () => false)
              }
              onEliminar={
                onEliminarEmpresa || (async () => false)
              }
              onEditar={
                onEditarEmpresa || (async () => false)
              }
            />
          </TabsContent>
        )}
      </Tabs>

      {/* Botones de acciones */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-[#172349] font-bold rounded-2xl hover:bg-[#E5EAF6]"
          >
            <HomeIcon size={20} /> Volver al inicio
          </button>
        )}
        {rol === "psicologa" &&
          (tab === "informe" || tab === "informeCompleto") && (
            <div className="flex gap-2">
              <button
                onClick={handleExportar}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#265FF2] text-white font-bold rounded-2xl shadow-md hover:brightness-90"
              >
                <FileDown size={20} /> Descargar Excel
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#265FF2] text-white font-bold rounded-2xl shadow-md hover:brightness-90"
              >
                <FileText size={20} /> Descargar PDF
              </button>
            </div>
          )}
      </div>
      </div>
    </div>
    );
  }
