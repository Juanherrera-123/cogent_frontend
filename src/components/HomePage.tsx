import React from "react";
import LogoCogent from "../logo_texto.png";

// Logo of Psykhe Consultores is served from the public directory

type Props = {
  onStartSurvey: () => void;
  onViewResults: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
};

export default function HomePage({ onStartSurvey, onViewResults, onPrivacy, onTerms }: Props) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="fixed top-[7vh] right-[8vw] w-[450px] h-[450px] pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 w-[160px] h-[160px] -translate-x-1/2 rotate-45 bg-gradient-to-br from-blue-600 to-blue-200 opacity-20 rounded-3xl shadow-lg"></div>
        <div className="absolute top-1/2 right-0 w-[160px] h-[160px] -translate-y-1/2 rotate-45 bg-gradient-to-br from-blue-600 to-blue-200 opacity-20 rounded-3xl shadow-lg"></div>
        <div className="absolute bottom-0 left-1/2 w-[160px] h-[160px] -translate-x-1/2 rotate-45 bg-gradient-to-br from-blue-600 to-blue-200 opacity-20 rounded-3xl shadow-lg"></div>
        <div className="absolute top-1/2 left-0 w-[160px] h-[160px] -translate-y-1/2 rotate-45 bg-gradient-to-br from-blue-600 to-blue-200 opacity-20 rounded-3xl shadow-lg"></div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-8 animate-fadeIn">
        <img
          src="/Logo_Psykhe.png"
          alt="Psykhe Consultores Logo"
          className="w-28 h-28 drop-shadow-lg"
          style={{ borderRadius: '18px' }}
        />
        <img
          src={LogoCogent}
          alt="COGENT Logo"
          className="w-28 h-28 drop-shadow-lg"
          style={{ borderRadius: '18px' }}
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-[#132045] text-center mb-2 font-montserrat animate-fadeIn">
        Bienvenido a Cogent
      </h1>
      <p className="text-xl text-[#313B4A] mb-12 text-center max-w-md font-montserrat animate-fadeIn delay-150">
        responde tu encuesta de riesgos de manera fácil, segura y completamente confidencial.
      </p>

      <div className="flex flex-col gap-6 w-full max-w-xs animate-fadeIn delay-300">
        <button
          className="py-4 w-full flex items-center justify-center gap-2 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]"
          onClick={onStartSurvey}
        >
          <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-white bg-opacity-20">
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="9" />
              <path d="M11 7v8M7 11h8" />
            </svg>
          </span>
          Empezar Nueva Encuesta
        </button>

        <button
          className="py-4 w-full flex items-center justify-center gap-2 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-[#005DFF] to-[#0053B3] shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]"
          onClick={onViewResults}
        >
          <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-white bg-opacity-20">
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="10" width="3" height="6" rx="1" />
              <rect x="9.5" y="6" width="3" height="10" rx="1" />
              <rect x="15" y="13" width="3" height="3" rx="1" />
            </svg>
          </span>
          Explorar Resultados
        </button>
      </div>

      <p className="mt-8 text-sm text-[#6C7A89] font-montserrat animate-fadeIn delay-500">
        <button
          onClick={onPrivacy}
          className="underline hover:text-[#005DFF] focus:outline-none"
        >
          Política de Privacidad
        </button>
      </p>
      <p className="mt-2 text-sm text-[#6C7A89] font-montserrat animate-fadeIn delay-500">
        <button
          onClick={onTerms}
          className="underline hover:text-[#005DFF] focus:outline-none"
        >
          Términos y Condiciones
        </button>
      </p>
    </div>
  );
}
