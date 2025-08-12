import { jsPDF } from "jspdf";

type PdfExportOptions = {
  filename?: string;
  scale?: number; // calidad html2canvas
  onProgress?: (msg: string) => void;
  top?: number; right?: number; bottom?: number; left?: number; // márgenes pt
};

async function waitForImages(el: HTMLElement) {
  const imgs = Array.from(el.querySelectorAll("img"));
  await Promise.all(
    imgs.map((img) => {
      const i = img as HTMLImageElement;
      if (i.complete) return Promise.resolve(null);
      return new Promise((res) => {
        i.addEventListener("load", () => res(null), { once: true });
        i.addEventListener("error", () => res(null), { once: true });
      });
    })
  );
}

async function idle(ms = 150) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Espera simple a que Recharts/SVGs tengan medidas > 0 */
async function waitForCharts(el: HTMLElement, tries = 10) {
  for (let i = 0; i < tries; i++) {
    const charts = Array.from(el.querySelectorAll("svg, canvas")) as (
      | SVGElement
      | HTMLCanvasElement
    )[];
    const ok =
      charts.length === 0 ||
      charts.every((c) => {
        const bb = c.getBoundingClientRect?.();
        return bb && bb.width > 0 && bb.height > 0;
      });
    if (ok) return;
    await idle(200);
  }
}

export async function exportElementToPDF(
  element: HTMLElement,
  fileName: string,
  opts: PdfExportOptions = {}
): Promise<void> {
  const {
    scale = 1.2,
    onProgress,
    top = 24,
    right = 24,
    bottom = 24,
    left = 24,
  } = opts;

  onProgress?.("Preparando contenido…");
  await waitForImages(element);
  await waitForCharts(element);
  await idle(100);

  const doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  onProgress?.("Renderizando a PDF…");
  await doc.html(element, {
    x: left,
    y: top,
    html2canvas: { scale },
    autoPaging: "text",
    width: pageWidth - left - right,
    height: pageHeight - top - bottom,
    windowWidth: 1123,
    callback: () => {
      onProgress?.("Descargando…");
      doc.save(fileName || "informe.pdf");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}
