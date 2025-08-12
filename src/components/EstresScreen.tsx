import BloquesDePreguntas from "./BloquesDePreguntas";
import { bloqueEstres, preguntasEstres } from "../data/preguntas";

interface Props {
  onFinish: (respuestas: string[]) => void;
}

export default function EstresScreen({ onFinish }: Props) {
  return (
    <BloquesDePreguntas
      bloques={bloqueEstres}
      preguntas={preguntasEstres}
      onFinish={onFinish}
    />
  );
}
