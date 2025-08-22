import React from 'react';
import { exportWithHtml2Pdf, printNative } from '@/utils/exportPdf';

export default function ExportButtons({ rootId = 'informe-root' }: { rootId?: string }) {
  const getRoot = () => document.getElementById(rootId)!;

  return (
    <div className="flex gap-2 print:hidden">
      <button
        className="rounded-lg bg-sky-600 px-3 py-2 text-white hover:bg-sky-700"
        onClick={() => printNative(getRoot())}
      >
        Imprimir / Guardar PDF
      </button>
      <button
        className="rounded-lg bg-slate-700 px-3 py-2 text-white hover:bg-slate-800"
        onClick={() => exportWithHtml2Pdf(getRoot(), 'informe.pdf')}
      >
        Exportar PDF (html2pdf)
      </button>
    </div>
  );
}
