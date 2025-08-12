import FichaDatosGenerales from "./FichaDatosGenerales";
import { FichaDatosGenerales as FichaDatos } from "../types";

interface Props {
  empresasIniciales: string[];
  onGuardar: (datos: FichaDatos) => void;
}

export default function FichaScreen({ empresasIniciales, onGuardar }: Props) {
  return (
    <FichaDatosGenerales
      empresasIniciales={empresasIniciales}
      onGuardar={onGuardar}
    />
  );
}
