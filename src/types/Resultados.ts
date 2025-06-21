export interface Baremo {
  nivel: string;
  min: number;
  max: number;
}

export interface DimensionResultado {
  suma: number;
  transformado: number;
  nivel: string;
}

export interface IntralaboralResultado {
  dimensiones: Record<string, DimensionResultado>;
  dominios: Record<string, DimensionResultado>;
  total: DimensionResultado & { suma: number };
}

export interface ExtralaboralDimensionResultado {
  nombre: string;
  puntajeBruto: number;
  puntajeTransformado: number;
  nivel: string;
}

export interface ExtralaboralResultado {
  valido: boolean;
  dimensiones: ExtralaboralDimensionResultado[];
  puntajeBrutoTotal: number;
  puntajeTransformadoTotal: number;
  nivelGlobal: string;
}

export interface GlobalResultado {
  puntajeGlobal: number;
  nivelGlobal: string;
}

export interface EstresResultado {
  valido: boolean;
  puntajeBruto: number;
  puntajeTransformado: number;
  nivel: string;
}

export interface FichaDatosGenerales {
  fecha: string;
  nombre: string;
  cedula: string;
  sexo: string;
  nacimiento: string;
  estadoCivil: string;
  estudios: string;
  ocupacion: string;
  residenciaCiudad: string;
  residenciaDepto: string;
  estrato: string;
  vivienda: string;
  dependientes: string;
  trabajoCiudad: string;
  trabajoDepto: string;
  aniosEmpresa: string;
  menosAnioEmpresa: boolean;
  cargo: string;
  tipoCargo: string;
  aniosCargo: string;
  menosAnioCargo: boolean;
  area: string;
  tipoContrato: string;
  horasDiarias: string;
  tipoSalario: string;
  empresa?: string;
}

export interface ResultRow {
  ficha?: FichaDatosGenerales;
  respuestas?: any;
  resultadoFormaA?: IntralaboralResultado;
  resultadoFormaB?: IntralaboralResultado;
  resultadoExtralaboral?: ExtralaboralResultado;
  resultadoGlobalAExtralaboral?: GlobalResultado;
  resultadoGlobalBExtralaboral?: GlobalResultado;
  resultadoEstres?: EstresResultado;
  tipo: "A" | "B";
  fecha: string;
}
