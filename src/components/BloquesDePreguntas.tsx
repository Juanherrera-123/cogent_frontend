import React, { useState } from "react";

type Bloque = {
  bloque: number;
  preguntas: number[]; // índices de inicio y fin (INCLUSIVO)
  enunciado: string;
  condicional?: string | null; // "F1", "F2", "F3" o null
  obligatorio: boolean;
};

type Pregunta = {
  texto: string;
  tipo: string; // "likert" | "yesno" | "estres"
  filtro?: boolean; // true si es pregunta filtro (sí/no)
};

type Props = {
  bloques: Bloque[];
  preguntas: Pregunta[];
  onFinish: (respuestas: Record<number, string>) => void;
};

export default function BloquesDePreguntas({ bloques, preguntas, onFinish }: Props) {
  const [bloqueActual, setBloqueActual] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});

  const debeMostrar = (bloque: Bloque) => {
    if (!bloque.condicional) return true;
    if (bloque.condicional === "F1") return respuestas[105] === "sí";
    if (bloque.condicional === "F2") return respuestas[115] === "sí";
    if (bloque.condicional === "F3") return respuestas[88] === "sí";
    return false;
  };

  // Selecciona preguntas del bloque actual (rangos INCLUSIVOS)
  const bloque = bloques[bloqueActual];
  const preguntasBloque = preguntas.slice(
    bloque.preguntas[0],
    bloque.preguntas[1] + 1
  );

  // Validar: solo las obligatorias, excepto si es filtro (tipo yesno y filtro==true siempre cuenta)
  const preguntasFaltantes = preguntasBloque
    .map((preg, i) => ({
      idx: bloque.preguntas[0] + i,
      obligatoria: bloque.obligatorio || preg.filtro, // Si bloque es obligatorio o la pregunta es filtro
      tipo: preg.tipo,
    }))
    .filter(q =>
      q.obligatoria && (respuestas[q.idx] === undefined || respuestas[q.idx] === "")
    );

  // Cambiar la respuesta
  const handleChange = (idx: number, valor: string) => {
    setRespuestas((prev) => ({ ...prev, [idx]: valor }));
  };

  // Botón siguiente: validación y control del flujo
  const handleSiguiente = () => {
    if (preguntasFaltantes.length > 0) {
      alert("Por favor responde todas las preguntas obligatorias.");
      return;
    }
    // Buscar el siguiente bloque que deba mostrarse según condicional
    let next = bloqueActual + 1;
    while (next < bloques.length && !debeMostrar(bloques[next])) {
      next++;
    }
    if (next < bloques.length) {
      setBloqueActual(next);
    } else {
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F8FA] to-[#FFFFFF] relative overflow-hidden px-2">
      <svg
        className="absolute left-0 top-0 opacity-10 w-[320px] h-[320px] -z-10"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="160" cy="160" r="140" fill="url(#grad1)" />
        <defs>
          <linearGradient id="grad1" x1="60" y1="30" x2="260" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2EC4FF" />
            <stop offset="1" stopColor="#005DFF" />
          </linearGradient>
        </defs>
      </svg>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-2xl mx-auto animate-fadeIn flex flex-col gap-4">
        <h3 className="font-bold text-[#132045] text-xl md:text-2xl mb-2 text-center font-montserrat">
          {bloque.enunciado}
        </h3>
      {preguntasBloque.map((preg, i) => {
  const idx = bloque.preguntas[0] + i;
  return (
    <div key={idx} className="mb-4">
      <label className="font-semibold block mb-1">
        {`${idx + 1}. ${preg.texto.replace(/^\d+\.?\s*/, "")}`}
      </label>
      {preg.tipo === "likert" && (
        <select
          className="input"
          value={respuestas[idx] || ""}
          onChange={e => handleChange(idx, e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          <option value="siempre">Siempre</option>
          <option value="casi siempre">Casi siempre</option>
          <option value="algunas veces">Algunas veces</option>
          <option value="casi nunca">Casi nunca</option>
          <option value="nunca">Nunca</option>
        </select>
      )}
      {preg.tipo === "estres" && (
        <select
          className="input"
          value={respuestas[idx] || ""}
          onChange={e => handleChange(idx, e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          <option value="siempre">Siempre</option>
          <option value="casi siempre">Casi siempre</option>
          <option value="a veces">A veces</option>
          <option value="nunca">Nunca</option>
        </select>
      )}
      {preg.tipo === "yesno" && (
        <select
          className="input"
          value={respuestas[idx] || ""}
          onChange={e => handleChange(idx, e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          <option value="sí">Sí</option>
          <option value="no">No</option>
        </select>
        )}
       </div>
      );
      })} 
      <div className="flex gap-4 mt-4">
        {tieneAnterior && (
          <button

            className="btn-secondary"
            onClick={handleRetroceder}
          >
            Retroceder
          </button>
        )}
        <button
          className="px-6 py-3 rounded-[16px] font-bold text-white bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]"
          onClick={handleSiguiente}
        >
          {bloqueActual === bloques.length - 1 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
    </div>
  );
}
