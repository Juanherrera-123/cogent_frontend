// ======= Esquema de Puntuación para el Formulario Estrés =======
// 1. Esquemas de puntuación (cómo se puntúa cada grupo de preguntas)
export const esquemaPuntajeEstres = {
    esquema1: {
        items: [1, 2, 3, 9, 13, 14, 15, 23, 24],
        valores: {
            "siempre": 9,
            "casi siempre": 6,
            "a veces": 3,
            "nunca": 0
        }
    },
    esquema2: {
        items: [4, 5, 6, 10, 11, 16, 17, 18, 19, 25, 26, 27, 28],
        valores: {
            "siempre": 6,
            "casi siempre": 4,
            "a veces": 2,
            "nunca": 0
        }
    },
    esquema3: {
        items: [7, 8, 12, 20, 21, 22, 29, 30, 31],
        valores: {
            "siempre": 3,
            "casi siempre": 2,
            "a veces": 1,
            "nunca": 0
        }
    }
};
// 2. Para saber a qué esquema pertenece cada pregunta (por número, base 1)
export const mapaPreguntaEsquema = (() => {
    const map = {};
    Object.entries(esquemaPuntajeEstres).forEach(([esquema, data]) => {
        data.items.forEach((num) => {
            map[num] = esquema;
        });
    });
    return map;
})();
// 3. Categorías a las que pertenece cada pregunta (por si luego necesitas ponderar/categorizar)
export const categoriasEstres = [
    { nombre: "Categoria Cuádruple", preguntas: [1, 2, 3, 4, 5, 6, 7, 8] }, // ×4
    { nombre: "Categoria Triple", preguntas: [9, 10, 11, 12] }, // ×3
    { nombre: "Categoria Doble", preguntas: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // ×2
    { nombre: "Categoria Simple", preguntas: [23, 24, 25, 26, 27, 28, 29, 30, 31] } // ×1
];
// 4. Opciones de respuesta permitidas en el formulario de estrés (importante para el select)
export const opcionesEstres = ["siempre", "casi siempre", "a veces", "nunca"];
