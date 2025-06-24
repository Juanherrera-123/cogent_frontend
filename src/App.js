import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Consentimiento from "./components/Consentimiento";
import FormSelector from "./components/FormSelector";
import FichaDatosGenerales from "./components/FichaDatosGenerales";
import BloquesDePreguntas from "./components/BloquesDePreguntas";
import DashboardResultados from "./components/DashboardResultados";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";
import TerminosCondiciones from "./components/TerminosCondiciones";
import credencialesBase from "./config/credentials.json";
import { bloquesFormaA, bloquesFormaB, preguntasA, preguntasB, preguntasExtralaboral, preguntasEstres, bloqueExtralaboral, bloqueEstres } from "./data/preguntas";
import { calcularEstres } from "./utils/calcularEstres";
import { calcularExtralaboral } from "./utils/calcularExtralaboral";
import { calcularFormaA } from "./utils/calcularFormaA";
import { calcularFormaB } from "./utils/calcularFormaB";
import { calcularGlobalAExtrala, calcularGlobalBExtrala } from "./utils/calcularGlobalA";
import removeUndefined from "./utils/removeUndefined";
export default function App() {
    const [step, setStep] = useState("inicio");
    const [formType, setFormType] = useState(null);
    const [ficha, setFicha] = useState(null);
    const [empresasIniciales, setEmpresasIniciales] = useState(() => {
        const guardadas = JSON.parse(localStorage.getItem("empresasCogent") || "[]");
        return guardadas.length ? guardadas : ["Sonria", "Aeropuerto El Dorado"];
    });
    const [credenciales, setCredenciales] = useState(() => {
        const extras = JSON.parse(localStorage.getItem("credencialesCogent") || "[]");
        return [...credencialesBase, ...extras];
    });
    // Para guardar todas las respuestas por sección
    const [respuestas, setRespuestas] = useState({});
    // Para guardar los resultados de cada test
    const [resultadoEstres, setResultadoEstres] = useState(null);
    const [resultadoExtralaboral, setResultadoExtralaboral] = useState(null);
    const [resultadoFormaA, setResultadoFormaA] = useState(null);
    const [resultadoFormaB, setResultadoFormaB] = useState(null);
    const [resultadoGlobalAExtra, setResultadoGlobalAExtra] = useState(null);
    const [resultadoGlobalBExtra, setResultadoGlobalBExtra] = useState(null);
    // Manejo de login (muy básico)
    const [rol, setRol] = useState("ninguno");
    const [empresaActual, setEmpresaActual] = useState(null);
    const agregarEmpresa = (nombre, usuario, password) => {
        const nuevasEmpresas = [...empresasIniciales, nombre];
        setEmpresasIniciales(nuevasEmpresas);
        localStorage.setItem("empresasCogent", JSON.stringify(nuevasEmpresas));
        const extras = JSON.parse(localStorage.getItem("credencialesCogent") || "[]");
        extras.push({ usuario, password, rol: "dueno", empresa: nombre });
        localStorage.setItem("credencialesCogent", JSON.stringify(extras));
        setCredenciales([...credencialesBase, ...extras]);
    };
    const eliminarEmpresa = (usuario) => {
        const extras = JSON.parse(localStorage.getItem("credencialesCogent") || "[]");
        const filtradas = extras.filter((c) => c.usuario !== usuario);
        localStorage.setItem("credencialesCogent", JSON.stringify(filtradas));
        setCredenciales([...credencialesBase, ...filtradas]);
    };
    const editarEmpresa = (originalUsuario, nombre, usuario, password) => {
        const extras = JSON.parse(localStorage.getItem("credencialesCogent") || "[]");
        const nuevas = extras.map((c) => c.usuario === originalUsuario
            ? { usuario, password, rol: "dueno", empresa: nombre }
            : c);
        localStorage.setItem("credencialesCogent", JSON.stringify(nuevas));
        setCredenciales([...credencialesBase, ...nuevas]);
        const empresasGuardadas = JSON.parse(localStorage.getItem("empresasCogent") || "[]");
        const anterior = extras.find((c) => c.usuario === originalUsuario)?.empresa;
        let nuevasEmp = empresasGuardadas.filter((e) => e !== anterior);
        if (!nuevasEmp.includes(nombre)) {
            nuevasEmp.push(nombre);
        }
        setEmpresasIniciales(nuevasEmp);
        localStorage.setItem("empresasCogent", JSON.stringify(nuevasEmp));
    };
    // Cuando finaliza la encuesta (luego del bloque de estrés)
    useEffect(() => {
        const guardar = async () => {
            if (step === "final") {
                // Calcula resultados por formulario
                let resultadoForma = null;
                let resultadoGlobal = null;
                if (formType === "A" && respuestas.bloques) {
                    const arr = Array.from({ length: preguntasA.length }, (_, i) => respuestas.bloques?.[i] ?? "");
                    resultadoForma = calcularFormaA(arr);
                    setResultadoFormaA(resultadoForma);
                    if (resultadoExtralaboral) {
                        resultadoGlobal = calcularGlobalAExtrala(resultadoForma?.total?.suma ?? 0, resultadoExtralaboral.puntajeBrutoTotal ?? 0);
                        setResultadoGlobalAExtra(resultadoGlobal);
                    }
                }
                else if (formType === "B" && respuestas.bloques) {
                    const arr = Array.from({ length: preguntasB.length }, (_, i) => respuestas.bloques?.[i] ?? "");
                    resultadoForma = calcularFormaB(arr);
                    setResultadoFormaB(resultadoForma);
                    if (resultadoExtralaboral) {
                        resultadoGlobal = calcularGlobalBExtrala(resultadoForma?.total?.suma ?? 0, resultadoExtralaboral.puntajeBrutoTotal ?? 0);
                        setResultadoGlobalBExtra(resultadoGlobal);
                    }
                }
                // Guarda todo lo que quieras conservar
                const data = {
                    ficha,
                    respuestas,
                    resultadoEstres,
                    resultadoExtralaboral,
                    tipo: formType,
                    fecha: ficha?.fecha || new Date().toISOString(),
                };
                if (formType === "A") {
                    data.resultadoFormaA = resultadoForma;
                    data.resultadoGlobalAExtralaboral = resultadoGlobal;
                }
                if (formType === "B") {
                    data.resultadoFormaB = resultadoForma;
                    data.resultadoGlobalBExtralaboral = resultadoGlobal;
                }
                // Limpia datos y guarda en Firestore
                const cleanData = removeUndefined(data);
                await addDoc(collection(db, "resultadosCogent"), cleanData);
            }
        };
        guardar();
    }, [step, ficha, respuestas, resultadoEstres, resultadoExtralaboral, formType]);
    // Vista Home
    if (step === "inicio") {
        return (_jsx(HomePage, { onStartSurvey: () => setStep("consent"), onViewResults: () => setStep("login"), onPrivacy: () => setStep("privacy"), onTerms: () => setStep("terms") }));
    }
    if (step === "privacy") {
        return _jsx(PoliticaPrivacidad, { onBack: () => setStep("inicio") });
    }
    if (step === "terms") {
        return _jsx(TerminosCondiciones, { onBack: () => setStep("inicio") });
    }
    // Vista Login
    if (step === "login") {
        return (_jsx(Login, { usuarios: credenciales, onLogin: (nuevoRol, empresa) => {
                setRol(nuevoRol);
                setEmpresaActual(empresa || null);
                setStep("dashboard");
            }, onCancel: () => setStep("inicio") }));
    }
    // Vista Dashboard
    if (step === "dashboard") {
        return (_jsx(DashboardResultados, { rol: rol, empresaNombre: empresaActual || undefined, empresaFiltro: rol === "dueno" ? empresaActual || undefined : undefined, soloGenerales: rol === "dueno", credenciales: credenciales.filter((c) => c.rol === "dueno"), onAgregarEmpresa: agregarEmpresa, onEliminarEmpresa: eliminarEmpresa, onEditarEmpresa: editarEmpresa, onBack: () => setStep("inicio") }));
    }
    // Flujo de encuesta
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-[var(--background-main)]", children: [step === "consent" && (_jsx(Consentimiento, { onAceptar: () => setStep("selector") })), step === "selector" && (_jsx(FormSelector, { onSelect: (form) => {
                    setFormType(form);
                    setStep("ficha");
                } })), step === "ficha" && (_jsx(FichaDatosGenerales, { empresasIniciales: empresasIniciales, onGuardar: (datos) => {
                    setFicha(datos);
                    setStep("bloques");
                } })), step === "bloques" && (_jsx(BloquesDePreguntas, { bloques: formType === "A" ? bloquesFormaA : bloquesFormaB, preguntas: formType === "A" ? preguntasA : preguntasB, onFinish: (respuestasBloques) => {
                    const ordered = Array.from({ length: formType === "A" ? preguntasA.length : preguntasB.length }, (_, i) => respuestasBloques[i] ?? "");
                    setRespuestas((prev) => ({ ...prev, bloques: ordered }));
                    setStep("extralaboral");
                } })), step === "extralaboral" && (_jsx(BloquesDePreguntas, { bloques: bloqueExtralaboral, preguntas: preguntasExtralaboral, onFinish: (respuestasExtra) => {
                    const ordered = Array.from({ length: preguntasExtralaboral.length }, (_, i) => respuestasExtra[i] ?? "");
                    const resultado = calcularExtralaboral(ordered, formType);
                    setResultadoExtralaboral(resultado);
                    setRespuestas((prev) => ({
                        ...prev,
                        extralaboral: ordered,
                        resultadoExtralaboral: resultado
                    }));
                    setStep("estres");
                } })), step === "estres" && (_jsx(BloquesDePreguntas, { bloques: bloqueEstres, preguntas: preguntasEstres, onFinish: (respuestasEstres) => {
                    const ordered = Array.from({ length: preguntasEstres.length }, (_, i) => respuestasEstres[i] ?? "");
                    const resultado = calcularEstres(ordered, formType);
                    setResultadoEstres(resultado);
                    setRespuestas((prev) => ({
                        ...prev,
                        estres: ordered,
                        resultadoEstres: resultado
                    }));
                    setStep("final");
                } })), step === "final" && (_jsxs("div", { className: "p-8 bg-white rounded-xl shadow-md text-[var(--text-main)] font-bold text-2xl flex flex-col items-center gap-4", children: [_jsxs("div", { children: ["\u00A1Encuesta completada!", _jsx("br", {}), "Gracias por tu participaci\u00F3n."] }), _jsx("button", { className: "bg-primary-main text-white px-6 py-2 rounded-lg shadow hover:bg-primary-light text-base", onClick: () => setStep("inicio"), children: "Volver al inicio" })] }))] }));
}
