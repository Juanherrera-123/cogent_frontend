import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "@/lib/utils";
export default function BloquesDePreguntas({ bloques, preguntas, onFinish }) {
    const [bloqueActual, setBloqueActual] = useState(0);
    const [respuestas, setRespuestas] = useState({});
    const [faltantes, setFaltantes] = useState([]);
    const debeMostrar = (bloque) => {
        if (!bloque.condicional)
            return true;
        if (bloque.condicional === "F1")
            return respuestas[105] === "sí";
        if (bloque.condicional === "F2")
            return respuestas[115] === "sí";
        if (bloque.condicional === "F3")
            return respuestas[88] === "sí";
        return false;
    };
    // Selecciona preguntas del bloque actual (rangos INCLUSIVOS)
    const bloque = bloques[bloqueActual];
    const preguntasBloque = preguntas.slice(bloque.preguntas[0], bloque.preguntas[1] + 1);
    // Validar: solo las obligatorias, excepto si es filtro (tipo yesno y filtro==true siempre cuenta)
    const preguntasFaltantes = preguntasBloque
        .map((preg, i) => ({
        idx: bloque.preguntas[0] + i,
        obligatoria: bloque.obligatorio || preg.filtro, // Si bloque es obligatorio o la pregunta es filtro
        tipo: preg.tipo,
    }))
        .filter(q => q.obligatoria && (respuestas[q.idx] === undefined || respuestas[q.idx] === ""));
    // Cambiar la respuesta
    const handleChange = (idx, valor) => {
        setRespuestas((prev) => ({ ...prev, [idx]: valor }));
        setFaltantes((prev) => prev.filter((f) => f !== idx));
    };
    // Botón siguiente: validación y control del flujo
    const handleSiguiente = () => {
        const falt = preguntasBloque
            .map((preg, i) => ({
            idx: bloque.preguntas[0] + i,
            obligatoria: bloque.obligatorio || preg.filtro,
        }))
            .filter((q) => q.obligatoria && !respuestas[q.idx])
            .map((q) => q.idx);
        if (falt.length > 0) {
            setFaltantes(falt);
            return;
        }
        setFaltantes([]);
        // Buscar el siguiente bloque que deba mostrarse según condicional
        let next = bloqueActual + 1;
        while (next < bloques.length && !debeMostrar(bloques[next])) {
            next++;
        }
        if (next < bloques.length) {
            setBloqueActual(next);
        }
        else {
            onFinish(respuestas);
        }
    };
    // Botón retroceder: busca el bloque anterior visible
    const handleRetroceder = () => {
        let prev = bloqueActual - 1;
        while (prev >= 0 && !debeMostrar(bloques[prev])) {
            prev--;
        }
        if (prev >= 0) {
            setBloqueActual(prev);
        }
    };
    // ¿Existe un bloque previo visible?
    const tieneAnterior = (() => {
        let prev = bloqueActual - 1;
        while (prev >= 0 && !debeMostrar(bloques[prev])) {
            prev--;
        }
        return prev >= 0;
    })();
    // Render
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F8FA] to-[#FFFFFF] relative overflow-hidden px-2", children: [_jsxs("svg", { className: "absolute left-0 top-0 opacity-10 w-[320px] h-[320px] -z-10", viewBox: "0 0 320 320", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "160", cy: "160", r: "140", fill: "url(#grad1)" }), _jsx("defs", { children: _jsxs("linearGradient", { id: "grad1", x1: "60", y1: "30", x2: "260", y2: "260", gradientUnits: "userSpaceOnUse", children: [_jsx("stop", { stopColor: "#2EC4FF" }), _jsx("stop", { offset: "1", stopColor: "#005DFF" })] }) })] }), _jsxs("div", { className: "bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-2xl mx-auto animate-fadeIn flex flex-col gap-4", children: [_jsx("h3", { className: "font-bold text-[#132045] text-xl md:text-2xl mb-2 text-center font-montserrat", children: bloque.enunciado }), preguntasBloque.map((preg, i) => {
                        const idx = bloque.preguntas[0] + i;
                        return (_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "font-semibold block mb-1", children: `${idx + 1}. ${preg.texto.replace(/^\d+\.?\s*/, "")}` }), preg.tipo === "likert" && (_jsxs("select", { className: cn("input", faltantes.includes(idx) && "border-red-500"), value: respuestas[idx] || "", onChange: e => handleChange(idx, e.target.value), children: [_jsx("option", { value: "", children: "Seleccione una opci\u00F3n" }), _jsx("option", { value: "siempre", children: "Siempre" }), _jsx("option", { value: "casi siempre", children: "Casi siempre" }), _jsx("option", { value: "algunas veces", children: "Algunas veces" }), _jsx("option", { value: "casi nunca", children: "Casi nunca" }), _jsx("option", { value: "nunca", children: "Nunca" })] })), preg.tipo === "estres" && (_jsxs("select", { className: cn("input", faltantes.includes(idx) && "border-red-500"), value: respuestas[idx] || "", onChange: e => handleChange(idx, e.target.value), children: [_jsx("option", { value: "", children: "Seleccione una opci\u00F3n" }), _jsx("option", { value: "siempre", children: "Siempre" }), _jsx("option", { value: "casi siempre", children: "Casi siempre" }), _jsx("option", { value: "a veces", children: "A veces" }), _jsx("option", { value: "nunca", children: "Nunca" })] })), preg.tipo === "yesno" && (_jsxs("select", { className: cn("input", faltantes.includes(idx) && "border-red-500"), value: respuestas[idx] || "", onChange: e => handleChange(idx, e.target.value), children: [_jsx("option", { value: "", children: "Seleccione una opci\u00F3n" }), _jsx("option", { value: "s\u00ED", children: "S\u00ED" }), _jsx("option", { value: "no", children: "No" })] }))] }, idx));
                    }), faltantes.length > 0 && (_jsx("div", { className: "text-red-600 font-bold text-center", children: "Responde las preguntas marcadas en rojo." })), _jsxs("div", { className: "flex gap-4 mt-4", children: [tieneAnterior && (_jsx("button", { className: "btn-secondary", onClick: handleRetroceder, children: "Retroceder" })), _jsx("button", { className: "px-6 py-3 rounded-[16px] font-bold text-white bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]", onClick: handleSiguiente, children: bloqueActual === bloques.length - 1 ? "Finalizar" : "Siguiente" })] })] })] }));
}
