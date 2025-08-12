import { useState } from "react";

interface Category {
  name: string;
  description: string;
  bgColor: string;
  textColor: string;
}

const categories: Category[] = [
  {
    name: "Sin Riesgo",
    description:
      "Ausencia de riesgo o riesgo tan bajo que no amerita desarrollar actividades de intervención. Las dimensiones y dominios que se encuentren bajo esta categoría serán objeto de acciones o programas de promoción.",
    bgColor: "bg-[#4CAF50]",
    textColor: "text-white",
  },
  {
    name: "Riesgo bajo",
    description:
      "No se espera que los factores psicosociales que obtengan puntuaciones de este nivel estén relacionados con síntomas o respuestas de estrés significativas. Las dimensiones y dominios que se encuentren bajo esta categoría serán objeto de acciones o programas de intervención, a fin de mantenerlos en los niveles de riesgo más bajos posibles.",
    bgColor: "bg-[#8BC34A]",
    textColor: "text-white",
  },
  {
    name: "Riesgo medio",
    description:
      "Nivel de riesgo en el que se esperaría una respuesta de estrés moderada. Las dimensiones y dominios que se encuentren bajo esta categoría ameritan observación y acciones sistemáticas de intervención para prevenir efectos perjudiciales en la salud.",
    bgColor: "bg-[#FFEB3B]",
    textColor: "text-black",
  },
  {
    name: "Riesgo alto",
    description:
      "Nivel de riesgo que tiene una importante posibilidad de asociación con respuestas de estrés alto y, por tanto, las dimensiones y dominios que se encuentren bajo esta categoría requieren intervención en el marco de un sistema de vigilancia epidemiológica.",
    bgColor: "bg-[#F44336]",
    textColor: "text-white",
  },
  {
    name: "Riesgo muy alto",
    description:
      "Nivel de riesgo con amplia posibilidad de asociarse a respuestas muy altas de estrés. Por consiguiente, las dimensiones y dominios que se encuentren bajo esta categoría requieren intervención inmediata en el marco de un sistema de vigilancia epidemiológica.",
    bgColor: "bg-[#B71C1C]",
    textColor: "text-white",
  },
];

export default function RiskAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full space-y-2">
      {categories.map((cat, index) => (
        <div key={cat.name} className="w-full">
          <button
            type="button"
            className={`${cat.bgColor} ${cat.textColor} w-full text-left px-4 py-3 font-bold uppercase`}
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index}
            aria-controls={`panel-${index}`}
            id={`accordion-${index}`}
          >
            {cat.name}
          </button>
          <div
            id={`panel-${index}`}
            role="region"
            aria-labelledby={`accordion-${index}`}
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              openIndex === index ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="bg-white text-[#313B4A] px-4 py-3">{cat.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

