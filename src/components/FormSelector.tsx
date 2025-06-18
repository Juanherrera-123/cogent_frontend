import React from "react";

export default function FormSelector({ onSelect }: { onSelect: (form: "A" | "B") => void }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto mt-10">
      <h2 className="font-display text-2xl text-text-main mb-6">Selecciona el tipo de formulario</h2>
      <div className="flex flex-col gap-4">
        <button
          className="bg-primary-main hover:bg-primary-dark text-white font-bold py-3 rounded-xl"
          onClick={() => onSelect("A")}
        >
          Forma A (Jefes/profesionales/tecnicos)
        </button>
        <button
          className="bg-primary-main hover:bg-primary-dark text-white font-bold py-3 rounded-xl"
          onClick={() => onSelect("B")}
        >
          Forma B (Auxiliares/Operarios)
        </button>
      </div>
    </div>
  );
}
