// ================= Esquema de Puntuación EXTRALABORAL ===================

// Preguntas con esquema directo e inverso (índices BASE 1)
export const preguntasDirecto = [
  1, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 27, 29
];
export const preguntasInverso = [
  2, 3, 6, 24, 26, 28, 30, 31
];

// Cómo se puntúan las respuestas
export const puntajeDirecto: Record<string, number> = {
  "siempre": 0,
  "casi siempre": 1,
  "algunas veces": 2,
  "casi nunca": 3,
  "nunca": 4
};
export const puntajeInverso: Record<string, number> = {
  "siempre": 4,
  "casi siempre": 3,
  "algunas veces": 2,
  "casi nunca": 1,
  "nunca": 0
};

// Mapeo de preguntas a dimensiones
export const dimensionesExtralaboral = [
  {
    nombre: "Tiempo fuera del trabajo",
    preguntas: [14, 15, 16, 17],
    factor: 16,
    baremosA: [
      { nivel: "Sin riesgo", min: 0.0, max: 6.3 },
      { nivel: "Riesgo bajo", min: 6.4, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 37.5 },
      { nivel: "Riesgo alto", min: 37.6, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    baremosB: [
      { nivel: "Sin riesgo", min: 0.0, max: 6.3 },
      { nivel: "Riesgo bajo", min: 6.4, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 37.5 },
      { nivel: "Riesgo alto", min: 37.6, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ]
  },
  {
    nombre: "Relaciones familiares",
    preguntas: [22, 25, 27],
    factor: 12,
    baremosA: [
      { nivel: "Sin riesgo", min: 0.0, max: 8.3 },
      { nivel: "Riesgo bajo", min: 8.4, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 33.3 },
      { nivel: "Riesgo alto", min: 33.4, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    baremosB: [
      { nivel: "Sin riesgo", min: 0.0, max: 8.3 },
      { nivel: "Riesgo bajo", min: 8.4, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 33.3 },
      { nivel: "Riesgo alto", min: 33.4, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ]
  },
  {
    nombre: "Comunicación y relaciones interpersonales",
    preguntas: [18, 19, 20, 21, 23],
    factor: 20,
    baremosA: [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 10.0 },
      { nivel: "Riesgo medio", min: 10.1, max: 20.0 },
      { nivel: "Riesgo alto", min: 20.1, max: 30.0 },
      { nivel: "Riesgo muy alto", min: 30.1, max: 100 }
    ],
    baremosB: [
      { nivel: "Sin riesgo", min: 0.0, max: 5.0 },
      { nivel: "Riesgo bajo", min: 5.1, max: 15.0 },
      { nivel: "Riesgo medio", min: 15.1, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 35.0 },
      { nivel: "Riesgo muy alto", min: 35.1, max: 100 }
    ]
  },
  {
    nombre: "Situación económica del grupo familiar",
    preguntas: [29, 30, 31],
    factor: 12,
    baremosA: [
      { nivel: "Sin riesgo", min: 0.0, max: 8.3 },
      { nivel: "Riesgo bajo", min: 8.4, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 33.3 },
      { nivel: "Riesgo alto", min: 33.4, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ],
    baremosB: [
      { nivel: "Sin riesgo", min: 0.0, max: 16.7 },
      { nivel: "Riesgo bajo", min: 16.8, max: 25.0 },
      { nivel: "Riesgo medio", min: 25.1, max: 41.7 },
      { nivel: "Riesgo alto", min: 41.8, max: 50.0 },
      { nivel: "Riesgo muy alto", min: 50.1, max: 100 }
    ]
  },
  {
    nombre: "Características de la vivienda y de su entorno",
    preguntas: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    factor: 36,
    baremosA: [
      { nivel: "Sin riesgo", min: 0.0, max: 5.6 },
      { nivel: "Riesgo bajo", min: 5.7, max: 11.1 },
      { nivel: "Riesgo medio", min: 11.2, max: 13.9 },
      { nivel: "Riesgo alto", min: 14.0, max: 22.2 },
      { nivel: "Riesgo muy alto", min: 22.3, max: 100 }
    ],
    baremosB: [
      { nivel: "Sin riesgo", min: 0.0, max: 5.6 },
      { nivel: "Riesgo bajo", min: 5.7, max: 11.1 },
      { nivel: "Riesgo medio", min: 11.2, max: 16.7 },
      { nivel: "Riesgo alto", min: 16.8, max: 27.8 },
      { nivel: "Riesgo muy alto", min: 27.9, max: 100 }
    ]
  },
  {
    nombre: "Influencia del entorno extralaboral sobre el trabajo",
    preguntas: [24, 26, 28],
    factor: 12,
    baremosA: [
      { nivel: "Sin riesgo", min: 0.0, max: 8.3 },
      { nivel: "Riesgo bajo", min: 8.4, max: 16.7 },
      { nivel: "Riesgo medio", min: 16.8, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 41.7 },
      { nivel: "Riesgo muy alto", min: 41.8, max: 100 }
    ],
    baremosB: [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 16.7 },
      { nivel: "Riesgo medio", min: 16.8, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 41.7 },
      { nivel: "Riesgo muy alto", min: 41.8, max: 100 }
    ]
  },
  {
    nombre: "Desplazamiento vivienda trabajo vivienda",
    preguntas: [1, 2, 3, 4],
    factor: 16,
    baremosA: [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 12.5 },
      { nivel: "Riesgo medio", min: 12.6, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 43.8 },
      { nivel: "Riesgo muy alto", min: 43.9, max: 100 }
    ],
    baremosB: [
      { nivel: "Sin riesgo", min: 0.0, max: 0.9 },
      { nivel: "Riesgo bajo", min: 1.0, max: 12.5 },
      { nivel: "Riesgo medio", min: 12.6, max: 25.0 },
      { nivel: "Riesgo alto", min: 25.1, max: 43.8 },
      { nivel: "Riesgo muy alto", min: 43.9, max: 100 }
    ]
  },
];

// Factor global para el puntaje total
export const factorGlobalExtralaboral = 124;

// Baremos para el puntaje total (por tipo de forma)
export const baremosTotalA = [
  { nivel: "Sin riesgo", min: 0.0, max: 11.3 },
  { nivel: "Riesgo bajo", min: 11.4, max: 16.9 },
  { nivel: "Riesgo medio", min: 17.0, max: 22.6 },
  { nivel: "Riesgo alto", min: 22.7, max: 29.0 },
  { nivel: "Riesgo muy alto", min: 29.1, max: 100 }
];
export const baremosTotalB = [
  { nivel: "Sin riesgo", min: 0.0, max: 12.9 },
  { nivel: "Riesgo bajo", min: 13.0, max: 17.7 },
  { nivel: "Riesgo medio", min: 17.8, max: 24.2 },
  { nivel: "Riesgo alto", min: 24.3, max: 32.3 },
  { nivel: "Riesgo muy alto", min: 32.4, max: 100 }
];

// Opciones válidas de respuesta
export const opcionesExtralaboral = [
  "siempre", "casi siempre", "algunas veces", "casi nunca", "nunca"
];
