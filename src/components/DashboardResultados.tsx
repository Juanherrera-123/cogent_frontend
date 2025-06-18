import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import * as XLSX from "xlsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { gatherFlatResults } from "@/utils/gatherResults";
import { exportElementToPDF } from "@/utils/pdfExport";
import { dimensionesExtralaboral } from "@/data/esquemaExtralaboral";
import { baremosFormaA } from "@/data/baremosFormaA";
import { baremosFormaB } from "@/data/baremosFormaB";

// Colores por nivel de riesgo
const colorPorNivel = {
  "Riesgo muy bajo": "#538DD4",
  "Riesgo bajo": "#91CF50",
  "Riesgo medio": "#FFFF00",
  "Riesgo alto": "#FFA400",
  "Riesgo muy alto": "#FF0000",
} as const;
// Array de colores para los gráficos simples
const colores = Object.values(colorPorNivel);
const nivelesRiesgo = Object.keys(colorPorNivel);

type Props = {
  soloGenerales?: boolean;
  empresaFiltro?: string;
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
  { key: "sexo", label: "Sexo biológico" },
  { key: "estadoCivil", label: "Estado civil" },
  { key: "estudios", label: "Nivel de estudio" },
  { key: "estrato", label: "Estrato" },
  { key: "vivienda", label: "Vivienda" },
  { key: "tipoCargo", label: "Tipo de cargo" },
  { key: "tipoContrato", label: "Tipo de contrato" },
  { key: "tipoSalario", label: "Tipo de salario" },
  { key: "horasDiarias", label: "Horas diarias establecidas" },
] as const;

const coloresAzulFicha = [
  "#1e3a8a",
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
];

export default function DashboardResultados({ soloGenerales, empresaFiltro, onBack }: Props) {
  const [datos, setDatos] = useState<any[]>([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresaFiltro || "todas");
  const [tab, setTab] = useState("general");
  const [tabGeneral, setTabGeneral] = useState("resumen");
  const [categoriaFicha, setCategoriaFicha] = useState(categoriasFicha[0].key);
  const [tabIntra, setTabIntra] = useState("global"); // Para sub-tabs de formaA/B

  const [tabExtra, setTabExtra] = useState("global");
  const [tabGlobalExtra, setTabGlobalExtra] = useState("A"); // Para sub-tabs global extra


  const [chartType, setChartType] = useState<"bar" | "histogram" | "pie">("bar");
  
  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("resultadosCogent") || "[]");
    setDatos(arr);
  }, []);

  // Empresas únicas (para filtro manual, psicóloga)
  const empresas = Array.from(new Set(datos.map((d) => d.ficha?.empresa || "Sin empresa")));

  // Aplica el filtro según el rol
  const datosMostrados = datos.filter(
    (d) =>
      (empresaSeleccionada === "todas" || d.ficha?.empresa === empresaSeleccionada)
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
    tipo: "dimensiones" | "dominios"
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
      const nivel = nivelPromedio(nombre, promedioRedondeado, origen, subkey);
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

    const filas = datosExportar.map((d, i) => ({
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
        "Puntaje Extralaboral": d.resultadoExtralaboral?.puntajeTransformadoTotal ?? "",
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
    const ws = XLSX.utils.json_to_sheet(filas);
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    XLSX.writeFile(wb, "resultados.xlsx");
  };

  // ---- Exportar a PDF ----
  const handleExportPDF = async () => {
    const filas = gatherFlatResults();
    if (filas.length === 0) return;
    const headers = Object.keys(filas[0]);
    const table = document.createElement("table");
    table.style.visibility = "hidden";
    const thead = table.createTHead();
    const headRow = thead.insertRow();
    headers.forEach((h) => {
      const th = document.createElement("th");
      th.textContent = h;
      headRow.appendChild(th);
    });
    const tbody = table.createTBody();
    filas.forEach((fila) => {
      const tr = tbody.insertRow();
      headers.forEach((h) => {
        const td = tr.insertCell();
        td.textContent = fila[h] ?? "";
      });
    });
    document.body.appendChild(table);
    await exportElementToPDF(table, "resultados.pdf");
    table.remove();
  };

  // ---- Render tablas individuales (solo para psicóloga) ----
  function TablaIndividual({ datos, tipo }: { datos: any[], tipo: string }) {
    if (datos.length === 0) return <div className="py-6 text-gray-400">No hay resultados individuales para mostrar.</div>;
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-xs border mt-2">
          <thead className="bg-cogent-blue text-white">
            <tr>
              <th>#</th>
              <th>Empresa</th>
              <th>Nombre</th>
              <th>Sexo</th>
              <th>Cargo</th>
              {tipo === "formaA" && (<><th>Puntaje Forma A</th><th>Nivel Forma A</th></>)}
              {tipo === "formaB" && (<><th>Puntaje Forma B</th><th>Nivel Forma B</th></>)}
              {tipo === "extralaboral" && (<><th>Puntaje Extralaboral</th><th>Nivel Extra</th></>)}
              {tipo === "globalExtra" && (<><th>Puntaje Global A+Extra</th><th>Nivel Global</th></>)}
              {tipo === "estres" && (<><th>Puntaje Estrés</th><th>Nivel Estrés</th></>)}
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((d, i) => (
              <tr key={i} className="border-b">
                <td>{i + 1}</td>
                <td>{d.ficha?.empresa}</td>
                <td>{d.ficha?.nombre}</td>
                <td>{d.ficha?.sexo}</td>
                <td>{d.ficha?.cargo}</td>
                {tipo === "formaA" && (
                  <>
                    <td>{d.resultadoFormaA?.total?.transformado ?? ""}</td>
                    <td>{d.resultadoFormaA?.total?.nivel ?? ""}</td>
                  </>
                )}
                {tipo === "formaB" && (
                  <>
                    <td>
                      {d.resultadoFormaB?.total?.transformado ??
                        d.resultadoFormaB?.puntajeTransformadoTotal ??
                        d.resultadoFormaB?.puntajeTransformado ??
                        d.resultadoFormaB?.puntajeTotalTransformado ??
                        ""}
                    </td>
                    <td>
                      {d.resultadoFormaB?.total?.nivel ??
                        d.resultadoFormaB?.nivelTotal ??
                        d.resultadoFormaB?.nivel ??
                        ""}
                    </td>
                  </>
                )}
                {tipo === "extralaboral" && (
                  <>
                    <td>{d.resultadoExtralaboral?.puntajeTransformadoTotal ?? ""}</td>
                    <td>{d.resultadoExtralaboral?.nivelGlobal ?? ""}</td>
                  </>
                )}
                {tipo === "globalExtra" && (
                  <>
                    <td>
                      {d.resultadoGlobalAExtralaboral?.puntajeGlobal ??
                        d.resultadoGlobalBExtralaboral?.puntajeGlobal ?? ""}
                    </td>
                    <td>
                      {d.resultadoGlobalAExtralaboral?.nivelGlobal ??
                        d.resultadoGlobalBExtralaboral?.nivelGlobal ?? ""}
                    </td>
                  </>
                )}
                {tipo === "estres" && (
                  <>
                    <td>{d.resultadoEstres?.puntajeTransformado ?? ""}</td>
                    <td>{d.resultadoEstres?.nivel ?? ""}</td>
                  </>
                )}
                <td>{d.fecha ? new Date(d.fecha).toLocaleString() : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function TablaDimensiones({ datos, dimensiones, keyResultado }: { datos: any[]; dimensiones: string[]; keyResultado: string }) {
    if (datos.length === 0)
      return <div className="py-6 text-gray-400">No hay resultados de dimensiones para mostrar.</div>;

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-xs border mt-2">
          <thead className="bg-cogent-blue text-white">
            <tr>
              <th>#</th>
              <th>Empresa</th>
              <th>Nombre</th>
              {dimensiones.map((dim, idx) => (
                <th key={idx}>{dim}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((d, i) => (
              <tr key={i} className="border-b">
                <td>{i + 1}</td>
                <td>{d.ficha?.empresa}</td>
                <td>{d.ficha?.nombre}</td>
                {dimensiones.map((dim, idx) => {
                  let seccion = d[keyResultado]?.dimensiones?.[dim];
                  if (Array.isArray(d[keyResultado]?.dimensiones)) {
                    const item = d[keyResultado].dimensiones.find((x: any) => x.nombre === dim);
                    seccion = item;
                  }
                  const valor = typeof seccion === "object"
                    ? seccion.transformado ?? seccion.puntajeTransformado
                    : d[keyResultado]?.puntajesDimension?.[dim];
                  return <td key={idx}>{valor ?? ""}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function TablaDominios({ datos, dominios, keyResultado }: { datos: any[]; dominios: string[]; keyResultado: string }) {
    if (datos.length === 0)
      return <div className="py-6 text-gray-400">No hay resultados de dominios para mostrar.</div>;

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-xs border mt-2">
          <thead className="bg-cogent-blue text-white">
            <tr>
              <th>#</th>
              <th>Empresa</th>
              <th>Nombre</th>
              {dominios.map((dom, idx) => (
                <th key={idx}>{dom}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((d, i) => (
              <tr key={i} className="border-b">
                <td>{i + 1}</td>
                <td>{d.ficha?.empresa}</td>
                <td>{d.ficha?.nombre}</td>
                {dominios.map((dom, idx) => {
                  let seccion = d[keyResultado]?.dominios?.[dom];
                  if (Array.isArray(d[keyResultado]?.dominios)) {
                    const item = d[keyResultado].dominios.find((x: any) => x.nombre === dom);
                    seccion = item;
                  }
                  const valor = typeof seccion === "object"
                    ? seccion.transformado ?? seccion.puntajeTransformado
                    : d[keyResultado]?.puntajesDominio?.[dom];
                  return <td key={idx}>{valor ?? ""}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ---- Render gráficos ----
  function GraficaBarra({
    resumen,
    titulo,
    chartType,
  }: {
    resumen: any[];
    titulo: string;
    chartType: "bar" | "histogram" | "pie";
  }) {
    return (

      <div className="flex-1 min-h-[450px]">
        <h4 className="font-bold mb-2 text-cogent-blue">{titulo}</h4>
        <ResponsiveContainer width="100%" height={450}>

          {chartType === "pie" ? (
            <PieChart>
              <Pie data={resumen} dataKey="indice" nameKey="nombre" label>
                {resumen.map((d, i) => (
                  <Cell key={i} fill={colorPorNivel[d.nivel as keyof typeof colorPorNivel]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <BarChart data={resumen} barCategoryGap={chartType === "histogram" ? 0 : undefined}>
              <XAxis dataKey="nombre" interval={0} angle={-18} textAnchor="end" height={70} />
              <YAxis
                type="number"
                domain={[0, 4]}
                ticks={[0, 1, 2, 3, 4]}
                tickFormatter={(v) => nivelesRiesgo[v]}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="indice" name="Nivel">
                <LabelList dataKey="nivel" position="top" />
                {resumen.map((d, i) => (
                  <Cell key={i} fill={colorPorNivel[d.nivel as keyof typeof colorPorNivel]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  }

  function GraficaBarraSimple({
    resumen,
    titulo,
    chartType,
  }: {
    resumen: any[];
    titulo: string;
    chartType: "bar" | "histogram" | "pie";
  }) {
    return (

      <div className="flex-1 min-h-[450px]">
        <h4 className="font-bold mb-2 text-cogent-blue">{titulo}</h4>
        <ResponsiveContainer width="100%" height={450}>

          {chartType === "pie" ? (
            <PieChart>
              <Pie data={resumen} dataKey="cantidad" nameKey="nivel" label>
                {resumen.map((_, i) => (
                  <Cell key={i} fill={colores[i % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <BarChart data={resumen} barCategoryGap={chartType === "histogram" ? 0 : undefined}>
              <XAxis dataKey="nivel" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" name="Cantidad">
                {resumen.map((_, i) => (
                  <Cell key={i} fill={colores[i % colores.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  }

  function GraficaBarraCategorias({
    datos,
    titulo,
    chartType,
  }: {
    datos: any[];
    titulo: string;
    chartType: "bar" | "histogram" | "pie";
  }) {
    return (
      <div className="flex-1 min-h-[450px]">
        <h4 className="font-bold mb-2 text-cogent-blue">{titulo}</h4>
        <ResponsiveContainer width="100%" height={450}>
          {chartType === "pie" ? (
            <PieChart>
              <Pie data={datos} dataKey="cantidad" nameKey="nombre" label>
                {datos.map((_, i) => (
                  <Cell key={i} fill={coloresAzulFicha[i % coloresAzulFicha.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <BarChart data={datos} barCategoryGap={chartType === "histogram" ? 0 : undefined}>
              <XAxis dataKey="nombre" interval={0} angle={-18} textAnchor="end" height={70} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" name="Cantidad">
                {datos.map((_, i) => (
                  <Cell key={i} fill={coloresAzulFicha[i % coloresAzulFicha.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  }

  // ---- Pestañas ----
  return (
    <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl mt-8 flex flex-col gap-8">
        <h2 className="text-2xl md:text-3xl font-bold text-cogent-blue mb-2 md:mb-4">Dashboard de Resultados</h2>

        {/* Filtro empresa, solo para psicóloga */}
        {!empresaFiltro && (
          <div className="flex gap-2 items-center mb-2">
          <label className="font-semibold mr-2">Filtrar por empresa:</label>
          <select
            value={empresaSeleccionada}
            onChange={(e) => setEmpresaSeleccionada(e.target.value)}
            className="input"
          >
            <option value="todas">Todas</option>
            {empresas.map((e, idx) => (
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
          className="input"
        >
          <option value="bar">Barras</option>
          <option value="histogram">Histograma</option>
          <option value="pie">Pastel</option>
        </select>
      </div>

      {/* Tabs/Pestañas */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-6 w-full flex flex-wrap gap-2">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="formaA">Forma A (Intralaboral)</TabsTrigger>
          <TabsTrigger value="formaB">Forma B (Intralaboral)</TabsTrigger>
          <TabsTrigger value="extralaboral">Extralaboral</TabsTrigger>
          <TabsTrigger value="globalExtra">Global Extra</TabsTrigger>
          <TabsTrigger value="estres">Estrés</TabsTrigger>
        </TabsList>

        {/* ---- GENERAL ---- */}
        <TabsContent value="general">
          <Tabs value={tabGeneral} onValueChange={setTabGeneral} className="w-full">
            <TabsList className="mb-4 w-full flex gap-2">
              <TabsTrigger value="resumen">Resultados</TabsTrigger>
              <TabsTrigger value="ficha">Ficha técnica</TabsTrigger>
            </TabsList>
            <TabsContent value="resumen">
              <div className="grid md:grid-cols-2 gap-4">
                {datosA.length > 0 && (
                  <GraficaBarraSimple resumen={resumenA} titulo="Niveles de Forma A" chartType={chartType} />
                )}
                {datosB.length > 0 && (
                  <GraficaBarraSimple resumen={resumenB} titulo="Niveles de Forma B" chartType={chartType} />
                )}
                {datosExtra.length > 0 && (
                  <GraficaBarraSimple resumen={resumenExtra} titulo="Niveles Extralaborales" chartType={chartType} />
                )}
                {datosEstres.length > 0 && (
                  <GraficaBarraSimple resumen={resumenEstres} titulo="Niveles de Estrés" chartType={chartType} />
                )}
              </div>
            </TabsContent>
            <TabsContent value="ficha">
              <Tabs value={categoriaFicha} onValueChange={setCategoriaFicha} className="w-full">
                <TabsList className="mb-4 w-full flex gap-2 overflow-x-auto">
                  {categoriasFicha.map((c) => (
                    <TabsTrigger key={c.key} value={c.key}>{c.label}</TabsTrigger>
                  ))}
                </TabsList>
                {categoriasFicha.map((c) => (
                  <TabsContent key={c.key} value={c.key}>
                    <div className="grid gap-4">
                      <GraficaBarraCategorias datos={fichaConteosGlobal[c.key]} titulo={c.label} chartType={chartType} />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ---- FORMA A ---- */}
        <TabsContent value="formaA">
          <Tabs value={tabIntra} onValueChange={setTabIntra} className="w-full">
            <TabsList className="mb-4 w-full flex gap-2">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="dominios">Por Dominio</TabsTrigger>
              <TabsTrigger value="dimensiones">Por Dimensión</TabsTrigger>
            </TabsList>
            <TabsContent value="global">
              {datosA.length === 0
                ? <div className="text-gray-500 py-4">No hay resultados de Forma A.</div>
                : (
                  <>
                    <GraficaBarraSimple resumen={resumenA} titulo="Niveles de Forma A" chartType={chartType} />
                    {!soloGenerales && <TablaIndividual datos={datosA} tipo="formaA" />}
                  </>
                )
              }
            </TabsContent>
            <TabsContent value="dominios">
              {datosA.length === 0
                ? <div className="text-gray-500 py-4">No hay datos para dominios.</div>
                : (
                  <>
                    <GraficaBarra
                      resumen={promediosDominiosA}
                      titulo="Promedio de Puntaje Transformado por Dominio"
                      chartType={chartType}
                    />
                    {!soloGenerales && (
                      <TablaDominios
                        datos={datosA}
                        dominios={dominiosA}
                        keyResultado="resultadoFormaA"
                      />
                    )}
                  </>
                )
              }
            </TabsContent>
            <TabsContent value="dimensiones">
              {datosA.length === 0
                ? <div className="text-gray-500 py-4">No hay datos para dimensiones.</div>
                : (
                  <>
                    <GraficaBarra
                      resumen={promediosDimensionesA}
                      titulo="Promedio de Puntaje Transformado por Dimensión"
                      chartType={chartType}
                    />
                    {!soloGenerales && (
                      <TablaDimensiones
                        datos={datosA}
                        dimensiones={dimensionesA}
                        keyResultado="resultadoFormaA"
                      />
                    )}
                  </>
                )
              }
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ---- FORMA B ---- */}
        <TabsContent value="formaB">
          <Tabs value={tabIntra} onValueChange={setTabIntra} className="w-full">
            <TabsList className="mb-4 w-full flex gap-2">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="dominios">Por Dominio</TabsTrigger>
              <TabsTrigger value="dimensiones">Por Dimensión</TabsTrigger>
            </TabsList>
            <TabsContent value="global">
              {datosB.length === 0
                ? <div className="text-gray-500 py-4">No hay resultados de Forma B.</div>
                : (
                  <>
                    <GraficaBarraSimple resumen={resumenB} titulo="Niveles de Forma B" chartType={chartType} />
                    {!soloGenerales && <TablaIndividual datos={datosB} tipo="formaB" />}
                  </>
                )
              }
            </TabsContent>
            <TabsContent value="dominios">
              {datosB.length === 0
                ? <div className="text-gray-500 py-4">No hay datos para dominios.</div>
                : (
                  <>
                    <GraficaBarra
                      resumen={promediosDominiosB}
                      titulo="Promedio de Puntaje Transformado por Dominio"
                      chartType={chartType}
                    />
                    {!soloGenerales && (
                      <TablaDominios
                        datos={datosB}
                        dominios={dominiosB}
                        keyResultado="resultadoFormaB"
                      />
                    )}
                  </>
                )
              }
            </TabsContent>
            <TabsContent value="dimensiones">
              {datosB.length === 0
                ? <div className="text-gray-500 py-4">No hay datos para dimensiones.</div>
                : (
                  <>
                    <GraficaBarra
                      resumen={promediosDimensionesB}
                      titulo="Promedio de Puntaje Transformado por Dimensión"
                      chartType={chartType}
                    />
                    {!soloGenerales && (
                      <TablaDimensiones
                        datos={datosB}
                        dimensiones={dimensionesB}
                        keyResultado="resultadoFormaB"
                      />
                    )}
                  </>
                )
              }
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ---- EXTRALABORAL ---- */}
        <TabsContent value="extralaboral">
          <Tabs value={tabExtra} onValueChange={setTabExtra} className="w-full">
            <TabsList className="mb-4 w-full flex gap-2">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="dimensiones">Por Dimensión</TabsTrigger>
            </TabsList>
            <TabsContent value="global">
              {datosExtra.length === 0
                ? <div className="text-gray-500 py-4">No hay resultados Extralaborales.</div>
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
                ? <div className="text-gray-500 py-4">No hay datos para dimensiones.</div>
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
            <TabsList className="mb-4 w-full flex gap-2">
              <TabsTrigger value="A">Forma A</TabsTrigger>
              <TabsTrigger value="B">Forma B</TabsTrigger>
            </TabsList>
            <TabsContent value="A">
              {datosGlobalAE.length === 0 ? (
                <div className="text-gray-500 py-4">No hay resultados Globales A.</div>
              ) : (
                <>
                  <GraficaBarraSimple resumen={resumenGlobalAE} titulo="Niveles Global A + Extra" />
                  {!soloGenerales && <TablaIndividual datos={datosGlobalAE} tipo="globalExtra" />}
                </>
              )}
            </TabsContent>
            <TabsContent value="B">
              {datosGlobalBE.length === 0 ? (
                <div className="text-gray-500 py-4">No hay resultados Globales B.</div>
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
            ? <div className="text-gray-500 py-4">No hay resultados de Estrés.</div>
            : (
              <>
                <GraficaBarraSimple resumen={resumenEstres} titulo="Niveles de Estrés" chartType={chartType} />
                {!soloGenerales && <TablaIndividual datos={datosEstres} tipo="estres" />}
              </>
            )
          }
        </TabsContent>
      </Tabs>

      {/* Botones de acciones */}
      <div className="flex justify-between items-center">
        {onBack && (
          <button
            onClick={onBack}
            className="bg-gray-300 text-cogent-navy px-4 py-2 rounded-lg font-bold shadow hover:bg-gray-400"
          >
            Volver al inicio
          </button>
        )}
      {/* Botones para exportar */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleExportar}
          className="bg-cogent-blue text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-cogent-sky"
        >
          Descargar Excel
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-cogent-blue text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-cogent-sky"
        >
          Descargar PDF
        </button>
      </div>
      </div>
      </div>
    );
  }
