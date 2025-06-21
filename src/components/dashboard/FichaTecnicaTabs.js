import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GraficaBarraCategorias from "../GraficaBarraCategorias";
export default function FichaTecnicaTabs({ categorias, categoria, onChange, conteos, chartType, tabClass, }) {
    return (_jsxs(Tabs, { value: categoria, onValueChange: onChange, className: "w-full", children: [_jsx(TabsList, { className: "mb-6 py-2 pl-4 pr-4 scroll-pl-4 w-full flex gap-2 overflow-x-auto whitespace-nowrap", children: categorias.map((c) => (_jsx(TabsTrigger, { className: tabClass, value: c.key, children: c.label }, c.key))) }), categorias.map((c) => (_jsx(TabsContent, { value: c.key, children: _jsx("div", { className: "grid gap-4", children: _jsx(GraficaBarraCategorias, { datos: conteos[c.key], titulo: c.label, chartType: chartType }) }) }, c.key)))] }));
}
