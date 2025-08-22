import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  FichaDatosGenerales as FichaDatos,
  SurveyResponses,
  EstresResultado,
  ExtralaboralResultado,
  IntralaboralResultado,
  GlobalResultado,
} from "../types";
import { preguntasA, preguntasB } from "../data/preguntas";
import { calcularFormaA } from "../utils/calcularFormaA";
import { calcularFormaB } from "../utils/calcularFormaB";
import {
  calcularGlobalAExtrala,
  calcularGlobalBExtrala,
} from "../utils/calcularGlobalA";
import removeUndefined from "../utils/removeUndefined";
import { toast } from "../utils/toast";

interface Params {
  ficha: FichaDatos | null;
  respuestas: SurveyResponses;
  resultadoEstres: EstresResultado | null;
  resultadoExtralaboral: ExtralaboralResultado | null;
  formType: "A" | "B" | null;
}

export async function guardarResultados({
  ficha,
  respuestas,
  resultadoEstres,
  resultadoExtralaboral,
  formType,
}: Params) {
  if (!formType) return;

  let resultadoForma: IntralaboralResultado | null = null;
  let resultadoGlobal: GlobalResultado | null = null;

  if (formType === "A" && respuestas.bloques) {
    const arr = Array.from({ length: preguntasA.length }, (_, i) =>
      respuestas.bloques?.[i] ?? ""
    );
    resultadoForma = calcularFormaA(arr);
    if (resultadoExtralaboral) {
      resultadoGlobal = calcularGlobalAExtrala(
        resultadoForma?.total?.suma ?? 0,
        resultadoExtralaboral.puntajeBrutoTotal ?? 0
      );
    }
  } else if (formType === "B" && respuestas.bloques) {
    const arr = Array.from({ length: preguntasB.length }, (_, i) =>
      respuestas.bloques?.[i] ?? ""
    );
    resultadoForma = calcularFormaB(arr);
    if (resultadoExtralaboral) {
      resultadoGlobal = calcularGlobalBExtrala(
        resultadoForma?.total?.suma ?? 0,
        resultadoExtralaboral.puntajeBrutoTotal ?? 0
      );
    }
  }

  const data: Record<string, unknown> = {
    ficha,
    respuestas,
    resultadoEstres,
    resultadoExtralaboral,
    tipo: formType,
    fecha: ficha?.fecha || new Date().toISOString(),
  };

  if (formType === "A") {
    data.resultadoFormaA = resultadoForma;
    data.resultadoGlobalAExtralaboral = resultadoGlobal;
  }
  if (formType === "B") {
    data.resultadoFormaB = resultadoForma;
    data.resultadoGlobalBExtralaboral = resultadoGlobal;
  }

  const cleanData = removeUndefined(data);
  try {
    await addDoc(collection(db, "resultadosCogent"), cleanData);
  } catch (err) {
    console.error("Error al guardar resultados", err);
    toast("No se pudieron guardar los resultados");
  }

  return { resultadoForma, resultadoGlobal };
}
