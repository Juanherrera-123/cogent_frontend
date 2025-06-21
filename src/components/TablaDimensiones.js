import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { baremosFormaA } from "@/data/baremosFormaA";
import { baremosFormaB } from "@/data/baremosFormaB";
export default function TablaDimensiones({ datos, dimensiones, keyResultado }) {
    const nivelesRiesgo = [
        "Riesgo muy bajo",
        "Riesgo bajo",
        "Riesgo medio",
        "Riesgo alto",
        "Riesgo muy alto",
    ];
    const promedios = useMemo(() => {
        const origen = keyResultado.toLowerCase().includes("formab") ? "formaB" : "formaA";
        return dimensiones.map((dim) => {
            const valores = datos
                .map((d) => {
                const res = d[keyResultado];
                let seccion = res?.dimensiones?.[dim];
                if (Array.isArray(res?.dimensiones)) {
                    seccion = res.dimensiones.find((x) => x.nombre === dim);
                }
                if (typeof seccion === "object") {
                    return seccion.transformado ?? seccion.puntajeTransformado;
                }
                return res?.puntajesDimension?.[dim];
            })
                .filter((v) => typeof v === "number");
            const prom = valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
            const promedio = Math.round(prom * 10) / 10;
            const baremos = origen === "formaA"
                ? baremosFormaA.dimensiones[dim] || []
                : baremosFormaB.dimension[dim] || [];
            const nivel = baremos.find((b) => promedio >= b.min && promedio <= b.max)?.nivel || "No clasificado";
            return {
                promedio,
                nivel: nivel === "Sin riesgo" ? "Riesgo muy bajo" : nivel,
            };
        });
    }, [datos, dimensiones, keyResultado]);
    if (datos.length === 0) {
        return _jsx("div", { className: "py-6 text-gray-400", children: "No hay resultados de dimensiones para mostrar." });
    }
    return (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]", children: [_jsx("thead", { className: "bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold", children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Empresa" }), _jsx("th", { children: "Nombre" }), dimensiones.map((dim, idx) => (_jsx("th", { children: dim }, idx)))] }) }), _jsxs("tbody", { children: [datos.map((d, i) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { children: i + 1 }), _jsx("td", { children: d.ficha?.empresa }), _jsx("td", { children: d.ficha?.nombre }), dimensiones.map((dim, idx) => {
                                    const res = d[keyResultado];
                                    let seccion = res?.dimensiones?.[dim];
                                    if (Array.isArray(res?.dimensiones)) {
                                        const item = res.dimensiones.find((x) => x.nombre === dim);
                                        seccion = item;
                                    }
                                    const valor = typeof seccion === "object"
                                        ? seccion.transformado ?? seccion.puntajeTransformado
                                        : res?.puntajesDimension?.[dim];
                                    return _jsx("td", { children: valor ?? "" }, idx);
                                })] }, i))), _jsxs("tr", { className: "font-semibold bg-gray-100", children: [_jsx("td", {}), _jsx("td", { children: "Promedio" }), _jsx("td", {}), promedios.map((p, idx) => (_jsx("td", { children: p.promedio || "" }, idx)))] }), _jsxs("tr", { className: "font-semibold bg-gray-100", children: [_jsx("td", {}), _jsx("td", { children: "Nivel" }), _jsx("td", {}), promedios.map((p, idx) => (_jsx("td", { children: p.nivel || "" }, idx)))] })] })] }) }));
}
