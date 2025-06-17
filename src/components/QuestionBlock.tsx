// src/components/QuestionBlock.tsx

import React, { useState } from "react";

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

export default function QuestionBlock({ onNext }: { onNext: () => void }) {
  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(0));

  const handleResponse = (questionIdx: number, value: number) => {
    const newResponses = [...responses];
    newResponses[questionIdx] = value;
    setResponses(newResponses);
  };

  // Validación: todas deben estar respondidas
  const allAnswered = responses.every((val) => val > 0);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl mx-auto mt-10">
      <h2 className="font-display text-2xl text-cogent-navy mb-6">Bloque 1 de preguntas</h2>
      <form>
        {questions.map((q, idx) => (
          <div key={q.id} className="mb-6">
            <p className="font-sans text-cogent-navy mb-2">{q.text}</p>
            <div className="flex gap-4">
              {options.map((opt) => (
                <label key={opt.value} className="font-sans">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt.value}
                    checked={responses[idx] === opt.value}
                    onChange={() => handleResponse(idx, opt.value)}
                  />
                  <span className="ml-2">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>
      <button
        className={`mt-4 px-6 py-2 rounded-xl text-white font-bold ${
          allAnswered ? "bg-cogent-blue hover:bg-cogent-deep" : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!allAnswered}
        onClick={onNext}
      >
        Siguiente bloque
      </button>
    </div>
  );
}
