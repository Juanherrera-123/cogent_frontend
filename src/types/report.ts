export type Nivel = "Muy bajo" | "Bajo" | "Medio" | "Alto" | "Muy alto" | string;

export interface EmpresaInfo {
  id: string;
  nombre: string;
  nit?: string;
  logoUrl?: string;
}

export interface ResumenGlobal {
  puntaje: number; // 0-100 transformado
  nivel: Nivel;
}

export interface Indicador {
  transformado?: number;
  nivel?: Nivel;
}

export interface BloqueDimensiones {
  [nombre: string]: Indicador;
}

export interface BloqueDominios {
  [nombre: string]: Indicador;
}

export interface SociodemoDistribucion {
  [categoria: string]: number;
}

export interface Sociodemo {
  genero?: SociodemoDistribucion;
  estadoCivil?: SociodemoDistribucion;
  escolaridad?: SociodemoDistribucion;
  estrato?: SociodemoDistribucion;
  vivienda?: SociodemoDistribucion;
  antiguedad?: SociodemoDistribucion;
  tipoCargo?: SociodemoDistribucion;
  tipoContrato?: SociodemoDistribucion;
  salario?: SociodemoDistribucion;
  horasDiarias?: SociodemoDistribucion;
}

export interface ReportPayload {
  empresa: EmpresaInfo;
  fechaInformeISO: string;
  muestra: { total: number; formaA: number; formaB: number; extralaboral: number };
  global: {
    formaA?: ResumenGlobal;
    formaB?: ResumenGlobal;
    extralaboral?: ResumenGlobal;
    estres?: ResumenGlobal;
  };
  dominios: {
    formaA?: BloqueDominios;
    formaB?: BloqueDominios;
  };
  dimensiones: {
    formaA?: BloqueDimensiones;
    formaB?: BloqueDimensiones;
    extralaboral?: BloqueDimensiones;
  };
  sociodemo: Sociodemo;
}
