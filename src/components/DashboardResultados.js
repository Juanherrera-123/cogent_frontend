import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useRef } from "react";
import * as XLSX from "xlsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { gatherFlatResults } from "@/utils/gatherResults";
import { exportElementToPDF } from "@/utils/pdfExport";
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
import GeneralResultsTabs from "@/components/dashboard/GeneralResultsTabs";
import FormaTabs from "@/components/dashboard/FormaTabs";
import InformeTabs from "@/components/dashboard/InformeTabs";
import LogoCogent from "/logo_forma.png";
import { FileDown, FileText, Home as HomeIcon } from "lucide-react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { calcularFormaA } from "@/utils/calcularFormaA";
import { buildReportPayload } from "@/utils/buildReportPayload";
import { recomendacionesPorResultados, conclusionesSinteticas } from "@/utils/recomendaciones";
const nivelesRiesgo = [
    "Riesgo muy bajo",
    "Riesgo bajo",
    "Riesgo medio",
    "Riesgo alto",
    "Riesgo muy alto",
];
const STORAGE_KEY = (empresaId) => `cogent_report_options_${empresaId}`;
function loadOptions(empresaId) {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY(empresaId)) || "");
    }
    catch {
        return null;
    }
}
function saveOptions(empresaId, opts) {
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
];
export default function DashboardResultados({ rol, empresaNombre, soloGenerales, empresaFiltro, credenciales = [], onAgregarEmpresa, onEliminarEmpresa, onEditarEmpresa, onBack }) {
    const [datos, setDatos] = useState([]);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresaFiltro || "todas");
    const [empresaEliminar, setEmpresaEliminar] = useState("todas");
    const [tab, setTab] = useState("general");
    const [tabGeneral, setTabGeneral] = useState("resumen");
    const [categoriaFicha, setCategoriaFicha] = useState(categoriasFicha[0].key);
    const [tabIntra, setTabIntra] = useState("global"); // Para sub-tabs de formaA/B
    const [tabExtra, setTabExtra] = useState("global");
    const [tabGlobalExtra, setTabGlobalExtra] = useState("A"); // Para sub-tabs global extra
    const [chartType, setChartType] = useState("bar");
    const [seleccionados, setSeleccionados] = useState([]);
    const containerRef = useRef(null);
    const { ref: offscreenRef, rendering, progress, exportNow } = usePdfExport();
    const saludo = rol === "psicologa" ? "Hola Lilian Navas" : empresaNombre || "";
    const cargo = rol === "psicologa" ? "Psicologist" : "Empresa";
    const tabPill = "px-5 py-2 rounded-full font-semibold border border-[#B2E2FF] text-[#172349] shrink-0 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#38BDF8] data-[state=active]:to-[#265FF2]";
    useEffect(() => {
        const cargar = async () => {
            const snap = await getDocs(collection(db, "resultadosCogent"));
            const arr = snap.docs.map((d) => {
                const data = { id: d.id, ...d.data() };
                if (data.tipo === "A" &&
                    data.respuestas?.bloques &&
                    !data.resultadoFormaA?.dimensiones?.["Retroalimentación del desempeño"]) {
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
    const datosMostrados = datos.filter((d) => (empresaSeleccionada === "todas" || d.ficha?.empresa === empresaSeleccionada));
    const datosEliminar = useMemo(() => datos.filter((d) => empresaEliminar === "todas" || d.ficha?.empresa === empresaEliminar), [datos, empresaEliminar]);
    // ---- Agrupación por tipo de resultado ----
    const datosA = datosMostrados.filter((d) => d.tipo === "A" && d.resultadoFormaA && d.resultadoFormaA.valido !== false);
    const datosB = datosMostrados.filter((d) => d.tipo === "B" && d.resultadoFormaB && d.resultadoFormaB.valido !== false);
    const datosExtra = datosMostrados.filter((d) => d.resultadoExtralaboral && d.resultadoExtralaboral.valido !== false);
    const datosEstres = datosMostrados.filter((d) => d.resultadoEstres && d.resultadoEstres.valido !== false);
    const datosGlobalAE = datosMostrados.filter((d) => d.resultadoGlobalAExtralaboral);
    const datosGlobalBE = datosMostrados.filter((d) => d.resultadoGlobalBExtralaboral);
    const ciudadInforme = datosMostrados.find((d) => d.ficha?.trabajoCiudad)?.ficha?.trabajoCiudad || "";
    // ---- Resúmenes para gráficos ----
    const resumenNivel = (datos, key, niveles) => niveles.map((nivel, idx) => ({
        nombre: nivel,
        nivel,
        indice: idx,
        cantidad: datos.filter((d) => {
            const r = d[key];
            const nivelRes = r?.total?.nivel ?? r?.nivelTotal ?? r?.nivelGlobal ?? r?.nivel;
            return (nivelRes === nivel ||
                (nivelRes === "Sin riesgo" && nivel === "Riesgo muy bajo"));
        }).length,
    }));
    const resumenA = resumenNivel(datosA, "resultadoFormaA", nivelesForma);
    const resumenB = resumenNivel(datosB, "resultadoFormaB", nivelesForma);
    const resumenExtra = resumenNivel(datosExtra, "resultadoExtralaboral", nivelesExtra);
    const resumenEstres = resumenNivel(datosEstres, "resultadoEstres", nivelesEstres);
    const resumenGlobalAE = resumenNivel(datosGlobalAE, "resultadoGlobalAExtralaboral", nivelesForma);
    const resumenGlobalBE = resumenNivel(datosGlobalBE, "resultadoGlobalBExtralaboral", nivelesForma);
    // ---- Promedios por dominio/dimensión ----
    function nivelPromedio(nombre, valor, origen, tipo, datos) {
        let baremo = [];
        if (origen === "formaA") {
            if (tipo === "dimensiones") {
                baremo = baremosFormaA.dimensiones[nombre] || [];
            }
            else {
                baremo = baremosFormaA.dominios[nombre] || [];
            }
        }
        else if (origen === "formaB") {
            if (tipo === "dimensiones") {
                baremo = baremosFormaB.dimension[nombre] || [];
            }
            else {
                baremo = baremosFormaB.dominio[nombre] || [];
            }
        }
        else if (origen === "extra") {
            if (datos && datos.length) {
                const dim = dimensionesExtralaboral.find((d) => d.nombre === nombre);
                if (dim) {
                    const indices = datos
                        .map((d) => {
                        const form = d.tipo;
                        let seccion = d.resultadoExtralaboral?.dimensiones?.[nombre];
                        if (Array.isArray(d.resultadoExtralaboral?.dimensiones)) {
                            seccion = d.resultadoExtralaboral.dimensiones.find((x) => x.nombre === nombre);
                        }
                        const puntaje = seccion?.transformado ?? seccion?.puntajeTransformado;
                        if (typeof puntaje !== "number")
                            return undefined;
                        const lista = form === "B" ? dim.baremosB : dim.baremosA;
                        const b = lista.find((x) => puntaje >= x.min && puntaje <= x.max);
                        const nivel = b?.nivel ? (b.nivel === "Sin riesgo" ? "Riesgo muy bajo" : b.nivel) : undefined;
                        return nivel ? nivelesRiesgo.indexOf(nivel) : undefined;
                    })
                        .filter((x) => typeof x === "number");
                    if (indices.length) {
                        const idx = Math.round(indices.reduce((a, b) => a + b, 0) / indices.length);
                        return nivelesRiesgo[idx] || "No clasificado";
                    }
                }
            }
            const dim = dimensionesExtralaboral.find((d) => d.nombre === nombre);
            baremo = dim?.baremosA || [];
        }
        const nivel = baremo.find((b) => valor >= b.min && valor <= b.max)?.nivel ||
            "No clasificado";
        return nivel === "Sin riesgo" ? "Riesgo muy bajo" : nivel;
    }
    function calcularPromedios(datos, key, campos, subkey, origen) {
        // datos: array de usuarios, cada uno con resultadoFormaA/B.dimensiones/dominios[dim]
        // = { transformado | puntajeTransformado | valor }
        const resultado = [];
        campos.forEach((nombre) => {
            const valores = datos
                .map((d) => {
                const res = d[key];
                let seccion = res?.[subkey]?.[nombre];
                if (Array.isArray(res?.[subkey])) {
                    const item = res[subkey].find((x) => x.nombre === nombre);
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
    const promediosDominiosA = calcularPromedios(datosA, "resultadoFormaA", dominiosA, "dominios", "formaA");
    const promediosDimensionesA = calcularPromedios(datosA, "resultadoFormaA", dimensionesA, "dimensiones", "formaA");
    const promediosDominiosB = calcularPromedios(datosB, "resultadoFormaB", dominiosB, "dominios", "formaB");
    const promediosDimensionesB = calcularPromedios(datosB, "resultadoFormaB", dimensionesB, "dimensiones", "formaB");
    const promediosDimensionesExtra = calcularPromedios(datosExtra, "resultadoExtralaboral", dimensionesExtra, "dimensiones", "extra");
    const resumenAReport = useMemo(() => ({
        dominios: Object.fromEntries(promediosDominiosA.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])),
        dimensiones: Object.fromEntries(promediosDimensionesA.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])),
    }), [promediosDominiosA, promediosDimensionesA]);
    const resumenBReport = useMemo(() => ({
        dominios: Object.fromEntries(promediosDominiosB.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])),
        dimensiones: Object.fromEntries(promediosDimensionesB.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])),
    }), [promediosDominiosB, promediosDimensionesB]);
    const resumenExtraReport = useMemo(() => ({
        dimensiones: Object.fromEntries(promediosDimensionesExtra.map((d) => [d.nombre, { transformado: d.promedio, nivel: d.nivel }])),
    }), [promediosDimensionesExtra]);
    function conteosPorFicha(datos, keyFicha) {
        if (keyFicha === "antiguedad") {
            const grupos = Array.from(new Set(datos.map((d) => d.ficha
                ? d.ficha.menosAnioEmpresa
                    ? "Menos de un año"
                    : "Más de un año"
                : "Sin dato")));
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
    const fichaConteosA = {};
    const fichaConteosB = {};
    const fichaConteosExtra = {};
    const fichaConteosEstres = {};
    const fichaConteosGlobal = {};
    categoriasFicha.forEach((cat) => {
        fichaConteosA[cat.key] = conteosPorFicha(datosA, cat.key);
        fichaConteosB[cat.key] = conteosPorFicha(datosB, cat.key);
        fichaConteosExtra[cat.key] = conteosPorFicha(datosExtra, cat.key);
        fichaConteosEstres[cat.key] = conteosPorFicha(datosEstres, cat.key);
        fichaConteosGlobal[cat.key] = conteosPorFicha(datosMostrados, cat.key);
    });
    const datosInforme = useMemo(() => {
        const todos = gatherFlatResults(datos);
        return todos.filter((f) => empresaSeleccionada === "todas" || f.Empresa === empresaSeleccionada);
    }, [empresaSeleccionada]);
    const allHeaders = useMemo(() => {
        const base = informeHeaderOrder.filter((h) => datosInforme.some((fila) => h in fila));
        const remaining = Array.from(new Set(datosInforme.flatMap((fila) => Object.keys(fila)))).filter((h) => !base.includes(h));
        return [...base, ...remaining];
    }, [datosInforme]);
    const promedioInforme = useMemo(() => {
        const nivelesMap = {};
        nivelesRiesgo.forEach((n, i) => {
            nivelesMap[n] = i;
        });
        nivelesMap["Sin riesgo"] = 0;
        const nivelesEstresMap = {};
        nivelesEstres.forEach((n, i) => {
            nivelesEstresMap[n] = i;
        });
        const row = {};
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
                .map((v) => mapa[v])
                .filter((v) => typeof v === "number");
            if (niveles.length) {
                const idx = Math.round(niveles.reduce((a, b) => a + b, 0) / niveles.length);
                const lista = h.toLowerCase().includes("estrés") ? nivelesEstres : nivelesRiesgo;
                row[h] = lista[idx] || "";
            }
            else {
                row[h] = "";
            }
        });
        if (allHeaders.length) {
            row[allHeaders[0]] = "Promedio";
        }
        return row;
    }, [datosInforme, allHeaders]);
    const flat = datosInforme;
    const empresaSel = empresaSeleccionada;
    const empresaInfo = {
        id: typeof empresaSel === "object" && empresaSel && "id" in empresaSel
            ? empresaSel.id ?? "empresa-actual"
            : "empresa-actual",
        nombre: typeof empresaSel === "object" && empresaSel && "nombre" in empresaSel
            ? empresaSel.nombre ?? "Empresa"
            : typeof empresaSel === "string"
                ? empresaSel
                : "Empresa",
        nit: typeof empresaSel === "object" && empresaSel && "nit" in empresaSel
            ? empresaSel.nit ?? ""
            : "",
        logoUrl: typeof empresaSel === "object" && empresaSel && "logoUrl" in empresaSel
            ? empresaSel.logoUrl ?? ""
            : "",
    };
    const reportPayload = buildReportPayload({
        empresa: empresaInfo,
        flat,
        resumenA: resumenAReport,
        resumenB: resumenBReport,
        resumenExtra: resumenExtraReport,
        estresGlobal: undefined,
    });
    const introData = {
        empresa: reportPayload.empresa.nombre,
        total: datosMostrados.length,
        formaA: datosA.length,
        formaB: datosB.length,
        ciudad: ciudadInforme,
    };
    const empresaId = reportPayload.empresa?.id || "empresa-actual";
    const [reportOptions, setReportOptions] = useState(() => (loadOptions(empresaId) || {
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
    }));
    useEffect(() => {
        const loaded = loadOptions(empresaId);
        if (loaded)
            setReportOptions(loaded);
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
    function topHallazgos(dims, n = 3) {
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
        const fn = `Informe_${reportPayload.empresa.nombre}_${new Date(reportPayload.fechaInformeISO).toISOString().slice(0, 10)}.pdf`;
        await exportNow(fn);
    }
    // ---- Exportar a Excel ----
    const handleExportar = () => {
        let datosExportar = [];
        if (tab === "general")
            datosExportar = datosMostrados;
        else if (tab === "formaA")
            datosExportar = datosA;
        else if (tab === "formaB")
            datosExportar = datosB;
        else if (tab === "extralaboral")
            datosExportar = datosExtra;
        else if (tab === "globalExtra")
            datosExportar =
                tabGlobalExtra === "A" ? datosGlobalAE : datosGlobalBE;
        else if (tab === "estres")
            datosExportar = datosEstres;
        else if (tab === "informe" || tab === "informeCompleto")
            datosExportar = datosInforme;
        const filas = tab === "informe" || tab === "informeCompleto"
            ? datosInforme
            : datosExportar.map((d, i) => {
                const row = d;
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
                        "Puntaje Forma B": d.resultadoFormaB?.total?.transformado ??
                            d.resultadoFormaB?.puntajeTransformadoTotal ??
                            d.resultadoFormaB?.puntajeTransformado ??
                            d.resultadoFormaB?.puntajeTotalTransformado ??
                            "",
                        "Nivel Forma B": d.resultadoFormaB?.total?.nivel ??
                            d.resultadoFormaB?.nivelTotal ??
                            d.resultadoFormaB?.nivel ??
                            "",
                    }),
                    ...(tab === "extralaboral" && {
                        "Puntaje Extralaboral": d.resultadoExtralaboral?.puntajeTransformadoTotal ?? "",
                        "Nivel Extralaboral": d.resultadoExtralaboral?.nivelGlobal ?? "",
                    }),
                    ...(tab === "globalExtra" && {
                        "Puntaje Global A+Extra": d.resultadoGlobalAExtralaboral?.puntajeGlobal ??
                            d.resultadoGlobalBExtralaboral?.puntajeGlobal ??
                            "",
                        "Nivel Global": d.resultadoGlobalAExtralaboral?.nivelGlobal ??
                            d.resultadoGlobalBExtralaboral?.nivelGlobal ??
                            "",
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
        if (!containerRef.current)
            return;
        const active = containerRef.current.querySelector('[data-state="active"]');
        if (active) {
            await exportElementToPDF(active, "resultados.pdf");
        }
    };
    const toggleSeleccion = (index) => {
        setSeleccionados((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]);
    };
    const eliminarSeleccionados = async () => {
        if (seleccionados.length === 0)
            return;
        const eliminados = datos.filter((_, i) => seleccionados.includes(i));
        const restantes = datos.filter((_, i) => !seleccionados.includes(i));
        await Promise.all(eliminados.map((d) => deleteDoc(doc(db, "resultadosCogent", d.id))));
        setDatos(restantes);
        setSeleccionados([]);
    };
    const eliminarPorEmpresa = async () => {
        const eliminados = empresaEliminar === "todas"
            ? datos
            : datos.filter((d) => d.ficha?.empresa === empresaEliminar);
        const restantes = empresaEliminar === "todas"
            ? []
            : datos.filter((d) => d.ficha?.empresa !== empresaEliminar);
        await Promise.all(eliminados.map((d) => deleteDoc(doc(db, "resultadosCogent", d.id))));
        setDatos(restantes);
        setSeleccionados([]);
    };
    // ---- Render tablas individuales (solo para psicóloga) ----
    // ---- Pestañas ----
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center py-10 px-2", children: [_jsxs("div", { className: "background-shapes", children: [_jsx("div", { className: "shape rhombus rhombus-1" }), _jsx("div", { className: "shape rhombus rhombus-2" })] }), _jsxs("div", { ref: containerRef, className: "w-full max-w-7xl bg-white rounded-2xl shadow-xl p-8 md:p-10 flex flex-col gap-8 mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: LogoCogent, alt: "COGENT logo", className: "w-10 h-10 mr-3" }), _jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#172349] font-montserrat", children: "Dashboard de Resultados" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "font-bold text-[#172349] font-montserrat", children: saludo }), _jsx("div", { className: "text-sm text-[#6C7A89] font-montserrat", children: cargo })] })] }), _jsx("div", { className: "h-px bg-[#E5EAF6]" }), !empresaFiltro && (_jsxs("div", { className: "flex gap-2 items-center mb-2", children: [_jsx("label", { className: "font-semibold mr-2", children: "Filtrar por empresa:" }), _jsxs("select", { value: empresaSeleccionada, onChange: (e) => setEmpresaSeleccionada(e.target.value), className: "rounded-xl border border-[#B2E2FF] p-2 text-[#265FF2] font-semibold", children: [_jsx("option", { value: "todas", children: "Todas" }), empresasResultados.map((e, idx) => (_jsx("option", { value: e, children: e }, idx)))] })] })), _jsxs("div", { className: "flex gap-2 items-center mb-4", children: [_jsx("label", { className: "font-semibold mr-2", children: "Tipo de gr\u00E1fico:" }), _jsxs("select", { value: chartType, onChange: (e) => setChartType(e.target.value), className: "rounded-xl border border-[#B2E2FF] p-2 text-[#265FF2] font-semibold", children: [_jsx("option", { value: "bar", children: "Barras" }), _jsx("option", { value: "histogram", children: "Histograma" }), _jsx("option", { value: "pie", children: "Pastel" })] })] }), _jsxs(Tabs, { value: tab, onValueChange: setTab, className: "w-full", children: [_jsxs(TabsList, { className: "mt-8 mb-2 py-2 px-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap", children: [!soloGenerales && (_jsx(TabsTrigger, { className: tabPill, value: "admin", children: "Eliminar encuestas" })), !soloGenerales && (_jsx(TabsTrigger, { className: tabPill, value: "empresas", children: "Empresas" }))] }), _jsxs(TabsList, { className: "mb-6 py-2 px-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap", children: [_jsx(TabsTrigger, { className: tabPill, value: "general", children: "General" }), _jsx(TabsTrigger, { className: tabPill, value: "formaA", children: "Forma A (Intralaboral)" }), _jsx(TabsTrigger, { className: tabPill, value: "formaB", children: "Forma B (Intralaboral)" }), _jsx(TabsTrigger, { className: tabPill, value: "extralaboral", children: "Extralaboral" }), _jsx(TabsTrigger, { className: tabPill, value: "globalExtra", children: "Global Extra" }), _jsx(TabsTrigger, { className: tabPill, value: "estres", children: "Estr\u00E9s" }), rol === "psicologa" && (_jsxs(_Fragment, { children: [_jsx(TabsTrigger, { className: tabPill, value: "informeCompleto", children: "Informe completo" }), _jsx(TabsTrigger, { className: tabPill, value: "informe", children: "Informe" })] }))] }), _jsx(TabsContent, { value: "general", children: _jsx(GeneralResultsTabs, { value: tabGeneral, onChange: setTabGeneral, tabClass: tabPill, chartType: chartType, datosA: datosA, datosB: datosB, datosExtra: datosExtra, datosEstres: datosEstres, resumenA: resumenA, resumenB: resumenB, resumenExtra: resumenExtra, resumenEstres: resumenEstres, categoriaFicha: categoriaFicha, onCategoriaChange: (v) => setCategoriaFicha(v), categoriasFicha: categoriasFicha, fichaConteos: fichaConteosGlobal }) }), _jsx(TabsContent, { value: "formaA", children: _jsx(FormaTabs, { value: tabIntra, onChange: setTabIntra, datos: datosA, resumen: resumenA, promediosDominios: promediosDominiosA, promediosDimensiones: promediosDimensionesA, dominios: dominiosA, dimensiones: dimensionesA, chartType: chartType, tabClass: tabPill, soloGenerales: soloGenerales, tipo: "formaA", keyResultado: "resultadoFormaA" }) }), _jsx(TabsContent, { value: "formaB", children: _jsx(FormaTabs, { value: tabIntra, onChange: setTabIntra, datos: datosB, resumen: resumenB, promediosDominios: promediosDominiosB, promediosDimensiones: promediosDimensionesB, dominios: dominiosB, dimensiones: dimensionesB, chartType: chartType, tabClass: tabPill, soloGenerales: soloGenerales, tipo: "formaB", keyResultado: "resultadoFormaB" }) }), _jsx(TabsContent, { value: "extralaboral", children: _jsxs(Tabs, { value: tabExtra, onValueChange: setTabExtra, className: "w-full", children: [_jsxs(TabsList, { className: "mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap", children: [_jsx(TabsTrigger, { className: tabPill, value: "global", children: "Global" }), _jsx(TabsTrigger, { className: tabPill, value: "dimensiones", children: "Por Dimensi\u00F3n" })] }), _jsx(TabsContent, { value: "global", children: datosExtra.length === 0
                                                ? _jsx("div", { className: "text-[var(--gray-medium)] py-4", children: "No hay resultados Extralaborales." })
                                                : (_jsxs(_Fragment, { children: [_jsx(GraficaBarraSimple, { resumen: resumenExtra, titulo: "Niveles Extralaborales", chartType: chartType }), !soloGenerales && _jsx(TablaIndividual, { datos: datosExtra, tipo: "extralaboral" })] })) }), _jsx(TabsContent, { value: "dimensiones", children: datosExtra.length === 0
                                                ? _jsx("div", { className: "text-[var(--gray-medium)] py-4", children: "No hay datos para dimensiones." })
                                                : (_jsxs(_Fragment, { children: [_jsx(GraficaBarra, { resumen: promediosDimensionesExtra, titulo: "Promedio de Puntaje Transformado por Dimensi\u00F3n", chartType: chartType }), !soloGenerales && (_jsx(TablaDimensiones, { datos: datosExtra, dimensiones: dimensionesExtra, keyResultado: "resultadoExtralaboral" }))] })) })] }) }), _jsx(TabsContent, { value: "globalExtra", children: _jsxs(Tabs, { value: tabGlobalExtra, onValueChange: setTabGlobalExtra, className: "w-full", children: [_jsxs(TabsList, { className: "mb-6 py-2 px-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap", children: [_jsx(TabsTrigger, { className: tabPill, value: "A", children: "Forma A" }), _jsx(TabsTrigger, { className: tabPill, value: "B", children: "Forma B" })] }), _jsx(TabsContent, { value: "A", children: datosGlobalAE.length === 0 ? (_jsx("div", { className: "text-[var(--gray-medium)] py-4", children: "No hay resultados Globales A." })) : (_jsxs(_Fragment, { children: [_jsx(GraficaBarraSimple, { resumen: resumenGlobalAE, titulo: "Niveles Global A + Extra", chartType: chartType }), !soloGenerales && _jsx(TablaIndividual, { datos: datosGlobalAE, tipo: "globalExtra" })] })) }), _jsx(TabsContent, { value: "B", children: datosGlobalBE.length === 0 ? (_jsx("div", { className: "text-[var(--gray-medium)] py-4", children: "No hay resultados Globales B." })) : (_jsxs(_Fragment, { children: [_jsx(GraficaBarraSimple, { resumen: resumenGlobalBE, titulo: "Niveles Global B + Extra", chartType: chartType }), !soloGenerales && _jsx(TablaIndividual, { datos: datosGlobalBE, tipo: "globalExtra" })] })) })] }) }), _jsx(TabsContent, { value: "estres", children: datosEstres.length === 0
                                    ? _jsx("div", { className: "text-[var(--gray-medium)] py-4", children: "No hay resultados de Estr\u00E9s." })
                                    : (_jsxs(_Fragment, { children: [_jsx(GraficaBarraSimple, { resumen: resumenEstres, titulo: "Niveles de Estr\u00E9s", chartType: chartType }), !soloGenerales && _jsx(TablaIndividual, { datos: datosEstres, tipo: "estres" })] })) }), rol === "psicologa" && (_jsx(TabsContent, { value: "informeCompleto", children: datosInforme.length === 0 ? (_jsx("div", { className: "text-[var(--gray-medium)] py-4", children: "No hay resultados para mostrar." })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]", children: [_jsx("thead", { className: "bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold", children: _jsx("tr", { children: allHeaders.map((h) => (_jsx("th", { children: h }, h))) }) }), _jsxs("tbody", { children: [datosInforme.map((fila, i) => (_jsx("tr", { className: "border-b", children: allHeaders.map((h) => (_jsx("td", { children: fila[h] ?? "" }, h))) }, i))), _jsx("tr", { className: "font-semibold bg-gray-100", children: allHeaders.map((h) => (_jsx("td", { children: promedioInforme[h] ?? "" }, h))) })] })] }) })) })), rol === "psicologa" && (_jsxs(TabsContent, { value: "informe", children: [_jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("section", { className: "bg-white rounded-xl shadow p-6 space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("button", { onClick: onGenerarInformePDF, className: "px-4 py-2 rounded-md bg-black text-white", children: "Generar PDF" }), rendering && (_jsx("p", { className: "text-xs text-gray-500 mt-2", children: progress }))] }), _jsx(InformeTabs, { tabClass: tabPill, introduccionData: introData })] }) }), rendering && (_jsx("div", { style: { position: "absolute", left: "-99999px", top: 0, width: "794pt" }, children: _jsx(ReportePDF, { ref: offscreenRef, empresa: {
                                                nombre: reportPayload.empresa.nombre,
                                                nit: reportPayload.empresa.nit,
                                                logoUrl: reportPayload.empresa.logoUrl,
                                            }, fechaInformeISO: reportPayload.fechaInformeISO, global: reportPayload.global, tablas: {
                                                sociodemo: _jsx(TablaIndividual, { datos: datosMostrados, tipo: "formaA" }),
                                                intralaboral: (_jsxs("div", { className: "space-y-6", children: [_jsx(TablaDominios, { datos: datosA, dominios: dominiosA, keyResultado: "resultadoFormaA" }), _jsx(TablaDimensiones, { datos: datosA, dimensiones: dimensionesA, keyResultado: "resultadoFormaA" })] })),
                                                extralaboral: (_jsx(TablaDimensiones, { datos: datosExtra, dimensiones: dimensionesExtra, keyResultado: "resultadoExtralaboral" })),
                                            }, graficos: {
                                                formaA: (_jsx(GraficaBarraSimple, { resumen: resumenA, titulo: "Niveles de Forma A", chartType: chartType })),
                                                formaB: (_jsx(GraficaBarraSimple, { resumen: resumenB, titulo: "Niveles de Forma B", chartType: chartType })),
                                                extralaboral: (_jsx(GraficaBarraCategorias, { datos: resumenExtra.map((r) => ({ nombre: r.nombre, cantidad: r.cantidad })), titulo: "Niveles Extralaborales", chartType: chartType })),
                                            }, recomendaciones: recomendaciones, conclusiones: conclusiones, options: reportOptions }) }))] })), !soloGenerales && (_jsx(TabsContent, { value: "admin", children: datos.length === 0 ? (_jsx("div", { className: "text-[var(--gray-medium)] py-4", children: "No hay encuestas almacenadas." })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("label", { className: "font-semibold mr-2", children: "Empresa:" }), _jsxs("select", { value: empresaEliminar, onChange: (e) => setEmpresaEliminar(e.target.value), className: "rounded-xl border border-[#B2E2FF] p-2 text-[#265FF2] font-semibold", children: [_jsx("option", { value: "todas", children: "Todas" }), empresasResultados.map((e, idx) => (_jsx("option", { value: e, children: e }, idx)))] }), _jsx("button", { className: "bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700", onClick: eliminarPorEmpresa, children: "Eliminar todo(s)" })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]", children: [_jsx("thead", { className: "bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold", children: _jsxs("tr", { children: [_jsx("th", {}), _jsx("th", { children: "#" }), _jsx("th", { children: "Empresa" }), _jsx("th", { children: "Nombre" }), _jsx("th", { children: "Fecha" })] }) }), _jsx("tbody", { children: datosEliminar.map((d, i) => {
                                                            const idxOriginal = datos.indexOf(d);
                                                            return (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "px-2 py-1 text-center", children: _jsx("input", { type: "checkbox", checked: seleccionados.includes(idxOriginal), onChange: () => toggleSeleccion(idxOriginal) }) }), _jsx("td", { className: "px-2 py-1", children: i + 1 }), _jsx("td", { className: "px-2 py-1", children: d.ficha?.empresa }), _jsx("td", { className: "px-2 py-1", children: d.ficha?.nombre }), _jsx("td", { className: "px-2 py-1", children: d.fecha ? new Date(d.fecha).toLocaleString() : "" })] }, idxOriginal));
                                                        }) })] }) }), _jsx("button", { className: "bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700 mt-4 disabled:opacity-50", disabled: seleccionados.length === 0, onClick: eliminarSeleccionados, children: "Eliminar seleccionados" })] })) })), !soloGenerales && (_jsx(TabsContent, { value: "empresas", children: _jsx(AdminEmpresas, { credenciales: credenciales, onAgregar: onAgregarEmpresa || (async () => false), onEliminar: onEliminarEmpresa || (async () => false), onEditar: onEditarEmpresa || (async () => false) }) }))] }), _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4 mt-4", children: [onBack && (_jsxs("button", { onClick: onBack, className: "flex items-center gap-2 px-6 py-3 bg-gray-100 text-[#172349] font-bold rounded-2xl hover:bg-[#E5EAF6]", children: [_jsx(HomeIcon, { size: 20 }), " Volver al inicio"] })), rol === "psicologa" &&
                                (tab === "informe" || tab === "informeCompleto") && (_jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { onClick: handleExportar, className: "flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#265FF2] text-white font-bold rounded-2xl shadow-md hover:brightness-90", children: [_jsx(FileDown, { size: 20 }), " Descargar Excel"] }), _jsxs("button", { onClick: handleExportPDF, className: "flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#265FF2] text-white font-bold rounded-2xl shadow-md hover:brightness-90", children: [_jsx(FileText, { size: 20 }), " Descargar PDF"] })] }))] })] })] }));
}
