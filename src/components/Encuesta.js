import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { bloquesFormaA, preguntasA, bloquesFormaB, preguntasB } from "../data/preguntas";
// Puedes recibir el tipo por props o state
export default function Encuesta({ tipo = "A" }) {
    // Selecciona el set de preguntas y bloques según tipo
    const bloques = tipo === "A" ? bloquesFormaA : bloquesFormaB;
    const preguntas = tipo === "A" ? preguntasA : preguntasB;
    const [bloqueActual, setBloqueActual] = useState(0);
    // Estado para los filtros (sí/no en filtros)
    const [filtros, setFiltros] = useState({});
    // Obtiene bloque actual
    const bloque = bloques[bloqueActual];
    // Función para avanzar al siguiente bloque, manejando filtros
    const siguiente = () => {
        let next = bloqueActual + 1;
        // Si el siguiente bloque es condicional, revisa filtro
        while (next < bloques.length &&
            bloques[next].condicional &&
            !filtros[bloques[next].condicional]) {
            next++; // Salta el bloque si el filtro no aplica
        }
        setBloqueActual(next);
    };
    // Manejador de respuesta a filtro
    const responderFiltro = (filtroKey, valor) => {
        setFiltros({ ...filtros, [filtroKey]: valor });
        siguiente();
    };
    // Renderiza preguntas del bloque
    const renderPreguntas = () => preguntas
        .slice(bloque.preguntas[0], bloque.preguntas[1] + 1)
        .map((pregunta, idx) => (_jsx("div", { children: _jsx("p", { children: pregunta.texto }) }, idx + bloque.preguntas[0])));
    // ¿Hay un filtro entre bloques?
    const filtroBloque = (() => {
        if (tipo === "A") {
            if (bloqueActual === 13)
                return { ...preguntas[105], key: "F1" };
            if (bloqueActual === 14)
                return { ...preguntas[115], key: "F2" };
        }
        else if (tipo === "B" && bloqueActual === 12) {
            return { ...preguntas[88], key: "F3" };
        }
        return null;
    })();
    // Render
    return (_jsxs("div", { className: "max-w-xl mx-auto my-10", children: [_jsx("h2", { className: "text-2xl font-display text-primary-main mb-2", children: bloque.enunciado }), renderPreguntas(), filtroBloque && (_jsxs("div", { className: "my-6", children: [_jsx("p", { className: "font-bold", children: filtroBloque.texto }), _jsx("button", { onClick: () => responderFiltro(filtroBloque.key, true), className: "mr-2 bg-primary-main text-white p-2 rounded", children: "S\u00ED" }), _jsx("button", { onClick: () => responderFiltro(filtroBloque.key, false), className: "bg-primary-main text-white p-2 rounded", children: "No" })] })), !filtroBloque && (_jsx("button", { className: "mt-4 bg-primary-light text-white p-2 px-4 rounded", onClick: siguiente, children: "Siguiente bloque" }))] }));
}
