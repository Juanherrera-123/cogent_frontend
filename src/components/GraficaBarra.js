import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList, } from "recharts";
const gradientes = {
    "Riesgo muy bajo": { id: "riesgo-muy-bajo", from: "#bfdbfe", to: "#3b82f6" },
    "Riesgo bajo": { id: "riesgo-bajo", from: "#bbf7d0", to: "#22c55e" },
    "Riesgo medio": { id: "riesgo-medio", from: "#fef9c3", to: "#facc15" },
    "Riesgo alto": { id: "riesgo-alto", from: "#fed7aa", to: "#f97316" },
    "Riesgo muy alto": { id: "riesgo-muy-alto", from: "#fecaca", to: "#ef4444" },
};
const baseColores = Object.fromEntries(Object.entries(gradientes).map(([nivel, g]) => [nivel, `url(#${g.id})`]));
const colorPorNivel = {
    ...baseColores,
    "Muy bajo": baseColores["Riesgo muy bajo"],
    Bajo: baseColores["Riesgo bajo"],
    Medio: baseColores["Riesgo medio"],
    Alto: baseColores["Riesgo alto"],
    "Muy alto": baseColores["Riesgo muy alto"],
};
const nivelesRiesgo = Object.keys(gradientes);
export default function GraficaBarra({ resumen, titulo, chartType, }) {
    return (_jsxs("div", { className: "flex-1 min-h-[450px]", children: [_jsx("h4", { className: "font-bold mb-2 text-primary-main", children: titulo }), _jsx(ResponsiveContainer, { width: "100%", height: 450, children: chartType === "pie" ? (_jsxs(PieChart, { children: [_jsx("defs", { children: Object.values(gradientes).map((g) => (_jsxs("linearGradient", { id: g.id, x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: g.from }), _jsx("stop", { offset: "100%", stopColor: g.to })] }, g.id))) }), _jsx(Pie, { data: resumen, dataKey: "indice", nameKey: "nombre", label: true, children: resumen.map((d, i) => (_jsx(Cell, { fill: colorPorNivel[d.nivel] }, i))) }), _jsx(Tooltip, { labelStyle: { color: "var(--text-main)" }, itemStyle: { color: "var(--text-main)" } }), _jsx(Legend, { wrapperStyle: { color: "var(--text-main)" } })] })) : (_jsxs(BarChart, { data: resumen, barCategoryGap: chartType === "histogram" ? 0 : undefined, children: [_jsx("defs", { children: Object.values(gradientes).map((g) => (_jsxs("linearGradient", { id: g.id, x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: g.from }), _jsx("stop", { offset: "100%", stopColor: g.to })] }, g.id))) }), _jsx(XAxis, { dataKey: "nombre", interval: 0, angle: -18, textAnchor: "end", height: 70 }), _jsx(YAxis, { type: "number", domain: [0, 4], ticks: [0, 1, 2, 3, 4], tickFormatter: (v) => nivelesRiesgo[v] }), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsxs(Bar, { dataKey: "indice", name: "Nivel", children: [_jsx(LabelList, { dataKey: "nivel", position: "top" }), resumen.map((d, i) => (_jsx(Cell, { fill: colorPorNivel[d.nivel] }, i)))] })] })) })] }));
}
