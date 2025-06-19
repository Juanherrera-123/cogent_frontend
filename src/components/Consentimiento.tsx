import React from "react";

export default function Consentimiento({ onAceptar }: { onAceptar: () => void }) {
  return (
    <div className="max-w-xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
      <h1 className="text-3xl font-display text-primary-main mb-2">Aplicación Batería de Riesgos Psicosociales</h1>
      <p className="text-base font-sans text-gray-800 mb-4">Resolución 2764 e 2022</p>
      <div className="text-base font-sans text-gray-800 mb-6 text-justify space-y-4">
        <p>
          Habiéndo sido claramente informado(a) sobre los objetivos y procedimientos, acepto de manera voluntaria, participar en la aplicación de la Batería de Riesgo Psicosocial elaborada por el Ministerio de la Protección Social y la universidad Javeriana, entendiendo que los fines de la evaluación son netamente ocupacionales, y que la información recolectada sera analizada de manera confidencial para orientar acciones de mejoría para el personal de la Empresa.
        </p>
        <p>
          Los resultados individuales de la presente evaluación de la presente evaluación no serán revelados sin autorización por escrito del colaborador, la empresa recibirá un informe consolidado con los resultados generales para la Empresa.
        </p>
        <p>
          Los datos consignados en la evaluación no serán usados para afectar las condiciones contractuales.
        </p>
        <p>
          Dado el carácter confidencial de esta evaluación, esta información sera incluida en la historia clínica de cada colaborador.
        </p>
        <p>
          La información de estadísticas generales y resultados de la evaluación sera presentada al interior de la empresa, garantizándooslos la confidencialidad de los datos personales.
        </p>
        <p>
          Hago constar que el presente documento ha sido leído y entendido por mi en su integridad, de manera libre y espontánea.
        </p>
      </div>
      <button

        className="btn-primary mt-4 text-lg"

        onClick={onAceptar}
      >
        Acepto y deseo continuar
      </button>
    </div>
  );
}
