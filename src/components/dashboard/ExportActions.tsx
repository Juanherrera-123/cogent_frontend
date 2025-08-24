import React from "react";
import { FileDown, FileText, Home as HomeIcon } from "lucide-react";

interface Props {
  onBack?: () => void;
  rol: "psicologa" | "dueno" | "superusuario";
  tab: string;
  handleExportar: () => void;
  handleExportPDF: () => void;
}

const ExportActions: React.FC<Props> = ({
  onBack,
  rol,
  tab,
  handleExportar,
  handleExportPDF,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-[#172349] font-bold rounded-2xl hover:bg-[#E5EAF6]"
        >
          <HomeIcon size={20} /> Volver al inicio
        </button>
      )}
      {rol === "superusuario" &&
        (tab === "informe" || tab === "informeCompleto") && (
          <div className="flex gap-2">
            <button
              onClick={handleExportar}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#265FF2] text-white font-bold rounded-2xl shadow-md hover:brightness-90"
            >
              <FileDown size={20} /> Descargar Excel
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#265FF2] text-white font-bold rounded-2xl shadow-md hover:brightness-90"
            >
              <FileText size={20} /> Descargar PDF
            </button>
          </div>
        )}
    </div>
  );
};

export default React.memo(ExportActions);
