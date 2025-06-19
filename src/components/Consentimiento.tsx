import React from "react";

export default function Consentimiento({ onAceptar }: { onAceptar: () => void }) {
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

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-xl mx-auto animate-fadeIn flex flex-col items-center">
        <div className="flex items-center justify-center gap-6 mb-6">
          <img src="/Logo_Javeriana.png" alt="Logo Javeriana" className="h-12 w-auto object-contain" />
          <img src="/Logo_Psykhe.png" alt="Logo Psykhe" className="h-12 w-auto object-contain" />
          <img src="/logo_texto.png" alt="Logo Cogent" className="h-12 w-auto object-contain" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#132045] text-center font-montserrat mb-1">
          Aplicación Batería de Riesgos Psicosociales
        </h2>
        <div className="text-base font-semibold text-[#2EC4FF] mb-6 text-center font-montserrat">
          Resolución 2764 e 2022
        </div>

        <div className="text-[#313B4A] text-justify font-montserrat text-base md:text-lg leading-relaxed mb-8 space-y-4">
          <p>
            He sido claramente informado(a) sobre los objetivos y procedimientos, acepto de manera voluntaria, participar en la aplicación de la Batería de Riesgo Psicosocial elaborada por el Ministerio de la Protección Social y la Universidad Javeriana, entendiendo que los fines de la evaluación son netamente ocupacionales, y que la información recolectada será analizada de manera confidencial para orientar acciones de mejoría para el personal de la Empresa.
          </p>
          <p>
            Los resultados individuales de la presente evaluación de la presente evaluación no serán revelados sin autorización por escrito del colaborador, la empresa recibirá un informe consolidado con los resultados generales para la Empresa.
          </p>
          <p>
            Los datos consignados en la evaluación no serán usados para afectar las condiciones contractuales.
          </p>
          <p>
            Dado el carácter confidencial de esta evaluación, esta información será incluida en la historia clínica de cada colaborador.
          </p>
          <p>
            La información de estadísticas generales y resultados de la evaluación será presentada al interior de la empresa, garantizándooslos la confidencialidad de los datos personales.
          </p>
          <p>
            Hago constar que el presente documento ha sido leído y entendido por mi en su integridad, de manera libre y espontánea.
          </p>
        </div>

        <button
          onClick={onAceptar}
          className="w-full md:w-3/4 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]"
        >
          Acepto y deseo continuar
        </button>
      </div>
    </div>
  );
}
