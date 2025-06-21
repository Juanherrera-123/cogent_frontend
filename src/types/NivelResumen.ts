export interface NivelResumen {
  nombre: string;
  indice: number;
  nivel: string;
}

export interface NivelResumenCantidad extends NivelResumen {
  cantidad: number;
}

export interface PromedioDato {
  nombre: string;
  promedio: number;
  nivel: string;
  indice: number;
}

export interface CategoriaConteo {
  nombre: string;
  cantidad: number;
}
