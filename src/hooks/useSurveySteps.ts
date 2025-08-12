import { useState } from "react";
import {
  FichaDatosGenerales as FichaDatos,
  SurveyResponses,
  EstresResultado,
  ExtralaboralResultado,
} from "../types";
import {
  preguntasA,
  preguntasB,
  preguntasExtralaboral,
  preguntasEstres,
} from "../data/preguntas";
import { calcularExtralaboral } from "../utils/calcularExtralaboral";
import { calcularEstres } from "../utils/calcularEstres";

type Step =
  | "inicio"
  | "consent"
  | "selector"
  | "ficha"
  | "bloques"
  | "extralaboral"
  | "estres"
  | "final"
  | "dashboard"
  | "login"
  | "privacy"
  | "terms";

export default function useSurveySteps() {
  const [step, setStep] = useState<Step>("inicio");
  const [formType, setFormType] = useState<"A" | "B" | null>(null);
  const [ficha, setFicha] = useState<FichaDatos | null>(null);
  const [respuestas, setRespuestas] = useState<SurveyResponses>({});
  const [resultadoEstres, setResultadoEstres] =
    useState<EstresResultado | null>(null);
  const [resultadoExtralaboral, setResultadoExtralaboral] =
    useState<ExtralaboralResultado | null>(null);

  const seleccionarFormulario = (form: "A" | "B") => {
    setFormType(form);
    setStep("ficha");
  };

  const guardarFicha = (datos: FichaDatos) => {
    setFicha(datos);
    setStep("bloques");
  };

  const completarBloques = (respuestasBloques: string[]) => {
    const ordered = Array.from(
      { length: formType === "A" ? preguntasA.length : preguntasB.length },
      (_, i) => respuestasBloques[i] ?? ""
    );
    setRespuestas((prev) => ({ ...prev, bloques: ordered }));
    setStep("extralaboral");
  };

  const completarExtralaboral = (respuestasExtra: string[]) => {
    const ordered = Array.from(
      { length: preguntasExtralaboral.length },
      (_, i) => respuestasExtra[i] ?? ""
    );
    const resultado = calcularExtralaboral(
      ordered,
      formType as "A" | "B"
    );
    setResultadoExtralaboral(resultado);
    setRespuestas((prev) => ({
      ...prev,
      extralaboral: ordered,
      resultadoExtralaboral: resultado,
    }));
    setStep("estres");
  };

  const completarEstres = (respuestasEstres: string[]) => {
    const ordered = Array.from(
      { length: preguntasEstres.length },
      (_, i) => respuestasEstres[i] ?? ""
    );
    const resultado = calcularEstres(ordered, formType as "A" | "B");
    setResultadoEstres(resultado);
    setRespuestas((prev) => ({
      ...prev,
      estres: ordered,
      resultadoEstres: resultado,
    }));
    setStep("final");
  };

  const reiniciar = () => {
    setStep("inicio");
    setFormType(null);
    setFicha(null);
    setRespuestas({});
    setResultadoEstres(null);
    setResultadoExtralaboral(null);
  };

  return {
    step,
    setStep,
    formType,
    seleccionarFormulario,
    guardarFicha,
    completarBloques,
    completarExtralaboral,
    completarEstres,
    reiniciar,
    ficha,
    respuestas,
    resultadoEstres,
    resultadoExtralaboral,
  };
}
