import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
export default function TablaIndividual({ datos, tipo }) {
    const promedios = useMemo(() => {
        const nivelesRiesgo = [
            "Riesgo muy bajo",
            "Riesgo bajo",
            "Riesgo medio",
            "Riesgo alto",
            "Riesgo muy alto",
        ];
        const nivelesEstres = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"];
        const usarEstres = tipo === "estres";
        const listaNiveles = usarEstres ? nivelesEstres : nivelesRiesgo;
        let suma = 0;
        let cuenta = 0;
        const indices = [];
        datos.forEach((d) => {
            let puntaje;
            let nivel;
            if (tipo === "formaA") {
                puntaje = d.resultadoFormaA?.total?.transformado;
                nivel = d.resultadoFormaA?.total?.nivel;
            }
            else if (tipo === "formaB") {
                puntaje =
                    d.resultadoFormaB?.total?.transformado ??
                        d.resultadoFormaB?.puntajeTransformadoTotal ??
                        d.resultadoFormaB?.puntajeTransformado ??
                        d.resultadoFormaB?.puntajeTotalTransformado;
                nivel =
                    d.resultadoFormaB?.total?.nivel ??
                        d.resultadoFormaB?.nivelTotal ??
                        d.resultadoFormaB?.nivel;
            }
            else if (tipo === "extralaboral") {
                puntaje = d.resultadoExtralaboral?.puntajeTransformadoTotal;
                nivel = d.resultadoExtralaboral?.nivelGlobal;
            }
            else if (tipo === "globalExtra") {
                puntaje =
                    d.resultadoGlobalAExtralaboral?.puntajeGlobal ??
                        d.resultadoGlobalBExtralaboral?.puntajeGlobal;
                nivel =
                    d.resultadoGlobalAExtralaboral?.nivelGlobal ??
                        d.resultadoGlobalBExtralaboral?.nivelGlobal;
            }
            else if (tipo === "estres") {
                puntaje = d.resultadoEstres?.puntajeTransformado;
                nivel = d.resultadoEstres?.nivel;
            }
            if (typeof puntaje === "number") {
                suma += puntaje;
                cuenta += 1;
            }
            if (nivel) {
                const n = nivel === "Sin riesgo" ? "Riesgo muy bajo" : nivel;
                const idx = listaNiveles.indexOf(n);
                if (idx >= 0)
                    indices.push(idx);
            }
        });
        const promPuntaje = cuenta ? Math.round((suma / cuenta) * 10) / 10 : "";
        const promNivel = indices.length > 0
            ? listaNiveles[Math.round(indices.reduce((a, b) => a + b, 0) / indices.length)]
            : "";
        return { puntaje: promPuntaje, nivel: promNivel };
    }, [datos, tipo]);
    if (datos.length === 0) {
        return _jsx("div", { className: "py-6 text-gray-400", children: "No hay resultados individuales para mostrar." });
    }
    return (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]", children: [_jsx("thead", { className: "bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold", children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Empresa" }), _jsx("th", { children: "Nombre" }), _jsx("th", { children: "Sexo" }), _jsx("th", { children: "Cargo" }), tipo === "formaA" && (_jsxs(_Fragment, { children: [_jsx("th", { children: "Puntaje Forma A" }), _jsx("th", { children: "Nivel Forma A" })] })), tipo === "formaB" && (_jsxs(_Fragment, { children: [_jsx("th", { children: "Puntaje Forma B" }), _jsx("th", { children: "Nivel Forma B" })] })), tipo === "extralaboral" && (_jsxs(_Fragment, { children: [_jsx("th", { children: "Puntaje Extralaboral" }), _jsx("th", { children: "Nivel Extra" })] })), tipo === "globalExtra" && (_jsxs(_Fragment, { children: [_jsx("th", { children: "Puntaje Global A+Extra" }), _jsx("th", { children: "Nivel Global" })] })), tipo === "estres" && (_jsxs(_Fragment, { children: [_jsx("th", { children: "Puntaje Estr\u00E9s" }), _jsx("th", { children: "Nivel Estr\u00E9s" })] })), _jsx("th", { children: "Fecha" })] }) }), _jsxs("tbody", { children: [datos.map((d, i) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { children: i + 1 }), _jsx("td", { children: d.ficha?.empresa }), _jsx("td", { children: d.ficha?.nombre }), _jsx("td", { children: d.ficha?.sexo }), _jsx("td", { children: d.ficha?.cargo }), tipo === "formaA" && (_jsxs(_Fragment, { children: [_jsx("td", { children: d.resultadoFormaA?.total?.transformado ?? "" }), _jsx("td", { children: d.resultadoFormaA?.total?.nivel ?? "" })] })), tipo === "formaB" && (_jsxs(_Fragment, { children: [_jsx("td", { children: d.resultadoFormaB?.total?.transformado ??
                                                d.resultadoFormaB?.puntajeTransformadoTotal ??
                                                d.resultadoFormaB?.puntajeTransformado ??
                                                d.resultadoFormaB?.puntajeTotalTransformado ??
                                                "" }), _jsx("td", { children: d.resultadoFormaB?.total?.nivel ??
                                                d.resultadoFormaB?.nivelTotal ??
                                                d.resultadoFormaB?.nivel ??
                                                "" })] })), tipo === "extralaboral" && (_jsxs(_Fragment, { children: [_jsx("td", { children: d.resultadoExtralaboral?.puntajeTransformadoTotal ?? "" }), _jsx("td", { children: d.resultadoExtralaboral?.nivelGlobal ?? "" })] })), tipo === "globalExtra" && (_jsxs(_Fragment, { children: [_jsx("td", { children: d.resultadoGlobalAExtralaboral?.puntajeGlobal ??
                                                d.resultadoGlobalBExtralaboral?.puntajeGlobal ?? "" }), _jsx("td", { children: d.resultadoGlobalAExtralaboral?.nivelGlobal ??
                                                d.resultadoGlobalBExtralaboral?.nivelGlobal ?? "" })] })), tipo === "estres" && (_jsxs(_Fragment, { children: [_jsx("td", { children: d.resultadoEstres?.puntajeTransformado ?? "" }), _jsx("td", { children: d.resultadoEstres?.nivel ?? "" })] })), _jsx("td", { children: d.fecha ? new Date(d.fecha).toLocaleString() : "" })] }, i))), _jsxs("tr", { className: "font-semibold bg-gray-100", children: [_jsx("td", {}), _jsx("td", { children: "Promedio" }), _jsx("td", {}), _jsx("td", {}), _jsx("td", {}), tipo === "formaA" && (_jsxs(_Fragment, { children: [_jsx("td", { children: promedios.puntaje }), _jsx("td", { children: promedios.nivel })] })), tipo === "formaB" && (_jsxs(_Fragment, { children: [_jsx("td", { children: promedios.puntaje }), _jsx("td", { children: promedios.nivel })] })), tipo === "extralaboral" && (_jsxs(_Fragment, { children: [_jsx("td", { children: promedios.puntaje }), _jsx("td", { children: promedios.nivel })] })), tipo === "globalExtra" && (_jsxs(_Fragment, { children: [_jsx("td", { children: promedios.puntaje }), _jsx("td", { children: promedios.nivel })] })), tipo === "estres" && (_jsxs(_Fragment, { children: [_jsx("td", { children: promedios.puntaje }), _jsx("td", { children: promedios.nivel })] })), _jsx("td", {})] })] })] }) }));
}
