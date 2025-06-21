import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList, } from "recharts";
// Blue palette used for chart segments
const coloresAzulFicha = [
    "#BBDEFB", // light blue
    "#90CAF9",
    "#64B5F6",
    "#42A5F5",
    "#2196F3",
    "#1976D2", // dark blue
];
export default function GraficaBarraCategorias({ datos, titulo, chartType, }) {
    const total = datos.reduce((acc, d) => acc + (typeof d.cantidad === "number" ? d.cantidad : 0), 0);
    const datosConPorcentaje = datos.map((d) => ({
        ...d,
        porcentaje: total ? (d.cantidad / total) * 100 : 0,
        label: `${d.cantidad} (${total ? ((d.cantidad / total) * 100).toFixed(0) : 0}%)`,
    }));
    return (_jsxs("div", { className: "flex-1 min-h-[450px]", children: [_jsx("h4", { className: "font-bold mb-2 text-primary-main", children: titulo }), _jsx(ResponsiveContainer, { width: "100%", height: 450, children: chartType === "pie" ? (_jsxs(PieChart, { children: [_jsx(Pie, { data: datosConPorcentaje, dataKey: "cantidad", nameKey: "nombre", label: ({ payload }) => `${payload.nombre}: ${payload.cantidad} (${payload.porcentaje.toFixed(0)}%)`, children: datosConPorcentaje.map((_, i) => (_jsx(Cell, { fill: coloresAzulFicha[i % coloresAzulFicha.length] }, i))) }), _jsx(Tooltip, { labelStyle: { color: "var(--text-main)" }, itemStyle: { color: "var(--text-main)" } }), _jsx(Legend, { wrapperStyle: { color: "var(--text-main)" } })] })) : (_jsxs(BarChart, { data: datosConPorcentaje, barCategoryGap: chartType === "histogram" ? 0 : undefined, children: [_jsx(XAxis, { dataKey: "nombre", interval: 0, angle: -18, textAnchor: "end", height: 70, tick: { fill: "var(--text-main)", fontSize: 12 } }), _jsx(YAxis, { allowDecimals: false, tick: { fill: "var(--text-main)", fontSize: 12 } }), _jsx(Tooltip, { labelStyle: { color: "var(--text-main)" }, itemStyle: { color: "var(--text-main)" } }), _jsx(Legend, { wrapperStyle: { color: "var(--text-main)" } }), _jsxs(Bar, { dataKey: "cantidad", name: "Cantidad", children: [_jsx(LabelList, { dataKey: "label", position: "top" }), datosConPorcentaje.map((_, i) => (_jsx(Cell, { fill: coloresAzulFicha[i % coloresAzulFicha.length] }, i)))] })] })) })] }));
}
