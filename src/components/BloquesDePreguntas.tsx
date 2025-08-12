import React, { useState } from "react";
import { cn } from "@/lib/utils";

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
  /**
   * Devuelve todas las respuestas en el orden correcto.
   * El array resultante tendrá la misma longitud que el total
   * de preguntas recibidas por el componente.
   */
  onFinish: (respuestas: string[]) => void;
};

export default function BloquesDePreguntas({ bloques, preguntas, onFinish }: Props) {
  const [bloqueActual, setBloqueActual] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [faltantes, setFaltantes] = useState<number[]>([]);

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

  // Cambiar la respuesta
  const handleChange = (idx: number, valor: string) => {
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
    } else {
      const ordered = Array.from(
        { length: preguntas.length },
        (_, i) => respuestas[i] ?? ""
      );
      onFinish(ordered);
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-2">
      <div className="background-shapes">
        <div className="shape rhombus rhombus-1"></div>
        <div className="shape rhombus rhombus-2"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-2xl mx-auto animate-fadeIn flex flex-col gap-4">
        <h3 className="font-bold text-[#132045] text-xl md:text-2xl mb-2 text-center font-montserrat">
          {bloque.enunciado}
        </h3>
        {preguntasBloque.map((preg, i) => {
          const idx = bloque.preguntas[0] + i;
          return (
            <div key={idx} className="mb-4">
              <label
                className={cn(
                  "font-semibold block mb-1",
                  faltantes.includes(idx) && "text-red-500"
                )}
              >
                {`${idx + 1}. ${preg.texto.replace(/^\d+\.?\s*/, "")}`}
              </label>
              {preg.tipo === "likert" && (
                <select
                  className={cn(
                    "input",
                    faltantes.includes(idx) && "border-red-500"
                  )}
                  value={respuestas[idx] || ""}
                  onChange={(e) => handleChange(idx, e.target.value)}
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
                  className={cn(
                    "input",
                    faltantes.includes(idx) && "border-red-500"
                  )}
                  value={respuestas[idx] || ""}
                  onChange={(e) => handleChange(idx, e.target.value)}
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
                  className={cn(
                    "input",
                    faltantes.includes(idx) && "border-red-500"
                  )}
                  value={respuestas[idx] || ""}
                  onChange={(e) => handleChange(idx, e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="sí">Sí</option>
                  <option value="no">No</option>
                </select>
              )}
            </div>
          );
        })}
      {faltantes.length > 0 && (
        <div className="text-red-600 font-bold text-center">
          Responde las preguntas marcadas en rojo.
        </div>
      )}
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
