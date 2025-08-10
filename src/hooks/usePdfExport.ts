import { useRef, useState } from "react";
import { exportElementToPDF } from "@/utils/pdfExport";

export function usePdfExport() {
  const ref = useRef<HTMLDivElement>(null);
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState<string>("");

  async function exportNow(filename: string) {
    setRendering(true);
    setProgress("Montando informe…");
    await new Promise((r) => setTimeout(r, 350)); // dejar que React pinte
    if (ref.current) {
      await exportElementToPDF(ref.current, filename, {
        scale: 1.2,
        onProgress: setProgress,
      });
    }
    setRendering(false);
    setProgress("");
  }

  return { ref, rendering, progress, exportNow };
}
