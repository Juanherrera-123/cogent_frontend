import React from "react";

type SelectorFormaProps = {
  onSeleccion: (tipo: "A" | "B") => void;
};

export default function SelectorForma({ onSeleccion }: SelectorFormaProps) {
  return (
    <div className="max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
      <h2 className="text-2xl font-display text-cogent-blue mb-6">
        Seleccione el tipo de formulario a diligenciar
      </h2>
      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Forma A */}
        <button
          className="flex-1 p-6 border-2 border-cogent-blue rounded-xl hover:bg-cogent-sky hover:text-white transition font-bold text-xl"
          onClick={() => onSeleccion("A")}
        >
          <div className="mb-2 text-lg">Forma A</div>
          <div className="text-base font-sans">
            <b>Con personal a cargo</b><br />
            (personas que coordinan a otros trabajadores)
          </div>
        </button>
        {/* Forma B */}
        <button
          className="flex-1 p-6 border-2 border-cogent-blue rounded-xl hover:bg-cogent-sky hover:text-white transition font-bold text-xl"
          onClick={() => onSeleccion("B")}
        >
          <div className="mb-2 text-lg">Forma B</div>
          <div className="text-base font-sans">
            <b>Sin personal a cargo</b><br />
            (trabajadores sin personal a cargo)
          </div>
        </button>
      </div>
    </div>
  );
}
