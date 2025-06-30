import React from "react";
import BriefcaseIcon from "@/components/icons/BriefcaseIcon";
import WrenchIcon from "@/components/icons/WrenchIcon";

export default function FormSelector({
  onSelect,
}: {
  onSelect: (form: "A" | "B") => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-2 relative overflow-hidden">
      <div className="background-shapes">
        <div className="shape rhombus rhombus-1"></div>
        <div className="shape rhombus rhombus-2"></div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-md mx-auto animate-fadeIn flex flex-col items-center">
        {/* Optional logo */}
        <img src="/logo_forma.png" alt="COGENT" className="w-16 mb-6" />

        <h2 className="text-2xl md:text-3xl font-bold text-[#132045] text-center mb-8 font-montserrat">
          Selecciona el tipo de formulario
        </h2>

        <button
          onClick={() => onSelect("A")}
          className="w-full flex items-center justify-center gap-3 py-4 mb-5 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]"
        >
          <BriefcaseIcon />
          Forma A (Jefes/profesionales/técnicos)
        </button>

        <button
          onClick={() => onSelect("B")}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#005DFF] to-[#0053B3] shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]"
        >
          <WrenchIcon />
          Forma B (Auxiliares/Operarios)
        </button>
      </div>
    </div>
  );
}
