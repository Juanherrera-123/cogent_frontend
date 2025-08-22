import { useRef, useState } from "react";
import { exportElementToPDF } from "@/utils/pdfExport";
import { handleError } from "@/utils/handleError";

export function usePdfExport() {
  const ref = useRef<HTMLDivElement>(null);
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState<string>("");

  async function exportNow(filename: string) {
    setRendering(true);
    setProgress("Montando informe…");
    // Usamos un doble requestAnimationFrame para esperar al siguiente
    // ciclo de pintado y confirmar que el DOM se actualizó tras los
    // cambios de estado.
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );
    try {
      if (ref.current) {
        await exportElementToPDF(ref.current, filename, {
          scale: 1.2,
          onProgress: setProgress,
        });
      }
    } catch (err) {
      handleError(err, "Error al exportar PDF", "No se pudo exportar el PDF");
    } finally {
      setRendering(false);
      setProgress("");
    }
  }

  return { ref, rendering, progress, exportNow };
}
