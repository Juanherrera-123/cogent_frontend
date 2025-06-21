// src/data/baremosFormaB.ts
import { Baremo } from "@/types";

export interface BaremosFormaB {
  dimension: Record<string, Baremo[]>;
  dominio: Record<string, Baremo[]>;
  total: Baremo[];
  global: Baremo[];
}

export const baremosFormaB: BaremosFormaB = {
  dimension: {
    "Características del liderazgo": [
      { nivel: "Sin riesgo", min: 0.0, max: 3.8 },
      { nivel: "Riesgo bajo", min: 3.9, max: 13.5 },
      { nivel: "Riesgo medio", min: 13.6, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 38.5 },
      { nivel: "Riesgo muy alto", min: 38.6, max: 100 }
    ],
    "Relaciones sociales en el trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 6.3 },
      { nivel: "Riesgo bajo", min: 6.4, max: 14.6 },
      { nivel: "Riesgo medio", min: 14.7, max: 27.1 },
      { nivel: "Riesgo alto", min: 27.2, max: 37.5 },
      { nivel: "Riesgo muy alto", min: 37.6, max: 100 }
    ],
    "Retroalimentación del desempeño": [
      { nivel: "Sin riesgo", min: 0.0, max: 5.0 },
      { nivel: "Riesgo bajo", min: 5.1, max: 20.0 },
      { nivel: "Riesgo medio", min: 20.1, max: 30.0 },
      { nivel: "Riesgo alto", min: 30.1, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    "Claridad de rol": [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 5.0 },
      { nivel: "Riesgo medio", min: 5.1, max: 15.0 },
      { nivel: "Riesgo alto", min: 15.1, max: 30.0 },
      { nivel: "Riesgo muy alto", min: 30.1, max: 100 }
    ],
    "Capacitación": [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 16.7 },
      { nivel: "Riesgo medio", min: 16.8, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    "Participación y manejo del cambio": [
      { nivel: "Sin riesgo", min: 0.0, max: 16.7 },
      { nivel: "Riesgo bajo", min: 16.8, max: 33.3 },
      { nivel: "Riesgo medio", min: 33.4, max: 41.7 },
      { nivel: "Riesgo alto", min: 41.8, max: 58.3 },
      { nivel: "Riesgo muy alto", min: 58.4, max: 100 }
    ],
    "Oportunidades para el uso y desarrollo de habilidades y conocimientos": [
      { nivel: "Sin riesgo", min: 0.0, max: 12.5 },
      { nivel: "Riesgo bajo", min: 12.6, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 37.5 },
      { nivel: "Riesgo alto", min: 37.6, max: 56.3 },
      { nivel: "Riesgo muy alto", min: 56.4, max: 100 }
    ],
    "Control y autonomía sobre el trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 33.3 },
      { nivel: "Riesgo bajo", min: 33.4, max: 50.0 },
      { nivel: "Riesgo medio", min: 50.1, max: 66.7 },
      { nivel: "Riesgo alto", min: 66.8, max: 75.0 },
      { nivel: "Riesgo muy alto", min: 75.1, max: 100 }
    ],
    "Demandas ambientales y de esfuerzo físico": [
      { nivel: "Sin riesgo", min: 0.0, max: 22.9 },
      { nivel: "Riesgo bajo", min: 23.0, max: 31.3 },
      { nivel: "Riesgo medio", min: 31.4, max: 39.6 },
      { nivel: "Riesgo alto", min: 39.7, max: 47.9 },
      { nivel: "Riesgo muy alto", min: 48.0, max: 100 }
    ],
    "Demandas emocionales": [
      { nivel: "Sin riesgo", min: 0.0, max: 19.4 },
      { nivel: "Riesgo bajo", min: 19.5, max: 27.8 },
      { nivel: "Riesgo medio", min: 27.9, max: 38.9 },
      { nivel: "Riesgo alto", min: 39.0, max: 47.2 },
      { nivel: "Riesgo muy alto", min: 47.3, max: 100 }
    ],
    "Demandas cuantitativas": [
      { nivel: "Sin riesgo", min: 0.0, max: 16.7 },
      { nivel: "Riesgo bajo", min: 16.8, max: 33.3 },
      { nivel: "Riesgo medio", min: 33.4, max: 41.7 },
      { nivel: "Riesgo alto", min: 41.8, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    "Influencia del trabajo sobre el entorno extralaboral": [
      { nivel: "Sin riesgo", min: 0.0, max: 12.5 },
      { nivel: "Riesgo bajo", min: 12.6, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 31.3 },
      { nivel: "Riesgo alto", min: 31.4, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    "Demandas de carga mental": [
      { nivel: "Sin riesgo", min: 0.0, max: 50.0 },
      { nivel: "Riesgo bajo", min: 50.1, max: 65.0 },
      { nivel: "Riesgo medio", min: 65.1, max: 75.0 },
      { nivel: "Riesgo alto", min: 75.1, max: 85.0 },
      { nivel: "Riesgo muy alto", min: 85.1, max: 100 }
    ],
    "Demandas de la jornada de trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 25.0 },
      { nivel: "Riesgo bajo", min: 25.1, max: 37.5 },
      { nivel: "Riesgo medio", min: 37.6, max: 45.8 },
      { nivel: "Riesgo alto", min: 45.9, max: 58.3 },
      { nivel: "Riesgo muy alto", min: 58.4, max: 100 }
    ],
    "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza": [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 6.3 },
      { nivel: "Riesgo medio", min: 6.4, max: 12.5 },
      { nivel: "Riesgo alto", min: 12.6, max: 18.8 },
      { nivel: "Riesgo muy alto", min: 18.9, max: 100 }
    ],
    "Reconocimiento y compensación": [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 12.5 },
      { nivel: "Riesgo medio", min: 12.6, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 37.5 },
      { nivel: "Riesgo muy alto", min: 37.6, max: 100 }
    ]
  },

  dominio: {
    "Liderazgo y relaciones sociales en el trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 8.3 },
      { nivel: "Riesgo bajo", min: 8.4, max: 17.5 },
      { nivel: "Riesgo medio", min: 17.6, max: 26.7 },
      { nivel: "Riesgo alto", min: 26.8, max: 38.3 },
      { nivel: "Riesgo muy alto", min: 38.4, max: 100 }
    ],
    "Control sobre el trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 19.4 },
      { nivel: "Riesgo bajo", min: 19.5, max: 26.4 },
      { nivel: "Riesgo medio", min: 26.5, max: 34.7 },
      { nivel: "Riesgo alto", min: 34.8, max: 43.1 },
      { nivel: "Riesgo muy alto", min: 43.2, max: 100 }
    ],
    "Demandas del trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 26.9 },
      { nivel: "Riesgo bajo", min: 27.0, max: 33.3 },
      { nivel: "Riesgo medio", min: 33.4, max: 37.8 },
      { nivel: "Riesgo alto", min: 37.9, max: 44.2 },
      { nivel: "Riesgo muy alto", min: 44.3, max: 100 }
    ],
    "Recompensas": [
      { nivel: "Sin riesgo", min: 0.0, max: 2.5 },
      { nivel: "Riesgo bajo", min: 2.6, max: 10.0 },
      { nivel: "Riesgo medio", min: 10.1, max: 17.5 },
      { nivel: "Riesgo alto", min: 17.6, max: 27.5 },
      { nivel: "Riesgo muy alto", min: 27.6, max: 100 }
    ]
  },

  total: [
    { nivel: "Sin riesgo", min: 0.0, max: 20.6 },
    { nivel: "Riesgo bajo", min: 20.7, max: 26.0 },
    { nivel: "Riesgo medio", min: 26.1, max: 31.2 },
    { nivel: "Riesgo alto", min: 31.3, max: 38.7 },
    { nivel: "Riesgo muy alto", min: 38.8, max: 100 }
  ],

  global: [
    { nivel: "Sin riesgo", min: 0.0, max: 19.9 },
    { nivel: "Riesgo bajo", min: 20.0, max: 24.8 },
    { nivel: "Riesgo medio", min: 24.9, max: 29.5 },
    { nivel: "Riesgo alto", min: 29.6, max: 35.4 },
    { nivel: "Riesgo muy alto", min: 35.5, max: 100 }
  ]
};
