// src/data/baremosFormaA.ts
import { Baremo } from "@/types";

export interface BaremosFormaA {
  total: Baremo[];
  dominios: Record<string, Baremo[]>;
  dimensiones: Record<string, Baremo[]>;
}

export const baremosFormaA: BaremosFormaA = {
  // Puntaje total intralaboral
  total: [
    { nivel: "Sin riesgo", min: 0.0, max: 19.7 },
    { nivel: "Riesgo bajo", min: 19.8, max: 25.8 },
    { nivel: "Riesgo medio", min: 25.9, max: 31.5 },
    { nivel: "Riesgo alto", min: 31.6, max: 38.0 },
    { nivel: "Riesgo muy alto", min: 38.1, max: 100 }
  ],

  // Baremos por dominio
  dominios: {
    "Liderazgo y relaciones sociales en el trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 9.1 },
      { nivel: "Riesgo bajo", min: 9.2, max: 17.7 },
      { nivel: "Riesgo medio", min: 17.8, max: 25.6 },
      { nivel: "Riesgo alto", min: 25.7, max: 34.8 },
      { nivel: "Riesgo muy alto", min: 34.9, max: 100 }
    ],
    "Control sobre el trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 10.7 },
      { nivel: "Riesgo bajo", min: 10.8, max: 19.0 },
      { nivel: "Riesgo medio", min: 19.1, max: 29.8 },
      { nivel: "Riesgo alto", min: 29.9, max: 40.5 },
      { nivel: "Riesgo muy alto", min: 40.6, max: 100 }
    ],
    "Demandas del trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 28.5 },
      { nivel: "Riesgo bajo", min: 28.6, max: 35.0 },
      { nivel: "Riesgo medio", min: 35.1, max: 41.5 },
      { nivel: "Riesgo alto", min: 41.6, max: 47.5 },
      { nivel: "Riesgo muy alto", min: 47.6, max: 100 }
    ],
    "Recompensas": [
      { nivel: "Sin riesgo", min: 0.0, max: 4.5 },
      { nivel: "Riesgo bajo", min: 4.6, max: 11.4 },
      { nivel: "Riesgo medio", min: 11.5, max: 20.5 },
      { nivel: "Riesgo alto", min: 20.6, max: 29.5 },
      { nivel: "Riesgo muy alto", min: 29.6, max: 100 }
    ]
  },

  // Baremos por dimensión
  dimensiones: {
    "Características del liderazgo": [
      { nivel: "Sin riesgo", min: 0.0, max: 3.8 },
      { nivel: "Riesgo bajo", min: 3.9, max: 15.4 },
      { nivel: "Riesgo medio", min: 15.5, max: 30.8 },
      { nivel: "Riesgo alto", min: 30.9, max: 46.2 },
      { nivel: "Riesgo muy alto", min: 46.3, max: 100 }
    ],
    "Relaciones sociales en el trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 5.4 },
      { nivel: "Riesgo bajo", min: 5.5, max: 16.1 },
      { nivel: "Riesgo medio", min: 16.2, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 37.5 },
      { nivel: "Riesgo muy alto", min: 37.6, max: 100 }
    ],
    "Retroalimentación del desempeño": [
      { nivel: "Sin riesgo", min: 0.0, max: 10.0 },
      { nivel: "Riesgo bajo", min: 10.1, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 40.0 },
      { nivel: "Riesgo alto", min: 40.1, max: 55.0 },
      { nivel: "Riesgo muy alto", min: 55.1, max: 100 }
    ],
    "Relación con los colaboradores": [
      { nivel: "Sin riesgo", min: 0.0, max: 13.9 },
      { nivel: "Riesgo bajo", min: 14.0, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 33.3 },
      { nivel: "Riesgo alto", min: 33.4, max: 47.2 },
      { nivel: "Riesgo muy alto", min: 47.3, max: 100 }
    ],
    "Claridad de rol": [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 10.7 },
      { nivel: "Riesgo medio", min: 10.8, max: 21.4 },
      { nivel: "Riesgo alto", min: 21.5, max: 39.3 },
      { nivel: "Riesgo muy alto", min: 39.4, max: 100 }
    ],
    "Capacitación": [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 16.7 },
      { nivel: "Riesgo medio", min: 16.8, max: 33.3 },
      { nivel: "Riesgo alto", min: 33.4, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    "Participación y manejo del cambio": [
      { nivel: "Sin riesgo", min: 0.0, max: 12.5 },
      { nivel: "Riesgo bajo", min: 12.6, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 37.5 },
      { nivel: "Riesgo alto", min: 37.6, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    "Oportunidades para el uso y desarrollo de habilidades y conocimientos": [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 6.3 },
      { nivel: "Riesgo medio", min: 6.4, max: 18.8 },
      { nivel: "Riesgo alto", min: 18.9, max: 31.3 },
      { nivel: "Riesgo muy alto", min: 31.4, max: 100 }
    ],
    "Control y autonomía sobre el trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 8.3 },
      { nivel: "Riesgo bajo", min: 8.4, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 41.7 },
      { nivel: "Riesgo alto", min: 41.8, max: 58.3 },
      { nivel: "Riesgo muy alto", min: 58.4, max: 100 }
    ],
    "Demandas ambientales y de esfuerzo físico": [
      { nivel: "Sin riesgo", min: 0.0, max: 14.6 },
      { nivel: "Riesgo bajo", min: 14.7, max: 22.9 },
      { nivel: "Riesgo medio", min: 23.0, max: 31.3 },
      { nivel: "Riesgo alto", min: 31.4, max: 39.6 },
      { nivel: "Riesgo muy alto", min: 39.7, max: 100 }
    ],
    "Demandas emocionales": [
      { nivel: "Sin riesgo", min: 0.0, max: 16.7 },
      { nivel: "Riesgo bajo", min: 16.8, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 33.3 },
      { nivel: "Riesgo alto", min: 33.4, max: 47.2 },
      { nivel: "Riesgo muy alto", min: 47.3, max: 100 }
    ],
    "Demandas cuantitativas": [
      { nivel: "Sin riesgo", min: 0.0, max: 25.0 },
      { nivel: "Riesgo bajo", min: 25.1, max: 33.3 },
      { nivel: "Riesgo medio", min: 33.4, max: 45.8 },
      { nivel: "Riesgo alto", min: 45.9, max: 54.2 },
      { nivel: "Riesgo muy alto", min: 54.3, max: 100 }
    ],
    "Influencia del trabajo sobre el entorno extralaboral": [
      { nivel: "Sin riesgo", min: 0.0, max: 18.8 },
      { nivel: "Riesgo bajo", min: 18.9, max: 31.3 },
      { nivel: "Riesgo medio", min: 31.4, max: 43.8 },
      { nivel: "Riesgo alto", min: 43.9, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    "Exigencias de responsabilidad del cargo": [
      { nivel: "Sin riesgo", min: 0.0, max: 37.5 },
      { nivel: "Riesgo bajo", min: 37.6, max: 54.2 },
      { nivel: "Riesgo medio", min: 54.3, max: 66.7 },
      { nivel: "Riesgo alto", min: 66.8, max: 79.2 },
      { nivel: "Riesgo muy alto", min: 79.3, max: 100 }
    ],
    "Demandas de carga mental": [
      { nivel: "Sin riesgo", min: 0.0, max: 60.0 },
      { nivel: "Riesgo bajo", min: 60.1, max: 70.0 },
      { nivel: "Riesgo medio", min: 70.1, max: 80.0 },
      { nivel: "Riesgo alto", min: 80.1, max: 90.0 },
      { nivel: "Riesgo muy alto", min: 90.1, max: 100 }
    ],
    "Consistencia del rol": [
      { nivel: "Sin riesgo", min: 0.0, max: 15.0 },
      { nivel: "Riesgo bajo", min: 15.1, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 35.0 },
      { nivel: "Riesgo alto", min: 35.1, max: 45.0 },
      { nivel: "Riesgo muy alto", min: 45.1, max: 100 }
    ],
    "Demandas de la jornada de trabajo": [
      { nivel: "Sin riesgo", min: 0.0, max: 8.3 },
      { nivel: "Riesgo bajo", min: 8.4, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 33.3 },
      { nivel: "Riesgo alto", min: 33.4, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    "Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza": [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 5.0 },
      { nivel: "Riesgo medio", min: 5.1, max: 10.0 },
      { nivel: "Riesgo alto", min: 10.1, max: 20.0 },
      { nivel: "Riesgo muy alto", min: 20.1, max: 100 }
    ],
    "Reconocimiento y compensación": [
      { nivel: "Sin riesgo", min: 0.0, max: 4.2 },
      { nivel: "Riesgo bajo", min: 4.3, max: 16.7 },
      { nivel: "Riesgo medio", min: 16.8, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 37.5 },
      { nivel: "Riesgo muy alto", min: 37.6, max: 100 }
    ]
  }
};
