import BloquesDePreguntas from "./BloquesDePreguntas";
import { bloqueExtralaboral, preguntasExtralaboral } from "../data/preguntas";

interface Props {
  onFinish: (respuestas: string[]) => void;
}

export default function ExtralaboralScreen({ onFinish }: Props) {
  return (
    <BloquesDePreguntas
      bloques={bloqueExtralaboral}
      preguntas={preguntasExtralaboral}
      onFinish={onFinish}
    />
  );
}
