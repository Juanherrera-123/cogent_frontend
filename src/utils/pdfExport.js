import { jsPDF } from "jspdf";
/**
 * Exporta un elemento HTML a un archivo PDF utilizando jsPDF.
 * @param element Elemento a renderizar en el PDF.
 * @param fileName Nombre del archivo a generar.
 */
export async function exportElementToPDF(element, fileName) {
    const doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    await doc.html(element, {
        html2canvas: { scale: 0.7 },
        margin: [40, 40, 40, 40],
        callback: () => {
            doc.save(fileName);
        },
    });
}
