export function prepareForExport(root: HTMLElement) {
  // Abrir paneles de acordeón y quitar restricciones
  root.querySelectorAll<HTMLElement>('[id^="panel-"]').forEach(p => {
    p.style.height = 'auto';
    p.style.overflow = 'visible';
  });
  // Desactivar animaciones/transiciones que “congelan” alturas
  root.querySelectorAll<HTMLElement>('*').forEach(el => {
    el.style.transition = 'none';
    el.style.animation = 'none';
  });
  // Forzar reflow
  void root.offsetHeight;
}

export async function waitForAssets(root: HTMLElement) {
  // Esperar fuentes e imágenes
  try {
    await (document as unknown as { fonts?: { ready: Promise<void> } }).fonts?.ready;
  } catch {
    /* ignore */
  }
  const imgs = Array.from(root.querySelectorAll('img'));
  await Promise.all(
    imgs.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((res) => {
              img.onload = img.onerror = () => res();
            }),
    ),
  );
}

/* Opción A: impresión nativa */
export async function printNative(root: HTMLElement) {
  prepareForExport(root);
  await waitForAssets(root);
  window.print();
}

/* Opción B: html2pdf.js */
export async function exportWithHtml2Pdf(root: HTMLElement, filename = 'informe.pdf') {
  prepareForExport(root);
  await waitForAssets(root);

  const { default: html2pdf } = await import('html2pdf.js');
  const opt = {
    margin:       [10, 10, 10, 10],             // mm
    filename,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  {
      scale: 2,                                  // nitidez
      useCORS: true,
      letterRendering: true,
      scrollY: 0,
      windowWidth: document.documentElement.scrollWidth
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['css', 'legacy'], avoid: '.avoid-break, table, tr' }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (html2pdf() as any).from(root).set(opt).save();
}
