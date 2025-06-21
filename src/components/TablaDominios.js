import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { baremosFormaA } from "@/data/baremosFormaA";
import { baremosFormaB } from "@/data/baremosFormaB";
export default function TablaDominios({ datos, dominios, keyResultado }) {
    const nivelesRiesgo = [
        "Riesgo muy bajo",
        "Riesgo bajo",
        "Riesgo medio",
        "Riesgo alto",
        "Riesgo muy alto",
    ];
    const promedios = useMemo(() => {
        const origen = keyResultado.toLowerCase().includes("formab") ? "formaB" : "formaA";
        return dominios.map((dom) => {
            const valores = datos
                .map((d) => {
                const res = d[keyResultado];
                let seccion = res?.dominios?.[dom];
                if (Array.isArray(res?.dominios)) {
                    seccion = res.dominios.find((x) => x.nombre === dom);
                }
                if (typeof seccion === "object") {
                    return seccion.transformado ?? seccion.puntajeTransformado;
                }
                return res?.puntajesDominio?.[dom];
            })
                .filter((v) => typeof v === "number");
            const prom = valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
            const promedio = Math.round(prom * 10) / 10;
            const baremos = origen === "formaA"
                ? baremosFormaA.dominios[dom] || []
                : baremosFormaB.dominio[dom] || [];
            const nivel = baremos.find((b) => promedio >= b.min && promedio <= b.max)?.nivel || "No clasificado";
            return {
                promedio,
                nivel: nivel === "Sin riesgo" ? "Riesgo muy bajo" : nivel,
            };
        });
    }, [datos, dominios, keyResultado]);
    if (datos.length === 0) {
        return _jsx("div", { className: "py-6 text-gray-400", children: "No hay resultados de dominios para mostrar." });
    }
    return (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-xs border mt-2 rounded-lg overflow-hidden font-montserrat text-[#172349]", children: [_jsx("thead", { className: "bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] text-white font-semibold", children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Empresa" }), _jsx("th", { children: "Nombre" }), dominios.map((dom, idx) => (_jsx("th", { children: dom }, idx)))] }) }), _jsxs("tbody", { children: [datos.map((d, i) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { children: i + 1 }), _jsx("td", { children: d.ficha?.empresa }), _jsx("td", { children: d.ficha?.nombre }), dominios.map((dom, idx) => {
                                    const res = d[keyResultado];
                                    let seccion = res?.dominios?.[dom];
                                    if (Array.isArray(res?.dominios)) {
                                        const item = res.dominios.find((x) => x.nombre === dom);
                                        seccion = item;
                                    }
                                    const valor = typeof seccion === "object"
                                        ? seccion.transformado ?? seccion.puntajeTransformado
                                        : res?.puntajesDominio?.[dom];
                                    return _jsx("td", { children: valor ?? "" }, idx);
                                })] }, i))), _jsxs("tr", { className: "font-semibold bg-gray-100", children: [_jsx("td", {}), _jsx("td", { children: "Promedio" }), _jsx("td", {}), promedios.map((p, idx) => (_jsx("td", { children: p.promedio || "" }, idx)))] }), _jsxs("tr", { className: "font-semibold bg-gray-100", children: [_jsx("td", {}), _jsx("td", { children: "Nivel" }), _jsx("td", {}), promedios.map((p, idx) => (_jsx("td", { children: p.nivel || "" }, idx)))] })] })] }) }));
}
