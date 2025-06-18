import React, { useState } from "react";

type Bloque = {
  bloque: number;
  preguntas: [number, number]; // índices de inicio y fin (INCLUSIVO)
  enunciado: string;
  condicional?: string | null; // "F1", "F2", "F3" o null
  obligatorio: boolean;
};

type Pregunta = {
  texto: string;
  tipo: "likert" | "yesno" | "estres";
  filtro?: boolean; // true si es pregunta filtro (sí/no)
};

type Props = {
  bloques: Bloque[];
  preguntas: Pregunta[];
  onFinish: (respuestas: any) => void;
};

export default function BloquesDePreguntas({ bloques, preguntas, onFinish }: Props) {
  const [bloqueActual, setBloqueActual] = useState(0);
  const [respuestas, setRespuestas] = useState<any>({});

  // Saca la respuesta de la pregunta filtro (índice de pregunta filtro == índice en preguntas[])
  const getFiltroRespuesta = (nombre: "F1" | "F2" | "F3") => {
    // Buscar el bloque condicional correspondiente
    const bloqueFiltro = bloques.find(b => b.condicional === null && b.enunciado.toLowerCase().includes(nombre.toLowerCase()));
    // Si no está enunciado el nombre, buscar por orden fijo
    let idx = null;
    if (nombre === "F1") idx = 104;
    if (nombre === "F2") idx = 114;
    if (nombre === "F3") idx = 88;
    return respuestas[idx];
  };

  // Valida si el bloque debe mostrarse según condicional
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
  const handleChange = (idx: number, valor: any) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: valor }));
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
    <div className="max-w-2xl bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-4">
      <h3 className="font-bold text-primary-main text-xl mb-2">
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
            className="bg-gray-300 text-text-main px-8 py-2 rounded-lg font-bold shadow hover:bg-gray-400"
            onClick={handleRetroceder}
          >
            Retroceder
          </button>
        )}
        <button
          className="bg-primary-main text-white px-8 py-2 rounded-lg font-bold shadow hover:bg-primary-light"
          onClick={handleSiguiente}
        >
          {bloqueActual === bloques.length - 1 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
