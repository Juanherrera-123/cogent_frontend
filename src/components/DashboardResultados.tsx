import React, { useState, useEffect, useMemo, useRef } from "react";

import * as XLSX from "xlsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { gatherFlatResults } from "@/utils/gatherResults";
import { exportElementToPDF } from "@/utils/pdfExport";
import { dimensionesExtralaboral } from "@/data/esquemaExtralaboral";
import { baremosFormaA } from "@/data/baremosFormaA";
import { baremosFormaB } from "@/data/baremosFormaB";
import TablaIndividual from "@/components/TablaIndividual";
import TablaDominios from "@/components/TablaDominios";
import TablaDimensiones from "@/components/TablaDimensiones";
import GraficaBarra from "@/components/GraficaBarra";
import GraficaBarraSimple from "@/components/GraficaBarraSimple";
import AdminEmpresas from "@/components/AdminEmpresas";
import { CredencialEmpresa } from "@/types";
import GeneralResultsTabs from "@/components/dashboard/GeneralResultsTabs";
import FormaTabs from "@/components/dashboard/FormaTabs";
import LogoCogent from "/logo_forma.png";
import { FileDown, FileText, Home as HomeIcon } from "lucide-react";

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
  empresas?: string[];
  credenciales?: CredencialEmpresa[];
  onAgregarEmpresa?: (nombre: string, usuario: string, password: string) => void;
  onEliminarEmpresa?: (usuario: string) => void;
  onEditarEmpresa?: (
    originalUsuario: string,
    nombre: string,
    usuario: string,
    password: string
  ) => void;
  onBack?: () => void;
};

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

const nivelesEstres = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"];
const nivelesExtra = nivelesRiesgo;
const nivelesForma = nivelesRiesgo;

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
  empresas: empresasConfig = [],
  credenciales = [],
  onAgregarEmpresa,
  onEliminarEmpresa,
  onEditarEmpresa,
  onBack
}: Props) {
  const [datos, setDatos] = useState<any[]>([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresaFiltro || "todas");
  const [empresaEliminar, setEmpresaEliminar] = useState("todas");
  const [tab, setTab] = useState("general");
  const [tabGeneral, setTabGeneral] = useState("resumen");
  const [categoriaFicha, setCategoriaFicha] = useState(categoriasFicha[0].key);
  const [tabIntra, setTabIntra] = useState("global"); // Para sub-tabs de formaA/B

  const [tabExtra, setTabExtra] = useState("global");
  const [tabGlobalExtra, setTabGlobalExtra] = useState("A"); // Para sub-tabs global extra


  const [chartType, setChartType] = useState<"bar" | "histogram" | "pie">("bar");
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const saludo = rol === "psicologa" ? "Hola Lilian Navas" : empresaNombre || "";
  const cargo = rol === "psicologa" ? "Psicologist" : "Empresa";

  const tabPill =
    "px-5 py-2 rounded-full font-semibold border border-[#B2E2FF] text-[#172349] shrink-0 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#38BDF8] data-[state=active]:to-[#265FF2]";
  
  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("resultadosCogent") || "[]");
    setDatos(arr);
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
  const datosGlobalAE = datosMostrados.filter((d) => d.resultadoGlobalAExtralaboral);
  const datosGlobalBE = datosMostrados.filter((d) => d.resultadoGlobalBExtralaboral);

  // ---- Resúmenes para gráficos ----
  const resumenNivel = (datos: any[], key: string, niveles: string[]) =>
    niveles.map((nivel) => ({
      nivel,
      cantidad: datos.filter((d) => {
        const r = d[key];
        const nivelRes =
          r?.total?.nivel ?? r?.nivelTotal ?? r?.nivelGlobal ?? r?.nivel;
        return nivelRes === nivel || (nivelRes === "Sin riesgo" && nivel === "Riesgo muy bajo");
      }).length,
    }));

  const resumenA = resumenNivel(datosA, "resultadoFormaA", nivelesForma);
  const resumenB = resumenNivel(datosB, "resultadoFormaB", nivelesForma);
  const resumenExtra = resumenNivel(datosExtra, "resultadoExtralaboral", nivelesExtra);
  const resumenEstres = resumenNivel(datosEstres, "resultadoEstres", nivelesEstres);
  const resumenGlobalAE = resumenNivel(datosGlobalAE, "resultadoGlobalAExtralaboral", nivelesForma);
  const resumenGlobalBE = resumenNivel(datosGlobalBE, "resultadoGlobalBExtralaboral", nivelesForma);

  // ---- Promedios por dominio/dimensión ----

  function nivelPromedio(
    nombre: string,
    valor: number,
    origen: "formaA" | "formaB" | "extra",
    tipo: "dimensiones" | "dominios",
    datos?: any[]
  ) {
    let baremo: { nivel: string; min: number; max: number }[] = [];
    if (origen === "formaA") {
      if (tipo === "dimensiones") {
        baremo = (baremosFormaA.dimensiones as any)[nombre] || [];
      } else {
        baremo = (baremosFormaA.dominios as any)[nombre] || [];
      }
    } else if (origen === "formaB") {
      if (tipo === "dimensiones") {
        baremo = (baremosFormaB.dimension as any)[nombre] || [];
      } else {
        baremo = (baremosFormaB.dominio as any)[nombre] || [];
      }
    } else if (origen === "extra") {
      if (datos && datos.length) {
        const dim = dimensionesExtralaboral.find((d) => d.nombre === nombre);
        if (dim) {
          const indices = datos
            .map((d) => {
              const form = d.tipo;
              let seccion = d.resultadoExtralaboral?.dimensiones?.[nombre];
              if (Array.isArray(d.resultadoExtralaboral?.dimensiones)) {
                seccion = d.resultadoExtralaboral.dimensiones.find((x: any) => x.nombre === nombre);
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
    datos: any[],
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
          let seccion = d[key]?.[subkey]?.[nombre];
          if (Array.isArray(d[key]?.[subkey])) {
            const item = d[key][subkey].find((x: any) => x.nombre === nombre);
            seccion = item;
          }
          if (typeof seccion === "object") {
            return seccion.transformado ?? seccion.puntajeTransformado;
          }
          // Compatibilidad con estructura de Forma B (puntajesDimension/puntajesDominio)
          if (subkey === "dimensiones") {
            return d[key]?.puntajesDimension?.[nombre];
          }
          if (subkey === "dominios") {
            return d[key]?.puntajesDominio?.[nombre];
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



  function conteosPorFicha(datos: any[], keyFicha: string) {
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
    const grupos = Array.from(new Set(datos.map((d) => d.ficha?.[keyFicha] ?? "Sin dato")));
    return grupos.map((valor) => ({
      nombre: valor,
      cantidad: datos.filter((d) => (d.ficha?.[keyFicha] ?? "Sin dato") === valor).length,
    }));
  }

  const fichaConteosA: Record<string, any[]> = {};
  const fichaConteosB: Record<string, any[]> = {};
  const fichaConteosExtra: Record<string, any[]> = {};
  const fichaConteosEstres: Record<string, any[]> = {};
  const fichaConteosGlobal: Record<string, any[]> = {};

  categoriasFicha.forEach((cat) => {
    fichaConteosA[cat.key] = conteosPorFicha(datosA, cat.key);
    fichaConteosB[cat.key] = conteosPorFicha(datosB, cat.key);
    fichaConteosExtra[cat.key] = conteosPorFicha(datosExtra, cat.key);
    fichaConteosEstres[cat.key] = conteosPorFicha(datosEstres, cat.key);
    fichaConteosGlobal[cat.key] = conteosPorFicha(datosMostrados, cat.key);
  });

  const datosInforme = useMemo(() => {
    const todos = gatherFlatResults();
    return todos.filter(
      (f) => empresaSeleccionada === "todas" || f.Empresa === empresaSeleccionada
    );
  }, [empresaSeleccionada, datos]);

  const allHeaders = useMemo(
    () =>
      Array.from(
        new Set(datosInforme.flatMap((fila) => Object.keys(fila)))
      ),
    [datosInforme]
  );

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

    const row: Record<string, any> = {};
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


  // ---- Exportar a Excel ----
  const handleExportar = () => {
    let datosExportar: any[] = [];
    if (tab === "general") datosExportar = datosMostrados;
    else if (tab === "formaA") datosExportar = datosA;
    else if (tab === "formaB") datosExportar = datosB;
    else if (tab === "extralaboral") datosExportar = datosExtra;
    else if (tab === "globalExtra") datosExportar =
      tabGlobalExtra === "A" ? datosGlobalAE : datosGlobalBE;
    else if (tab === "estres") datosExportar = datosEstres;
    else if (tab === "informe") datosExportar = datosInforme;

    const filas =
      tab === "informe"
        ? datosInforme
        : datosExportar.map((d, i) => ({
            Nro: i + 1,
            Empresa: d.ficha?.empresa || "",
            Nombre: d.ficha?.nombre || "",
            Sexo: d.ficha?.sexo || "",
            Cargo: d.ficha?.cargo || "",
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
            ...(tab === "globalExtra" && {
              "Puntaje Global A+Extra":
                d.resultadoGlobalAExtralaboral?.puntajeGlobal ??
                d.resultadoGlobalBExtralaboral?.puntajeGlobal ??
                "",
              "Nivel Global":
                d.resultadoGlobalAExtralaboral?.nivelGlobal ??
                d.resultadoGlobalBExtralaboral?.nivelGlobal ??
                "",
            }),
            ...(tab === "estres" && {
              "Puntaje Estrés": d.resultadoEstres?.puntajeTransformado ?? "",
              "Nivel Estrés": d.resultadoEstres?.nivel ?? "",
            }),
            Fecha: d.fecha ? new Date(d.fecha).toLocaleString() : "",
          }));

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

  const eliminarSeleccionados = () => {
    if (seleccionados.length === 0) return;
    const restantes = datos.filter((_, i) => !seleccionados.includes(i));
    setDatos(restantes);
    localStorage.setItem("resultadosCogent", JSON.stringify(restantes));
    setSeleccionados([]);
  };

  const eliminarPorEmpresa = () => {
    const restantes =
      empresaEliminar === "todas"
        ? []
        : datos.filter((d) => d.ficha?.empresa !== empresaEliminar);
    setDatos(restantes);
    localStorage.setItem("resultadosCogent", JSON.stringify(restantes));
    setSeleccionados([]);
  };

  // ---- Render tablas individuales (solo para psicóloga) ----
  // ---- Pestañas ----
  return (

    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFF] to-[#EAF3FF] flex flex-col items-center py-10">
      <div
        ref={containerRef}
        className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-8 md:p-10 flex flex-col gap-8"
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

        {rol === "psicologa" && (
          <TabsTrigger className={tabPill} value="informe">Informe completo</TabsTrigger>
        )}
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
        <TabsTrigger className={tabPill} value="globalExtra">Global Extra</TabsTrigger>
        <TabsTrigger className={tabPill} value="estres">Estrés</TabsTrigger>
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
            onCategoriaChange={setCategoriaFicha}
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

        {/* ---- GLOBAL EXTRA ---- */}
        <TabsContent value="globalExtra">
          <Tabs
            value={tabGlobalExtra}
            onValueChange={setTabGlobalExtra}
            className="w-full"
          >
            <TabsList className="mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap">

              <TabsTrigger className={tabPill} value="A">Forma A</TabsTrigger>
              <TabsTrigger className={tabPill} value="B">Forma B</TabsTrigger>
            </TabsList>
            <TabsContent value="A">
              {datosGlobalAE.length === 0 ? (
                <div className="text-[var(--gray-medium)] py-4">No hay resultados Globales A.</div>
              ) : (
                <>
                  <GraficaBarraSimple resumen={resumenGlobalAE} titulo="Niveles Global A + Extra" />
                  {!soloGenerales && <TablaIndividual datos={datosGlobalAE} tipo="globalExtra" />}
                </>
              )}
            </TabsContent>
            <TabsContent value="B">
              {datosGlobalBE.length === 0 ? (
                <div className="text-[var(--gray-medium)] py-4">No hay resultados Globales B.</div>
              ) : (
                <>
                  <GraficaBarraSimple resumen={resumenGlobalBE} titulo="Niveles Global B + Extra" />
                  {!soloGenerales && <TablaIndividual datos={datosGlobalBE} tipo="globalExtra" />}
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
          <TabsContent value="informe">
            {datosInforme.length === 0 ? (
              <div className="text-[var(--gray-medium)] py-4">No hay datos para mostrar.</div>
            ) : (
              <div className="overflow-auto max-h-96">
                <table className="w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]">
                  <thead className="bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold">
                    <tr>
                      {allHeaders.map((h, idx) => (
                        <th key={idx} className="px-2 py-1">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {datosInforme.map((fila, i) => (
                      <tr key={i} className="border-b">
                        {allHeaders.map((h, idx) => (
                          <td key={idx} className="px-2 py-1">
                            {fila[h] ?? ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="font-semibold bg-gray-100">
                      {allHeaders.map((h, idx) => (
                        <td key={idx} className="px-2 py-1">
                          {promedioInforme[h] ?? ""}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
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
              empresas={empresasConfig}
              credenciales={credenciales}
              onAgregar={onAgregarEmpresa || (() => {})}
              onEliminar={onEliminarEmpresa || (() => {})}
              onEditar={onEditarEmpresa || (() => {})}
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
        {tab === "informe" && (
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
