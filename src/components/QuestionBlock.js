import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/QuestionBlock.tsx
import { useState } from "react";
const questions = [
    {
        id: 1,
        text: "¿Siente que su trabajo le exige estar muy atento o concentrado?",
    },
    {
        id: 2,
        text: "¿Debe atender asuntos de manera inmediata en su trabajo?",
    },
    {
        id: 3,
        text: "¿Tiene que trabajar muy rápido?",
    },
    {
        id: 4,
        text: "¿Su trabajo le exige hacer muchas cosas al mismo tiempo?",
    },
    {
        id: 5,
        text: "¿Le exigen resultados en plazos muy cortos?",
    },
    {
        id: 6,
        text: "¿Debe tomar decisiones difíciles en su trabajo?",
    },
];
const options = [
    { value: 1, label: "Nunca" },
    { value: 2, label: "Casi nunca" },
    { value: 3, label: "Algunas veces" },
    { value: 4, label: "Casi siempre" },
    { value: 5, label: "Siempre" },
];
export default function QuestionBlock({ onNext }) {
    const [responses, setResponses] = useState(Array(questions.length).fill(0));
    const handleResponse = (questionIdx, value) => {
        const newResponses = [...responses];
        newResponses[questionIdx] = value;
        setResponses(newResponses);
    };
    // Validación: todas deben estar respondidas
    const allAnswered = responses.every((val) => val > 0);
    return (_jsxs("div", { className: "bg-white shadow-xl rounded-2xl p-8 max-w-xl mx-auto mt-10", children: [_jsx("h2", { className: "font-display text-2xl text-text-main mb-6", children: "Bloque 1 de preguntas" }), _jsx("form", { children: questions.map((q, idx) => (_jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "font-sans text-text-main mb-2", children: q.text }), _jsx("div", { className: "flex gap-4", children: options.map((opt) => (_jsxs("label", { className: "font-sans", children: [_jsx("input", { type: "radio", name: `q${q.id}`, value: opt.value, checked: responses[idx] === opt.value, onChange: () => handleResponse(idx, opt.value) }), _jsx("span", { className: "ml-2", children: opt.label })] }, opt.value))) })] }, q.id))) }), _jsx("button", { className: `mt-4 px-6 py-2 rounded-xl text-white font-bold ${allAnswered ? "bg-primary-main hover:bg-primary-dark" : "bg-gray-300 cursor-not-allowed"}`, disabled: !allAnswered, onClick: onNext, children: "Siguiente bloque" })] }));
}
