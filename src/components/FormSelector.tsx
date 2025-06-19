import React from "react";

export default function FormSelector({
  onSelect,
}: {
  onSelect: (form: "A" | "B") => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F8FA] to-[#FFFFFF] px-2 relative overflow-hidden">
      {/* Background decorative SVG */}
      <svg
        className="absolute left-0 top-0 opacity-10 w-[320px] h-[320px] -z-10"
        viewBox="0 0 320 320"
      >
        <circle cx="160" cy="160" r="140" fill="url(#grad1)" />
        <defs>
          <linearGradient
            id="grad1"
            x1="60"
            y1="30"
            x2="260"
            y2="260"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2EC4FF" />
            <stop offset="1" stopColor="#005DFF" />
          </linearGradient>
        </defs>
      </svg>

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
          <span className="text-2xl">👔</span>
          Forma A (Jefes/profesionales/técnicos)
        </button>

        <button
          onClick={() => onSelect("B")}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#005DFF] to-[#0053B3] shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]"
        >
          <span className="text-2xl">🔧</span>
          Forma B (Auxiliares/Operarios)
        </button>
      </div>
    </div>
  );
}
