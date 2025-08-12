import BloquesDePreguntas from "./BloquesDePreguntas";
import {
  bloquesFormaA,
  bloquesFormaB,
  preguntasA,
  preguntasB,
} from "../data/preguntas";

interface Props {
  formType: "A" | "B";
  onFinish: (respuestas: string[]) => void;
}

export default function BloquesScreen({ formType, onFinish }: Props) {
  return (
    <BloquesDePreguntas
      bloques={formType === "A" ? bloquesFormaA : bloquesFormaB}
      preguntas={formType === "A" ? preguntasA : preguntasB}
      onFinish={onFinish}
    />
  );
}
