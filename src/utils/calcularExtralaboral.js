import { preguntasDirecto, preguntasInverso, puntajeDirecto, puntajeInverso, dimensionesExtralaboral, factorGlobalExtralaboral, baremosTotalA, baremosTotalB } from "../data/esquemaExtralaboral";
// Traduce la respuesta a puntaje según esquema (índice base 0, pregunta base 1)
function respuestaAPuntaje(preguntaIdx, respuesta) {
    const preguntaNum = preguntaIdx + 1;
    if (preguntasDirecto.includes(preguntaNum)) {
        return puntajeDirecto[respuesta] ?? 0;
    }
    if (preguntasInverso.includes(preguntaNum)) {
        return puntajeInverso[respuesta] ?? 0;
    }
    return 0;
}
// Califica por dimensión, puntaje bruto, transformado y nivel de riesgo
export function calcularExtralaboral(respuestas, // array de respuestas, índice base 0
tipoForma) {
    if (respuestas.length < 31 || respuestas.some(r => !r)) {
        return { valido: false, error: "Debe responder todas las preguntas extralaborales." };
    }
    const resultadosDimensiones = dimensionesExtralaboral.map(dimension => {
        // Convertimos a índices base 0
        const idxs = dimension.preguntas.map(n => n - 1);
        const puntajes = idxs.map(i => respuestaAPuntaje(i, respuestas[i]));
        const puntajeBruto = puntajes.reduce((a, b) => a + b, 0);
        // Puntaje transformado: (bruto × 100) / factor
        let puntajeTransformado = Math.round((puntajeBruto * 100 / dimension.factor) * 10) / 10;
        if (puntajeTransformado < 0)
            puntajeTransformado = 0;
        if (puntajeTransformado > 100)
            puntajeTransformado = 100;
        // Buscar baremo
        const baremos = tipoForma === "A" ? dimension.baremosA : dimension.baremosB;
        const baremo = baremos.find(b => puntajeTransformado >= b.min && puntajeTransformado <= b.max);
        return {
            nombre: dimension.nombre,
            puntajeBruto,
            puntajeTransformado,
            nivel: baremo?.nivel || "No clasificado"
        };
    });
    // Puntaje total global (sumando TODOS los puntajes brutos)
    const puntajeBrutoTotal = resultadosDimensiones.reduce((acc, d) => acc + d.puntajeBruto, 0);
    // Transformado global
    let puntajeTransformadoTotal = Math.round((puntajeBrutoTotal * 100 / factorGlobalExtralaboral) * 10) / 10;
    if (puntajeTransformadoTotal < 0)
        puntajeTransformadoTotal = 0;
    if (puntajeTransformadoTotal > 100)
        puntajeTransformadoTotal = 100;
    // Baremo global
    const baremosTotal = tipoForma === "A" ? baremosTotalA : baremosTotalB;
    const baremoTotal = baremosTotal.find(b => puntajeTransformadoTotal >= b.min && puntajeTransformadoTotal <= b.max);
    return {
        valido: true,
        dimensiones: resultadosDimensiones,
        puntajeBrutoTotal,
        puntajeTransformadoTotal,
        nivelGlobal: baremoTotal?.nivel || "No clasificado"
    };
}
