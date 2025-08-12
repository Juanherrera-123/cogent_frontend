export interface NarrativaContext {
  empresaNombre: string;

  percFemenino: string;
  percMasculino: string;

  estadoCivilTop: string;
  percEstadoCivilTop: string;

  percEstudios: string;
  nivelEstudiosLabel: string;

  estratoRango: string;
  percEstratoRango: string;

  percVivienda: string;
  viviendaTipoTop: string;

  percPersonasACargo: string;

  percAntiguedad: string;
  antiguedadLabel: string;

  contratoTipoTop: string;
  percContratoTipoTop: string;

  salarioTipoTop: string;
  percSalarioTipoTop: string;

  jornadaLabel: string;
  percJornada: string;
}

export interface NarrativaTemplates {
  "narrativa.sociodemo": string;
}
