import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import * as XLSX from "xlsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Personaliza tus colores de barras
const colores = ["#2a57d3", "#1db2f5", "#ffbc1c", "#f2600e", "#d7263d", "#9b59b6", "#45a049", "#0e668b", "#e67e22"];

type Props = {
  soloGenerales?: boolean;
  empresaFiltro?: string;
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

const nivelesEstres = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"];
const nivelesExtra = ["Sin riesgo", "Riesgo bajo", "Riesgo medio", "Riesgo alto", "Riesgo muy alto"];
const nivelesForma = ["Sin riesgo", "Riesgo bajo", "Riesgo medio", "Riesgo alto", "Riesgo muy alto"];

export default function DashboardResultados({ soloGenerales, empresaFiltro }: Props) {
  const [datos, setDatos] = useState<any[]>([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresaFiltro || "todas");
  const [tab, setTab] = useState("formaA");
  const [tabIntra, setTabIntra] = useState("global"); // Para sub-tabs de formaA/B

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
  const datosA = datosMostrados.filter((d) => d.tipo === "A" && d.resultadoFormaA);
  const datosB = datosMostrados.filter((d) => d.tipo === "B" && d.resultadoFormaB);
  const datosExtra = datosMostrados.filter((d) => d.resultadoExtralaboral);
  const datosEstres = datosMostrados.filter((d) => d.resultadoEstres);

  // ---- Resúmenes para gráficos ----
  const resumenNivel = (datos: any[], key: string, niveles: string[]) =>
    niveles.map((nivel) => ({
      nivel,
      cantidad: datos.filter((d) => {
        const r = d[key];
        const nivelRes =
          r?.total?.nivel ?? r?.nivelTotal ?? r?.nivelGlobal ?? r?.nivel;
        return nivelRes === nivel;
      }).length,
    }));

  const resumenA = resumenNivel(datosA, "resultadoFormaA", nivelesForma);
  const resumenB = resumenNivel(datosB, "resultadoFormaB", nivelesForma);
  const resumenExtra = resumenNivel(datosExtra, "resultadoExtralaboral", nivelesExtra);
  const resumenEstres = resumenNivel(datosEstres, "resultadoEstres", nivelesEstres);

  // ---- Promedios por dominio/dimensión ----
  function calcularPromedios(
    datos: any[],
    key: string,
    campos: string[],
    subkey: "dominios" | "dimensiones"
  ) {
    // datos: array de usuarios, cada uno con resultadoFormaA/B.dimensiones/dominios[dim]
    // = { transformado | puntajeTransformado | valor }
    const resultado: { nombre: string; promedio: number }[] = [];
    campos.forEach((nombre) => {
      const valores = datos
        .map((d) => {
          const seccion = d[key]?.[subkey]?.[nombre];
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
      resultado.push({ nombre, promedio: Math.round(promedio * 10) / 10 });
    });
    return resultado;
  }
  const promediosDominiosA = calcularPromedios(datosA, "resultadoFormaA", dominiosA, "dominios");
  const promediosDimensionesA = calcularPromedios(datosA, "resultadoFormaA", dimensionesA, "dimensiones");
  const promediosDominiosB = calcularPromedios(datosB, "resultadoFormaB", dominiosB, "dominios");
  const promediosDimensionesB = calcularPromedios(datosB, "resultadoFormaB", dimensionesB, "dimensiones");

  // ---- Exportar a Excel ----
  const handleExportar = () => {
    let datosExportar: any[] = [];
    if (tab === "formaA") datosExportar = datosA;
    else if (tab === "formaB") datosExportar = datosB;
    else if (tab === "extralaboral") datosExportar = datosExtra;
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
          "",
        "Nivel Forma B":
          d.resultadoFormaB?.total?.nivel ??
          d.resultadoFormaB?.nivelTotal ??
          "",
      }),
      ...(tab === "extralaboral" && {
        "Puntaje Extralaboral": d.resultadoExtralaboral?.puntajeTransformadoTotal ?? "",
        "Nivel Extralaboral": d.resultadoExtralaboral?.nivelGlobal ?? "",
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
    XLSX.writeFile(wb, `resultados_${tab}.xlsx`);
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
                        ""}
                    </td>
                    <td>
                      {d.resultadoFormaB?.total?.nivel ??
                        d.resultadoFormaB?.nivelTotal ??
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

  // ---- Render gráficos ----
  function GraficaBarra({
    resumen,
    titulo,
    keyData = "cantidad",
  }: {
    resumen: any[];
    titulo: string;
    keyData?: string;
  }) {
    return (
      <div className="flex-1">
        <h4 className="font-bold mb-2 text-cogent-blue">{titulo}</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={resumen}>
            <XAxis dataKey="nombre" interval={0} angle={-18} textAnchor="end" height={70} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey={keyData} name={keyData === "promedio" ? "Promedio" : keyData}>
              {resumen.map((_, i) => (
                <Cell key={i} fill={colores[i % colores.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  function GraficaBarraSimple({ resumen, titulo }: { resumen: any[]; titulo: string }) {
    return (
      <div className="flex-1">
        <h4 className="font-bold mb-2 text-cogent-blue">{titulo}</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={resumen}>
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

      {/* Tabs/Pestañas */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-6 w-full flex flex-wrap gap-2">
          <TabsTrigger value="formaA">Forma A (Intralaboral)</TabsTrigger>
          <TabsTrigger value="formaB">Forma B (Intralaboral)</TabsTrigger>
          <TabsTrigger value="extralaboral">Extralaboral</TabsTrigger>
          <TabsTrigger value="estres">Estrés</TabsTrigger>
        </TabsList>

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
                    <GraficaBarraSimple resumen={resumenA} titulo="Niveles de Forma A" />
                    {!soloGenerales && <TablaIndividual datos={datosA} tipo="formaA" />}
                  </>
                )
              }
            </TabsContent>
            <TabsContent value="dominios">
              {datosA.length === 0
                ? <div className="text-gray-500 py-4">No hay datos para dominios.</div>
                : <GraficaBarra resumen={promediosDominiosA} titulo="Promedio de Puntaje Transformado por Dominio" keyData="promedio" />
              }
            </TabsContent>
            <TabsContent value="dimensiones">
              {datosA.length === 0
                ? <div className="text-gray-500 py-4">No hay datos para dimensiones.</div>
                : <GraficaBarra resumen={promediosDimensionesA} titulo="Promedio de Puntaje Transformado por Dimensión" keyData="promedio" />
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
                    <GraficaBarraSimple resumen={resumenB} titulo="Niveles de Forma B" />
                    {!soloGenerales && <TablaIndividual datos={datosB} tipo="formaB" />}
                  </>
                )
              }
            </TabsContent>
            <TabsContent value="dominios">
              {datosB.length === 0
                ? <div className="text-gray-500 py-4">No hay datos para dominios.</div>
                : <GraficaBarra resumen={promediosDominiosB} titulo="Promedio de Puntaje Transformado por Dominio" keyData="promedio" />
              }
            </TabsContent>
            <TabsContent value="dimensiones">
              {datosB.length === 0
                ? <div className="text-gray-500 py-4">No hay datos para dimensiones.</div>
                : <GraficaBarra resumen={promediosDimensionesB} titulo="Promedio de Puntaje Transformado por Dimensión" keyData="promedio" />
              }
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ---- EXTRALABORAL ---- */}
        <TabsContent value="extralaboral">
          {datosExtra.length === 0
            ? <div className="text-gray-500 py-4">No hay resultados Extralaborales.</div>
            : (
              <>
                <GraficaBarraSimple resumen={resumenExtra} titulo="Niveles Extralaborales" />
                {!soloGenerales && <TablaIndividual datos={datosExtra} tipo="extralaboral" />}
              </>
            )
          }
        </TabsContent>

        {/* ---- ESTRÉS ---- */}
        <TabsContent value="estres">
          {datosEstres.length === 0
            ? <div className="text-gray-500 py-4">No hay resultados de Estrés.</div>
            : (
              <>
                <GraficaBarraSimple resumen={resumenEstres} titulo="Niveles de Estrés" />
                {!soloGenerales && <TablaIndividual datos={datosEstres} tipo="estres" />}
              </>
            )
          }
        </TabsContent>
      </Tabs>

      {/* Botón para exportar */}
      <div className="flex justify-end">
        <button
          onClick={handleExportar}
          className="bg-cogent-blue text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-cogent-sky"
        >
          Descargar Excel
        </button>
      </div>
    </div>
  );
}
